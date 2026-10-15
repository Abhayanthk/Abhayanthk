// Rewrites the generated blocks in README.md from data/profile.json.
// A block sits between <!-- name:start --> and <!-- name:end -->; text outside blocks is hand-written.
// Run: node scripts/update-readme.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { CODEFORCES_HANDLE, GITHUB_USER, LATEST_MERGED_SHOWN, README_FILE } from "./config.mjs";
import { capitalize, mergedOrgs, projectsLabel, requireProfileData, searchUrl, upstreamQuery } from "./profile-data.mjs";

const data = requireProfileData();
const MERGED_SEARCH = searchUrl(upstreamQuery("pr", "is:merged"));
const IN_REVIEW_SEARCH = searchUrl(upstreamQuery("pr", "is:open"));
const ISSUES_SEARCH = searchUrl(upstreamQuery("issue"), "issues");
const CODEFORCES_PROFILE = `https://codeforces.com/profile/${CODEFORCES_HANDLE}`;

// Official Codeforces rank colors, so the badge matches the profile page.
const CF_RANK_COLORS = {
  newbie: "808080", pupil: "008000", specialist: "03a89e", expert: "0000ff",
  "candidate master": "aa00aa", master: "ff8c00", "international master": "ff8c00",
};

function shieldsBadge({ label, message, color, logo }) {
  const escape = (text) => encodeURIComponent(String(text).replaceAll("-", "--").replaceAll("_", "__"));
  const logoPart = logo ? `&logo=${logo}&logoColor=white` : "";
  return `https://img.shields.io/badge/${escape(label)}-${escape(message)}-${color}?style=flat-square&labelColor=0f1117${logoPart}`;
}

const truncate = (text, max = 72) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);
const prLine = (pr) => `- [${pr.owner}/${pr.repo}#${pr.number}](${pr.url}) ${truncate(pr.title)}`;

const BLOCKS = {
  badges() {
    const { merged } = data.openSource;
    const cf = data.codeforces;
    const badges = [
      `<a href="${MERGED_SEARCH}"><img alt="${merged.length} PRs merged upstream" src="${shieldsBadge({ label: "merged upstream", message: merged.length, color: "7aa2f7", logo: "github" })}"></a>`,
      `<a href="${CODEFORCES_PROFILE}"><img alt="Codeforces ${capitalize(cf.maxRank)}, max rating ${cf.maxRating}" src="${shieldsBadge({ label: "Codeforces", message: `${capitalize(cf.maxRank)} · max ${cf.maxRating}`, color: CF_RANK_COLORS[cf.maxRank] ?? "808080", logo: "codeforces" })}"></a>`,
    ];
    const leetcode = data.leetcode;
    if (leetcode?.badge) {
      badges.push(`<a href="https://leetcode.com/u/${leetcode.user}/"><img alt="LeetCode ${leetcode.badge}, rating ${leetcode.rating}" src="${shieldsBadge({ label: "LeetCode", message: `${leetcode.badge} · ${leetcode.rating}`, color: "ffa116", logo: "leetcode" })}"></a>`);
    }
    return badges.join(" ");
  },

  orgs() {
    const orgs = mergedOrgs(data);
    const orgSearch = (login) => searchUrl(`is:pr is:merged author:${GITHUB_USER} org:${login}`);
    const logos = orgs.map((org) =>
      `[<img src="https://avatars.githubusercontent.com/u/${org.id}?s=80&v=4" width="36" alt="${org.name}">](${orgSearch(org.login)})`);
    return [
      `| ${logos.join(" | ")} |`,
      `|${orgs.map(() => ":-:").join("|")}|`,
      `| ${orgs.map((org) => org.name).join(" | ")} |`,
    ].join("\n");
  },

  prs() {
    const { merged, inReview, issuesReported } = data.openSource;
    const orgs = mergedOrgs(data);
    const lines = [
      `**[${merged.length} PRs merged](${MERGED_SEARCH})** in ${projectsLabel(orgs)} · **[${inReview.length} in review](${IN_REVIEW_SEARCH})** · [${issuesReported} issues reported](${ISSUES_SEARCH})`,
      "",
      "**Latest merged**",
      "",
      ...merged.slice(0, LATEST_MERGED_SHOWN).map(prLine),
    ];
    if (inReview.length) lines.push("", "**In review**", "", ...inReview.map(prLine));
    return lines.join("\n");
  },

  practice() {
    const cf = data.codeforces;
    const leetcode = data.leetcode?.badge
      ? ` and [LeetCode ${data.leetcode.badge}](https://leetcode.com/u/${data.leetcode.user}/) (${data.leetcode.rating})`
      : "";
    return `DSA in contests: [Codeforces ${capitalize(cf.maxRank)}](${CODEFORCES_PROFILE}) (max ${cf.maxRating}) over ${cf.contests} rated rounds${leetcode}.`;
  },
};

// Block content keeps its original layout: multi-line blocks get their own lines, inline blocks stay inline.
function replaceBlock(markdown, name, render) {
  const pattern = new RegExp(`(<!-- ${name}:start -->)([\\s\\S]*?)(<!-- ${name}:end -->)`, "g");
  return markdown.replace(pattern, (_, start, inner, end) =>
    inner.includes("\n") ? `${start}\n${render()}\n${end}` : `${start}${render()}${end}`);
}

const before = readFileSync(README_FILE, "utf8");
const after = Object.entries(BLOCKS).reduce((markdown, [name, render]) => replaceBlock(markdown, name, render), before);
writeFileSync(README_FILE, after);
console.log(`${after === before ? "unchanged" : "updated"} ${README_FILE}`);
