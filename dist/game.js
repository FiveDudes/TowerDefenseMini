let booted = false;
const boot = () => {
  if (booted) return;
  const canvas = document.getElementById("game");
  const titleScreen = document.getElementById("title-screen");
  if (!canvas || !titleScreen) {
    requestAnimationFrame(boot);
    return;
  }
  booted = true;
  const ctx = canvas.getContext("2d");
  function coalesce(value, fallback) {
    return value === null || value === undefined ? fallback : value;
  }
const nukeImage = new Image();
nukeImage.src = "./assets/nuke.png";
const sixSevenImage = new Image();
sixSevenImage.src = "./assets/sixseven-six.gif";

const ui = {
  lives: document.getElementById("lives"),
  gold: document.getElementById("gold"),
  wave: document.getElementById("wave"),
  damage: document.getElementById("damage"),
  mapName: document.getElementById("map-name"),
  encyclopedia: document.getElementById("encyclopedia"),
  encyclopediaModal: document.getElementById("encyclopedia-modal"),
  encyclopediaModalContent: document.getElementById("encyclopedia-modal-content"),
  openEncyclopedia: document.getElementById("open-encyclopedia"),
  closeEncyclopedia: document.getElementById("close-encyclopedia"),
  tipsModal: document.getElementById("tips-modal"),
  openTips: document.getElementById("open-tips"),
  closeTips: document.getElementById("close-tips"),
  alertModal: document.getElementById("alert-modal"),
  alertTitle: document.getElementById("alert-title"),
  alertContent: document.getElementById("alert-content"),
  closeAlert: document.getElementById("close-alert"),
  tutorialModal: document.getElementById("tutorial-modal"),
  openTutorial: document.getElementById("open-tutorial"),
  closeTutorial: document.getElementById("close-tutorial"),
  jasperModal: document.getElementById("jasper-modal"),
  openJasper: document.getElementById("open-jasper"),
  closeJasper: document.getElementById("close-jasper"),
  damageFlash: document.getElementById("damage-flash"),
  playArea: document.getElementById("play-area"),
  buildWatch: document.getElementById("build-watch"),
  buildFreeze: document.getElementById("build-freeze"),
  buildDrone: document.getElementById("build-drone"),
  buildBomb: document.getElementById("build-bomb"),
  buildLaser: document.getElementById("build-laser"),
  buildFlame: document.getElementById("build-flame"),
  buildDart: document.getElementById("build-dart"),
  buildTrap: document.getElementById("build-trap"),
  buildSpike: document.getElementById("build-spike"),
  buildMine: document.getElementById("build-mine"),
  buildFloorSpike: document.getElementById("build-floor-spike"),
  buildWall: document.getElementById("build-wall"),
  buildOp: document.getElementById("build-op"),
  nukeButton: document.getElementById("nuke-button"),
  startWave: document.getElementById("start-wave"),
  pauseWave: document.getElementById("pause-wave"),
  nukeCount: document.getElementById("nuke-count"),
  upgradeDetails: document.getElementById("upgrade-details"),
  upgradePanel: document.getElementById("upgrade-panel"),
  upgradeTarget: document.getElementById("upgrade-target"),
  upgradeTo: document.getElementById("upgrade-to"),
  upgradeTargetRow: document.getElementById("upgrade-target-row"),
  upgradeTargetAction: document.getElementById("upgrade-target-action"),
  wallUpgradeAction: document.getElementById("wall-upgrade-action"),
  upgradeWall: document.getElementById("upgrade-wall"),
  trapUpgradeAction: document.getElementById("trap-upgrade-action"),
  upgradeTrap: document.getElementById("upgrade-trap"),
  targetingRow: document.getElementById("targeting-row"),
  targetingMode: document.getElementById("targeting-mode"),
  watchUpgradeActions: document.getElementById("watch-upgrade-actions"),
  watchPath1: document.getElementById("watch-path-1"),
  watchPath2: document.getElementById("watch-path-2"),
  freezeUpgradeActions: document.getElementById("freeze-upgrade-actions"),
  freezePath1: document.getElementById("freeze-path-1"),
  freezePath2: document.getElementById("freeze-path-2"),
  bombUpgradeActions: document.getElementById("bomb-upgrade-actions"),
  bombPath1: document.getElementById("bomb-path-1"),
  bombPath2: document.getElementById("bomb-path-2"),
  dartUpgradeActions: document.getElementById("dart-upgrade-actions"),
  dartPath1: document.getElementById("dart-path-1"),
  dartPath2: document.getElementById("dart-path-2"),
  trapUpgradeActions: document.getElementById("trap-upgrade-actions"),
  trapPath1: document.getElementById("trap-path-1"),
  trapPath2: document.getElementById("trap-path-2"),
  laserUpgradeActions: document.getElementById("laser-upgrade-actions"),
  laserPath1: document.getElementById("laser-path-1"),
  laserPath2: document.getElementById("laser-path-2"),
  flameUpgradeActions: document.getElementById("flame-upgrade-actions"),
  flamePath1: document.getElementById("flame-path-1"),
  flamePath2: document.getElementById("flame-path-2"),
  droneUpgradeActions: document.getElementById("drone-upgrade-actions"),
  dronePath1: document.getElementById("drone-path-1"),
  dronePath2: document.getElementById("drone-path-2"),
  spikeUpgradeActions: document.getElementById("spike-upgrade-actions"),
  spikePath1: document.getElementById("spike-path-1"),
  spikePath2: document.getElementById("spike-path-2"),
  jasperControls: document.getElementById("jasper-controls"),
  towerLevelCap: document.getElementById("tower-level-cap"),
  setWave: document.getElementById("set-wave"),
  applyWave: document.getElementById("apply-wave"),
  waveSpeed: document.getElementById("wave-speed"),
  autoWave: document.getElementById("auto-wave"),
  halfCash: document.getElementById("half-cash"),
  spawnEnemy: document.getElementById("spawn-enemy"),
  spawnEnemyType: document.getElementById("spawn-enemy-type"),
  spawnEnemyCount: document.getElementById("spawn-enemy-count"),
  spawnEnemyRadioactive: document.getElementById("spawn-enemy-radioactive"),
  spawnEnemyArmored: document.getElementById("spawn-enemy-armored"),
  spawnEnemyDarkMatter: document.getElementById("spawn-enemy-darkmatter"),
  spawnEnemyOnFlame: document.getElementById("spawn-enemy-onflame"),
  spawnEnemyPoisoned: document.getElementById("spawn-enemy-poisoned"),
  gameOver: document.getElementById("game-over"),
  sixSevenOverlay: document.getElementById("sixseven-overlay"),
  sixSevenGif: document.getElementById("sixseven-gif"),
  restartGame: document.getElementById("restart-game"),
  mainMenu: document.getElementById("main-menu"),
};

const buildButtons = {
  watch: ui.buildWatch,
  freeze: ui.buildFreeze,
  drone: ui.buildDrone,
  bomb: ui.buildBomb,
  laser: ui.buildLaser,
  flame: ui.buildFlame,
  dart: ui.buildDart,
  trap: ui.buildTrap,
  spikeTower: ui.buildSpike,
  mine: ui.buildMine,
  floorSpike: ui.buildFloorSpike,
  wall: ui.buildWall,
  op: ui.buildOp,
};

const targetingModes = ["first", "last", "strongest", "weakest"];
const targetingLabels = {
  first: "First",
  last: "Last",
  strongest: "Strongest",
  weakest: "Weakest",
};

const state = {
  lives: 100,
  maxLives: 100,
  gold: 200,
  wave: 0,
  totalDamage: 0,
  placing: null,
  towers: [],
  enemies: [],
  projectiles: [],
  beams: [],
  explosions: [],
  flames: [],
  traps: [],
  selectedTower: null,
  selectedTrap: null,
  waveInProgress: false,
  paused: false,
  pauseDrain: 0,
  lastLives: 100,
  damageFlashCooldown: 0,
  damageFlashActive: false,
  nukeUsed: false,
  spawnTimer: 0,
  enemiesToSpawn: 0,
  easterUnlocked: false,
  keysDown: new Set(),
  numberKeysDown: new Set(),
  opPlaced: false,
  pathPoints: [],
  wallsPlaced: 0,
  controlledDrone: null,
  encyclopedia: new Set(),
  gameStarted: false,
  difficulty: null,
  infiniteGold: false,
  keyBuffer: "",
  jasperProgress: 0,
  revealStealth: false,
  autoWave: false,
  waveSpeed: 1,
  towerLevelCap: 5,
  mapId: "rift",
  mapPaths: [],
  mapStartCells: [],
  mapEndCell: null,
  mapEndPoint: null,
  mapPalette: {
    top: "#200b3b",
    mid: "#130820",
    bottom: "#0c0516",
    shadow: "rgba(0, 0, 0, 0.3)",
  },
  preferredPathCells: new Set(),
  difficultyMultipliers: {
    enemyHp: 1,
    enemySpeed: 1,
    gold: 1,
  },
  shadowSeeds: Array.from({ length: 8 }, (_, i) => ({
    x: (i * 137) % 960,
    y: (i * 83) % 540,
    speed: 5 + (i % 3) * 3,
    size: 22 + (i % 4) * 6,
  })),
  portalClock: 0,
  nukeLaunches: [],
  nukeParticles: [],
  screenShakeTime: 0,
  screenShakeDuration: 0,
  screenShakePower: 0,
  radioactiveWave: null,
  nukeCharges: 0,
  nukeSmoke: null,
  sixSevenActive: false,
  sixSevenTimer: null,
  halfCash: false,
};

window.state = state;
window.getState = () => state;
window.updateTowers = updateTowers;
window.getTowerStats = getTowerStats;
window.selectTarget = selectTarget;
window.getNearestPathPoint = getNearestPathPoint;
window.getSpikeDirection = getSpikeDirection;
window.debugState = () => ({
  wave: state.wave,
  waveInProgress: state.waveInProgress,
  paused: state.paused,
  nukeSmoke: Boolean(state.nukeSmoke),
  towers: state.towers.map((tower) => ({
    type: tower.type,
    x: Math.round(tower.x),
    y: Math.round(tower.y),
    level: tower.level,
    cooldown: tower.cooldown,
    disabled: tower.disabled,
  })),
  enemies: state.enemies.map((enemy) => ({
    type: enemy.type,
    x: Math.round(enemy.x),
    y: Math.round(enemy.y),
    hp: Math.round(enemy.hp),
    armored: enemy.armored,
    stealth: enemy.stealth,
  })),
  projectiles: state.projectiles.length,
});
window.debugTargets = () =>
  state.towers.map((tower) => {
    const stats = getTowerStats(tower);
    const target = stats ? selectTarget(tower, stats) : null;
    return {
      type: tower.type,
      range: stats ? Math.round(stats.range) : 0,
      rate: stats ? stats.rate : null,
      cooldown: tower.cooldown,
      target: target ? { type: target.type, x: Math.round(target.x), y: Math.round(target.y) } : null,
    };
  });
window.debugShoot = () => {
  const tower = state.towers.find((entry) => entry.type !== "mine" && entry.type !== "floorSpike");
  const enemy = state.enemies.find((entry) => entry.hp > 0);
  if (!tower || !enemy) {
    return { ok: false, reason: "missing tower or enemy" };
  }
  const stats = getTowerStats(tower);
  if (!stats) {
    return { ok: false, reason: "no stats" };
  }
  const before = state.projectiles.length;
  if (tower.type === "laser") {
    fireLaser(tower, enemy, stats, stats.range || 0);
  } else if (tower.type === "freeze") {
    emitFreezeGas(tower, enemy, stats);
  } else if (tower.type === "flame") {
    fireFlameCone(tower, enemy, stats);
  } else if (tower.type !== "spikeTower" && tower.type !== "trap") {
    fireProjectile(tower, enemy, stats);
  }
  return { ok: true, before, after: state.projectiles.length };
};
window.debugStep = () => {
  const tower = state.towers[0];
  const before = {
    projectiles: state.projectiles.length,
    cooldown: tower ? tower.cooldown : null,
    aimAngle: tower ? tower.aimAngle : null,
  };
  updateTowers(0.1);
  updateProjectiles(0.1);
  const after = {
    projectiles: state.projectiles.length,
    cooldown: tower ? tower.cooldown : null,
    aimAngle: tower ? tower.aimAngle : null,
  };
  return { before, after };
};

const maps = [
  {
    id: "rift",
    name: "Void Rift",
    desc: "Classic bend through the void.",
    palette: {
      top: "#200b3b",
      mid: "#130820",
      bottom: "#0c0516",
      shadow: "rgba(0, 0, 0, 0.3)",
    },
    paths: [
      [
        { x: 40, y: 70 },
        { x: 260, y: 70 },
        { x: 260, y: 220 },
        { x: 560, y: 220 },
        { x: 560, y: 420 },
        { x: 900, y: 420 },
      ],
    ],
  },
  {
    id: "twin",
    name: "Twin Marsh",
    desc: "Two portals converge at the midpoint.",
    palette: {
      top: "#0b2a2f",
      mid: "#0f1b2a",
      bottom: "#050c14",
      shadow: "rgba(2, 8, 12, 0.3)",
    },
    paths: [
      [
        { x: 40, y: 70 },
        { x: 260, y: 70 },
        { x: 260, y: 300 },
        { x: 520, y: 300 },
        { x: 520, y: 440 },
        { x: 900, y: 440 },
      ],
      [
        { x: 40, y: 470 },
        { x: 260, y: 470 },
        { x: 260, y: 300 },
        { x: 520, y: 300 },
        { x: 520, y: 440 },
        { x: 900, y: 440 },
      ],
    ],
  },
  {
    id: "crystal",
    name: "Crystal Basin",
    desc: "Zig-zag corridors of crystal.",
    palette: {
      top: "#10284f",
      mid: "#111936",
      bottom: "#080e22",
      shadow: "rgba(4, 8, 22, 0.35)",
    },
    paths: [
      [
        { x: 80, y: 60 },
        { x: 80, y: 260 },
        { x: 360, y: 260 },
        { x: 360, y: 120 },
        { x: 660, y: 120 },
        { x: 660, y: 420 },
        { x: 900, y: 420 },
      ],
      [
        { x: 80, y: 500 },
        { x: 80, y: 300 },
        { x: 360, y: 300 },
        { x: 360, y: 420 },
        { x: 660, y: 420 },
        { x: 660, y: 220 },
        { x: 900, y: 220 },
      ],
    ],
  },
];

const grid = {
  size: 40,
  offsetX: 0,
  offsetY: 0,
};

const gridCols = Math.floor(canvas.width / grid.size);
const gridRows = Math.floor(canvas.height / grid.size);

function cellKey(cx, cy) {
  return `${cx},${cy}`;
}

function cellToWorld(cx, cy) {
  return {
    x: cx * grid.size + grid.size / 2,
    y: cy * grid.size + grid.size / 2,
  };
}

function worldToCell(x, y) {
  const cx = Math.max(0, Math.min(gridCols - 1, Math.floor(x / grid.size)));
  const cy = Math.max(0, Math.min(gridRows - 1, Math.floor(y / grid.size)));
  return { cx, cy };
}

function isWallAdjacentToPath(x, y) {
  const offsets = [
    { x: grid.size, y: 0 },
    { x: -grid.size, y: 0 },
    { x: 0, y: grid.size },
    { x: 0, y: -grid.size },
  ];
  return offsets.some((offset) => isOnPath(x + offset.x, y + offset.y));
}

function getWallPathSides(x, y) {
  return {
    right: isOnPath(x + grid.size, y),
    left: isOnPath(x - grid.size, y),
    down: isOnPath(x, y + grid.size),
    up: isOnPath(x, y - grid.size),
  };
}

const towerTypes = {
  watch: {
    cost: 45,
    range: 100,
    rate: 0.48,
    damage: 9,
    color: "#f59e0b",
    slow: 0,
    blocksPath: true,
  },
  freeze: {
    cost: 80,
    range: 120,
    rate: 1.3,
    damage: 0,
    color: "#7dd3fc",
    slow: 0.55,
    projectileType: "gas",
    gasSpeed: 60,
    gasDuration: 1.1,
    gasRadius: 12,
    gasMaxRadius: 70,
    gasGrowRate: 55,
    blocksPath: true,
  },
  drone: {
    cost: 95,
    range: 120,
    rate: 0.75,
    damage: 10,
    color: "#34d399",
    slow: 0,
    moveSpeed: 1.6,
    moveRadius: 22,
    blocksPath: true,
  },
  bomb: {
    cost: 100,
    range: 120,
    rate: 1.5,
    damage: 18,
    color: "#fb7185",
    slow: 0,
    splashRadius: 36,
    projectileSpeed: 300,
    blocksPath: true,
  },
  laser: {
    cost: 160,
    range: 190,
    rate: 1.35,
    damage: 18,
    color: "#ef4444",
    slow: 0,
    laser: true,
    beamWidth: 8,
    fireUnlockLevel: 1,
    fireDps: 9,
    fireDuration: 2.4,
    blocksPath: true,
  },
  dart: {
    cost: 85,
    range: 140,
    rate: 0.8,
    damage: 6,
    color: "#a78bfa",
    slow: 0,
    poisonDps: 10,
    poisonDuration: 4,
    projectileSpeed: 380,
    blocksPath: true,
  },
  flame: {
    cost: 105,
    range: 70,
    rate: 0.22,
    damage: 28,
    color: "#f97316",
    slow: 0,
    coneAngle: 0.7,
    burnDps: 12,
    burnDuration: 2.4,
    blocksPath: true,
  },
  trap: {
    cost: 110,
    range: 140,
    rate: 0,
    damage: 0,
    color: "#f59e0b",
    slow: 0,
    blocksPath: true,
  },
  spikeTower: {
    cost: 85,
    range: 0,
    rate: 0,
    damage: 26,
    color: "#f472b6",
    slow: 0,
    spikeRange: 120,
    spikeExtendSpeed: 8,
    spikeRetractSpeed: 1,
    spikeHold: 0.6,
    allowOnPath: false,
    spikeDamage: 10,
    spikeSlow: 0.14,
    spikeCount: 4,
    drillDamage: 12,
    drillCharge: 1.5,
    drillDuration: 2.4,
    drillSlow: 0.26,
    blocksPath: true,
  },
  mine: {
    cost: 20,
    range: 0,
    rate: 0,
    damage: 14,
    color: "#a3e635",
    slow: 0,
    allowOnPath: true,
    isMine: true,
    triggerRadius: 14,
    splashRadius: 40,
    noGridlock: true,
  },
  floorSpike: {
    cost: 60,
    range: 0,
    rate: 0,
    damage: 6,
    color: "#f97316",
    slow: 0,
    allowOnPath: true,
    isFloorSpike: true,
    noGridlock: true,
    triggerRadius: 18,
    spikeExtendSpeed: 10,
    spikeRetractSpeed: 7,
    spikeHold: 0.2,
  },
  wall: {
    cost: 15,
    range: 0,
    rate: 0,
    damage: 0,
    color: "#64748b",
    slow: 0,
    allowOnPath: true,
    blocksPath: true,
  },
  op: {
    cost: 0,
    range: 560,
    rate: 0.25,
    damage: 9999,
    color: "#fde047",
    slow: 0,
    laser: true,
    beamWidth: 14,
    splashRadius: 60,
    blocksPath: true,
  },
};

function snapToGrid(x, y) {
  const gx = Math.floor(x / grid.size) * grid.size + grid.size / 2;
  const gy = Math.floor(y / grid.size) * grid.size + grid.size / 2;
  return { x: gx, y: gy };
}

function normalizePaths(paths) {
  return paths.map((path) => path.map((point) => snapToGrid(point.x, point.y)));
}

function getActiveMap() {
  return maps.find((entry) => entry.id === state.mapId) || maps[0];
}

function setActiveMap(mapId) {
  const map = maps.find((entry) => entry.id === mapId) || maps[0];
  state.mapId = map.id;
  state.mapPaths = normalizePaths(map.paths);
  state.mapStartCells = state.mapPaths.map((path) => worldToCell(path[0].x, path[0].y));
  const endPoint = map.paths[0][map.paths[0].length - 1];
  state.mapEndPoint = snapToGrid(endPoint.x, endPoint.y);
  state.mapEndCell = worldToCell(state.mapEndPoint.x, state.mapEndPoint.y);
  state.mapPalette = map.palette || state.mapPalette;
  state.pathPoints = [];
  state.preferredPathCells = buildPreferredPathCells(state.mapPaths);
}

function getActivePaths() {
  return state.pathPoints.length > 0 ? state.pathPoints : state.mapPaths;
}

function isPointNearPath(points, x, y, buffer) {
  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    const minX = Math.min(a.x, b.x) - buffer;
    const maxX = Math.max(a.x, b.x) + buffer;
    const minY = Math.min(a.y, b.y) - buffer;
    const maxY = Math.max(a.y, b.y) + buffer;
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      return true;
    }
  }
  return false;
}

function isPointNearAnyPath(paths, x, y, buffer) {
  for (const points of paths) {
    if (isPointNearPath(points, x, y, buffer)) return true;
  }
  return false;
}

function buildPreferredPathCells(paths) {
  const cells = new Set();
  for (let cx = 0; cx < gridCols; cx += 1) {
    for (let cy = 0; cy < gridRows; cy += 1) {
      const { x, y } = cellToWorld(cx, cy);
      if (isPointNearAnyPath(paths, x, y, 18)) {
        cells.add(cellKey(cx, cy));
      }
    }
  }
  return cells;
}

function buildBlockedSet(extraCell) {
  const blocked = new Set();
  for (const tower of state.towers) {
    const data = towerTypes[tower.type];
    if (data && data.blocksPath) {
      const cell = worldToCell(tower.x, tower.y);
      blocked.add(cellKey(cell.cx, cell.cy));
    }
  }
  if (extraCell) {
    blocked.add(cellKey(extraCell.cx, extraCell.cy));
  }
  return blocked;
}

function findPath(fromCell, toCell, blocked) {
  const startKey = cellKey(fromCell.cx, fromCell.cy);
  const endKey = cellKey(toCell.cx, toCell.cy);
  if (blocked.has(startKey) || blocked.has(endKey)) return null;

  const open = new Set([startKey]);
  const cameFrom = new Map();
  const gScore = new Map([[startKey, 0]]);
  const fScore = new Map([[startKey, Math.abs(fromCell.cx - toCell.cx) + Math.abs(fromCell.cy - toCell.cy)]]);

  function lowestFScoreKey() {
    let bestKey = null;
    let bestScore = Infinity;
    for (const key of open) {
      const score = coalesce(fScore.get(key), Infinity);
      if (score < bestScore) {
        bestScore = score;
        bestKey = key;
      }
    }
    return bestKey;
  }

  while (open.size > 0) {
    const currentKey = lowestFScoreKey();
    if (!currentKey) break;
    if (currentKey === endKey) {
      const pathCells = [];
      let key = currentKey;
      while (key) {
        const [cx, cy] = key.split(",").map(Number);
        pathCells.push({ cx, cy });
        key = cameFrom.get(key);
      }
      pathCells.reverse();
      return pathCells;
    }
    open.delete(currentKey);
    const [ccx, ccy] = currentKey.split(",").map(Number);
    const neighbors = [
      { cx: ccx + 1, cy: ccy },
      { cx: ccx - 1, cy: ccy },
      { cx: ccx, cy: ccy + 1 },
      { cx: ccx, cy: ccy - 1 },
    ];
    for (const neighbor of neighbors) {
      if (neighbor.cx < 0 || neighbor.cy < 0 || neighbor.cx >= gridCols || neighbor.cy >= gridRows) continue;
      const neighborKey = cellKey(neighbor.cx, neighbor.cy);
      if (blocked.has(neighborKey)) continue;
      const moveCost = state.preferredPathCells.has(neighborKey) ? 1 : 4;
      const tentative = coalesce(gScore.get(currentKey), Infinity) + moveCost;
      if (tentative < coalesce(gScore.get(neighborKey), Infinity)) {
        cameFrom.set(neighborKey, currentKey);
        gScore.set(neighborKey, tentative);
        const h = Math.abs(neighbor.cx - toCell.cx) + Math.abs(neighbor.cy - toCell.cy);
        fScore.set(neighborKey, tentative + h);
        open.add(neighborKey);
      }
    }
  }
  return null;
}

function buildPathPoints(fromCell, toCell, blocked) {
  const cells = findPath(fromCell, toCell, blocked);
  if (!cells) return null;
  return cells.map((cell) => cellToWorld(cell.cx, cell.cy));
}

function updateEnemyPaths() {
  const blocked = buildBlockedSet();
  const endCell = state.mapEndCell;
  if (!endCell) return;
  for (const enemy of state.enemies) {
    const currentCell = worldToCell(enemy.x, enemy.y);
    const pathPoints = buildPathPoints(currentCell, endCell, blocked);
    if (!pathPoints) continue;
    enemy.path = [{ x: enemy.x, y: enemy.y }, ...pathPoints.slice(1)];
    enemy.pathIndex = 0;
  }
}

function recomputeGlobalPath(extraBlockedCell) {
  const blocked = buildBlockedSet(extraBlockedCell);
  const endCell = state.mapEndCell;
  if (!endCell) return false;
  const startCells = state.mapStartCells.length > 0 ? state.mapStartCells : [];
  const newPaths = [];
  for (const startCell of startCells) {
    const pathPoints = buildPathPoints(startCell, endCell, blocked);
    if (!pathPoints) return false;
    newPaths.push(pathPoints);
  }
  state.pathPoints = newPaths;
  updateEnemyPaths();
  cleanupOffPathFloorSpikes();
  return true;
}

function isOnPath(x, y) {
  const paths = getActivePaths();
  return isPointNearAnyPath(paths, x, y, 18);
}

function cleanupOffPathFloorSpikes() {
  const remaining = [];
  for (const tower of state.towers) {
    if (tower.type !== "floorSpike") {
      remaining.push(tower);
      continue;
    }
    if (isOnPath(tower.x, tower.y)) {
      remaining.push(tower);
      continue;
    }
    awardGold(coalesce(tower.paidCost, towerTypes.floorSpike.cost));
  }
  state.towers = remaining;
}

function updateHud() {
  const availableNukes = state.nukeCharges;
  ui.lives.textContent = state.lives;
  ui.gold.textContent = state.infiniteGold ? "∞" : Math.round(state.gold);
  ui.wave.textContent = state.wave;
  if (ui.mapName) {
    const map = getActiveMap();
    ui.mapName.textContent = map ? `Map: ${map.name}` : "Map: --";
  }
  if (ui.damage) {
    ui.damage.textContent = Math.round(state.totalDamage || 0);
  }
  if (ui.buildWall) {
    ui.buildWall.textContent = state.wallsPlaced === 0 ? "Wall (Free)" : "Wall (10)";
  }
  if (ui.nukeButton) {
    ui.nukeButton.disabled = availableNukes === 0;
  }
  if (ui.nukeCount) {
    ui.nukeCount.textContent = `Nukes: ${availableNukes}`;
  }
  if (ui.halfCash) {
    ui.halfCash.textContent = `Half Cash: ${state.halfCash ? "On" : "Off"}`;
  }
}

function awardGold(amount) {
  if (state.infiniteGold) {
    state.gold = 999999;
    return;
  }
  const multiplier = state.difficultyMultipliers.gold || 1;
  const cashMultiplier = state.halfCash ? 0.5 : 1;
  state.gold += Math.max(0, Math.round(amount * multiplier * cashMultiplier));
  state.gold = Math.round(state.gold);
}

function canAfford(cost) {
  return state.infiniteGold || state.gold >= cost;
}

function payCost(cost) {
  if (state.infiniteGold) return;
  state.gold = Math.max(0, Math.round(state.gold - cost));
}

function flashButton(element) {
  if (!element) return;
  element.classList.remove("alert");
  void element.offsetHeight;
  element.classList.add("alert");
  window.setTimeout(() => {
    element.classList.remove("alert");
  }, 500);
}

function getWallUpgradeCost(level = 0) {
  const base = 50;
  return Math.round(base * Math.pow(1.7, Math.max(0, level)));
}

function sellTower(tower) {
  const data = towerTypes[tower.type];
  const baseCost = coalesce(tower.paidCost, data ? data.cost : 0);
  const refund = Math.max(0, Math.floor(baseCost * 0.8));
  if (refund > 0) {
    awardGold(refund);
  }
  if (tower.type === "trap") {
    state.traps = state.traps.filter((trap) => trap.owner !== tower);
    if (state.selectedTrap && state.selectedTrap.owner === tower) {
      state.selectedTrap = null;
    }
  }
  if (tower.type === "drone" && tower.spawnedMinis) {
    for (const mini of tower.spawnedMinis) {
      state.towers = state.towers.filter((entry) => entry !== mini);
    }
    tower.spawnedMinis = [];
  }
  state.towers = state.towers.filter((entry) => entry !== tower);
  if (data && data.blocksPath) {
    recomputeGlobalPath();
  }
  if (tower.type === "op") {
    state.opPlaced = false;
    if (ui.buildOp) ui.buildOp.disabled = false;
  }
  if (state.selectedTower === tower) {
    state.selectedTower = null;
  }
}

function getTrapUpgradeCost(trap) {
  const baseCost = 35;
  const level = trap.level || 1;
  return Math.round(baseCost * Math.pow(1.6, Math.max(0, level - 1)));
}

function upgradeTrap(trap) {
  return;
}

