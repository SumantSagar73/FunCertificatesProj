API REFERENCE

This document describes the tiny counters API bundled in `api/counters.js`. It is intentionally minimal — for demonstration and small-scale use. Replace the implementation with a persistent backing store for production.

Endpoint
- `GET /api/counters` — increments and returns the visitor count and current hearts.
  - Response (200): `{ "visitors": <number>, "hearts": <number> }`
  - Side effect: increments `visitors` by 1.

- `POST /api/counters` — accepts a JSON body with an `action` property. The only supported action is `heart` which increments the hearts counter.
  - Request body example: `{ "action": "heart" }`
  - Response (200): `{ "visitors": <number>, "hearts": <number> }`
  - Error responses: 400 for invalid payloads, 405 for unsupported methods, 500 for server errors.

Behavior and limitations
- Current implementation uses in-memory counters. Values reset when serverless functions cold-start or the environment restarts.
- The API sets `Access-Control-Allow-Origin: *` so the frontend can fetch the counters from the same domain or other origins during testing. Adjust CORS policy for production as needed.
- The API returns JSON with `Content-Type: application/json`.

Deployment notes
- On Vercel, place the file under the top-level `api/` folder as `api/counters.js` to be executed as a serverless function.
- If the platform treats `api/counters.js` as a static file (visible JS source in the browser), the host is not executing it — instead it is serving it as static content. Re-check hosting configuration / function runtime settings.

Extending for persistence
- Use Vercel KV or another managed data store to persist counters across restarts.
- Example strategies:
  - Vercel KV: use a KV get/incr/put flow.
  - Redis: use INCR to atomically increment counts.
  - Postgres: store counts in a small table and update with an `UPSERT`.

Security
- The API is intentionally open for demo purposes. If you add admin operations, restrict them with authentication and proper validation.

Monitoring & metrics
- For production usage, instrument the API with basic request logging and error monitoring (Sentry, Logflare, or similar).

Contact
- If you want, I can convert this API to use a persistent store and prepare environment variable instructions for the chosen provider.