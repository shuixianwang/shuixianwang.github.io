import { cp, copyFile, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const rootAssets = path.join(root, "assets");
const distAssets = path.join(dist, "assets");

await copyFile(path.join(dist, "index.html"), path.join(root, "index.html"));
await mkdir(rootAssets, { recursive: true });

const existingAssets = await readdir(rootAssets, { withFileTypes: true }).catch(() => []);
await Promise.all(
  existingAssets
    .filter((entry) => entry.isFile() && /^index-.*\.(css|js)$/.test(entry.name))
    .map((entry) => rm(path.join(rootAssets, entry.name)))
);

await cp(distAssets, rootAssets, { recursive: true });

console.log("Exported dist/ to legacy GitHub Pages root.");