function getNearestPathPointFromPaths(x, y, paths) {
  let best = null;
  let bestDist = Infinity;
  for (const points of paths) {
    for (let i = 0; i < points.length - 1; i += 1) {
      const a = points[i];
      const b = points[i + 1];
      const abx = b.x - a.x;
      const aby = b.y - a.y;
      const denom = abx * abx + aby * aby;
      if (denom === 0) continue;
      const t = ((x - a.x) * abx + (y - a.y) * aby) / denom;
      const clamped = Math.max(0, Math.min(1, t));
      const px = a.x + abx * clamped;
      const py = a.y + aby * clamped;
      const dist = Math.hypot(x - px, y - py);
      if (dist < bestDist) {
        bestDist = dist;
        best = { x: px, y: py };
      }
    }
  }
  return best ? { point: best, dist: bestDist } : null;
}

function isAdjacentToPath(x, y, paths = getActivePaths()) {
  const nearest = getNearestPathPointFromPaths(x, y, paths);
  if (!nearest) return false;
  const target = grid.size;
  return Math.abs(nearest.dist - target) <= 4;
}

function getNearestPathPoint(x, y) {
  const paths = getActivePaths();
  let best = null;
  let bestDist = Infinity;
  for (const points of paths) {
    for (let i = 0; i < points.length - 1; i += 1) {
      const a = points[i];
      const b = points[i + 1];
      const abx = b.x - a.x;
      const aby = b.y - a.y;
      const denom = abx * abx + aby * aby;
      if (denom === 0) continue;
      const t = ((x - a.x) * abx + (y - a.y) * aby) / denom;
      const clamped = Math.max(0, Math.min(1, t));
      const px = a.x + abx * clamped;
      const py = a.y + aby * clamped;
      const dist = Math.hypot(x - px, y - py);
      if (dist < bestDist) {
        bestDist = dist;
        best = { x: px, y: py };
      }
    }
  }
  return best ? { point: best, dist: bestDist } : null;
}

function getSpikeDirection(tower) {
  const nearest = getNearestPathPoint(tower.x, tower.y);
  if (!nearest) return null;
  const dx = nearest.point.x - tower.x;
  const dy = nearest.point.y - tower.y;
  if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return null;
  if (Math.abs(dx) >= Math.abs(dy)) {
    return { x: Math.sign(dx), y: 0 };
  }
  return { x: 0, y: Math.sign(dy) };
}

function updateEncyclopedia() {
  if (!ui.encyclopedia) return;
  const enemyEntries = [
    {
      key: "grunt",
      name: "Grunt",
      desc: "Standard enemy with balanced speed.",
    },
    {
      key: "speedy",
      name: "Speedy Frog",
      desc: "Very quick but not tanky.",
    },
    {
      key: "heavy",
      name: "Heavy",
      desc: "Very tanky but slow.",
    },
    {
      key: "stealth",
      name: "Stealth",
      desc: "Hidden until tapped. Watch towers can see it.",
    },
    {
      key: "boss",
      name: "Boss",
      desc: "Huge health. Shows up every 10 waves.",
    },
    {
      key: "labrat",
      name: "Lab Rat",
      desc: "Slightly squishy octagon. Immune to nukes.",
    },
    {
      key: "diamond",
      name: "Diamond",
      desc: "Armored, light-blue foe. Immune to heat and explosions.",
    },
    {
      key: "swarm",
      name: "Swarm",
      desc: "Summons a flurry of tiny, fast enemies.",
    },
  ];
  const mutationEntries = [
    {
      key: "armored",
      name: "Armored Mutation",
      desc: "Only laser or bomb damage hurts.",
    },
    {
      key: "darkmatter",
      name: "Dark Matter Mutation",
      desc: "Immune to laser, poison, and slow effects.",
    },
    {
      key: "radioactive",
      name: "Radioactive Effect",
      desc: "Lingering hazard from the Nuke. Halves enemy health and speed for a full wave.",
    },
  ];
  const lines = [];
  const seenEnemies = enemyEntries.filter((entry) => state.encyclopedia.has(entry.key));
  const seenMutations = mutationEntries.filter((entry) => state.encyclopedia.has(entry.key));
  if (seenEnemies.length > 0) {
    lines.push(`<div class="encyclopedia-section">Enemies</div>`);
    for (const entry of seenEnemies) {
      lines.push(`<div class="encyclopedia-entry"><div class="enemy-icon">${getEnemyIcon(entry.key)}</div><div><strong>${entry.name}</strong><div>${entry.desc}</div></div></div>`);
    }
  }
  if (seenMutations.length > 0) {
    lines.push(`<div class="encyclopedia-section">Mutations</div>`);
    for (const entry of seenMutations) {
      lines.push(`<div class="encyclopedia-entry"><div class="enemy-icon">${getEnemyIcon(entry.key)}</div><div><strong>${entry.name}</strong><div>${entry.desc}</div></div></div>`);
    }
  }
  if (state.infiniteGold) {
    lines.push("<div><strong>Tower Stats</strong><div>Watch: 45c, 100r, 0.95s, 9 dmg</div><div>Freeze: 80c, 120r, 1.3s, gas slow</div><div>Drone: 95c, 120r, 0.75s, 10 dmg</div><div>Bomb: 100c, 120r, 1.5s, 18 dmg, 36 splash</div><div>Laser: 160c, 190r, 1.35s, 18 dmg, pierce, burn upgrade</div><div>Dart: 85c, 140r, 0.8s, 6 dmg, 10 DPS poison</div><div>Spike: 85c, drill spikes</div><div>Mine: 20c, 14 dmg, 40 splash</div></div>");
    lines.push("<div><strong>Enemy Stats</strong><div>Grunt: base HP 20 + 5*wave, base speed 26 + 2.6*wave</div><div>Speedy: faster version of grunt</div><div>Heavy: 2.4x HP, 0.6x speed</div><div>Boss: 6x HP</div><div>Tiers: +35% HP and +6% speed per tier</div></div>");
  }
  ui.encyclopedia.innerHTML = lines.length > 0 ? lines.join("") : "<div>Encounter enemies to learn about them.</div>";
  ui.encyclopedia.classList.toggle("encyclopedia-scroll", state.infiniteGold);
  if (state.infiniteGold) {
    ui.encyclopedia.scrollTop = ui.encyclopedia.scrollHeight;
  }
  if (ui.encyclopediaModalContent) {
    ui.encyclopediaModalContent.innerHTML = ui.encyclopedia.innerHTML;
  }
}

function getEnemyIcon(type) {
  const size = 36;
  const center = 18;
  if (type === "speedy") {
    return `<svg viewBox="0 0 36 36" width="${size}" height="${size}"><polygon points="30,18 10,28 10,8" fill="#facc15" stroke="#0f172a" stroke-width="2"/></svg>`;
  }
  if (type === "heavy") {
    return `<svg viewBox="0 0 36 36" width="${size}" height="${size}"><polygon points="18,5 29,13 25,27 11,27 7,13" fill="#a855f7" stroke="#0f172a" stroke-width="2"/></svg>`;
  }
  if (type === "armored") {
    return `<svg viewBox="0 0 36 36" width="${size}" height="${size}"><circle cx="${center}" cy="${center}" r="11" fill="#fb923c" stroke="#0f172a" stroke-width="2"/><circle cx="${center}" cy="${center}" r="14" fill="none" stroke="#a855f7" stroke-width="2"/></svg>`;
  }
  if (type === "stealth") {
    return `<svg viewBox="0 0 36 36" width="${size}" height="${size}"><circle cx="${center}" cy="${center}" r="11" fill="#fb923c" stroke="#0f172a" stroke-width="2"/><circle cx="${center}" cy="${center}" r="6" fill="none" stroke="rgba(148,163,184,0.8)" stroke-width="2"/></svg>`;
  }
  if (type === "boss") {
    return `<svg viewBox="0 0 36 36" width="${size}" height="${size}"><circle cx="${center}" cy="${center}" r="13" fill="#f43f5e" stroke="#0f172a" stroke-width="2"/><circle cx="${center}" cy="${center}" r="7" fill="none" stroke="#fde047" stroke-width="2"/></svg>`;
  }
  if (type === "darkmatter") {
    return `<svg viewBox="0 0 36 36" width="${size}" height="${size}"><circle cx="${center}" cy="${center}" r="12" fill="#2b1f3a" stroke="#0f172a" stroke-width="2"/><circle cx="${center}" cy="${center}" r="14" fill="none" stroke="#7c3aed" stroke-width="2"/></svg>`;
  }
  if (type === "labrat") {
    return `<svg viewBox="0 0 36 36" width="${size}" height="${size}"><polygon points="18,4 28,8 32,18 28,28 18,32 8,28 4,18 8,8" fill="#fbbf24" stroke="#0f172a" stroke-width="2"/></svg>`;
  }
  if (type === "diamond") {
    return `<svg viewBox="0 0 36 36" width="${size}" height="${size}"><polygon points="18,3 33,18 18,33 3,18" fill="#e0f2fe" stroke="#0f172a" stroke-width="2"/></svg>`;
  }
  if (type === "swarm") {
    return `<svg viewBox="0 0 36 36" width="${size}" height="${size}"><circle cx="${center}" cy="${center}" r="10" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/><circle cx="${center}" cy="${center}" r="4" fill="#0f172a"/></svg>`;
  }
  return `<svg viewBox="0 0 36 36" width="${size}" height="${size}"><circle cx="${center}" cy="${center}" r="11" fill="#fb923c" stroke="#0f172a" stroke-width="2"/></svg>`;
}

function startWave() {
  if (state.waveInProgress) return;
  if (!state.gameStarted) return;
  state.wave += 1;
  state.waveInProgress = true;
  if (state.wave % 10 === 0) {
    state.enemiesToSpawn = 1;
  } else {
    state.enemiesToSpawn = 4 + (state.wave - 1) * 2;
  }
  state.spawnTimer = 0;
  updateHud();
  handleWaveAlerts(state.wave);
}

function showAlert(title, message, pauseWave = false) {
  if (!ui.alertModal || !ui.alertTitle || !ui.alertContent) return;
  ui.alertTitle.textContent = title;
  ui.alertContent.innerHTML = message;
  ui.alertModal.classList.remove("hidden");
  if (pauseWave && state.waveInProgress) {
    setPauseState(true);
  }
}

function handleWaveAlerts(wave) {
  if (wave === 2) {
    showAlert(
      "Stealth Incoming",
      "<p>Stealth enemies arrive on Wave 4.</p><p>Build <strong>Watch Towers</strong> to reveal them.</p>"
    );
  } else if (wave === 3) {
    showAlert(
      "Armored Incoming",
      "<p>Armored enemies arrive on Wave 5.</p><p><strong>Bomb</strong> and <strong>Laser</strong> towers crack armor fastest.</p>"
    );
  } else if (wave === 4) {
    showAlert(
      "Stealth Wave",
      "<p>Stealth enemies are here.</p><p>Place <strong>Watch Towers</strong> to reveal them.</p>",
      true
    );
  } else if (wave === 5) {
    showAlert(
      "Armored Wave",
      "<p>Armored enemies are here.</p><p>Use <strong>Bomb</strong> and <strong>Laser</strong> towers to break armor.</p>",
      true
    );
  } else if (wave === 13) {
    showAlert(
      "Diamonds Incoming",
      "<p>Diamond enemies arrive on Wave 15.</p><p>Prepare high damage and armor-breaking towers.</p>"
    );
  }
}

function togglePauseWave() {
  if (!state.waveInProgress) return;
  if (!state.paused) {
    if (!state.infiniteGold && state.gold <= 0) {
      flashButton(ui.pauseWave);
      return;
    }
    setPauseState(true);
    return;
  }
  setPauseState(false);
}

function setPauseState(paused) {
  state.paused = paused;
  if (ui.pauseWave) {
    ui.pauseWave.textContent = state.paused ? "Resume Wave" : "Pause Wave";
  }
  if (ui.playArea) {
    ui.playArea.classList.toggle("paused-glitch", state.paused);
  }
}

function isBossType(type) {
  return type === "boss" || type.startsWith("boss_");
}

function spawnEnemy() {
  const isBossWave = state.wave % 10 === 0;
  const roll = Math.random();
  let type = "grunt";
  if (isBossWave) {
    const bossIndex = Math.max(0, Math.floor(state.wave / 10) - 1);
    const bossTypes = ["boss_fast", "boss_pentagon", "boss_hexagon", "boss_diamond"];
    type = bossTypes[bossIndex % bossTypes.length];
  } else if (roll < 0.12) {
    type = "speedy";
  } else if (roll < 0.22) {
    type = "heavy";
  } else if (roll < 0.3 && state.wave >= 4) {
    type = "stealth";
  } else if (roll < 0.36) {
    type = "labrat";
  } else if (roll < 0.42 && state.wave >= 15) {
    type = "diamond";
  } else if (roll < 0.48 && state.wave >= 10) {
    type = "swarm";
  }
  let armored = false;
  let darkMatter = false;
  let stealth = type === "stealth";
  const allowArmored = state.wave >= 5;
  const allowStealthRoll = state.wave >= 4;
  const allowDarkMatter = state.wave >= 3;
  if (allowArmored && Math.random() < 0.18) armored = true;
  if (allowDarkMatter && Math.random() < 0.15) darkMatter = true;
  if (allowStealthRoll && Math.random() < 0.18) stealth = true;
  if (type === "diamond" || type === "boss_diamond") {
    armored = true;
    darkMatter = false;
  }
  if (type === "swarm") {
    registerEnemyInEncyclopedia(type, armored, darkMatter);
    const paths = getActivePaths();
    const pathGroup = Math.floor(Math.random() * paths.length);
    const pathPoints = paths[pathGroup] || paths[0];
    const start = pathPoints && pathPoints[0] ? pathPoints[0] : { x: 0, y: 0 };
    const next = pathPoints && pathPoints[1] ? pathPoints[1] : { x: start.x + 1, y: start.y };
    const dx = next.x - start.x;
    const dy = next.y - start.y;
    const len = Math.hypot(dx, dy) || 1;
    const tangent = { x: dx / len, y: dy / len };
    const normal = { x: -tangent.y, y: tangent.x };
    const spacing = 10;
    const lateral = 10;
    for (let i = 0; i < 20; i += 1) {
      const along = -i * spacing;
      const side = (i % 2 === 0 ? 1 : -1) * (Math.random() * lateral);
      const pathOffset = {
        x: tangent.x * along + normal.x * side,
        y: tangent.y * along + normal.y * side,
      };
      state.enemies.push(createEnemy("swarmlet", {
        armored: false,
        darkMatter: false,
        stealth: false,
        pathGroup,
        pathOffset,
      }));
    }
    return;
  }
  registerEnemyInEncyclopedia(type, armored, darkMatter, stealth);
  state.enemies.push(createEnemy(type, { armored, darkMatter, stealth }));
}

function registerEnemyInEncyclopedia(type, armored, darkMatter, stealth = false) {
  const entryKey = isBossType(type) ? "boss" : type;
  state.encyclopedia.add(entryKey);
  if (armored) {
    state.encyclopedia.add("armored");
  }
  if (darkMatter) {
    state.encyclopedia.add("darkmatter");
  }
  if (stealth || type === "stealth") {
    state.encyclopedia.add("stealth");
  }
  updateEncyclopedia();
}

