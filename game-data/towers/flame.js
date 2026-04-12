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
      } = context;
      const muzzle = getTowerMuzzlePoint(tower, stats);
      const originX = muzzle.x;
      const originY = muzzle.y;
      const targetPos = { x: enemy.x, y: enemy.y };
      const angle = Math.atan2(targetPos.y - originY, targetPos.x - originX);
      const coneAngle = stats.coneAngle || 0.7;
      const range = stats.range;
      const damage = stats.damage;
      const burnDps = stats.fireDps > 0 ? stats.fireDps : 18;
      const burnDuration = stats.fireDuration > 0 ? stats.fireDuration : 3;
      const igniteAll = Boolean(stats.flameIgniteAll);
      const spreadDepth = stats.flameSpreadDepth || 0;
      const spreadPower = stats.flameSpreadPower || 0;
      const spreadWindow = stats.flameSpreadWindow || 0;
      const spreadRadius = 50;
      const igniteRadius = stats.flameRadius || 0;

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

      const ignited = [];
      for (const target of state.enemies) {
        if (target.hp <= 0) continue;
        if (target.stealth && !target.revealed && !state.revealStealth && !igniteAll) continue;
        const dx = target.x - originX;
        const dy = target.y - originY;
        const dist = Math.hypot(dx, dy);
        if (dist > range) continue;
        const targetAngle = Math.atan2(dy, dx);
        let diff = Math.abs(targetAngle - angle);
        if (diff > Math.PI) diff = Math.PI * 2 - diff;
        const inCone = diff <= coneAngle * 0.5;
        const inAura = igniteRadius > 0 && dist <= igniteRadius;
        if ((stats.flameIgniteAll && dist <= range) || inCone || inAura) {
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
            for (const candidate of state.enemies) {
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

      const emberCount = 14;
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
