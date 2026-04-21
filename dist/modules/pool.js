const projectilePool = [];

function resetProjectile(projectile) {
  for (const key of Object.keys(projectile)) {
    delete projectile[key];
  }
  return projectile;
}

export function acquireProjectile(template = {}) {
  const projectile = projectilePool.pop() || {};
  resetProjectile(projectile);
  return Object.assign(projectile, template);
}

export function releaseProjectile(projectile) {
  if (!projectile) return;
  resetProjectile(projectile);
  projectilePool.push(projectile);
}

export function clearProjectilePool() {
  projectilePool.length = 0;
}

