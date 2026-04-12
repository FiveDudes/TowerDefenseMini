(function registerBroodMotherEnemy(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerEnemy("broodMother", {
    name: "Brood Mother",
    desc: "Spawns broods of swarmlets as it advances.",
    waveUnlock: { wave: 16, kind: "enemy", title: "Brood Mother", desc: "Summons broods as it moves." },
    onTick(context) {
      const {
        enemy,
        state,
        dt,
        createEnemy,
        getActivePaths,
        allocateEnemyPackId,
      } = context;
      enemy.broodTimer = Math.max(0, (enemy.broodTimer || 0) - dt);
      if (enemy.broodTimer > 0) return;
      const pathGroup = Number.isFinite(enemy.pathGroup) ? enemy.pathGroup : 0;
      const packId = Number.isFinite(enemy.packId) ? enemy.packId : allocateEnemyPackId();
      enemy.packId = packId;
      const fallbackPaths = getActivePaths();
      const pathPoints = (enemy.path && enemy.path.length > 0)
        ? enemy.path
        : (fallbackPaths[pathGroup] || fallbackPaths[0] || []);
      if (!pathPoints || pathPoints.length < 2) return;
      const originIndex = Math.max(0, Math.min(enemy.pathIndex || 0, pathPoints.length - 2));
      const current = pathPoints[originIndex];
      const next = pathPoints[originIndex + 1];
      const dx = next.x - current.x;
      const dy = next.y - current.y;
      const len = Math.hypot(dx, dy) || 1;
      const tangent = { x: dx / len, y: dy / len };
      const normal = { x: -tangent.y, y: tangent.x };
      for (let i = 0; i < 3; i += 1) {
        const brood = createEnemy("swarmlet", {
          armored: false,
          darkMatter: false,
          stealth: false,
          pathGroup,
          packId,
        });
        const forward = 18 + Math.random() * 10 + i * 2;
        const lateral = (Math.random() - 0.5) * 10;
        brood.x = enemy.x + tangent.x * forward + normal.x * lateral;
        brood.y = enemy.y + tangent.y * forward + normal.y * lateral;
        brood.path = pathPoints;
        brood.pathIndex = Math.min(originIndex + 1, pathPoints.length - 2);
        brood.pathOffset = {
          x: normal.x * lateral,
          y: normal.y * lateral,
        };
        state.enemies.push(brood);
      }
      enemy.broodTimer = 2.6;
    },
  });
})(window);
