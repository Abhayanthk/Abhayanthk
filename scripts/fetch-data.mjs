// Fetches everything the profile shows and writes data/profile.json.
// Run: node scripts/fetch-data.mjs   (uses $GITHUB_TOKEN, or the gh CLI token locally)
//
// Each source fails soft: if Codeforces or LeetCode is down, the previous values stay,
// so a flaky API never wipes a section of the README.

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { CODEFORCES_HANDLE, DATA_FILE, LEETCODE_USER, ORGS } from "./config.mjs";
import { readProfileData, upstreamQuery } from "./profile-data.mjs";

const githubToken = process.env.GITHUB_TOKEN || execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} from ${url}`);
  return response.json();
}

function github(path) {
  return getJson(`https://api.github.com/${path}`, {
    headers: { Authorization: `Bearer ${githubToken}`, Accept: "application/vnd.github+json" },
  });
}

async function searchAll(query) {
  const items = [];
  for (let page = 1; ; page++) {
    const result = await github(`search/issues?q=${encodeURIComponent(query)}&per_page=100&page=${page}`);
    items.push(...result.items);
    if (items.length >= result.total_count || result.items.length === 0) return items;
  }
}

// Drops leading gitmoji (":seedling:", "✨") that some projects require in PR titles.
function cleanTitle(title) {
  return title.replace(/^(?:(?::[a-z0-9_+-]+:|\p{Extended_Pictographic}|️)\s*)+/u, "").trim();
}

function toItem(item) {
  const [owner, repo] = item.repository_url.split("/").slice(-2);
  return {
    owner,
    repo,
    number: item.number,
    title: cleanTitle(item.title),
    url: item.html_url,
    mergedAt: item.pull_request?.merged_at ?? null,
  };
}

async function fetchOrg(login) {
  const user = await github(`users/${login}`);
  return { login, id: user.id, name: ORGS[login]?.name ?? user.name ?? login, cncf: ORGS[login]?.cncf ?? false };
}

async function fetchOpenSource() {
  const [merged, inReview, issues] = await Promise.all([
    searchAll(upstreamQuery("pr", "is:merged")),
    searchAll(upstreamQuery("pr", "is:open")),
    searchAll(upstreamQuery("issue")),
  ]);
  const mergedPrs = merged.map(toItem).sort((a, b) => b.mergedAt.localeCompare(a.mergedAt));
  const openPrs = inReview.map(toItem).sort((a, b) => b.number - a.number);
  const owners = [...new Set([...mergedPrs, ...openPrs].map((pr) => pr.owner))].sort();
  const orgs = await Promise.all(owners.map(fetchOrg));
  return { merged: mergedPrs, inReview: openPrs, issuesReported: issues.length, orgs };
}

async function fetchCodeforces() {
  const api = "https://codeforces.com/api";
  const { result: [info] } = await getJson(`${api}/user.info?handles=${CODEFORCES_HANDLE}`);
  await sleep(2100); // Codeforces allows one API call per 2 seconds
  const { result: contests } = await getJson(`${api}/user.rating?handle=${CODEFORCES_HANDLE}`);
  return {
    handle: CODEFORCES_HANDLE,
    rating: info.rating,
    rank: info.rank,
    maxRating: info.maxRating,
    maxRank: info.maxRank,
    contests: contests.length,
    history: contests.map((contest) => contest.newRating),
  };
}

async function fetchLeetCode() {
  const query = `query ($user: String!) {
    userContestRanking(username: $user) { rating attendedContestsCount topPercentage badge { name } }
    matchedUser(username: $user) { submitStats { acSubmissionNum { difficulty count } } }
  }`;
  const { data } = await getJson("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
    body: JSON.stringify({ query, variables: { user: LEETCODE_USER } }),
  });
  const ranking = data.userContestRanking;
  const solved = data.matchedUser.submitStats.acSubmissionNum.find((row) => row.difficulty === "All").count;
  return {
    user: LEETCODE_USER,
    rating: Math.round(ranking.rating),
    contests: ranking.attendedContestsCount,
    topPercentage: ranking.topPercentage,
    badge: ranking.badge?.name ?? null, // "Knight" or "Guardian" once earned
    solved,
  };
}

async function keepPreviousOnFailure(label, fetcher, previous) {
  try {
    return await fetcher();
  } catch (error) {
    if (!previous) throw error;
    console.warn(`${label} failed (${error.message}); keeping previous data`);
    return previous;
  }
}

const previous = readProfileData() ?? {};
const data = {
  openSource: await keepPreviousOnFailure("GitHub", fetchOpenSource, previous.openSource),
  codeforces: await keepPreviousOnFailure("Codeforces", fetchCodeforces, previous.codeforces),
  leetcode: await keepPreviousOnFailure("LeetCode", fetchLeetCode, previous.leetcode),
};

mkdirSync(dirname(DATA_FILE), { recursive: true });
writeFileSync(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`);
const { merged, inReview, issuesReported } = data.openSource;
console.log(`wrote ${DATA_FILE}: ${merged.length} merged, ${inReview.length} in review, ${issuesReported} issues, CF max ${data.codeforces.maxRating}, LC ${data.leetcode.rating}`);
