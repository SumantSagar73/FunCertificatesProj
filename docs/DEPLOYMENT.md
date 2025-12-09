DEPLOYMENT GUIDE

This document explains how to deploy the FunCertificatesProj application and what to watch out for when deploying the serverless API.

Deployment targets
- Vercel: recommended for the included serverless API route(s).
- Static hosts (Netlify, GitHub Pages, S3 + CloudFront): these will serve the frontend fine but cannot execute the `api/` serverless endpoint unless the host supports serverless functions.

Recommended Vercel deployment (quick steps)
1. Create or login to your Vercel account.
2. Connect your GitHub (or Git provider) repository and import the project.
3. Build command: `npm run build` (Vite)
4. Output directory: `dist`
5. Ensure your project contains an `api/` folder at the repository root with the serverless endpoint `counters.js`.
6. If you have a `vercel.json` make sure serverless functions are configured to run Node 18+ (e.g., `"functions": { "api/**/*.js": { "runtime": "nodejs18.x" } }`).

Important notes for the `api/` route
- The local provided implementation uses in-memory counters. That means values will reset when the serverless function cold-starts or the environment restarts. For durable counters use a managed data store:
  - Vercel KV
  - Redis (managed)
  - Supabase or Postgres
  - DynamoDB, Fauna, etc.
- When deploying to Vercel ensure routes are recognized as functions (Vercel will automatically detect an `api/` directory in most standard setups). If Vercel serves the API file as static content (JS file contents visible in the browser) it means the platform treated it as a static asset rather than a function — check your project structure and `vercel.json`.

Local testing
- Run dev server: `npm run dev`
- Build: `npm run build`
- Preview build locally: `npx serve dist` or use Vite preview `npm run preview` if configured.

Environment variables
- The sample serverless route does not require environment variables by default. If you replace in-memory counters with a service (Redis, KV, Supabase) you will need to add the appropriate environment variables in Vercel's dashboard.

Troubleshooting
- If the UI logs a JSON parse error referencing `// Vercel` or similar text, that generally indicates the API route returned raw JS instead of executed JSON — verify function routing and `vercel.json`.
- 404s on `/api/counters`: confirm `api/counters.js` exists at the repository root and that Vercel recognizes it as a function.

Security and production considerations
- Protect any admin endpoints you add with authentication.
- Rate-limit or otherwise protect counters if you expect malicious or heavy traffic.

Rollback
- Use Vercel's deployment history to rollback if a deploy introduces an issue.

Contact
- If you want, I can prepare a Vercel-ready `vercel.json` and a production-ready counters implementation (Redis, KV or Supabase).