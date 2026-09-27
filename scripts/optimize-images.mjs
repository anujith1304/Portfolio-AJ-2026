/**
 * Pre-renders the responsive image set that next/image would normally ask a
 * server for.
 *
 * `output: "export"` turns Next's optimizer off — /_next/image is a server
 * route and GitHub Pages has no server, which is why the config carried
 * `unoptimized: true`. The pieces still work apart, though: next/image will
 * hand any URL it likes to a custom loader, so the widths get built here ahead
 * of time and the loader just points at them. Same srcset, same behaviour, no
 * server.
 *
 * For each raster under public/images it writes WebP at every ladder width up
 * to the source's own width (never past it — upscaling costs bytes and adds
 * nothing) into public/images/_opt/, then records what exists in
 * src/lib/image-manifest.json so the loader can pick without touching disk.
 *
 * Originals stay put. Two references reach images without going through
 * next/image — the canvas texture in an inline style and the footer's
 * <picture> — and both would break if the files moved.
 *
 * Animated WebP is skipped: sharp would silently flatten it to frame one, and
 * the footer clip is exactly that.
 */
import { readdir, stat, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative, dirname, extname } from "node:path";
import sharp from "sharp";

const SRC_DIR = "public/images";
const OPT_DIR = "public/images/_opt";
const MANIFEST = "src/lib/image-manifest.json";

/* Covers a 320px phone at 1x through a 1920 desktop at 2x. */
const LADDER = [384, 640, 828, 1080, 1440, 1920, 2560, 3840];
const QUALITY = 82;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_opt") continue;
      out.push(...(await walk(path)));
    } else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
      out.push(path);
    }
  }
  return out;
}

const files = (await walk(SRC_DIR)).sort();
const manifest = {};
let before = 0;
let after = 0;
let skipped = 0;

for (const file of files) {
  const image = sharp(file, { animated: false });
  const meta = await image.metadata();

  /* One frame is a still; more than one is an animation sharp would destroy. */
  if ((meta.pages ?? 1) > 1) {
    skipped += 1;
    continue;
  }

  const rel = relative(SRC_DIR, file);
  const key = `/images/${rel.split(/[\\/]/).join("/")}`;
  const stem = rel.slice(0, -extname(rel).length);

  const widths = LADDER.filter((w) => w < meta.width);
  widths.push(meta.width); // the source width always belongs in the set

  before += (await stat(file)).size;
  const built = [];

  for (const width of widths) {
    const out = join(OPT_DIR, `${stem}.${width}.webp`);
    await mkdir(dirname(out), { recursive: true });

    if (!existsSync(out)) {
      await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(out);
    }
    after += (await stat(out)).size;
    built.push(width);
  }

  manifest[key] = built;
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 0)}\n`);

const mb = (n) => (n / 1048576).toFixed(1);
console.log(
  `optimize-images: ${Object.keys(manifest).length} sources -> ` +
    `${Object.values(manifest).reduce((a, w) => a + w.length, 0)} variants` +
    (skipped ? `, ${skipped} animated skipped` : ""),
);
console.log(
  `  originals ${mb(before)} MB; every variant of every image ${mb(after)} MB ` +
    `(a visitor downloads one width, not the set)`,
);
