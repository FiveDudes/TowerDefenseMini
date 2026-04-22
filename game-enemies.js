(function attachEnemyRuntime(globalScope) {
  function createEnemy(deps, type, options = {}) {
    const { state, towerTypes, grid, getActivePaths, isBossType, coalesce, getEnemyDefinition } = deps;
    const definition = typeof getEnemyDefinition === "function" ? getEnemyDefinition(type) : null;
    const isBoss = isBossType(type);
    const isFast = type === "speedy" || type === "boss_fast";
    const isSwarmlet = type === "swarmlet";
    const isHeavy = type === "heavy" || type === "boss_pentagon" || type === "boss_hexagon";
    const isDiamond = type === "diamond" || type === "boss_diamond";
    const isAegis = type === "aegis";
    const isFlying = type === "flying";
    const isThief = type === "thief";
    const isTroll = type === "troll";
    const isBuffer = type === "buffer";
    const isSaboteur = type === "saboteur";
    const isChimera = type === "chimera";
    const isBroodMother = type === "broodMother";
    const tier = isBoss ? 3 : Math.min(3, Math.floor((state.wave - 1) / 6) + 1);
    const tierFactor = tier === 3 ? 4 : tier === 2 ? 2 : 1;
    const baseHp = state.wave === 1 ? 20 : 22 + state.wave * 5;
    const hpMultiplier = (state.difficultyMultipliers.enemyHp || 1) * 2;
    const maxHpBase = isBoss ? baseHp * 12 : baseHp;
    const speedyHpMultiplier = isFast ? 0.7 : 1;
    let maxHp = maxHpBase * hpMultiplier * (isHeavy ? 2.4 : 1) * speedyHpMultiplier * tierFactor;
    const baseSpeed = isFast
      ? (state.wave === 1 ? 56 : 60 + state.wave * 2.2)
      : (state.wave === 1 ? 26 : 28 + state.wave * 2.6);
    let speed = (isHeavy ? baseSpeed * 0.6 : baseSpeed) * (tier === 3 ? 0.75 : tier === 2 ? 0.85 : 1) * ((coalesce(options.stealth, type === "stealth")) ? 0.9 : 1);
    if (type === "labrat") {
      maxHp *= 0.9;
      speed *= 1.05;
    }
    if (isDiamond) {
      maxHp *= 0.9;
      speed *= 0.95;
    }
    if (isAegis) {
      maxHp *= 1.2;
      speed *= 0.9;
    }
    if (isFlying) {
      maxHp *= 0.7;
      speed *= 0.85;
    }
    if (isThief) {
      maxHp *= 0.65;
      speed *= 1.05;
    }
    if (isTroll) {
      maxHp *= 0.75;
      speed *= 0.95;
    }
    if (isBuffer) {
      maxHp *= 1.05;
      speed *= 0.85;
    }
    if (isSaboteur) {
      maxHp *= 0.9;
      speed *= 0.95;
    }
    if (isChimera) {
      maxHp *= 2.2;
      speed *= 0.85;
    }
    if (isBroodMother) {
      maxHp *= 1.5;
      speed *= 0.8;
    }
    if (isSwarmlet) {
      maxHp *= 0.2;
      speed *= 1.15;
    }
    const speedMultiplier = state.difficultyMultipliers.enemySpeed || 1;
    const radioactive = type === "labrat" ? false : (options.radioactive || state.radioactiveWave === state.wave);
    if (radioactive) {
      const factoryBonus = Math.max(0, state.radioactiveFactoryBonus || 0);
      const radioactiveMultiplier = Math.max(0.18, 0.5 - factoryBonus * 0.04);
      maxHp *= radioactiveMultiplier;
      speed *= radioactiveMultiplier;
    }
    const activePaths = getActivePaths();
    const pathGroup = coalesce(options.pathGroup, Math.floor(Math.random() * activePaths.length));
    const pathPoints = activePaths[pathGroup] || activePaths[0];
    const start = pathPoints[0];
    const pathOffset = type === "swarmlet"
      ? (options.pathOffset || { x: (Math.random() - 0.5) * 22, y: (Math.random() - 0.5) * 22 })
      : null;
    const isStealth = coalesce(options.stealth, type === "stealth");
    const baseCastleDamage = type === "swarm" || type === "swarmlet" ? 8 : 5;
    const armoredFlag = !isStealth && (options.armored || isDiamond || isChimera || false);
    const darkMatterFlag = !armoredFlag && !isDiamond && (options.darkMatter || false);
    const enemy = {
      x: start.x + (pathOffset ? pathOffset.x : 0),
      y: start.y + (pathOffset ? pathOffset.y : 0),
      hp: maxHp,
      maxHp,
      speed: speed * speedMultiplier,
      path: pathPoints,
      pathIndex: 0,
      slowTimer: 0,
      type,
      armored: armoredFlag,
      darkMatter: darkMatterFlag,
      dotTimer: 0,
      dotDps: 0,
      burnTimer: 0,
      burnDps: 0,
      burnStacks: 0,
      burnStackTimer: 0,
      embrittleTimer: 0,
      embrittleMultiplier: 1,
      tier,
      tierFactor,
      isBoss,
      facing: 0,
      stealth: isStealth || isChimera,
      revealed: !(isStealth || isChimera),
      radioactive: isChimera ? true : radioactive,
      revealTimer: 0,
      nukeImmune: type === "labrat" || (isDiamond && tier >= 3) || isChimera,
      immuneHeat: isDiamond || isChimera,
      immuneExplosion: isDiamond || isChimera,
      explosionVulnerable: type === "swarmlet",
      pathOffset,
      pathGroup,
      packId: coalesce(options.packId, 0),
      castleDamage: baseCastleDamage,
      umbrellaRadius: isAegis ? grid.size * 2 : 0,
      umbrellaShielded: false,
      flying: isFlying || isChimera,
      thief: isThief,
      stealTimer: isThief ? 2 : 0,
      troll: isTroll,
      backtrackTimer: 0,
      backtrackCooldown: isTroll ? 1.5 : 0,
      backtrackSpeedMult: isTroll ? 2.4 : 1,
      buffer: isBuffer,
      buffRadius: isBuffer ? grid.size * 2.4 : 0,
      buffed: false,
      healRate: isBuffer ? 6 : 0,
      saboteur: isSaboteur,
      sabotageTimer: isSaboteur ? 1.8 : 0,
      chimera: isChimera,
      broodMother: isBroodMother,
      broodTimer: isBroodMother ? 2.4 : 0,
      definition,
    };
    if (enemy.armored) {
      enemy.armorHits = 0;
      enemy.armorBreakThreshold = 2 + Math.floor(Math.random() * 2);
    }
    if (options.poisoned) {
      enemy.dotTimer = coalesce(options.dotTimer, 4);
      enemy.dotDps = coalesce(options.dotDps, (towerTypes.dart ? towerTypes.dart.poisonDps : undefined) || 8);
    }
    if (options.onFlame) {
      enemy.burnTimer = coalesce(options.burnTimer, 2.5);
      enemy.burnDps = coalesce(options.burnDps, (towerTypes.laser ? towerTypes.laser.fireDps : undefined) || 6);
    }
    return enemy;
  }

  function getEnemyPosition(enemy) {
    return { x: enemy.x, y: enemy.y };
  }

  function getEnemyRadius(deps, enemy) {
    const { isBossType } = deps;
    const tierScale = 1 + ((enemy.tier || 1) - 1) * 0.18;
    const isBoss = enemy.isBoss || isBossType(enemy.type);
    const baseRadius = enemy.type === "swarmlet" ? 6 : isBoss ? 22 : enemy.type === "heavy" ? 16 : 12;
    return baseRadius * tierScale;
  }

  function ensureEnemyPath(deps, enemy) {
    const { getActivePaths } = deps;
    if (!enemy) return;
    if (Number.isFinite(enemy.x) && Number.isFinite(enemy.y)) return;
    const paths = getActivePaths();
    if (!paths || paths.length === 0) return;
    const group = Number.isFinite(enemy.pathGroup) ? enemy.pathGroup : 0;
    const pathPoints = paths[group] || paths[0];
    if (!pathPoints || pathPoints.length === 0) return;
    enemy.path = pathPoints;
    enemy.pathIndex = 0;
    enemy.x = pathPoints[0].x;
    enemy.y = pathPoints[0].y;
  }

  globalScope.TDMEnemyRuntime = {
    createEnemy,
    getEnemyPosition,
    getEnemyRadius,
    ensureEnemyPath,
  };
})(window);
