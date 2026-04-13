(function registerEnemyBase(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.baseEnemy = {
    name: "Enemy",
    desc: "",
    waveUnlock: null,
  };
})(window);
