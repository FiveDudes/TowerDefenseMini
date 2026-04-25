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
  });
})(window);