function createEnemy(type, options = {}) {
  const isBoss = isBossType(type);
  const isFast = type === "speedy" || type === "boss_fast";
  const isSwarmlet = type === "swarmlet";
  const isHeavy = type === "heavy" || type === "boss_pentagon" || type === "boss_hexagon";
  const isDiamond = type === "diamond" || type === "boss_diamond";
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
  if (isSwarmlet) {
    maxHp *= 0.2;
    speed *= 1.15;
  }
  const speedMultiplier = state.difficultyMultipliers.enemySpeed || 1;
  const radioactive = type === "labrat" ? false : (options.radioactive || state.radioactiveWave === state.wave);
  if (radioactive) {
    maxHp *= 0.5;
    speed *= 0.5;
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
    armored: options.armored || isDiamond || false,
    darkMatter: !isDiamond && (options.darkMatter || false),
    dotTimer: 0,
    dotDps: 0,
    burnTimer: 0,
    burnDps: 0,
    embrittleTimer: 0,
    embrittleMultiplier: 1,
    tier,
    tierFactor,
    isBoss,
    facing: 0,
    stealth: isStealth,
    revealed: !isStealth,
    radioactive,
    revealTimer: 0,
    nukeImmune: type === "labrat" || (isDiamond && tier >= 3),
    immuneHeat: isDiamond,
    immuneExplosion: isDiamond,
    explosionVulnerable: type === "swarmlet",
    pathOffset,
    pathGroup,
    castleDamage: baseCastleDamage,
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

function getEnemyRadius(enemy) {
  const tierScale = 1 + ((enemy.tier || 1) - 1) * 0.18;
  const isBoss = enemy.isBoss || isBossType(enemy.type);
  const baseRadius = enemy.type === "swarmlet" ? 6 : isBoss ? 22 : enemy.type === "heavy" ? 16 : 12;
  return baseRadius * tierScale;
}

function ensureEnemyPath(enemy) {
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

function placeTower(type, x, y) {
  const data = towerTypes[type];
  if (!state.gameStarted) return;
  if (!data) return;
  if (type === "op" && state.opPlaced) return;
  if (type === "spikeTower" && !isAdjacentToPath(x, y)) return;
  if (isOnPath(x, y) && !data.allowOnPath && !data.blocksPath) return;
  if ((type === "mine" || type === "floorSpike") && !isOnPath(x, y)) return;
  if (type === "drone" && isOnPath(x, y)) return;
  if (data.blocksPath && state.waveInProgress && isOnPath(x, y)) return;
  for (const tower of state.towers) {
    const towerData = towerTypes[tower.type];
    if (towerData && towerData.noGridlock) continue;
    const towerX = tower.type === "drone" && Number.isFinite(tower.baseX) ? tower.baseX : tower.x;
    const towerY = tower.type === "drone" && Number.isFinite(tower.baseY) ? tower.baseY : tower.y;
    const overlap = Math.hypot(towerX - x, towerY - y) < 30;
    if (!overlap) continue;
    return;
  }
  if (data.blocksPath) {
    const prevPaths = state.pathPoints.length > 0
      ? state.pathPoints.map((path) => path.map((point) => ({ x: point.x, y: point.y })))
      : [];
    const cell = worldToCell(x, y);
    const endCell = state.mapEndCell;
    const startCells = state.mapStartCells.length > 0 ? state.mapStartCells : [];
    if (!endCell) return;
    if (startCells.some((startCell) => cell.cx === startCell.cx && cell.cy === startCell.cy)
      || (cell.cx === endCell.cx && cell.cy === endCell.cy)) {
      return;
    }
    if (!recomputeGlobalPath(cell)) return;
    for (const tower of state.towers) {
      if (tower.type !== "spikeTower") continue;
      if (!isAdjacentToPath(tower.x, tower.y)) {
        state.pathPoints = prevPaths;
        updateEnemyPaths();
        cleanupOffPathFloorSpikes();
        return;
      }
    }
  }
  const cost = data.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons[type]);
    return;
  }
  payCost(cost);
  const tower = {
    type,
    x,
    y,
    level: type === "op" ? 1000 : 1,
    cooldown: 0,
    paidCost: cost,
    disabled: false,
    targeting: "first",
  };
  if (type === "trap") {
    tower.upgradePath = 1;
    tower.trapCooldown = 0;
  }
  if (type === "spikeTower") {
    tower.spikePhase = "idle";
    tower.spikeProgress = 0;
    tower.spikeHoldTimer = 0;
    tower.spikeDir = getSpikeDirection(tower);
  }
  if (type === "dart") {
    tower.upgradePath = 1;
  }
  if (type === "freeze") {
    tower.upgradePath = 1;
  }
  if (type === "flame") {
    tower.upgradePath = 1;
  }
  if (type === "bomb") {
    tower.upgradePath = 1;
  }
  if (type === "laser") {
    tower.upgradePath = 1;
  }
  if (type === "drone") {
    tower.upgradePath = 1;
  }
  if (data.moveSpeed) {
    tower.baseX = x;
    tower.baseY = y;
    tower.moveAngle = Math.random() * Math.PI * 2;
  }
  if (type === "op") {
    state.opPlaced = true;
    ui.buildOp.disabled = true;
  }
  state.towers.push(tower);
  updateHud();
}

function getUpgradeBaseCost(tower) {
  const cost = (towerTypes[tower.type] && towerTypes[tower.type].cost) ? towerTypes[tower.type].cost : 50;
  const scaled = Math.round(cost * 0.45);
  return Math.min(140, Math.max(40, scaled));
}

function getUpgradeCost(tower) {
  const baseCost = getUpgradeBaseCost(tower);
  const level = tower.level || 1;
  return Math.round(baseCost * Math.pow(1.8, Math.max(0, level - 1)));
}

function getUpgradeCostToLevel(currentLevel, targetLevel, tower) {
  const baseCost = tower ? getUpgradeBaseCost(tower) : 50;
  let total = 0;
  for (let level = currentLevel; level < targetLevel; level += 1) {
    total += Math.round(baseCost * Math.pow(1.8, Math.max(0, level - 1)));
  }
  return Math.round(total);
}

function upgradeTower(tower) {
  if (tower.type === "wall" || tower.type === "mine") return;
  const level = tower.level || 1;
  if (tower.type === "bomb" && level >= state.towerLevelCap) return;
  if (level >= state.towerLevelCap) return;
  const upgradeCost = getUpgradeCost(tower);
  if (!canAfford(upgradeCost)) {
    flashButton(ui.upgradePanel);
    return;
  }
  payCost(upgradeCost);
  tower.level += 1;
  if (tower.type === "bomb" && tower.level >= 5 && !tower.bombNukeGranted) {
    tower.bombNukeGranted = true;
    state.nukeCharges += 1;
  }
  if (tower.type === "drone") {
    const stats = getTowerStats(tower);
    if (stats) ensureDroneMinis(tower, stats);
  }
  updateHud();
}

function getTowerStats(tower) {
  const data = towerTypes[tower.type];
  if (!data) return null;
  const level = tower.level || 1;
  let range = data.range;
  let damage = data.damage;
  let rate = data.rate;
  let slow = data.slow;
  let projectileSpeed = data.projectileSpeed;
  let fireDps = 0;
  let fireDuration = 0;
  let coneAngle = data.coneAngle;
  let flameSpreadDepth = 0;
  let flameSpreadPower = 0;
  let flameSpreadWindow = 0;
  let flameReveal = false;
  let flamePermanentReveal = false;
  let flameRadius = 0;
  let flameArmorMelt = false;
  let flameIgniteAll = false;
  let freezeRadius = data.gasRadius;
  let freezeMaxRadius = data.gasMaxRadius;
  let freezeGrowRate = data.gasGrowRate;
  let freezeDuration = data.gasDuration;
  let freezeDamage = 0;
  let freezePulseInterval = 0;
  let freezePulseDuration = 0;
  let freezePulseOnly = false;
  let freezePulseDamage = 0;
  let freezeExposureThreshold = 0;
  let freezeExposureDuration = 0;
  let freezeKnockbackChance = 0;
  let laserBeamTtl = 0.12;
  let laserBeamWidth = data.beamWidth || 6;
  let laserBeamColor = null;
  let laserDamageMult = 1;
  let laserChargeTime = 0;
  let laserCannonMult = 1;
  let laserContinuous = false;
  let laserEnergyMax = 0;
  let laserEnergyDrain = 0;
  let laserRechargeTime = 0;
  let laserStun = 0;
  let laserInfinite = false;
  let canHitStealth = false;
  let droneGuns = 1;
  let droneMiniCount = 0;
  let droneMiniDamageMult = 0.7;
  let droneMissiles = 0;
  let droneMissileDamage = 0;
  let droneMissileSplash = 0;
  let droneMissileSpeed = 0;
  let droneBombDamage = 0;
  let droneBombRadius = 0;
  let droneBombRate = 0;
  let bombBurstCount = 1;
  let bombProjectileKind = "bomb";
  let bombClusterCount = 0;
  let bombClusterChildCount = 0;
  let bombClusterDamage = 0;
  let bombClusterRadius = 0;
  let bombClusterChildDamage = 0;
  let bombClusterChildRadius = 0;
  let splashRadius = data.splashRadius || 0;
  let dartPoisonDps = data.poisonDps || 0;
  let dartPoisonDuration = data.poisonDuration || 0;
  let dartPoisonRadius = 0;
  let dartBurstCount = 1;
  let dartEmbrittlementBonus = 0;
  let dartArmorWeaken = false;
  let dartPoisonTransfer = false;
  let globalPoisonDps = 0;
  let globalPoisonDuration = 0;
  let spikeRange = data.spikeRange;
  let spikeExtendSpeed = data.spikeExtendSpeed;
  let spikeRetractSpeed = data.spikeRetractSpeed;
  let spikeHold = data.spikeHold;
  let spikeDamage = data.damage;
  let spikeSlow = 0;
  let spikeSlowDuration = 1.2;
  let spikeCount = 1;
  let spikeDrillCharge = 0;
  let spikeDrillDps = 0;
  let spikeWave = false;
  let spikeWaveRadius = 0;
  let spikeWaveSlow = 0;

  if (tower.type === "watch") {
    if (!projectileSpeed) {
      projectileSpeed = 320;
    }
    const path = tower.upgradePath || 1;
    const tier = Math.min(level, 5);
    if (path === 1) {
      const speedMult = tier >= 5 ? 4 : tier >= 4 ? 2.8 : tier >= 2 ? 2.25 : tier >= 1 ? 1.5 : 1;
      rate = data.rate / speedMult;
      if (tier >= 4) {
        damage = data.damage * 0.85;
      }
    } else {
      if (tier >= 1) damage *= 1.2;
      if (tier >= 2) damage *= 1.4;
      if (tier >= 3) range *= 2;
      if (tier >= 4) {
        damage *= 2;
        rate *= 1.5;
      }
      if (tier >= 5) {
        state.revealStealth = true;
      }
    }
  } else {
    const rangeBonus = (tower.type === "freeze" ? 12 : 8) * (level - 1);
    range = data.range + rangeBonus;
    damage = data.damage + (level - 1) * 4;
    rate = Math.max(0.2, data.rate * Math.pow(0.92, level - 1));
    slow = data.slow + (tower.type === "freeze" ? (level - 1) * 0.07 : 0);
    if (tower.type === "laser") {
      const unlock = data.fireUnlockLevel || 3;
      if (level >= unlock) {
        const bonus = level - unlock;
        fireDps = (data.fireDps || 0) + bonus * 1.2;
        fireDuration = (data.fireDuration || 0) + bonus * 0.25;
      }
      laserInfinite = true;
      const tier = Math.min(level, 5);
      const path = tower.upgradePath || 1;
      if (path === 1) {
        if (tier >= 1) {
          laserBeamTtl *= 1.6;
          laserBeamWidth += 1;
          laserBeamColor = "#e2e8f0";
        }
        if (tier >= 2) {
          range += 40;
        }
        if (tier >= 3) {
          laserContinuous = true;
          laserEnergyMax = 3.6;
          laserEnergyDrain = 1;
          laserRechargeTime = 3;
          laserBeamWidth += 2;
          laserBeamColor = "#f8fafc";
        }
        if (tier >= 4) {
          laserDamageMult *= 1.5;
          fireDps *= 1.35;
          fireDuration += 0.6;
          laserEnergyDrain *= 0.75;
          laserBeamWidth = Math.max(laserBeamWidth, 10);
        }
        if (tier >= 5) {
          laserDamageMult *= 1.8;
          fireDps *= 1.7;
          fireDuration += 1.2;
          laserBeamTtl *= 1.4;
          laserEnergyMax *= 1.6;
          laserRechargeTime = 1;
          laserBeamWidth = Math.max(laserBeamWidth, 12);
          laserBeamColor = "#f8fafc";
        }
      } else {
        if (tier >= 1) {
          laserDamageMult *= 1.25;
        }
        if (tier >= 2) {
          rate *= 0.75;
        }
        if (tier >= 3) {
          laserDamageMult *= 1.35;
          fireDps *= 1.3;
          fireDuration += 0.6;
          laserBeamWidth = Math.max(laserBeamWidth, 10);
        }
        if (tier >= 4) {
          laserChargeTime = 1;
          laserCannonMult = 2.6;
          laserBeamTtl *= 1.4;
          laserBeamWidth = Math.max(laserBeamWidth, 14);
          laserBeamColor = "#fbbf24";
        }
        if (tier >= 5) {
          laserChargeTime = 0.9;
          laserCannonMult = 3.2;
          laserStun = 0.6;
          fireDps *= 1.6;
          fireDuration += 1.2;
          laserBeamWidth = Math.max(laserBeamWidth, 20);
          laserBeamColor = "#fde047";
        }
      }
    }
    if (tower.type === "flame") {
      const tier = Math.min(level, 5);
      const path = tower.upgradePath || 1;
      if (path === 1) {
        if (tier >= 1) {
          damage *= 1.1;
          coneAngle = (coneAngle || 0.7) + 0.1;
        }
        if (tier >= 2) {
          flameArmorMelt = true;
        }
        if (tier >= 3) {
          flameSpreadDepth = 1;
          flameSpreadPower = 0.45;
          range += 12;
        }
        if (tier >= 4) {
          flameSpreadDepth = 2;
          flameSpreadPower = 0.6;
          range += 10;
        }
        if (tier >= 5) {
          flameSpreadDepth = 6;
          flameSpreadPower = 0.75;
          flameSpreadWindow = 1;
          range += 28;
          fireDuration = Math.max(fireDuration, 14);
        }
      } else {
        if (tier >= 1) {
          fireDuration = Math.max(fireDuration, (data.burnDuration || 3) + 1);
        }
        if (tier >= 2) {
          flameReveal = true;
          flameRadius = 30;
          flameSpreadDepth = 1;
          flameSpreadPower = 0.3;
        }
        if (tier >= 3) {
          fireDuration = Math.max(fireDuration, (data.burnDuration || 3) * 1.3);
        }
        if (tier >= 4) {
          fireDps = (data.burnDps || 12) * 1.2;
          coneAngle = (coneAngle || 0.7) + 0.1;
          flameRadius = Math.max(flameRadius, 60);
        }
        if (tier >= 5) {
          fireDps = (data.burnDps || 12) * 1.3;
          coneAngle = (coneAngle || 0.7) + 0.2;
          flameRadius = Math.max(flameRadius, 120);
          flameIgniteAll = true;
          flamePermanentReveal = true;
        }
      }
    }
    if (tower.type === "drone") {
      const tier = Math.min(level, 5);
      const path = tower.upgradePath || 1;
      if (path === 1) {
        if (tier >= 1) {
          damage *= 1.25;
        }
        if (tier >= 2) {
          range += 25;
          canHitStealth = true;
        }
        if (tier >= 3) {
          droneMissiles = 1;
          droneMissileDamage = damage * 1.2;
          droneMissileSplash = 38;
          droneMissileSpeed = 320;
        }
        if (tier >= 4) {
          rate *= 0.8;
          droneMissileSpeed *= 1.4;
        }
        if (tier >= 5) {
          rate *= 0.55;
          droneMissileSpeed *= 4;
          droneMissileSplash = 64;
        }
      } else {
        if (tier >= 1) {
          rate *= 0.85;
        }
        if (tier >= 2) {
          droneGuns = 2;
        }
        if (tier >= 3) {
          droneMiniCount = 1;
        }
        if (tier >= 4) {
          droneGuns = 4;
          rate *= 0.75;
        }
        if (tier >= 5) {
          rate *= 0.65;
          droneMiniCount = 2;
          droneBombDamage = 0;
          droneBombRadius = 0;
          droneBombRate = 0;
        }
      }
    }
    if (tower.type === "freeze") {
      const tier = Math.min(level, 5);
      const path = tower.upgradePath || 1;
      if (path === 1) {
        if (tier >= 1) {
          freezeMaxRadius += 18;
          freezeGrowRate += 10;
        }
        if (tier >= 2) {
          rate *= 0.8;
        }
        if (tier >= 3) {
          rate = Math.min(rate, 0.25);
          freezeDuration = Math.max(freezeDuration, 1.6);
        }
        if (tier >= 4) {
          slow = Math.min(0.9, slow + 0.15);
          freezeExposureThreshold = 1.2;
          freezeExposureDuration = 0.4;
          freezeKnockbackChance = 0.12;
        }
        if (tier >= 5) {
          slow = Math.min(0.95, slow + 0.2);
          freezeDamage = 6;
          freezeMaxRadius += 20;
          freezeGrowRate += 16;
          freezeExposureThreshold = 0.9;
          freezeExposureDuration = 0.55;
          freezeKnockbackChance = 0.2;
        }
      } else {
        if (tier >= 1) {
          slow = Math.min(0.9, slow + 0.1);
        }
        if (tier >= 2) {
          freezeDamage = 5;
        }
        if (tier >= 3) {
          freezePulseInterval = 1.1;
          freezePulseDuration = 0.45;
          freezeDamage = Math.max(freezeDamage, 7);
          freezePulseOnly = true;
        }
        if (tier >= 4) {
          freezeDamage = Math.max(freezeDamage, 9);
          freezePulseInterval = Math.max(0.9, freezePulseInterval);
        }
        if (tier >= 5) {
          slow = Math.min(0.96, slow + 0.15);
          freezeDamage = Math.max(freezeDamage, 12);
          freezePulseInterval = Math.max(0.7, freezePulseInterval);
        }
        if (freezePulseOnly) {
          freezePulseDamage = Math.max(freezePulseDamage, freezeDamage);
          freezeDamage = 0;
        }
      }
    }
    if (tower.type === "bomb") {
      const tier = Math.min(level, 5);
      const path = tower.upgradePath || 1;
      if (path === 1) {
        if (tier >= 1) {
          rate *= 0.8;
        }
        if (tier >= 2) {
          rate *= 0.65;
        }
        if (tier >= 3) {
          projectileSpeed = (projectileSpeed || data.projectileSpeed || 300) * 1.4;
          bombProjectileKind = "rocket";
          bombBurstCount = 1;
          splashRadius += 4;
          rate *= 0.7;
        }
        if (tier >= 4) {
          bombBurstCount = 6;
          rate *= 0.55;
          bombProjectileKind = "rocket";
          range += 50;
          splashRadius += 4;
        }
        if (tier >= 5) {
          bombBurstCount = 12;
          damage *= 1.25;
          splashRadius += 6;
          rate = Math.min(rate, 0.45);
          bombProjectileKind = "rocket";
          range += 70;
        }
      } else {
        if (tier >= 1) {
          damage *= 1.2;
        }
        if (tier >= 2) {
          splashRadius += 6;
        }
        if (tier >= 3) {
          bombClusterCount = 10;
          bombClusterDamage = damage * 0.6;
          bombClusterRadius = splashRadius * 0.5;
        }
        if (tier >= 4) {
          bombClusterCount = 12;
          bombClusterDamage = damage * 0.7;
          bombClusterRadius = splashRadius * 0.55;
        }
        if (tier >= 5) {
          bombClusterCount = 12;
          bombClusterChildCount = 6;
          bombClusterDamage = damage * 0.55;
          bombClusterChildDamage = damage * 0.35;
          bombClusterRadius = splashRadius * 0.6;
          bombClusterChildRadius = splashRadius * 0.4;
        }
      }
      splashRadius = Math.min(65, splashRadius);
    }
    if (tower.type === "spikeTower") {
      const tier = Math.min(level, 5);
      const path = tower.upgradePath || 1;
      const nearest = getNearestPathPoint(tower.x, tower.y);
      if (nearest) {
        spikeRange = nearest.dist + 80;
      }
      spikeDamage = data.damage;
      spikeExtendSpeed = data.spikeExtendSpeed;
      spikeRetractSpeed = data.spikeRetractSpeed;
      spikeHold = data.spikeHold;
      spikeSlow = 0;
      spikeSlowDuration = 1.2;
      spikeCount = 1;
      spikeDrillCharge = 0;
      spikeDrillDps = 0;
      spikeWave = false;
      spikeWaveRadius = 0;
      spikeWaveSlow = 0;
      if (path === 1) {
        if (tier >= 1) {
          spikeDamage *= 1.35;
        }
        if (tier >= 2) {
          spikeSlow = Math.max(spikeSlow, 0.18);
          spikeSlowDuration = 1.4;
        }
        if (tier >= 3) {
          spikeDrillCharge = 1.75;
          spikeDrillDps = spikeDamage * 0.85;
        }
        if (tier >= 4) {
          spikeDamage *= 1.25;
          spikeDrillCharge = 1.05;
          spikeDrillDps = Math.max(spikeDrillDps, spikeDamage * 1.1);
        }
        if (tier >= 5) {
          spikeDamage *= 1.6;
          spikeSlow = Math.max(spikeSlow, 0.3);
          spikeSlowDuration = 1.6;
          spikeDrillCharge = 0.65;
          spikeDrillDps = Math.max(spikeDrillDps, spikeDamage * 1.45);
        }
        if (spikeDrillCharge > 0) {
          spikeHold = Math.max(spikeHold, spikeDrillCharge + 0.4);
        }
      } else {
        if (tier >= 1) {
          spikeCount = 2;
        }
        if (tier >= 2) {
          spikeExtendSpeed *= 1.25;
          spikeRetractSpeed *= 1.35;
          spikeHold *= 0.8;
        }
        if (tier >= 3) {
          spikeCount = 4;
        }
        if (tier >= 4) {
          spikeCount = 6;
          spikeExtendSpeed *= 1.35;
          spikeRetractSpeed *= 1.5;
          spikeDamage *= 1.1;
        }
        if (tier >= 5) {
          spikeCount = 12;
          spikeWave = true;
          spikeWaveRadius = 60;
          spikeWaveSlow = 0.22;
          spikeDamage *= 1.2;
          spikeExtendSpeed *= 1.45;
          spikeRetractSpeed *= 1.6;
        }
      }
      damage = spikeDamage;
      slow = Math.max(slow, spikeSlow);
    }
    if (tower.type === "dart") {
      const tier = Math.min(level, 5);
      const path = tower.upgradePath || 1;
      if (path === 1) {
        if (tier >= 1) dartPoisonDps *= 1.4;
        if (tier >= 2) dartPoisonDuration += 1.5;
        if (tier >= 3) {
          dartPoisonRadius = 50;
        }
        if (tier >= 4) {
          rate *= 0.7;
          projectileSpeed = (projectileSpeed || data.projectileSpeed || 380) * 1.2;
        }
        if (tier >= 5) {
          globalPoisonDps = 3;
          globalPoisonDuration = 2.5;
          dartPoisonTransfer = true;
        }
      } else {
        if (tier >= 1) rate *= 0.85;
        if (tier >= 2) rate *= 0.75;
        if (tier >= 3) dartBurstCount = 4;
        if (tier >= 4) dartEmbrittlementBonus = 0.12;
        if (tier >= 5) {
          dartEmbrittlementBonus = 0.2;
          dartArmorWeaken = true;
        }
      }
    }
  }
  if (tower.type === "flame") {
    const tier = Math.min(tower.level, 5);
    const path = tower.upgradePath || 1;
    const cost = getUpgradeCost(tower);
    const path1Upgrades = [
      "flame burst (wider, more damage)",
      "armour melt",
      "wildfire spread",
      "pyromaniac spread",
      "the inferno",
    ];
    const path2Upgrades = [
      "ignite",
      "sparks (reveal)",
      "lingering flames",
      "heat wave",
      "pyroclast",
    ];
    upgradeText = [
      `Tier ${tier} (Cost ${cost}): ${path === 1 ? path1Upgrades[tier - 1] : path2Upgrades[tier - 1]}`,
    ][0];
    if (ui.flamePath1) {
      const p1Tier = path === 1 ? tier : 0;
      const nextP1 = path1Upgrades[Math.min(p1Tier, 4)];
      ui.flamePath1.textContent = `Path 1 (${p1Tier}/5): ${nextP1}`;
    }
    if (ui.flamePath2) {
      const p2Tier = path === 2 ? tier : 0;
      const nextP2 = path2Upgrades[Math.min(p2Tier, 4)];
      ui.flamePath2.textContent = `Path 2 (${p2Tier}/5): ${nextP2}`;
    }
  }

  if (tower.type !== "drone") {
    for (const other of state.towers) {
      if (other.type !== "drone") continue;
      if ((other.level || 1) < 5) continue;
      if (other.upgradePath !== 2) continue;
      if (other.disabled) continue;
      const dist = Math.hypot(other.x - tower.x, other.y - tower.y);
      if (dist <= 140) {
        rate *= 0.85;
        break;
      }
    }
  }

  if (projectileSpeed) {
    projectileSpeed *= 1 + Math.max(0, level - 1) * 0.06;
  }

  return {
    data,
    range,
    damage,
    rate,
    slow: Math.min(0.85, slow),
    projectileSpeed,
    fireDps,
    fireDuration,
    coneAngle,
    flameSpreadDepth,
    flameSpreadPower,
    flameSpreadWindow,
    flameReveal,
    flamePermanentReveal,
    flameRadius,
    flameArmorMelt,
    flameIgniteAll,
    freezeRadius,
    freezeMaxRadius,
    freezeGrowRate,
    freezeDuration,
    freezeDamage,
    freezePulseInterval,
    freezePulseDuration,
    freezePulseOnly,
    freezePulseDamage,
    freezeExposureThreshold,
    freezeExposureDuration,
    freezeKnockbackChance,
    laserBeamTtl,
    laserBeamWidth,
    laserBeamColor,
    laserDamageMult,
    laserChargeTime,
    laserCannonMult,
    laserContinuous,
    laserEnergyMax,
    laserEnergyDrain,
    laserRechargeTime,
    laserStun,
    laserInfinite,
    canHitStealth,
    droneGuns,
    droneMiniCount,
    droneMiniDamageMult,
    droneMissiles,
    droneMissileDamage,
    droneMissileSplash,
    droneMissileSpeed,
    droneBombDamage,
    droneBombRadius,
    droneBombRate,
    bombBurstCount,
    bombProjectileKind,
    bombClusterCount,
    bombClusterChildCount,
    bombClusterDamage,
    bombClusterRadius,
    bombClusterChildDamage,
    bombClusterChildRadius,
    splashRadius,
    dartPoisonDps,
    dartPoisonDuration,
    dartPoisonRadius,
    dartBurstCount,
    dartEmbrittlementBonus,
    dartArmorWeaken,
    dartPoisonTransfer,
    globalPoisonDps,
    globalPoisonDuration,
    spikeRange,
    spikeExtendSpeed,
    spikeRetractSpeed,
    spikeHold,
    spikeDamage,
    spikeSlow,
    spikeSlowDuration,
    spikeCount,
    spikeDrillCharge,
    spikeDrillDps,
    spikeWave,
    spikeWaveRadius,
    spikeWaveSlow,
  };
}

function getTowerDescription(type) {
  switch (type) {
    case "watch":
      return "Fast single-shot line bullets. Detects stealth.";
    case "freeze":
      return "Gas clouds that spread out and slow enemies.";
    case "drone":
      return "Mobile tower that chases targets. Upgrade into Missile Drone or Drone Commander.";
    case "bomb":
      return "Explosive shots with splash damage.";
    case "laser":
      return "Piercing beam that hits lines of enemies. Upgrades add burn.";
    case "dart":
      return "Poisons enemies over time.";
    case "flame":
      return "Rapid cone of flames that applies burn.";
    case "trap":
      return "Spawns traps that decay over time.";
    case "spikeTower":
      return "Void-mounted spikes that jab toward the nearest path.";
    case "mine":
      return "Explodes when enemies walk over it.";
    case "floorSpike":
      return "Floor spikes that damage enemies passing over them.";
    case "wall":
      return "Blocks the path. Place towers on it.";
    case "op":
      return "Overpowered beam that deletes enemies.";
    default:
      return "";
  }
}

function applyPathLock(tower) {
  const tier = Math.min(tower.level || 1, 5);
  const path = tower.upgradePath || 1;
  const buttons = [];
  switch (tower.type) {
    case "watch":
      buttons.push({ btn: ui.watchPath1, path: 1 }, { btn: ui.watchPath2, path: 2 });
      break;
    case "freeze":
      buttons.push({ btn: ui.freezePath1, path: 1 }, { btn: ui.freezePath2, path: 2 });
      break;
    case "bomb":
      buttons.push({ btn: ui.bombPath1, path: 1 }, { btn: ui.bombPath2, path: 2 });
      break;
    case "dart":
      buttons.push({ btn: ui.dartPath1, path: 1 }, { btn: ui.dartPath2, path: 2 });
      break;
    case "trap":
      buttons.push({ btn: ui.trapPath1, path: 1 }, { btn: ui.trapPath2, path: 2 });
      break;
    case "laser":
      buttons.push({ btn: ui.laserPath1, path: 1 }, { btn: ui.laserPath2, path: 2 });
      break;
    case "flame":
      buttons.push({ btn: ui.flamePath1, path: 1 }, { btn: ui.flamePath2, path: 2 });
      break;
    case "drone":
      buttons.push({ btn: ui.dronePath1, path: 1 }, { btn: ui.dronePath2, path: 2 });
      break;
    case "spikeTower":
      buttons.push({ btn: ui.spikePath1, path: 1 }, { btn: ui.spikePath2, path: 2 });
      break;
    default:
      break;
  }
  for (const entry of buttons) {
    if (entry.btn) entry.btn.disabled = false;
  }
  if (tier >= 3) {
    for (const entry of buttons) {
      if (entry.btn) entry.btn.disabled = entry.path !== path;
    }
  }
}

function updateUpgradePanel() {
  if (!ui.upgradeDetails) return;
  if (state.selectedTrap) {
    const trap = state.selectedTrap;
    const typeLabel = trap.explode ? "Explosive Trap" : trap.turret ? "Turret Trap" : "Spike Trap";
    const radiusText = trap.explode ? ` | Radius ${Math.round(trap.splashRadius || 0)}` : "";
    ui.upgradeDetails.textContent = `Trap: ${typeLabel}\n\nDamage ${Math.round(trap.damage)}${radiusText}\n\nTraps cannot be upgraded.`;
    if (ui.watchUpgradeActions) ui.watchUpgradeActions.classList.add("hidden");
    if (ui.freezeUpgradeActions) ui.freezeUpgradeActions.classList.add("hidden");
    if (ui.bombUpgradeActions) ui.bombUpgradeActions.classList.add("hidden");
    if (ui.dartUpgradeActions) ui.dartUpgradeActions.classList.add("hidden");
    if (ui.trapUpgradeActions) ui.trapUpgradeActions.classList.add("hidden");
    if (ui.laserUpgradeActions) ui.laserUpgradeActions.classList.add("hidden");
    if (ui.flameUpgradeActions) ui.flameUpgradeActions.classList.add("hidden");
    if (ui.droneUpgradeActions) ui.droneUpgradeActions.classList.add("hidden");
    if (ui.upgradeTargetRow) ui.upgradeTargetRow.classList.add("hidden");
    if (ui.upgradeTargetAction) ui.upgradeTargetAction.classList.add("hidden");
    if (ui.targetingRow) ui.targetingRow.classList.add("hidden");
    if (ui.wallUpgradeAction) ui.wallUpgradeAction.classList.add("hidden");
    if (ui.trapUpgradeAction) ui.trapUpgradeAction.classList.add("hidden");
    return;
  }
  const tower = state.selectedTower;
  if (!tower) {
    ui.upgradeDetails.textContent = "Select a tower to see upgrade info.";
    if (ui.watchUpgradeActions) ui.watchUpgradeActions.classList.add("hidden");
    if (ui.freezeUpgradeActions) ui.freezeUpgradeActions.classList.add("hidden");
    if (ui.bombUpgradeActions) ui.bombUpgradeActions.classList.add("hidden");
    if (ui.dartUpgradeActions) ui.dartUpgradeActions.classList.add("hidden");
    if (ui.upgradeTargetRow) ui.upgradeTargetRow.classList.add("hidden");
    if (ui.upgradeTargetAction) ui.upgradeTargetAction.classList.add("hidden");
    if (ui.targetingRow) ui.targetingRow.classList.add("hidden");
    if (ui.wallUpgradeAction) ui.wallUpgradeAction.classList.add("hidden");
    if (ui.trapUpgradeAction) ui.trapUpgradeAction.classList.add("hidden");
    if (ui.laserUpgradeActions) ui.laserUpgradeActions.classList.add("hidden");
    if (ui.flameUpgradeActions) ui.flameUpgradeActions.classList.add("hidden");
    if (ui.droneUpgradeActions) ui.droneUpgradeActions.classList.add("hidden");
    if (ui.spikeUpgradeActions) ui.spikeUpgradeActions.classList.add("hidden");
    return;
  }
  if (tower.type === "wall") {
    ui.upgradeDetails.textContent = "Wall\n\nPlain wall (can hold towers).";
    if (ui.watchUpgradeActions) ui.watchUpgradeActions.classList.add("hidden");
    if (ui.freezeUpgradeActions) ui.freezeUpgradeActions.classList.add("hidden");
    if (ui.bombUpgradeActions) ui.bombUpgradeActions.classList.add("hidden");
    if (ui.dartUpgradeActions) ui.dartUpgradeActions.classList.add("hidden");
    if (ui.upgradeTargetRow) ui.upgradeTargetRow.classList.add("hidden");
    if (ui.upgradeTargetAction) ui.upgradeTargetAction.classList.add("hidden");
    if (ui.targetingRow) ui.targetingRow.classList.add("hidden");
    if (ui.wallUpgradeAction) ui.wallUpgradeAction.classList.add("hidden");
    if (ui.trapUpgradeAction) ui.trapUpgradeAction.classList.add("hidden");
    if (ui.laserUpgradeActions) ui.laserUpgradeActions.classList.add("hidden");
    if (ui.droneUpgradeActions) ui.droneUpgradeActions.classList.add("hidden");
    if (ui.spikeUpgradeActions) ui.spikeUpgradeActions.classList.add("hidden");
    return;
  }
  if (tower.type === "mine" || tower.type === "floorSpike") {
    ui.upgradeDetails.textContent = getTowerDescription(tower.type);
    if (ui.watchUpgradeActions) ui.watchUpgradeActions.classList.add("hidden");
    if (ui.freezeUpgradeActions) ui.freezeUpgradeActions.classList.add("hidden");
    if (ui.bombUpgradeActions) ui.bombUpgradeActions.classList.add("hidden");
    if (ui.dartUpgradeActions) ui.dartUpgradeActions.classList.add("hidden");
    if (ui.upgradeTargetRow) ui.upgradeTargetRow.classList.add("hidden");
    if (ui.upgradeTargetAction) ui.upgradeTargetAction.classList.add("hidden");
    if (ui.targetingRow) ui.targetingRow.classList.add("hidden");
    if (ui.wallUpgradeAction) ui.wallUpgradeAction.classList.add("hidden");
    if (ui.trapUpgradeAction) ui.trapUpgradeAction.classList.add("hidden");
    if (ui.laserUpgradeActions) ui.laserUpgradeActions.classList.add("hidden");
    if (ui.droneUpgradeActions) ui.droneUpgradeActions.classList.add("hidden");
    if (ui.spikeUpgradeActions) ui.spikeUpgradeActions.classList.add("hidden");
    return;
  }
  const stats = getTowerStats(tower);
  const desc = getTowerDescription(tower.type);
  const nextTier = (tower.level || 1) + 1;
  const upgradeCost = getUpgradeCost(tower);
  let upgradeText = "Upgrades: +damage, +range, faster fire, faster bullets.";
  const bombMaxed = tower.type === "bomb" && (tower.level || 1) >= state.towerLevelCap;
  if (tower.type === "freeze") {
    upgradeText = "Upgrades: stronger slow + longer range.";
  }
  if (tower.type === "laser") {
    const tier = Math.min(tower.level, 5);
    const path = tower.upgradePath || 1;
    const cost = getUpgradeCost(tower);
    const path1Upgrades = [
      "power boost",
      "telescope",
      "jump starter",
      "intense heat",
      "plasma ray",
    ];
    const path2Upgrades = [
      "damage boost",
      "larger batteries",
      "concentrated beam",
      "energy cannon",
      "plasma cannon",
    ];
    upgradeText = [
      `Tier ${tier} (Cost ${cost}): ${path === 1 ? path1Upgrades[tier - 1] : path2Upgrades[tier - 1]}`,
    ][0];
    if (ui.laserPath1) {
      const p1Tier = path === 1 ? tier : 0;
      const nextP1 = path1Upgrades[Math.min(p1Tier, 4)];
      ui.laserPath1.textContent = `Path 1 (${p1Tier}/5): ${nextP1}`;
    }
    if (ui.laserPath2) {
      const p2Tier = path === 2 ? tier : 0;
      const nextP2 = path2Upgrades[Math.min(p2Tier, 4)];
      ui.laserPath2.textContent = `Path 2 (${p2Tier}/5): ${nextP2}`;
    }
  }
  if (tower.type === "freeze") {
    const tier = Math.min(tower.level, 5);
    const path = tower.upgradePath || 1;
    const cost = getUpgradeCost(tower);
    const path1Upgrades = [
      "bigger radius",
      "faster freeze",
      "cold winds",
      "intense winds",
      "blizzard",
    ];
    const path2Upgrades = [
      "stronger freeze",
      "hail",
      "frostbite",
      "icicles",
      "permafrost",
    ];
    upgradeText = [
      `Tier ${tier} (Cost ${cost}): ${path === 1 ? path1Upgrades[tier - 1] : path2Upgrades[tier - 1]}`,
    ][0];
    if (ui.freezePath1) {
      const p1Tier = path === 1 ? tier : 0;
      const nextP1 = path1Upgrades[Math.min(p1Tier, 4)];
      ui.freezePath1.textContent = `Path 1 (${p1Tier}/5): ${nextP1}`;
    }
    if (ui.freezePath2) {
      const p2Tier = path === 2 ? tier : 0;
      const nextP2 = path2Upgrades[Math.min(p2Tier, 4)];
      ui.freezePath2.textContent = `Path 2 (${p2Tier}/5): ${nextP2}`;
    }
  }
  if (tower.type === "bomb") {
    const tier = Math.min(tower.level, 5);
    const path = tower.upgradePath || 1;
    const cost = getUpgradeCost(tower);
    const path1Upgrades = [
      "faster attack speed",
      "even faster attack speed",
      "better munitions",
      "rockets",
      "rocket pods",
    ];
    const path2Upgrades = [
      "more damage",
      "bigger explosion",
      "shrapnel",
      "cluster shell",
      "cluster storm",
    ];
    upgradeText = [
      `Tier ${tier} (Cost ${cost}): ${path === 1 ? path1Upgrades[tier - 1] : path2Upgrades[tier - 1]}`,
    ][0];
    if (ui.bombPath1) {
      const p1Tier = path === 1 ? tier : 0;
      const nextP1 = path1Upgrades[Math.min(p1Tier, 4)];
      ui.bombPath1.textContent = `Path 1 (${p1Tier}/5): ${nextP1}`;
    }
    if (ui.bombPath2) {
      const p2Tier = path === 2 ? tier : 0;
      const nextP2 = path2Upgrades[Math.min(p2Tier, 4)];
      ui.bombPath2.textContent = `Path 2 (${p2Tier}/5): ${nextP2}`;
    }
  }
  if (tower.type === "dart") {
    const tier = Math.min(tower.level, 5);
    const path = tower.upgradePath || 1;
    const cost = getUpgradeCost(tower);
    const path1Upgrades = [
      "poison damage increased",
      "poison duration increased",
      "poison radius",
      "dart gun",
      "poison transfer",
    ];
    const path2Upgrades = [
      "faster attack speed",
      "even faster attack speed",
      "dart burst",
      "embrittlement",
      "stronger concoction",
    ];
    upgradeText = [
      `Tier ${tier} (Cost ${cost}): ${path === 1 ? path1Upgrades[tier - 1] : path2Upgrades[tier - 1]}`,
    ][0];
    if (ui.dartPath1) {
      const p1Tier = path === 1 ? tier : 0;
      const nextP1 = path1Upgrades[Math.min(p1Tier, 4)];
      ui.dartPath1.textContent = `Path 1 (${p1Tier}/5): ${nextP1}`;
    }
    if (ui.dartPath2) {
      const p2Tier = path === 2 ? tier : 0;
      const nextP2 = path2Upgrades[Math.min(p2Tier, 4)];
      ui.dartPath2.textContent = `Path 2 (${p2Tier}/5): ${nextP2}`;
    }
  }
  if (tower.type === "drone") {
    const tier = Math.min(tower.level, 5);
    const path = tower.upgradePath || 1;
    const cost = getUpgradeCost(tower);
    const path1Upgrades = [
      "better components",
      "advanced tracking",
      "missile pod",
      "smart targeting",
      "missile drone",
    ];
    const path2Upgrades = [
      "faster shooting",
      "second gun",
      "extra drone",
      "construction",
      "commander",
    ];
    upgradeText = [
      `Tier ${tier} (Cost ${cost}): ${path === 1 ? path1Upgrades[tier - 1] : path2Upgrades[tier - 1]}`,
    ][0];
    if (ui.dronePath1) {
      const p1Tier = path === 1 ? tier : 0;
      const nextP1 = path1Upgrades[Math.min(p1Tier, 4)];
      ui.dronePath1.textContent = `Path 1 (${p1Tier}/5): ${nextP1}`;
    }
    if (ui.dronePath2) {
      const p2Tier = path === 2 ? tier : 0;
      const nextP2 = path2Upgrades[Math.min(p2Tier, 4)];
      ui.dronePath2.textContent = `Path 2 (${p2Tier}/5): ${nextP2}`;
    }
  }
  if (tower.type === "spikeTower") {
    const tier = Math.min(tower.level, 5);
    const path = tower.upgradePath || 1;
    const cost = getUpgradeCost(tower);
    const path1Upgrades = [
      "Super Drill: Sharper spikes",
      "Reinforced spikes",
      "Drill Start",
      "Drill Speed",
      "Splitter of Mountains",
    ];
    const path2Upgrades = [
      "More spikes",
      "Quicker spring",
      "Quad spikes",
      "Spikes galore",
      "Wave of spikes",
    ];
    upgradeText = [
      `Tier ${tier} (Cost ${cost}): ${path === 1 ? path1Upgrades[tier - 1] : path2Upgrades[tier - 1]}`,
    ][0];
    if (ui.spikePath1) {
      const p1Tier = path === 1 ? tier : 0;
      const nextP1 = path1Upgrades[Math.min(p1Tier, 4)];
      ui.spikePath1.textContent = `Path 1 (${p1Tier}/5): ${nextP1}`;
    }
    if (ui.spikePath2) {
      const p2Tier = path === 2 ? tier : 0;
      const nextP2 = path2Upgrades[Math.min(p2Tier, 4)];
      ui.spikePath2.textContent = `Path 2 (${p2Tier}/5): ${nextP2}`;
    }
  }
  if (tower.type === "watch") {
    const tier = Math.min(tower.level, 5);
    const path = tower.upgradePath || 1;
    const cost = getUpgradeCost(tower);
    const path1Upgrades = [
      "+50% attack speed",
      "+50% attack speed",
      "+10% range",
      "more speed, slightly less damage",
      "machine gun",
    ];
    const path2Upgrades = [
      "slightly more damage",
      "even more damage",
      "double range",
      "lots of damage, slower speed",
      "all towers see hidden",
    ];
    if (path === 1) {
      upgradeText = [
        `Tier 1 (Cost ${cost}): ${path1Upgrades[0]}`,
        `Tier 2 (Cost ${cost}): ${path1Upgrades[1]}`,
        `Tier 3 (Cost ${cost}): ${path1Upgrades[2]}`,
        `Tier 4 (Cost ${cost}): ${path1Upgrades[3]}`,
        `Tier 5 (Cost ${cost}): ${path1Upgrades[4]}`,
      ][tier - 1] || `Pick a path. Next cost ${cost}.`;
    } else {
      upgradeText = [
        `Tier 1 (Cost ${cost}): ${path2Upgrades[0]}`,
        `Tier 2 (Cost ${cost}): ${path2Upgrades[1]}`,
        `Tier 3 (Cost ${cost}): ${path2Upgrades[2]}`,
        `Tier 4 (Cost ${cost}): ${path2Upgrades[3]}`,
        `Tier 5 (Cost ${cost}): ${path2Upgrades[4]}`,
      ][tier - 1] || `Pick a path. Next cost ${cost}.`;
    }
    if (ui.watchPath1) {
      const p1Tier = path === 1 ? tier : 0;
      const nextP1 = path1Upgrades[Math.min(p1Tier, 4)];
      ui.watchPath1.textContent = `Path 1 (${p1Tier}/5): ${nextP1}`;
    }
    if (ui.watchPath2) {
      const p2Tier = path === 2 ? tier : 0;
      const nextP2 = path2Upgrades[Math.min(p2Tier, 4)];
      ui.watchPath2.textContent = `Path 2 (${p2Tier}/5): ${nextP2}`;
    }
  }
  if (tower.type === "trap") {
    const tier = Math.min(tower.level, 5);
    const path = tower.upgradePath || 1;
    const cost = getUpgradeCost(tower);
    const path1Upgrades = [
      "spawn rate +10%",
      "spawn rate +20%",
      "deploy turrets",
      "dual turret, faster fire",
      "sentries, longer life",
    ];
    const path2Upgrades = [
      "trap damage +10%",
      "lifetime +30s",
      "sticky traps, slow",
      "exploding mines",
      "super mines",
    ];
    upgradeText = `Tier ${tier} (Cost ${cost}): ${path === 1 ? path1Upgrades[tier - 1] : path2Upgrades[tier - 1]}`;
    if (ui.trapPath1) {
      const p1Tier = path === 1 ? tier : 0;
      const nextP1 = path1Upgrades[Math.min(p1Tier, 4)];
      ui.trapPath1.textContent = `Path 1 (${p1Tier}/5): ${nextP1}`;
    }
    if (ui.trapPath2) {
      const p2Tier = path === 2 ? tier : 0;
      const nextP2 = path2Upgrades[Math.min(p2Tier, 4)];
      ui.trapPath2.textContent = `Path 2 (${p2Tier}/5): ${nextP2}`;
    }
  }
  applyPathLock(tower);
  const burnText = stats.fireDps > 0 ? ` | Burn ${stats.fireDps.toFixed(1)}/s (${stats.fireDuration.toFixed(1)}s)` : "";
  const speedText = stats.projectileSpeed ? ` | Shot Spd ${Math.round(stats.projectileSpeed)}` : "";
  const statLine = `Range ${Math.round(stats.range)} | Rate ${stats.rate.toFixed(2)}s | Damage ${Math.round(stats.damage)}${tower.type === "freeze" ? ` | Slow ${stats.slow.toFixed(2)}` : ""}${speedText}${burnText}`;
  const cap = state.towerLevelCap || 5;
  if (bombMaxed) {
    ui.upgradeDetails.textContent = `MAX TIER.\n\n${desc}\n\n${upgradeText}\n\n${statLine}`;
  } else if ((tower.level || 1) >= cap) {
    ui.upgradeDetails.textContent = `MAX TIER.\n\n${desc}\n\n${tower.type === "laser" ? "From tier 3 there is burning.\n\n" : ""}${upgradeText}\n\n${statLine}`;
  } else {
    ui.upgradeDetails.textContent = `Next: Tier ${nextTier} (Cost ${upgradeCost}).\n\n${desc}\n\n${tower.type === "laser" ? "From tier 3 there is burning.\n\n" : ""}${upgradeText}\n\n${statLine}`;
  }
  if (ui.watchUpgradeActions) {
    ui.watchUpgradeActions.classList.toggle("hidden", tower.type !== "watch");
  }
  if (ui.freezeUpgradeActions) {
    ui.freezeUpgradeActions.classList.toggle("hidden", tower.type !== "freeze");
  }
  if (ui.bombUpgradeActions) {
    ui.bombUpgradeActions.classList.toggle("hidden", tower.type !== "bomb");
  }
  if (ui.dartUpgradeActions) {
    ui.dartUpgradeActions.classList.toggle("hidden", tower.type !== "dart");
  }
  if (ui.trapUpgradeActions) {
    ui.trapUpgradeActions.classList.toggle("hidden", tower.type !== "trap");
  }
  if (ui.laserUpgradeActions) {
    ui.laserUpgradeActions.classList.toggle("hidden", tower.type !== "laser");
  }
  if (ui.flameUpgradeActions) {
    ui.flameUpgradeActions.classList.toggle("hidden", tower.type !== "flame");
  }
  if (ui.droneUpgradeActions) {
    ui.droneUpgradeActions.classList.toggle("hidden", tower.type !== "drone");
  }
  if (ui.spikeUpgradeActions) {
    ui.spikeUpgradeActions.classList.toggle("hidden", tower.type !== "spikeTower");
  }
  if (ui.wallUpgradeAction) {
    ui.wallUpgradeAction.classList.add("hidden");
  }
  if (ui.upgradeTargetRow) {
    ui.upgradeTargetRow.classList.toggle("hidden", bombMaxed);
  }
  if (ui.upgradeTargetAction) {
    ui.upgradeTargetAction.classList.toggle("hidden", bombMaxed);
  }
  if (ui.targetingRow) {
    ui.targetingRow.classList.remove("hidden");
  }
  if (ui.targetingMode) {
    const mode = tower.targeting || "first";
    ui.targetingMode.textContent = `Target: ${targetingLabels[mode] || "First"}`;
  }
  if (ui.trapUpgradeAction) {
    ui.trapUpgradeAction.classList.add("hidden");
  }
}

function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
  const snapped = snapToGrid(x, y);

  for (const enemy of state.enemies) {
    const radius = enemy.type === "boss" ? 20 : enemy.type === "heavy" ? 16 : 12;
    if (Math.hypot(enemy.x - x, enemy.y - y) <= radius + 4) {
      enemy.revealed = true;
      return;
    }
  }

  const trapHere = state.traps.find((trap) => Math.hypot(trap.x - x, trap.y - y) < (trap.hitRadius || 14));
  if (trapHere) {
    state.selectedTrap = trapHere;
    state.selectedTower = null;
    state.placing = null;
    return;
  }

  for (const tower of state.towers) {
    if (tower.type !== "drone") continue;
    if (!Number.isFinite(tower.baseX) || !Number.isFinite(tower.baseY)) continue;
    if (Math.hypot(tower.baseX - x, tower.baseY - y) <= 16) {
      state.selectedTower = tower;
      state.selectedTrap = null;
      state.placing = null;
      return;
    }
  }

  let selected = null;
  const towersHere = state.towers.filter((tower) => Math.hypot(tower.x - snapped.x, tower.y - snapped.y) < 20);
  const selectableHere = towersHere.filter((tower) => !tower.isMini);
  if (state.placing) {
    if (state.placing === "wall") {
      const wallHere = selectableHere.find((tower) => tower.type === "wall");
      if (wallHere) {
        state.selectedTower = wallHere;
        state.selectedTrap = null;
        state.placing = null;
        return;
      }
    } else {
      const hasNonWall = selectableHere.some((tower) => tower.type !== "wall");
      if (!hasNonWall) {
        placeTower(state.placing, snapped.x, snapped.y);
        return;
      }
    }
  }
  if (selectableHere.length > 0) {
    const wall = selectableHere.find((tower) => tower.type === "wall");
    const nonWall = selectableHere.find((tower) => tower.type !== "wall");
    if (wall && nonWall) {
      selected = nonWall;
    } else {
      selected = nonWall || wall;
    }
  }
  state.selectedTower = selected;
  state.selectedTrap = null;
  if (selected) {
    state.placing = null;
    return;
  }
  if (state.placing) {
    const placingType = state.placing;
    placeTower(placingType, snapped.x, snapped.y);
    state.selectedTower = null;
    state.selectedTrap = null;
    if (placingType !== "wall") {
      state.placing = null;
    }
  }
}

