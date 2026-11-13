# PostPilot

**One brief in. A full day of posts out — drafted by an agent, edited by you, scheduled through Buffer.**

🔗 **Live app:** https://genuine-conkies-9ed771.netlify.app
(Static mirror: https://umarshareef0165-netizen.github.io/postpilot/)

Built for **Buffer Commit 2026** by Umar Shareef (solo).

## What it does

Creators and small page teams waste their mornings staring at empty post boxes. PostPilot turns a single short brief into a complete, ready-to-post day:

1. **Brief it** — a topic, a niche (Comedy, Sports, Food, Tech, Motivation, Pets, Business…), a tone, and 3–5 posts.
2. **Draft my day** — a drafting engine generates genuinely varied posts — hooks, questions, tips, mini-stories and calls-to-action rotated and woven around the brief's own keywords — each with a suggested time spread across the day. Every post is editable, with a live character count and its own regenerate button.
3. **Connect Buffer** — sign in with Buffer (OAuth, below) and pick your channels.
4. **Schedule all** — the whole day lands in your Buffer queue at the chosen times.

## How it works

PostPilot is a fully client-side web app plus one tiny serverless relay:

- **OAuth 2.0 Authorization Code + PKCE, public client** — there is no client secret anywhere. The token exchange runs directly against `auth.buffer.com` from the browser; tokens live only in the user's own `localStorage`.
- **Buffer GraphQL API** (`api.buffer.com`) — `account → organizations → channels` to load the user's channels, and `createPost` in `customScheduled` mode to place posts at exact times.
- **The CORS finding (and the fix):** `api.buffer.com` returns an `Access-Control-Allow-Origin` header **only for Buffer's own origin** (`publish.buffer.com`). A browser app hosted anywhere else can complete OAuth and hold a valid token, yet every API response is blocked by the browser ("Failed to fetch"). PostPilot therefore calls a **same-site relay** first — `/api/buffer`, a ~20-line Netlify function in this repo (`netlify/functions/buffer.mjs`) that forwards the request with the user's own Authorization header and stores nothing — and falls back to the direct API call when no relay exists. The relay is stateless: no database, no logging of tokens or post content.

## Privacy

- There is no PostPilot server and no analytics. Drafts and tokens never leave the user's browser except to Buffer itself (via the stateless relay).
- The in-app Privacy Policy is public at https://genuine-conkies-9ed771.netlify.app/#privacy

## Verified live — Nov 13, 2026

Exercised end-to-end against a real Buffer account before submission:

- OAuth consent for the "PostPilot" client → connected state in the app.
- **2 channels loaded** through the relay (a LinkedIn profile and a YouTube channel).
- One brief ("morning motivation for creators") → 4 drafts → **all 4 scheduled into Buffer** and verified inside Buffer's own queue at the correct times (past slots rolled to tomorrow, as designed).
- The 4 test posts were then deleted; the queue was left empty.

## Tech

Vanilla HTML/CSS/JS (no framework, no build step), Netlify Functions (Node) for the relay, GitHub Pages mirror, Buffer GraphQL API, OAuth 2.0 + PKCE (S256).
