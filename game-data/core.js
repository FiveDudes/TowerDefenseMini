(function bootstrapTdmData(globalScope) {
  const data = globalScope.TDMData || {
    maps: [],
    towers: {},
    enemies: {},
    mutations: [],
    waveUnlocks: [],
  };

  data.baseTower = data.baseTower || {
    cost: 0,
    range: 0,
    rate: 0,
    damage: 0,
    color: "#ffffff",
    slow: 0,
    blocksPath: false,
  };

  data.baseEnemy = data.baseEnemy || {
    name: "Enemy",
    desc: "",
    waveUnlock: null,
  };

  data.registerTower = (id, definition) => {
    data.towers[id] = {
      key: id,
      ...data.baseTower,
      ...definition,
    };
  };

  data.registerEnemy = (id, definition) => {
    data.enemies[id] = {
      key: id,
      ...data.baseEnemy,
      ...definition,
    };
    if (definition.waveUnlock) {
      data.waveUnlocks.push({
        ...definition.waveUnlock,
        value: definition.waveUnlock.value || id,
      });
    }
  };

  data.registerMutation = (definition) => {
    data.mutations.push(definition);
    if (definition.waveUnlock) {
      data.waveUnlocks.push({
        ...definition.waveUnlock,
        value: definition.waveUnlock.value || definition.key,
      });
    }
  };

  globalScope.TDMData = data;
})(window);
