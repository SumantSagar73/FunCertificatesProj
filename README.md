
# FunCertificatesProj

A polished, full-screen interactive "certifications board" web app showcasing draggable sticky notes (certificates) and simple engagement metrics. This repository contains the frontend (React + Vite) and a tiny serverless API used for global counters (visitors & hearts) intended for deployment on hosting platforms such as Vercel.

Note: This README focuses on the project, intended usage, deployment, architecture and operational details — not source code walkthroughs.

**Project Goals**
- Provide an attractive, full-screen portfolio-style board for displaying certifications or achievements.
- Make notes draggable for interactive presentation and customization.
- Provide lightweight global engagement metrics (visitor counts, heart likes) backed by a serverless API.
- Keep the application lightweight and easy to deploy (Vite, React, single static bundle + small serverless endpoint).

**Primary Features**
- Full-screen responsive board layout with a subtle professional grid background.
- Draggable sticky notes (certificates) with header, issuer and year badges.
- Floating heart button to record a global "like" count.
- Visitor counter shown in the UI (increments when the board is loaded).
- Fallback: when the API is unavailable the UI gracefully uses localStorage values.

**Technology Stack (high level)**
- Frontend: React (functional components, hooks) bundled with Vite for fast builds.
- Drag & Drop: modern React drag-and-drop solution (lightweight, responsive).
- Styling: CSS with careful color palette choices and small UI animations for polish.
- Backend (serverless): Small API route for counters (designed for Vercel serverless functions). In simple deployments it uses in-memory counters for demonstration; production deployments should replace this with a persistent store if long-term durability is required.

Audience: designers and developers who want an interactive portfolio board that can be deployed quickly and tweaked visually without heavy backend infrastructure.

--

What you'll find in this repository (high-level)
- `src/` — React app source. Contains the board, components and styles.
- `api/` — Tiny serverless endpoint(s) for counters (compatible with Vercel-style deployments).
- `dist/` — Build output after `npm run build` (generated).
- `vercel.json` — Optional Vercel configuration used for deployment routing / function runtimes.

--

When to use this project
- Portfolio pages where you want a unique, playful presentation of certifications or achievements.
- As a demo or UI prototype of draggable sticky-note layouts.
- When you prefer minimal backend complexity but want global counters with an option to persist later.

Limitations and important notes
- The supplied serverless counter currently uses in-memory storage for simplicity: that is not durable across cold starts or function restarts and is not suitable for reliable long-term persistence. For production use, replace the in-memory implementation with a persistent store (e.g., Vercel KV, Redis, Fauna, Supabase, or a small managed DB).
- If you deploy to any hosting platform that serves raw files rather than executing serverless functions, the API route may be served as static JavaScript content — causing JSON parsing failures in the client. Use the recommended deployment configuration (see `docs/DEPLOYMENT.md`) to ensure API routes are executed.
- The app includes a localStorage fallback to maintain a functional user experience when the API is unreachable.

Accessibility & privacy
- The board is primarily visual and interactive; ensure keyboard accessibility or additional ARIA attributes if you need strict accessibility compliance.
- The counters do not collect any PII — they are simple aggregate counters. If you add analytics or storage that contains PII, follow applicable regulations and best practices.

Maintenance and extension ideas
- Swap the in-memory counters for a persistent store (Vercel KV, Redis, Supabase, etc.).
- Add authentication if you need admin-only editing of the board.
- Add server-side rendering (SSR) or pre-render certificates for SEO-sensitive deployments.

--

If you want, I can:
- Walk through deploying this project to Vercel step-by-step.
- Add persistent counters using a chosen provider.
- Improve accessibility or add keyboard drag support.

Contact / Author
- Repository owner: `SumantSagar73`

License
- No license file is included by default. Add a `LICENSE` file if you intend to publish the repo under a specific license.
