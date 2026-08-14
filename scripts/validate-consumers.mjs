import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = resolve(repoRoot, "..");
const sourceExtensions = new Set([".js", ".mjs", ".ts", ".tsx", ".vue"]);
const ignoredDirectories = new Set([
  ".git",
  "dist",
  "dist-admin",
  "dist-remote",
  "node_modules",
  "preview-dist",
]);

const consumers = [
  {
    name: "project",
    manifest: join(workspaceRoot, "project.tilty.io", "client", "package.json"),
    sources: [join(workspaceRoot, "project.tilty.io", "client", "src")],
  },
  {
    name: "auth",
    manifest: join(workspaceRoot, "auth.tilty.io", "auth.tilty.io client", "package.json"),
    sources: [join(workspaceRoot, "auth.tilty.io", "auth.tilty.io client", "src")],
  },
  {
    name: "dashboard",
    manifest: join(workspaceRoot, "dashboard.tilty.io", "client", "package.json"),
    sources: [join(workspaceRoot, "dashboard.tilty.io", "client", "src")],
  },
  {
    name: "ty-vortex",
    manifest: null,
    sources: [join(workspaceRoot, "ty-vortex")],
  },
];

const errors = [];
let scannedFiles = 0;
let packageImports = 0;

function walk(directory) {
  if (!existsSync(directory)) {
    errors.push(`Dossier consommateur absent : ${directory}`);
    return [];
  }

  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink() || lstatSync(path).isSymbolicLink()) continue;
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) files.push(...walk(path));
      continue;
    }
    if (entry.isFile() && sourceExtensions.has(extname(entry.name))) files.push(path);
  }
  return files;
}

for (const consumer of consumers) {
  if (consumer.manifest) {
    const manifest = JSON.parse(readFileSync(consumer.manifest, "utf8"));
    const dependency = manifest.dependencies?.["@davidmars/js-helpers"];
    if (!dependency) errors.push(`${consumer.name} ne déclare pas @davidmars/js-helpers.`);
  }

  for (const sourceRoot of consumer.sources) {
    for (const file of walk(sourceRoot)) {
      scannedFiles += 1;
      const source = readFileSync(file, "utf8");
      packageImports += source.match(/@davidmars\/js-helpers/g)?.length ?? 0;
      if (/ty-vortex[\\/]js-helpers/.test(source)) {
        errors.push(`${file} importe encore js-helpers via Ty-Vortex.`);
      }
      if (/@davidmars\/js-helpers\/dist\//.test(source)) {
        errors.push(`${file} importe un chemin interne dist/.`);
      }
      if (consumer.name === "ty-vortex" && /["'](?:\.\.\/)+js-helpers\//.test(source)) {
        errors.push(`${file} dépend encore d'un lien js-helpers local.`);
      }
    }
  }
}

const retiredJunction = join(workspaceRoot, "ty-vortex", "js-helpers");
if (existsSync(retiredJunction)) {
  errors.push(`La jonction retirée existe encore : ${retiredJunction}`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Consommateurs js-helpers valides : ${scannedFiles} fichiers contrôlés, ${packageImports} imports directs.`);
}
