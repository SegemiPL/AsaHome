# API Documentation

AsaHome is currently a static export site. It does not provide runtime API
routes, Server Actions, middleware, or database-backed endpoints.

## Current Site

- Blog content is read from `apps/web/src/content/posts/*.md` at build time.
- Character, TTS, and WindowPet data is read from `apps/web/src/data/*.ts`.
- Downloads link to external GitHub Releases.

## Future APIs

If online TTS or other dynamic features become necessary, add them as
independent services in separate repositories and record the decision in a new
ADR. Do not add API routes to the static site.

## Conventions

- Static site routes must remain compatible with `output: "export"`.
- Dynamic routes must provide `generateStaticParams()`.
- Secrets and tokens must not be exposed to browser code.
