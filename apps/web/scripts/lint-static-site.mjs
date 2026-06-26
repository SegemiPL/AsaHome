import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const repoRoot = path.resolve(projectRoot, "../..");

const failures = [];

function fail(message) {
  failures.push(message);
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "out") {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

const appDir = path.join(projectRoot, "src", "app");
const sourceFiles = walk(path.join(projectRoot, "src")).filter((file) =>
  /\.(ts|tsx)$/.test(file),
);

for (const file of sourceFiles) {
  const text = fs.readFileSync(file, "utf8");
  const rel = relative(file);

  if (/from\s+["']next\/headers["']/.test(text)) {
    fail(`${rel}: imports next/headers, which is not static-export compatible`);
  }

  if (/\b(cookies|headers)\s*\(/.test(text)) {
    fail(`${rel}: uses cookies()/headers(), which require runtime request state`);
  }

  if (/["']use server["']/.test(text)) {
    fail(`${rel}: declares a Server Action`);
  }

  if (/process\.env(?!\.NODE_ENV)/.test(text)) {
    fail(`${rel}: reads process.env; static site config should live in src/data`);
  }
}

for (const file of walk(appDir)) {
  const base = path.basename(file);
  if (base === "route.ts" || base === "route.tsx") {
    fail(`${relative(file)}: API routes are not allowed in static export`);
  }
}

const forbiddenDocs = [
  "Directus + PostgreSQL",
  "docker compose -f infrastructure/compose/docker-compose.dev.yml",
];

const activeDocs = [
  path.join(repoRoot, "docs", "PROJECT_SPEC.md"),
  path.join(repoRoot, "docs", "STATIC_ARCHITECTURE.md"),
  path.join(repoRoot, "docs", "STATIC_DEPLOYMENT.md"),
  path.join(repoRoot, "docs", "CONTENT_GUIDE.md"),
];

for (const doc of activeDocs) {
  if (!fs.existsSync(doc)) continue;
  const text = fs.readFileSync(doc, "utf8");
  for (const phrase of forbiddenDocs) {
    if (text.includes(phrase)) {
      fail(`${relative(doc)}: active docs still mention "${phrase}"`);
    }
  }
}

if (failures.length > 0) {
  console.error("Static-site lint failed:");
  for (const message of failures) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

console.log("Static-site lint passed.");
