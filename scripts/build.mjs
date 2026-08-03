import { cp, mkdir, rm } from "node:fs/promises";
import { basename, join } from "node:path";
import { outputDirectory, publicEntries } from "./site-config.mjs";

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const entry of publicEntries) {
  await cp(entry, join(outputDirectory, basename(entry)), { recursive: true });
}

await import("./check-site.mjs");

if (!process.exitCode) {
  console.log(`Built the static site in ${outputDirectory}/.`);
}
