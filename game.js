const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const nukeImage = new Image();
nukeImage.src = "./assets/nuke.png";

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
  buildMine: document.getElementById("build-mine"),
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
  flame: ui.buildFlame,
  dart: ui.buildDart,
  trap: ui.buildTrap,
  mine: ui.buildMine,
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
  flames: [],
  traps: [],
  selectedTower: null,
  selectedTrap: null,
  waveInProgress: false,
  paused: false,
  pauseDrain: 0,
  lastLives: 20,
  damageFlashCooldown: 0,
  damageFlashActive: false,
  nukeUsed: false,
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
  portalClock: 0,
  nukeLaunches: [],
  nukeParticles: [],
  screenShakeTime: 0,
  screenShakeDuration: 0,
  screenShakePower: 0,
  radioactiveWave: null,
  nukeCharges: 0,
  nukeSmoke: null,
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

function isWallAdjacentToPath(x, y) {
  const offsets = [
    { x: grid.size, y: 0 },
    { x: -grid.size, y: 0 },
    { x: 0, y: grid.size },
    { x: 0, y: -grid.size },
  ];
  return offsets.some((offset) => isOnPath(x + offset.x, y + offset.y));
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
    damage: 10,
    color: "#34d399",
    slow: 0,
    moveSpeed: 1.6,
    moveRadius: 22,
  },
  bomb: {
    cost: 85,
    range: 120,
    rate: 1.5,
    damage: 18,
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
  flame: {
    cost: 90,
    range: 70,
    rate: 0.22,
    damage: 28,
    color: "#f97316",
    slow: 0,
    coneAngle: 0.7,
    burnDps: 12,
    burnDuration: 2.4,
  },
  trap: {
    cost: 95,
    range: 0,
    rate: 0,
    damage: 0,
    color: "#f59e0b",
    slow: 0,
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
  const availableNukes = state.nukeCharges;
  ui.lives.textContent = state.lives;
  ui.gold.textContent = state.infiniteGold ? "∞" : state.gold;
  ui.wave.textContent = state.wave;
  if (ui.buildWall) {
    ui.buildWall.textContent = state.wallsPlaced === 0 ? "Wall (Free)" : "Wall (10)";
  }
  if (ui.nukeButton) {
    ui.nukeButton.disabled = availableNukes === 0;
  }
  if (ui.nukeCount) {
    ui.nukeCount.textContent = `Nukes: ${availableNukes}`;
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

function getWallUpgradeCost() {
  return 50;
}

function sellTower(tower) {
  const data = towerTypes[tower.type];
  const baseCost = tower.paidCost ?? (data ? data.cost : 0);
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

function getTrapUpgradeCost(trap) {
  const baseCost = 35;
  const level = trap.level || 1;
  return Math.round(baseCost * Math.pow(1.6, Math.max(0, level - 1)));
}

function upgradeTrap(trap) {
  return;
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
    {
      key: "labrat",
      name: "Lab Rat",
      desc: "Slightly squishy octagon. Immune to nukes.",
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
    lines.push("<div><strong>Tower Stats</strong><div>Watch: 40c, 100r, 0.95s, 9 dmg</div><div>Freeze: 70c, 120r, 1.3s, gas slow</div><div>Drone: 80c, 120r, 0.75s, 10 dmg</div><div>Bomb: 85c, 120r, 1.5s, 18 dmg, 48 splash</div><div>Laser: 100c, 160r, 1.6s, 12 dmg, pierce, burn upgrade</div><div>Dart: 75c, 140r, 0.8s, 6 dmg, 10 DPS poison</div><div>Mine: 30c, 28 dmg, 46 splash</div><div>Wall: 10c</div></div>");
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

function togglePauseWave() {
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
  if (ui.pauseWave) {
    ui.pauseWave.textContent = state.paused ? "Resume Wave" : "Pause Wave";
  }
  if (ui.playArea) {
    ui.playArea.classList.toggle("paused-glitch", state.paused);
  }
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
  } else if (roll < 0.36) {
    type = "labrat";
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
  let maxHp = maxHpBase * hpMultiplier * (type === "heavy" ? 2.4 : 1) * speedyHpMultiplier * tierHp;
  const baseSpeed = type === "speedy"
    ? (state.wave === 1 ? 56 : 60 + state.wave * 2.2)
    : (state.wave === 1 ? 26 : 28 + state.wave * 2.6);
  let speed = (type === "heavy" ? baseSpeed * 0.6 : baseSpeed) * tierSpeed * (type === "stealth" ? 0.9 : 1);
  if (type === "labrat") {
    maxHp *= 0.9;
    speed *= 1.05;
  }
  const speedMultiplier = state.difficultyMultipliers.enemySpeed || 1;
  const radioactive = state.radioactiveWave === state.wave;
  if (radioactive) {
    maxHp *= 0.5;
    speed *= 0.5;
  }
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
    embrittleTimer: 0,
    embrittleMultiplier: 1,
    tier,
    facing: 0,
    stealth: type === "stealth",
    revealed: type !== "stealth",
    radioactive,
    revealTimer: 0,
    nukeImmune: type === "labrat",
  };
  if (enemy.armored) {
    enemy.armorHits = 0;
    enemy.armorBreakThreshold = 2 + Math.floor(Math.random() * 2);
  }
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
  const hasWall = state.towers.some((tower) => tower.type === "wall" && !tower.spiky && tower.x === x && tower.y === y);
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
    if (tower.type === "wall" && type !== "wall") {
      if (!tower.spiky) continue;
      return;
    }
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
    targeting: "first",
  };
  if (type === "trap") {
    tower.upgradePath = 1;
    tower.trapCooldown = 0;
  }
  if (type === "flame") {
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
  const level = tower.level || 1;
  if (tower.type === "bomb" && level >= 5) return;
  if (level >= 5) return;
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
  let laserBeamTtl = 0.12;
  let laserBeamWidth = data.beamWidth || 6;
  let laserDamageMult = 1;
  let laserChargeTime = 0;
  let laserCannonMult = 1;
  let laserContinuous = false;
  let laserEnergyMax = 0;
  let laserEnergyDrain = 0;
  let laserRechargeTime = 0;
  let laserStun = 0;
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
      const tier = Math.min(level, 5);
      const path = tower.upgradePath || 1;
      if (path === 1) {
        if (tier >= 1) {
          laserBeamTtl *= 1.6;
        }
        if (tier >= 2) {
          range += 40;
        }
        if (tier >= 3) {
          laserContinuous = true;
          laserEnergyMax = 3.6;
          laserEnergyDrain = 1;
          laserRechargeTime = 3;
        }
        if (tier >= 4) {
          laserDamageMult *= 1.5;
          fireDps *= 1.35;
          fireDuration += 0.6;
          laserEnergyDrain *= 0.75;
        }
        if (tier >= 5) {
          laserDamageMult *= 1.8;
          fireDps *= 1.7;
          fireDuration += 1.2;
          laserBeamTtl *= 1.4;
          laserEnergyMax *= 1.6;
          laserRechargeTime = 1;
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
          laserBeamWidth += 1;
        }
        if (tier >= 4) {
          laserChargeTime = 1;
          laserCannonMult = 2.6;
          laserBeamTtl *= 1.4;
        }
        if (tier >= 5) {
          laserChargeTime = 0.9;
          laserCannonMult = 3.2;
          laserStun = 0.6;
          fireDps *= 1.6;
          fireDuration += 1.2;
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
          droneMiniCount = 2;
          droneGuns = 4;
          rate *= 0.75;
        }
        if (tier >= 5) {
          rate *= 0.65;
          droneBombDamage = damage * 2.2;
          droneBombRadius = 60;
          droneBombRate = 2.2;
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
    laserBeamTtl,
    laserBeamWidth,
    laserDamageMult,
    laserChargeTime,
    laserCannonMult,
    laserContinuous,
    laserEnergyMax,
    laserEnergyDrain,
    laserRechargeTime,
    laserStun,
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
  if (state.selectedTrap) {
    const trap = state.selectedTrap;
    const typeLabel = trap.explode ? "Explosive Trap" : trap.turret ? "Turret Trap" : "Spike Trap";
    const radiusText = trap.explode ? ` | Radius ${Math.round(trap.splashRadius || 0)}` : "";
    ui.upgradeDetails.textContent = `Trap: ${typeLabel}\n\nDamage ${Math.round(trap.damage)}${radiusText}\n\nTraps cannot be upgraded.`;
    if (ui.watchUpgradeActions) ui.watchUpgradeActions.classList.add("hidden");
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
    if (ui.upgradeTargetRow) ui.upgradeTargetRow.classList.add("hidden");
    if (ui.upgradeTargetAction) ui.upgradeTargetAction.classList.add("hidden");
    if (ui.targetingRow) ui.targetingRow.classList.add("hidden");
    if (ui.wallUpgradeAction) ui.wallUpgradeAction.classList.add("hidden");
    if (ui.trapUpgradeAction) ui.trapUpgradeAction.classList.add("hidden");
    if (ui.laserUpgradeActions) ui.laserUpgradeActions.classList.add("hidden");
    if (ui.flameUpgradeActions) ui.flameUpgradeActions.classList.add("hidden");
    if (ui.droneUpgradeActions) ui.droneUpgradeActions.classList.add("hidden");
    return;
  }
  if (tower.type === "wall") {
    const hasNonWall = state.towers.some((entry) => entry !== tower && entry.type !== "wall" && entry.x === tower.x && entry.y === tower.y);
    const canUpgrade = !tower.spiky && isWallAdjacentToPath(tower.x, tower.y) && !hasNonWall;
    const cost = getWallUpgradeCost();
    const reason = tower.spiky
      ? "This wall is already spiky."
      : hasNonWall
        ? "Remove the tower on this wall to upgrade it."
        : !isWallAdjacentToPath(tower.x, tower.y)
          ? "Wall must be next to the road to upgrade."
          : "";
    ui.upgradeDetails.textContent = `Wall\n\n${tower.spiky ? "Spiky wall (cannot hold towers)." : "Plain wall (can hold towers)."}\n\nUpgrade: Spikes.\n\n${canUpgrade ? `Cost ${cost}` : reason}`;
    if (ui.watchUpgradeActions) ui.watchUpgradeActions.classList.add("hidden");
    if (ui.upgradeTargetRow) ui.upgradeTargetRow.classList.add("hidden");
    if (ui.upgradeTargetAction) ui.upgradeTargetAction.classList.add("hidden");
    if (ui.targetingRow) ui.targetingRow.classList.add("hidden");
    if (ui.wallUpgradeAction) ui.wallUpgradeAction.classList.toggle("hidden", !canUpgrade);
    if (ui.trapUpgradeAction) ui.trapUpgradeAction.classList.add("hidden");
    if (ui.laserUpgradeActions) ui.laserUpgradeActions.classList.add("hidden");
    if (ui.droneUpgradeActions) ui.droneUpgradeActions.classList.add("hidden");
    return;
  }
  if (tower.type === "mine") {
    ui.upgradeDetails.textContent = getTowerDescription(tower.type);
    if (ui.watchUpgradeActions) ui.watchUpgradeActions.classList.add("hidden");
    if (ui.upgradeTargetRow) ui.upgradeTargetRow.classList.add("hidden");
    if (ui.upgradeTargetAction) ui.upgradeTargetAction.classList.add("hidden");
    if (ui.targetingRow) ui.targetingRow.classList.add("hidden");
    if (ui.wallUpgradeAction) ui.wallUpgradeAction.classList.add("hidden");
    if (ui.trapUpgradeAction) ui.trapUpgradeAction.classList.add("hidden");
    if (ui.laserUpgradeActions) ui.laserUpgradeActions.classList.add("hidden");
    if (ui.droneUpgradeActions) ui.droneUpgradeActions.classList.add("hidden");
    return;
  }
  const stats = getTowerStats(tower);
  const desc = getTowerDescription(tower.type);
  const nextTier = (tower.level || 1) + 1;
  const upgradeCost = getUpgradeCost(tower);
  let upgradeText = "Upgrades: +damage, +range, faster fire, faster bullets.";
  const bombMaxed = tower.type === "bomb" && (tower.level || 1) >= 5;
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
  const burnText = stats.fireDps > 0 ? ` | Burn ${stats.fireDps.toFixed(1)}/s (${stats.fireDuration.toFixed(1)}s)` : "";
  const speedText = stats.projectileSpeed ? ` | Shot Spd ${Math.round(stats.projectileSpeed)}` : "";
  const statLine = `Range ${Math.round(stats.range)} | Rate ${stats.rate.toFixed(2)}s | Damage ${Math.round(stats.damage)}${tower.type === "freeze" ? ` | Slow ${stats.slow.toFixed(2)}` : ""}${speedText}${burnText}`;
  if (bombMaxed) {
    ui.upgradeDetails.textContent = `MAX TIER.\n\n${desc}\n\n${upgradeText}\n\n${statLine}`;
  } else if ((tower.level || 1) >= 5) {
    ui.upgradeDetails.textContent = `MAX TIER.\n\n${desc}\n\n${tower.type === "laser" ? "From tier 3 there is burning.\n\n" : ""}${upgradeText}\n\n${statLine}`;
  } else {
    ui.upgradeDetails.textContent = `Next: Tier ${nextTier} (Cost ${upgradeCost}).\n\n${desc}\n\n${tower.type === "laser" ? "From tier 3 there is burning.\n\n" : ""}${upgradeText}\n\n${statLine}`;
  }
  if (ui.watchUpgradeActions) {
    ui.watchUpgradeActions.classList.toggle("hidden", tower.type !== "watch");
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

  let selected = null;
  const towersHere = state.towers.filter((tower) => Math.hypot(tower.x - snapped.x, tower.y - snapped.y) < 20);
  if (state.placing) {
    const hasNonWall = towersHere.some((tower) => tower.type !== "wall");
    if (!hasNonWall) {
      placeTower(state.placing, snapped.x, snapped.y);
      return;
    }
  }
  if (towersHere.length > 0) {
    selected = towersHere.find((tower) => tower.type !== "wall") || towersHere[0];
  }
  state.selectedTower = selected;
  state.selectedTrap = null;
  if (selected) {
    state.placing = null;
    return;
  }
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
  const embrittlementPercent = sourceType === "dart"
    ? 0.05 + Math.max(0, tower.level - 1) * 0.02
    : 0;
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
    if (miniCount > 0) {
      const miniDamage = damage * (stats.droneMiniDamageMult || 0.7);
      for (let i = 0; i < miniCount; i += 1) {
        const angle = (i / miniCount) * Math.PI * 2;
        const ox = tower.x + Math.cos(angle) * 16;
        const oy = tower.y + Math.sin(angle) * 16;
        fireHoming(ox, oy, miniDamage, bulletSpeed * 0.95);
      }
    }
    if (stats.droneMissiles > 0) {
      const missileSpeed = stats.droneMissileSpeed || 280;
      const missileDamage = stats.droneMissileDamage || damage * 1.1;
      const missileSplash = stats.droneMissileSplash || 30;
      for (let i = 0; i < stats.droneMissiles; i += 1) {
        state.projectiles.push({
          kind: "bomb",
          x: tower.x,
          y: tower.y,
          target: enemy,
          speed: missileSpeed,
          damage: missileDamage,
          splashRadius: missileSplash,
          sourceType,
          armorPierce: true,
        });
      }
    }
    return;
  }

  if (data.splashRadius) {
    state.projectiles.push({
      kind: "bomb",
      x: tower.x,
      y: tower.y,
      target: enemy,
      speed: stats.projectileSpeed || data.projectileSpeed || 260,
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
    speed: stats.projectileSpeed || data.projectileSpeed || 320,
    damage,
    slow: stats.slow,
    sourceType,
    poisonDps,
    poisonDuration,
    embrittlementPercent,
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
      if (stats.fireDps > 0 && stats.fireDuration > 0 && !target.darkMatter) {
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
    ttl: stats.laserBeamTtl || 0.12,
    color: data.color,
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
    applyDamage(target, damage * (depth > 0 ? Math.pow(spreadPower || 0.6, depth) : 1));
    if (!target.darkMatter) {
      target.burnTimer = Math.max(target.burnTimer, burnDuration);
      target.burnDps = Math.max(target.burnDps, burnDps);
    }
    if (stats.flameReveal) {
      target.revealed = true;
      target.revealTimer = Math.max(target.revealTimer || 0, 3);
    }
    if (stats.flamePermanentReveal) {
      target.stealth = false;
      target.revealed = true;
    }
    if (stats.flameArmorMelt && target.armored) {
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
  spawnNukeEmbers(originX + Math.cos(angle) * 18, originY + Math.sin(angle) * 18, 6);
}

function updateProjectiles(dt) {
  if (state.nukeSmoke) {
    state.projectiles = [];
    return;
  }
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
          if (enemy.armored && proj.sourceType !== "bomb" && !proj.armorPierce) continue;
          const splashDist = Math.hypot(enemy.x - targetPos.x, enemy.y - targetPos.y);
          if (splashDist <= proj.splashRadius) {
            if (enemy.armored && (proj.sourceType === "bomb" || proj.armorPierce)) {
              applyArmorHit(enemy);
            }
            applyDamage(enemy, proj.damage);
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
        applyDamage(splash, trap.damage);
        if (splash.hp <= 0) {
          awardGold(15);
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
            awardGold(15);
          }
        }
        triggered = true;
        break;
      }
    }
    if (!triggered) {
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

function getTrapSetterStats(tower) {
  const level = tower.level || 1;
  const tier = Math.min(level, 5);
  const path = tower.upgradePath || 1;
  let trapInterval = 4;
  let trapLifetime = 30;
  let trapDamage = 9;
  let trapType = "spike";
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
      trapLifetime += 125;
    }
  }

  return {
    trapInterval,
    trapLifetime,
    trapDamage,
    trapType,
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

function findTrapSpawnPoint(tower, onPath, snap = true) {
  for (let i = 0; i < 12; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 40 + Math.random() * 90;
    const x = tower.x + Math.cos(angle) * radius;
    const y = tower.y + Math.sin(angle) * radius;
    if (x < 8 || x > canvas.width - 8 || y < 8 || y > canvas.height - 8) continue;
    const point = snap ? snapToGrid(x, y) : { x, y };
    if (onPath && !isOnPath(point.x, point.y)) continue;
    if (!onPath && isOnPath(point.x, point.y)) continue;
    return point;
  }
  return null;
}

function spawnTrapFrom(tower, stats) {
  const onPath = !(stats.trapType === "turret" || stats.trapType === "sentry");
  const snap = onPath && !(stats.trapType === "mine" || stats.trapType === "supermine");
  for (let i = 0; i < stats.spawnCount; i += 1) {
    const point = findTrapSpawnPoint(tower, onPath, snap);
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

function getEnemyProgress(enemy) {
  const pathPoints = enemy.path && enemy.path.length > 0 ? enemy.path : state.pathPoints;
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
  const range = stats.range;
  const candidates = [];
  for (const enemy of state.enemies) {
    if (enemy.hp <= 0) continue;
    if (enemy.stealth && !enemy.revealed && tower.type !== "watch" && tower.type !== "op" && !state.revealStealth && !stats.canHitStealth) continue;
    const dist = Math.hypot(enemy.x - tower.x, enemy.y - tower.y);
    if (dist <= range) {
      candidates.push({ enemy, dist });
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

function updateTowers(dt) {
  updateTowerMovement(dt);
  if (state.nukeSmoke) {
    return;
  }
  for (const tower of state.towers) {
    const stats = getTowerStats(tower);
    if (!stats) continue;
    const data = stats.data;
    if (tower.disabled) continue;
    if (data.isMine || data.blocksPath) continue;
    if (tower.type === "trap") {
      const trapStats = getTrapSetterStats(tower);
      tower.trapCooldown = Math.max(0, (tower.trapCooldown || 0) - dt);
      if (tower.trapCooldown <= 0) {
        spawnTrapFrom(tower, trapStats);
        tower.trapCooldown = trapStats.trapInterval;
      }
      continue;
    }
    if (tower.type === "drone" && stats.droneBombRate > 0) {
      tower.bombCooldown = Math.max(0, (tower.bombCooldown || 0) - dt);
    }
    tower.cooldown = Math.max(0, tower.cooldown - dt);
    const range = stats.range;
    const target = selectTarget(tower, stats);
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
            applyDamage(enemy, stats.droneBombDamage);
            if (enemy.hp <= 0) {
              awardGold(15);
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
          awardGold(15);
          continue;
        }
      }
    }
    if (enemy.burnTimer > 0) {
      const tick = Math.min(enemy.burnTimer, dt);
      enemy.burnTimer -= dt;
      if (!state.nukeSmoke) {
        applyDamage(enemy, enemy.burnDps * tick);
        if (enemy.hp <= 0) {
          awardGold(15);
          continue;
        }
      }
    }
    if (enemy.stunTimer > 0) {
      enemy.stunTimer -= dt;
      if (enemy.stunTimer > 0) {
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
          if (target.armored) continue;
          const splashDist = Math.hypot(target.x - tower.x, target.y - tower.y);
          if (splashDist <= data.splashRadius) {
            applyDamage(target, data.damage);
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
  state.screenShakePower = Math.max(state.screenShakePower, power);
  state.screenShakeDuration = Math.max(state.screenShakeDuration, duration);
  state.screenShakeTime = Math.max(state.screenShakeTime, duration);
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
  enemy.hp -= amount * multiplier;
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

function launchNukeFrom(x, y) {
  const target = { x: canvas.width / 2, y: canvas.height / 2 };
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
    duration: 3.4,
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
    state.enemiesToSpawn -= 1;
    state.spawnTimer = 0.7 / state.waveSpeed;
  }
  if (state.enemiesToSpawn === 0 && state.enemies.length === 0) {
    state.waveInProgress = false;
    if (state.radioactiveWave === state.wave) {
      state.radioactiveWave = null;
    }
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

  ctx.strokeStyle = lerpColor([8, 16, 32], [40, 8, 56], lossRatio);
  ctx.lineWidth = 40;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  ctx.strokeStyle = lerpColor([9, 20, 36], [54, 9, 80], lossRatio);
  ctx.lineWidth = 24;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  ctx.strokeStyle = lerpColor([24, 74, 110], [120, 40, 150], lossRatio);
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  ctx.restore();
}

function drawPortal() {
  const points = state.pathPoints.length > 0 ? state.pathPoints : path;
  const origin = points[0];
  const t = state.portalClock;
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

function getCastlePoint() {
  const points = state.pathPoints.length > 0 ? state.pathPoints : path;
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
      if (tower.spiky) {
        ctx.fillStyle = "rgba(248, 113, 113, 0.9)";
        ctx.beginPath();
        ctx.moveTo(tower.x - 16, tower.y - 12);
        ctx.lineTo(tower.x - 24, tower.y);
        ctx.lineTo(tower.x - 16, tower.y + 12);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(tower.x + 16, tower.y - 12);
        ctx.lineTo(tower.x + 24, tower.y);
        ctx.lineTo(tower.x + 16, tower.y + 12);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(tower.x - 12, tower.y - 16);
        ctx.lineTo(tower.x, tower.y - 24);
        ctx.lineTo(tower.x + 12, tower.y - 16);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(tower.x - 12, tower.y + 16);
        ctx.lineTo(tower.x, tower.y + 24);
        ctx.lineTo(tower.x + 12, tower.y + 16);
        ctx.closePath();
        ctx.fill();
      }
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
      } else if (tower.type === "flame") {
        ctx.fillStyle = "rgba(12, 18, 35, 0.95)";
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(249, 115, 22, 0.85)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "rgba(251, 146, 60, 0.9)";
        ctx.beginPath();
        ctx.arc(tower.x + 4, tower.y - 6, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (tower.type === "trap") {
        ctx.fillStyle = "rgba(12, 18, 35, 0.95)";
        ctx.fillRect(tower.x - 12, tower.y - 12, 24, 24);
        ctx.strokeStyle = "rgba(250, 204, 21, 0.8)";
        ctx.lineWidth = 2;
        ctx.strokeRect(tower.x - 12, tower.y - 12, 24, 24);
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

  function drawOctagonPrism(x, y, radius, color) {
    const offsetX = 3;
    const offsetY = 3;
    ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
    ctx.beginPath();
    for (let i = 0; i < 8; i += 1) {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / 8;
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
    drawOctagon(x, y, radius, color);
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
          : enemy.type === "labrat"
            ? "#fbbf24"
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

    if (enemy.type === "speedy") {
      drawTrianglePrism(pos.x, pos.y, radius, enemy.facing, baseColor);
    } else if (enemy.type === "heavy") {
      drawPentagonPrism(pos.x, pos.y, radius, baseColor);
    } else if (enemy.type === "labrat") {
      drawOctagonPrism(pos.x, pos.y, radius, baseColor);
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

    if (enemy.radioactive) {
      ctx.strokeStyle = "rgba(34, 197, 94, 0.65)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 4, 0, Math.PI * 2);
      ctx.stroke();
      const sparks = 4;
      for (let i = 0; i < sparks; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const r = randomBetween(2, radius + 4);
        const x = pos.x + Math.cos(angle) * r;
        const y = pos.y + Math.sin(angle) * r;
        ctx.fillStyle = "rgba(134, 239, 172, 0.8)";
        ctx.beginPath();
        ctx.arc(x, y, randomBetween(1.2, 2.4), 0, Math.PI * 2);
        ctx.fill();
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

function drawNukeLaunches() {
  for (const launch of state.nukeLaunches) {
    const x = launch.x ?? launch.start.x;
    const y = launch.y ?? launch.start.y;
    const rotation = launch.rotation ?? 0;
    const scale = launch.scale ?? 1;
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
  const maxAlpha = 0.75;
  const fade = smoke.expanding ? 1 : Math.max(0, smoke.fadeTimer / smoke.fadeDuration);
  ctx.save();
  ctx.globalAlpha = maxAlpha * fade;
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
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
      const steps = 6;
      for (let i = 1; i <= steps; i += 1) {
        const t = i / steps;
        const dist = flame.range * t;
        const jitter = (Math.random() - 0.5) * 0.2;
        const angle = flame.angle + jitter;
        const x = flame.x + Math.cos(angle) * dist;
        const y = flame.y + Math.sin(angle) * dist;
        const size = 5 + (1 - t) * 6;
        const grad = ctx.createRadialGradient(x, y, size * 0.2, x, y, size);
        grad.addColorStop(0, "rgba(255, 153, 85, 0.95)");
        grad.addColorStop(0.5, "rgba(249, 115, 22, 0.6)");
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
  const hasWall = state.towers.some((tower) => tower.type === "wall" && !tower.spiky && tower.x === snapped.x && tower.y === snapped.y);
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
  const shake = getScreenShakeOffset();
  ctx.save();
  ctx.translate(shake.x, shake.y);
  drawBackground();
  drawTowers();
  drawTraps();
  drawEnemies();
  drawProjectiles();
  drawExplosions();
  drawNukeParticles();
  drawNukeSmokeOverlay();
  drawFlames();
  drawNukeLaunches();
  drawBeams();
  drawPlacementPreview();
  ctx.restore();
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
  if (!state.paused) {
    state.portalClock += dt * 1000;
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
  updateEnemies(simDt);
  updateMines();
  updateTraps(simDt);
  updateTowers(simDt);
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
    if (tower.type === "bomb" && (tower.level || 1) >= 5) return;
    const current = tower.level || 1;
    const targetRaw = Number.parseInt(ui.upgradeTarget?.value || `${current}`, 10);
    if (!Number.isFinite(targetRaw)) return;
    const target = Math.max(1, Math.min(5, targetRaw));
    if (target <= current) return;
    const totalCost = getUpgradeCostToLevel(current, target);
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
    updateHud();
  });
}

if (ui.watchPath1) {
  ui.watchPath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "watch") return;
    state.selectedTower.upgradePath = 1;
    if ((state.selectedTower.level || 1) < 5) {
      upgradeTower(state.selectedTower);
    } else {
      updateUpgradePanel();
    }
  });
}

if (ui.watchPath2) {
  ui.watchPath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "watch") return;
    state.selectedTower.upgradePath = 2;
    if ((state.selectedTower.level || 1) < 5) {
      upgradeTower(state.selectedTower);
    } else {
      updateUpgradePanel();
    }
  });
}

if (ui.trapPath1) {
  ui.trapPath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "trap") return;
    state.selectedTower.upgradePath = 1;
    if ((state.selectedTower.level || 1) < 5) {
      upgradeTower(state.selectedTower);
    } else {
      updateUpgradePanel();
    }
  });
}

if (ui.trapPath2) {
  ui.trapPath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "trap") return;
    state.selectedTower.upgradePath = 2;
    if ((state.selectedTower.level || 1) < 5) {
      upgradeTower(state.selectedTower);
    } else {
      updateUpgradePanel();
    }
  });
}

if (ui.laserPath1) {
  ui.laserPath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "laser") return;
    state.selectedTower.upgradePath = 1;
    if ((state.selectedTower.level || 1) < 5) {
      upgradeTower(state.selectedTower);
    } else {
      updateUpgradePanel();
    }
  });
}

if (ui.laserPath2) {
  ui.laserPath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "laser") return;
    state.selectedTower.upgradePath = 2;
    if ((state.selectedTower.level || 1) < 5) {
      upgradeTower(state.selectedTower);
    } else {
      updateUpgradePanel();
    }
  });
}

if (ui.flamePath1) {
  ui.flamePath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "flame") return;
    state.selectedTower.upgradePath = 1;
    if ((state.selectedTower.level || 1) < 5) {
      upgradeTower(state.selectedTower);
    } else {
      updateUpgradePanel();
    }
  });
}

if (ui.flamePath2) {
  ui.flamePath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "flame") return;
    state.selectedTower.upgradePath = 2;
    if ((state.selectedTower.level || 1) < 5) {
      upgradeTower(state.selectedTower);
    } else {
      updateUpgradePanel();
    }
  });
}

if (ui.dronePath1) {
  ui.dronePath1.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "drone") return;
    state.selectedTower.upgradePath = 1;
    if ((state.selectedTower.level || 1) < 5) {
      upgradeTower(state.selectedTower);
    } else {
      updateUpgradePanel();
    }
  });
}

if (ui.dronePath2) {
  ui.dronePath2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!state.selectedTower || state.selectedTower.type !== "drone") return;
    state.selectedTower.upgradePath = 2;
    if ((state.selectedTower.level || 1) < 5) {
      upgradeTower(state.selectedTower);
    } else {
      updateUpgradePanel();
    }
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

if (ui.upgradeWall) {
  ui.upgradeWall.addEventListener("click", (event) => {
    event.stopPropagation();
    const tower = state.selectedTower;
    if (!tower || tower.type !== "wall") return;
    if (tower.spiky) return;
    if (!isWallAdjacentToPath(tower.x, tower.y)) return;
    const hasNonWall = state.towers.some((entry) => entry !== tower && entry.type !== "wall" && entry.x === tower.x && entry.y === tower.y);
    if (hasNonWall) return;
    const cost = getWallUpgradeCost();
    if (!canAfford(cost)) {
      flashButton(ui.upgradeWall);
      return;
    }
    payCost(cost);
    tower.spiky = true;
    updateHud();
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

if (ui.openTutorial) {
  ui.openTutorial.addEventListener("click", () => {
    ui.tutorialModal?.classList.remove("hidden");
  });
}

if (ui.closeTips) {
  ui.closeTips.addEventListener("click", () => {
    ui.tipsModal?.classList.add("hidden");
  });
}

if (ui.closeTutorial) {
  ui.closeTutorial.addEventListener("click", () => {
    ui.tutorialModal?.classList.add("hidden");
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

if (ui.tutorialModal) {
  ui.tutorialModal.classList.add("hidden");
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
  state.flames = [];
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
  state.portalClock = 0;
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
  if (ui.tutorialModal) ui.tutorialModal.classList.add("hidden");
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

function unlockJasperMenu() {
  if (state.easterUnlocked) return;
  state.easterUnlocked = true;
  if (ui.openJasper) ui.openJasper.classList.remove("hidden");
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
