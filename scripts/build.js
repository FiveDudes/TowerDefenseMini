const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");

const filesToCopy = [
  "index.html",
  "index.js",
  "styles.css",
  "game.js",
  "game-profile.js",
  "game-enemies.js",
  "game-effects.js",
  "game-audio.js",
  "game-data",
  "assets",
];

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const copyFile = (src, dest) => {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
};

const copyDir = (srcDir, destDir) => {
  ensureDir(destDir);
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
};

const cleanDist = () => {
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  ensureDir(distDir);
};

const run = () => {
  cleanDist();
  for (const entry of filesToCopy) {
    const srcPath = path.join(root, entry);
    const destPath = path.join(distDir, entry);
    if (!fs.existsSync(srcPath)) {
      throw new Error(`Missing source: ${entry}`);
    }
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
};

run();
