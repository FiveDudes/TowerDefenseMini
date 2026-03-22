const fs = require("fs/promises");
const path = require("path");

async function copyIfExists(src, dest) {
  try {
    const stat = await fs.stat(src);
    if (stat.isDirectory()) {
      await fs.cp(src, dest, { recursive: true });
      return;
    }
    await fs.copyFile(src, dest);
  } catch (err) {
    if (err && err.code === "ENOENT") return;
    throw err;
  }
}

async function main() {
  const root = path.resolve(__dirname, "..");
  const dist = path.join(root, "dist");

  await fs.rm(dist, { recursive: true, force: true });
  await fs.mkdir(dist, { recursive: true });

  const entries = [
    "index.html",
    "styles.css",
    "game.js",
    "index.js",
    "assets",
  ];

  await Promise.all(
    entries.map((entry) =>
      copyIfExists(path.join(root, entry), path.join(dist, entry))
    )
  );

  console.log("Build complete: dist/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