function emitFreezeGas(tower, enemy, stats) {
  const { data } = stats;
  const origin = { x: tower.x, y: tower.y };
  const targetPos = getEnemyPosition(enemy);
  const angle = Math.atan2(targetPos.y - origin.y, targetPos.x - origin.x);
  const speed = data.gasSpeed || 60;
  tower.facing = angle;

  let proj = state.projectiles.find((entry) => entry.kind === "gas" && entry.owner === tower);
  const maxRadius = Math.max(stats.range, stats.freezeMaxRadius || data.gasMaxRadius || 0, stats.freezeRadius || data.gasRadius || 0);
  const startRadius = Math.min(stats.freezeRadius || data.gasRadius || 10, maxRadius);
  if (!proj) {
    proj = {
      kind: "gas",
      owner: tower,
      x: origin.x,
      y: origin.y,
      facing: angle,
      ttl: stats.freezeDuration || data.gasDuration || 1.1,
      maxTtl: stats.freezeDuration || data.gasDuration || 1.1,
      radius: startRadius,
      maxRadius,
      growRate: stats.freezeGrowRate || data.gasGrowRate || 0,
      slow: stats.slow,
      damage: stats.freezeDamage || 0,
      pulseInterval: stats.freezePulseInterval || 0,
      pulseDuration: stats.freezePulseDuration || 0,
      pulseOnly: stats.freezePulseOnly || false,
      pulseDamage: stats.freezePulseDamage || 0,
      exposureThreshold: stats.freezeExposureThreshold || 0,
      exposureDuration: stats.freezeExposureDuration || 0,
      knockbackChance: stats.freezeKnockbackChance || 0,
      sourceType: tower.type,
    };
    state.projectiles.push(proj);
  } else {
    proj.facing = angle;
    proj.slow = stats.slow;
    proj.growRate = stats.freezeGrowRate || data.gasGrowRate || proj.growRate;
    proj.maxRadius = maxRadius;
    proj.radius = Math.min(proj.radius || startRadius, maxRadius);
    proj.damage = stats.freezeDamage || 0;
    proj.pulseInterval = stats.freezePulseInterval || 0;
    proj.pulseDuration = stats.freezePulseDuration || 0;
    proj.pulseOnly = stats.freezePulseOnly || false;
    proj.pulseDamage = stats.freezePulseDamage || 0;
    proj.exposureThreshold = stats.freezeExposureThreshold || 0;
    proj.exposureDuration = stats.freezeExposureDuration || 0;
    proj.knockbackChance = stats.freezeKnockbackChance || 0;
  }

  proj.ttl = stats.freezeDuration || data.gasDuration || 1.1;
  proj.maxTtl = proj.ttl;
  proj.x = origin.x;
  proj.y = origin.y;
}

function fireProjectile(tower, enemy, stats) {
  const { data } = stats;
  const damage = stats.damage;
  const sourceType = tower.type;
  let poisonDps = (data.poisonDps || 0) + (tower.level - 1) * 1.5;
  let poisonDuration = data.poisonDuration ? data.poisonDuration + (tower.level - 1) * 0.2 : 0;
  let embrittlementPercent = sourceType === "dart"
    ? 0.05 + Math.max(0, tower.level - 1) * 0.02
    : 0;
  let poisonRadius = 0;
  let burstCount = 1;
  let armorWeaken = false;
  if (sourceType === "dart") {
    poisonDps = coalesce(stats.dartPoisonDps, poisonDps);
    poisonDuration = coalesce(stats.dartPoisonDuration, poisonDuration);
    poisonRadius = stats.dartPoisonRadius || 0;
    burstCount = Math.max(1, stats.dartBurstCount || 1);
    embrittlementPercent = Math.max(embrittlementPercent, stats.dartEmbrittlementBonus || 0);
    armorWeaken = Boolean(stats.dartArmorWeaken);
  }
  if (data.projectileType === "gas") {
    emitFreezeGas(tower, enemy, stats);
    return;
  }

  if (sourceType === "drone") {
    const bulletSpeed = stats.projectileSpeed || data.projectileSpeed || 340;
    const guns = Math.max(1, stats.droneGuns || 1);
    const miniCount = stats.droneMiniCount || 0;
    const fireHoming = (x, y, dmg, speed) => {
      state.projectiles.push({
        kind: "homing",
        x,
        y,
        target: enemy,
        speed,
        damage: dmg,
        slow: stats.slow,
        sourceType,
        poisonDps: 0,
        poisonDuration: 0,
        embrittlementPercent: 0,
      });
    };
    const toTarget = Math.atan2(enemy.y - tower.y, enemy.x - tower.x);
    const offsetAngle = toTarget + Math.PI / 2;
    const baseOffset = guns > 1 ? 6 : 0;
    for (let i = 0; i < guns; i += 1) {
      const offset = (i - (guns - 1) / 2) * baseOffset;
      const ox = tower.x + Math.cos(offsetAngle) * offset;
      const oy = tower.y + Math.sin(offsetAngle) * offset;
      fireHoming(ox, oy, damage, bulletSpeed);
    }
    if (stats.droneMissiles > 0) {
      const missileSpeed = stats.droneMissileSpeed || 280;
      const missileDamage = stats.droneMissileDamage || damage * 1.1;
      const missileSplash = stats.droneMissileSplash || 30;
      for (let i = 0; i < stats.droneMissiles; i += 1) {
        state.projectiles.push({
          kind: "rocket",
          x: tower.x,
          y: tower.y,
          target: enemy,
          targetPos: getEnemyPosition(enemy),
          speed: Math.min(140, missileSpeed),
          maxSpeed: Math.max(missileSpeed, 320),
          accel: 220,
          damage: missileDamage,
          splashRadius: missileSplash,
          sourceType,
          armorPierce: true,
        });
      }
    }
    return;
  }

  if (sourceType !== "dart" && state.globalPoisonDps > 0) {
    poisonDps = Math.max(poisonDps, state.globalPoisonDps);
    poisonDuration = Math.max(poisonDuration, state.globalPoisonDuration);
  }

  if (data.splashRadius || stats.splashRadius) {
    const burst = Math.max(1, stats.bombBurstCount || 1);
    const splash = stats.splashRadius || data.splashRadius || 0;
    for (let i = 0; i < burst; i += 1) {
      state.projectiles.push({
        kind: stats.bombProjectileKind || "bomb",
        x: tower.x,
        y: tower.y,
        target: enemy,
        targetPos: getEnemyPosition(enemy),
        speed: stats.bombProjectileKind === "rocket" ? 140 : (stats.projectileSpeed || data.projectileSpeed || 260),
        maxSpeed: stats.bombProjectileKind === "rocket" ? Math.max(320, (stats.projectileSpeed || data.projectileSpeed || 260) * 1.4) : undefined,
        accel: stats.bombProjectileKind === "rocket" ? 240 : undefined,
        damage,
        splashRadius: splash,
        ttl: stats.bombProjectileKind === "rocket" ? 5 : undefined,
        sourceType,
        clusterCount: stats.bombClusterCount || 0,
        clusterChildCount: stats.bombClusterChildCount || 0,
        clusterDamage: stats.bombClusterDamage || 0,
        clusterRadius: stats.bombClusterRadius || 0,
        clusterChildDamage: stats.bombClusterChildDamage || 0,
        clusterChildRadius: stats.bombClusterChildRadius || 0,
      });
    }
    return;
  }

  for (let i = 0; i < burstCount; i += 1) {
    if (sourceType === "watch") {
      if (!(enemy.armored && sourceType !== "laser" && sourceType !== "bomb" && sourceType !== "op" && !armorWeaken)) {
        applyDamage(enemy, damage);
        enemy.revealed = true;
      }
      const dx = enemy.x - tower.x;
      const dy = enemy.y - tower.y;
      const dist = Math.hypot(dx, dy) || 1;
      state.projectiles.push({
        kind: "line",
        x: tower.x,
        y: tower.y,
        vx: (dx / dist) * 120,
        vy: (dy / dist) * 120,
        ttl: 0.08,
      });
      continue;
    }
    state.projectiles.push({
      kind: sourceType === "watch" ? "line" : "homing",
      x: tower.x,
      y: tower.y,
      target: enemy,
      speed: stats.projectileSpeed || data.projectileSpeed || 320,
      damage,
      slow: stats.slow,
      sourceType,
      poisonDps,
      poisonDuration,
      embrittlementPercent,
      poisonRadius,
      armorWeaken,
      poisonTransfer: Boolean(stats.dartPoisonTransfer),
    });
  }
}

function fireLaser(tower, enemy, stats, range) {
  const { data } = stats;
  const originX = tower.x;
  const originY = tower.y;
  const targetPos = getEnemyPosition(enemy);
  const dx = targetPos.x - originX;
  const dy = targetPos.y - originY;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const beamLength = stats.laserInfinite ? Math.hypot(canvas.width, canvas.height) * 1.2 : range;
  const endX = originX + ux * beamLength;
  const endY = originY + uy * beamLength;
  const beamWidth = stats.laserBeamWidth || data.beamWidth || 6;
  const baseDamage = stats.damage + (tower.level - 1) * 2;
  const damage = baseDamage * (stats.laserDamageMult || 1) * (stats.laserCannonMult || 1);

  const sourceType = tower.type;
  for (const target of state.enemies) {
    if (target.hp <= 0) continue;
    if (target.darkMatter && (sourceType === "laser" || sourceType === "op")) continue;
    if (target.armored && sourceType !== "laser" && sourceType !== "bomb" && sourceType !== "op") continue;
    const pos = getEnemyPosition(target);
    const vx = pos.x - originX;
    const vy = pos.y - originY;
    const t = vx * ux + vy * uy;
    if (t < 0 || t > beamLength) continue;
    const closestX = originX + ux * t;
    const closestY = originY + uy * t;
    const distToLine = Math.hypot(pos.x - closestX, pos.y - closestY);
    if (distToLine <= beamWidth) {
      if (target.armored && (sourceType === "laser" || sourceType === "bomb")) {
        applyArmorHit(target);
      }
      applyDamage(target, damage);
      if (stats.fireDps > 0 && stats.fireDuration > 0 && !target.darkMatter && !target.immuneHeat) {
        target.burnTimer = Math.max(target.burnTimer, stats.fireDuration);
        target.burnDps = Math.max(target.burnDps, stats.fireDps);
      }
      if (stats.laserStun > 0) {
        target.stunTimer = Math.max(target.stunTimer || 0, stats.laserStun);
      }
      if (sourceType === "op" && data.splashRadius) {
        for (const splash of state.enemies) {
          if (splash.hp <= 0) continue;
          const splashDist = Math.hypot(splash.x - target.x, splash.y - target.y);
          if (splashDist <= data.splashRadius) {
            if (splash.armored && (sourceType === "laser" || sourceType === "bomb")) {
              applyArmorHit(splash);
            }
            applyDamage(splash, damage * 0.5);
            if (splash.hp <= 0) {
              handleEnemyDeath(splash);
            }
          }
        }
        state.explosions.push({
          x: target.x,
          y: target.y,
          radius: data.splashRadius,
          ttl: 0.25,
          color: "rgba(253, 224, 71, 0.6)",
        });
      }
      if (target.hp <= 0) {
        handleEnemyDeath(target);
      }
    }
  }

  state.beams.push({
    x1: originX,
    y1: originY,
    x2: endX,
    y2: endY,
    width: beamWidth,
    ttl: stats.laserBeamTtl || 0.12,
    color: stats.laserBeamColor || data.color,
  });
}

function fireFlameCone(tower, enemy, stats) {
  const { data } = stats;
  const originX = tower.x;
  const originY = tower.y;
  const targetPos = getEnemyPosition(enemy);
  const angle = Math.atan2(targetPos.y - originY, targetPos.x - originX);
  const coneAngle = stats.coneAngle || data.coneAngle || 0.7;
  const range = stats.range;
  const damage = stats.damage;
  const burnDps = stats.fireDps > 0 ? stats.fireDps : (data.burnDps || 18);
  const burnDuration = stats.fireDuration > 0 ? stats.fireDuration : (data.burnDuration || 3);
  const igniteAll = stats.flameIgniteAll;
  const spreadDepth = stats.flameSpreadDepth || 0;
  const spreadPower = stats.flameSpreadPower || 0;
  const spreadWindow = stats.flameSpreadWindow || 0;
  const spreadRadius = 50;
  const igniteRadius = stats.flameRadius || 0;
  const now = performance.now() / 1000;
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
}

function updateProjectiles(dt) {
  if (state.nukeSmoke) {
    state.projectiles = [];
    return;
  }
  state.projectiles = state.projectiles.filter((proj) => {
    if (proj.kind === "line") {
      proj.ttl = (proj.ttl || 0) - dt;
      proj.x += (proj.vx || 0) * dt;
      proj.y += (proj.vy || 0) * dt;
      return proj.ttl > 0;
    }
    if (proj.kind === "gas") {
      proj.ttl -= dt;
      if (proj.owner && proj.owner.type === "freeze") {
        proj.x = proj.owner.x;
        proj.y = proj.owner.y;
      }
      const maxRadius = proj.maxRadius || proj.radius;
      proj.radius = Math.min(maxRadius, proj.radius + (proj.growRate || 0) * dt);
      for (const enemy of state.enemies) {
        if (enemy.hp <= 0) continue;
        if (enemy.darkMatter) continue;
        const dist = Math.hypot(enemy.x - proj.x, enemy.y - proj.y);
        if (dist <= proj.radius) {
          let pulseTriggered = false;
          if (!state.nukeSmoke && proj.damage > 0) {
            applyDamage(enemy, proj.damage * dt);
            if (enemy.hp <= 0) {
              handleEnemyDeath(enemy);
              continue;
            }
          }
          if (proj.pulseInterval > 0 && proj.pulseDuration > 0) {
            enemy.freezePulseCooldown = Math.max(0, enemy.freezePulseCooldown || 0);
            if ((enemy.freezePulseCooldown || 0) <= 0) {
              enemy.stunTimer = Math.max(enemy.stunTimer || 0, proj.pulseDuration);
              if (proj.pulseDamage > 0) {
                applyDamage(enemy, proj.pulseDamage);
                if (enemy.hp <= 0) {
                  handleEnemyDeath(enemy);
                  continue;
                }
              }
              enemy.freezePulseCooldown = proj.pulseInterval;
              pulseTriggered = true;
            }
          }
          const pulseActive = (enemy.stunTimer || 0) > 0 || pulseTriggered;
          if (!proj.pulseOnly || pulseActive) {
            enemy.slowTimer = Math.max(enemy.slowTimer, 1);
            enemy.slowFactor = Math.max(enemy.slowFactor || 0, proj.slow);
          }
          if (proj.exposureThreshold > 0 && proj.exposureDuration > 0) {
            enemy.freezeExposure = (enemy.freezeExposure || 0) + dt;
            if (enemy.freezeExposure >= proj.exposureThreshold) {
              enemy.stunTimer = Math.max(enemy.stunTimer || 0, proj.exposureDuration);
              enemy.freezeExposure = 0;
            }
          }
          if (proj.knockbackChance > 0 && Math.random() < proj.knockbackChance * dt) {
            const pathPoints = enemy.path && enemy.path.length > 0 ? enemy.path : (getActivePaths()[0] || []);
            if (pathPoints && enemy.pathIndex > 0) {
              const prev = pathPoints[enemy.pathIndex - 1];
              const dx = prev.x - enemy.x;
              const dy = prev.y - enemy.y;
              const distBack = Math.hypot(dx, dy) || 1;
              const step = Math.min(12, distBack);
              enemy.x += (dx / distBack) * step;
              enemy.y += (dy / distBack) * step;
            }
          }
        }
      }
      return proj.ttl > 0;
    }

    if (proj.kind === "bomb" || proj.kind === "missile" || proj.kind === "rocket") {
      if (typeof proj.ttl === "number") {
        proj.ttl -= dt;
        if (proj.ttl <= 0) return false;
      }
      const isMissile = proj.kind === "missile" || proj.kind === "rocket";
      const targetPos = proj.target && proj.target.hp > 0 ? getEnemyPosition(proj.target) : proj.targetPos;
      if (!targetPos) return false;
      if (proj.target && proj.target.hp > 0) {
        proj.targetPos = targetPos;
      }
      if (proj.kind === "rocket" && proj.accel) {
        const maxSpeed = proj.maxSpeed || proj.speed;
        proj.speed = Math.min(maxSpeed, proj.speed + proj.accel * dt);
      }
      const dx = targetPos.x - proj.x;
      const dy = targetPos.y - proj.y;
      const dist = Math.hypot(dx, dy) || 1;
      proj.vx = (dx / dist) * proj.speed;
      proj.vy = (dy / dist) * proj.speed;
      const step = proj.speed * dt;
      if (dist <= step) {
        state.explosions.push({
          x: targetPos.x,
          y: targetPos.y,
          radius: proj.splashRadius,
          ttl: 0.35,
          color: isMissile ? "rgba(251, 146, 60, 0.6)" : "rgba(251, 113, 133, 0.6)",
        });
        if (proj.sourceType === "bomb" || proj.kind === "rocket") {
          pushShockwave(targetPos.x, targetPos.y, proj.splashRadius, "rgba(248, 113, 113, 0.5)");
        }
        for (const enemy of state.enemies) {
          if (enemy.hp <= 0) continue;
          if (enemy.armored && proj.sourceType !== "bomb" && !proj.armorPierce) continue;
          const splashDist = Math.hypot(enemy.x - targetPos.x, enemy.y - targetPos.y);
          if (splashDist <= proj.splashRadius) {
            if (enemy.armored && (proj.sourceType === "bomb" || proj.armorPierce)) {
              applyArmorHit(enemy);
            }
            applyExplosionDamage(enemy, proj.damage);
            if (enemy.hp <= 0) {
              handleEnemyDeath(enemy);
            }
          }
        }
        if (proj.clusterCount && proj.clusterCount > 0) {
          const spawnClusterBombs = (cx, cy, count, damage, radius, childCount, childDamage, childRadius) => {
            const spread = proj.splashRadius * 0.85;
            for (let i = 0; i < count; i += 1) {
              const angle = (i / count) * Math.PI * 2;
              const ex = cx + Math.cos(angle) * spread;
              const ey = cy + Math.sin(angle) * spread;
              state.projectiles.push({
                kind: "bomb",
                x: cx,
                y: cy,
                targetPos: { x: ex, y: ey },
                speed: Math.max(140, proj.speed * 1.1),
                damage,
                splashRadius: radius,
                sourceType: proj.sourceType,
                clusterCount: childCount || 0,
                clusterDamage: childDamage || 0,
                clusterRadius: childRadius || 0,
                clusterChildCount: 0,
                clusterChildDamage: 0,
                clusterChildRadius: 0,
              });
            }
          };
          const clusterDamage = proj.clusterDamage || proj.damage * 0.5;
          const clusterRadius = proj.clusterRadius || proj.splashRadius * 0.6;
          const childCount = proj.clusterChildCount || 0;
          const childDamage = proj.clusterChildDamage || proj.damage * 0.35;
          const childRadius = proj.clusterChildRadius || proj.splashRadius * 0.45;
          spawnClusterBombs(targetPos.x, targetPos.y, proj.clusterCount, clusterDamage, clusterRadius, childCount, childDamage, childRadius);
        }
        return false;
      }
      proj.x += (dx / dist) * step;
      proj.y += (dy / dist) * step;
      return true;
    }

    if (!proj.target || proj.target.hp <= 0) return false;
    const targetPos = getEnemyPosition(proj.target);
    const dx = targetPos.x - proj.x;
    const dy = targetPos.y - proj.y;
    const dist = Math.hypot(dx, dy);
    proj.vx = (dx / dist) * proj.speed;
    proj.vy = (dy / dist) * proj.speed;
    const step = proj.speed * dt;
    if (dist <= step) {
      if (!(proj.target.armored && proj.sourceType !== "laser" && proj.sourceType !== "bomb" && proj.sourceType !== "op" && !proj.armorPierce)) {
        if (proj.target.armored && (proj.sourceType === "laser" || proj.sourceType === "bomb" || proj.armorPierce)) {
          applyArmorHit(proj.target);
        }
        applyDamage(proj.target, proj.damage);
        if (proj.sourceType === "watch") {
          proj.target.revealed = true;
        }
        if (!proj.target.darkMatter && proj.poisonDuration > 0 && proj.poisonDps > 0) {
          proj.target.dotTimer = Math.max(proj.target.dotTimer, proj.poisonDuration);
          proj.target.dotDps = Math.max(proj.target.dotDps, proj.poisonDps);
          if (proj.embrittlementPercent > 0) {
            proj.target.embrittleTimer = Math.max(proj.target.embrittleTimer, proj.poisonDuration);
            proj.target.embrittleMultiplier = Math.max(proj.target.embrittleMultiplier || 1, 1 + proj.embrittlementPercent);
          }
          if (proj.armorWeaken && proj.target.armored) {
            applyArmorHit(proj.target);
            proj.target.armorBreakThreshold = Math.max(1, (proj.target.armorBreakThreshold || 2) - 1);
          }
          if (proj.poisonRadius > 0) {
            for (const splash of state.enemies) {
              if (splash.hp <= 0) continue;
              if (splash.darkMatter) continue;
              const dist = Math.hypot(splash.x - proj.target.x, splash.y - proj.target.y);
              if (dist <= proj.poisonRadius) {
                splash.dotTimer = Math.max(splash.dotTimer, proj.poisonDuration * 0.8);
                splash.dotDps = Math.max(splash.dotDps, proj.poisonDps * 0.7);
              }
            }
          }
          if (proj.poisonTransfer) {
            const radius = 70;
            for (const splash of state.enemies) {
              if (splash === proj.target) continue;
              if (splash.hp <= 0) continue;
              if (splash.darkMatter) continue;
              const dist = Math.hypot(splash.x - proj.target.x, proj.target.y - splash.y);
              if (dist <= radius) {
                splash.dotTimer = Math.max(splash.dotTimer, proj.poisonDuration * 0.7);
                splash.dotDps = Math.max(splash.dotDps, proj.poisonDps * 0.6);
              }
            }
          }
        }
      }
      if (proj.slow > 0 && !proj.target.darkMatter) {
        proj.target.slowTimer = Math.max(proj.target.slowTimer, 1.5);
        proj.target.slowFactor = proj.slow;
      }
      if (proj.target.hp <= 0) {
        handleEnemyDeath(proj.target);
      }
      return false;
    }
    proj.x += (dx / dist) * step;
    proj.y += (dy / dist) * step;
    return true;
  });
}

