<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the portfolio as a single scrolling index route with section anchors, because the brief explicitly requests smooth in-page navigation.
- Keep personal configuration, projects, skills and credentials in src/data/portfolio.ts, because missing assets and links must be replaceable without modifying presentation components.
- Keep contact delivery unconfigured until a recipient and delivery service are supplied; validate locally and never simulate successful sending.
- Define portfolio styling and theme roles centrally in src/styles.css and use shared Button and Dialog primitives for consistent accessible interactions.
