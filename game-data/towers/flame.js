(function registerFlameTower(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerTower("flame", {
    cost: 95,
    range: 70,
    rate: 0.22,
    damage: 28,
    color: "#f97316",
    slow: 0,
    coneAngle: 0.7,
    burnDps: 12,
    burnDuration: 2.4,
    blocksPath: true,
    onTick(context) {
      const { tower, stats, target, fireFlameCone, dt } = context;
      tower.cooldown = Math.max(0, (tower.cooldown || 0) - (dt || 0));
      if (!target || tower.cooldown > 0) return true;
      fireFlameCone(tower, target, stats);
      tower.cooldown = stats.rate;
      return true;
    },
    onFire(context) {
      const {
        tower,
        enemy,
        stats,
        state,
        getTowerMuzzlePoint,
        applyDamage,
        applyArmorHit,
        spawnNukeEmbers,
        performance,
        querySpatialHash,
      } = context;
      const flameData = stats.data || {};
      const muzzle = getTowerMuzzlePoint(tower, stats);
      const originX = muzzle.x;
      const originY = muzzle.y;
      const targetPos = { x: enemy.x, y: enemy.y };
      const angle = Math.atan2(targetPos.y - originY, targetPos.x - originX);
      const coneAngle = stats.coneAngle || 0.7;
      const range = stats.range;
      const damage = stats.damage;
      const burnDps = stats.burnDps > 0 ? stats.burnDps : (stats.fireDps > 0 ? stats.fireDps : (flameData.burnDps || 18));
      const burnDuration = stats.burnDuration > 0 ? stats.burnDuration : (stats.fireDuration > 0 ? stats.fireDuration : (flameData.burnDuration || 3));
      const igniteAll = Boolean(stats.flameIgniteAll);
      const spreadDepth = stats.flameSpreadDepth || 0;
      const spreadPower = stats.flameSpreadPower || 0;
      const spreadWindow = stats.flameSpreadWindow || 0;
      const spreadRadius = 50;
      const igniteRadius = stats.flameRadius || 0;
      const coneHalfAngle = Math.max(0.14, (coneAngle * 0.5) + 0.06);

      function igniteTarget(target, depth = 0) {
        if (target.hp <= 0) return;
        if (!target.immuneHeat) {
          applyDamage(target, damage * (depth > 0 ? Math.pow(spreadPower || 0.6, depth) : 1));
          if (!target.darkMatter) {
            target.burnTimer = Math.max(target.burnTimer, burnDuration);
            target.burnDps = Math.max(target.burnDps, burnDps);
          }
        }
        if (stats.flameReveal) {
          target.revealed = true;
          target.revealTimer = Math.max(target.revealTimer || 0, 3);
        }
        if (stats.flamePermanentReveal) {
          target.stealth = false;
          target.revealed = true;
        }
        if (!target.immuneHeat && stats.flameArmorMelt && target.armored) {
          applyArmorHit(target);
          applyArmorHit(target);
        }
      }

      const enemyHash = state.enemyHash || null;
      const scanRadius = Math.max(range, igniteRadius || 0) + 12;
      const nearbyEnemies = typeof querySpatialHash === "function"
        ? querySpatialHash(enemyHash, originX, originY, scanRadius)
        : state.enemies;

      const ignited = [];
      for (const target of nearbyEnemies) {
        if (target.hp <= 0) continue;
        if (target.stealth && !target.revealed && !state.revealStealth && !igniteAll) continue;
        const dx = target.x - originX;
        const dy = target.y - originY;
        const dist = Math.hypot(dx, dy);
        if (dist > range) continue;
        const targetAngle = Math.atan2(dy, dx);
        let diff = Math.abs(targetAngle - angle);
        if (diff > Math.PI) diff = Math.PI * 2 - diff;
        const inCone = diff <= coneHalfAngle;
        const inAura = igniteRadius > 0 && dist <= igniteRadius;
        if ((stats.flameIgniteAll && dist <= range + 4) || inCone || inAura) {
          igniteTarget(target);
          ignited.push(target);
        }
      }

      if (spreadDepth > 0 && ignited.length > 0) {
        const frontier = [...ignited];
        const seen = new Set(frontier);
        let depth = 0;
        while (frontier.length > 0 && depth < spreadDepth) {
          const next = [];
          for (const source of frontier) {
            if (spreadWindow > 0 && source.burnTimer < burnDuration - spreadWindow) continue;
            const spreadTargets = typeof querySpatialHash === "function"
              ? querySpatialHash(enemyHash, source.x, source.y, spreadRadius)
              : state.enemies;
            for (const candidate of spreadTargets) {
              if (candidate.hp <= 0) continue;
              if (seen.has(candidate)) continue;
              const dist = Math.hypot(candidate.x - source.x, candidate.y - source.y);
              if (dist <= spreadRadius) {
                igniteTarget(candidate, depth + 1);
                seen.add(candidate);
                next.push(candidate);
              }
            }
          }
          frontier.splice(0, frontier.length, ...next);
          depth += 1;
        }
      }

      state.flames.push({
        x: originX,
        y: originY,
        angle,
        range,
        spread: coneAngle,
        ttl: 0.12,
        full: igniteAll || igniteRadius > 0,
        radius: Math.max(igniteRadius, range),
        seed: Math.random() * Math.PI * 2,
        burnDps,
        burnDuration,
        flameReveal: stats.flameReveal || false,
        flamePermanentReveal: stats.flamePermanentReveal || false,
        flameArmorMelt: stats.flameArmorMelt || false,
        flameIgniteAll: igniteAll,
        flameSpreadDepth: spreadDepth,
        flameSpreadPower: spreadPower,
        flameSpreadWindow: spreadWindow,
      });

      const emberCount = 6;
      for (let i = 0; i < emberCount; i += 1) {
        const t = 0.2 + Math.random() * 0.6;
        const jitter = (Math.random() - 0.5) * coneAngle * 0.8;
        const emberAngle = angle + jitter;
        const dist = range * t;
        const ex = originX + Math.cos(emberAngle) * dist;
        const ey = originY + Math.sin(emberAngle) * dist;
        spawnNukeEmbers(ex, ey, 1);
      }
      if (performance && typeof performance.now === "function") {
        void performance.now();
      }
    },
  });
})(window);
