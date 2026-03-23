const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ui = {
  lives: document.getElementById("lives"),
  gold: document.getElementById("gold"),
  wave: document.getElementById("wave"),
  encyclopedia: document.getElementById("encyclopedia"),
  encyclopediaModal: document.getElementById("encyclopedia-modal"),
  encyclopediaModalContent: document.getElementById("encyclopedia-modal-content"),
  openEncyclopedia: document.getElementById("open-encyclopedia"),
  closeEncyclopedia: document.getElementById("close-encyclopedia"),
  tipsModal: document.getElementById("tips-modal"),
  openTips: document.getElementById("open-tips"),
  closeTips: document.getElementById("close-tips"),
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
  buildDart: document.getElementById("build-dart"),
  buildMine: document.getElementById("build-mine"),
  buildWall: document.getElementById("build-wall"),
  buildOp: document.getElementById("build-op"),
  startWave: document.getElementById("start-wave"),
  pauseWave: document.getElementById("pause-wave"),
  upgradeDetails: document.getElementById("upgrade-details"),
  upgradePanel: document.getElementById("upgrade-panel"),
  upgradeTarget: document.getElementById("upgrade-target"),
  upgradeTo: document.getElementById("upgrade-to"),
  upgradeTargetRow: document.getElementById("upgrade-target-row"),
  upgradeTargetAction: document.getElementById("upgrade-target-action"),
  watchUpgradeActions: document.getElementById("watch-upgrade-actions"),
  watchPath1: document.getElementById("watch-path-1"),
  watchPath2: document.getElementById("watch-path-2"),
  jasperControls: document.getElementById("jasper-controls"),
  setWave: document.getElementById("set-wave"),
  applyWave: document.getElementById("apply-wave"),
  waveSpeed: document.getElementById("wave-speed"),
  autoWave: document.getElementById("auto-wave"),
  spawnEnemy: document.getElementById("spawn-enemy"),
  spawnEnemyType: document.getElementById("spawn-enemy-type"),
  spawnEnemyCount: document.getElementById("spawn-enemy-count"),
  spawnEnemyArmored: document.getElementById("spawn-enemy-armored"),
  spawnEnemyDarkMatter: document.getElementById("spawn-enemy-darkmatter"),
  spawnEnemyOnFlame: document.getElementById("spawn-enemy-onflame"),
  spawnEnemyPoisoned: document.getElementById("spawn-enemy-poisoned"),
  gameOver: document.getElementById("game-over"),
  restartGame: document.getElementById("restart-game"),
  mainMenu: document.getElementById("main-menu"),
};

const buildButtons = {
  watch: ui.buildWatch,
  freeze: ui.buildFreeze,
  drone: ui.buildDrone,
  bomb: ui.buildBomb,
  laser: ui.buildLaser,
  dart: ui.buildDart,
  mine: ui.buildMine,
  wall: ui.buildWall,
  op: ui.buildOp,
};

const state = {
  lives: 20,
  maxLives: 20,
  gold: 80,
  wave: 0,
  placing: null,
  towers: [],
  enemies: [],
  projectiles: [],
  beams: [],
  explosions: [],
  selectedTower: null,
  waveInProgress: false,
  paused: false,
  pauseDrain: 0,
  lastLives: 20,
  damageFlashCooldown: 0,
  damageFlashActive: false,
  spawnTimer: 0,
  enemiesToSpawn: 0,
  easterUnlocked: false,
  keysDown: new Set(),
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
};

