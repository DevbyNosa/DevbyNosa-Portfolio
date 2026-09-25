# Deployment

The frontend is deployed to Vercel and the Express API to Render. Production frontend requests use the backend origin from the `VITE_API_URL` build environment variable. Local development leaves that variable empty and uses Vite's `/api` proxy to `http://localhost:3000`.

## Deploy the API

1. Create a PostgreSQL database with your preferred provider.
2. In Render, create a Blueprint from this repository using `render.yaml`. Set `DATABASE_URL` to the database provider's connection string and `CLIENT_ORIGIN` to the exact deployed Vercel origin, such as `https://your-project.vercel.app`. For a custom frontend domain, include both origins separated by a comma.
3. Set `CLOUD_NAME`, `CLOUD_KEY`, and `CLOUD_SECRET` in Render to enable image uploads.
4. Run `database/Schema.sql` once against the empty production database. The session table is created automatically by `express-session` when the API starts.
5. Verify the API health endpoint at `https://devbynosa.onrender.com/health`.

Render generates `SESSION_SECRET` and `HASH_SALT`. Keep the generated secrets private. The free Render service may sleep when idle, so its first API request can take longer while it wakes.

## Deploy the frontend

Import the repository into Vercel and deploy from the repository root. `vercel.json` installs and builds `client`, publishes `client/dist`, and sends frontend routes to the React app. The production origin is set in `client/.env.production` as `VITE_API_URL=https://devbynosa.onrender.com`. If Render gives the service a different hostname, change that value or override `VITE_API_URL` in Vercel's Production environment. Add it to Preview only if you also add that preview deployment's exact origin to Render's `CLIENT_ORIGIN`.

The frontend's shared API client uses this origin for both Axios and `fetch` requests, and sends credentials for admin sessions. The API accepts only origins listed in Render's `CLIENT_ORIGIN`. Production session cookies use `SameSite=None; Secure` because the default Vercel and Render hostnames are cross-site. For the most reliable admin sessions across browsers that restrict third-party cookies, use a custom frontend domain and an API subdomain under the same registrable domain, then set `VITE_API_URL` and `CLIENT_ORIGIN` to those origins.

## Create the first admin

After applying the schema, run the seeder from an environment that can connect to the production database. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and optionally `ADMIN_NAME` only in that environment, then run `npm run seed:admin --prefix server`. The script hashes the password and refuses to overwrite an existing account.

For local development, copy `server/.env.example` to `server/.env` and `client/.env.example` to `client/.env.local`. Leave `VITE_API_URL` empty locally to use the Vite proxy. Fill in database and Cloudinary values, then run the API with `npm run dev --prefix server` and the frontend with `npm run dev --prefix client`.