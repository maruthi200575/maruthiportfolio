# maruthiportfolio

use this above prompt and take this image as example

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://maruthiportfolio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/921ef783-43b1-4b8a-85db-07556da60086).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Deploying to Netlify

The project builds for Netlify with Nitro's `netlify` preset (configured in `vite.config.ts`).

1. Push this repository to GitHub (it already syncs from Lovable).
2. In Netlify, **Add new site → Import an existing project** and pick the repository.
3. Netlify reads `netlify.toml` automatically — no settings to enter:
   - build command: `npm run build`
   - publish directory: `dist`
   - SSR handler: `.netlify/functions-internal/server` (Netlify Functions v2)
4. Deploy. Every push to `main` (including Lovable edits) will redeploy the site.

No environment variables are required — the site talks to Lovable Cloud from the browser with its publishable key.

