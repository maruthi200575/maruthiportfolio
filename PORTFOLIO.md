# M T Maruthi portfolio

## Run locally

Install Bun, then run `bun install` and `bun run dev`. Open the address printed by Vite. Run `bun run test` for the test suite. For a production deployment outside Lovable, run `bun run build` and use a TanStack Start-compatible hosting adapter; this is an SSR application, not a plain static Vite export.

## Update your portfolio

All personal content and missing links are in `src/data/portfolio.ts`. Set `profile.email`, `photo`, `resume`, `github`, `linkedin`, and `kaggle` when the real information is available. Set project `repository`, `demo`, and verified `technologies` individually. Replace the cautious project detail text only after checking what is implemented. Add certificate images and verification URLs to credential entries; do not count memberships or platform badges as professional certifications.

The current initials artwork is a symbolic monogram, not a photograph. Put a real photo URL in `profile.photo` to replace it. Use a genuine PDF URL in `profile.resume` to enable the resume button. The supplied screenshot was used as design reference, not as a portfolio asset.

## Contact delivery

The form validates required fields and email format. It does not claim successful delivery. Without a recipient it explains that sending is unavailable. With `profile.email` configured, it opens the visitor's email application with a draft. Automatic email delivery requires a real server-side email service, which is intentionally not connected yet. Never add private API keys to browser configuration.

## Publish

Use Publish in Lovable when the content is ready. Verify the live address after publishing. No deployment address is assumed by the portfolio. Add real photo, resume, professional links, project repositories and certificate assets before sharing with recruiters.

## Presentation

The portfolio uses one scrolling page with accessible section anchors, an initials-based illustration, category-filtered project cards, keyboard-accessible detail dialogs, a persisted light/dark preference, and reduced-motion handling. Theme colors and styling live in `src/styles.css`.