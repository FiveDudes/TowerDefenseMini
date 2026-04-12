(function registerSwarmEnemy(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerEnemy("swarm", {
    name: "Brood",
    desc: "Summons a flurry of tiny, fast enemies.",
    waveUnlock: { wave: 12, kind: "enemy", title: "Swarm", desc: "Spawns a sea of swarmlets." },
    onSpawn(context) {
      const {
        enemy,
        state,
        createEnemy,
        getActivePaths,
        allocateEnemyPackId,
      } = context;
      const pathGroup = Number.isFinite(enemy.pathGroup) ? enemy.pathGroup : 0;
      const packId = Number.isFinite(enemy.packId) ? enemy.packId : allocateEnemyPackId();
      enemy.packId = packId;
      const fallbackPaths = getActivePaths();
      const pathPoints = (enemy.path && enemy.path.length > 0)
        ? enemy.path
        : (fallbackPaths[pathGroup] || fallbackPaths[0] || []);
      if (!pathPoints || pathPoints.length < 2) return;
      const start = pathPoints[0];
      const next = pathPoints[1];
      const dx = next.x - start.x;
      const dy = next.y - start.y;
      const len = Math.hypot(dx, dy) || 1;
      const tangent = { x: dx / len, y: dy / len };
      const normal = { x: -tangent.y, y: tangent.x };
      for (let i = 0; i < 20; i += 1) {
        const brood = createEnemy("swarmlet", {
          armored: false,
          darkMatter: false,
          stealth: false,
          pathGroup,
          packId,
          pathOffset: {
            x: tangent.x * (-i * 10) + normal.x * ((Math.random() - 0.5) * 10),
            y: tangent.y * (-i * 10) + normal.y * ((Math.random() - 0.5) * 10),
          },
        });
        brood.x = enemy.x + tangent.x * (18 + Math.random() * 10 + i * 2);
        brood.y = enemy.y + tangent.y * (18 + Math.random() * 10 + i * 2);
        brood.path = pathPoints;
        brood.pathIndex = Math.min((enemy.pathIndex || 0) + 1, pathPoints.length - 2);
        state.enemies.push(brood);
      }
    },
  });
})(window);