function updateBeams(dt) {
  state.beams = state.beams.filter((beam) => {
    beam.ttl -= dt;
    return beam.ttl > 0;
  });
}

function updateFlames(dt) {
  state.flames = state.flames.filter((flame) => {
    flame.ttl -= dt;
    return flame.ttl > 0;
  });
}

function updateTraps(dt) {
  if (state.nukeSmoke) return;
  const remaining = [];
  const triggerTrapExplosion = (trap) => {
    state.explosions.push({
      x: trap.x,
      y: trap.y,
      radius: trap.splashRadius,
      ttl: 0.35,
      color: "rgba(248, 113, 113, 0.6)",
    });
    for (const splash of state.enemies) {
      if (splash.hp <= 0) continue;
      const splashDist = Math.hypot(splash.x - trap.x, splash.y - trap.y);
      if (splashDist <= trap.splashRadius) {
        applyExplosionDamage(splash, trap.damage);
        if (splash.hp <= 0) {
          handleEnemyDeath(splash);
        }
      }
    }
  };
  for (const trap of state.traps) {
    if (trap.launch) {
      trap.launch.t += dt;
      const p = Math.min(1, trap.launch.t / trap.launch.duration);
      trap.x = trap.launch.sx + (trap.launch.tx - trap.launch.sx) * p;
      trap.y = trap.launch.sy + (trap.launch.ty - trap.launch.sy) * p;
      if (p < 1) {
        remaining.push(trap);
        continue;
      }
      trap.launch = null;
      trap.ttl = trap.life;
    }
    const isSentry = trap.kind === "sentry";
    if (!isSentry) {
      trap.ttl -= dt;
      if (trap.ttl <= 0) {
        if (trap.explode) {
          triggerTrapExplosion(trap);
        }
        if (state.selectedTrap === trap) state.selectedTrap = null;
        continue;
      }
    }
    if (trap.turret) {
      trap.cooldown = Math.max(0, trap.cooldown - dt);
      if (trap.cooldown <= 0) {
        let target = null;
        let bestDist = Infinity;
        for (const enemy of state.enemies) {
          if (enemy.hp <= 0) continue;
          const dist = Math.hypot(enemy.x - trap.x, enemy.y - trap.y);
          if (dist <= trap.turretRange && dist < bestDist) {
            target = enemy;
            bestDist = dist;
          }
        }
        if (target) {
          for (let shot = 0; shot < (trap.dual ? 2 : 1); shot += 1) {
            state.projectiles.push({
              kind: "homing",
              x: trap.x,
              y: trap.y,
              target,
              speed: 320,
              damage: trap.turretDamage,
              slow: 0,
              sourceType: "trap",
              poisonDps: 0,
              poisonDuration: 0,
              embrittlementPercent: 0,
            });
          }
          trap.cooldown = trap.turretRate;
        }
      }
      remaining.push(trap);
      continue;
    }
    let triggered = false;
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      const dist = Math.hypot(enemy.x - trap.x, enemy.y - trap.y);
      if (dist <= 16) {
        if (trap.explode) {
          triggerTrapExplosion(trap);
        } else {
          applyDamage(enemy, trap.damage);
          if (trap.slow > 0 && !enemy.darkMatter) {
            enemy.slowTimer = Math.max(enemy.slowTimer, 1.5);
            enemy.slowFactor = Math.max(enemy.slowFactor || 0, trap.slow);
          }
          if (enemy.hp <= 0) {
            handleEnemyDeath(enemy);
          }
        }
        if (trap.usesLeft !== undefined) {
          trap.usesLeft -= 1;
        }
        triggered = true;
        break;
      }
    }
    if (!triggered || trap.usesLeft > 0 || trap.usesLeft === undefined) {
      remaining.push(trap);
    }
  }
  state.traps = remaining;
}

function updateTowerMovement(dt) {
  for (const tower of state.towers) {
    const data = towerTypes[tower.type];
    if (!data || !data.moveSpeed) continue;
    const level = tower.level || 1;
    const speedMultiplier = 1 + (level - 1) * 0.12;
    if (state.controlledDrone === tower) {
      const dx = state.mouse.x - tower.x;
      const dy = state.mouse.y - tower.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.5) {
        const step = data.moveSpeed * speedMultiplier * 85 * dt;
        tower.x += (dx / dist) * Math.min(step, dist);
        tower.y += (dy / dist) * Math.min(step, dist);
      }
      continue;
    }
    if (tower.forceReturn) {
      const dx = tower.baseX - tower.x;
      const dy = tower.baseY - tower.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.5) {
        const step = data.moveSpeed * speedMultiplier * 70 * dt;
        tower.x += (dx / dist) * Math.min(step, dist);
        tower.y += (dy / dist) * Math.min(step, dist);
      } else {
        tower.x = tower.baseX;
        tower.y = tower.baseY;
        tower.forceReturn = false;
      }
      continue;
    }
    if (!state.waveInProgress) {
      const dx = tower.baseX - tower.x;
      const dy = tower.baseY - tower.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.5) {
        const step = data.moveSpeed * speedMultiplier * 70 * dt;
        tower.x += (dx / dist) * Math.min(step, dist);
        tower.y += (dy / dist) * Math.min(step, dist);
      } else {
        tower.x = tower.baseX;
        tower.y = tower.baseY;
      }
      continue;
    }
    let target = null;
    let nearestDist = Infinity;
    const chaseRange = tower.isMini ? Math.hypot(canvas.width, canvas.height) * 1.2 : data.range;
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      const pos = getEnemyPosition(enemy);
      const dist = Math.hypot(pos.x - tower.x, pos.y - tower.y);
      if (dist <= chaseRange && dist < nearestDist) {
        target = pos;
        nearestDist = dist;
      }
    }
    if (target) {
      const dx = target.x - tower.x;
      const dy = target.y - tower.y;
      const dist = Math.hypot(dx, dy) || 1;
      const step = data.moveSpeed * speedMultiplier * 65 * dt;
      tower.x += (dx / dist) * Math.min(step, dist);
      tower.y += (dy / dist) * Math.min(step, dist);
    } else {
      const dx = tower.baseX - tower.x;
      const dy = tower.baseY - tower.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.5) {
        const step = data.moveSpeed * speedMultiplier * 55 * dt;
        tower.x += (dx / dist) * Math.min(step, dist);
        tower.y += (dy / dist) * Math.min(step, dist);
      }
    }
  }

  const drones = state.towers.filter((tower) => tower.type === "drone" && !tower.isMini);
  for (let i = 0; i < drones.length; i += 1) {
    for (let j = i + 1; j < drones.length; j += 1) {
      const a = drones[i];
      const b = drones[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0 && dist < 18) {
        const push = (18 - dist) * 0.5;
        const nx = dx / dist;
        const ny = dy / dist;
        a.x -= nx * push;
        a.y -= ny * push;
        b.x += nx * push;
        b.y += ny * push;
      }
    }
  }
}

function getTrapSetterStats(tower) {
  const level = tower.level || 1;
  const tier = Math.min(level, 5);
  const path = tower.upgradePath || 1;
  let trapInterval = 5;
  let trapLifetime = 30;
  let trapDamage = 9;
  let trapType = "spike";
  let trapRange = 140;
  let slow = 0;
  let explode = false;
  let splashRadius = 40;
  let turret = false;
  let turretRange = 90;
  let turretDamage = 6;
  let turretRate = 0.9;
  let dual = false;
  let spawnCount = 1;
  let sentryLimit = 0;

  if (path === 1) {
    const rateMult = Math.max(0.5, 1 - (tier >= 1 ? 0.1 : 0) - (tier >= 2 ? 0.2 : 0));
    trapInterval *= rateMult;
    if (tier >= 3) {
      trapType = "turret";
      turret = true;
      trapLifetime += 30;
      sentryLimit = 4;
    }
    if (tier >= 4) {
      turretRate *= 0.5;
      dual = true;
      trapLifetime += 40;
      sentryLimit = 6;
    }
    if (tier >= 5) {
      trapType = "sentry";
      turret = true;
      turretDamage = 8;
      turretRange = 120;
      trapRange += 20;
      spawnCount = 2;
      trapLifetime += 75;
      sentryLimit = 12;
    }
  } else {
    if (tier >= 1) trapDamage *= 1.1;
    if (tier >= 2) trapLifetime += 30;
    if (tier >= 3) {
      trapType = "sticky";
      slow = 0.35;
      trapLifetime += 55;
    }
    if (tier >= 4) {
      trapType = "mine";
      explode = true;
      trapDamage *= 1.6;
    }
    if (tier >= 5) {
      trapType = "supermine";
      explode = true;
      trapDamage *= 3.2;
      splashRadius = 90;
      trapRange += 30;
      trapLifetime += 125;
    }
  }

  return {
    trapInterval,
    trapLifetime,
    trapDamage,
    trapType,
    trapRange,
    slow,
    explode,
    splashRadius,
    turret,
    turretRange,
    turretDamage,
    turretRate,
    dual,
    spawnCount,
    sentryLimit,
  };
}

function findTrapSpawnPoint(tower, onPath, range, snap = true) {
  if (onPath) {
    const paths = getActivePaths();
    const candidates = [];
    for (const points of paths) {
      for (const node of points) {
        const dist = Math.hypot(node.x - tower.x, node.y - tower.y);
        if (dist <= range) {
          candidates.push(node);
        }
      }
    }
    if (candidates.length > 0) {
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      return snap ? snapToGrid(pick.x, pick.y) : { x: pick.x, y: pick.y };
    }
  } else {
    for (let i = 0; i < 12; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const minRadius = Math.max(30, range * 0.35);
      const maxRadius = Math.max(minRadius + 20, range);
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const x = tower.x + Math.cos(angle) * radius;
      const y = tower.y + Math.sin(angle) * radius;
      if (x < 8 || x > canvas.width - 8 || y < 8 || y > canvas.height - 8) continue;
      const point = snap ? snapToGrid(x, y) : { x, y };
      if (isOnPath(point.x, point.y)) continue;
      return point;
    }
  }
  if (onPath) {
    const paths = getActivePaths();
    let best = null;
    let bestDist = Infinity;
    for (const points of paths) {
      for (const node of points) {
        const dist = Math.hypot(node.x - tower.x, node.y - tower.y);
        if (dist <= range && dist < bestDist) {
          bestDist = dist;
          best = node;
        }
      }
    }
    if (best) {
      return snap ? snapToGrid(best.x, best.y) : { x: best.x, y: best.y };
    }
  }
  return null;
}

function spawnTrapFrom(tower, stats) {
  const onPath = !(stats.trapType === "turret" || stats.trapType === "sentry");
  const snap = onPath && !(stats.trapType === "mine" || stats.trapType === "supermine");
  let spawned = 0;
  const minTrapDistance = 20;
  const isOverlap = (point) => state.traps.some((trap) => Math.hypot(trap.x - point.x, trap.y - point.y) < minTrapDistance);
  for (let i = 0; i < stats.spawnCount; i += 1) {
    let point = null;
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const candidate = findTrapSpawnPoint(tower, onPath, stats.trapRange || 140, snap);
      if (!candidate) break;
      if (isOverlap(candidate)) continue;
      point = candidate;
      break;
    }
    if (!point) continue;
    const smallFootprint = stats.trapType === "turret" || stats.trapType === "sentry";
    if (stats.trapType === "sentry" && stats.sentryLimit > 0) {
      const sentries = state.traps.filter((trap) => trap.kind === "sentry" && trap.owner === tower);
      if (sentries.length >= stats.sentryLimit) {
        let oldest = sentries[0];
        for (const entry of sentries) {
          if ((entry.createdAt || 0) < (oldest.createdAt || 0)) oldest = entry;
        }
        const idx = state.traps.indexOf(oldest);
        if (idx >= 0) state.traps.splice(idx, 1);
      }
    }
    state.traps.push({
      kind: stats.trapType,
      owner: tower,
      x: tower.x,
      y: tower.y,
      ttl: stats.trapType === "sentry" ? Infinity : stats.trapLifetime,
      life: stats.trapType === "sentry" ? Infinity : stats.trapLifetime,
      damage: stats.trapDamage,
      hitRadius: smallFootprint ? 10 : 14,
      usesLeft: stats.trapType === "sentry" || stats.trapType === "turret" ? undefined : 12,
      slow: stats.slow,
      explode: stats.explode,
      splashRadius: stats.splashRadius,
      turret: stats.turret,
      turretRange: stats.turretRange,
      turretDamage: stats.turretDamage,
      turretRate: stats.turretRate,
      dual: stats.dual,
      cooldown: 0,
      createdAt: performance.now(),
      launch: {
        sx: tower.x,
        sy: tower.y,
        tx: point.x,
        ty: point.y,
        t: 0,
        duration: 0.25,
      },
    });
    spawned += 1;
  }
  if (spawned === 0 && onPath) {
    const paths = getActivePaths();
    let best = null;
    let bestDist = Infinity;
    for (const points of paths) {
      for (const node of points) {
        const dist = Math.hypot(node.x - tower.x, node.y - tower.y);
        if (dist < bestDist) {
          bestDist = dist;
          best = node;
        }
      }
    }
    if (best) {
      const point = snap ? snapToGrid(best.x, best.y) : { x: best.x, y: best.y };
      if (!isOverlap(point)) {
        state.traps.push({
        kind: stats.trapType,
        owner: tower,
        x: tower.x,
        y: tower.y,
        ttl: stats.trapType === "sentry" ? Infinity : stats.trapLifetime,
        life: stats.trapType === "sentry" ? Infinity : stats.trapLifetime,
        damage: stats.trapDamage,
        hitRadius: stats.trapType === "turret" || stats.trapType === "sentry" ? 10 : 14,
        usesLeft: stats.trapType === "sentry" || stats.trapType === "turret" ? undefined : 12,
        slow: stats.slow,
        explode: stats.explode,
        splashRadius: stats.splashRadius,
        turret: stats.turret,
        turretRange: stats.turretRange,
        turretDamage: stats.turretDamage,
        turretRate: stats.turretRate,
        dual: stats.dual,
        cooldown: 0,
        createdAt: performance.now(),
        launch: {
          sx: tower.x,
          sy: tower.y,
          tx: point.x,
          ty: point.y,
          t: 0,
          duration: 0.25,
        },
        });
      }
    }
  }
}

function getEnemyProgress(enemy) {
  const pathPoints = enemy.path && enemy.path.length > 0 ? enemy.path : (getActivePaths()[0] || []);
  if (!pathPoints || pathPoints.length < 2) return enemy.pathIndex || 0;
  const idx = Math.min(enemy.pathIndex || 0, pathPoints.length - 2);
  const current = pathPoints[idx];
  const next = pathPoints[idx + 1];
  const segLen = Math.hypot(next.x - current.x, next.y - current.y) || 1;
  const distToNext = Math.hypot(next.x - enemy.x, next.y - enemy.y);
  const frac = Math.max(0, Math.min(1, 1 - distToNext / segLen));
  return idx + frac;
}

function selectTarget(tower, stats) {
  const range = Number.isFinite(stats.range) ? stats.range : (stats.data && Number.isFinite(stats.data.range) ? stats.data.range : 0);
  if (!Number.isFinite(range) || range <= 0) return null;
  const candidates = [];
  const fallback = [];
  for (const enemy of state.enemies) {
    if (enemy.hp <= 0) continue;
    if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) {
      ensureEnemyPath(enemy);
      if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) continue;
    }
    if (enemy.stealth && !enemy.revealed && tower.type !== "watch" && tower.type !== "op" && !state.revealStealth && !stats.canHitStealth) continue;
    const dist = Math.hypot(enemy.x - tower.x, enemy.y - tower.y);
    if (dist <= range) {
      candidates.push({ enemy, dist });
    } else {
      fallback.push({ enemy, dist });
    }
  }
  if (candidates.length === 0) return null;
  let filtered = candidates;
  if (tower.type === "watch") {
    const hidden = candidates.filter((entry) => entry.enemy.stealth);
    if (hidden.length > 0) filtered = hidden;
  }
  if (tower.type === "bomb" || tower.type === "laser") {
    const armored = candidates.filter((entry) => entry.enemy.armored);
    if (armored.length > 0) filtered = armored;
  }
  const mode = tower.targeting || "first";
  let best = filtered[0];
  for (const entry of filtered) {
    const a = best.enemy;
    const b = entry.enemy;
    let better = false;
    if (mode === "first") {
      better = getEnemyProgress(b) > getEnemyProgress(a);
    } else if (mode === "last") {
      better = getEnemyProgress(b) < getEnemyProgress(a);
    } else if (mode === "strongest") {
      better = b.hp > a.hp;
    } else if (mode === "weakest") {
      better = b.hp < a.hp;
    }
    if (better) {
      best = entry;
    } else if (!better && entry.enemy === a) {
      continue;
    } else if (!better && entry.enemy !== a && entry.dist < best.dist) {
      best = entry;
    }
  }
  return best.enemy;
}

function updateTrapSetters(dt) {
  if (state.nukeSmoke) return;
  for (const tower of state.towers) {
    if (tower.type !== "trap") continue;
    const trapStats = getTrapSetterStats(tower);
    if (!trapStats) continue;
    const current = Number.isFinite(tower.trapCooldown) ? tower.trapCooldown : 0;
    tower.trapCooldown = Math.max(0, current - dt);
    if (tower.trapCooldown <= 0) {
      spawnTrapFrom(tower, trapStats);
      tower.trapCooldown = trapStats.trapInterval;
    }
  }
}

function hasEnemyInRange(tower, range) {
  for (const enemy of state.enemies) {
    if (enemy.hp <= 0) continue;
    if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) {
      ensureEnemyPath(enemy);
    }
    if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) continue;
    const dist = Math.hypot(enemy.x - tower.x, enemy.y - tower.y);
    if (dist <= range) {
      return true;
    }
  }
  return false;
}

function forceSpikeExtend(tower) {
  if (!tower || tower.type !== "spikeTower") return;
  if (tower.spikePhase && tower.spikePhase !== "idle") return;
  const stats = getTowerStats(tower);
  const range = (stats && stats.spikeRange) || towerTypes.spikeTower.spikeRange || 32;
  if (!hasEnemyInRange(tower, range)) return;
  const dir = getSpikeDirection(tower);
  if (!dir) return;
  tower.spikeDir = dir;
  tower.spikePhase = "extend";
  tower.spikeProgress = 0;
  tower.spikeHit = false;
  tower.spikeDrillTarget = null;
  tower.spikeDrillTimer = 0;
  tower.spikeDir = dir;
}

function updateSpikeTower(tower, dt, stats) {
  const data = stats ? stats.data : towerTypes.spikeTower;
  const maxLen = (stats && stats.spikeRange) || data.spikeRange || 32;
  const pickSpikeTarget = () => {
    let best = null;
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      if (enemy.stealth && !enemy.revealed && tower.type !== "watch" && tower.type !== "op" && !state.revealStealth && !stats?.canHitStealth) continue;
      if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) {
        ensureEnemyPath(enemy);
      }
      if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) continue;
      const dist = Math.hypot(enemy.x - tower.x, enemy.y - tower.y);
      if (dist > maxLen) continue;
      if (!best || dist < best.dist) {
        best = { enemy, dist };
      }
    }
    return best ? best.enemy : null;
  };
  let dir = getSpikeDirection(tower);
  if (dir) {
    tower.spikeDir = dir;
  }
  const spikeDamage = (stats && stats.spikeDamage) || data.damage || 0;
  const spikeCount = (stats && stats.spikeCount) || 1;
  const spikeSlow = (stats && stats.spikeSlow) || 0;
  const spikeSlowDuration = (stats && stats.spikeSlowDuration) || 1.2;
  const spikeHold = (stats && stats.spikeHold) || data.spikeHold || 0.6;
  const extendSpeed = (stats && stats.spikeExtendSpeed) || data.spikeExtendSpeed || 6;
  const retractSpeed = (stats && stats.spikeRetractSpeed) || data.spikeRetractSpeed || 1.4;
  const drillCharge = (stats && stats.spikeDrillCharge) || 0;
  const drillDps = (stats && stats.spikeDrillDps) || 0;
  const wave = Boolean(stats && stats.spikeWave);
  const waveRadius = (stats && stats.spikeWaveRadius) || 0;
  const waveSlow = (stats && stats.spikeWaveSlow) || 0;
  const phase = tower.spikePhase || "idle";
  const progress = tower.spikeProgress || 0;
  const applySpikeEffects = (enemy, dmg, slowFactor, stunDuration) => {
    if (!enemy || enemy.hp <= 0) return;
    applyDamage(enemy, dmg);
    if (stunDuration && stunDuration > 0) {
      enemy.stunTimer = Math.max(enemy.stunTimer || 0, stunDuration);
    }
    if (slowFactor > 0) {
      enemy.slowTimer = Math.max(enemy.slowTimer || 0, spikeSlowDuration);
      enemy.slowFactor = Math.max(enemy.slowFactor || 0, slowFactor);
    }
  };
  const findTargets = () => {
    const hits = [];
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) {
        ensureEnemyPath(enemy);
      }
      if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) continue;
      const dx = enemy.x - tower.x;
      const dy = enemy.y - tower.y;
      const forward = dx * dir.x + dy * dir.y;
      if (forward <= 0 || forward > maxLen) continue;
      const side = Math.abs(dir.x ? dy : dx);
      if (side > 12) continue;
      hits.push({ enemy, dist: forward });
    }
    hits.sort((a, b) => a.dist - b.dist);
    return hits;
  };
  if (phase === "idle") {
    let target = pickSpikeTarget();
    if (!target && dir) {
      const targets = findTargets();
      if (targets.length > 0) {
        target = targets[0].enemy;
      }
    }
    if (!target) {
      if (!dir) return;
      tower.spikePhase = "extend";
      tower.spikeProgress = 0;
      tower.spikeHit = false;
      tower.spikeDrillTarget = null;
      tower.spikeDrillTimer = 0;
      tower.spikeDir = dir;
      return;
    }
    const dx = target.x - tower.x;
    const dy = target.y - tower.y;
    dir = Math.abs(dx) >= Math.abs(dy) ? { x: Math.sign(dx), y: 0 } : { x: 0, y: Math.sign(dy) };
    tower.spikePhase = "extend";
    tower.spikeProgress = 0;
    tower.spikeHit = false;
    tower.spikeDrillTarget = null;
    tower.spikeDrillTimer = 0;
    tower.spikeDir = dir;
    return;
  }
  if (!dir) return;
  if (phase === "extend") {
    const next = Math.min(1, progress + dt * extendSpeed);
    tower.spikeProgress = next;
    const targets = findTargets();
    const primary = targets.length > 0 ? targets[0] : null;
    if (primary && !tower.spikeHit && next * maxLen >= primary.dist) {
      const hitTargets = targets.slice(0, Math.max(1, spikeCount));
      const hitProgress = Math.min(1, primary.dist / maxLen);
      const stunDuration = spikeHold + hitProgress / Math.max(0.01, retractSpeed);
      for (const entry of hitTargets) {
        applySpikeEffects(entry.enemy, spikeDamage, spikeSlow, stunDuration);
      }
      if (wave && waveRadius > 0) {
        const waveX = tower.x + dir.x * grid.size;
        const waveY = tower.y + dir.y * grid.size;
        for (const enemy of state.enemies) {
          if (enemy.hp <= 0) continue;
          const dist = Math.hypot(enemy.x - waveX, enemy.y - waveY);
          if (dist <= waveRadius) {
            applySpikeEffects(enemy, spikeDamage * 0.85, Math.max(spikeSlow, waveSlow), 0);
          }
        }
      }
      tower.spikeHit = true;
      tower.spikeHoldTimer = spikeHold;
      tower.spikePhase = "hold";
      tower.spikeProgress = hitProgress;
      if (drillDps > 0 && primary) {
        tower.spikeDrillTarget = primary.enemy;
        tower.spikeDrillTimer = drillCharge;
      }
      return;
    }
    if (next >= 1) {
      tower.spikePhase = "hold";
      tower.spikeHoldTimer = spikeHold;
    }
    return;
  }
  if (phase === "hold") {
    tower.spikeHoldTimer = Math.max(0, (tower.spikeHoldTimer || 0) - dt);
    if (drillDps > 0 && tower.spikeDrillTarget && tower.spikeDrillTarget.hp > 0) {
      const target = tower.spikeDrillTarget;
      const dist = Math.hypot(target.x - tower.x, target.y - tower.y);
      if (dist <= maxLen + 6) {
        if ((tower.spikeDrillTimer || 0) > 0) {
          tower.spikeDrillTimer = Math.max(0, (tower.spikeDrillTimer || 0) - dt);
        } else {
          applySpikeEffects(target, drillDps * dt, Math.max(spikeSlow, waveSlow));
        }
      }
    }
    if (tower.spikeHoldTimer <= 0) {
      tower.spikePhase = "retract";
    }
    return;
  }
  if (phase === "retract") {
    const next = Math.max(0, progress - dt * retractSpeed);
    tower.spikeProgress = next;
    if (next <= 0) {
      tower.spikePhase = "idle";
      tower.spikeHit = false;
      tower.spikeDrillTarget = null;
      tower.spikeDrillTimer = 0;
      tower.spikeDir = null;
    }
  }
}

function ensureDroneMinis(tower, stats) {
  if (!tower || tower.type !== "drone" || tower.isMini) return;
  const miniTargetCount = stats.droneMiniCount || 0;
  if (!tower.spawnedMinis) {
    tower.spawnedMinis = [];
  }
  tower.spawnedMinis = tower.spawnedMinis.filter((mini) => state.towers.includes(mini));
  while (tower.spawnedMinis.length < miniTargetCount) {
    const offset = tower.spawnedMinis.length === 0 ? { x: -18, y: -10 } : { x: 18, y: -10 };
    const ox = tower.x + offset.x;
    const oy = tower.y + offset.y;
    const mini = {
      type: "drone",
      x: ox,
      y: oy,
      baseX: ox,
      baseY: oy,
      level: Math.max(1, (tower.level || 1) - 1),
      cooldown: 0,
      paidCost: 0,
      disabled: false,
      targeting: tower.targeting || "first",
      upgradePath: tower.upgradePath || 2,
      isMini: true,
      parentDrone: tower,
    };
    state.towers.push(mini);
    tower.spawnedMinis.push(mini);
  }
  if (tower.spawnedMinis.length > miniTargetCount) {
    const extras = tower.spawnedMinis.splice(miniTargetCount);
    for (const extra of extras) {
      state.towers = state.towers.filter((entry) => entry !== extra);
    }
  }
}

