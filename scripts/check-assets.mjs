/**
 * Fails the build if the exported site links to a local file that isn't there.
 *
 * Written after a `git add -A` quietly staged the deletion of the resume PDF:
 * the pages still carried two links to it, the build succeeded, and the only
 * symptom was a 404 on a file nobody thought to re-check. A static export has
 * no server to notice this at runtime, so it gets noticed here instead.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory()
      ? htmlFiles(path)
      : path.endsWith(".html")
        ? [path]
        : [];
  });
}

if (!existsSync(OUT)) {
  console.error(`check-assets: no ${OUT}/ directory — run the build first.`);
  process.exit(1);
}

/* Root-relative links to a real file extension. Next's own hashed bundles are
   emitted by the build itself, so they are not the interesting case here. */
const REF = /(?:src|href)="(\/[^"?#]+\.(?:png|webp|jpe?g|svg|gif|avif|pdf|ico|woff2?|mp4|webm))"/g;

const missing = new Map();
let refCount = 0;

for (const file of htmlFiles(OUT)) {
  const html = readFileSync(file, "utf8");
  for (const [, ref] of html.matchAll(REF)) {
    refCount += 1;
    if (!existsSync(join(OUT, ref))) {
      if (!missing.has(ref)) missing.set(ref, new Set());
      missing.get(ref).add(file);
    }
  }
}

if (missing.size > 0) {
  console.error(
    `\ncheck-assets: ${missing.size} referenced file(s) are not in ${OUT}/:\n`,
  );
  for (const [ref, pages] of missing) {
    console.error(`  ${ref}`);
    for (const p of pages) console.error(`      linked from ${p}`);
  }
  console.error("");
  process.exit(1);
}

console.log(`check-assets: ${refCount} asset references, all present.`);
