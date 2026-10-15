// Who the profile is about, which repos count as "upstream", and where files live.

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const GITHUB_USER = "Abhayanthk";
export const CODEFORCES_HANDLE = "Harly24";
export const LEETCODE_USER = "Harly24";

// Own, team and class repos. PRs here are not upstream open-source contributions.
export const NOT_UPSTREAM = [
  "Abhayanthk",
  "Srijan76-code",
  "jaiswalsachin49",
  "Lalith0024",
  "NaveenSh7",
  "devclub-nstru",
];

// Display names for orgs. `cncf` is set by hand after checking the CNCF landscape.
export const ORGS = {
  "volcano-sh": { name: "Volcano", cncf: true },
  "metal3-io": { name: "Metal3", cncf: true },
  "kubeflow": { name: "Kubeflow", cncf: true },
  "open-telemetry": { name: "OpenTelemetry", cncf: true },
  "kubearmor": { name: "KubeArmor", cncf: true },
  "openeverest": { name: "OpenEverest", cncf: true },
  "microcks": { name: "Microcks", cncf: true },
};

// How many merged PRs the README lists by title; the merged-count link shows the rest.
export const LATEST_MERGED_SHOWN = 5;

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const DATA_FILE = join(ROOT, "data", "profile.json");
export const README_FILE = join(ROOT, "README.md");
