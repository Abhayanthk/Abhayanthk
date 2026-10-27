## Hi, I'm Abhayanth

I'm a backend engineer who likes working on distributed systems. Right now I'm focused on Kubernetes and LLM serving, and I sharpen my problem solving with Codeforces and LeetCode contests.

<!-- badges:start -->
<a href="https://github.com/search?q=is%3Apr%20is%3Amerged%20author%3AAbhayanthk%20-user%3AAbhayanthk%20-user%3ASrijan76-code%20-user%3Ajaiswalsachin49%20-user%3ALalith0024%20-user%3ANaveenSh7%20-user%3Adevclub-nstru&type=pullrequests"><img alt="14 PRs merged upstream" src="https://img.shields.io/badge/merged%20upstream-14-7aa2f7?style=flat-square&labelColor=0f1117&logo=github&logoColor=white"></a> <a href="https://codeforces.com/profile/Harly24"><img alt="Codeforces Specialist, max rating 1484" src="https://img.shields.io/badge/Codeforces-Specialist%20%C2%B7%20max%201484-03a89e?style=flat-square&labelColor=0f1117&logo=codeforces&logoColor=white"></a>
<!-- badges:end -->

## Now

- **Contributing** to [volcano-sh/kthena](https://github.com/volcano-sh/kthena), LLM serving on Kubernetes. It's where most of my open-source time goes right now.
- **Learning** Go and Kubernetes internals.
- **Practicing** <!-- practice:start -->DSA and problem solving in contests: [Codeforces Specialist](https://codeforces.com/profile/Harly24) (max 1484) over 73 rated rounds.<!-- practice:end -->

## Open source

<!-- orgs:start -->
| [<img src="https://avatars.githubusercontent.com/u/47214749?s=80&v=4" width="36" alt="Volcano">](https://github.com/search?q=is%3Apr%20is%3Amerged%20author%3AAbhayanthk%20org%3Avolcano-sh&type=pullrequests) | [<img src="https://avatars.githubusercontent.com/u/33164907?s=80&v=4" width="36" alt="Kubeflow">](https://github.com/search?q=is%3Apr%20is%3Amerged%20author%3AAbhayanthk%20org%3Akubeflow&type=pullrequests) | [<img src="https://avatars.githubusercontent.com/u/49879880?s=80&v=4" width="36" alt="Metal3">](https://github.com/search?q=is%3Apr%20is%3Amerged%20author%3AAbhayanthk%20org%3Ametal3-io&type=pullrequests) | [<img src="https://avatars.githubusercontent.com/u/49998002?s=80&v=4" width="36" alt="OpenTelemetry">](https://github.com/search?q=is%3Apr%20is%3Amerged%20author%3AAbhayanthk%20org%3Aopen-telemetry&type=pullrequests) | [<img src="https://avatars.githubusercontent.com/u/86793284?s=80&v=4" width="36" alt="KubeArmor">](https://github.com/search?q=is%3Apr%20is%3Amerged%20author%3AAbhayanthk%20org%3Akubearmor&type=pullrequests) | [<img src="https://avatars.githubusercontent.com/u/11051048?s=80&v=4" width="36" alt="Microcks">](https://github.com/search?q=is%3Apr%20is%3Amerged%20author%3AAbhayanthk%20org%3Amicrocks&type=pullrequests) | [<img src="https://avatars.githubusercontent.com/u/243322663?s=80&v=4" width="36" alt="OpenEverest">](https://github.com/search?q=is%3Apr%20is%3Amerged%20author%3AAbhayanthk%20org%3Aopeneverest&type=pullrequests) |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Volcano | Kubeflow | Metal3 | OpenTelemetry | KubeArmor | Microcks | OpenEverest |
<!-- orgs:end -->

<!-- prs:start -->
**[14 PRs merged](https://github.com/search?q=is%3Apr%20is%3Amerged%20author%3AAbhayanthk%20-user%3AAbhayanthk%20-user%3ASrijan76-code%20-user%3Ajaiswalsachin49%20-user%3ALalith0024%20-user%3ANaveenSh7%20-user%3Adevclub-nstru&type=pullrequests)** in 7 CNCF projects · [9 issues reported](https://github.com/search?q=is%3Aissue%20author%3AAbhayanthk%20-user%3AAbhayanthk%20-user%3ASrijan76-code%20-user%3Ajaiswalsachin49%20-user%3ALalith0024%20-user%3ANaveenSh7%20-user%3Adevclub-nstru&type=issues)

**Latest merged**

- [volcano-sh/kthena#1891](https://github.com/volcano-sh/kthena/pull/1891) docs: remove PR-related text from router-routing.md
- [open-telemetry/opentelemetry-ruby#2389](https://github.com/open-telemetry/opentelemetry-ruby/pull/2389) feat(metrics_sdk): support OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM…
- [microcks/microcks-operator#306](https://github.com/microcks/microcks-operator/pull/306) feat: propagate sasl.client.callback.handler.class for MSK IAM producers
- [volcano-sh/kthena#1865](https://github.com/volcano-sh/kthena/pull/1865) router: fix healthy pods not picked when no score plugin scores them
- [volcano-sh/kthena#1843](https://github.com/volcano-sh/kthena/pull/1843) autoscaler: fix pod metric sum before recommendation logic
<!-- prs:end -->

## Built

- [**Orbyt**](https://github.com/Srijan76-code/openrouter-clone) · [live](https://openrouter-clone-dashboard.vercel.app): self-hosted LLM gateway, one OpenAI-compatible endpoint with retries and fallback across providers. Team of 5; I built the API-key gate, bring-your-own-key routing, the error classifier that decides retry vs fallback, and the users and credits backend. `TypeScript` `Express` `Prisma`
- [**Nextflow**](https://github.com/Abhayanthk/nextflow) · [live](https://nextflow-kohl.vercel.app): visual DAG engine for AI and media pipelines. Runs each level of the graph in parallel on durable Trigger.dev workers, streams results live, and saves every state change to Postgres, so a reload mid-run picks up where it was. `Next.js` `Trigger.dev` `PostgreSQL`
- [**Retain AI**](https://github.com/Abhayanthk/Retain_AI) · [live](https://retain-ai-ten.vercel.app): customer CSV in, retention playbook out. A 21-node LangGraph pipeline behind FastAPI; every statistic the LLM sees must pass a significance test, and results stream over SSE. `Python` `FastAPI` `LangGraph`
- [**AEGIS**](https://github.com/Abhayanthk/aegis): agent that finds Node.js event-loop starvation, reproduces it under load, applies a fix, and proves the p99 drop before it opens a PR. [Write-up](https://medium.com/@abhayanth2006/we-gave-an-ai-a-license-to-act-then-spent-48-hours-taking-away-its-license-to-lie-22f6b3b53a08) `TypeScript`

## Stack

| Languages | Backend | Infra | Frontend |
|:-:|:-:|:-:|:-:|
| <img src="https://skillicons.dev/icons?i=go,ts,py,cpp" height="36" alt="Go, TypeScript, Python, C++"> | <img src="https://skillicons.dev/icons?i=nodejs,express,fastapi,postgres,prisma" height="36" alt="Node.js, Express, FastAPI, PostgreSQL, Prisma"> | <img src="https://skillicons.dev/icons?i=docker,kubernetes,linux,githubactions" height="36" alt="Docker, Kubernetes, Linux, GitHub Actions"> | <img src="https://skillicons.dev/icons?i=react,nextjs" height="36" alt="React, Next.js"> |
