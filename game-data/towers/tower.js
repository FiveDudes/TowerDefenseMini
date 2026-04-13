(function registerTowerBase(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.baseTower = {
    cost: 0,
    range: 0,
    rate: 0,
    damage: 0,
    color: "#ffffff",
    slow: 0,
    blocksPath: false,
  };
})(window);
