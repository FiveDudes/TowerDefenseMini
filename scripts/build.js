const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "..", "dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(distDir)) {
  throw new Error("dist directory is missing. Commit built assets to dist.");
}

if (!fs.existsSync(indexPath)) {
  throw new Error("dist/index.html is missing. Commit built assets to dist.");
}
