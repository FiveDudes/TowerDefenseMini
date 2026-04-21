export function createSpatialHash(cellSize) {
  return {
    cellSize: Math.max(1, Number(cellSize) || 1),
    buckets: new Map(),
  };
}

export function clearSpatialHash(hash) {
  if (!hash) return;
  hash.buckets.clear();
}

function hashKey(hash, x, y) {
  const size = Math.max(1, hash.cellSize || 1);
  return `${Math.floor(x / size)},${Math.floor(y / size)}`;
}

export function insertSpatialHash(hash, item, x, y) {
  const key = hashKey(hash, x, y);
  let bucket = hash.buckets.get(key);
  if (!bucket) {
    bucket = [];
    hash.buckets.set(key, bucket);
  }
  bucket.push(item);
}

export function buildSpatialHash(hash, items, getX, getY) {
  clearSpatialHash(hash);
  for (const item of items || []) {
    if (!item) continue;
    const x = Number(getX(item));
    const y = Number(getY(item));
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    insertSpatialHash(hash, item, x, y);
  }
  return hash;
}

export function querySpatialHash(hash, x, y, radius = 0) {
  if (!hash) return [];
  const size = Math.max(1, hash.cellSize || 1);
  const minX = Math.floor((x - radius) / size);
  const maxX = Math.floor((x + radius) / size);
  const minY = Math.floor((y - radius) / size);
  const maxY = Math.floor((y + radius) / size);
  const results = [];
  const seen = new Set();
  for (let cy = minY; cy <= maxY; cy += 1) {
    for (let cx = minX; cx <= maxX; cx += 1) {
      const bucket = hash.buckets.get(`${cx},${cy}`);
      if (!bucket) continue;
      for (const item of bucket) {
        if (seen.has(item)) continue;
        seen.add(item);
        results.push(item);
      }
    }
  }
  return results;
}

if (typeof window !== "undefined") {
  window.createSpatialHash = createSpatialHash;
  window.clearSpatialHash = clearSpatialHash;
  window.insertSpatialHash = insertSpatialHash;
  window.buildSpatialHash = buildSpatialHash;
  window.querySpatialHash = querySpatialHash;
}