const path = [
  { x: 40, y: 70 },
  { x: 260, y: 70 },
  { x: 260, y: 220 },
  { x: 560, y: 220 },
  { x: 560, y: 420 },
  { x: 900, y: 420 },
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

const towerTypes = {
  watch: {
    cost: 40,
    range: 100,
    rate: 0.48,
    damage: 9,
    color: "#f59e0b",
    slow: 0,
  },
  freeze: {
    cost: 70,
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
  },
  drone: {
    cost: 80,
    range: 120,
    rate: 0.75,
    damage: 7,
    color: "#34d399",
    slow: 0,
    moveSpeed: 1.6,
    moveRadius: 22,
  },
  bomb: {
    cost: 85,
    range: 120,
    rate: 1.5,
    damage: 16,
    color: "#fb7185",
    slow: 0,
    splashRadius: 48,
    projectileSpeed: 300,
  },
  laser: {
    cost: 100,
    range: 160,
    rate: 1.6,
    damage: 12,
    color: "#ef4444",
    slow: 0,
    laser: true,
    beamWidth: 8,
    fireUnlockLevel: 1,
    fireDps: 9,
    fireDuration: 2.4,
  },
  dart: {
    cost: 75,
    range: 140,
    rate: 0.8,
    damage: 6,
    color: "#a78bfa",
    slow: 0,
    poisonDps: 10,
    poisonDuration: 4,
    projectileSpeed: 380,
  },
  mine: {
    cost: 30,
    range: 0,
    rate: 0,
    damage: 28,
    color: "#a3e635",
    slow: 0,
    allowOnPath: true,
    isMine: true,
    triggerRadius: 16,
    splashRadius: 46,
  },
  wall: {
    cost: 10,
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
  },
};

function snapToGrid(x, y) {
  const gx = Math.floor(x / grid.size) * grid.size + grid.size / 2;
  const gy = Math.floor(y / grid.size) * grid.size + grid.size / 2;
  return { x: gx, y: gy };
}

const startPoint = snapToGrid(path[0].x, path[0].y);
const endPoint = snapToGrid(path[path.length - 1].x, path[path.length - 1].y);
const startCell = worldToCell(startPoint.x, startPoint.y);
const endCell = worldToCell(endPoint.x, endPoint.y);

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

const preferredPathCells = new Set();
for (let cx = 0; cx < gridCols; cx += 1) {
  for (let cy = 0; cy < gridRows; cy += 1) {
    const { x, y } = cellToWorld(cx, cy);
    if (isPointNearPath(path, x, y, 18)) {
      preferredPathCells.add(cellKey(cx, cy));
    }
  }
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
      const score = fScore.get(key) ?? Infinity;
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
      const moveCost = preferredPathCells.has(neighborKey) ? 1 : 4;
      const tentative = (gScore.get(currentKey) ?? Infinity) + moveCost;
      if (tentative < (gScore.get(neighborKey) ?? Infinity)) {
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
  const pathPoints = buildPathPoints(startCell, endCell, blocked);
  if (!pathPoints) return false;
  state.pathPoints = pathPoints;
  updateEnemyPaths();
  return true;
}

function isOnPath(x, y) {
  const points = state.pathPoints.length > 0 ? state.pathPoints : path;
  return isPointNearPath(points, x, y, 18);
}

function updateHud() {
  ui.lives.textContent = state.lives;
  ui.gold.textContent = state.infiniteGold ? "∞" : state.gold;
  ui.wave.textContent = state.wave;
  if (ui.buildWall) {
    ui.buildWall.textContent = state.wallsPlaced === 0 ? "Wall (Free)" : "Wall (10)";
  }
}

function awardGold(amount) {
  if (state.infiniteGold) {
    state.gold = 999999;
    return;
  }
  const multiplier = state.difficultyMultipliers.gold || 1;
  state.gold += Math.max(0, Math.round(amount * multiplier));
}

function canAfford(cost) {
  return state.infiniteGold || state.gold >= cost;
}

function payCost(cost) {
  if (state.infiniteGold) return;
  state.gold -= cost;
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

function sellTower(tower) {
  const data = towerTypes[tower.type];
  const baseCost = tower.paidCost ?? (data ? data.cost : 0);
  const refund = Math.max(0, Math.floor(baseCost * 0.8));
  if (refund > 0) {
    awardGold(refund);
  }
  state.towers = state.towers.filter((entry) => entry !== tower);
  if (tower.type === "wall") {
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

function updateEncyclopedia() {
  if (!ui.encyclopedia) return;
  const enemyEntries = [
    {
      key: "grunt",
      name: "Grunt Frog",
      desc: "Standard enemy with balanced speed.",
    },
    {
      key: "speedy",
      name: "Speedy Frog",
      desc: "Very quick but not tanky.",
    },
    {
      key: "heavy",
      name: "Heavy Frog",
      desc: "Very tanky but slow.",
    },
    {
      key: "stealth",
      name: "Stealth Frog",
      desc: "Hidden until tapped. Watch towers can see it.",
    },
    {
      key: "boss",
      name: "Boss Frog",
      desc: "Huge health. Shows up every 10 waves.",
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
    lines.push("<div><strong>Tower Stats</strong><div>Watch: 40c, 100r, 0.95s, 9 dmg</div><div>Freeze: 70c, 120r, 1.3s, gas slow</div><div>Drone: 80c, 120r, 0.75s, 7 dmg</div><div>Bomb: 85c, 120r, 1.5s, 16 dmg, 48 splash</div><div>Laser: 100c, 160r, 1.6s, 12 dmg, pierce, burn upgrade</div><div>Dart: 75c, 140r, 0.8s, 6 dmg, 10 DPS poison</div><div>Mine: 30c, 28 dmg, 46 splash</div><div>Wall: 10c</div></div>");
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
}

function spawnEnemy() {
  const isBossWave = state.wave % 10 === 0;
  const roll = Math.random();
  let type = "grunt";
  if (isBossWave) {
    type = "boss";
  } else if (roll < 0.14) {
    type = "speedy";
  } else if (roll < 0.22) {
    type = "heavy";
  } else if (roll < 0.3) {
    type = "stealth";
  }
  let armored = false;
  let darkMatter = false;
  if (type !== "boss" && type !== "stealth") {
    const wallCost = state.wallsPlaced === 0 ? 0 : towerTypes.wall.cost;
    const canAffordArmor = state.gold >= Math.min(towerTypes.laser.cost + wallCost, towerTypes.bomb.cost + wallCost);
    const roll = Math.random();
    if (roll < 0.01) {
      armored = true;
      darkMatter = true;
    } else if (roll < 0.11 && canAffordArmor) {
      armored = true;
    } else if (roll < 0.21) {
      darkMatter = true;
    }
  }
  registerEnemyInEncyclopedia(type, armored, darkMatter);
  state.enemies.push(createEnemy(type, { armored, darkMatter }));
}

function registerEnemyInEncyclopedia(type, armored, darkMatter) {
  state.encyclopedia.add(type);
  if (armored) {
    state.encyclopedia.add("armored");
  }
  if (darkMatter) {
    state.encyclopedia.add("darkmatter");
  }
  if (type === "stealth") {
    state.encyclopedia.add("stealth");
  }
  updateEncyclopedia();
}

function createEnemy(type, options = {}) {
  const tier = Math.min(3, Math.floor((state.wave - 1) / 6) + 1);
  const baseHp = state.wave === 1 ? 20 : 22 + state.wave * 5;
  const hpMultiplier = (state.difficultyMultipliers.enemyHp || 1) * 2;
  const tierHp = 1 + (tier - 1) * 0.35;
  const tierSpeed = 1 + (tier - 1) * 0.06;
  const maxHpBase = type === "boss" ? baseHp * 12 : baseHp;
  const speedyHpMultiplier = type === "speedy" ? 0.7 : 1;
  const maxHp = maxHpBase * hpMultiplier * (type === "heavy" ? 2.4 : 1) * speedyHpMultiplier * tierHp;
  const baseSpeed = type === "speedy"
    ? (state.wave === 1 ? 56 : 60 + state.wave * 2.2)
    : (state.wave === 1 ? 26 : 28 + state.wave * 2.6);
  const speed = (type === "heavy" ? baseSpeed * 0.6 : baseSpeed) * tierSpeed * (type === "stealth" ? 0.9 : 1);
  const speedMultiplier = state.difficultyMultipliers.enemySpeed || 1;
  const pathPoints = state.pathPoints.length > 0 ? state.pathPoints : [startPoint, endPoint];
  const start = pathPoints[0];
  const enemy = {
    x: start.x,
    y: start.y,
    hp: maxHp,
    maxHp,
    speed: speed * speedMultiplier,
    path: pathPoints,
    pathIndex: 0,
    slowTimer: 0,
    type,
    armored: options.armored || false,
    darkMatter: options.darkMatter || false,
    dotTimer: 0,
    dotDps: 0,
    burnTimer: 0,
    burnDps: 0,
    tier,
    facing: 0,
    stealth: type === "stealth",
    revealed: type !== "stealth",
  };
  if (options.poisoned) {
    enemy.dotTimer = options.dotTimer ?? 4;
    enemy.dotDps = options.dotDps ?? (towerTypes.dart?.poisonDps || 8);
  }
  if (options.onFlame) {
    enemy.burnTimer = options.burnTimer ?? 2.5;
    enemy.burnDps = options.burnDps ?? (towerTypes.laser?.fireDps || 6);
  }
  return enemy;
}

function getEnemyPosition(enemy) {
  return { x: enemy.x, y: enemy.y };
}

function placeTower(type, x, y) {
  const data = towerTypes[type];
  if (!state.gameStarted) return;
  if (!data) return;
  if (type === "op" && state.opPlaced) return;
  const hasWall = state.towers.some((tower) => tower.type === "wall" && tower.x === x && tower.y === y);
  if (isOnPath(x, y) && !data.allowOnPath && !hasWall) return;
  if (type === "mine" && !isOnPath(x, y)) return;
  if (type !== "wall" && type !== "drone" && type !== "op" && type !== "mine") {
    if (!hasWall) return;
  }
  for (const tower of state.towers) {
    const towerX = tower.type === "drone" && Number.isFinite(tower.baseX) ? tower.baseX : tower.x;
    const towerY = tower.type === "drone" && Number.isFinite(tower.baseY) ? tower.baseY : tower.y;
    const overlap = Math.hypot(towerX - x, towerY - y) < 30;
    if (!overlap) continue;
    if (tower.type === "wall" && type !== "wall") continue;
    return;
  }
  if (data.blocksPath) {
    const cell = worldToCell(x, y);
    if ((cell.cx === startCell.cx && cell.cy === startCell.cy)
      || (cell.cx === endCell.cx && cell.cy === endCell.cy)) {
      return;
    }
    if (state.waveInProgress && !state.paused) {
      const blocked = buildBlockedSet(cell);
      const newPath = buildPathPoints(startCell, endCell, blocked);
      if (!newPath) return;
      const currentPath = state.pathPoints.length > 0 ? state.pathPoints : path;
      if (newPath.length !== currentPath.length) return;
      for (let i = 0; i < newPath.length; i += 1) {
        if (newPath[i].x !== currentPath[i].x || newPath[i].y !== currentPath[i].y) {
          return;
        }
      }
      state.pathPoints = newPath;
    } else {
      if (state.paused) {
        const blocked = buildBlockedSet(cell);
        const newPath = buildPathPoints(startCell, endCell, blocked);
        if (!newPath) return;
        for (const enemy of state.enemies) {
          if (enemy.hp <= 0) continue;
          const currentPath = enemy.path && enemy.path.length > 0 ? enemy.path : state.pathPoints;
          if (!currentPath || currentPath.length < 2) continue;
          const currentCell = worldToCell(enemy.x, enemy.y);
          const currentPoint = cellToWorld(currentCell.cx, currentCell.cy);
          const nextIndex = Math.min(enemy.pathIndex + 1, currentPath.length - 1);
          const nextPoint = currentPath[nextIndex];
          const nextCell = worldToCell(nextPoint.x, nextPoint.y);
          const nextPointCell = cellToWorld(nextCell.cx, nextCell.cy);
          let currentPathIndex = -1;
          let nextPathIndex = -1;
          for (let i = 0; i < newPath.length; i += 1) {
            const point = newPath[i];
            if (point.x === currentPoint.x && point.y === currentPoint.y) {
              currentPathIndex = i;
            }
            if (point.x === nextPointCell.x && point.y === nextPointCell.y) {
              nextPathIndex = i;
            }
          }
          if (currentPathIndex === -1 || nextPathIndex === -1) {
            return;
          }
          if (nextPathIndex !== currentPathIndex + 1) {
            return;
          }
        }
        state.pathPoints = newPath;
        updateEnemyPaths();
      } else {
        if (!recomputeGlobalPath(cell)) return;
      }
    }
  }
  const cost = type === "wall" && state.wallsPlaced === 0 ? 0 : data.cost;
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
  };
  if (data.moveSpeed) {
    tower.baseX = x;
    tower.baseY = y;
    tower.moveAngle = Math.random() * Math.PI * 2;
  }
  if (type === "op") {
    state.opPlaced = true;
    ui.buildOp.disabled = true;
  }
  if (type === "wall") {
    state.wallsPlaced += 1;
    ui.buildWall.textContent = "Wall (10)";
  }
  state.towers.push(tower);
  updateHud();
}

function getUpgradeCost(tower) {
  const baseCost = 50;
  const level = tower.level || 1;
  return baseCost * Math.pow(2, Math.max(0, level - 1));
}

function getUpgradeCostToLevel(currentLevel, targetLevel) {
  const baseCost = 50;
  let total = 0;
  for (let level = currentLevel; level < targetLevel; level += 1) {
    total += baseCost * Math.pow(2, Math.max(0, level - 1));
  }
  return total;
}

function upgradeTower(tower) {
  if (tower.type === "wall" || tower.type === "mine") return;
  if ((tower.level || 1) >= 1000) return;
  const upgradeCost = getUpgradeCost(tower);
  if (!canAfford(upgradeCost)) {
    flashButton(ui.upgradePanel);
    return;
  }
  payCost(upgradeCost);
  tower.level += 1;
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
  let fireDps = 0;
  let fireDuration = 0;

  if (tower.type === "watch") {
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
    }
  }

  return {
    data,
    range,
    damage,
    rate,
    slow: Math.min(0.85, slow),
    fireDps,
    fireDuration,
  };
}

function getTowerDescription(type) {
  switch (type) {
    case "watch":
      return "Fast single-shot line bullets. Detects stealth.";
    case "freeze":
      return "Gas clouds that spread out and slow enemies.";
    case "drone":
      return "Mobile tower that chases targets.";
    case "bomb":
      return "Explosive shots with splash damage.";
    case "laser":
      return "Piercing beam that hits lines of enemies. Upgrades add burn.";
    case "dart":
      return "Poisons enemies over time.";
    case "mine":
      return "Explodes when enemies walk over it.";
    case "wall":
      return "Blocks the path. Place towers on it.";
    case "op":
      return "Overpowered beam that deletes enemies.";
    default:
      return "";
  }
}

function updateUpgradePanel() {
  if (!ui.upgradeDetails) return;
  const tower = state.selectedTower;
  if (!tower) {
    ui.upgradeDetails.textContent = "Select a tower to see upgrade info.";
    if (ui.watchUpgradeActions) ui.watchUpgradeActions.classList.add("hidden");
    if (ui.upgradeTargetRow) ui.upgradeTargetRow.classList.add("hidden");
    if (ui.upgradeTargetAction) ui.upgradeTargetAction.classList.add("hidden");
    return;
  }
  if (tower.type === "wall" || tower.type === "mine") {
    ui.upgradeDetails.textContent = getTowerDescription(tower.type);
    if (ui.watchUpgradeActions) ui.watchUpgradeActions.classList.add("hidden");
    if (ui.upgradeTargetRow) ui.upgradeTargetRow.classList.add("hidden");
    if (ui.upgradeTargetAction) ui.upgradeTargetAction.classList.add("hidden");
    return;
  }
  const stats = getTowerStats(tower);
  const desc = getTowerDescription(tower.type);
  const nextTier = (tower.level || 1) + 1;
  const upgradeCost = getUpgradeCost(tower);
  let upgradeText = "Upgrades: +damage, +range, faster fire.";
  if (tower.type === "freeze") {
    upgradeText = "Upgrades: stronger slow + longer range.";
  }
  if (tower.type === "laser") {
    upgradeText = "Upgrades:\n+damage, +range, faster fire.";
  }
  if (tower.type === "watch") {
    const tier = Math.min(tower.level, 5);
    const path = tower.upgradePath || 1;
    const cost = getUpgradeCost(tower);
    if (path === 1) {
      upgradeText = [
        `Tier 1 (Cost ${cost}): +50% attack speed`,
        `Tier 2 (Cost ${cost}): +50% attack speed`,
        `Tier 3 (Cost ${cost}): +10% range`,
        `Tier 4 (Cost ${cost}): more speed, slightly less damage`,
        `Tier 5 (Cost ${cost}): machine gun`,
      ][tier - 1] || `Pick a path. Next cost ${cost}.`;
    } else {
      upgradeText = [
        `Tier 1 (Cost ${cost}): slightly more damage`,
        `Tier 2 (Cost ${cost}): even more damage`,
        `Tier 3 (Cost ${cost}): double range`,
        `Tier 4 (Cost ${cost}): lots of damage, slower speed`,
        `Tier 5 (Cost ${cost}): all towers see hidden`,
      ][tier - 1] || `Pick a path. Next cost ${cost}.`;
    }
  }
  const burnText = stats.fireDps > 0 ? ` | Burn ${stats.fireDps.toFixed(1)}/s (${stats.fireDuration.toFixed(1)}s)` : "";
  const statLine = `Range ${Math.round(stats.range)} | Rate ${stats.rate.toFixed(2)}s | Damage ${Math.round(stats.damage)}${tower.type === "freeze" ? ` | Slow ${stats.slow.toFixed(2)}` : ""}${burnText}`;
  if ((tower.level || 1) >= 1000) {
    ui.upgradeDetails.textContent = `MAX TIER.\n\n${desc}\n\n${tower.type === "laser" ? "From tier 3 there is burning.\n\n" : ""}${upgradeText}\n\n${statLine}`;
  } else {
    ui.upgradeDetails.textContent = `Next: Tier ${nextTier} (Cost ${upgradeCost}).\n\n${desc}\n\n${tower.type === "laser" ? "From tier 3 there is burning.\n\n" : ""}${upgradeText}\n\n${statLine}`;
  }
  if (ui.watchUpgradeActions) {
    ui.watchUpgradeActions.classList.toggle("hidden", tower.type !== "watch");
  }
  if (ui.upgradeTargetRow) {
    ui.upgradeTargetRow.classList.remove("hidden");
  }
  if (ui.upgradeTargetAction) {
    ui.upgradeTargetAction.classList.remove("hidden");
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

  let selected = null;
  const towersHere = state.towers.filter((tower) => Math.hypot(tower.x - snapped.x, tower.y - snapped.y) < 20);
  if (towersHere.length > 0) {
    selected = towersHere.find((tower) => tower.type !== "wall") || towersHere[0];
  }
  state.selectedTower = selected;
  if (state.placing) {
    placeTower(state.placing, snapped.x, snapped.y);
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
  const maxRadius = Math.max(stats.range, data.gasMaxRadius || 0, data.gasRadius || 0);
  const startRadius = Math.min(data.gasRadius || 10, maxRadius);
  if (!proj) {
    proj = {
      kind: "gas",
      owner: tower,
      x: origin.x,
      y: origin.y,
      facing: angle,
      ttl: data.gasDuration || 1.1,
      radius: startRadius,
      maxRadius,
      growRate: data.gasGrowRate || 0,
      slow: stats.slow,
      sourceType: tower.type,
    };
    state.projectiles.push(proj);
  } else {
    proj.facing = angle;
    proj.slow = stats.slow;
    proj.growRate = data.gasGrowRate || proj.growRate;
    proj.maxRadius = maxRadius;
    proj.radius = Math.min(proj.radius || startRadius, maxRadius);
  }

  proj.ttl = data.gasDuration || 1.1;
  proj.x = origin.x;
  proj.y = origin.y;
}

function fireProjectile(tower, enemy, stats) {
  const { data } = stats;
  const damage = stats.damage;
  const sourceType = tower.type;
  const poisonDps = (data.poisonDps || 0) + (tower.level - 1) * 1.5;
  const poisonDuration = data.poisonDuration ? data.poisonDuration + (tower.level - 1) * 0.2 : 0;
  if (data.projectileType === "gas") {
    emitFreezeGas(tower, enemy, stats);
    return;
  }

  if (data.splashRadius) {
    state.projectiles.push({
      kind: "bomb",
      x: tower.x,
      y: tower.y,
      target: enemy,
      speed: data.projectileSpeed || 260,
      damage,
      splashRadius: data.splashRadius,
      sourceType,
    });
    return;
  }

  state.projectiles.push({
    kind: sourceType === "watch" ? "line" : "homing",
    x: tower.x,
    y: tower.y,
    target: enemy,
    speed: data.projectileSpeed || 320,
    damage,
    slow: stats.slow,
    sourceType,
    poisonDps,
    poisonDuration,
  });
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
  const beamLength = range;
  const endX = originX + ux * beamLength;
  const endY = originY + uy * beamLength;
  const beamWidth = data.beamWidth || 6;
  const damage = stats.damage + (tower.level - 1) * 2;

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
      target.hp -= damage;
      if (stats.fireDps > 0 && stats.fireDuration > 0 && !target.darkMatter) {
        target.burnTimer = Math.max(target.burnTimer, stats.fireDuration);
        target.burnDps = Math.max(target.burnDps, stats.fireDps);
      }
      if (sourceType === "op" && data.splashRadius) {
        for (const splash of state.enemies) {
          if (splash.hp <= 0) continue;
          const splashDist = Math.hypot(splash.x - target.x, splash.y - target.y);
          if (splashDist <= data.splashRadius) {
            splash.hp -= damage * 0.5;
            if (splash.hp <= 0) {
              awardGold(15);
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
        awardGold(15);
      }
    }
  }

  state.beams.push({
    x1: originX,
    y1: originY,
    x2: endX,
    y2: endY,
    width: beamWidth,
    ttl: 0.12,
    color: data.color,
  });
}

function updateProjectiles(dt) {
  state.projectiles = state.projectiles.filter((proj) => {
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
          enemy.slowTimer = Math.max(enemy.slowTimer, 1);
          enemy.slowFactor = Math.max(enemy.slowFactor || 0, proj.slow);
        }
      }
      return proj.ttl > 0;
    }

    if (proj.kind === "bomb") {
      if (!proj.target || proj.target.hp <= 0) return false;
      const targetPos = getEnemyPosition(proj.target);
      const dx = targetPos.x - proj.x;
      const dy = targetPos.y - proj.y;
      const dist = Math.hypot(dx, dy);
      const step = proj.speed * dt;
      if (dist <= step) {
        state.explosions.push({
          x: targetPos.x,
          y: targetPos.y,
          radius: proj.splashRadius,
          ttl: 0.35,
          color: "rgba(251, 113, 133, 0.6)",
        });
        for (const enemy of state.enemies) {
          if (enemy.hp <= 0) continue;
          if (enemy.armored && proj.sourceType !== "bomb") continue;
          const splashDist = Math.hypot(enemy.x - targetPos.x, enemy.y - targetPos.y);
          if (splashDist <= proj.splashRadius) {
            enemy.hp -= proj.damage;
            if (enemy.hp <= 0) {
              awardGold(15);
            }
          }
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
      if (!(proj.target.armored && proj.sourceType !== "laser" && proj.sourceType !== "bomb" && proj.sourceType !== "op")) {
        proj.target.hp -= proj.damage;
        if (!proj.target.darkMatter && proj.poisonDuration > 0 && proj.poisonDps > 0) {
          proj.target.dotTimer = Math.max(proj.target.dotTimer, proj.poisonDuration);
          proj.target.dotDps = Math.max(proj.target.dotDps, proj.poisonDps);
        }
      }
      if (proj.slow > 0 && !proj.target.darkMatter) {
        proj.target.slowTimer = Math.max(proj.target.slowTimer, 1.5);
        proj.target.slowFactor = proj.slow;
      }
      if (proj.target.hp <= 0) {
        awardGold(15);
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
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      const pos = getEnemyPosition(enemy);
      const dist = Math.hypot(pos.x - tower.x, pos.y - tower.y);
      if (dist <= data.range && dist < nearestDist) {
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

  const drones = state.towers.filter((tower) => tower.type === "drone");
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

function updateTowers(dt) {
  updateTowerMovement(dt);
  for (const tower of state.towers) {
    const stats = getTowerStats(tower);
    if (!stats) continue;
    const data = stats.data;
    if (tower.disabled) continue;
    if (data.isMine || data.blocksPath) continue;
    tower.cooldown = Math.max(0, tower.cooldown - dt);
    const range = stats.range;
    if (tower.cooldown > 0 && tower.type !== "freeze") continue;
    let nearest = null;
    let nearestDist = Infinity;
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      if (enemy.stealth && !enemy.revealed && tower.type !== "watch" && tower.type !== "op" && !state.revealStealth) continue;
      const pos = getEnemyPosition(enemy);
      const dist = Math.hypot(pos.x - tower.x, pos.y - tower.y);
      if (dist <= range && dist < nearestDist) {
        nearest = enemy;
        nearestDist = dist;
      }
    }
    if (nearest) {
      if (tower.type === "freeze") {
        emitFreezeGas(tower, nearest, stats);
      } else if (data.laser) {
        fireLaser(tower, nearest, stats, range);
      } else {
        fireProjectile(tower, nearest, stats);
      }
      tower.cooldown = stats.rate;
    } else if (tower.type === "freeze") {
      const lingering = state.projectiles.find((entry) => entry.kind === "gas" && entry.owner === tower);
      if (lingering) {
        lingering.ttl = Math.min(lingering.ttl, 0.25);
      }
    }
  }
}

function updateEnemies(dt) {
  state.enemies = state.enemies.filter((enemy) => enemy.hp > 0);
  for (const enemy of state.enemies) {
    if (enemy.slowTimer > 0) {
      enemy.slowTimer -= dt;
    }
    if (enemy.dotTimer > 0) {
      const tick = Math.min(enemy.dotTimer, dt);
      enemy.dotTimer -= dt;
      enemy.hp -= enemy.dotDps * tick;
      if (enemy.hp <= 0) {
        awardGold(15);
        continue;
      }
    }
    if (enemy.burnTimer > 0) {
      const tick = Math.min(enemy.burnTimer, dt);
      enemy.burnTimer -= dt;
      enemy.hp -= enemy.burnDps * tick;
      if (enemy.hp <= 0) {
        awardGold(15);
        continue;
      }
    }
    const slowFactor = enemy.slowTimer > 0 ? enemy.slowFactor || 0 : 0;
    const speed = enemy.speed * (1 - slowFactor);
    const pathPoints = enemy.path && enemy.path.length > 0 ? enemy.path : state.pathPoints;
    if (!pathPoints || pathPoints.length < 2) continue;
    const nextIndex = Math.min(enemy.pathIndex + 1, pathPoints.length - 1);
    const target = pathPoints[nextIndex];
    const dx = target.x - enemy.x;
    const dy = target.y - enemy.y;
    const dist = Math.hypot(dx, dy);
    const step = speed * dt;
    if (dist <= step) {
      enemy.x = target.x;
      enemy.y = target.y;
      enemy.pathIndex = nextIndex;
      if (enemy.pathIndex >= pathPoints.length - 1) {
        state.lives -= 1;
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
          if (target.armored) continue;
          const splashDist = Math.hypot(target.x - tower.x, target.y - tower.y);
          if (splashDist <= data.splashRadius) {
            target.hp -= data.damage;
            if (target.hp <= 0) {
              awardGold(15);
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

function updateSpawner(dt) {
  if (!state.waveInProgress) return;
  state.spawnTimer -= dt * state.waveSpeed;
  if (state.spawnTimer <= 0 && state.enemiesToSpawn > 0) {
    spawnEnemy();
    state.enemiesToSpawn -= 1;
    state.spawnTimer = 0.7 / state.waveSpeed;
  }
  if (state.enemiesToSpawn === 0 && state.enemies.length === 0) {
    state.waveInProgress = false;
  }
}

function drawPath() {
  const points = state.pathPoints.length > 0 ? state.pathPoints : path;
  const lossRatio = state.maxLives > 0 ? Math.min(1, Math.max(0, 1 - state.lives / state.maxLives)) : 0;
  function lerp(a, b, t) {
    return Math.round(a + (b - a) * t);
  }
  function lerpColor(from, to, t) {
    return `rgb(${lerp(from[0], to[0], t)}, ${lerp(from[1], to[1], t)}, ${lerp(from[2], to[2], t)})`;
  }
  ctx.save();
  ctx.lineCap = "round";

  ctx.strokeStyle = lerpColor([56, 189, 248], [168, 85, 247], lossRatio);
  ctx.lineWidth = 36;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  ctx.strokeStyle = lerpColor([11, 27, 45], [59, 7, 100], lossRatio);
  ctx.lineWidth = 26;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  ctx.strokeStyle = lerpColor([34, 211, 238], [217, 70, 239], lossRatio);
  ctx.lineWidth = 3;
  ctx.setLineDash([18, 16]);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.restore();
}

function drawPortal() {
  const points = state.pathPoints.length > 0 ? state.pathPoints : path;
  const origin = points[0];
  const t = performance.now();
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

function drawCastle() {
  const points = state.pathPoints.length > 0 ? state.pathPoints : path;
  const target = points[points.length - 1];
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

function drawTowers() {
  for (const tower of state.towers) {
    const data = towerTypes[tower.type];
    if (data.blocksPath) {
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
    } else if (data.isMine) {
      ctx.fillStyle = "rgba(12, 18, 35, 0.95)";
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(16, 185, 129, 0.75)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(34, 197, 94, 0.8)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(tower.x - 6, tower.y);
      ctx.lineTo(tower.x + 6, tower.y);
      ctx.stroke();
    } else {
      if (tower.type === "watch") {
        ctx.fillStyle = "rgba(12, 18, 35, 0.95)";
        ctx.beginPath();
        ctx.moveTo(tower.x - 14, tower.y + 12);
        ctx.lineTo(tower.x + 14, tower.y + 12);
        ctx.lineTo(tower.x + 10, tower.y - 16);
        ctx.lineTo(tower.x - 10, tower.y - 16);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(34, 211, 238, 0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "rgba(56, 189, 248, 0.85)";
        ctx.fillRect(tower.x - 5, tower.y - 14, 10, 8);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
        ctx.lineWidth = 2;
        ctx.strokeRect(tower.x - 12, tower.y + 2, 24, 8);
      } else if (tower.type === "freeze") {
        const grad = ctx.createRadialGradient(tower.x - 6, tower.y - 6, 4, tower.x, tower.y, 16);
        grad.addColorStop(0, "rgba(226, 232, 240, 0.9)");
        grad.addColorStop(0.45, "rgba(56, 189, 248, 0.5)");
        grad.addColorStop(1, "rgba(12, 18, 35, 0.95)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(34, 211, 238, 0.85)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = "rgba(34, 211, 238, 0.55)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tower.x - 10, tower.y);
        ctx.lineTo(tower.x + 10, tower.y);
        ctx.moveTo(tower.x, tower.y - 10);
        ctx.lineTo(tower.x, tower.y + 10);
        ctx.stroke();
      } else if (tower.type === "drone") {
        ctx.fillStyle = "rgba(12, 18, 35, 0.95)";
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(34, 211, 238, 0.7)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.strokeStyle = "rgba(34, 211, 238, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tower.x - 18, tower.y);
        ctx.lineTo(tower.x - 8, tower.y);
        ctx.moveTo(tower.x + 18, tower.y);
        ctx.lineTo(tower.x + 8, tower.y);
        ctx.moveTo(tower.x, tower.y - 18);
        ctx.lineTo(tower.x, tower.y - 8);
        ctx.moveTo(tower.x, tower.y + 18);
        ctx.lineTo(tower.x, tower.y + 8);
        ctx.stroke();
        ctx.fillStyle = "rgba(56, 189, 248, 0.75)";
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (tower.type === "bomb") {
        ctx.fillStyle = "rgba(12, 18, 35, 0.95)";
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(248, 113, 113, 0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "rgba(248, 113, 113, 0.8)";
        ctx.beginPath();
        ctx.arc(tower.x + 4, tower.y - 5, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(251, 146, 60, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tower.x - 8, tower.y + 2);
        ctx.lineTo(tower.x + 8, tower.y + 2);
        ctx.stroke();
      } else if (tower.type === "laser") {
        ctx.fillStyle = "rgba(12, 18, 35, 0.95)";
        ctx.fillRect(tower.x - 10, tower.y - 16, 20, 28);
        ctx.fillStyle = "rgba(239, 68, 68, 0.9)";
        ctx.fillRect(tower.x - 4, tower.y - 22, 8, 10);
        ctx.strokeStyle = "rgba(248, 113, 113, 0.8)";
        ctx.lineWidth = 2;
        ctx.strokeRect(tower.x - 10, tower.y - 16, 20, 28);
        ctx.strokeStyle = "rgba(248, 113, 113, 0.7)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tower.x - 8, tower.y + 6);
        ctx.lineTo(tower.x + 8, tower.y + 6);
        ctx.stroke();
      } else if (tower.type === "dart") {
        ctx.fillStyle = "rgba(12, 18, 35, 0.95)";
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(129, 140, 248, 0.85)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.strokeStyle = "rgba(129, 140, 248, 0.9)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tower.x - 10, tower.y + 6);
        ctx.lineTo(tower.x + 12, tower.y - 8);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(tower.x - 10, tower.y - 6);
        ctx.lineTo(tower.x + 12, tower.y + 8);
        ctx.stroke();
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
        ctx.fillStyle = "rgba(12, 18, 35, 0.95)";
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    if (tower.disabled) {
      ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
      ctx.fillRect(tower.x - 16, tower.y - 16, 32, 32);
    }

    if (data.moveSpeed) {
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

function drawEnemies() {
  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function drawSphere(x, y, radius, baseColor) {
    const gradient = ctx.createRadialGradient(x - radius * 0.4, y - radius * 0.4, radius * 0.2, x, y, radius);
    gradient.addColorStop(0, "#f8fafc");
    gradient.addColorStop(0.25, baseColor);
    gradient.addColorStop(1, "#0b1020");
    ctx.fillStyle = gradient;
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

  function drawTrianglePrism(x, y, size, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    const offset = { x: 4, y: 4 };
    ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
    ctx.beginPath();
    ctx.moveTo(size + offset.x, offset.y);
    ctx.lineTo(-size * 0.8 + offset.x, size * 0.7 + offset.y);
    ctx.lineTo(-size * 0.8 + offset.x, -size * 0.7 + offset.y);
    ctx.closePath();
    ctx.fill();
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

  function drawPentagonPrism(x, y, radius, color) {
    const offsetX = 4;
    const offsetY = 4;
    ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
    ctx.beginPath();
    for (let i = 0; i < 5; i += 1) {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / 5;
      const px = x + Math.cos(angle) * radius + offsetX;
      const py = y + Math.sin(angle) * radius + offsetY;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
    drawPentagon(x, y, radius, color);
  }

  for (const enemy of state.enemies) {
    const pos = getEnemyPosition(enemy);
    if (enemy.stealth && !enemy.revealed) {
      ctx.save();
      ctx.globalAlpha = 0.35;
    }
    const tierScale = 1 + (enemy.tier - 1) * 0.18;
    const baseRadius = enemy.type === "boss" ? 20 : enemy.type === "heavy" ? 16 : 12;
    const radius = baseRadius * tierScale;
    let baseColor = enemy.type === "boss"
      ? "#f43f5e"
      : enemy.type === "speedy"
        ? "#facc15"
        : enemy.type === "heavy"
          ? "#a855f7"
          : "#fb923c";
    if (enemy.darkMatter) {
      baseColor = "#241729";
    } else if (enemy.dotTimer > 0) {
      baseColor = "#b65bff";
    } else if (enemy.burnTimer > 0) {
      baseColor = "#f97316";
    }

    if (enemy.type === "speedy") {
      drawTrianglePrism(pos.x, pos.y, radius, enemy.facing, baseColor);
    } else if (enemy.type === "heavy") {
      drawPentagonPrism(pos.x, pos.y, radius, baseColor);
    } else {
      drawSphere(pos.x, pos.y, radius, baseColor);
    }

    if (enemy.armored) {
      drawPentagonShield(pos.x, pos.y, radius + 6, "#a855f7");
    }

    if (enemy.armored) {
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 2, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (enemy.darkMatter) {
      ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(99, 45, 151, 0.85)";
      ctx.lineWidth = 2;
      const bolts = 4;
      for (let i = 0; i < bolts; i += 1) {
        const startAngle = Math.random() * Math.PI * 2;
        const segments = 6;
        ctx.beginPath();
        for (let s = 0; s <= segments; s += 1) {
          const angle = startAngle + s * 0.4 + randomBetween(-0.2, 0.2);
          const r = radius + 5 + randomBetween(-2, 4);
          const x = pos.x + Math.cos(angle) * r;
          const y = pos.y + Math.sin(angle) * r;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    if (enemy.burnTimer > 0) {
      ctx.strokeStyle = "rgba(249, 115, 22, 0.6)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 4, 0, Math.PI * 2);
      ctx.stroke();
      const sparks = 5;
      for (let i = 0; i < sparks; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const r = randomBetween(2, radius + 2);
        const x = pos.x + Math.cos(angle) * r;
        const y = pos.y + Math.sin(angle) * r;
        const flameSize = randomBetween(2, 4);
        const flameAngle = randomBetween(-0.6, 0.6);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(flameAngle);
        ctx.fillStyle = "rgba(249, 115, 22, 0.85)";
        ctx.beginPath();
        ctx.moveTo(0, -flameSize);
        ctx.lineTo(flameSize * 0.7, flameSize * 0.7);
        ctx.lineTo(-flameSize * 0.7, flameSize * 0.7);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgba(251, 191, 36, 0.75)";
        ctx.beginPath();
        ctx.moveTo(0, -flameSize * 0.6);
        ctx.lineTo(flameSize * 0.4, flameSize * 0.6);
        ctx.lineTo(-flameSize * 0.4, flameSize * 0.6);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    if (enemy.dotTimer > 0) {
      const skulls = 3;
      for (let i = 0; i < skulls; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const r = randomBetween(2, radius + 2);
        const x = pos.x + Math.cos(angle) * r;
        const y = pos.y + Math.sin(angle) * r;
        ctx.fillStyle = "rgba(168, 85, 247, 0.9)";
        ctx.beginPath();
        ctx.arc(x, y, randomBetween(1.6, 3.2), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(15, 23, 42, 0.7)";
        ctx.beginPath();
        ctx.arc(x - 0.9, y - 0.5, 0.6, 0, Math.PI * 2);
        ctx.arc(x + 0.9, y - 0.5, 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
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
      const gradient = ctx.createRadialGradient(proj.x, proj.y, proj.radius * 0.2, proj.x, proj.y, proj.radius);
      gradient.addColorStop(0, "rgba(186, 230, 253, 0.38)");
      gradient.addColorStop(1, "rgba(125, 211, 252, 0.12)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
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
    ctx.lineWidth = 3;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(explosion.x, explosion.y, explosion.radius * (1 - explosion.ttl * 0.6), 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
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
  const hasWall = state.towers.some((tower) => tower.type === "wall" && tower.x === snapped.x && tower.y === snapped.y);
  const invalidPath = isOnPath(snapped.x, snapped.y) && !data.allowOnPath && !hasWall;
  const requiresWall = state.placing !== "wall" && state.placing !== "drone" && state.placing !== "op" && state.placing !== "mine";
  const invalidWall = requiresWall && !hasWall;
  const invalidMine = state.placing === "mine" && !isOnPath(snapped.x, snapped.y);
  const invalid = invalidPath || invalidWall || invalidMine;
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
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#200b3b");
  gradient.addColorStop(0.5, "#130820");
  gradient.addColorStop(1, "#0c0516");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const shadow of state.shadowSeeds) {
    const x = (shadow.x + performance.now() * 0.02 * shadow.speed) % (canvas.width + 120) - 60;
    const y = (shadow.y + performance.now() * 0.015 * shadow.speed) % (canvas.height + 120) - 60;
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
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
  drawBackground();
  drawTowers();
  drawEnemies();
  drawProjectiles();
  drawExplosions();
  drawBeams();
  drawPlacementPreview();
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
  updateEnemies(dt);
  updateMines();
  updateTowers(dt);
  updateProjectiles(dt);
  updateExplosions(dt);
  updateBeams(dt);
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

function loop(now) {
  const dt = Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

canvas.addEventListener("click", handleClick);
canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  state.mouse.x = ((event.clientX - rect.left) / rect.width) * canvas.width;
  state.mouse.y = ((event.clientY - rect.top) / rect.height) * canvas.height;
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

ui.buildDart.addEventListener("click", () => {
  const cost = towerTypes.dart.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.dart);
    return;
  }
  state.placing = "dart";
});

ui.buildMine.addEventListener("click", () => {
  const cost = towerTypes.mine.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.mine);
    return;
  }
  state.placing = "mine";
});

ui.buildWall.addEventListener("click", () => {
  const cost = state.wallsPlaced === 0 ? 0 : towerTypes.wall.cost;
  if (!canAfford(cost)) {
    flashButton(buildButtons.wall);
    return;
  }
  state.placing = "wall";
});

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
    if (!state.waveInProgress) return;
    if (!state.paused) {
      if (!state.infiniteGold && state.gold <= 0) {
        flashButton(ui.pauseWave);
        return;
      }
      state.paused = true;
    } else {
      state.paused = false;
    }
    ui.pauseWave.textContent = state.paused ? "Resume Wave" : "Pause Wave";
    if (ui.playArea) {
      ui.playArea.classList.toggle("paused-glitch", state.paused);
    }
  });
}

if (ui.upgradePanel) {
  ui.upgradePanel.addEventListener("mousedown", (event) => {
    const tag = event.target?.tagName?.toLowerCase();
    if (tag === "input" || tag === "button" || tag === "select" || tag === "label") return;
    event.preventDefault();
  });
  ui.upgradePanel.addEventListener("click", (event) => {
    const tag = event.target?.tagName?.toLowerCase();
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
    if (tower.type === "wall" || tower.type === "mine") return;
    const current = tower.level || 1;
    const targetRaw = Number.parseInt(ui.upgradeTarget?.value || `${current}`, 10);
    if (!Number.isFinite(targetRaw)) return;
    const target = Math.max(1, Math.min(1000, targetRaw));
    if (target <= current) return;
    const totalCost = getUpgradeCostToLevel(current, target);
    if (!canAfford(totalCost)) {
      flashButton(ui.upgradeTo);
      return;
    }
    payCost(totalCost);
    tower.level = target;
    updateHud();
  });
}

if (ui.watchPath1) {
  ui.watchPath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "watch") return;
    state.selectedTower.upgradePath = 1;
    upgradeTower(state.selectedTower);
  });
}

if (ui.watchPath2) {
  ui.watchPath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "watch") return;
    state.selectedTower.upgradePath = 2;
    upgradeTower(state.selectedTower);
  });
}

if (ui.applyWave) {
  ui.applyWave.addEventListener("click", () => {
    if (!state.infiniteGold) return;
    const value = Number.parseInt(ui.setWave?.value || "1", 10);
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
    if (!state.infiniteGold) return;
    const value = Number.parseFloat(ui.waveSpeed.value);
    state.waveSpeed = Number.isFinite(value) ? value : 1;
  });
}

if (ui.autoWave) {
  ui.autoWave.addEventListener("click", () => {
    if (!state.infiniteGold) return;
    state.autoWave = !state.autoWave;
    ui.autoWave.textContent = `Auto Next Wave: ${state.autoWave ? "On" : "Off"}`;
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
    ui.encyclopediaModal?.classList.add("hidden");
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
    ui.tipsModal?.classList.remove("hidden");
  });
}

if (ui.closeTips) {
  ui.closeTips.addEventListener("click", () => {
    ui.tipsModal?.classList.add("hidden");
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

if (ui.openJasper) {
  ui.openJasper.addEventListener("click", () => {
    if (!state.infiniteGold) return;
    ui.jasperModal?.classList.remove("hidden");
  });
}

if (ui.closeJasper) {
  ui.closeJasper.addEventListener("click", () => {
    ui.jasperModal?.classList.add("hidden");
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
    const type = ui.spawnEnemyType?.value || "grunt";
    const count = Math.max(1, Number.parseInt(ui.spawnEnemyCount?.value || "1", 10));
    const armored = Boolean(ui.spawnEnemyArmored?.checked);
    const darkMatter = Boolean(ui.spawnEnemyDarkMatter?.checked);
    const onFlame = Boolean(ui.spawnEnemyOnFlame?.checked);
    const poisoned = Boolean(ui.spawnEnemyPoisoned?.checked);
    for (let i = 0; i < count; i += 1) {
      registerEnemyInEncyclopedia(type, armored, darkMatter);
      state.enemies.push(createEnemy(type, { armored, darkMatter, onFlame, poisoned }));
    }
  });
}

const titleScreen = document.getElementById("title-screen");
if (titleScreen) {
  const buttons = titleScreen.querySelectorAll("[data-difficulty]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const difficulty = button.dataset.difficulty;
      if (difficulty === "easy") {
        state.difficultyMultipliers = { enemyHp: 0.85, enemySpeed: 0.9, gold: 1.2 };
      } else if (difficulty === "hard") {
        state.difficultyMultipliers = { enemyHp: 1.25, enemySpeed: 1.1, gold: 0.9 };
      } else {
        state.difficultyMultipliers = { enemyHp: 1, enemySpeed: 1, gold: 1 };
      }
      state.difficulty = difficulty;
      state.gameStarted = true;
      titleScreen.classList.add("hidden");
      if (ui.gameOver) ui.gameOver.classList.add("hidden");
      updateHud();
    });
  });
}

if (ui.encyclopediaModal) {
  ui.encyclopediaModal.classList.add("hidden");
}

if (ui.tipsModal) {
  ui.tipsModal.classList.add("hidden");
}

if (ui.jasperModal) {
  ui.jasperModal.classList.add("hidden");
}

function resetGame() {
  state.lives = 20;
  state.maxLives = 20;
  state.gold = 80;
  state.wave = 0;
  state.placing = null;
  state.towers = [];
  state.enemies = [];
  state.projectiles = [];
  state.beams = [];
  state.explosions = [];
  state.selectedTower = null;
  state.waveInProgress = false;
  state.paused = false;
  state.pauseDrain = 0;
  state.lastLives = state.lives;
  state.damageFlashCooldown = 0;
  state.damageFlashActive = false;
  state.spawnTimer = 0;
  state.enemiesToSpawn = 0;
  state.easterUnlocked = false;
  state.keysDown.clear();
  state.opPlaced = false;
  state.pathPoints = [];
  state.wallsPlaced = 0;
  state.controlledDrone = null;
  state.encyclopedia.clear();
  state.revealStealth = false;
  state.autoWave = false;
  state.waveSpeed = 1;
  state.infiniteGold = false;
  state.keyBuffer = "";
  state.jasperProgress = 0;
  if (ui.jasperControls) ui.jasperControls.classList.add("hidden");
  if (ui.autoWave) ui.autoWave.textContent = "Auto Next Wave: Off";
  if (ui.waveSpeed) ui.waveSpeed.value = "1";
  if (ui.setWave) ui.setWave.value = "1";
  if (ui.buildOp) ui.buildOp.classList.add("hidden");
  if (ui.buildOp) ui.buildOp.disabled = false;
  if (ui.openJasper) ui.openJasper.classList.add("hidden");
  if (ui.pauseWave) ui.pauseWave.textContent = "Pause Wave";
  if (ui.playArea) ui.playArea.classList.remove("paused-glitch");
  if (ui.encyclopediaModal) ui.encyclopediaModal.classList.add("hidden");
  if (ui.tipsModal) ui.tipsModal.classList.add("hidden");
  if (ui.jasperModal) ui.jasperModal.classList.add("hidden");
  recomputeGlobalPath();
  updateHud();
  updateEncyclopedia();
}

if (ui.restartGame) {
  ui.restartGame.addEventListener("click", () => {
    resetGame();
    if (ui.gameOver) ui.gameOver.classList.add("hidden");
  });
}

if (ui.mainMenu) {
  ui.mainMenu.addEventListener("click", () => {
    resetGame();
    if (ui.gameOver) ui.gameOver.classList.add("hidden");
    if (titleScreen) titleScreen.classList.remove("hidden");
  });
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
    startWave();
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
    tryUnlockOpTower();
    tryUnlockInfiniteGold();
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (key.length === 1 && key >= "a" && key <= "z") {
    state.keysDown.delete(key);
  }
});

window.addEventListener("blur", () => {
  state.keysDown.clear();
  state.keyBuffer = "";
  state.jasperProgress = 0;
});

canvas.addEventListener("dblclick", () => {
  if (state.selectedTower) {
    upgradeTower(state.selectedTower);
  }
});

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
  const snapped = snapToGrid(x, y);
  const towersHere = state.towers.filter((entry) => Math.hypot(entry.x - snapped.x, entry.y - snapped.y) < 20);
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
  const towersHere = state.towers.filter((entry) => Math.hypot(entry.x - snapped.x, entry.y - snapped.y) < 20);
  if (towersHere.length === 0) return;
  const target = towersHere.find((tower) => tower.type !== "wall") || towersHere[0];
  target.disabled = !target.disabled;
});

recomputeGlobalPath();
updateHud();
requestAnimationFrame(loop);
