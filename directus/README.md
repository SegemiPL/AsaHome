# Directus CMS

## Directory Structure

```
directus/
├── snapshots/       # Schema snapshots (committed to Git)
│   └── schema.yaml
├── extensions/      # Custom extensions (hooks, endpoints, etc.)
└── README.md
```

## Schema Snapshots

Schema changes MUST be committed as snapshots — never just modify in the production admin UI.

### Export Schema

```bash
npx directus schema snapshot --yes ./directus/snapshots/schema.yaml
```

### Apply Schema

```bash
npx directus schema apply ./directus/snapshots/schema.yaml --yes
```

## Permissions

- **Admin role**: Full access (login with admin credentials)
- **Public role**: Read-only on `published` content; read-only on allowed public files
- Public role MUST NOT have write permissions to any collection
- Admin token MUST NOT be placed in browser-accessible code

## Collections (Phase 1)

| Collection | Purpose |
|------------|---------|
| `posts` | Blog posts with status workflow |
| `tags` | Blog tags (M2M with posts) |
| `site_settings` | Singleton: site config, SEO, feature toggles |
| `characters` | Character profiles (data only in Phase 1) |
| `desktop_releases` | Desktop pet releases (schema only in Phase 1) |

See `docs/reference/AsaHome_Coding_Agent_Development_Guide.md` Section 5 for the full data model.