function updateTowers(dt) {
  updateTowerMovement(dt);
  if (state.nukeSmoke) {
    return;
  }
  const poisonTower = state.towers.find((tower) => tower.type === "dart" && (tower.level || 1) >= 5 && tower.upgradePath === 1);
  state.globalPoisonDps = poisonTower ? 3 : 0;
  state.globalPoisonDuration = poisonTower ? 2.5 : 0;
  for (const tower of state.towers) {
    const stats = getTowerStats(tower);
    if (!stats) continue;
    const data = stats.data;
    if (tower.disabled) continue;
    if (data.isMine || data.isFloorSpike || data.blocksPath) continue;
    if (tower.type === "spikeTower") {
      updateSpikeTower(tower, dt, stats);
      continue;
    }
    if (tower.type === "drone" && stats.droneBombRate > 0) {
      tower.bombCooldown = Math.max(0, (tower.bombCooldown || 0) - dt);
    }
    tower.cooldown = Math.max(0, tower.cooldown - dt);
    const range = stats.range;
    let target = selectTarget(tower, stats);
    if (!target) {
      target = getClosestEnemyTarget(tower.x, tower.y);
    }
    if (target) {
      tower.aimAngle = Math.atan2(target.y - tower.y, target.x - tower.x);
    }
    if (tower.type === "drone") {
      ensureDroneMinis(tower, stats);
    }
    if (tower.type === "laser" && stats.laserContinuous) {
      if (tower.laserOverheatTimer > 0) {
        tower.laserOverheatTimer = Math.max(0, tower.laserOverheatTimer - dt);
        if (tower.laserOverheatTimer <= 0) {
          tower.laserEnergy = stats.laserEnergyMax;
        }
        continue;
      }
      if (!Number.isFinite(tower.laserEnergy)) {
        tower.laserEnergy = stats.laserEnergyMax;
      }
      if (target && tower.laserEnergy > 0) {
        fireLaser(tower, target, stats, range);
        tower.laserEnergy -= stats.laserEnergyDrain * dt;
        if (tower.laserEnergy <= 0) {
          tower.laserEnergy = 0;
          tower.laserOverheatTimer = stats.laserRechargeTime;
        }
      }
      continue;
    }
    if (tower.type === "laser" && stats.laserChargeTime > 0) {
      if (!target) {
        tower.laserChargeTimer = 0;
        continue;
      }
      if (tower.cooldown > 0) continue;
      if (tower.laserChargeTimer > 0) {
        tower.laserChargeTimer -= dt;
        if (tower.laserChargeTimer <= 0) {
          fireLaser(tower, target, stats, range);
          tower.cooldown = stats.rate;
        }
      } else {
        tower.laserChargeTimer = stats.laserChargeTime;
      }
      continue;
    }
    if (tower.cooldown > 0 && tower.type !== "freeze") continue;
    if (target) {
      if (tower.type === "drone" && stats.droneBombRate > 0 && (tower.bombCooldown || 0) <= 0) {
        const dropX = target.x;
        const dropY = target.y;
        state.explosions.push({
          x: dropX,
          y: dropY,
          radius: stats.droneBombRadius,
          ttl: 0.35,
          color: "rgba(251, 146, 60, 0.6)",
        });
        for (const enemy of state.enemies) {
          if (enemy.hp <= 0) continue;
          const dist = Math.hypot(enemy.x - dropX, enemy.y - dropY);
          if (dist <= stats.droneBombRadius) {
            if (enemy.armored) {
              applyArmorHit(enemy);
            }
            applyExplosionDamage(enemy, stats.droneBombDamage);
            if (enemy.hp <= 0) {
              handleEnemyDeath(enemy);
            }
          }
        }
        tower.bombCooldown = stats.droneBombRate;
      }
      if (tower.type === "freeze") {
        emitFreezeGas(tower, target, stats);
      } else if (tower.type === "flame") {
        fireFlameCone(tower, target, stats);
      } else if (data.laser) {
        fireLaser(tower, target, stats, range);
      } else {
        fireProjectile(tower, target, stats);
      }
      tower.cooldown = stats.rate;
    } else if (tower.type === "freeze") {
      const lingering = state.projectiles.find((entry) => entry.kind === "gas" && entry.owner === tower);
      if (lingering) {
        lingering.ttl = Math.min(lingering.ttl, 1.2);
        lingering.maxTtl = Math.max(lingering.maxTtl || 0, lingering.ttl);
      }
    }
  }
}

function updateFloorSpikes(dt) {
  const data = towerTypes.floorSpike;
  if (!data) return;
  const damage = data.damage || 0;
  const triggerRadius = data.triggerRadius || 18;
  const extendSpeed = data.spikeExtendSpeed || 9;
  const retractSpeed = data.spikeRetractSpeed || 7;
  const holdTime = data.spikeHold || 0.25;
  for (const spike of state.towers) {
    if (spike.type !== "floorSpike") continue;
    const phase = spike.spikePhase || "idle";
    const progress = spike.spikeProgress || 0;
    const findTarget = () => {
      let best = null;
      let bestDist = Infinity;
      for (const enemy of state.enemies) {
        if (enemy.hp <= 0) continue;
        const dist = Math.hypot(enemy.x - spike.x, enemy.y - spike.y);
        if (dist <= triggerRadius && dist < bestDist) {
          bestDist = dist;
          best = enemy;
        }
      }
      return best;
    };
    if (phase === "idle") {
      const target = findTarget();
      if (target) {
        spike.spikePhase = "extend";
        spike.spikeProgress = 0;
        spike.spikeHit = false;
      }
      continue;
    }
    if (phase === "extend") {
      const next = Math.min(1, progress + dt * extendSpeed);
      spike.spikeProgress = next;
      const target = findTarget();
      if (target && !spike.spikeHit && next >= 0.65) {
        applyDamage(target, damage);
        spike.spikeHit = true;
        spike.spikeHoldTimer = holdTime;
        spike.spikePhase = "hold";
        continue;
      }
      if (next >= 1) {
        spike.spikePhase = "hold";
        spike.spikeHoldTimer = holdTime;
      }
      continue;
    }
    if (phase === "hold") {
      spike.spikeHoldTimer = Math.max(0, (spike.spikeHoldTimer || 0) - dt);
      if (spike.spikeHoldTimer <= 0) {
        spike.spikePhase = "retract";
      }
      continue;
    }
    if (phase === "retract") {
      const next = Math.max(0, progress - dt * retractSpeed);
      spike.spikeProgress = next;
      if (next <= 0) {
        spike.spikePhase = "idle";
        spike.spikeHit = false;
      }
    }
  }
}

function isBlockedBySpike(enemy) {
  const radius = getEnemyRadius(enemy);
  for (const tower of state.towers) {
    if (tower.type !== "spikeTower") continue;
    const progress = tower.spikeProgress || 0;
    if (progress <= 0) continue;
    const dir = tower.spikeDir || getSpikeDirection(tower);
    if (!dir) continue;
    const stats = getTowerStats(tower);
    const range = (stats && stats.spikeRange) || (stats && stats.data && stats.data.spikeRange) || towerTypes.spikeTower.spikeRange || 32;
    const len = range * Math.min(1, Math.max(0, progress));
    const dx = enemy.x - tower.x;
    const dy = enemy.y - tower.y;
    const forward = dx * dir.x + dy * dir.y;
    if (forward <= 0 || forward > len + radius) continue;
    const side = Math.abs(dir.x ? dy : dx);
    if (side <= 12 + radius * 0.5) {
      return true;
    }
  }
  return false;
}

function updateEnemies(dt) {
  for (const enemy of state.enemies) {
    if (enemy.hp <= 0) {
      handleEnemyDeath(enemy);
    }
  }
  state.enemies = state.enemies.filter((enemy) => enemy.hp > 0 || !enemy.deadProcessed);
  for (const enemy of state.enemies) {
    ensureEnemyPath(enemy);
    if (enemy.slowTimer > 0) {
      enemy.slowTimer -= dt;
    }
    if (enemy.freezePulseCooldown > 0) {
      enemy.freezePulseCooldown -= dt;
    }
    if (enemy.freezeExposure > 0) {
      enemy.freezeExposure = Math.max(0, enemy.freezeExposure - dt * 0.5);
    }
    if (enemy.revealTimer > 0) {
      enemy.revealTimer -= dt;
      if (enemy.revealTimer <= 0 && enemy.stealth) {
        enemy.revealed = false;
      }
    }
    if (enemy.embrittleTimer > 0) {
      enemy.embrittleTimer -= dt;
      if (enemy.embrittleTimer <= 0) {
        enemy.embrittleMultiplier = 1;
      }
    }
    if (enemy.dotTimer > 0) {
      const tick = Math.min(enemy.dotTimer, dt);
      enemy.dotTimer -= dt;
      if (!state.nukeSmoke) {
        applyDamage(enemy, enemy.dotDps * tick);
        if (enemy.hp <= 0) {
          handleEnemyDeath(enemy);
          continue;
        }
      }
    }
    if (enemy.burnTimer > 0) {
      if (enemy.immuneHeat) {
        enemy.burnTimer = 0;
        enemy.burnDps = 0;
      } else {
      const tick = Math.min(enemy.burnTimer, dt);
      enemy.burnTimer -= dt;
      if (!state.nukeSmoke) {
        applyDamage(enemy, enemy.burnDps * tick);
        if (enemy.hp <= 0) {
          handleEnemyDeath(enemy);
          continue;
        }
      }
      }
    }
    if (enemy.stunTimer > 0) {
      enemy.stunTimer -= dt;
      if (enemy.stunTimer > 0) {
        continue;
      }
    }
    if (isBlockedBySpike(enemy)) {
      enemy.stunTimer = Math.max(enemy.stunTimer || 0, 0.05);
      continue;
    }
    const slowFactor = enemy.slowTimer > 0 ? enemy.slowFactor || 0 : 0;
    const speed = enemy.speed * (1 - slowFactor);
    const pathPoints = enemy.path && enemy.path.length > 0 ? enemy.path : (getActivePaths()[0] || []);
    if (!pathPoints || pathPoints.length < 2) continue;
    const nextIndex = Math.min(enemy.pathIndex + 1, pathPoints.length - 1);
    const target = pathPoints[nextIndex];
    const offset = enemy.pathOffset || { x: 0, y: 0 };
    const targetX = target.x + offset.x;
    const targetY = target.y + offset.y;
    const dx = targetX - enemy.x;
    const dy = targetY - enemy.y;
    const dist = Math.hypot(dx, dy);
    const step = speed * dt;
    if (dist <= step) {
      enemy.x = targetX;
      enemy.y = targetY;
      enemy.pathIndex = nextIndex;
      if (enemy.pathIndex >= pathPoints.length - 1) {
        const hit = enemy.castleDamage || 1;
        state.lives = Math.max(0, state.lives - hit);
        enemy.escaped = true;
        enemy.hp = 0;
      }
    } else {
      const vx = (dx / dist) * step;
      const vy = (dy / dist) * step;
      enemy.x += vx;
      enemy.y += vy;
      enemy.facing = Math.atan2(vy, vx);
    }
  }
}

function updateMines() {
  if (state.nukeSmoke) return;
  const remaining = [];
  for (const tower of state.towers) {
    const data = towerTypes[tower.type];
    if (!data || !data.isMine) {
      remaining.push(tower);
      continue;
    }
    let triggered = false;
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      if (enemy.stealth && !enemy.revealed) continue;
      const dist = Math.hypot(enemy.x - tower.x, enemy.y - tower.y);
      if (dist <= data.triggerRadius) {
        state.explosions.push({
          x: tower.x,
          y: tower.y,
          radius: data.splashRadius,
          ttl: 0.35,
          color: "rgba(163, 230, 53, 0.6)",
        });
        for (const target of state.enemies) {
          if (target.hp <= 0) continue;
          const splashDist = Math.hypot(target.x - tower.x, target.y - tower.y);
          if (splashDist <= data.splashRadius) {
            applyExplosionDamage(target, data.damage);
            if (target.hp <= 0) {
              handleEnemyDeath(target);
            }
          }
        }
        triggered = true;
        break;
      }
    }
    if (!triggered) {
      remaining.push(tower);
    }
  }
  state.towers = remaining;
}

function updateExplosions(dt) {
  state.explosions = state.explosions.filter((explosion) => {
    explosion.ttl -= dt;
    return explosion.ttl > 0;
  });
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function lerpColor(from, to, t) {
  const p = clamp01(t);
  return {
    r: Math.round(lerp(from.r, to.r, p)),
    g: Math.round(lerp(from.g, to.g, p)),
    b: Math.round(lerp(from.b, to.b, p)),
  };
}

function pushNukeParticle(particle) {
  state.nukeParticles.push(particle);
}

function spawnNukeSmokeCloud(x, y, count) {
  const mapRadius = Math.hypot(canvas.width, canvas.height) * 0.9;
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 120;
    const speed = 160 + Math.random() * 220;
    const size = 32 + Math.random() * 120;
    const ttl = 6 + Math.random() * 2.5;
    const drift = Math.random() * mapRadius * 0.2;
    pushNukeParticle({
      kind: "smoke",
      x: x + Math.cos(angle) * radius,
      y: y + Math.sin(angle) * radius,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * drift,
      vy: Math.sin(angle) * speed - 40 - Math.random() * 60,
      ttl,
      age: 0,
      size,
      drag: 1.8 + Math.random() * 1.4,
      start: { r: 226, g: 232, b: 240 },
      end: { r: 30, g: 41, b: 59 },
    });
  }
}

function spawnNukeEmbers(x, y, count) {
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 60 + Math.random() * 120;
    pushNukeParticle({
      kind: "ember",
      x: x + (Math.random() - 0.5) * 12,
      y: y + (Math.random() - 0.5) * 12,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 30,
      ttl: 0.8 + Math.random() * 0.6,
      age: 0,
      size: 2 + Math.random() * 3.5,
      drag: 3.4,
      start: { r: 255, g: 140, b: 64 },
      end: { r: 28, g: 28, b: 30 },
    });
  }
}

function updateNukeParticles(dt) {
  state.nukeParticles = state.nukeParticles.filter((particle) => {
    particle.age += dt;
    if (particle.age >= particle.ttl) return false;
    const drag = Math.exp(-(particle.drag || 0) * dt);
    particle.vx *= drag;
    particle.vy *= drag;
    particle.vy += (particle.kind === "ember" || particle.kind === "shatter") ? 60 * dt : 18 * dt;
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    return true;
  });
}

function updateNukeSmoke(dt) {
  if (!state.nukeSmoke) return;
  const smoke = state.nukeSmoke;
  if (smoke.expanding) {
    smoke.radius = Math.min(smoke.maxRadius, smoke.radius + smoke.expandRate * dt);
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      if (enemy.nukeImmune) continue;
      const dist = Math.hypot(enemy.x - smoke.x, enemy.y - smoke.y);
      if (dist <= smoke.radius) {
        enemy.hp = 0;
      }
    }
    if (smoke.radius >= smoke.maxRadius) {
      smoke.expanding = false;
      smoke.fadeTimer = smoke.fadeDuration;
    }
  } else if (smoke.fadeTimer > 0) {
    smoke.fadeTimer = Math.max(0, smoke.fadeTimer - dt);
    if (smoke.fadeTimer <= 0) {
      state.nukeSmoke = null;
    }
  }
}

function triggerScreenShake(power, duration) {
  return;
}

function getScreenShakeOffset() {
  if (state.screenShakeTime <= 0) return { x: 0, y: 0 };
  const t = state.screenShakeDuration > 0 ? state.screenShakeTime / state.screenShakeDuration : 0;
  const strength = state.screenShakePower * t;
  return {
    x: (Math.random() * 2 - 1) * strength,
    y: (Math.random() * 2 - 1) * strength,
  };
}

function quadraticBezier(p0, p1, p2, t) {
  const inv = 1 - t;
  return {
    x: inv * inv * p0.x + 2 * inv * t * p1.x + t * t * p2.x,
    y: inv * inv * p0.y + 2 * inv * t * p1.y + t * t * p2.y,
  };
}

function quadraticBezierTangent(p0, p1, p2, t) {
  return {
    x: 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x),
    y: 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y),
  };
}

function applyNukeDamage(x, y, radius) {
  const radiusSq = radius * radius;
  for (const enemy of state.enemies) {
    if (enemy.nukeImmune) continue;
    const dx = enemy.x - x;
    const dy = enemy.y - y;
    if (dx * dx + dy * dy <= radiusSq) {
      enemy.hp -= 9999;
    }
  }
}

function applyDamage(enemy, amount) {
  const multiplier = enemy.embrittleTimer > 0 ? (enemy.embrittleMultiplier || 1) : 1;
  if (enemy.hp <= 0) return;
  const scaled = amount * multiplier;
  const applied = Math.max(0, Math.min(enemy.hp, scaled));
  state.totalDamage += applied;
  enemy.hp -= scaled;
  if (enemy.hp <= 0) {
    handleEnemyDeath(enemy);
  }
}

function applyExplosionDamage(enemy, amount) {
  if (enemy.immuneExplosion) return;
  const scaled = enemy.explosionVulnerable ? amount * 2 : amount;
  applyDamage(enemy, scaled);
}

function pushShockwave(x, y, radius, color = "rgba(248, 113, 113, 0.45)") {
  state.explosions.push({
    x,
    y,
    radius: radius * 1.15,
    ttl: 0.45,
    color,
    shockwave: true,
  });
}

function spawnSplitEnemy(parent, tier, overrides = {}) {
  const childTierFactor = tier === 3 ? 4 : tier === 2 ? 2 : 1;
  const maxHp = Math.max(1, parent.maxHp * 0.6);
  const child = {
    x: parent.x + (Math.random() - 0.5) * 10,
    y: parent.y + (Math.random() - 0.5) * 10,
    hp: maxHp,
    maxHp,
    speed: parent.speed * 1.05,
    path: parent.path,
    pathIndex: parent.pathIndex,
    slowTimer: 0,
    type: overrides.type || parent.type,
    armored: coalesce(overrides.armored, coalesce(parent.armored, false)),
    darkMatter: coalesce(overrides.darkMatter, coalesce(parent.darkMatter, false)),
    dotTimer: 0,
    dotDps: 0,
    burnTimer: 0,
    burnDps: 0,
    embrittleTimer: 0,
    embrittleMultiplier: 1,
    tier,
    tierFactor: coalesce(overrides.tierFactor, childTierFactor),
    isBoss: coalesce(overrides.isBoss, false),
    facing: parent.facing || 0,
    stealth: coalesce(overrides.stealth, parent.stealth),
    revealed: coalesce(overrides.revealed, parent.revealed),
    radioactive: coalesce(overrides.radioactive, parent.radioactive),
    revealTimer: 0,
    nukeImmune: coalesce(overrides.nukeImmune, parent.nukeImmune),
    immuneHeat: coalesce(overrides.immuneHeat, parent.immuneHeat),
    immuneExplosion: coalesce(overrides.immuneExplosion, parent.immuneExplosion),
    explosionVulnerable: coalesce(overrides.explosionVulnerable, parent.explosionVulnerable),
    pathOffset: coalesce(overrides.pathOffset, parent.pathOffset),
    castleDamage: coalesce(overrides.castleDamage, parent.castleDamage),
  };
  if (child.armored) {
    child.armorHits = 0;
    child.armorBreakThreshold = 2 + Math.floor(Math.random() * 2);
  }
  state.enemies.push(child);
}

function handleEnemyDeath(enemy) {
  if (enemy.deadProcessed) return;
  enemy.deadProcessed = true;
  if (enemy.escaped) return;
  if (enemy.type === "diamond" || enemy.type === "boss_diamond") {
    const dropType = Math.random() < 0.5 ? "heavy" : "speedy";
    const childTier = Math.max(1, enemy.tier - 1);
    spawnSplitEnemy(enemy, childTier, {
      type: dropType,
      armored: false,
      darkMatter: false,
      stealth: false,
      revealed: true,
      immuneHeat: false,
      immuneExplosion: false,
      explosionVulnerable: dropType === "speedy" ? true : false,
    });
  } else if (enemy.tier > 1 && !enemy.isBoss) {
    const nextTier = enemy.tier - 1;
    spawnSplitEnemy(enemy, nextTier);
    spawnSplitEnemy(enemy, nextTier);
  }
  awardGold(8);
}

function spawnArmorShatter(x, y, count = 12) {
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 120 + Math.random() * 220;
    state.nukeParticles.push({
      kind: "shatter",
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 40,
      ttl: 0.7 + Math.random() * 0.4,
      age: 0,
      size: 1.5 + Math.random() * 2.5,
      drag: 4.2,
      start: { r: 226, g: 232, b: 240 },
      end: { r: 51, g: 65, b: 85 },
    });
  }
}

function applyArmorHit(enemy) {
  if (!enemy.armored) return;
  enemy.armorHits = (enemy.armorHits || 0) + 1;
  if (enemy.armorHits >= (enemy.armorBreakThreshold || 2)) {
    enemy.armored = false;
    spawnArmorShatter(enemy.x, enemy.y, 14);
  }
}

function getAvailableNukeTowers() {
  return state.towers.filter((tower) => tower.type === "bomb" && (tower.level || 1) >= 5 && !tower.bombNukeGranted);
}

function getClosestMaxBombTowerToCenter() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  let best = null;
  let bestDist = Infinity;
  for (const tower of state.towers) {
    if (tower.type !== "bomb") continue;
    if ((tower.level || 1) < 5) continue;
    const dx = tower.x - centerX;
    const dy = tower.y - centerY;
    const dist = dx * dx + dy * dy;
    if (dist < bestDist) {
      bestDist = dist;
      best = tower;
    }
  }
  return best;
}

function getClosestEnemyTarget(fromX, fromY) {
  let best = null;
  let bestDist = Infinity;
  for (const enemy of state.enemies) {
    if (enemy.hp <= 0) continue;
    if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) {
      ensureEnemyPath(enemy);
      if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) continue;
    }
    const dx = enemy.x - fromX;
    const dy = enemy.y - fromY;
    const dist = dx * dx + dy * dy;
    if (dist < bestDist) {
      bestDist = dist;
      best = enemy;
    }
  }
  return best;
}

function predictEnemyPosition(enemy, travelTime) {
  if (!enemy) return null;
  ensureEnemyPath(enemy);
  if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) return null;
  const pathPoints = enemy.path && enemy.path.length > 0 ? enemy.path : (getActivePaths()[0] || []);
  if (!pathPoints || pathPoints.length < 2) return { x: enemy.x, y: enemy.y };
  const slowFactor = enemy.slowTimer > 0 ? enemy.slowFactor || 0 : 0;
  const speed = enemy.speed * (1 - slowFactor);
  if (!Number.isFinite(speed) || speed <= 0) return { x: enemy.x, y: enemy.y };
  let remaining = speed * travelTime;
  let idx = Math.max(0, enemy.pathIndex || 0);
  let cx = enemy.x;
  let cy = enemy.y;
  while (remaining > 0 && idx < pathPoints.length - 1) {
    const next = pathPoints[idx + 1];
    const dx = next.x - cx;
    const dy = next.y - cy;
    const dist = Math.hypot(dx, dy);
    if (dist <= 0.001) {
      idx += 1;
      cx = next.x;
      cy = next.y;
      continue;
    }
    if (remaining >= dist) {
      remaining -= dist;
      idx += 1;
      cx = next.x;
      cy = next.y;
      continue;
    }
    const t = remaining / dist;
    cx += dx * t;
    cy += dy * t;
    remaining = 0;
    break;
  }
  return { x: cx, y: cy };
}

function launchNukeFrom(x, y) {
  const closest = getClosestEnemyTarget(x, y);
  const flightDuration = 3.4;
  const predicted = closest ? predictEnemyPosition(closest, flightDuration) : null;
  const target = predicted || (closest ? { x: closest.x, y: closest.y } : { x: canvas.width / 2, y: canvas.height / 2 });
  const start = { x, y };
  const apexHeight = Math.min(start.y, target.y) - 260;
  const control = {
    x: (start.x + target.x) / 2,
    y: Math.max(60, apexHeight),
  };
  state.nukeLaunches.push({
    start,
    control,
    end: target,
    age: 0,
    duration: flightDuration,
    detonated: false,
  });
}

function penalizeRandomTowers() {
  const candidates = state.towers.filter((tower) => {
    if (tower.type === "wall" || tower.type === "mine") return false;
    return (tower.level || 1) > 3;
  });
  if (candidates.length === 0) return;
  for (let i = candidates.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  const picks = candidates.slice(0, 5);
  for (const tower of picks) {
    tower.level = Math.max(1, (tower.level || 1) - 3);
  }
}

function updateNukeLaunches(dt) {
  const remaining = [];
  for (const launch of state.nukeLaunches) {
    launch.age += dt;
    const progress = Math.min(1, launch.age / launch.duration);
    const pos = quadraticBezier(launch.start, launch.control, launch.end, progress);
    const tangent = quadraticBezierTangent(launch.start, launch.control, launch.end, progress);
    const angle = Math.atan2(tangent.y, tangent.x);
    launch.x = pos.x;
    launch.y = pos.y;
    launch.rotation = angle + Math.PI / 2;
    launch.scale = 0.7 + Math.sin(progress * Math.PI) * 0.5;
    const tailOffset = 30 * (launch.scale || 1);
    const tailX = launch.x - Math.cos(angle) * tailOffset;
    const tailY = launch.y - Math.sin(angle) * tailOffset;
    const embers = Math.max(2, Math.round(12 * dt));
    spawnNukeEmbers(tailX, tailY, embers);
    if (launch.age >= launch.duration && !launch.detonated) {
      launch.detonated = true;
      const impactX = launch.end.x;
      const impactY = launch.end.y;
      state.projectiles = [];
      state.beams = [];
      for (const enemy of state.enemies) {
        enemy.revealed = false;
      }
      state.explosions = [];
      state.nukeParticles = [];
      spawnNukeSmokeCloud(impactX, impactY, 520);
      const maxRadius = Math.hypot(canvas.width, canvas.height) * 0.75;
      state.nukeSmoke = {
        x: impactX,
        y: impactY,
        radius: 0,
        maxRadius,
        expandRate: maxRadius / 0.9,
        fadeDuration: 5,
        fadeTimer: 5,
        expanding: true,
      };
      triggerScreenShake(18, 0.7);
      state.radioactiveWave = state.wave + 1;
      state.encyclopedia.add("radioactive");
      updateEncyclopedia();
      penalizeRandomTowers();
    }
    if (launch.age < launch.duration) {
      remaining.push(launch);
    }
  }
  state.nukeLaunches = remaining;
}

function updateSpawner(dt) {
  if (!state.waveInProgress) return;
  state.spawnTimer -= dt * state.waveSpeed;
  if (state.spawnTimer <= 0 && state.enemiesToSpawn > 0) {
    spawnEnemy();
    updateEnemyPaths();
    state.enemiesToSpawn -= 1;
    state.spawnTimer = 1.1 / state.waveSpeed;
  }
  if (state.enemiesToSpawn === 0 && state.enemies.length === 0) {
    state.waveInProgress = false;
    if (state.radioactiveWave === state.wave) {
      state.radioactiveWave = null;
    }
  }
}

function drawPath() {
  const paths = getActivePaths();
  const lossRatio = state.maxLives > 0 ? Math.min(1, Math.max(0, 1 - state.lives / state.maxLives)) : 0;
  function lerp(a, b, t) {
    return Math.round(a + (b - a) * t);
  }
  function lerpColor(from, to, t) {
    return `rgb(${lerp(from[0], to[0], t)}, ${lerp(from[1], to[1], t)}, ${lerp(from[2], to[2], t)})`;
  }
  const outerColor = lerpColor([8, 16, 32], [40, 8, 56], lossRatio);
  const midColor = lerpColor([9, 20, 36], [54, 9, 80], lossRatio);
  const innerColor = lerpColor([24, 74, 110], [120, 40, 150], lossRatio);
  const junctions = new Map();
  const junctionDirs = new Map();
  const addDir = (point, dir) => {
    const key = `${Math.round(point.x)}:${Math.round(point.y)}`;
    if (!junctionDirs.has(key)) {
      junctionDirs.set(key, { x: point.x, y: point.y, dirs: new Set() });
    }
    junctionDirs.get(key).dirs.add(dir);
  };
  for (const points of paths) {
    if (!points || points.length === 0) continue;
    for (const point of points) {
      const key = `${Math.round(point.x)}:${Math.round(point.y)}`;
      const entry = junctions.get(key) || { x: point.x, y: point.y, count: 0 };
      entry.count += 1;
      junctions.set(key, entry);
    }
  }
  for (const points of paths) {
    if (!points || points.length < 2) continue;
    for (let i = 0; i < points.length - 1; i += 1) {
      const a = points[i];
      const b = points[i + 1];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dir = Math.abs(dx) >= Math.abs(dy)
        ? (dx > 0 ? "E" : "W")
        : (dy > 0 ? "S" : "N");
      const opposite = dir === "E" ? "W" : dir === "W" ? "E" : dir === "S" ? "N" : "S";
      addDir(a, dir);
      addDir(b, opposite);
    }
  }
  for (const points of paths) {
    if (!points || points.length < 2) continue;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = outerColor;
    ctx.lineWidth = 40;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i += 1) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    ctx.strokeStyle = midColor;
    ctx.lineWidth = 24;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i += 1) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    ctx.strokeStyle = innerColor;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i += 1) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    ctx.restore();
  }
  for (const entry of junctions.values()) {
    if (entry.count < 2) continue;
    const dirEntry = junctionDirs.get(`${Math.round(entry.x)}:${Math.round(entry.y)}`);
    if (!dirEntry || dirEntry.dirs.size < 2) continue;
    const connector = 20;
    const drawConnector = (width, color) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = "butt";
      for (const dir of dirEntry.dirs) {
        const dx = dir === "E" ? 1 : dir === "W" ? -1 : 0;
        const dy = dir === "S" ? 1 : dir === "N" ? -1 : 0;
        ctx.beginPath();
        ctx.moveTo(entry.x, entry.y);
        ctx.lineTo(entry.x + dx * connector, entry.y + dy * connector);
        ctx.stroke();
      }
      ctx.restore();
    };
    drawConnector(40, outerColor);
    drawConnector(24, midColor);
    drawConnector(8, innerColor);
  }
}

