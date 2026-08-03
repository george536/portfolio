import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { cloudflareAssetLimitBytes, publicEntries } from "./site-config.mjs";

async function collectFiles(path) {
  const pathStats = await stat(path);

  if (pathStats.isFile()) {
    return [{ path, size: pathStats.size }];
  }

  const entries = await readdir(path, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map((entry) => collectFiles(join(path, entry.name))),
  );

  return nestedFiles.flat();
}

const files = (
  await Promise.all(publicEntries.map((entry) => collectFiles(entry)))
).flat();

const oversizedFiles = files.filter(
  ({ size }) => size > cloudflareAssetLimitBytes,
);

const htmlFiles = files.filter(({ path }) => path.endsWith(".html"));
const missingReferences = [];

for (const { path: htmlPath } of htmlFiles) {
  const html = await readFile(htmlPath, "utf8");
  const references = html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi);

  for (const [, reference] of references) {
    if (/^(?:[a-z]+:|\/\/|#)/i.test(reference)) {
      continue;
    }

    const [pathWithoutQuery] = reference.split(/[?#]/, 1);
    if (!pathWithoutQuery) {
      continue;
    }

    const decodedPath = decodeURIComponent(pathWithoutQuery);
    const referencedPath = resolve(dirname(htmlPath), decodedPath);
    const candidatePath = decodedPath.endsWith("/")
      ? join(referencedPath, "index.html")
      : referencedPath;

    try {
      await stat(candidatePath);
    } catch {
      missingReferences.push(
        `${relative(process.cwd(), htmlPath)} -> ${reference}`,
      );
    }
  }
}

if (oversizedFiles.length > 0) {
  const details = oversizedFiles
    .map(
      ({ path, size }) =>
        `  - ${relative(process.cwd(), path)} (${(size / 1024 / 1024).toFixed(2)} MiB)`,
    )
    .join("\n");

  console.error(
    `Cloudflare Pages rejects individual assets larger than 25 MiB:\n${details}`,
  );
  process.exitCode = 1;
}

if (missingReferences.length > 0) {
  console.error(
    `The site contains missing local references:\n  - ${missingReferences.join("\n  - ")}`,
  );
  process.exitCode = 1;
}

if (!process.exitCode) {
  console.log(
    `Checked ${files.length} public files; local references resolve and every asset is within Cloudflare Pages' 25 MiB limit.`,
  );
}
