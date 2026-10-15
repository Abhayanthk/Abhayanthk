// Shared view of data/profile.json plus the GitHub searches it comes from.

import { existsSync, readFileSync } from "node:fs";
import { DATA_FILE, GITHUB_USER, NOT_UPSTREAM } from "./config.mjs";

// GitHub search for my PRs or issues outside my own, team and class repos.
export function upstreamQuery(kind, ...filters) {
  const excluded = NOT_UPSTREAM.map((owner) => `-user:${owner}`);
  return [`is:${kind}`, ...filters, `author:${GITHUB_USER}`, ...excluded].join(" ");
}

export function searchUrl(query, type = "pullrequests") {
  return `https://github.com/search?q=${encodeURIComponent(query)}&type=${type}`;
}

export function readProfileData() {
  if (!existsSync(DATA_FILE)) return null;
  return JSON.parse(readFileSync(DATA_FILE, "utf8"));
}

export function requireProfileData() {
  const data = readProfileData();
  if (!data) throw new Error(`${DATA_FILE} is missing; run: node scripts/fetch-data.mjs`);
  return data;
}

// Orgs I have merged work in, most merged PRs first.
export function mergedOrgs(data) {
  const counts = new Map();
  for (const pr of data.openSource.merged) counts.set(pr.owner, (counts.get(pr.owner) ?? 0) + 1);
  return data.openSource.orgs
    .filter((org) => counts.has(org.login))
    .sort((a, b) => counts.get(b.login) - counts.get(a.login) || a.name.localeCompare(b.name));
}

// "CNCF projects" only when every org is CNCF; otherwise plain "projects", so it stays true.
export function projectsNoun(orgs) {
  const plural = orgs.length === 1 ? "project" : "projects";
  return orgs.every((org) => org.cncf) ? `CNCF ${plural}` : plural;
}

export const projectsLabel = (orgs) => `${orgs.length} ${projectsNoun(orgs)}`;

export const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