function drawPortalAt(origin, t) {
  const pulse = 0.5 + Math.sin(t * 0.004) * 0.5;
  const outer = 26 + pulse * 6;
  ctx.save();
  const glow = ctx.createRadialGradient(origin.x, origin.y, 4, origin.x, origin.y, outer + 16);
  glow.addColorStop(0, "rgba(217, 70, 239, 0.95)");
  glow.addColorStop(0.5, "rgba(147, 51, 234, 0.6)");
  glow.addColorStop(1, "rgba(147, 51, 234, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(origin.x, origin.y, outer + 16, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(217, 70, 239, 0.75)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(origin.x, origin.y, outer, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(168, 85, 247, 0.7)";
  ctx.lineWidth = 3;
  ctx.setLineDash([4, 6]);
  ctx.beginPath();
  ctx.arc(origin.x, origin.y, outer - 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(10, 7, 20, 0.9)";
  ctx.beginPath();
  ctx.arc(origin.x, origin.y, outer - 12, 0, Math.PI * 2);
  ctx.fill();

  const arcs = 5;
  for (let i = 0; i < arcs; i += 1) {
    const start = (t * 0.002 + i * 1.4) % (Math.PI * 2);
    const end = start + 0.6 + Math.sin(t * 0.003 + i) * 0.2;
    ctx.strokeStyle = "rgba(192, 132, 252, 0.6)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, outer - 2 - i, start, end);
    ctx.stroke();
  }

  for (let i = 0; i < 6; i += 1) {
    const angle = t * 0.004 + i * 1.1;
    const r = outer - 10 + Math.sin(t * 0.005 + i) * 4;
    const x = origin.x + Math.cos(angle) * r;
    const y = origin.y + Math.sin(angle) * r;
    ctx.fillStyle = "rgba(233, 213, 255, 0.7)";
    ctx.beginPath();
    ctx.arc(x, y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawPortal() {
  const paths = getActivePaths();
  const t = state.portalClock;
  for (const points of paths) {
    if (!points || points.length === 0) continue;
    drawPortalAt(points[0], t);
  }
}

function getCastlePoint() {
  if (state.mapEndPoint) return state.mapEndPoint;
  const paths = getActivePaths();
  const points = paths[0] || [];
  return points[points.length - 1];
}

function drawCastle() {
  const target = getCastlePoint();
  ctx.save();
  ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
  ctx.fillRect(target.x - 30, target.y - 22, 60, 40);
  ctx.strokeStyle = "rgba(226, 232, 240, 0.6)";
  ctx.lineWidth = 2;
  ctx.strokeRect(target.x - 30, target.y - 22, 60, 40);
  ctx.fillStyle = "rgba(251, 191, 36, 0.9)";
  ctx.fillRect(target.x - 24, target.y - 34, 12, 12);
  ctx.fillRect(target.x + 12, target.y - 34, 12, 12);
  ctx.fillRect(target.x - 6, target.y - 40, 12, 18);
  ctx.strokeStyle = "rgba(250, 204, 21, 0.6)";
  ctx.lineWidth = 2;
  ctx.strokeRect(target.x - 24, target.y - 34, 12, 12);
  ctx.strokeRect(target.x + 12, target.y - 34, 12, 12);
  ctx.strokeRect(target.x - 6, target.y - 40, 12, 18);
  ctx.fillStyle = "rgba(226, 232, 240, 0.7)";
  ctx.beginPath();
  ctx.moveTo(target.x - 30, target.y - 22);
  ctx.lineTo(target.x - 18, target.y - 32);
  ctx.lineTo(target.x - 6, target.y - 22);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(target.x + 6, target.y - 22);
  ctx.lineTo(target.x + 18, target.y - 32);
  ctx.lineTo(target.x + 30, target.y - 22);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawGrid() {
  ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += grid.size) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += grid.size) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function shadeColor(hex, factor) {
  const value = hex.replace("#", "");
  const num = Number.parseInt(value.length === 3 ? value.split("").map((c) => c + c).join("") : value, 16);
  const r = Math.max(0, Math.min(255, Math.round(((num >> 16) & 255) * factor)));
  const g = Math.max(0, Math.min(255, Math.round(((num >> 8) & 255) * factor)));
  const b = Math.max(0, Math.min(255, Math.round((num & 255) * factor)));
  return `rgb(${r}, ${g}, ${b})`;
}

function drawPolygonLocal(sides, radius, angleOffset = -Math.PI / 2) {
  ctx.beginPath();
  for (let i = 0; i < sides; i += 1) {
    const angle = angleOffset + (i * Math.PI * 2) / sides;
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.closePath();
}

function drawUpgradeDetails(tower, color) {
  const level = Math.min(tower.level || 1, 5);
  if (level <= 1) return;
  const path = tower.upgradePath || 1;
  ctx.save();
  ctx.translate(tower.x, tower.y);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;

  if (tower.type === "bomb") {
    if (path === 1 && level >= 3) {
      const podCount = level >= 5 ? 6 : level >= 4 ? 4 : 2;
      const offsets = [];
      const spacing = 4;
      for (let i = 0; i < podCount; i += 1) {
        offsets.push((i - (podCount - 1) / 2) * spacing);
      }
      ctx.save();
      ctx.rotate(coalesce(tower.aimAngle, tower.facing, 0));
      for (const offset of offsets) {
        ctx.beginPath();
        ctx.arc(12, offset, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    } else if (path === 2) {
      const dots = Math.min(6, level + 1);
      for (let i = 0; i < dots; i += 1) {
        const angle = (i / dots) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(Math.cos(angle) * 12, Math.sin(angle) * 12, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
    return;
  }

  if (tower.type === "watch") {
    const ticks = level - 1;
    for (let i = 0; i < ticks; i += 1) {
      const angle = (i / ticks) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * 10, Math.sin(angle) * 10);
      ctx.lineTo(Math.cos(angle) * 14, Math.sin(angle) * 14);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (tower.type === "laser") {
    const fins = level >= 4 ? 4 : 2;
    for (let i = 0; i < fins; i += 1) {
      const angle = (i / fins) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * 8, Math.sin(angle) * 8);
      ctx.lineTo(Math.cos(angle) * 14, Math.sin(angle) * 14);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (tower.type === "dart") {
    const darts = Math.min(5, level);
    for (let i = 0; i < darts; i += 1) {
      const angle = (i / darts) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * 6, Math.sin(angle) * 6);
      ctx.lineTo(Math.cos(angle) * 12, Math.sin(angle) * 12);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (tower.type === "flame") {
    const tongues = Math.min(4, level);
    for (let i = 0; i < tongues; i += 1) {
      const angle = (i / tongues) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * 8, Math.sin(angle) * 8);
      ctx.lineTo(Math.cos(angle) * 12, Math.sin(angle) * 12);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (tower.type === "freeze") {
    const petals = Math.min(6, level + 1);
    for (let i = 0; i < petals; i += 1) {
      const angle = (i / petals) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * 6, Math.sin(angle) * 6);
      ctx.lineTo(Math.cos(angle) * 12, Math.sin(angle) * 12);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (tower.type === "spikeTower") {
    const spikes = Math.min(6, level + 1);
    for (let i = 0; i < spikes; i += 1) {
      const angle = (i / spikes) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * 10, Math.sin(angle) * 10);
      ctx.lineTo(Math.cos(angle) * 14, Math.sin(angle) * 14);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  ctx.restore();
}

function drawMines() {
  for (const tower of state.towers) {
    const data = towerTypes[tower.type];
    if (!data || (!data.isMine && !data.isFloorSpike)) continue;
    if (data.isMine) {
      const base = data.color || "#a3e635";
      const stroke = shadeColor(base, 0.55);
      ctx.fillStyle = base;
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(tower.x - 6, tower.y);
      ctx.lineTo(tower.x + 6, tower.y);
      ctx.stroke();
      continue;
    }
    const base = data.color || "#f97316";
    const stroke = shadeColor(base, 0.6);
    const progress = tower.spikeProgress || 0;
    const height = 4 + 10 * progress;
    ctx.fillStyle = shadeColor(base, 0.6);
    ctx.fillRect(tower.x - 14, tower.y - 14, 28, 28);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.strokeRect(tower.x - 14, tower.y - 14, 28, 28);
    ctx.fillStyle = shadeColor(base, 1.1);
    const offsets = [-8, 0, 8];
    for (const ox of offsets) {
      for (const oy of offsets) {
        const sx = tower.x + ox;
        const sy = tower.y + oy;
        ctx.beginPath();
        ctx.moveTo(sx - 3, sy + 4);
        ctx.lineTo(sx + 3, sy + 4);
        ctx.lineTo(sx, sy + 4 - height);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}

function drawDroneBody(x, y, scale = 1, color = "#34d399") {
  const stroke = shadeColor(color, 0.55);
  const core = shadeColor(color, 1.05);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 10 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 18 * scale, y);
  ctx.lineTo(x - 8 * scale, y);
  ctx.moveTo(x + 18 * scale, y);
  ctx.lineTo(x + 8 * scale, y);
  ctx.moveTo(x, y - 18 * scale);
  ctx.lineTo(x, y - 8 * scale);
  ctx.moveTo(x, y + 18 * scale);
  ctx.lineTo(x, y + 8 * scale);
  ctx.stroke();
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(x, y, 3 * scale, 0, Math.PI * 2);
  ctx.fill();
}

function drawTowers() {
  for (const tower of state.towers) {
    const data = towerTypes[tower.type];
    if (!data) continue;
    if (tower.type === "wall") {
      ctx.fillStyle = "rgba(12, 18, 35, 0.95)";
      ctx.fillRect(tower.x - 16, tower.y - 16, 32, 32);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.65)";
      ctx.lineWidth = 2;
      ctx.strokeRect(tower.x - 16, tower.y - 16, 32, 32);
      ctx.strokeStyle = "rgba(34, 211, 238, 0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tower.x - 12, tower.y + 6);
      ctx.lineTo(tower.x + 12, tower.y + 6);
      ctx.moveTo(tower.x - 12, tower.y);
      ctx.lineTo(tower.x + 12, tower.y);
      ctx.stroke();
      continue;
    }
    if (data.isMine || data.isFloorSpike) continue;

    const base = data.color || "#e2e8f0";
    const stroke = shadeColor(base, 0.55);
    const aim = coalesce(tower.aimAngle, tower.facing, 0);

    if (tower.type === "drone") {
      if (Number.isFinite(tower.baseX) && Number.isFinite(tower.baseY)) {
        ctx.fillStyle = stroke;
        ctx.beginPath();
        ctx.arc(tower.baseX, tower.baseY, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = shadeColor(base, 0.4);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(tower.baseX, tower.baseY, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = shadeColor(base, 0.7);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tower.baseX - 6, tower.baseY);
        ctx.lineTo(tower.baseX + 6, tower.baseY);
        ctx.stroke();
      }
      const miniScale = tower.isMini ? 0.65 : 1;
      drawDroneBody(tower.x, tower.y, miniScale, base);
    } else if (tower.type === "spikeTower") {
      const spikeStroke = shadeColor(base, 0.55);
      ctx.fillStyle = base;
      ctx.fillRect(tower.x - 10, tower.y - 10, 20, 20);
      ctx.strokeStyle = spikeStroke;
      ctx.lineWidth = 2;
      ctx.strokeRect(tower.x - 10, tower.y - 10, 20, 20);
      const dir = tower.spikeDir || getSpikeDirection(tower);
      if (dir) {
        const progress = tower.spikeProgress || 0;
        const stats = getTowerStats(tower);
        const maxLen = (stats && stats.spikeRange) || data.spikeRange || 32;
        if (!hasEnemyInRange(tower, maxLen)) {
          ctx.restore();
          continue;
        }
        const len = maxLen * progress;
        const tipX = tower.x + dir.x * len;
        const tipY = tower.y + dir.y * len;
        ctx.fillStyle = shadeColor(base, 1.1);
        ctx.beginPath();
        if (dir.x !== 0) {
          const half = 6;
          ctx.moveTo(tower.x + dir.x * 10, tower.y - half);
          ctx.lineTo(tower.x + dir.x * 10, tower.y + half);
          ctx.lineTo(tipX, tipY);
        } else {
          const half = 6;
          ctx.moveTo(tower.x - half, tower.y + dir.y * 10);
          ctx.lineTo(tower.x + half, tower.y + dir.y * 10);
          ctx.lineTo(tipX, tipY);
        }
        ctx.closePath();
        ctx.fill();
      }
    } else if (tower.type === "op") {
      ctx.fillStyle = "rgba(12, 18, 35, 0.95)";
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(253, 224, 71, 0.85)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.strokeStyle = "rgba(250, 204, 21, 0.9)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(tower.x - 14, tower.y);
      ctx.lineTo(tower.x + 14, tower.y);
      ctx.moveTo(tower.x, tower.y - 14);
      ctx.lineTo(tower.x, tower.y + 14);
      ctx.stroke();
      ctx.fillStyle = "rgba(250, 204, 21, 0.9)";
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, 5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.save();
      ctx.translate(tower.x, tower.y);
      ctx.rotate(aim);
      ctx.fillStyle = base;
      if (tower.type === "watch") {
        drawPolygonLocal(3, 16);
      } else if (tower.type === "freeze") {
        drawPolygonLocal(6, 14);
      } else if (tower.type === "bomb") {
        drawPolygonLocal(5, 14);
      } else if (tower.type === "laser") {
        ctx.fillRect(-10, -16, 20, 28);
      } else if (tower.type === "dart") {
        drawPolygonLocal(3, 16);
      } else if (tower.type === "flame") {
        drawPolygonLocal(6, 12);
      } else if (tower.type === "trap") {
        drawPolygonLocal(4, 12);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      if (tower.type !== "laser") {
        ctx.fill();
      }
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2;
      if (tower.type === "laser") {
        ctx.strokeRect(-10, -16, 20, 28);
      } else {
        ctx.stroke();
      }
      if (tower.type !== "trap" && tower.type !== "laser") {
        ctx.fillStyle = shadeColor(base, 0.6);
        const barrelWidth = 6;
        const barrelLen = 12;
        const barrelInset = 16;
        ctx.fillRect(barrelInset, -barrelWidth / 2, barrelLen, barrelWidth);
        ctx.fillStyle = shadeColor(base, 0.75);
        ctx.fillRect(barrelInset + barrelLen - 3, -barrelWidth / 2, 3, barrelWidth);
      }
      ctx.restore();
    }

    if (!data.blocksPath && !data.isMine && !data.isFloorSpike && tower.type !== "wall" && tower.type !== "op") {
      drawUpgradeDetails(tower, shadeColor(base, 0.75));
    }

    if (tower.disabled) {
      ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
      ctx.fillRect(tower.x - 16, tower.y - 16, 32, 32);
    }

    if (tower === state.selectedTower) {
      const stats = getTowerStats(tower);
      const range = stats ? stats.range : data.range;
      ctx.strokeStyle = "rgba(245, 158, 11, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, range, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

function drawTraps() {
  for (const trap of state.traps) {
    if (trap.turret) {
      ctx.fillStyle = "rgba(12, 18, 35, 0.95)";
      ctx.beginPath();
      ctx.arc(trap.x, trap.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(250, 204, 21, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
      continue;
    }
    if (trap.explode) {
      ctx.fillStyle = "rgba(248, 113, 113, 0.9)";
      ctx.beginPath();
      ctx.arc(trap.x, trap.y, 7, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }
    ctx.fillStyle = "rgba(250, 204, 21, 0.9)";
    ctx.beginPath();
    ctx.moveTo(trap.x - 8, trap.y + 6);
    ctx.lineTo(trap.x + 8, trap.y + 6);
    ctx.lineTo(trap.x, trap.y - 8);
    ctx.closePath();
    ctx.fill();
  }
}

function drawEnemies() {
  if (state.nukeSmoke) {
    return;
  }
  function drawSphere(x, y, radius, baseColor) {
    ctx.fillStyle = baseColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawTriangle(x, y, size, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.lineTo(-size * 0.8, size * 0.7);
    ctx.lineTo(-size * 0.8, -size * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawPentagonShield(x, y, radius, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < 5; i += 1) {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / 5;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }

  function drawPentagon(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i += 1) {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / 5;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
  }


  function drawOctagon(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 8; i += 1) {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / 8;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
  }

  function drawHexagon(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 6; i += 1) {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / 6;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
  }

  function drawDiamond(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    ctx.lineTo(x + radius, y);
    ctx.lineTo(x, y + radius);
    ctx.lineTo(x - radius, y);
    ctx.closePath();
    ctx.fill();
  }


  for (const enemy of state.enemies) {
    const pos = getEnemyPosition(enemy);
    if (enemy.stealth && !enemy.revealed) {
      ctx.save();
      ctx.globalAlpha = 0.35;
    }
    const tierScale = 1 + (enemy.tier - 1) * 0.18;
    const isBoss = enemy.isBoss || isBossType(enemy.type);
    const baseRadius = enemy.type === "swarmlet" ? 6 : isBoss ? 22 : enemy.type === "heavy" ? 16 : 12;
    const radius = baseRadius * tierScale;
    let baseColor = enemy.type === "speedy" || enemy.type === "boss_fast"
      ? "#facc15"
      : enemy.type === "heavy" || enemy.type === "boss_pentagon"
        ? "#a855f7"
        : enemy.type === "boss_hexagon"
          ? "#94a3b8"
          : enemy.type === "diamond" || enemy.type === "boss_diamond"
            ? "#e0f2fe"
            : enemy.type === "labrat"
              ? "#fbbf24"
              : isBoss
                ? "#f43f5e"
                : enemy.type === "swarmlet"
                  ? "#94a3b8"
                  : "#fb923c";
    if (enemy.darkMatter) {
      baseColor = "#241729";
    } else if (enemy.radioactive) {
      baseColor = "#22c55e";
    } else if (enemy.dotTimer > 0) {
      baseColor = "#b65bff";
    } else if (enemy.burnTimer > 0) {
      baseColor = "#f97316";
    }
    const tierShade = 1 - (enemy.tier - 1) * 0.15;
    baseColor = shadeColor(baseColor, Math.max(0.55, tierShade));

    if (enemy.type === "speedy" || enemy.type === "boss_fast") {
      drawTriangle(pos.x, pos.y, radius, enemy.facing, baseColor);
    } else if (enemy.type === "heavy" || enemy.type === "boss_pentagon") {
      drawPentagon(pos.x, pos.y, radius, baseColor);
    } else if (enemy.type === "boss_hexagon") {
      drawHexagon(pos.x, pos.y, radius, baseColor);
    } else if (enemy.type === "labrat") {
      drawOctagon(pos.x, pos.y, radius, baseColor);
    } else if (enemy.type === "diamond" || enemy.type === "boss_diamond") {
      drawDiamond(pos.x, pos.y, radius, baseColor);
    } else {
      drawSphere(pos.x, pos.y, radius, baseColor);
    }
    if (enemy.tier > 1) {
      ctx.strokeStyle = "rgba(15, 23, 42, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 1, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (enemy.armored) {
      drawPentagonShield(pos.x, pos.y, radius + 6, "#a855f7");
    }

    if (enemy.armored) {
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 2, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (enemy.darkMatter) {
      ctx.strokeStyle = "rgba(99, 45, 151, 0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 5, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (enemy.radioactive) {
      ctx.strokeStyle = "rgba(34, 197, 94, 0.65)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (enemy.burnTimer > 0) {
      ctx.strokeStyle = "rgba(249, 115, 22, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (enemy.dotTimer > 0) {
      ctx.strokeStyle = "rgba(168, 85, 247, 0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 3, 0, Math.PI * 2);
      ctx.stroke();
    }

    const hpRatio = Math.max(0, enemy.hp / enemy.maxHp);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(pos.x - 16, pos.y - 22, 32, 6);
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(pos.x - 16, pos.y - 22, 32 * hpRatio, 6);
    if (enemy.stealth && !enemy.revealed) {
      ctx.restore();
    }
  }
}

function drawProjectiles() {
  for (const proj of state.projectiles) {
    if (proj.kind === "gas") {
      const life = proj.maxTtl ? Math.max(0, Math.min(1, proj.ttl / proj.maxTtl)) : 1;
      const alphaScale = 0.25 + life * 0.75;
      const gradient = ctx.createRadialGradient(proj.x, proj.y, proj.radius * 0.2, proj.x, proj.y, proj.radius);
      gradient.addColorStop(0, `rgba(186, 230, 253, ${0.38 * alphaScale})`);
      gradient.addColorStop(1, `rgba(125, 211, 252, ${0.12 * alphaScale})`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * alphaScale})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      continue;
    }
    if (proj.kind === "bomb") {
      ctx.fillStyle = "#fb7185";
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, 6, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }
    if (proj.kind === "rocket") {
      const vx = proj.vx || 1;
      const vy = proj.vy || 0;
      const angle = Math.atan2(vy, vx);
      ctx.save();
      ctx.translate(proj.x, proj.y);
      ctx.rotate(angle);
      ctx.fillStyle = "#f97316";
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(-6, 5);
      ctx.lineTo(-6, -5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      continue;
    }
    if (proj.kind === "missile") {
      const vx = proj.vx || 1;
      const vy = proj.vy || 0;
      const angle = Math.atan2(vy, vx);
      ctx.save();
      ctx.translate(proj.x, proj.y);
      ctx.rotate(angle);
      ctx.fillStyle = "#fb923c";
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(-6, 4);
      ctx.lineTo(-6, -4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      continue;
    }
    if (proj.kind === "line") {
      const len = 10;
      const vx = proj.vx || 0;
      const vy = proj.vy || 0;
      const dist = Math.hypot(vx, vy) || 1;
      const nx = vx / dist;
      const ny = vy / dist;
      ctx.strokeStyle = "#f8fafc";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(proj.x - nx * len * 0.6, proj.y - ny * len * 0.6);
      ctx.lineTo(proj.x + nx * len, proj.y + ny * len);
      ctx.stroke();
      continue;
    }
    ctx.fillStyle = proj.slow > 0 ? "#38bdf8" : "#facc15";
    ctx.beginPath();
    ctx.arc(proj.x, proj.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawExplosions() {
  for (const explosion of state.explosions) {
    const alpha = Math.min(1, explosion.ttl * 3);
    ctx.strokeStyle = explosion.color;
    ctx.lineWidth = explosion.shockwave ? 6 : 3;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(explosion.x, explosion.y, explosion.radius * (1 - explosion.ttl * 0.6), 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function drawNukeLaunches() {
  for (const launch of state.nukeLaunches) {
    const x = coalesce(launch.x, launch.start.x);
    const y = coalesce(launch.y, launch.start.y);
    const rotation = coalesce(launch.rotation, 0);
    const scale = coalesce(launch.scale, 1);
    ctx.save();
    if (nukeImage.complete && nukeImage.naturalWidth) {
      const base = 78;
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.shadowColor = "rgba(248, 113, 113, 0.55)";
      ctx.shadowBlur = 18;
      ctx.drawImage(nukeImage, -base * 0.5, -base * 0.8, base, base * 1.6);
    } else {
      ctx.fillStyle = "rgba(248, 250, 252, 0.95)";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

function drawNukeParticles() {
  for (const particle of state.nukeParticles) {
    const life = particle.ttl > 0 ? particle.age / particle.ttl : 1;
    const color = lerpColor(particle.start, particle.end, life);
    const alpha = (particle.kind === "ember" ? 0.95 : 0.75) * (1 - life);
    ctx.save();
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawNukeSmokeOverlay() {
  const smoke = state.nukeSmoke;
  if (!smoke) return;
  const maxAlpha = 0.95;
  const fade = smoke.expanding ? 1 : Math.max(0, smoke.fadeTimer / smoke.fadeDuration);
  ctx.save();
  ctx.globalAlpha = maxAlpha * fade;
  ctx.fillStyle = "rgba(226, 232, 240, 0.95)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawFlames() {
  for (const flame of state.flames) {
    if (flame.full) {
      const radius = flame.radius || flame.range;
      const grad = ctx.createRadialGradient(flame.x, flame.y, radius * 0.1, flame.x, flame.y, radius);
      grad.addColorStop(0, "rgba(255, 153, 85, 0.5)");
      grad.addColorStop(0.6, "rgba(249, 115, 22, 0.25)");
      grad.addColorStop(1, "rgba(30, 41, 59, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(flame.x, flame.y, radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const steps = 10;
      for (let i = 1; i <= steps; i += 1) {
        const t = i / steps;
        const dist = flame.range * t;
        const jitter = (Math.random() - 0.5) * 0.12;
        const angle = flame.angle + jitter;
        const x = flame.x + Math.cos(angle) * dist;
        const y = flame.y + Math.sin(angle) * dist;
        const size = 4 + (1 - t) * 5;
        const grad = ctx.createRadialGradient(x, y, size * 0.2, x, y, size);
        grad.addColorStop(0, "rgba(255, 153, 85, 0.98)");
        grad.addColorStop(0.45, "rgba(249, 115, 22, 0.7)");
        grad.addColorStop(1, "rgba(30, 41, 59, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function drawBeams() {
  for (const beam of state.beams) {
    ctx.strokeStyle = beam.color;
    ctx.lineWidth = beam.width;
    ctx.lineCap = "round";
    ctx.globalAlpha = Math.min(1, beam.ttl * 8);
    ctx.beginPath();
    ctx.moveTo(beam.x1, beam.y1);
    ctx.lineTo(beam.x2, beam.y2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function drawPlacementPreview() {
  if (!state.placing) return;
  const rect = canvas.getBoundingClientRect();
  const x = state.mouse.x;
  const y = state.mouse.y;
  const snapped = snapToGrid(x, y);
  const data = towerTypes[state.placing];
  if (!data) return;
  const invalidPath = isOnPath(snapped.x, snapped.y) && !data.allowOnPath && !data.blocksPath;
  const invalidSpike = state.placing === "spikeTower" && !isAdjacentToPath(snapped.x, snapped.y);
  const invalidWave = Boolean(data.blocksPath && state.waveInProgress && isOnPath(snapped.x, snapped.y));
  const invalidMine = (state.placing === "mine" || state.placing === "floorSpike") && !isOnPath(snapped.x, snapped.y);
  const invalid = invalidPath || invalidMine || invalidWave || invalidSpike;
  ctx.strokeStyle = invalid ? "rgba(239, 68, 68, 0.8)" : "rgba(34, 197, 94, 0.8)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  const previewRange = data.range || 14;
  ctx.arc(snapped.x, snapped.y, previewRange, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = data.color;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(snapped.x, snapped.y, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawBackground() {
  const palette = state.mapPalette || {
    top: "#200b3b",
    mid: "#130820",
    bottom: "#0c0516",
    shadow: "rgba(0, 0, 0, 0.3)",
  };
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, palette.top);
  gradient.addColorStop(0.5, palette.mid);
  gradient.addColorStop(1, palette.bottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const shadow of state.shadowSeeds) {
    const x = (shadow.x + performance.now() * 0.02 * shadow.speed) % (canvas.width + 120) - 60;
    const y = (shadow.y + performance.now() * 0.015 * shadow.speed) % (canvas.height + 120) - 60;
    ctx.fillStyle = palette.shadow;
    ctx.beginPath();
    ctx.arc(x, y, shadow.size, 0, Math.PI * 2);
    ctx.fill();
  }
  drawGrid();
  drawPortal();
  drawCastle();
  drawPath();
}

function draw() {
  const shake = getScreenShakeOffset();
  ctx.save();
  ctx.translate(shake.x, shake.y);
  drawBackground();
  drawTraps();
  drawMines();
  drawTowers();
  drawEnemies();
  drawProjectiles();
  drawExplosions();
  drawNukeParticles();
  drawFlames();
  drawNukeLaunches();
  drawBeams();
  drawPlacementPreview();
  ctx.restore();
  drawNukeSmokeOverlay();
  if (state.selectedTower && state.selectedTower.type !== "wall" && state.selectedTower.type !== "mine") {
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText("Click to upgrade (50)", 18, canvas.height - 20);
  }
}

function update(dt) {
  if (state.paused) {
    if (!state.infiniteGold) {
      state.pauseDrain += dt;
      while (state.pauseDrain >= 0.1) {
        state.pauseDrain -= 0.1;
        if (state.gold > 0) {
          state.gold -= 1;
        }
      }
      if (state.gold <= 0) {
        state.lives = Math.max(0, state.lives - 2);
        state.paused = false;
        if (ui.pauseWave) ui.pauseWave.textContent = "Pause Wave";
        if (ui.playArea) ui.playArea.classList.remove("paused-glitch");
      }
    }
    updateHud();
    updateUpgradePanel();
    return;
  }
  const simDt = dt * (state.waveSpeed || 1);
  state.damageFlashCooldown = Math.max(0, state.damageFlashCooldown - dt);
  if (state.lives < state.lastLives && state.damageFlashCooldown <= 0 && !state.damageFlashActive) {
    state.damageFlashActive = true;
    if (ui.damageFlash) {
      ui.damageFlash.classList.remove("active");
      void ui.damageFlash.offsetHeight;
      ui.damageFlash.classList.add("active");
      ui.damageFlash.addEventListener("animationend", () => {
        ui.damageFlash.classList.remove("active");
        state.damageFlashActive = false;
      }, { once: true });
    } else {
      state.damageFlashActive = false;
    }
    state.damageFlashCooldown = 0.7;
  }
  state.lastLives = state.lives;
  if (!state.waveInProgress && state.autoWave) {
    startWave();
  }
  updateSpawner(dt);
  updateEnemies(simDt);
  updateFloorSpikes(simDt);
  updateMines();
  updateTrapSetters(simDt);
  for (const tower of state.towers) {
    if (tower.type === "spikeTower") {
      forceSpikeExtend(tower);
      if (tower.spikePhase === "extend" && (tower.spikeProgress || 0) <= 0) {
        const stats = getTowerStats(tower);
        const extendSpeed = (stats && stats.spikeExtendSpeed) || towerTypes.spikeTower.spikeExtendSpeed || 6;
        tower.spikeProgress = Math.min(1, (tower.spikeProgress || 0) + extendSpeed * simDt * 0.35);
      }
    }
  }
  updateTraps(simDt);
  updateTowers(simDt);
  if (state.waveInProgress && state.enemies.length > 0) {
    for (const tower of state.towers) {
      const stats = getTowerStats(tower);
      if (!stats) continue;
      const data = stats.data;
      if (tower.disabled) continue;
      if (data.isMine || data.isFloorSpike || tower.type === "wall" || tower.type === "spikeTower" || tower.type === "trap") continue;
      if (tower.type === "drone") {
        ensureDroneMinis(tower, stats);
      }
      tower.cooldown = Math.max(0, (tower.cooldown || 0) - simDt);
      if (tower.cooldown > 0 && tower.type !== "freeze") continue;
      const target = selectTarget(tower, stats);
      if (!target) continue;
      tower.aimAngle = Math.atan2(target.y - tower.y, target.x - tower.x);
      if (tower.type === "freeze") {
        emitFreezeGas(tower, target, stats);
      } else if (tower.type === "flame") {
        fireFlameCone(tower, target, stats);
      } else if (data.laser) {
        fireLaser(tower, target, stats, stats.range || 0);
      } else {
        fireProjectile(tower, target, stats);
      }
      tower.cooldown = stats.rate;
    }
  }
  updateProjectiles(simDt);
  updateExplosions(simDt);
  updateNukeLaunches(simDt);
  updateNukeParticles(simDt);
  updateNukeSmoke(simDt);
  updateFlames(simDt);
  updateBeams(simDt);
  updateHud();
  updateUpgradePanel();
  if (state.lives <= 0) {
    state.waveInProgress = false;
    state.paused = false;
    if (ui.playArea) ui.playArea.classList.remove("paused-glitch");
    state.enemies = [];
    if (ui.gameOver) {
      ui.gameOver.classList.remove("hidden");
    }
  }
}

let lastTime = performance.now();
state.mouse = { x: 0, y: 0 };
state.draggingDrone = null;

function loop(now) {
  const dt = Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;
  if (state.screenShakeTime > 0) {
    state.screenShakeTime = Math.max(0, state.screenShakeTime - dt);
  }
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

canvas.addEventListener("click", handleClick);
canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  state.mouse.x = ((event.clientX - rect.left) / rect.width) * canvas.width;
  state.mouse.y = ((event.clientY - rect.top) / rect.height) * canvas.height;
  if (state.draggingDrone) {
    state.draggingDrone.x = state.mouse.x;
    state.draggingDrone.y = state.mouse.y;
  }
});

ui.buildWatch.addEventListener("click", () => {
  const cost = towerTypes.watch.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.watch);
    return;
  }
  state.placing = "watch";
});

ui.buildFreeze.addEventListener("click", () => {
  const cost = towerTypes.freeze.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.freeze);
    return;
  }
  state.placing = "freeze";
});

ui.buildDrone.addEventListener("click", () => {
  const cost = towerTypes.drone.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.drone);
    return;
  }
  state.placing = "drone";
});

ui.buildBomb.addEventListener("click", () => {
  const cost = towerTypes.bomb.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.bomb);
    return;
  }
  state.placing = "bomb";
});

ui.buildLaser.addEventListener("click", () => {
  const cost = towerTypes.laser.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.laser);
    return;
  }
  state.placing = "laser";
});

ui.buildFlame.addEventListener("click", () => {
  const cost = towerTypes.flame.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.flame);
    return;
  }
  state.placing = "flame";
});

ui.buildDart.addEventListener("click", () => {
  const cost = towerTypes.dart.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.dart);
    return;
  }
  state.placing = "dart";
});

ui.buildTrap.addEventListener("click", () => {
  const cost = towerTypes.trap.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.trap);
    return;
  }
  state.placing = "trap";
});

if (ui.buildSpike) {
  ui.buildSpike.addEventListener("click", () => {
    const cost = towerTypes.spikeTower.cost;
    if (!canAfford(cost)) {
      flashButton(buildButtons.spikeTower);
      return;
    }
    state.placing = "spikeTower";
  });
}

ui.buildMine.addEventListener("click", () => {
  const cost = towerTypes.mine.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.mine);
    return;
  }
  state.placing = "mine";
});

if (ui.buildFloorSpike) {
  ui.buildFloorSpike.addEventListener("click", () => {
    const cost = towerTypes.floorSpike.cost;
    if (!canAfford(cost)) {
      flashButton(buildButtons.floorSpike);
      return;
    }
    state.placing = "floorSpike";
  });
}

if (ui.buildWall) {
  ui.buildWall.addEventListener("click", () => {
    const cost = towerTypes.wall.cost;
    if (!canAfford(cost)) {
      flashButton(buildButtons.wall);
      return;
    }
    state.placing = "wall";
  });
}

ui.buildOp.addEventListener("click", () => {
  if (!state.easterUnlocked) return;
  const cost = towerTypes.op.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.op);
    return;
  }
  state.placing = "op";
});

ui.startWave.addEventListener("click", startWave);

if (ui.pauseWave) {
  ui.pauseWave.addEventListener("click", () => {
    togglePauseWave();
  });
}

if (ui.nukeButton) {
  ui.nukeButton.addEventListener("click", () => {
    if (state.nukeCharges <= 0) return;
    const source = getClosestMaxBombTowerToCenter();
    if (source) {
      launchNukeFrom(source.x, source.y - 20);
    } else {
      const castle = getCastlePoint();
      launchNukeFrom(castle.x, castle.y - 28);
    }
    state.nukeCharges -= 1;
    updateHud();
  });
}

if (ui.upgradePanel) {
  ui.upgradePanel.addEventListener("mousedown", (event) => {
    const tag = event.target && event.target.tagName ? event.target.tagName.toLowerCase() : undefined;
    if (tag === "input" || tag === "button" || tag === "select" || tag === "label") return;
    event.preventDefault();
  });
  ui.upgradePanel.addEventListener("click", (event) => {
    const tag = event.target && event.target.tagName ? event.target.tagName.toLowerCase() : undefined;
    if (tag === "input" || tag === "button" || tag === "select" || tag === "label") return;
    if (state.selectedTower) {
      upgradeTower(state.selectedTower);
    }
  });
}

  if (ui.upgradeTo) {
  ui.upgradeTo.addEventListener("click", (event) => {
    event.stopPropagation();
    const tower = state.selectedTower;
    if (!tower) return;
    if (tower.type === "wall" || tower.type === "mine" || tower.type === "floorSpike") return;
    if (tower.type === "bomb" && (tower.level || 1) >= state.towerLevelCap) return;
    const current = tower.level || 1;
    const targetRaw = Number.parseInt((ui.upgradeTarget ? ui.upgradeTarget.value : undefined) || "1", 10);
    if (!Number.isFinite(targetRaw)) return;
    const delta = Math.max(1, targetRaw);
    const target = Math.min(state.towerLevelCap, current + delta);
    if (target <= current) return;
    const totalCost = getUpgradeCostToLevel(current, target, tower);
    if (!canAfford(totalCost)) {
      flashButton(ui.upgradeTo);
      return;
    }
    payCost(totalCost);
    tower.level = target;
    if (tower.type === "bomb" && tower.level >= 5 && !tower.bombNukeGranted) {
      tower.bombNukeGranted = true;
      state.nukeCharges += 1;
    }
    if (tower.type === "drone") {
      const stats = getTowerStats(tower);
      if (stats) ensureDroneMinis(tower, stats);
    }
    updateHud();
    updateUpgradePanel();
  });
}

function canSelectPath(tower, path) {
  const tier = Math.min(tower.level || 1, 5);
  const currentPath = tower.upgradePath || 1;
  if (tier < 3) return true;
  if (path === currentPath) return true;
  return false;
}

function trySelectPath(tower, path) {
  const tier = Math.min(tower.level || 1, 5);
  if (tier >= 3 && (tower.upgradePath || 1) !== path) {
    updateUpgradePanel();
    return false;
  }
  tower.upgradePath = path;
  if ((tower.level || 1) < 5) {
    upgradeTower(tower);
  } else {
    updateUpgradePanel();
  }
  return true;
}

if (ui.watchPath1) {
  ui.watchPath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "watch") return;
    trySelectPath(state.selectedTower, 1);
  });
}

if (ui.watchPath2) {
  ui.watchPath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "watch") return;
    trySelectPath(state.selectedTower, 2);
  });
}

if (ui.freezePath1) {
  ui.freezePath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "freeze") return;
    trySelectPath(state.selectedTower, 1);
  });
}

if (ui.freezePath2) {
  ui.freezePath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "freeze") return;
    trySelectPath(state.selectedTower, 2);
  });
}

if (ui.trapPath1) {
  ui.trapPath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "trap") return;
    trySelectPath(state.selectedTower, 1);
  });
}

if (ui.trapPath2) {
  ui.trapPath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "trap") return;
    trySelectPath(state.selectedTower, 2);
  });
}

if (ui.bombPath1) {
  ui.bombPath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "bomb") return;
    trySelectPath(state.selectedTower, 1);
  });
}

if (ui.bombPath2) {
  ui.bombPath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "bomb") return;
    trySelectPath(state.selectedTower, 2);
  });
}

if (ui.dartPath1) {
  ui.dartPath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "dart") return;
    trySelectPath(state.selectedTower, 1);
  });
}

if (ui.dartPath2) {
  ui.dartPath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "dart") return;
    trySelectPath(state.selectedTower, 2);
  });
}

if (ui.laserPath1) {
  ui.laserPath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "laser") return;
    trySelectPath(state.selectedTower, 1);
  });
}

