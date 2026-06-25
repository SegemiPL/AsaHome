# AsaHome Static Deployment Guide

## Build

```bash
pnpm install
pnpm build
```

Output: `apps/web/out/` — pure HTML, CSS, and JavaScript files.

## Deployment Targets

### GitHub Pages

1. Push to `main` branch.
2. Configure GitHub Actions to build and deploy to `gh-pages` branch.
3. Or use the `actions/upload-pages-artifact` + `actions/deploy-pages` workflow.

### Cloudflare Pages

1. Connect repository to Cloudflare Pages.
2. Build command: `pnpm build`
3. Output directory: `apps/web/out`
4. Cloudflare automatically handles HTTPS and CDN.

### Alibaba Cloud OSS

1. Create an OSS bucket with static website hosting enabled.
2. Upload `apps/web/out/` contents to the bucket root.
3. Configure custom domain (requires ICP filing for mainland China).
4. Optionally add CDN acceleration.

### Tencent Cloud COS

1. Create a COS bucket with static website hosting.
2. Upload `apps/web/out/` contents.
3. Configure custom domain (requires ICP filing for mainland China).

### Any Static Host

The `out/` directory contains standard static files. Any web server (Nginx, Caddy, Apache) can serve them:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/out;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ $uri/index.html =404;
    }
}
```

## CI/CD via GitHub Actions

The CI workflow (`.github/workflows/ci.yml`) already:
1. Lints, typechecks, and tests the code.
2. Builds the static site.
3. Uploads `apps/web/out/` as a build artifact.

To enable automatic deployment, add a deploy step to the workflow:

```yaml
# Example: Deploy to Cloudflare Pages
- name: Deploy to Cloudflare Pages
  uses: cloudflare/wrangler-action@v3
  with:
    apiToken: ${{ secrets.CF_API_TOKEN }}
    accountId: ${{ secrets.CF_ACCOUNT_ID }}
    command: pages deploy apps/web/out --project-name=asahome
```

## Environment Variables

The only build-time variable needed:
- `NEXT_PUBLIC_SITE_URL`: Used for sitemap.xml and metadata (defaults to site.ts if not set).

No runtime environment variables or secrets are needed after build.