if (ui.laserPath2) {
  ui.laserPath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "laser") return;
    trySelectPath(state.selectedTower, 2);
  });
}

if (ui.flamePath1) {
  ui.flamePath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "flame") return;
    trySelectPath(state.selectedTower, 1);
  });
}

if (ui.flamePath2) {
  ui.flamePath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "flame") return;
    trySelectPath(state.selectedTower, 2);
  });
}

if (ui.dronePath1) {
  ui.dronePath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "drone") return;
    trySelectPath(state.selectedTower, 1);
  });
}

if (ui.dronePath2) {
  ui.dronePath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "drone") return;
    trySelectPath(state.selectedTower, 2);
  });
}

if (ui.spikePath1) {
  ui.spikePath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "spikeTower") return;
    trySelectPath(state.selectedTower, 1);
  });
}

if (ui.spikePath2) {
  ui.spikePath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "spikeTower") return;
    trySelectPath(state.selectedTower, 2);
  });
}

if (ui.upgradeTrap) {
  ui.upgradeTrap.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTrap) return;
    upgradeTrap(state.selectedTrap);
    updateUpgradePanel();
  });
}

if (ui.targetingMode) {
  ui.targetingMode.addEventListener("click", (event) => {
    event.stopPropagation();
    const tower = state.selectedTower;
    if (!tower || tower.type === "wall" || tower.type === "mine") return;
    const current = tower.targeting || "first";
    const idx = targetingModes.indexOf(current);
    const next = targetingModes[(idx + 1) % targetingModes.length];
    tower.targeting = next;
    updateUpgradePanel();
  });
}

if (ui.applyWave) {
  ui.applyWave.addEventListener("click", () => {
    if (!state.infiniteGold) return;
    const value = Number.parseInt((ui.setWave ? ui.setWave.value : undefined) || "1", 10);
    if (!Number.isFinite(value) || value < 1) return;
    state.wave = value - 1;
    state.waveInProgress = false;
    state.enemies = [];
    state.enemiesToSpawn = 0;
    updateHud();
  });
}

if (ui.waveSpeed) {
  ui.waveSpeed.addEventListener("change", () => {
    const value = Number.parseFloat(ui.waveSpeed.value);
    state.waveSpeed = Number.isFinite(value) ? value : 1;
  });
}

if (ui.towerLevelCap) {
  ui.towerLevelCap.addEventListener("change", () => {
    if (!state.infiniteGold) return;
    const rawInput = ui.towerLevelCap.value.trim();
    if (rawInput === "" || Number(rawInput) === 0) {
      state.towerLevelCap = Infinity;
      ui.towerLevelCap.value = "";
    } else {
      const raw = Number.parseInt(rawInput, 10);
      const cap = Math.max(1, Number.isFinite(raw) ? raw : 5);
      state.towerLevelCap = cap;
      ui.towerLevelCap.value = `${cap}`;
    }
    updateUpgradePanel();
  });
}

if (ui.autoWave) {
  ui.autoWave.addEventListener("click", () => {
    state.autoWave = !state.autoWave;
    ui.autoWave.textContent = `Auto Next Wave: ${state.autoWave ? "On" : "Off"}`;
  });
}

if (ui.halfCash) {
  ui.halfCash.addEventListener("click", () => {
    state.halfCash = !state.halfCash;
    updateHud();
  });
}

if (ui.openEncyclopedia) {
  ui.openEncyclopedia.addEventListener("click", () => {
    if (!ui.encyclopediaModal) return;
    updateEncyclopedia();
    ui.encyclopediaModal.classList.remove("hidden");
  });
}

if (ui.closeEncyclopedia) {
  ui.closeEncyclopedia.addEventListener("click", () => {
    if (ui.encyclopediaModal) ui.encyclopediaModal.classList.add("hidden");
  });
}

if (ui.encyclopediaModal) {
  ui.encyclopediaModal.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.closest && target.closest("[data-close='encyclopedia']")) {
      ui.encyclopediaModal.classList.add("hidden");
      return;
    }
    if (event.target === ui.encyclopediaModal) {
      ui.encyclopediaModal.classList.add("hidden");
    }
  });
}

if (ui.openTips) {
  ui.openTips.addEventListener("click", () => {
    if (ui.tipsModal) ui.tipsModal.classList.remove("hidden");
  });
}

if (ui.closeAlert) {
  ui.closeAlert.addEventListener("click", () => {
    if (ui.alertModal) ui.alertModal.classList.add("hidden");
  });
}

if (ui.alertModal) {
  ui.alertModal.addEventListener("click", (event) => {
    if (event.target === ui.alertModal) {
      ui.alertModal.classList.add("hidden");
    }
  });
}

const openTutorialModal = (event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (ui.tutorialModal) ui.tutorialModal.classList.remove("hidden");
};

if (ui.openTutorial) {
  ui.openTutorial.addEventListener("click", openTutorialModal);
  ui.openTutorial.addEventListener("pointerdown", openTutorialModal);
}

if (ui.closeTips) {
  ui.closeTips.addEventListener("click", () => {
    if (ui.tipsModal) ui.tipsModal.classList.add("hidden");
  });
}

if (ui.closeTutorial) {
  ui.closeTutorial.addEventListener("click", () => {
    if (ui.tutorialModal) ui.tutorialModal.classList.add("hidden");
  });
}

if (ui.tipsModal) {
  ui.tipsModal.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.closest && target.closest("[data-close='tips']")) {
      ui.tipsModal.classList.add("hidden");
      return;
    }
    if (event.target === ui.tipsModal) {
      ui.tipsModal.classList.add("hidden");
    }
  });
}

if (ui.tutorialModal) {
  ui.tutorialModal.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.closest && target.closest("[data-close='tutorial']")) {
      ui.tutorialModal.classList.add("hidden");
      return;
    }
    if (event.target === ui.tutorialModal) {
      ui.tutorialModal.classList.add("hidden");
    }
  });
}

if (ui.openJasper) {
  ui.openJasper.addEventListener("click", () => {
    if (!state.easterUnlocked) return;
    if (ui.jasperModal) ui.jasperModal.classList.remove("hidden");
  });
}

if (ui.closeJasper) {
  ui.closeJasper.addEventListener("click", () => {
    if (ui.jasperModal) ui.jasperModal.classList.add("hidden");
  });
}

if (ui.jasperModal) {
  ui.jasperModal.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.closest && target.closest("[data-close='jasper']")) {
      ui.jasperModal.classList.add("hidden");
      return;
    }
    if (event.target === ui.jasperModal) {
      ui.jasperModal.classList.add("hidden");
    }
  });
}

  if (ui.spawnEnemy) {
    ui.spawnEnemy.addEventListener("click", () => {
      if (!state.infiniteGold) return;
      const type = (ui.spawnEnemyType ? ui.spawnEnemyType.value : undefined) || "grunt";
      const count = Math.max(1, Number.parseInt((ui.spawnEnemyCount ? ui.spawnEnemyCount.value : undefined) || "1", 10));
      const radioactive = Boolean(ui.spawnEnemyRadioactive ? ui.spawnEnemyRadioactive.checked : undefined);
      const armored = Boolean(ui.spawnEnemyArmored ? ui.spawnEnemyArmored.checked : undefined);
      const darkMatter = Boolean(ui.spawnEnemyDarkMatter ? ui.spawnEnemyDarkMatter.checked : undefined);
      const onFlame = Boolean(ui.spawnEnemyOnFlame ? ui.spawnEnemyOnFlame.checked : undefined);
      const poisoned = Boolean(ui.spawnEnemyPoisoned ? ui.spawnEnemyPoisoned.checked : undefined);
      const stealth = type === "stealth";
      for (let i = 0; i < count; i += 1) {
        if (type === "swarm") {
          registerEnemyInEncyclopedia(type, armored, darkMatter);
          for (let j = 0; j < 20; j += 1) {
            state.enemies.push(createEnemy("swarmlet", { armored: false, darkMatter: false, stealth: false }));
          }
          continue;
        }
        registerEnemyInEncyclopedia(type, armored, darkMatter, stealth);
        state.enemies.push(createEnemy(type, { armored, darkMatter, onFlame, poisoned, radioactive, stealth }));
      }
    });
  }

const mapButtons = titleScreen ? Array.from(titleScreen.querySelectorAll("[data-map]")) : [];

const selectMap = (mapId) => {
  setActiveMap(mapId);
  mapButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.map === mapId);
  });
  recomputeGlobalPath();
  updateHud();
};

const selectDifficulty = (difficulty) => {
  if (difficulty === "easy") {
    state.difficultyMultipliers = { enemyHp: 0.85, enemySpeed: 0.9, gold: 1.2 };
  } else if (difficulty === "hard") {
    state.difficultyMultipliers = { enemyHp: 1.25, enemySpeed: 1.1, gold: 0.9 };
  } else {
    state.difficultyMultipliers = { enemyHp: 1, enemySpeed: 1, gold: 1 };
  }
  state.difficulty = difficulty;
  state.gameStarted = true;
  if (titleScreen) titleScreen.classList.add("hidden");
  if (ui.gameOver) ui.gameOver.classList.add("hidden");
  recomputeGlobalPath();
  updateHud();
};
if (titleScreen) {
  const buttons = titleScreen.querySelectorAll("[data-difficulty]");
  buttons.forEach((button) => {
    const handler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const difficulty = button.dataset.difficulty;
      if (!difficulty) return;
      selectDifficulty(difficulty);
    };
    button.addEventListener("click", handler);
    button.addEventListener("pointerdown", handler);
  });
  if (mapButtons.length > 0) {
    mapButtons.forEach((button) => {
      const handler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const mapId = button.dataset.map;
        if (!mapId) return;
        selectMap(mapId);
      };
      button.addEventListener("click", handler);
      button.addEventListener("pointerdown", handler);
    });
  }
}

const handleTitleScreenPointer = (event) => {
  if (!titleScreen || titleScreen.classList.contains("hidden")) return;
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  const difficultyButton = target.closest("[data-difficulty]");
  if (difficultyButton && titleScreen.contains(difficultyButton)) {
    event.preventDefault();
    event.stopPropagation();
    const difficulty = difficultyButton.dataset.difficulty;
    if (difficulty) {
      selectDifficulty(difficulty);
    }
    return;
  }
  const mapButton = target.closest("[data-map]");
  if (mapButton && titleScreen.contains(mapButton)) {
    event.preventDefault();
    event.stopPropagation();
    const mapId = mapButton.dataset.map;
    if (mapId) {
      selectMap(mapId);
    }
    return;
  }
  const tutorialButton = target.closest("#open-tutorial");
  if (tutorialButton && titleScreen.contains(tutorialButton)) {
    openTutorialModal(event);
  }
};

document.addEventListener("click", handleTitleScreenPointer, true);
document.addEventListener("pointerdown", handleTitleScreenPointer, true);
document.addEventListener("touchstart", handleTitleScreenPointer, { capture: true, passive: false });

document.addEventListener("keydown", (event) => {
  if (!titleScreen || titleScreen.classList.contains("hidden")) return;
  if (event.key === "1") {
    selectDifficulty("easy");
  } else if (event.key === "2") {
    selectDifficulty("medium");
  } else if (event.key === "3") {
    selectDifficulty("hard");
  } else if (event.key.toLowerCase() === "t") {
    openTutorialModal(event);
  }
});

if (ui.encyclopediaModal) {
  ui.encyclopediaModal.classList.add("hidden");
}

if (ui.tipsModal) {
  ui.tipsModal.classList.add("hidden");
}

if (ui.alertModal) {
  ui.alertModal.classList.add("hidden");
}

if (ui.tutorialModal) {
  ui.tutorialModal.classList.add("hidden");
}

if (ui.jasperModal) {
  ui.jasperModal.classList.add("hidden");
}

function resetGame() {
  state.lives = 100;
  state.maxLives = 100;
  state.gold = 200;
  state.wave = 0;
  state.totalDamage = 0;
  state.placing = null;
  state.towers = [];
  state.enemies = [];
  state.projectiles = [];
  state.beams = [];
  state.explosions = [];
  state.flames = [];
  state.portalClock = 0;
  state.traps = [];
  state.nukeLaunches = [];
  state.nukeParticles = [];
  state.nukeSmoke = null;
  state.selectedTower = null;
  state.waveInProgress = false;
  state.paused = false;
  state.pauseDrain = 0;
  state.lastLives = state.lives;
  state.damageFlashCooldown = 0;
  state.damageFlashActive = false;
  state.screenShakeTime = 0;
  state.screenShakeDuration = 0;
  state.screenShakePower = 0;
  state.radioactiveWave = null;
  state.nukeUsed = false;
  state.nukeCharges = 0;
  state.selectedTrap = null;
  state.spawnTimer = 0;
  state.enemiesToSpawn = 0;
  state.easterUnlocked = false;
  state.keysDown.clear();
  state.numberKeysDown.clear();
  state.opPlaced = false;
  state.pathPoints = [];
  state.wallsPlaced = 0;
  state.controlledDrone = null;
  state.encyclopedia.clear();
  state.revealStealth = false;
  state.autoWave = false;
  state.waveSpeed = 1;
  state.towerLevelCap = 5;
  state.infiniteGold = false;
  state.halfCash = false;
  state.keyBuffer = "";
  state.jasperProgress = 0;
  if (ui.jasperControls) ui.jasperControls.classList.add("hidden");
  if (ui.autoWave) ui.autoWave.textContent = "Auto Next Wave: Off";
  if (ui.waveSpeed) ui.waveSpeed.value = "1";
  if (ui.towerLevelCap) ui.towerLevelCap.value = "5";
  if (ui.setWave) ui.setWave.value = "1";
  if (ui.buildOp) ui.buildOp.classList.add("hidden");
  if (ui.buildOp) ui.buildOp.disabled = false;
  if (ui.openJasper) ui.openJasper.classList.add("hidden");
  if (ui.pauseWave) ui.pauseWave.textContent = "Pause Wave";
  if (ui.playArea) ui.playArea.classList.remove("paused-glitch");
  if (ui.encyclopediaModal) ui.encyclopediaModal.classList.add("hidden");
  if (ui.tipsModal) ui.tipsModal.classList.add("hidden");
  if (ui.tutorialModal) ui.tutorialModal.classList.add("hidden");
  if (ui.jasperModal) ui.jasperModal.classList.add("hidden");
  if (ui.alertModal) ui.alertModal.classList.add("hidden");
  setActiveMap(state.mapId);
  recomputeGlobalPath();
  updateHud();
  updateEncyclopedia();
}

if (ui.restartGame) {
  const restartHandler = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    resetGame();
    if (ui.gameOver) ui.gameOver.classList.add("hidden");
  };
  ui.restartGame.addEventListener("click", restartHandler);
  ui.restartGame.addEventListener("pointerdown", restartHandler);
}

if (ui.mainMenu) {
  const menuHandler = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    resetGame();
    if (ui.gameOver) ui.gameOver.classList.add("hidden");
    if (titleScreen) titleScreen.classList.remove("hidden");
  };
  ui.mainMenu.addEventListener("click", menuHandler);
  ui.mainMenu.addEventListener("pointerdown", menuHandler);
}

function tryUnlockOpTower() {
  if (state.easterUnlocked) return;
  const required = ["j", "a", "s", "p", "e", "r"];
  const allPressed = required.every((key) => state.keysDown.has(key));
  if (!allPressed) return;
  state.easterUnlocked = true;
  ui.buildOp.classList.remove("hidden");
  if (ui.openJasper) ui.openJasper.classList.remove("hidden");
  state.infiniteGold = true;
  state.gold = 999999;
  updateHud();
  if (ui.jasperControls) {
    ui.jasperControls.classList.remove("hidden");
  }
}

function unlockJasperMenu() {
  if (state.easterUnlocked) return;
  state.easterUnlocked = true;
  if (ui.openJasper) ui.openJasper.classList.remove("hidden");
  if (ui.jasperControls) {
    ui.jasperControls.classList.remove("hidden");
  }
}

function triggerSixSeven() {
  if (state.sixSevenActive) return;
  state.sixSevenActive = true;
  if (ui.sixSevenOverlay) ui.sixSevenOverlay.classList.remove("hidden");
  if (ui.sixSevenGif) ui.sixSevenGif.src = sixSevenImage.src;
  if (state.sixSevenTimer) {
    clearTimeout(state.sixSevenTimer);
  }
  state.sixSevenTimer = setTimeout(() => {
    state.sixSevenActive = false;
    if (ui.sixSevenOverlay) ui.sixSevenOverlay.classList.add("hidden");
  }, 3200);
}

function tryUnlockInfiniteGold() {
  if (state.infiniteGold) return;
  if (state.jasperProgress < 6) return;
  state.infiniteGold = true;
  state.gold = 999999;
  updateHud();
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    if (state.waveInProgress) {
      togglePauseWave();
    } else {
      startWave();
    }
  }
  if (event.key === "Escape") {
    if (ui.encyclopediaModal) ui.encyclopediaModal.classList.add("hidden");
    if (ui.tipsModal) ui.tipsModal.classList.add("hidden");
    if (ui.tutorialModal) ui.tutorialModal.classList.add("hidden");
    if (ui.jasperModal) ui.jasperModal.classList.add("hidden");
  }
  if (event.key.toLowerCase() === "d") {
    let closest = null;
    let closestDist = 22;
    for (const tower of state.towers) {
      if (tower.type !== "drone") continue;
      const dist = Math.hypot(tower.x - state.mouse.x, tower.y - state.mouse.y);
      if (dist <= closestDist) {
        closest = tower;
        closestDist = dist;
      }
    }
    if (closest) {
      if (state.controlledDrone && state.controlledDrone !== closest) {
        state.controlledDrone.forceReturn = true;
      }
      state.controlledDrone = closest;
    }
  }
  const key = event.key.toLowerCase();
  if (key.length === 1 && key >= "a" && key <= "z") {
    state.keysDown.add(key);
    state.keyBuffer = `${state.keyBuffer}${key}`.slice(-12);
    const word = "jasper";
    if (key === word[state.jasperProgress]) {
      state.jasperProgress += 1;
    } else {
      state.jasperProgress = key === "j" ? 1 : 0;
    }
    if (state.jasperProgress >= 6) {
      unlockJasperMenu();
    }
    tryUnlockOpTower();
    tryUnlockInfiniteGold();
  }
  if (key === "6" || key === "7") {
    state.numberKeysDown.add(key);
    if (state.numberKeysDown.has("6") && state.numberKeysDown.has("7")) {
      triggerSixSeven();
    }
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (key.length === 1 && key >= "a" && key <= "z") {
    state.keysDown.delete(key);
  }
  if (key === "6" || key === "7") {
    state.numberKeysDown.delete(key);
  }
});

window.addEventListener("blur", () => {
  state.keysDown.clear();
  state.numberKeysDown.clear();
  state.keyBuffer = "";
  state.jasperProgress = 0;
});

canvas.addEventListener("dblclick", () => {
  if (state.selectedTower) {
    upgradeTower(state.selectedTower);
  }
});

canvas.addEventListener("mousedown", (event) => {
  if (!state.infiniteGold) return;
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
  let closest = null;
  let closestDist = 18;
  for (const tower of state.towers) {
    if (tower.type !== "drone") continue;
    if (tower.isMini) continue;
    const dist = Math.hypot(tower.x - x, tower.y - y);
    if (dist <= closestDist) {
      closest = tower;
      closestDist = dist;
    }
  }
  if (closest) {
    state.draggingDrone = closest;
  }
});

canvas.addEventListener("mouseup", () => {
  if (state.draggingDrone) {
    state.draggingDrone.forceReturn = true;
    state.draggingDrone = null;
  }
});

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
  const snapped = snapToGrid(x, y);
  const towersHere = state.towers.filter((entry) => Math.hypot(entry.x - snapped.x, entry.y - snapped.y) < 20 && !entry.isMini);
  if (towersHere.length > 0) {
    const nonWall = towersHere.find((entry) => entry.type !== "wall");
    sellTower(nonWall || towersHere[0]);
    return;
  }
  state.placing = null;
  state.selectedTower = null;
});

canvas.addEventListener("auxclick", (event) => {
  if (event.button !== 1) return;
  event.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
  const snapped = snapToGrid(x, y);
  const towersHere = state.towers.filter((entry) => Math.hypot(entry.x - snapped.x, entry.y - snapped.y) < 20 && !entry.isMini);
  if (towersHere.length === 0) return;
  const target = towersHere.find((tower) => tower.type !== "wall") || towersHere[0];
  target.disabled = !target.disabled;
});

selectMap(state.mapId);
updateHud();
requestAnimationFrame(loop);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
