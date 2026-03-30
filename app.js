document.body.dataset.appBootStage = "script-start";
const canvas = document.getElementById("board");
const ctx = canvas?.getContext("2d");
const statusText = document.getElementById("statusText");
const routeText = document.getElementById("routeText");
const moneyText = document.getElementById("moneyText");
const boardCashText = document.getElementById("boardCashText");
const freeBlockText = document.getElementById("freeBlockText");
const livesText = document.getElementById("livesText");
const waveText = document.getElementById("waveText");
const enemyText = document.getElementById("enemyText");
const selectionText = document.getElementById("selectionText");
const upgradeText = document.getElementById("upgradeText");
const nextPieceText = document.getElementById("nextPieceText");
const towerDescription = document.getElementById("towerDescription");
const waveButton = document.getElementById("waveButton");
const autoWaveToggle = document.getElementById("autoWaveToggle");
const rotateButton = document.getElementById("rotateButton");
const pauseButton = document.getElementById("pauseButton");
const toolGrid = document.getElementById("toolGrid");
const towerGrid = document.getElementById("towerGrid");
const boardFrame = document.querySelector(".board-frame");
const sidePanelDock = document.getElementById("sidePanelDock");
const boardPanelDock = document.getElementById("boardPanelDock");
const blockToolButton = document.querySelector('[data-tool="wall"]');
const menuOverlay = document.getElementById("menuOverlay");
const pauseOverlay = document.getElementById("pauseOverlay");
const tutorialOverlay = document.getElementById("tutorialOverlay");
const gameOverOverlay = document.getElementById("gameOverOverlay");
const almanacOverlay = document.getElementById("almanacOverlay");
const startGameButton = document.getElementById("startGameButton");
const openAlmanacButton = document.getElementById("openAlmanacButton");
const resumeGameButton = document.getElementById("resumeGameButton");
const pauseAlmanacButton = document.getElementById("pauseAlmanacButton");
const quitToMenuButton = document.getElementById("quitToMenuButton");
const restartGameButton = document.getElementById("restartGameButton");
const gameOverMenuButton = document.getElementById("gameOverMenuButton");
const gameOverSummary = document.getElementById("gameOverSummary");
const closeAlmanacButton = document.getElementById("closeAlmanacButton");
const almanacGrid = document.getElementById("almanacGrid");
const almanacTabs = document.getElementById("almanacTabs");
const almanacTitle = document.getElementById("almanacTitle");
const almanacBody = document.getElementById("almanacBody");
const almanacDetail = document.getElementById("almanacDetail");
const difficultyOptions = document.getElementById("difficultyOptions");
const mapOptions = document.getElementById("mapOptions");
const menuMapDescription = document.getElementById("menuMapDescription");
const towerPopup = document.getElementById("towerPopup");
const towerPopupTitle = document.getElementById("towerPopupTitle");
const towerPopupSummary = document.getElementById("towerPopupSummary");
const towerPopupActions = document.getElementById("towerPopupActions");
const sandboxControls = document.getElementById("sandboxControls");
const sandboxWaveInput = document.getElementById("sandboxWaveInput");
const sandboxSetWaveButton = document.getElementById("sandboxSetWaveButton");
const sandboxEnemySelect = document.getElementById("sandboxEnemySelect");
const sandboxTierSelect = document.getElementById("sandboxTierSelect");
const sandboxTierLabel = document.getElementById("sandboxTierLabel");
const sandboxSpawnCountInput = document.getElementById("sandboxSpawnCountInput");
const sandboxPortalSelect = document.getElementById("sandboxPortalSelect");
const sandboxSpawnButton = document.getElementById("sandboxSpawnButton");
const sandboxSpawnHidden = document.getElementById("sandboxSpawnHidden");
const sandboxSpawnArmored = document.getElementById("sandboxSpawnArmored");
const sandboxSpawnShielded = document.getElementById("sandboxSpawnShielded");
const airstrikePanel = document.getElementById("airstrikePanel");
const airstrikeButton = document.getElementById("airstrikeButton");
const airstrikeStatusText = document.getElementById("airstrikeStatusText");
const airstrikeTitleText = airstrikeButton?.querySelector(".airstrike-copy > span:first-child");
const tutorialOverlayTitle = document.getElementById("tutorialOverlayTitle");
const tutorialOverlayBody = document.getElementById("tutorialOverlayBody");
const tutorialOverlayButton = document.getElementById("tutorialOverlayButton");
const tutorialDismissButton = document.getElementById("tutorialDismissButton");
const closeTowerPopupButton = document.getElementById("closeTowerPopupButton");
const tutorialList = document.getElementById("tutorialList");
const tutorialHint = document.getElementById("tutorialHint");
const TARGET_PRIORITIES = ["first", "last", "strong", "weak", "hidden", "random"];
const PATH_TOWER_TYPES = new Set(["tesla", "missile", "trapper", "laser", "shotgun", "freezer", "drone", "dippy", "support", "gate"]);
const TARGET_LABELS = {
  first: "First",
  last: "Last",
  strong: "Strong",
  weak: "Weak",
  hidden: "Hidden",
  random: "Random"
};

document.body.dataset.appBootStage = "constants";

const COLS = 30;
const ROWS = 18;
const CELL_SIZE = 28;
const BASE_CANVAS_WIDTH = COLS * CELL_SIZE;
const BASE_CANVAS_HEIGHT = ROWS * CELL_SIZE;
const START_MONEY = 50;
const START_LIVES = 20;
const DASH_PERIOD = 16;
const BLOCK_COST = 5;
const TOWER_BASE_COST = {
  tesla: 30,
  missile: 38,
  trapper: 24,
  laser: 60,
  shotgun: 22,
  freezer: 34,
  drone: 34,
  dippy: 100,
  support: 42,
  crossbow: 28,
  gate: 56
};
const UPGRADE_COSTS = {
  tesla: {
    path1: [8, 14, 24, 38, 58],
    path2: [8, 14, 24, 36, 56]
  },
  missile: {
    path1: [10, 16, 28, 42, 64],
    path2: [10, 16, 30, 46, 68]
  },
  drone: {
    path1: [9, 15, 26, 40, 62],
    path2: [9, 15, 27, 42, 64]
  },
  trapper: {
    path1: [7, 12, 20, 32, 50],
    path2: [7, 12, 20, 32, 50]
  },
  laser: {
    path1: [14, 24, 40, 62, 92],
    path2: [14, 24, 40, 62, 92]
  },
  shotgun: {
    path1: [8, 14, 24, 38, 62],
    path2: [8, 14, 24, 38, 62]
  },
  freezer: {
    path1: [8, 13, 22, 36, 56],
    path2: [8, 13, 22, 36, 56]
  },
  dippy: {
    path1: [32, 48, 76, 116, 240],
    path2: [30, 46, 74, 112, 232]
  },
  support: {
    path1: [30, 70, 130, 220, 360],
    path2: [10, 18, 30, 46, 74]
  },
  gate: {
    path1: [12, 20, 34, 52, 84],
    path2: [12, 18, 30, 50, 82]
  }
};
const TOWER_INFO = {
  tesla: { name: "Tesla", color: "#92d5ff", description: "Tesla chains lightning between nearby enemies and briefly stuns what it hits." },
  missile: { name: "Missile", color: "#ffae57", description: "Missile fires heavier explosive shots that deal strong splash damage in an area." },
  trapper: { name: "Trap Setter", color: "#89d37a", description: "Trap Setter seeds temporary traps, mines, or wall turrets depending on its upgrade path." },
  laser: { name: "Laser", color: "#ff7ca8", description: "Laser locks onto a target, then burns a piercing beam through the lane and beyond tower range." },
  shotgun: { name: "Shotgun", color: "#ffd34d", description: "Shotgun fires short yellow line blasts and can branch into Bullet Storm or Wavelength." },
  freezer: { name: "Freezer", color: "#b5ebff", description: "Freezer launches chilling shots that slow targets, then branches into Permafrost pulses or a constant slowing aura." },
  drone: { name: "Drone", color: "#7de3d6", description: "Drone commands mobile gunships that chase targets inside tower coverage and can branch into support or assault roles." },
  dippy: { name: "Dippy", color: "#fff1b8", description: "Dippy is an egg. A very powerful egg." },
  support: { name: "Support", color: "#c9b6ff", description: "Support hub boosts nearby towers and can branch into income generation or an ammo supplier aura." },
  crossbow: { name: "Crossbow", color: "#8b5d33", description: "Outpost crossbow tower. Fires slower bolts and can be upgraded into a heavier fort-defense platform." },
  gate: { name: "Acid Gate", color: "#91e59d", description: "A three-tile acid gate. Rotate it to span a wall-path-wall lane, then let its mounted battery slabs flood the opening with stacking acid pools." }
};
const ENEMY_TYPES = {
  fast: {
    key: "fast",
    name: "Fast",
    color: "#d64545",
    shape: 3,
    hpMultiplier: 0.8,
    speedBonus: 24,
    reward: 2,
    description: "Fast triangles sprint through lanes and punish slow reaction times."
  },
  pentagon: {
    key: "pentagon",
    name: "Pentagon",
    color: "#7f56d9",
    shape: 5,
    hpMultiplier: 1.85,
    speedBonus: -8,
    reward: 4,
    description: "Pentagons are slower but absorb far more punishment than standard creeps."
  },
  hexagon: {
    key: "hexagon",
    name: "Hexagon",
    color: "#f1c84c",
    shape: 6,
    hpMultiplier: 2.55,
    speedBonus: -3,
    reward: 5,
    description: "Hexagons are heavy elites with very high health and steady forward pressure."
  },
  diamond: {
    key: "diamond",
    name: "Diamond",
    color: "#8fe4ff",
    shape: 4,
    hpMultiplier: 1.6,
    speedBonus: 12,
    reward: 5,
    description: "Diamonds glide in faster than pentagons and bring sharper mid-wave pressure."
  },
  attacker: {
    key: "attacker",
    name: "Attacker",
    color: "#9d63ff",
    shape: 2,
    hpMultiplier: 2.7,
    speedBonus: 42,
    reward: 6,
    armor: 5,
    hidden: true,
    armored: true,
    suppressArmorVisual: true,
    description: "Attackers are fast purple raiders with good health, hidden movement, and a concealed armoured frame."
  },
  shield: {
    key: "shield",
    name: "Shield",
    color: "#8fc7ff",
    shape: 6,
    hpMultiplier: 1.3,
    speedBonus: -4,
    reward: 6,
    description: "Shield enemies project a force field that protects nearby enemies until the field is broken."
  },
  waffle16: {
    key: "waffle16",
    name: "Waffle",
    color: "#d69a43",
    shape: 4,
    hpMultiplier: 5.4,
    speedBonus: -10,
    reward: 10,
    waffleSquares: 16,
    description: "Waffles are layered swarm carriers that break apart into smaller waffles when destroyed."
  },
  armored: {
    key: "armored",
    name: "Armoured",
    color: "#93a1b5",
    shape: 6,
    hpMultiplier: 2.15,
    speedBonus: -5,
    reward: 6,
    armor: 4,
    description: "Armoured enemies shrug off bullets until lasers or explosions strip their white shell away."
  },
  biscuit: {
    key: "biscuit",
    name: "Biscuit",
    color: "#e6b26e",
    shape: 3,
    hpMultiplier: 0.65,
    speedBonus: 42,
    reward: 4,
    description: "Biscuits are sharp triangular runners that sprint for the exit with very high speed."
  },
  megaWaffle: {
    key: "megaWaffle",
    name: "Mega Waffle",
    color: "#b87d36",
    shape: 4,
    hpMultiplier: 7.8,
    speedBonus: -14,
    reward: 18,
    waffleSquares: 25,
    description: "Mega Waffles are massive summoned slabs that briefly disrupt towers when they crash in."
  },
  idaen: {
    key: "idaen",
    name: "I-daen",
    color: "#8d5f2e",
    shape: 4,
    hpMultiplier: 52,
    speedBonus: -16,
    reward: 60,
    waffleSquares: 16,
    description: "I-daen is a waffle golem boss that halts to summon off-lane reinforcements and can only appear on Outpost."
  },
  adapter: {
    key: "adapter",
    name: "Adapter",
    color: "#b079ff",
    shape: 2,
    hpMultiplier: 34,
    speedBonus: 26,
    reward: 70,
    armor: 8,
    armored: true,
    description: "Adapter is the attacker boss, a giant assault craft that launches raiders and adapts against explosive hits."
  }
};
const DIFFICULTIES = {
  easy: { name: "Easy", money: 60, lives: 28, hp: 0.85, reward: 1.15, interval: 1.08, enemyCount: 1 },
  standard: { name: "Standard", money: 50, lives: 20, hp: 1, reward: 1, interval: 1 },
  hard: { name: "Hard", money: 40, lives: 10, hp: 1.28, reward: 0.9, interval: 0.88, enemyCount: 1 },
  brutal: { name: "Brutal", money: 50, lives: 5, hp: 1.28, reward: 0.5, interval: 0.88, enemyCount: 2 },
  sandbox: { name: "Sandbox", money: 999999, lives: 999999, hp: 1, reward: 1, interval: 1, enemyCount: 1 }
};
const MAPS = {
  meadow: {
    name: "Classic",
    description: "Single portal, open grassland, a couple of sight-blocking stones.",
    scenery: "meadow",
    goal: { x: COLS - 1, y: Math.floor(ROWS / 2) },
    portals: [{ x: 0, y: Math.floor(ROWS / 2) }],
    obstacles: [{ x: 9, y: 4 }, { x: 9, y: 5 }, { x: 16, y: 9 }]
  },
  canyon: {
    name: "Canyon Fork",
    description: "Two portals split the lane while canyon pillars block long tower lines.",
    scenery: "canyon",
    goal: { x: COLS - 1, y: Math.floor(ROWS / 2) },
    portals: [{ x: 0, y: 4 }, { x: 0, y: 10 }],
    obstacles: [{ x: 8, y: 6 }, { x: 8, y: 7 }, { x: 14, y: 3 }, { x: 14, y: 11 }, { x: 19, y: 7 }]
  },
  ruins: {
    name: "Sunken Ruins",
    description: "Three portals and broken pillars create heavy sight denial.",
    scenery: "ruins",
    goal: { x: COLS - 1, y: Math.floor(ROWS / 2) },
    portals: [{ x: 0, y: 3 }, { x: 0, y: 7 }, { x: 0, y: 11 }],
    obstacles: [{ x: 6, y: 5 }, { x: 6, y: 9 }, { x: 12, y: 2 }, { x: 12, y: 12 }, { x: 18, y: 6 }, { x: 18, y: 8 }]
  },
  mango: {
    name: "Mango Pass",
    description: "Two portals attack from opposite edges while the base sits in the middle beneath mango haze.",
    scenery: "mango",
    goal: { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) },
    portals: [{ x: 0, y: 4 }, { x: COLS - 1, y: 10 }],
    obstacles: [{ x: 8, y: 5 }, { x: 8, y: 9 }, { x: 12, y: 2 }, { x: 13, y: 12 }, { x: 17, y: 4 }, { x: 17, y: 10 }]
  },
  factory: {
    name: "Factory",
    description: "Build a conveyor line through the plant. Five conveyors are free on wave 1, then one free conveyor arrives each wave, and enemies move slightly faster here.",
    scenery: "factory",
    goal: { x: COLS - 2, y: 8 },
    portals: [{ x: 0, y: 8 }],
    obstacles: [],
    enemySpeed: 1.08
  },
  outpost: {
    name: "Outpost",
    description: "Four portals assault a broken 5x5 fort ring around the base. This map doubles enemies and halves cash gain.",
    scenery: "fortification",
    goal: { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) },
    portals: [
      { x: Math.floor(COLS / 2), y: 0 },
      { x: COLS - 1, y: Math.floor(ROWS / 2) },
      { x: Math.floor(COLS / 2), y: ROWS - 1 },
      { x: 0, y: Math.floor(ROWS / 2) }
    ],
    obstacles: [],
    enemyCount: 2,
    reward: 0.5
  },
  fortification: {
    name: "Fortification",
    description: "A larger fort corridor. Scroll left to find the portal beyond the wall while unique spike traps guard the lanes.",
    scenery: "fortification",
    goal: { x: COLS - 2, y: Math.floor(ROWS / 2) },
    portals: [{ x: 0, y: Math.floor(ROWS / 2) }],
    obstacles: []
  },
  graveyard: {
    name: "Graveyard",
    description: "Triple enemies. The base sits in the middle while enemies emerge evenly from the edges and path into a central build zone.",
    scenery: "graveyard",
    goal: { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) },
    portals: [
      { x: Math.floor(COLS / 2), y: 0 },
      { x: COLS - 1, y: Math.floor(ROWS / 2) },
      { x: Math.floor(COLS / 2), y: ROWS - 1 },
      { x: 0, y: Math.floor(ROWS / 2) }
    ],
    hidePortals: true,
    hideRoutes: true,
    buildZone: { x: 10, y: 6, width: 11, height: 7 },
    obstacles: [],
    enemyCount: 3,
    reward: 1 / 3
  }
};
const IDAEN_BOSS_WAVES = new Set([25, 50, 75, 100]);
const ADAPTER_BOSS_WAVES = new Set([40, 80, 120]);

const directions = [
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 }
];
const tetrominoes = [
  {
    name: "I Beam",
    color: "#4574d8",
    offsets: [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 }
    ]
  },
  {
    name: "Square",
    color: "#2caf6f",
    offsets: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ]
  },
  {
    name: "T Split",
    color: "#ee8c33",
    offsets: [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 }
    ]
  },
  {
    name: "L Hook",
    color: "#df5555",
    offsets: [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 }
    ]
  },
  {
    name: "J Hook",
    color: "#8a63eb",
    offsets: [
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 }
    ]
  },
  {
    name: "S Slide",
    color: "#ff6497",
    offsets: [
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 0, y: 0 },
      { x: 1, y: 0 }
    ]
  },
  {
    name: "Z Slide",
    color: "#f4ca4c",
    offsets: [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ]
  }
];

let currentTool = "wall";
let selectedTowerType = "tesla";
let routes = [];
let hoverCell = null;
let hoverPoint = null;
let activePiece = null;
let selectedDifficulty = "standard";
let selectedMap = "meadow";
let activeMap = MAPS[selectedMap];
let money = START_MONEY;
let freeBlocks = 1;
let currentBlockCost = BLOCK_COST;
let lives = START_LIVES;
let waveNumber = 0;
let nextBlockId = 1;
let nextTowerId = 1;
let nextEnemyId = 1;
let nextProjectileId = 1;
let nextEffectId = 1;
let nextTrapId = 1;
let enemies = [];
let projectiles = [];
let towers = [];
let effects = [];
let drones = [];
let traps = [];
let blocks = new Map();
let wave = null;
let dashOffset = 0;
let lastTimestamp = 0;
let message = "Ready to build.";
let messageTimer = 0;
let selectedTowerId = null;
let ambientParticles = [];
let ambientTimer = 0;
let invalidPlacementTimer = 0;
let gameMode = "menu";
let almanacOrigin = "menu";
let almanacTab = "enemies";
let selectedAlmanacTower = "tesla";
const discoveredEnemies = new Set();
let infiniteMode = false;
let cheatBuffer = [];
let crossbowUnlocked = false;
let outpostWalllessQuestFailed = false;
let spawnPortalCursor = 0;
let spawnPortalOrder = [];
let autoWaveEnabled = false;
let autoWaveTimer = 0;
let sandboxWaveTarget = null;
let armedAbility = null;
const heldScrollKeys = new Set();
let scrollVelocityX = 0;
let scrollVelocityY = 0;
let selectedGateRotation = 0;
const introducedEnemyKeys = new Set();
const shownWaveWarnings = new Set();
const tutorialProgress = {
  scrolled: false,
  placedBlock: false,
  placedTower: false,
  upgradedTower: false
};
const shownTutorialPopups = new Set();
let tutorialPopupQueue = [];
let activeTutorialPopup = null;
let tutorialResumeMode = null;
let tutorialDismissed = false;
let tutorialStepDelayTimer = 0;
const ALMANAC_TOWER_TYPES = ["tesla", "missile", "trapper", "laser", "shotgun", "freezer", "drone", "dippy", "support", "crossbow", "gate"];
const MENU_STATE_STORAGE_KEY = "blockDefence.menuState";

function normalizeMapKey(mapKey) {
  if (mapKey === "fotification") {
    return "fortification";
  }
  return mapKey;
}

function persistMenuState() {
  try {
    window.localStorage?.setItem(MENU_STATE_STORAGE_KEY, JSON.stringify({
      difficulty: selectedDifficulty,
      map: selectedMap
    }));
  } catch (error) {
    // Ignore storage failures so menu interaction still works.
  }
}

function restoreMenuState() {
  try {
    const raw = window.localStorage?.getItem(MENU_STATE_STORAGE_KEY);

    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);
    const nextDifficulty = typeof parsed?.difficulty === "string" ? parsed.difficulty : null;
    const nextMap = typeof parsed?.map === "string" ? normalizeMapKey(parsed.map) : null;

    if (["easy", "standard", "hard", "brutal", "sandbox"].includes(nextDifficulty)) {
      selectedDifficulty = nextDifficulty;
    }

    if (nextMap && MAPS[nextMap]) {
      selectedMap = nextMap;
      activeMap = MAPS[selectedMap];
    }
  } catch (error) {
    // Ignore malformed saved state and fall back to defaults.
  }
}

restoreMenuState();
document.body.dataset.appBootStage = "menu-state-restored";
window.__blockDefenceMenuBridge = {
  getState() {
    return {
      difficulty: selectedDifficulty,
      map: selectedMap
    };
  },
  setDifficulty(nextDifficulty) {
    if (!["easy", "standard", "hard", "brutal", "sandbox"].includes(nextDifficulty)) {
      return false;
    }

    selectedDifficulty = nextDifficulty;
    persistMenuState();
    if (typeof updateMenuSelectors === "function") {
      updateMenuSelectors();
    }
    return true;
  },
  setMap(nextMap) {
    const normalizedMap = normalizeMapKey(nextMap);
    if (!MAPS[normalizedMap]) {
      return false;
    }

    selectedMap = normalizedMap;
    activeMap = MAPS[selectedMap];
    persistMenuState();
    if (typeof updateMenuSelectors === "function") {
      updateMenuSelectors();
    }
    return true;
  },
  startFromMenu() {
    persistMenuState();
    return startGame();
  },
  openAlmanacFromMenu() {
    persistMenuState();
    return openAlmanac("menu");
  },
  refreshMenu() {
    if (typeof updateMenuSelectors === "function") {
      updateMenuSelectors();
    }
  }
};
window.__blockDefenceMenuMaps = MAPS;
activePiece = createRandomPiece(selectedMap);
document.body.dataset.appBootStage = "bridge-ready";

const createGrid = () =>
  Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      blockId: null,
      towerId: null
    }))
  );

let grid = createGrid();

function activePortals() {
  if (isGraveyardMap()) {
    return graveyardEdgePortals();
  }
  return activeMap.portals;
}

function goalPortal() {
  return activeMap.goal;
}

function baseCenter() {
  return cellCenter(goalPortal().x, goalPortal().y);
}

function isOutpostMap() {
  return selectedMap === "outpost";
}

function isGraveyardMap() {
  return selectedMap === "graveyard";
}

function isFactoryMap() {
  return selectedMap === "factory";
}

function isFactoryBuildTile(x, y) {
  return y % 2 === 0 && x % 2 === 0;
}

function factoryTravelDirections() {
  return [
    { dx: 2, dy: 0, gapX: 1, gapY: 0 },
    { dx: -2, dy: 0, gapX: -1, gapY: 0 },
    { dx: 0, dy: 2, gapX: 0, gapY: 1 },
    { dx: 0, dy: -2, gapX: 0, gapY: -1 }
  ];
}

function supportWaveIncomeEntries() {
  return towers
    .filter((tower) => tower.type === "support")
    .map((tower) => ({
      tower,
      amount: Math.max(0, Math.round(towerStats(tower).waveCash || 0))
    }))
    .filter((entry) => entry.amount > 0);
}

function addFloatingText(x, y, text, color = "#ffe27a", ttl = 1.05) {
  effects.push({
    id: nextEffectId,
    kind: "floatingText",
    x,
    y,
    text,
    color,
    maxTtl: ttl,
    ttl,
    vy: -38
  });
  nextEffectId += 1;
}

function mapBuildZone() {
  return activeMap.buildZone || null;
}

function cellInBuildZone(x, y) {
  const zone = mapBuildZone();
  if (!zone) {
    return true;
  }

  return x >= zone.x && x < zone.x + zone.width && y >= zone.y && y < zone.y + zone.height;
}

function shuffleIndices(length) {
  const values = Array.from({ length }, (_, index) => index);
  for (let index = values.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [values[index], values[swap]] = [values[swap], values[index]];
  }
  return values;
}

function graveyardEdgePortals() {
  const portals = [];

  for (let x = 0; x < COLS; x += 1) {
    portals.push({ x, y: 0 });
    portals.push({ x, y: ROWS - 1 });
  }

  for (let y = 1; y < ROWS - 1; y += 1) {
    portals.push({ x: 0, y });
    portals.push({ x: COLS - 1, y });
  }

  return portals;
}

function resetSpawnPortalOrder() {
  spawnPortalCursor = 0;
  spawnPortalOrder = shuffleIndices(activePortals().length);
}

function nextSpawnPortalIndex() {
  if (spawnPortalOrder.length !== activePortals().length || spawnPortalOrder.length === 0) {
    resetSpawnPortalOrder();
  }

  const value = spawnPortalOrder[spawnPortalCursor % spawnPortalOrder.length];
  spawnPortalCursor += 1;

  if (spawnPortalCursor % Math.max(spawnPortalOrder.length, 1) === 0) {
    spawnPortalOrder = shuffleIndices(activePortals().length);
    spawnPortalCursor = 0;
  }

  return value;
}

function isIdaenWave(round = waveNumber) {
  return isOutpostMap() && IDAEN_BOSS_WAVES.has(round);
}

function isAdapterWave(round = waveNumber) {
  return !isOutpostMap() && ADAPTER_BOSS_WAVES.has(round);
}

function enemyCountMultiplier() {
  return (DIFFICULTIES[selectedDifficulty].enemyCount || 1) * (activeMap.enemyCount || 1);
}

function rewardMultiplier() {
  return DIFFICULTIES[selectedDifficulty].reward * (activeMap.reward || 1);
}

function startingMoney() {
  return DIFFICULTIES[selectedDifficulty].money;
}

function obstacleAt(x, y) {
  return activeMap.obstacles.some((cell) => cell.x === x && cell.y === y);
}

function isEndpoint(x, y) {
  return activePortals().some((portal) => portal.x === x && portal.y === y) || (x === goalPortal().x && y === goalPortal().y);
}

function inBounds(x, y) {
  return x >= 0 && x < COLS && y >= 0 && y < ROWS;
}

function cellCenter(x, y) {
  return {
    x: x * CELL_SIZE + CELL_SIZE / 2,
    y: y * CELL_SIZE + CELL_SIZE / 2
  };
}

function rotateOffset(offset, turns) {
  let next = { x: offset.x, y: offset.y };

  for (let index = 0; index < turns; index += 1) {
    next = { x: -next.y, y: next.x };
  }

  return next;
}

function createRandomPiece(mapKey = null) {
  if (mapKey === "factory") {
    return {
      name: "Conveyor Belt",
      color: "#6e7f89",
      offsets: [{ x: 0, y: 0 }],
      conveyor: true
    };
  }
  const shape = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
  const turns = Math.floor(Math.random() * 4);

  return {
    name: shape.name,
    color: shape.color,
    offsets: shape.offsets.map((offset) => rotateOffset(offset, turns))
  };
}

function setMessage(text, duration = 1.6) {
  message = text;
  messageTimer = duration;
}

function reportUiError(context, error) {
  const detail = error instanceof Error ? error.message : String(error);
  const messageText = `${context} failed: ${detail}`;
  setMessage(messageText, 6);
  if (menuMapDescription && gameMode === "menu") {
    menuMapDescription.textContent = messageText;
  }
  updateHud();
  draw();
}

function withUiGuard(context, handler) {
  return (event) => {
    try {
      return handler(event);
    } catch (error) {
      reportUiError(context, error);
      return undefined;
    }
  };
}

function enemyIntroMessage(enemyKey) {
  const enemy = ENEMY_TYPES[enemyKey];
  if (!enemy) {
    return null;
  }
  const advice = {
    fast: "They rush early, so get basic damage up quickly.",
    pentagon: "They are tougher, so sustained damage helps.",
    diamond: "They resist energy and explosions, so keep steady bullet coverage too.",
    attacker: "They stay hidden and fast, so detection upgrades matter soon.",
    armored: "Bullets bounce off until lasers or explosions strip the shell.",
    shield: "Break the shield source first or your damage will get absorbed.",
    waffle16: "Waffles split into more waffles, so splash and lane control help.",
    biscuit: "Biscuits are boss minions and sprint hard toward the base.",
    idaen: "I-daen is the boss, and his summon phases flood the map.",
    adapter: "Adapter is the attacker boss. It launches escorts, and every explosive hit makes it ignore the next explosive strike."
  };
  return `${enemy.name} spotted. ${enemy.description}${advice[enemyKey] ? ` ${advice[enemyKey]}` : ""}`;
}

function waveWarningMessage(round) {
  const warnings = {
    4: {
      title: "Hidden Enemies Soon",
      body: "Hidden enemies arrive on wave 6.\n\nGet detection before they show up. Tesla Path 2, Dippy Path 2, and Support detection upgrades can all help."
    },
    5: {
      title: "Hidden Enemies Next Wave",
      body: "The next wave includes hidden enemies.\n\nIf a tower cannot detect them, it will not fire."
    },
    7: {
      title: "Armoured Enemies Soon",
      body: "Armoured enemies arrive on wave 9.\n\nMissiles, lasers, and explosive damage strip armour cleanly."
    },
    8: {
      title: "Armoured Enemies Next Wave",
      body: "The next wave includes armoured enemies.\n\nKinetic damage struggles until the shell is broken."
    },
    16: {
      title: "Shielded Enemies Soon",
      body: "Shielded enemies arrive on wave 18.\n\nEnemies inside the shield do not take direct damage, so crack the shield source first with focused fire."
    },
    17: {
      title: "Shielded Enemies Next Wave",
      body: "The next wave includes shielded enemies.\n\nBurst damage and splash make it easier to break the shield source before the lane fills up."
    }
  };
  return warnings[round] || null;
}

function maybeShowWaveWarning(round) {
  const warning = waveWarningMessage(round);
  if (!warning || shownWaveWarnings.has(round)) {
    return false;
  }
  shownWaveWarnings.add(round);
  queueTutorialPopup(`wave-warning-${round}`, warning.title, warning.body);
  return true;
}

function queueTutorialPopup(key, title, body) {
  if (key && shownTutorialPopups.has(key)) {
    return false;
  }
  if (key) {
    shownTutorialPopups.add(key);
  }
  tutorialPopupQueue.push({ title, body, kind: "warning" });
  presentQueuedTutorialPopup();
  return true;
}

function queueDelayedTutorialStep(key, title, body) {
  if (tutorialDismissed || isSandboxMode() || (key && shownTutorialPopups.has(key))) {
    return false;
  }
  if (key) {
    shownTutorialPopups.add(key);
  }
  tutorialPopupQueue.push({ title, body, kind: "tutorial" });
  tutorialStepDelayTimer = 2;
  return true;
}

function renderTutorialPopup() {
  if (!activeTutorialPopup || !tutorialOverlayTitle || !tutorialOverlayBody) {
    return;
  }

  tutorialOverlayTitle.textContent = activeTutorialPopup.title;
  tutorialOverlayBody.innerHTML = activeTutorialPopup.body
    .split("\n\n")
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function presentQueuedTutorialPopup() {
  if (activeTutorialPopup || tutorialPopupQueue.length === 0 || gameMode === "menu" || gameMode === "gameover" || gameMode === "almanac") {
    return;
  }

  if (tutorialPopupQueue[0]?.kind === "tutorial" && tutorialStepDelayTimer > 0) {
    return;
  }

  activeTutorialPopup = tutorialPopupQueue.shift();
  tutorialResumeMode = gameMode === "paused" ? "paused" : "playing";
  gameMode = "paused";
  openOverlay(null);
  tutorialOverlay?.classList.add("active");
  renderTutorialPopup();
  updateHud();
  draw();
}

function dismissTutorialPopup() {
  if (!activeTutorialPopup) {
    return;
  }

  activeTutorialPopup = null;
  tutorialOverlay?.classList.remove("active");
  if (gameMode !== "menu" && gameMode !== "gameover") {
    gameMode = tutorialResumeMode === "paused" ? "paused" : "playing";
    if (gameMode === "paused") {
      openOverlay("pause");
    } else {
      openOverlay(null);
    }
  }
  tutorialResumeMode = null;
  presentQueuedTutorialPopup();
  updateHud();
  draw();
}

function dismissEntireTutorial() {
  tutorialDismissed = true;
  tutorialPopupQueue = tutorialPopupQueue.filter((entry) => entry.kind !== "tutorial");
  tutorialStepDelayTimer = 0;
  dismissTutorialPopup();
}

function queueNextTutorialStep() {
  if (tutorialDismissed || isSandboxMode()) {
    return;
  }
  if (!tutorialProgress.scrolled) {
    queueDelayedTutorialStep("tutorial-scroll", "Move The Board", "Use the arrow keys to pan around the map.\n\nOnce you move the board, the next tutorial page will appear after a short pause.");
    return;
  }
  if (!tutorialProgress.placedBlock) {
    queueDelayedTutorialStep("tutorial-block", isFactoryMap() ? "Place A Conveyor" : "Place A Block", isFactoryMap()
      ? "Use the Block tool to place a conveyor on a valid tile and extend the route.\n\nAfter you place one, the next tutorial page will appear after a short pause."
      : "Use the Block tool, and press R if needed, to place a route block.\n\nAfter you place one, the next tutorial page will appear after a short pause.");
    return;
  }
  if (!tutorialProgress.placedTower) {
    queueDelayedTutorialStep("tutorial-tower", "Place A Tower", "Switch to the Tower tool, choose a tower, and place it on a valid build tile.\n\nAfter you place one, the next tutorial page will appear after a short pause.");
    return;
  }
  if (!tutorialProgress.upgradedTower) {
    queueDelayedTutorialStep("tutorial-upgrade", "Buy An Upgrade", "Use the Upgrade tool or the tower popup to buy an upgrade.\n\nAfter your first upgrade, the opening tutorial is complete.");
  }
}

function renderTutorial() {
  if (!tutorialList || !tutorialHint) {
    return;
  }

  const steps = [
    {
      done: tutorialProgress.scrolled,
      title: "Pan the board",
      detail: "Use the arrow keys to move around the map smoothly."
    },
    {
      done: tutorialProgress.placedBlock,
      title: isFactoryMap() ? "Place conveyors" : "Place blocks",
      detail: isFactoryMap() ? "Use the block tool to lay conveyors and shape the route." : "Use the block tool and R to rotate pieces into the lane."
    },
    {
      done: tutorialProgress.placedTower,
      title: "Place a tower",
      detail: "Switch to Tower, pick one from the strip, and place it on a valid spot."
    },
    {
      done: tutorialProgress.upgradedTower,
      title: "Upgrade it",
      detail: "Use the Upgrade tool or tower popup to buy stronger attacks, detection, or support utility."
    }
  ];

  tutorialList.innerHTML = steps
    .map((step) => `<div class="tutorial-step${step.done ? " done" : ""}"><strong>${step.done ? "Done" : "Next"}: ${step.title}</strong><span>${step.detail}</span></div>`)
    .join("");

  const nextStep = steps.find((step) => !step.done);
  tutorialHint.textContent = nextStep
    ? nextStep.detail
    : "You know the basics now. Watch the warnings panel text for hidden, armoured, shielded, and boss mechanics.";
}

function isSandboxMode() {
  return selectedDifficulty === "sandbox";
}

function openOverlay(name) {
  menuOverlay.classList.toggle("active", name === "menu");
  pauseOverlay.classList.toggle("active", name === "pause");
  gameOverOverlay.classList.toggle("active", name === "gameover");
  almanacOverlay.classList.toggle("active", name === "almanac");
}

function renderAlmanac() {
  almanacGrid.innerHTML = "";
  almanacBody.classList.toggle("tower-layout", almanacTab === "towers");
  for (const button of almanacTabs.querySelectorAll("[data-almanac-tab]")) {
    button.classList.toggle("active", button.dataset.almanacTab === almanacTab);
  }

  if (almanacTab === "enemies") {
    almanacTitle.textContent = "Almanac";
    almanacDetail.innerHTML = `<p class="hint">Select the Towers tab to inspect tower damage, attacks per second, range, and upgrade scaling.</p>`;

    for (const enemy of Object.values(ENEMY_TYPES).filter((entry) => entry.key !== "shield")) {
      const entry = document.createElement("article");
      const known = discoveredEnemies.has(enemy.key);
      entry.className = `almanac-entry${known ? "" : " locked"}`;
      entry.innerHTML = known
        ? renderEnemyAlmanacCard(enemy)
        : `<h3>Unknown</h3><p>Encounter this enemy in battle to unlock this entry.</p>`;
      almanacGrid.appendChild(entry);
    }
    return;
  }

  almanacTitle.textContent = "Almanac";
  for (const key of ALMANAC_TOWER_TYPES) {
    const tower = TOWER_INFO[key];
    const entry = document.createElement("article");
    entry.className = `almanac-entry clickable${selectedAlmanacTower === key ? " active" : ""}`;
    entry.dataset.almanacTower = key;
    entry.innerHTML = `<h3>${tower.name}</h3><p>Cost: ${towerCost(key)}</p><p>${tower.description}</p>`;
    almanacGrid.appendChild(entry);
  }
  renderTowerAlmanacDetail(selectedAlmanacTower);
}

function enemySpecialAbilities(enemy) {
  const specials = [];

  if (enemy.key.startsWith("waffle")) {
    specials.push("Splits into smaller waffles on defeat");
  }
  if (enemy.key === "megaWaffle") {
    specials.push("Massive summon that stuns nearby towers on arrival");
  }
  if (enemy.key === "armored") {
    specials.push("Armoured shell blocks bullets until broken");
  }
  if (enemy.key === "idaen") {
    specials.push("Boss summon phase");
    specials.push("Shielded while summon biscuits survive");
  }
  if (enemy.key === "adapter") {
    specials.push("Boss escort launches");
    specials.push("After taking explosive damage, it ignores the next explosive hit");
  }
  if (enemy.key === "biscuit") {
    specials.push("Extreme speed");
  }
  if (enemy.key === "diamond") {
    specials.push("Resists heat, energy, freeze, and explosions");
    specials.push("Tier 2 splits into three Tier 1 diamonds");
    specials.push("Tier 3 splits into three Tier 2 diamonds");
  }
  if (enemy.key === "attacker") {
    specials.push("Always hidden");
    specials.push("Has armour without showing the white armour ring");
  }
  if (enemy.key === "shield") {
    specials.push("Projects a protective force field for nearby enemies");
    specials.push("Break the field first, then it becomes a normal enemy");
    specials.push("Tier 2 splits into three Tier 1 shields");
    specials.push("Tier 3 splits into three Tier 2 shields");
  } else if (enemySupportsTiers(enemy.key) && !enemy.key.startsWith("waffle")) {
    specials.push("Tier 2 splits into three Tier 1s");
    specials.push("Tier 3 splits into three Tier 2s");
  }

  return specials;
}

function renderEnemyAlmanacCard(enemy) {
  const hp = Math.round((5 + Math.max(waveNumber, 1)) * enemy.hpMultiplier * DIFFICULTIES.standard.hp);
  const speed = ((30 + Math.max(waveNumber, 1) * 2 + enemy.speedBonus) / DIFFICULTIES.standard.interval) * (MAPS[selectedMap]?.enemySpeed || 1);
  const specials = enemySpecialAbilities(enemy);
  const specialText = specials.length ? specials.join(", ") : "None";
  const effects = [];
  if (enemy.hidden) {
    effects.push("Hidden");
  }
  if (enemy.armored || enemy.key === "armored") {
    effects.push("Armoured");
  }
  if (enemy.key === "shield") {
    effects.push("Shield Aura");
  } else if (enemy.key === "idaen") {
    effects.push("Shield Phase");
  } else if (enemy.key === "adapter") {
    effects.push("Adaptive Boss");
  }
  const effectText = effects.length > 0 ? effects.join(", ") : "None";
  let tierText = "None";
  if (enemy.key === "waffle16") {
    tierText = "Tier 1 mini waffle, Tier 2 2x2 waffle, Tier 3 4x4 waffle.";
  } else if (enemy.key === "shield") {
    tierText = "Tier 1 normal shield, Tier 2 stronger/larger shield, Tier 3 massive shield with much more shield HP.";
  } else if (enemy.key === "diamond") {
    tierText = "Tier 1 normal, Tier 2 tougher/slower/larger, Tier 3 much tougher/slower/larger.";
  } else if (enemySupportsTiers(enemy.key)) {
    tierText = "Tier 1 normal, Tier 2 tougher/slower/larger, Tier 3 much tougher/slower/larger.";
  }
  return `<h3>${enemy.name}</h3><p>${enemy.description}</p><p>Health: ${formatNumber(hp)} | Base Damage: 1 | Speed: ${formatNumber(speed / CELL_SIZE)} cells/s</p><p>Effects: ${effectText}</p><p>Tiers: ${tierText}</p><p>Special: ${specialText}</p><p>Reward: ${enemy.reward}</p>`;
}

function diamondTierForWave(round = waveNumber) {
  if (round >= 30) {
    return 3;
  }
  if (round >= 14) {
    return 2;
  }
  return 1;
}

function shieldTierForWave(round = waveNumber) {
  if (round >= 36) {
    return 3;
  }
  if (round >= 18) {
    return 2;
  }
  return 1;
}

function genericEnemyTierForWave(round = waveNumber) {
  if (round >= 30) {
    return 3;
  }
  if (round >= 14) {
    return 2;
  }
  return 1;
}

function waffleTypeForTier(tier = 3) {
  return ENEMY_TYPES.waffle16;
}

function enemySupportsTiers(enemyKey) {
  return enemyKey !== "idaen";
}

function isDiamondEnemy(enemy) {
  return enemy?.key === "diamond";
}

function isShieldEnemy(enemy) {
  return enemy?.key === "shield";
}

function diamondTierConfig(tier = 1) {
  if (tier >= 3) {
    return {
      hpMultiplier: 4.6,
      speedMultiplier: 0.62,
      rewardMultiplier: 4.2,
      radiusMultiplier: 1.45,
      color: "#55d8ff",
      coreColor: "#e9fbff"
    };
  }
  if (tier === 2) {
    return {
      hpMultiplier: 2.05,
      speedMultiplier: 0.82,
      rewardMultiplier: 1.9,
      radiusMultiplier: 1.18,
      color: "#71dcff",
      coreColor: "#f1fcff"
    };
  }
  return {
    hpMultiplier: 1,
    speedMultiplier: 1,
    rewardMultiplier: 1,
    radiusMultiplier: 1,
    color: null,
    coreColor: "#e8fbff"
  };
}

function shieldTierConfig(tier = 1) {
  if (tier >= 3) {
    return {
      hpMultiplier: 4.2,
      speedMultiplier: 0.58,
      rewardMultiplier: 3.8,
      radiusMultiplier: 1.5,
      color: "#5fa8ff",
      coreColor: "#edf5ff",
      shieldHpMultiplier: 4.8,
      shieldRadiusMultiplier: 1.45
    };
  }
  if (tier === 2) {
    return {
      hpMultiplier: 2.05,
      speedMultiplier: 0.8,
      rewardMultiplier: 1.9,
      radiusMultiplier: 1.2,
      color: "#79baff",
      coreColor: "#f4f8ff",
      shieldHpMultiplier: 2.15,
      shieldRadiusMultiplier: 1.18
    };
  }
  return {
    hpMultiplier: 1,
    speedMultiplier: 1,
    rewardMultiplier: 1,
    radiusMultiplier: 1,
    color: null,
    coreColor: "#f4f8ff",
    shieldHpMultiplier: 1,
    shieldRadiusMultiplier: 1
  };
}

function genericTierConfig(tier = 1) {
  if (tier >= 3) {
    return {
      hpMultiplier: 4.1,
      speedMultiplier: 0.64,
      rewardMultiplier: 3.4,
      radiusMultiplier: 1.4
    };
  }
  if (tier === 2) {
    return {
      hpMultiplier: 1.95,
      speedMultiplier: 0.84,
      rewardMultiplier: 1.75,
      radiusMultiplier: 1.14
    };
  }
  return {
    hpMultiplier: 1,
    speedMultiplier: 1,
    rewardMultiplier: 1,
    radiusMultiplier: 1
  };
}

function startGame() {
  resetGame();
  activeMap = MAPS[selectedMap];
  applyMapViewport();
  if (selectedDifficulty === "sandbox") {
    infiniteMode = true;
    money = 999999;
    lives = 999999;
    setMessage("Sandbox mode: infinite money and lives enabled.", 2.1);
  }
  gameMode = "playing";
  closeTowerPopup();
  openOverlay(null);
  if (!isSandboxMode()) {
    queueNextTutorialStep();
    presentQueuedTutorialPopup();
  }
}

function pauseGame() {
  if (gameMode !== "playing" || activeTutorialPopup) {
    return;
  }

  gameMode = "paused";
  openOverlay("pause");
}

function resumeGame() {
  if (gameMode === "gameover" || activeTutorialPopup) {
    return;
  }
  gameMode = "playing";
  openOverlay(null);
}

function quitToMenu() {
  gameMode = "menu";
  closeTowerPopup();
  openOverlay("menu");
}

function showGameOver() {
  gameMode = "gameover";
  wave = null;
  enemies = [];
  projectiles = [];
  closeTowerPopup();
  if (gameOverSummary) {
    gameOverSummary.textContent = `You reached wave ${waveNumber} on ${MAPS[selectedMap].name}.`;
  }
  openOverlay("gameover");
}

function openAlmanac(origin) {
  almanacOrigin = origin;
  renderAlmanac();
  openOverlay("almanac");
}

function closeAlmanac() {
  if (almanacOrigin === "pause") {
    gameMode = "paused";
    openOverlay("pause");
    presentQueuedTutorialPopup();
    return;
  }

  gameMode = "menu";
  openOverlay("menu");
}

function setTool(nextTool) {
  currentTool = nextTool;

  for (const button of toolGrid.querySelectorAll("button[data-tool]")) {
    button.classList.toggle("active", button.dataset.tool === nextTool);
  }

  draw();
}

function updateMenuSelectors() {
  if (!MAPS[selectedMap]) {
    selectedMap = "meadow";
  }
  activeMap = MAPS[selectedMap];
  persistMenuState();
  for (const button of difficultyOptions.querySelectorAll("[data-difficulty]")) {
    button.classList.toggle("active", button.dataset.difficulty === selectedDifficulty);
  }
  for (const button of mapOptions.querySelectorAll("[data-map]")) {
    button.classList.toggle("active", button.dataset.map === selectedMap);
  }
  menuMapDescription.textContent = `${MAPS[selectedMap].name}: ${MAPS[selectedMap].description}`;
}

function populateSandboxEnemyOptions() {
  if (!sandboxEnemySelect) {
    return;
  }

  sandboxEnemySelect.innerHTML = Object.values(ENEMY_TYPES)
    .filter((enemy) => enemy.key !== "shield" && enemy.key !== "megaWaffle")
    .map((enemy) => `<option value="${enemy.key}">${enemy.name}</option>`)
    .join("");
  updateSandboxTierOptions();
}

function enemyUsesTiers(enemyKey) {
  return enemySupportsTiers(enemyKey) && enemyKey !== "shield";
}

function updateSandboxTierOptions() {
  if (!sandboxTierSelect) {
    return;
  }

  const enemyKey = sandboxEnemySelect?.value || "";
  if (enemyKey === "idaen") {
    sandboxTierLabel.textContent = "Boss Wave";
    sandboxTierSelect.innerHTML = `
      <option value="25">Wave 25</option>
      <option value="50">Wave 50</option>
      <option value="75">Wave 75</option>
      <option value="100">Wave 100</option>
    `;
    sandboxTierSelect.disabled = false;
    sandboxTierSelect.parentElement?.classList.remove("disabled");
    return;
  }

  sandboxTierLabel.textContent = "Tier";
  sandboxTierSelect.innerHTML = `
    <option value="1">Tier 1</option>
    <option value="2">Tier 2</option>
    <option value="3">Tier 3</option>
  `;
  const tiered = enemyUsesTiers(enemyKey);
  sandboxTierSelect.disabled = !tiered;
  sandboxTierSelect.parentElement?.classList.toggle("disabled", !tiered);
  if (!tiered) {
    sandboxTierSelect.value = "1";
  }
}

function updateSandboxPortalOptions() {
  if (!sandboxPortalSelect) {
    return;
  }

  const previous = sandboxPortalSelect.value;
  sandboxPortalSelect.innerHTML = `<option value="auto">Auto</option>${activePortals()
    .map((portal, index) => `<option value="${index}">Portal ${index + 1} (${portal.x + 1}, ${portal.y + 1})</option>`)
    .join("")}`;
  sandboxPortalSelect.value = [...sandboxPortalSelect.options].some((option) => option.value === previous) ? previous : "auto";
}

function updateSandboxControls() {
  if (!sandboxControls) {
    return;
  }

  const active = isSandboxMode() && gameMode !== "menu";
  document.body.dataset.sandboxLayout = active ? "true" : "false";
  sandboxControls.hidden = !active;
  if (!active) {
    return;
  }

  if (document.activeElement !== sandboxWaveInput) {
    sandboxWaveInput.value = String(Math.max(0, waveNumber));
  }
  updateSandboxPortalOptions();
}

function readyAirstrikeTowers() {
  return [];
}

function preferredAirstrikeTower() {
  return null;
}

function updateAirstrikeControls() {
  armedAbility = armedAbility === "airstrike" ? null : armedAbility;
  if (airstrikePanel) {
    airstrikePanel.hidden = true;
  }
}

function isFormFieldFocused() {
  const active = document.activeElement;
  if (!active) {
    return false;
  }
  const tag = active.tagName;
  return active.isContentEditable || tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA" || tag === "BUTTON";
}

function scrollBoardByArrowKey(key) {
  if (!boardFrame || gameMode === "menu" || isFormFieldFocused() || !key.startsWith("Arrow")) {
    return false;
  }
  return true;
}

function updateSmoothBoardScroll(deltaTime) {
  if (!boardFrame || gameMode === "menu" || isFormFieldFocused()) {
    return;
  }

  const maxScrollLeft = Math.max(0, boardFrame.scrollWidth - boardFrame.clientWidth);
  const maxScrollTop = Math.max(0, boardFrame.scrollHeight - boardFrame.clientHeight);
  const acceleration = 2400;
  const friction = Math.max(0, 1 - deltaTime * 8.5);
  const maxSpeed = 900;
  let inputX = 0;
  let inputY = 0;

  if (heldScrollKeys.has("ArrowLeft")) {
    inputX -= 1;
  }
  if (heldScrollKeys.has("ArrowRight")) {
    inputX += 1;
  }
  if (heldScrollKeys.has("ArrowUp")) {
    inputY -= 1;
  }
  if (heldScrollKeys.has("ArrowDown")) {
    inputY += 1;
  }

  if (inputX !== 0 || inputY !== 0) {
    tutorialProgress.scrolled = true;
    renderTutorial();
    queueNextTutorialStep();
  }

  if (maxScrollLeft <= 0 && maxScrollTop <= 0) {
    scrollVelocityX = 0;
    scrollVelocityY = 0;
    return;
  }

  scrollVelocityX = (scrollVelocityX + inputX * acceleration * deltaTime) * friction;
  scrollVelocityY = (scrollVelocityY + inputY * acceleration * deltaTime) * friction;
  scrollVelocityX = Math.max(-maxSpeed, Math.min(maxSpeed, scrollVelocityX));
  scrollVelocityY = Math.max(-maxSpeed, Math.min(maxSpeed, scrollVelocityY));

  if (Math.abs(scrollVelocityX) < 8) {
    scrollVelocityX = 0;
  }
  if (Math.abs(scrollVelocityY) < 8) {
    scrollVelocityY = 0;
  }

  if (scrollVelocityX !== 0 && maxScrollLeft > 0) {
    boardFrame.scrollLeft = Math.max(0, Math.min(maxScrollLeft, boardFrame.scrollLeft + scrollVelocityX * deltaTime));
  }
  if (scrollVelocityY !== 0 && maxScrollTop > 0) {
    boardFrame.scrollTop = Math.max(0, Math.min(maxScrollTop, boardFrame.scrollTop + scrollVelocityY * deltaTime));
  }
}

function shuffledOrder(length) {
  const order = Array.from({ length }, (_, index) => index);
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }
  return order;
}

function dippyAmmoSlotLayout(slotCount) {
  if (slotCount >= 12) {
    const slots = [];
    for (let index = 0; index < 6; index += 1) {
      const outerAngle = (-Math.PI / 2) + (Math.PI * 2 * index) / 6;
      const innerAngle = outerAngle + Math.PI / 6;
      slots.push({ x: Math.cos(outerAngle) * 25, y: Math.sin(outerAngle) * 25, radius: 5.2 });
      slots.push({ x: Math.cos(innerAngle) * 12.5, y: Math.sin(innerAngle) * 12.5, radius: 4.7 });
    }
    return slots;
  }

  if (slotCount >= 6) {
    return Array.from({ length: 6 }, (_, index) => {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * index) / 6;
      return { x: Math.cos(angle) * 15, y: Math.sin(angle) * 15, radius: 5 };
    });
  }

  if (slotCount >= 3) {
    return Array.from({ length: 3 }, (_, index) => {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * index) / 3;
      return { x: Math.cos(angle) * 10.5, y: Math.sin(angle) * 10.5, radius: 5.2 };
    });
  }

  return [{ x: 0, y: 0, radius: 5.5 }];
}

function ensureDippyAmmoOrder(tower, slotCount) {
  if (!tower) {
    return shuffledOrder(slotCount);
  }

  if (!Array.isArray(tower.dippyAmmoOrder) || tower.dippyAmmoOrder.length !== slotCount) {
    tower.dippyAmmoOrder = shuffledOrder(slotCount);
  }

  return tower.dippyAmmoOrder;
}

function setTowerType(nextType) {
  if (nextType === "crossbow" && !crossbowUnlocked) {
    setMessage("Crossbow is locked. Reach Brutal wave 50 on Outpost without placing walls to unlock it.", 2.2);
    return;
  }

  selectedTowerType = nextType;
  currentTool = "tower";

  for (const button of towerGrid.querySelectorAll("button[data-tower-type]")) {
    button.classList.toggle("active", button.dataset.towerType === nextType);
  }

  for (const button of toolGrid.querySelectorAll("button[data-tool]")) {
    button.classList.toggle("active", button.dataset.tool === currentTool);
  }

  selectionText.textContent = `Selected: ${TOWER_INFO[nextType].name}`;
  towerDescription.textContent = TOWER_INFO[nextType].description;
  setMessage(TOWER_INFO[nextType].description, 1.8);
  draw();
}

function updateTowerButtons() {
  for (const button of towerGrid.querySelectorAll("button[data-tower-type]")) {
    const type = button.dataset.towerType;
    const lockedCrossbow = type === "crossbow" && !crossbowUnlocked;
    button.hidden = lockedCrossbow;
    button.disabled = false;
    button.textContent = `${TOWER_INFO[type].name} (${towerCost(type)})`;
  }
}

function maxTowerLevel(tower) {
  return tower.type === "crossbow" ? 4 : 5;
}

function towerFootprint(type) {
  if (type === "dippy") {
    return [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }];
  }
  if (type === "gate") {
    return selectedGateRotation % 2 === 0
      ? [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }]
      : [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }];
  }
  return [{ x: 0, y: 0 }];
}

function towerPlacementCells(type, originX, originY) {
  return towerFootprint(type).map((offset) => ({ x: originX + offset.x, y: originY + offset.y }));
}

function towerPlacementCenter(type, originX, originY) {
  const cells = towerPlacementCells(type, originX, originY);
  const sum = cells.reduce((acc, cell) => {
    const center = cellCenter(cell.x, cell.y);
    return { x: acc.x + center.x, y: acc.y + center.y };
  }, { x: 0, y: 0 });
  return { x: sum.x / cells.length, y: sum.y / cells.length };
}

function activeBossEnemy() {
  return enemies.find((enemy) => enemy.boss && enemy.hp > 0) || null;
}

function rotateActivePiece() {
  if (currentTool === "tower" && selectedTowerType === "gate") {
    selectedGateRotation = (selectedGateRotation + 1) % 2;
    updateHud();
    draw();
    return;
  }
  if (isFactoryMap()) {
    return;
  }
  activePiece = {
    ...activePiece,
    offsets: activePiece.offsets.map((offset) => rotateOffset(offset, 1))
  };
  updateHud();
  draw();
}

function placedCells(originX, originY, piece = activePiece) {
  return piece.offsets.map((offset) => ({
    x: originX + offset.x,
    y: originY + offset.y
  }));
}

function findPathFrom(startPoint, extraBlocked = [], extraOpen = []) {
  const extraBlockedSet = new Set(extraBlocked.map((cell) => `${cell.x},${cell.y}`));
  const extraOpenSet = new Set(extraOpen.map((cell) => `${cell.x},${cell.y}`));
  const queue = [{ x: startPoint.x, y: startPoint.y }];
  const visited = new Set([`${startPoint.x},${startPoint.y}`]);
  const parents = new Map([[`${startPoint.x},${startPoint.y}`, null]]);
  let found = null;
  let fallback = `${startPoint.x},${startPoint.y}`;
  let fallbackDistance = Math.hypot(goalPortal().x - startPoint.x, goalPortal().y - startPoint.y);

  while (queue.length > 0) {
    const current = queue.shift();
    const currentKey = `${current.x},${current.y}`;

    if (current.x === goalPortal().x && current.y === goalPortal().y) {
      found = currentKey;
      break;
    }

    if (isFactoryMap()) {
      for (const direction of factoryTravelDirections()) {
        const nextX = current.x + direction.dx;
        const nextY = current.y + direction.dy;
        const gapX = current.x + direction.gapX;
        const gapY = current.y + direction.gapY;
        const nextKey = `${nextX},${nextY}`;

        if (!inBounds(nextX, nextY) || visited.has(nextKey) || obstacleAt(gapX, gapY)) {
          continue;
        }

        const traversable = isEndpoint(nextX, nextY)
          || (
            isFactoryBuildTile(nextX, nextY)
            && grid[nextY][nextX].blockId !== null
            && !extraBlockedSet.has(nextKey)
            && !obstacleAt(nextX, nextY)
          )
          || extraOpenSet.has(nextKey);

        if (!traversable) {
          continue;
        }

        visited.add(nextKey);
        parents.set(nextKey, currentKey);
        const distanceToGoal = Math.hypot(goalPortal().x - nextX, goalPortal().y - nextY);
        if (distanceToGoal <= fallbackDistance) {
          fallback = nextKey;
          fallbackDistance = distanceToGoal;
        }
        queue.push({ x: nextX, y: nextY });
      }
    } else {
      for (const direction of directions) {
        const nextX = current.x + direction.dx;
        const nextY = current.y + direction.dy;
        const nextKey = `${nextX},${nextY}`;

        if (!inBounds(nextX, nextY) || visited.has(nextKey)) {
          continue;
        }

        if (!isEndpoint(nextX, nextY)) {
          const occupied = grid[nextY][nextX].blockId !== null || obstacleAt(nextX, nextY) || extraBlockedSet.has(nextKey);
          if (occupied) {
            continue;
          }
        }

        visited.add(nextKey);
        parents.set(nextKey, currentKey);
        queue.push({ x: nextX, y: nextY });
      }
    }
  }

  if (!found) {
    if (isFactoryMap()) {
      found = fallback;
    } else {
      return [];
    }
  }

  const result = [];
  let cursor = found;

  while (cursor) {
    const [x, y] = cursor.split(",").map(Number);
    result.push({ x, y });
    cursor = parents.get(cursor);
  }

  return result.reverse();
}

function computeRoutes(extraBlocked = [], extraOpen = []) {
  return activePortals().map((portal) => findPathFrom(portal, extraBlocked, extraOpen));
}

function allRoutesOpen(nextRoutes) {
  if (isFactoryMap()) {
    return nextRoutes.every((path) => path.length > 0);
  }
  return nextRoutes.every((path) => path.length > 0);
}

function canPlacePiece(originX, originY) {
  const cells = placedCells(originX, originY);

  for (const cell of cells) {
    if (!inBounds(cell.x, cell.y) || isEndpoint(cell.x, cell.y)) {
      return false;
    }

    if (!cellInBuildZone(cell.x, cell.y)) {
      return false;
    }

    if (isFactoryMap() && !isFactoryBuildTile(cell.x, cell.y)) {
      return false;
    }

    if (grid[cell.y][cell.x].blockId !== null || obstacleAt(cell.x, cell.y)) {
      return false;
    }
  }

  if (isFactoryMap()) {
    return true;
  }

  return allRoutesOpen(computeRoutes(cells));
}

function canPlaceTowerAt(x, y) {
  if (selectedTowerType === "crossbow" && !crossbowUnlocked) {
    return false;
  }

  const cells = towerPlacementCells(selectedTowerType, x, y);
  if (money < towerCost(selectedTowerType)) {
    return false;
  }

  if (selectedTowerType === "gate") {
    if (isFactoryMap()) {
      return false;
    }

    const [left, center, right] = cells;
    if (![left, center, right].every((cell) => inBounds(cell.x, cell.y) && !isEndpoint(cell.x, cell.y))) {
      return false;
    }

    const leftState = grid[left.y][left.x];
    const centerState = grid[center.y][center.x];
    const rightState = grid[right.y][right.x];
    return leftState.blockId !== null
      && rightState.blockId !== null
      && centerState.blockId === null
      && !obstacleAt(center.x, center.y)
      && leftState.towerId === null
      && centerState.towerId === null
      && rightState.towerId === null;
  }

  for (const cell of cells) {
    if (!inBounds(cell.x, cell.y) || isEndpoint(cell.x, cell.y)) {
      return false;
    }

    const state = grid[cell.y][cell.x];
    if (isFactoryMap()) {
      if (state.blockId !== null || state.towerId !== null || obstacleAt(cell.x, cell.y)) {
        return false;
      }
    } else if (state.blockId === null || state.towerId !== null) {
      return false;
    }
  }

  return true;
}

function placePiece(originX, originY) {
  if (!canPlacePiece(originX, originY)) {
    setMessage("That placement is invalid. Blocks cannot overlap or seal the route.");
    return false;
  }

  if (freeBlocks <= 0 && money < currentBlockCost) {
    setMessage("Not enough cash for a block.");
    return false;
  }

  const blockId = nextBlockId;
  const cells = placedCells(originX, originY);
  const block = {
    id: blockId,
    color: activePiece.color,
    name: activePiece.name,
    cells,
    conveyor: Boolean(activePiece.conveyor)
  };

  for (const cell of cells) {
    grid[cell.y][cell.x].blockId = blockId;
  }

  blocks.set(blockId, block);
  nextBlockId += 1;
  if (freeBlocks > 0) {
    freeBlocks -= 1;
  } else {
    money -= currentBlockCost;
    currentBlockCost *= 2;
  }
  if (selectedMap === "outpost") {
    outpostWalllessQuestFailed = true;
  }
  activePiece = createRandomPiece(selectedMap);
      tutorialProgress.placedBlock = true;
      renderTutorial();
      queueNextTutorialStep();
  return true;
}

function towerAtCell(x, y) {
  const towerId = grid[y][x].towerId;
  return towers.find((tower) => tower.id === towerId) || null;
}

function addPresetBlock(cells, color = "#7f8d99", name = "Fort Wall", locked = true) {
  const blockId = nextBlockId;
  const block = { id: blockId, color, name, cells, locked };

  for (const cell of cells) {
    grid[cell.y][cell.x].blockId = blockId;
  }

  blocks.set(blockId, block);
  nextBlockId += 1;
  return block;
}

function addPresetTower(type, x, y, overrides = {}) {
  const center = towerPlacementCenter(type, x, y);
  const footprintCells = towerPlacementCells(type, x, y);
  const tower = {
    id: nextTowerId,
    type,
    level: 1,
    path1: 0,
    path2: 0,
    targetPriority: "first",
    spent: overrides.spent ?? 0,
    x,
    y,
    footprintCells,
    centerX: center.x,
    centerY: center.y,
    cooldown: 0,
    burstShotsRemaining: 0,
    burstTimer: 0,
    burstTargetId: null,
    aimAngle: -Math.PI / 2,
    fieldCooldown: 0,
    charge: 0,
    stunnedTimer: 0,
    ...overrides
  };

  towers.push(tower);
  for (const cell of footprintCells) {
    grid[cell.y][cell.x].towerId = tower.id;
  }
  nextTowerId += 1;
  return tower;
}

function seedOutpostMap() {
  const centerX = Math.floor(COLS / 2);
  const centerY = Math.floor(ROWS / 2);
  const layout = [
    "00xx000",
    "000x00x",
    "00xxxxx",
    "xxxxx00",
    "x0xxx00",
    "0xx0000",
    "0xxx000"
  ];
  const wallCells = [];

  for (let row = 0; row < layout.length; row += 1) {
    for (let col = 0; col < layout[row].length; col += 1) {
      if (layout[row][col] === "0") {
        wallCells.push({
          x: centerX - 3 + col,
          y: centerY - 3 + row
        });
      }
    }
  }

  addPresetBlock(wallCells, "#7b8895", "Fort Wall", true);
  addPresetTower("crossbow", centerX - 3, centerY - 3, { spent: 0, unique: true, level: 2 });
  addPresetTower("crossbow", centerX + 3, centerY - 3, { spent: 0, unique: true, level: 2 });
  addPresetTower("crossbow", centerX - 3, centerY + 3, { spent: 0, unique: true, level: 2 });
  addPresetTower("crossbow", centerX + 3, centerY + 3, { spent: 0, unique: true, level: 2 });
}

function seedFortificationMap() {
  const localWallCells = [];
  for (let y = 2; y <= 12; y += 1) {
    if (y === 6 || y === 7 || y === 8) {
      continue;
    }
    localWallCells.push({ x: 4, y });
  }

  const localCorridorWalls = [
    { x: 8, y: 2 }, { x: 9, y: 2 }, { x: 10, y: 2 }, { x: 11, y: 2 }, { x: 12, y: 2 },
    { x: 8, y: 12 }, { x: 9, y: 12 }, { x: 10, y: 12 }, { x: 11, y: 12 }, { x: 12, y: 12 },
    { x: 11, y: 4 }, { x: 11, y: 5 }, { x: 11, y: 9 }, { x: 11, y: 10 },
    { x: 16, y: 4 }, { x: 16, y: 5 }, { x: 16, y: 9 }, { x: 16, y: 10 }
  ];
  const localCrossbows = [
    { x: 4, y: 4 },
    { x: 4, y: 10 }
  ];
  const localSpikeCells = [
    { x: 7, y: 7 },
    { x: 10, y: 7 },
    { x: 13, y: 5 },
    { x: 13, y: 9 },
    { x: 18, y: 7 }
  ];
  const allLocalCells = localWallCells.concat(localCorridorWalls, localCrossbows, localSpikeCells);
  const minX = Math.min(...allLocalCells.map((cell) => cell.x));
  const maxX = Math.max(...allLocalCells.map((cell) => cell.x));
  const minY = Math.min(...allLocalCells.map((cell) => cell.y));
  const maxY = Math.max(...allLocalCells.map((cell) => cell.y));
  const layoutWidth = maxX - minX + 1;
  const layoutHeight = maxY - minY + 1;
  const offsetX = Math.floor((COLS - layoutWidth) / 2) - minX;
  const offsetY = Math.floor((ROWS - layoutHeight) / 2) - minY;
  const shiftCell = (cell) => ({ x: cell.x + offsetX, y: cell.y + offsetY });
  const wallCells = [];
  for (const cell of localWallCells) {
    wallCells.push(shiftCell(cell));
  }
  for (const cell of localCorridorWalls) {
    wallCells.push(shiftCell(cell));
  }

  addPresetBlock(wallCells, "#6f7c86", "Fortification Wall", true);
  for (const cell of localCrossbows) {
    const shifted = shiftCell(cell);
    addPresetTower("crossbow", shifted.x, shifted.y, { spent: 0, unique: true, level: 2, upgradeLocked: true });
  }

  for (const cell of localSpikeCells) {
    const shifted = shiftCell(cell);
    const center = cellCenter(shifted.x, shifted.y);
    traps.push({
      id: nextTrapId,
      ownerTowerId: null,
      kind: "spike",
      x: shifted.x,
      y: shifted.y,
      centerX: center.x,
      centerY: center.y,
      damage: 1.9,
      radius: 15,
      ttl: 999999,
      maxTtl: 999999,
      cooldown: 0,
      tickRate: 0.45
    });
    nextTrapId += 1;
  }
}

function applyMapViewport() {
  canvas.width = BASE_CANVAS_WIDTH;
  canvas.height = BASE_CANVAS_HEIGHT;
  if (boardFrame) {
    boardFrame.scrollLeft = 0;
    boardFrame.scrollTop = 0;
  }
}

function seedMapFeatures() {
  if (selectedMap === "outpost") {
    seedOutpostMap();
  } else if (selectedMap === "fortification") {
    seedFortificationMap();
  }
}

function maybeUnlockCrossbowQuest() {
  if (selectedMap === "outpost" && selectedDifficulty === "brutal" && !outpostWalllessQuestFailed && waveNumber >= 50 && !crossbowUnlocked) {
    crossbowUnlocked = true;
    setMessage("Secret unlocked: Crossbow tower can now be purchased in future runs.", 3.2);
    updateHud();
  }
}

function supportWaveIncomeBonus() {
  return supportWaveIncomeEntries().reduce((total, entry) => total + entry.amount, 0);
}

function towerCost(type) {
  return TOWER_BASE_COST[type];
}

function mockTower(type, overrides = {}) {
  const center = towerPlacementCenter(type, 0, 0);
  return {
    id: 0,
    type,
    level: 1,
    path1: 0,
    path2: 0,
    targetPriority: "first",
    spent: towerCost(type),
    x: 0,
    y: 0,
    footprintCells: towerPlacementCells(type, 0, 0),
    centerX: center.x,
    centerY: center.y,
    cooldown: 0,
    burstShotsRemaining: 0,
    burstTimer: 0,
    burstTargetId: null,
    aimAngle: -Math.PI / 2,
    fieldCooldown: 0,
    charge: 0,
    ...overrides
  };
}

function upgradeCost(tower, path = null) {
  if (typeof tower === "number") {
    return 4 + tower * 3;
  }

  if (tower.type === "crossbow") {
    return [12, 18, 28][Math.max(0, tower.level - 1)] || 28;
  }

  if (PATH_TOWER_TYPES.has(tower.type) && path !== null) {
    const nextTier = (path === 1 ? tower.path1 : tower.path2) + 1;
    return UPGRADE_COSTS[tower.type][`path${path}`][nextTier - 1];
  }

  const nextLevel = tower.level + 1;
  const table = UPGRADE_COSTS[tower.type];
  return Array.isArray(table) ? table[Math.max(0, nextLevel - 2)] : 4 + tower.level * 3;
}

function sellValue(tower) {
  if (tower.type === "crossbow") {
    return 5;
  }

  return Math.max(1, Math.round((tower.spent || towerCost(tower.type)) * 0.7));
}

function isPathTower(towerOrType) {
  const type = typeof towerOrType === "string" ? towerOrType : towerOrType?.type;
  return PATH_TOWER_TYPES.has(type);
}

function trapperPathDescription(path, tier) {
  const descriptions = {
    1: {
      1: "Path 1 T1: Faster spawn rate.",
      2: "Path 1 T2: Even faster spawn rate.",
      3: "Path 1 T3: Turrets. Spawns temporary wall turrets instead of path traps.",
      4: "Path 1 T4: Dual Turrets. Gains a second barrel and +15 lifespan.",
      5: "Path 1 T5: Expert Mechanic. +35 more lifespan, faster shooting, more damage."
    },
    2: {
      1: "Path 2 T1: Reinforced Traps. +15 seconds lifetime.",
      2: "Path 2 T2: Better Engineering. More damage and 12 enemy steps.",
      3: "Path 2 T3: Sticky Traps. Traps now slow enemies.",
      4: "Path 2 T4: Mines. Explodes after 12 steps or when time runs out.",
      5: "Path 2 T5: Mango Mines. Explosions rain slowing mango bombs."
    }
  };

  return descriptions[path][tier];
}

function laserPathDescription(path, tier) {
  const descriptions = {
    1: {
      1: "Path 1 T1: Plasma Ignition. Beam applies burn damage over time.",
      2: "Path 1 T2: Thermal Feed. Faster firing with stronger burn.",
      3: "Path 1 T3: Plasma Ray. A continuous white heat stream scorches everything in its path.",
      4: "Path 1 T4: White Core. Longer burn, wider beam, more damage.",
      5: "Path 1 T5: Star Furnace. Max burn output with a relentless plasma stream."
    },
    2: {
      1: "Path 2 T1: Focused Crystals. Higher beam damage.",
      2: "Path 2 T2: Refracted Barrel. More range and burn duration.",
      3: "Path 2 T3: Photon Beam. Bright yellow doom beam, slower but pierces infinitely.",
      4: "Path 2 T4: Solar Lance. Much higher damage and burn.",
      5: "Path 2 T5: Cataclysm Prism. Extreme beam damage with brutal lingering burn."
    }
  };

  return descriptions[path][tier];
}

function shotgunPathDescription(path, tier) {
  const descriptions = {
    1: {
      1: "Path 1 T1: Faster Pump. Reloads faster.",
      2: "Path 1 T2: Hot Buck. More damage.",
      3: "Path 1 T3: Bullet Storm. Quite expensive, much faster firing shotgun.",
      4: "Path 1 T4: Shell Cascade. Even faster firing.",
      5: "Path 1 T5: Brass Hurricane. Extreme shotgun fire rate and heavy spread damage."
    },
    2: {
      1: "Path 2 T1: Signal Splitter. Fires 4 yellow lines.",
      2: "Path 2 T2: Harmonic Fan. Fires 5 yellow lines.",
      3: "Path 2 T3: Broadwave. Fires 18 yellow lines in a 180 degree spread.",
      4: "Path 2 T4: Golden Spectrum. Keeps the huge half-circle burst and hits harder.",
      5: "Path 2 T5: Wavelength V. Massive 18-line spread with even stronger shots."
    }
  };

  return descriptions[path][tier];
}

function freezerPathDescription(path, tier) {
  const descriptions = {
    1: {
      1: "Path 1 T1: Colder Shots. More damage and longer chill.",
      2: "Path 1 T2: Cracking Frost. Chill lasts longer and shots hit harder.",
      3: "Path 1 T3: Permafrost. Emits a pulsing freeze that immobilises enemies, then recharges.",
      4: "Path 1 T4: Deep Winter. Permafrost pulse lasts longer and hits a wider area.",
      5: "Path 1 T5: Ice Age. Massive immobilising bursts with stronger frost shots."
    },
    2: {
      1: "Path 2 T1: Wider Reach. More range.",
      2: "Path 2 T2: Harsher Wind. Better slow strength and duration.",
      3: "Path 2 T3: Frost Aura. Constant slowing aura around the tower.",
      4: "Path 2 T4: Whiteout. Aura grows and can detect hidden enemies.",
      5: "Path 2 T5: Absolute Zero. Extreme aura slow with stronger frost support."
    }
  };

  return descriptions[path][tier];
}

function dippyPathDescription(path, tier) {
  const descriptions = {
    1: {
      1: "Path 1 T1: Bigger Eggs. Eggs hit for 8 and explode in a bigger radius.",
      2: "Path 1 T2: Boiled Eggs. Eggs still hit for 8 and now leave lots of burn.",
      3: "Path 1 T3: Animal Welfare Approved Eggs. Burst of three, each egg deals 8.",
      4: "Path 1 T4: Half-Dozen. Burst of six, each egg deals 8.",
      5: "Path 1 T5: A Dozen Eggs. Burst of twelve, each egg deals 8 before reloading."
    },
    2: {
      1: "Path 2 T1: Fresh Eggs. More explosion radius.",
      2: "Path 2 T2: Harder Shells. Shells fly out like bullets for 10 damage each.",
      3: "Path 2 T3: Egg Pudding. Eggs deal 16 with a bigger blast and hidden detection.",
      4: "Path 2 T4: Mangoes. Eggs deal 20 and leave sticky syrup.",
      5: "Path 2 T5: Mango Pudding. Eggs deal 105, crush shields, and leave stronger syrup that buffs tower attack speed."
    }
  };

  return descriptions[path][tier];
}

function supportPathDescription(path, tier) {
  const descriptions = {
    1: {
      1: "Path 1 T1: Budget Desk. Gives extra cash at the end of each wave.",
      2: "Path 1 T2: Counting House. End-of-wave income increases.",
      3: "Path 1 T3: Treasury Office. Stronger income payout each wave.",
      4: "Path 1 T4: Revenue Bureau. Big end-of-wave cash boost.",
      5: "Path 1 T5: Golden Reserve. Massive bonus cash every wave."
    },
    2: {
      1: "Path 2 T1: Packed Crates. Support radius increases.",
      2: "Path 2 T2: Better Logistics. Nearby towers attack faster.",
      3: "Path 2 T3: Rapid Distribution. Nearby towers attack even faster.",
      4: "Path 2 T4: Telescope. Nearby towers attack faster and can also see hidden enemies.",
      5: "Path 2 T5: Extra Munitions Supplier. Nearby towers gain explosive anti-armour attacks and the hub fires passive support missiles."
    }
  };

  return descriptions[path][tier];
}

function gatePathDescription(path, tier) {
  const descriptions = {
    1: {
      1: "Path 1 T1: Wider Troughs. Acid pools spread wider across the lane.",
      2: "Path 1 T2: Corrosive Mix. Pool damage increases.",
      3: "Path 1 T3: Overflow Gate. Pools refresh faster and cover more ground.",
      4: "Path 1 T4: Sludge Channel. Acid lingers longer and keeps chewing through crowds.",
      5: "Path 1 T5: Industrial Spill. Massive long-lived pools turn the gate into a lane-sized acid wash."
    },
    2: {
      1: "Path 2 T1: Venom Feed. Poison damage lingers harder after enemies leave the pools.",
      2: "Path 2 T2: Sticky Residue. Pools slow enemies more.",
      3: "Path 2 T3: Hidden Fumes. Acid Gate gains more reach and catches hidden enemies more reliably.",
      4: "Path 2 T4: Caustic Pressure. Faster pulses stack poison more aggressively.",
      5: "Path 2 T5: Nerve Agent Gate. Extreme poison uptime with rapid lane denial."
    }
  };

  return descriptions[path][tier];
}

function teslaPathDescription(path, tier) {
  const descriptions = {
    1: {
      1: "Path 1 T1: Improved batteries. Chains 1 enemy.",
      2: "Path 1 T2: Higher voltage. Chains 2 enemies.",
      3: "Path 1 T3: Faster attack sped. Chains 2 enemies.",
      4: "Path 1 T4: Slowing zaps. Chains 3 enemies and adds chain slow.",
      5: "Path 1 T5: Supercharge. Chains 3 enemies with stored energy."
    },
    2: {
      1: "Path 2 T1: Better Damage. Chains 1 enemy with more damage.",
      2: "Path 2 T2: Longer stun. Chains 1 enemy with longer stun.",
      3: "Path 2 T3: Chains 3 enemies. Electric Field and hidden detection unlocked.",
      4: "Path 2 T4: Supertaser. Chains 4 enemies. Field fires more often and stuns longer.",
      5: "Path 2 T5: Electrocannon. Chains 8 enemies with massive blasts and small splash."
    }
  };

  return descriptions[path][tier];
}

function canUpgradeTeslaPath(tower, path) {
  const ownLevel = path === 1 ? tower.path1 : tower.path2;
  const otherLevel = path === 1 ? tower.path2 : tower.path1;

  if (ownLevel >= 5) {
    return false;
  }

  if (ownLevel >= 2 && otherLevel >= 3) {
    return false;
  }

  return !(ownLevel === 2 && otherLevel >= 3);
}

function missilePathDescription(path, tier) {
  const descriptions = {
    1: {
      1: "Path 1 T1: Longer range.",
      2: "Path 1 T2: Bigger explosion.",
      3: "Path 1 T3: Better Munitions. Faster rockets, larger blast, slight damage boost.",
      4: "Path 1 T4: Rocket Burst. Shoots a burst of 2 rockets before reloading for 1.24s.",
      5: "Path 1 T5: Rocket Pods. Shoots a burst of 6 rockets before reloading for 1.20s."
    },
    2: {
      1: "Path 2 T1: More damage.",
      2: "Path 2 T2: Even more damage.",
      3: "Path 2 T3: Shrapnel. Explosion throws damaging shards.",
      4: "Path 2 T4: Clusters. Explosion launches 10 mini bombs with reduced reach.",
      5: "Path 2 T5: Rain of Bombs. Short-range cluster bombs split into more explosives."
    }
  };

  return descriptions[path][tier];
}

function canUpgradeMissilePath(tower, path) {
  return canUpgradeTeslaPath(tower, path);
}

function dronePathDescription(path, tier) {
  const descriptions = {
    1: {
      1: "Path 1 T1: Second Gun. Fires two shots at a time.",
      2: "Path 1 T2: Advanced Tracking. More range and hidden detection.",
      3: "Path 1 T3: Rocket. Fires two bullets and a rocket.",
      4: "Path 1 T4: Increased Gunpowder. Rocket explosion grows and hits harder.",
      5: "Path 1 T5: Attack Drone. 1.25x range, can hunt inside allied tower ranges, rockets fire faster."
    },
    2: {
      1: "Path 2 T1: Improved Mechanics. Faster attack speed.",
      2: "Path 2 T2: Sharper Bullets. Bullets pierce twice.",
      3: "Path 2 T3: Extra Support. Gains 2 extra support drones.",
      4: "Path 2 T4: Additional Weapons. Main drone gets four guns, supports get two.",
      5: "Path 2 T5: Drone Commander. Gains 2 more support drones and 1.5x range."
    }
  };

  return descriptions[path][tier];
}

function upgradeNameForTower(type, path, tier) {
  const description = pathDescriptionForTower({ type }, path, tier);
  const match = description.match(/^Path \d T\d: (.+)$/);
  if (!match) {
    return description;
  }

  return match[1].split(".")[0];
}

function canUpgradeDronePath(tower, path) {
  return canUpgradeTeslaPath(tower, path);
}

function canUpgradeTrapperPath(tower, path) {
  return canUpgradeTeslaPath(tower, path);
}

function canUpgradeLaserPath(tower, path) {
  return canUpgradeTeslaPath(tower, path);
}

function canUpgradeFreezerPath(tower, path) {
  return canUpgradeTeslaPath(tower, path);
}

function canUpgradeDippyPath(tower, path) {
  return canUpgradeTeslaPath(tower, path);
}

function canUpgradeSupportPath(tower, path) {
  return canUpgradeTeslaPath(tower, path);
}

function pathDescriptionForTower(tower, path, tier) {
  if (tower.type === "tesla") {
    return teslaPathDescription(path, tier);
  }

  if (tower.type === "missile") {
    return missilePathDescription(path, tier);
  }

  if (tower.type === "trapper") {
    return trapperPathDescription(path, tier);
  }

  if (tower.type === "laser") {
    return laserPathDescription(path, tier);
  }

  if (tower.type === "shotgun") {
    return shotgunPathDescription(path, tier);
  }

  if (tower.type === "freezer") {
    return freezerPathDescription(path, tier);
  }

  if (tower.type === "dippy") {
    return dippyPathDescription(path, tier);
  }

  if (tower.type === "support") {
    return supportPathDescription(path, tier);
  }

  if (tower.type === "gate") {
    return gatePathDescription(path, tier);
  }

  return dronePathDescription(path, tier);
}

function canUpgradeTowerPath(tower, path) {
  if (tower.type === "tesla") {
    return canUpgradeTeslaPath(tower, path);
  }

  if (tower.type === "missile") {
    return canUpgradeMissilePath(tower, path);
  }

  if (tower.type === "trapper") {
    return canUpgradeTrapperPath(tower, path);
  }

  if (tower.type === "laser") {
    return canUpgradeLaserPath(tower, path);
  }

  if (tower.type === "shotgun") {
    return canUpgradeTeslaPath(tower, path);
  }

  if (tower.type === "freezer") {
    return canUpgradeFreezerPath(tower, path);
  }

  if (tower.type === "dippy") {
    return canUpgradeDippyPath(tower, path);
  }

  if (tower.type === "support") {
    return canUpgradeSupportPath(tower, path);
  }

  if (tower.type === "gate") {
    return canUpgradeTeslaPath(tower, path);
  }

  return canUpgradeDronePath(tower, path);
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.00$/, "");
}

function formatRange(value) {
  return formatNumber(value / CELL_SIZE);
}

function towerStatSummary(type, overrides = {}) {
  const tower = mockTower(type, overrides);
  const stats = towerStats(tower);
  const armoredProbe = { armored: true, armorHp: 4, hidden: false };
  const hitsArmored = canTowerDamageEnemy(tower, armoredProbe, stats);
  const attacksPerSecond = type === "support"
    ? 0
    : type === "trapper" && stats.turretMode
    ? 1 / stats.turretCooldown
    : 1 / stats.cooldown;
  const damage = type === "trapper" && stats.turretMode ? stats.turretDamage : type === "drone" ? Math.max(stats.bulletDamage, stats.rocket ? stats.rocketDamage : 0) : stats.damage;
  const range = type === "trapper" && stats.turretMode ? stats.turretRange : stats.range;
  const extras = [];

  if (stats.detectHidden) {
    extras.push("Detects hidden");
  }
  if (type === "missile" && stats.splash) {
    extras.push(`Splash ${formatNumber(stats.splash)}`);
  }
  if (type === "shotgun") {
    extras.push(`Lines ${stats.pellets}`);
    extras.push(`Spread ${formatNumber(stats.spread)}`);
  }
  if (type === "tesla" && stats.chainCount) {
    extras.push(`Chains ${stats.chainCount}`);
  }
  if (type === "tesla" && stats.splash) {
    extras.push(`Splash ${formatNumber(stats.splash)}`);
  }
  if (type === "trapper") {
    extras.push(stats.turretMode ? `Turret life ${formatNumber(stats.trapLifetime)}s` : `Life ${formatNumber(stats.trapLifetime)}s`);
    if (stats.turretMode && stats.turretCap > 0) {
      extras.push(`Sentry cap ${stats.turretCap}`);
    }
  }
  if (type === "freezer") {
    extras.push(`Slow ${formatNumber((1 - stats.slow) * 100)}% for ${formatNumber(stats.slowDuration)}s`);
    if (stats.permafrost) {
      extras.push(`Freeze pulse ${formatNumber(stats.pulseFreeze)}s`);
      extras.push(`Pulse damage ${formatNumber(stats.pulseDamage)}`);
    }
    if (stats.aura) {
      extras.push(`Aura slow ${formatNumber((1 - stats.auraSlow) * 100)}%`);
      extras.push(`Aura damage ${formatNumber(stats.auraDamage)}/tick`);
    }
  }
  if (type === "drone" && stats.supportCount) {
    extras.push(`Support drones ${stats.supportCount}`);
    extras.push(`Mini drone damage ${formatNumber(stats.supportDamage)}`);
    extras.push(`Mini drone guns ${stats.supportGuns}`);
    extras.push(`Mini drone range ${formatRange(stats.supportRange)}`);
  }
  if (type === "crossbow" && stats.attackSpeedMultiplier > 1) {
    extras.push(`Attack speed x${formatNumber(stats.attackSpeedMultiplier)}`);
  }
  if (type === "crossbow" && stats.boltPierce > 0) {
    extras.push(`Bolt pierce ${stats.boltPierce}`);
  }
  if (type === "crossbow") {
    extras.push("Unlocked via Outpost secret");
  }
  if (type === "dippy") {
    extras.push("Needs 2x2 space");
    extras.push(`Splash ${formatNumber(stats.splash)}`);
    extras.push(`Dead zone ${formatRange(stats.minRange)}`);
    if (stats.inaccuracy > 0) {
      extras.push(`Scatter ${formatRange(stats.inaccuracy)}`);
    }
    if (stats.burst > 1) {
      extras.push(`Burst ${stats.burst}, reload ${formatNumber(stats.cooldown)}s`);
    }
    if (stats.burnDamage > 0) {
      extras.push(`Burn ${formatNumber(stats.burnDamage)}/s for ${formatNumber(stats.burnDuration)}s`);
    }
    if (stats.shells) {
      extras.push(`Shell fragments ${formatNumber(stats.shellDamage)}`);
    }
    if (stats.sticky) {
      extras.push(`Sticky syrup ${formatNumber((1 - stats.stickySlow) * 100)}%`);
    }
    if (stats.syrupDamage > 0) {
      extras.push(`Mango syrup DPS ${formatNumber(stats.syrupDamage)}`);
      extras.push(`Syrup attack speed x${formatNumber(stats.syrupTowerBuff)}`);
    }
    if (stats.shockwaves > 1) {
      extras.push(`Shockwaves ${stats.shockwaves}`);
    }
    extras.push(`Shake ${formatNumber(stats.screenShake)}`);
  }
  if (type === "support") {
    extras.push(`Wave cash ${formatNumber(stats.waveCash)}`);
    extras.push(`Aura radius ${formatRange(stats.auraRadius)}`);
    if (stats.attackSpeedAura > 1) {
      extras.push(`Attack speed x${formatNumber(stats.attackSpeedAura)}`);
    }
    if (stats.munitions) {
      extras.push("Munitions aura");
      extras.push("Nearby towers deal explosive damage");
      extras.push("Nearby towers hit armoured");
    }
    if (stats.detectHiddenAura) {
      extras.push("Telescope aura");
      extras.push("Nearby towers detect hidden");
    }
    if (stats.helpMissile) {
      extras.push(`Support missile every ${formatNumber(stats.helpMissileCooldown)}s`);
    }
  }
  if (type === "gate") {
    extras.push("Needs wall-path-wall placement");
    extras.push("Rotate with R before placing");
    extras.push(`Pool life ${formatNumber(stats.poolTtl)}s`);
    extras.push(`Poison life ${formatNumber(stats.poisonTtl)}s`);
    extras.push(`Acid DPS ${formatNumber(stats.dotDamage)}`);
    extras.push(`Poison DPS ${formatNumber(stats.poisonDamage)}`);
    extras.push(`Slow ${formatNumber((1 - stats.acidSlow) * 100)}%`);
    extras.push("Hits hidden");
    extras.push("Cannot hit armoured");
  }
  if (type === "laser" && stats.beamWidth) {
    extras.push(`Beam width ${formatNumber(stats.beamWidth)}`);
  }
  if (type === "missile" && stats.burst > 1) {
    extras.push(`Burst ${stats.burst} rockets, reload ${formatNumber(stats.cooldown)}s`);
  }
  if (stats.burnDamage > 0 && stats.burnDuration > 0) {
    extras.push(`Burn ${formatNumber(stats.burnDamage)}/s for ${formatNumber(stats.burnDuration)}s`);
  }
  if (hitsArmored) {
    extras.push("Hits armoured");
  }

  return {
    damage,
    aps: attacksPerSecond,
    range,
    extras,
    hitsArmored
  };
}

function renderTowerStatsBlock(label, summary) {
  const extras = summary.extras.length ? `<p>${summary.extras.join(" | ")}</p>` : "";
  return `<div><strong>${label}</strong><p>Damage: ${formatNumber(summary.damage)} | APS: ${formatNumber(summary.aps)} | Range: ${formatRange(summary.range)}</p>${extras}</div>`;
}

function armoredUnlockText(type) {
  if (type === "missile" || type === "laser") {
    return "Hits armoured from level 1.";
  }

  if (type === "drone") {
    return "Hits armoured at Path 1 T3 when rockets unlock.";
  }

  if (type === "trapper") {
    return "Hits armoured at Path 2 T4 when mines unlock.";
  }

  if (type === "freezer") {
    return "Cannot damage armoured enemies until their shell is broken.";
  }

  if (type === "dippy") {
    return "Hits armoured from level 1.";
  }

  if (type === "support") {
    return "Support tower does not attack. Path 2 T5 lets nearby towers hit armoured.";
  }

  if (type === "gate") {
    return "Cannot damage armoured enemies, but its acid and poison still catch hidden enemies from level 1.";
  }

  return "Hits armoured at Path 2 T5 with Electrocannon.";
}

function pathUpgradeSummary(type, path) {
  const entries = [];

  for (let tier = 1; tier <= 5; tier += 1) {
    const overrides = path === 1
      ? { path1: tier, path2: 0, level: 1 + tier }
      : { path1: 0, path2: tier, level: 1 + tier };
    const summary = towerStatSummary(type, overrides);
    entries.push(`<p><strong>${upgradeNameForTower(type, path, tier)}</strong>: Damage ${formatNumber(summary.damage)}, APS ${formatNumber(summary.aps)}, Range ${formatRange(summary.range)}${summary.extras.length ? `, ${summary.extras.join(", ")}` : ""}</p>`);
  }

  return entries.join("");
}

function linearUpgradeSummary(type, maxLevel) {
  const entries = [];

  for (let level = 2; level <= maxLevel; level += 1) {
    const summary = towerStatSummary(type, { level });
    entries.push(`<p><strong>${linearUpgradeName(type, level)}</strong>: Damage ${formatNumber(summary.damage)}, APS ${formatNumber(summary.aps)}, Range ${formatRange(summary.range)}${summary.extras.length ? `, ${summary.extras.join(", ")}` : ""}</p>`);
  }

  return entries.join("");
}

function linearUpgradeName(type, level) {
  if (type === "crossbow") {
    const names = {
      2: "Twin Limbs",
      3: "Bodkin Rack",
      4: "Ballista Frame"
    };
    return names[level] || `Level ${level}`;
  }

  if (type === "gate") {
    const names = {
      2: "Charged Rails",
      3: "Arcing Coil",
      4: "Storm Span",
      5: "Overload Gate"
    };
    return names[level] || `Level ${level}`;
  }

  return `Level ${level}`;
}

function renderTowerAlmanacDetail(type) {
  const info = TOWER_INFO[type];
  const baseSummary = towerStatSummary(type);
  let detail = `<h3>${info.name}</h3><p>${info.description}</p><p><strong>Armoured:</strong> ${armoredUnlockText(type)}</p>${renderTowerStatsBlock("Base", baseSummary)}`;

  if (isPathTower(type)) {
    detail += `<h4>Path 1</h4>${pathUpgradeSummary(type, 1)}`;
    detail += `<h4>Path 2</h4>${pathUpgradeSummary(type, 2)}`;
  } else if (maxTowerLevel({ type }) > 1) {
    detail += `<h4>Upgrade Levels</h4>${linearUpgradeSummary(type, maxTowerLevel({ type }))}`;
  }

  almanacDetail.innerHTML = detail;
}

function clearSelection(clearTool = false) {
  selectedTowerId = null;
  closeTowerPopup();

  if (clearTool) {
    currentTool = null;
    for (const button of toolGrid.querySelectorAll("button[data-tool]")) {
      button.classList.remove("active");
    }
  }
}

function appendSellButton(container, tower) {
  const sellButton = document.createElement("button");
  sellButton.className = "tower-upgrade secondary";
  sellButton.dataset.sellTowerId = tower.id;
  sellButton.textContent = `Sell (${sellValue(tower)})`;
  container.appendChild(sellButton);
}

function appendPriorityButton(container, tower) {
  const button = document.createElement("button");
  button.className = "tower-upgrade secondary";
  button.dataset.priorityTowerId = tower.id;
  button.textContent = `Priority: ${TARGET_LABELS[tower.targetPriority || "first"]}`;
  container.appendChild(button);
}

function towerCanDetectHidden(tower) {
  return towerHasHiddenDetection(tower, towerStats(tower));
}

function availablePrioritiesForTower(tower) {
  return TARGET_PRIORITIES.filter((priority) => priority !== "hidden" || towerCanDetectHidden(tower));
}

function normalizeTowerPriority(tower) {
  const allowed = availablePrioritiesForTower(tower);
  if (!allowed.includes(tower.targetPriority)) {
    tower.targetPriority = "first";
  }
}

function towerCapabilityText(tower) {
  if (tower.type === "support") {
    return "Passive support aura.";
  }
  if (tower.type === "gate") {
    return "Passive acid gate. It floods its lane with stacking poison pools.";
  }
  return towerCanDetectHidden(tower) ? "Can attack hiddens." : "Cannot attack hiddens.";
}

function closeTowerPopup() {
  towerPopup.hidden = true;
  towerPopup.classList.remove("left", "right");
}

function openTowerPopup(tower) {
  if (!tower) {
    closeTowerPopup();
    return;
  }

  towerPopup.hidden = false;
  towerPopup.classList.toggle("left", tower.x >= COLS / 2);
  towerPopup.classList.toggle("right", tower.x < COLS / 2);
  towerPopupTitle.textContent = TOWER_INFO[tower.type].name;

  normalizeTowerPriority(tower);

  if (isPathTower(tower)) {
    towerPopupSummary.textContent = tower.type === "support" || tower.type === "gate"
      ? `${TOWER_INFO[tower.type].name} Lv ${tower.level}. Path 1: ${tower.path1}/5. Path 2: ${tower.path2}/5. ${towerCapabilityText(tower)}`
      : `${TOWER_INFO[tower.type].name} Lv ${tower.level}. Path 1: ${tower.path1}/5. Path 2: ${tower.path2}/5. Priority: ${TARGET_LABELS[tower.targetPriority || "first"]}. ${towerCapabilityText(tower)}`;
  } else {
    towerPopupSummary.textContent = tower.type === "gate"
      ? `${TOWER_INFO[tower.type].description} Level ${tower.level}/${maxTowerLevel(tower)}. ${towerCapabilityText(tower)}`
      : `${TOWER_INFO[tower.type].description} Level ${tower.level}/${maxTowerLevel(tower)}. Priority: ${TARGET_LABELS[tower.targetPriority || "first"]}. ${towerCapabilityText(tower)}`;
  }

  towerPopupActions.innerHTML = "";
  const upgradesLocked = Boolean(tower.upgradeLocked);

  if (isPathTower(tower)) {
    const nextPath1 = tower.path1 + 1;
    const nextPath2 = tower.path2 + 1;
    const canPath1 = canUpgradeTowerPath(tower, 1);
    const canPath2 = canUpgradeTowerPath(tower, 2);
    const path1Text = pathDescriptionForTower(tower, 1, Math.min(nextPath1, 5));
    const path2Text = pathDescriptionForTower(tower, 2, Math.min(nextPath2, 5));
    const button1 = document.createElement("button");
    button1.className = "tower-upgrade";
    button1.dataset.upgradeTowerId = tower.id;
    button1.dataset.upgradePath = "1";
    button1.textContent = upgradesLocked
      ? "Fort tower: upgrades locked"
      : canPath1
      ? `${path1Text} (${upgradeCost(tower, 1)})`
      : "Path 1 maxed";
    button1.disabled = upgradesLocked || !canPath1;
    towerPopupActions.appendChild(button1);

    const button2 = document.createElement("button");
    button2.className = "tower-upgrade";
    button2.dataset.upgradeTowerId = tower.id;
    button2.dataset.upgradePath = "2";
    button2.textContent = upgradesLocked
      ? "Fort tower: upgrades locked"
      : canPath2
      ? `${path2Text} (${upgradeCost(tower, 2)})`
      : "Path 2 maxed";
    button2.disabled = upgradesLocked || !canPath2;
    towerPopupActions.appendChild(button2);
    if (tower.type !== "support" && tower.type !== "gate") {
      appendPriorityButton(towerPopupActions, tower);
    }
    appendSellButton(towerPopupActions, tower);
    return;
  }

  const upgradeButton = document.createElement("button");
  upgradeButton.className = "tower-upgrade";
  upgradeButton.dataset.upgradeTowerId = tower.id;
  const nextLinearName = linearUpgradeName(tower.type, tower.level + 1);
  upgradeButton.textContent = upgradesLocked
    ? "Fort tower: upgrades locked"
    : tower.level >= maxTowerLevel(tower)
      ? "Max upgraded"
      : `${nextLinearName} (${upgradeCost(tower)})`;
  upgradeButton.disabled = upgradesLocked || tower.level >= maxTowerLevel(tower);
  towerPopupActions.appendChild(upgradeButton);
  if (tower.type !== "support" && tower.type !== "gate") {
    appendPriorityButton(towerPopupActions, tower);
  }
  appendSellButton(towerPopupActions, tower);
}

function placeTower(x, y) {
  if (!canPlaceTowerAt(x, y)) {
    setMessage(
      selectedTowerType === "dippy"
        ? "Dippy needs a clear 2x2 block space."
        : selectedTowerType === "gate"
          ? "Acid Gate needs a wall, path, wall lane and can be rotated with R."
          : "That block tile cannot take a tower."
    );
    return false;
  }

  const cost = towerCost(selectedTowerType);

  if (money < cost) {
    setMessage("Not enough money for that tower.");
    return false;
  }

  const center = towerPlacementCenter(selectedTowerType, x, y);
  const footprintCells = towerPlacementCells(selectedTowerType, x, y);
  const tower = {
    id: nextTowerId,
    type: selectedTowerType,
    level: 1,
    path1: 0,
    path2: 0,
    targetPriority: "first",
    spent: cost,
    x,
    y,
    footprintCells,
    centerX: center.x,
    centerY: center.y,
    cooldown: 0,
    burstShotsRemaining: 0,
    burstTimer: 0,
    burstTargetId: null,
    aimAngle: selectedTowerType === "gate" ? selectedGateRotation * (Math.PI / 2) : -Math.PI / 2,
    fieldCooldown: 0,
    charge: 0,
    stunnedTimer: 0,
    rotation: selectedTowerType === "gate" ? selectedGateRotation : 0
  };

  towers.push(tower);
  if (selectedTowerType === "drone") {
    drones.push({
      id: `${tower.id}:0`,
      towerId: tower.id,
      support: false,
      slot: 0,
      angle: 0,
      orbitRadius: CELL_SIZE * 0.9,
      x: center.x,
      y: center.y,
      cooldown: 0,
      rocketCooldown: 0,
      range: CELL_SIZE * 1.15,
      bodyRadius: 6
    });
  }
  for (const cell of footprintCells) {
    grid[cell.y][cell.x].towerId = tower.id;
  }
  nextTowerId += 1;
  money -= cost;
  selectedTowerId = tower.id;
      tutorialProgress.placedTower = true;
      renderTutorial();
      queueNextTutorialStep();
  return true;
}

function upgradeTower(x, y, path = null) {
  const tower = x && typeof x === "object" ? x : towerAtCell(x, y);

  if (!tower) {
    setMessage("Select an existing tower to upgrade.");
    return false;
  }

  if (tower.upgradeLocked) {
    setMessage("Those fort crossbows are fixed defenses and cannot be upgraded.");
    return false;
  }

  if (isPathTower(tower) && path === null) {
    selectedTowerId = tower.id;
    openTowerPopup(tower);
    setMessage("Select an upgrade path in the tower popup.", 1.4);
    return false;
  }

  if (tower.type === "crossbow") {
    if (tower.level >= 4) {
      setMessage("That crossbow is already fully upgraded.");
      return false;
    }

    const cost = upgradeCost(tower);
    const nextLevel = tower.level + 1;

    if (money < cost) {
      setMessage("Not enough money to upgrade that tower.");
      return false;
    }

    tower.level += 1;
    money -= cost;
    tower.spent = (tower.spent || 0) + cost;
    selectedTowerId = tower.id;
    tutorialProgress.upgradedTower = true;
    renderTutorial();
    queueNextTutorialStep();
    queueNextTutorialStep();
    setMessage(`Crossbow upgraded to ${linearUpgradeName("crossbow", nextLevel)}.`, 1.2);
    openTowerPopup(tower);
    return true;
  }

  if (isPathTower(tower) && path !== null) {
    const canUpgradePath = canUpgradeTowerPath(tower, path);
    if (!canUpgradePath) {
      setMessage("That upgrade path is maxed.");
      return false;
    }
  } else if (tower.level >= 5) {
    setMessage("That tower is already at max upgrade.");
    return false;
  }

  const cost = upgradeCost(tower, path);

  if (money < cost) {
    setMessage("Not enough money to upgrade that tower.");
    return false;
  }

  if (isPathTower(tower) && path !== null) {
    if (path === 1) {
      tower.path1 += 1;
    } else {
      tower.path2 += 1;
    }
    tower.level = 1 + tower.path1 + tower.path2;
  } else {
    tower.level += 1;
  }
  money -= cost;
  tower.spent = (tower.spent || towerCost(tower.type)) + cost;
  selectedTowerId = tower.id;
  tutorialProgress.upgradedTower = true;
  renderTutorial();
  setMessage(`${TOWER_INFO[tower.type].name} upgraded to level ${tower.level}.`, 1.2);
  openTowerPopup(tower);
  return true;
}

function removeTowerById(towerId) {
  const tower = towers.find((entry) => entry.id === towerId);

  if (!tower) {
    return null;
  }

  for (const cell of tower.footprintCells || [{ x: tower.x, y: tower.y }]) {
    grid[cell.y][cell.x].towerId = null;
  }
  towers = towers.filter((entry) => entry.id !== towerId);
  drones = drones.filter((drone) => drone.towerId !== towerId);
  traps = traps.filter((entry) => entry.ownerTowerId !== towerId);

  if (selectedTowerId === towerId) {
    clearSelection(false);
  }

  return tower;
}

function sellTower(x, y) {
  const tower = x && typeof x === "object" ? x : towerAtCell(x, y);

  if (!tower) {
    setMessage("Select a tower to sell.");
    return false;
  }

  money += sellValue(tower);
  removeTowerById(tower.id);
  setMessage(`${TOWER_INFO[tower.type].name} sold.`, 1.2);
  return true;
}

function removeBlock(blockId) {
  const block = blocks.get(blockId);

  if (!block) {
    return false;
  }

  if (block.locked) {
    setMessage("That outpost wall is fixed in place.");
    return false;
  }

  for (const cell of block.cells) {
    const cellState = grid[cell.y][cell.x];

    if (cellState.towerId !== null) {
      removeTowerById(cellState.towerId);
    }

    cellState.blockId = null;
    cellState.towerId = null;
  }

  blocks.delete(blockId);
  return true;
}

function eraseAt(x, y) {
  const cell = grid[y][x];

  if (cell.blockId !== null) {
    return removeBlock(cell.blockId);
  }

  return false;
}

function applyTool(x, y) {
  if (gameMode !== "playing" || !inBounds(x, y) || isEndpoint(x, y)) {
    return;
  }

  const clickedTower = towerAtCell(x, y);
  selectedTowerId = clickedTower ? clickedTower.id : null;

  if (clickedTower) {
    towerDescription.textContent = `${TOWER_INFO[clickedTower.type].description} ${towerCapabilityText(clickedTower)}`;
    openTowerPopup(clickedTower);
  } else if (grid[y][x].blockId !== null) {
    const block = blocks.get(grid[y][x].blockId);
    towerDescription.textContent = isFactoryMap()
      ? `${block.name}. Enemies follow connected conveyors through the factory.`
      : `${block.name} tetromino. Solid wall tile for tower placement.`;
    closeTowerPopup();
  } else {
    closeTowerPopup();
  }

  let changed = false;

  if (currentTool === "wall") {
    changed = placePiece(x, y);
  } else if (currentTool === "tower") {
    changed = placeTower(x, y);
  } else if (currentTool === "upgrade") {
    changed = upgradeTower(x, y);
  } else if (currentTool === "erase") {
    changed = eraseAt(x, y);
  }

  if (!changed && currentTool === "tower") {
    invalidPlacementTimer = 0.32;
  }

  if (changed) {
    routes = computeRoutes();
    updateHud();
    draw();
  } else {
    updateHud();
    draw();
  }
}

function routePoints(pathIndex = 0) {
  return (routes[pathIndex] || []).map((point) => cellCenter(point.x, point.y));
}

function enemyRoutePoints(enemy) {
  return enemy.route ? enemy.route.map((point) => cellCenter(point.x, point.y)) : routePoints(enemy.portalIndex);
}

function routeCells(pathIndex = null) {
  if (pathIndex !== null) {
    return (routes[pathIndex] || []).slice(1, -1);
  }

  const seen = new Set();
  const cells = [];

  for (const path of routes) {
    for (const cell of path.slice(1, -1)) {
      const key = `${cell.x},${cell.y}`;
      if (!seen.has(key)) {
        seen.add(key);
        cells.push(cell);
      }
    }
  }

  return cells;
}

function createEnemy(enemyType, options = {}) {
  const requestedTier = Math.max(1, Math.min(3, options.tier || 1));
  const resolvedEnemyType = enemyType.key.startsWith("waffle") ? waffleTypeForTier(requestedTier) : enemyType;
  const portalIndex = options.portalIndex ?? nextSpawnPortalIndex();
  const startCell = options.startCell || activePortals()[portalIndex];
  const route = options.route || (options.startCell ? findPathFrom(startCell) : null);

  if (route && route.length === 0) {
    return null;
  }

  const center = cellCenter(startCell.x, startCell.y);
  const tier = resolvedEnemyType.key.startsWith("waffle")
    ? requestedTier
    : (enemyUsesTiers(resolvedEnemyType.key) ? requestedTier : 1);
  const diamondTier = resolvedEnemyType.key === "diamond" ? diamondTierConfig(tier) : null;
  const shielded = Boolean(options.shielded) || resolvedEnemyType.key === "shield";
  const shieldTier = shielded ? shieldTierConfig(tier) : null;
  const genericTier = !diamondTier && !shieldTier && enemyUsesTiers(resolvedEnemyType.key) ? genericTierConfig(tier) : null;
  const tierConfig = diamondTier || shieldTier || genericTier;
  const hp = options.hp ?? Math.round((5 + waveNumber) * resolvedEnemyType.hpMultiplier * DIFFICULTIES[selectedDifficulty].hp * (tierConfig?.hpMultiplier || 1));
  const armored = options.armored ?? (Boolean(resolvedEnemyType.armored) || resolvedEnemyType.key === "armored");
  const armorValue = options.armorHp ?? (armored ? resolvedEnemyType.armor + Math.floor((waveNumber - 9) / 4) : 0);
  const waffleRewardMultiplier = resolvedEnemyType.key === "waffle16" ? (tier >= 3 ? 1 : tier === 2 ? 0.3 : 0.1) : 1;
  const waffleSpeedBonus = resolvedEnemyType.key === "waffle16" ? (tier >= 3 ? -10 : tier === 2 ? -2 : 10) : 0;
  const reward = options.reward ?? Math.max(1, Math.round(resolvedEnemyType.reward * waffleRewardMultiplier * rewardMultiplier() * (tierConfig?.rewardMultiplier || 1)));
  const speed = options.speed ?? (((30 + waveNumber * 2 + (resolvedEnemyType.speedBonus + waffleSpeedBonus)) / DIFFICULTIES[selectedDifficulty].interval) * (tierConfig?.speedMultiplier || 1) * (activeMap.enemySpeed || 1));
  const shieldHp = shielded
    ? (options.shieldHp ?? Math.round((18 + waveNumber * 2.4) * (shieldTier?.shieldHpMultiplier || 1) * 3))
    : 0;
  const shieldRadius = shielded
    ? CELL_SIZE * (2.4 * (shieldTier?.shieldRadiusMultiplier || 1))
    : 0;

  return {
    id: nextEnemyId++,
    key: resolvedEnemyType.key,
    portalIndex,
    route,
    type: resolvedEnemyType.name,
    shapeSides: resolvedEnemyType.shape,
    reward,
    color: options.color || (shielded ? "#79beff" : null) || tierConfig?.color || resolvedEnemyType.color,
    waffleSquares: options.waffleSquares ?? (resolvedEnemyType.key === "waffle16" ? (tier >= 3 ? 16 : tier === 2 ? 4 : 1) : (resolvedEnemyType.waffleSquares || 0)),
    x: center.x,
    y: center.y,
    progress: options.progress || 0,
    speed,
    hp,
    maxHp: hp,
    tier,
    coreColor: tierConfig?.coreColor || null,
    sizeScale: tierConfig?.radiusMultiplier || 1,
    shielded,
    shieldHp,
    maxShieldHp: shieldHp,
    shieldRadius,
    hidden: options.hidden ?? Boolean(resolvedEnemyType.hidden),
    armored,
    armorHp: armorValue,
    maxArmorHp: armorValue,
    suppressArmorVisual: Boolean(resolvedEnemyType.suppressArmorVisual),
    stunTimer: 0,
    slowFactor: 1,
    slowTimer: 0,
    burnTimer: 0,
    burnDamage: 0,
    poisonTimer: 0,
    poisonDamage: 0,
    whiteoutTimer: 0,
    healthBarLagHp: hp,
    healthBarFlashTimer: 0,
    facingAngle: 0,
    summonWave: options.summonWave || waveNumber,
    bossOwnerId: options.bossOwnerId || null,
    bossShieldMinion: Boolean(options.bossShieldMinion),
    summonStunRadius: options.summonStunRadius || 0,
    adapterGuards: {
      energy: false,
      chemical: false,
      explosive: false,
      kinetic: false
    }
  };
}

function pushEnemy(enemy) {
  if (!enemy) {
    return null;
  }

  const firstEncounter = !introducedEnemyKeys.has(enemy.key);
  discoveredEnemies.add(enemy.key);
  if (firstEncounter) {
    introducedEnemyKeys.add(enemy.key);
  }
  renderAlmanac();
  if ((enemy.shielded || isShieldEnemy(enemy)) && (enemy.shieldHp || 0) > 0) {
    addPulse(enemy.x, enemy.y, enemy.shieldRadius || 24, "rgba(176, 225, 255, 0.45)");
  }
  if (firstEncounter && gameMode === "playing" && !enemy.bossShieldMinion) {
    queueTutorialPopup(`enemy-intro-${enemy.key}`, `${ENEMY_TYPES[enemy.key]?.name || enemy.type} Spotted`, enemyIntroMessage(enemy.key));
  }
  enemies.push(enemy);
  return enemy;
}

function spawnBossSummonCell(enemy, range = 3, reserved = new Set()) {
  const baseCell = {
    x: Math.max(0, Math.min(COLS - 1, Math.floor(enemy.x / CELL_SIZE))),
    y: Math.max(0, Math.min(ROWS - 1, Math.floor(enemy.y / CELL_SIZE)))
  };
  const routeSet = new Set(routeCells().map((cell) => `${cell.x},${cell.y}`));
  const backX = Math.round(-Math.cos(enemy.facingAngle || 0));
  const backY = Math.round(-Math.sin(enemy.facingAngle || 0));

  for (let distance = 2; distance <= range + 2; distance += 1) {
    for (let side = -2; side <= 2; side += 1) {
      const x = baseCell.x + backX * distance + backY * side;
      const y = baseCell.y + backY * distance - backX * side;
      const key = `${x},${y}`;

      if (!inBounds(x, y) || isEndpoint(x, y) || routeSet.has(key) || obstacleAt(x, y) || grid[y][x].blockId !== null || reserved.has(key)) {
        continue;
      }

      const route = findPathFrom({ x, y });
      if (route.length > 0) {
        return { x, y, route };
      }
    }
  }

  return null;
}

function stunTowersNear(x, y, radius, duration) {
  for (const tower of towers) {
    if (Math.hypot(tower.centerX - x, tower.centerY - y) <= radius) {
      tower.stunnedTimer = Math.max(tower.stunnedTimer || 0, duration);
      tower.cooldown = Math.max(tower.cooldown || 0, duration);
    }
  }
}

function spawnIdaenSummons(enemy) {
  const summonWave = enemy.summonWave || waveNumber;
  const summonCount = 25;
  const waffleType = ENEMY_TYPES.waffle16;
  const usedCells = new Set();

  for (let index = 0; index < summonCount; index += 1) {
    const cell = spawnBossSummonCell(enemy, 6, usedCells);
    if (!cell) {
      break;
    }
    const key = `${cell.x},${cell.y}`;
    usedCells.add(key);

    const waffle = createEnemy(waffleType, {
      startCell: { x: cell.x, y: cell.y },
      route: cell.route,
      tier: summonWave >= 50 ? 3 : 2,
      hidden: summonWave >= 100 ? Math.random() < 0.55 : summonWave >= 75 ? Math.random() < 0.5 : false,
      armored: summonWave >= 100 ? Math.random() < 0.55 : summonWave >= 75 ? Math.random() < 0.5 : false,
      shielded: summonWave >= 100 ? Math.random() < 0.35 : false,
      armorHp: summonWave >= 75 ? 3 + Math.floor((summonWave - 75) / 25) : 0,
      reward: Math.max(1, Math.round(waffleType.reward * rewardMultiplier()))
    });
    pushEnemy(waffle);
  }

  if (summonWave >= 75) {
    const biscuitCount = summonWave >= 100 ? 3 : 2;
    for (let index = 0; index < biscuitCount; index += 1) {
      const cell = spawnBossSummonCell(enemy, 5, usedCells);
      if (!cell) {
        break;
      }
      usedCells.add(`${cell.x},${cell.y}`);

      const biscuit = createEnemy(ENEMY_TYPES.biscuit, {
        startCell: { x: cell.x, y: cell.y },
        route: cell.route,
        hidden: summonWave >= 100,
        armored: summonWave >= 100,
        armorHp: summonWave >= 100 ? 2 : 0,
        bossOwnerId: enemy.id,
        bossShieldMinion: true,
        reward: Math.max(1, Math.round(ENEMY_TYPES.biscuit.reward * rewardMultiplier()))
      });
      pushEnemy(biscuit);
    }
  }
}

function spawnIdaenBoss() {
  const boss = createEnemy(ENEMY_TYPES.idaen, {
    portalIndex: Math.floor(Math.random() * activePortals().length),
    reward: Math.max(20, Math.round(ENEMY_TYPES.idaen.reward * rewardMultiplier())),
    hp: Math.round((220 + waveNumber * 35) * 10 * DIFFICULTIES[selectedDifficulty].hp),
    speed: Math.max(12, (16 + waveNumber * 0.28) / DIFFICULTIES[selectedDifficulty].interval),
    waffleSquares: 64,
    summonWave: waveNumber
  });

  if (!boss) {
    return;
  }

  boss.phaseCooldown = 9;
  boss.phaseTimer = 0;
  boss.phaseColor = "#d94f3d";
  boss.boss = true;
  pushEnemy(boss);
}

function spawnAdapterEscorts(enemy) {
  const escortCount = 4;
  for (let index = 0; index < escortCount; index += 1) {
    const escort = createEnemy(ENEMY_TYPES.attacker, {
      portalIndex: enemy.portalIndex,
      route: enemy.route,
      progress: Math.max(0, enemy.progress - 1.2 - index * 0.24),
      hidden: true,
      armored: true,
      armorHp: ENEMY_TYPES.attacker.armor + Math.max(1, Math.floor((waveNumber - 10) / 4)),
      reward: Math.max(2, Math.round(ENEMY_TYPES.attacker.reward * rewardMultiplier()))
    });
    if (escort) {
      escort.facingAngle = enemy.facingAngle || 0;
      pushEnemy(escort);
    }
  }
}

function spawnAdapterBoss() {
  const boss = createEnemy(ENEMY_TYPES.adapter, {
    portalIndex: Math.floor(Math.random() * activePortals().length),
    reward: Math.max(24, Math.round(ENEMY_TYPES.adapter.reward * rewardMultiplier())),
    hp: Math.round((260 + waveNumber * 34) * 10.5 * DIFFICULTIES[selectedDifficulty].hp),
    speed: Math.max(10, (20 + waveNumber * 0.24) / DIFFICULTIES[selectedDifficulty].interval),
    armorHp: ENEMY_TYPES.adapter.armor + Math.max(0, Math.floor((waveNumber - 30) / 10)),
    hidden: false
  });

  if (!boss) {
    return;
  }

  boss.sizeScale = 3.1;
  boss.spawnCooldown = 6.5;
  boss.boss = true;
  pushEnemy(boss);
}

function waffleStatusModifiers() {
  if (waveNumber >= 100) {
    return { hidden: true, armored: true, armorHp: 4 + Math.floor((waveNumber - 100) / 20) };
  }

  if (waveNumber >= 80) {
    return {
      hidden: Math.random() < 0.55,
      armored: Math.random() < 0.55,
      armorHp: 3 + Math.floor((waveNumber - 80) / 20)
    };
  }

  if (waveNumber >= 55) {
    return {
      hidden: Math.random() < 0.35,
      armored: Math.random() < 0.4,
      armorHp: 2 + Math.floor((waveNumber - 55) / 25)
    };
  }

  if (waveNumber >= 35) {
    return {
      hidden: Math.random() < 0.22,
      armored: Math.random() < 0.25,
      armorHp: 2
    };
  }

  return { hidden: false, armored: false, armorHp: 0 };
}

function spawnWave() {
  if (gameMode !== "playing") {
    return;
  }

  if (wave && !wave.complete) {
    setMessage("A wave is already running.");
    updateHud();
    return;
  }

  if (!allRoutesOpen(routes)) {
    setMessage("You need an open path before starting a wave.");
    updateHud();
    return;
  }

  if (isSandboxMode() && sandboxWaveTarget !== null) {
    waveNumber = sandboxWaveTarget;
  } else {
    waveNumber += 1;
  }
  waveNumber = Math.max(1, waveNumber);
  resetSpawnPortalOrder();
  wave = {
    count: Math.max(3, Math.round((1.6 + waveNumber * 1.05 + Math.floor(waveNumber / 4) * 0.4) * enemyCountMultiplier())),
    spawned: 0,
    timer: 0,
    interval: Math.max(0.95 - waveNumber * 0.02, 0.38),
    complete: false
  };
  autoWaveTimer = 0;
  maybeUnlockCrossbowQuest();
  if (isIdaenWave()) {
    spawnIdaenBoss();
  } else if (isAdapterWave()) {
    spawnAdapterBoss();
  }
  if (maybeShowWaveWarning(waveNumber)) {
    updateHud();
    return;
  } else if (isIdaenWave()) {
    setMessage(`Wave ${waveNumber}: I-daen is approaching the Outpost.`, 2.8);
  } else if (isAdapterWave()) {
    setMessage(`Wave ${waveNumber}: Adapter is diving onto the lane.`, 2.8);
  } else {
    setMessage(`Wave ${waveNumber} started.`, 1.4);
  }
  updateHud();
}

function setSandboxWave() {
  if (!isSandboxMode()) {
    return;
  }

  const requestedWave = Math.max(1, Math.floor(Number(sandboxWaveInput?.value) || 1));
  sandboxWaveTarget = requestedWave;
  waveNumber = requestedWave;
  wave = null;
  autoWaveTimer = 0;
  setMessage(`Sandbox wave set to ${requestedWave}. Launching it now.`, 1.8);
  updateHud();
  if (allRoutesOpen(routes)) {
    spawnWave();
  }
}

function spawnSandboxEnemyFromControls() {
  if (!isSandboxMode()) {
    return;
  }

  const enemyType = ENEMY_TYPES[sandboxEnemySelect?.value];
  if (!enemyType) {
    return;
  }

  const count = Math.max(1, Math.floor(Number(sandboxSpawnCountInput?.value) || 1));
  const selectedTierValue = Number(sandboxTierSelect?.value) || 1;
  const tier = enemyType.key === "idaen" ? 1 : Math.max(1, Math.min(3, selectedTierValue));
  const summonWave = enemyType.key === "idaen" ? Math.max(25, selectedTierValue) : waveNumber;
  const hidden = Boolean(sandboxSpawnHidden?.checked);
  const armored = Boolean(sandboxSpawnArmored?.checked) || enemyType.key === "armored";
  const shielded = Boolean(sandboxSpawnShielded?.checked);
  const portalValue = sandboxPortalSelect?.value || "auto";

  for (let index = 0; index < count; index += 1) {
    const portalIndex = portalValue === "auto" ? undefined : Number(portalValue);
    const spawned = enemyType.key === "idaen"
      ? pushEnemy(createEnemy(enemyType, {
        portalIndex,
        hidden,
        armored,
        shielded,
        tier,
        summonWave,
        hp: Math.round((220 + summonWave * 35) * 10 * DIFFICULTIES[selectedDifficulty].hp),
        speed: Math.max(12, (16 + summonWave * 0.28) / DIFFICULTIES[selectedDifficulty].interval),
        waffleSquares: 64,
        reward: Math.max(20, Math.round(enemyType.reward * rewardMultiplier()))
      }))
      : pushEnemy(createEnemy(enemyType, { portalIndex, hidden, armored, shielded, tier }));
    if (!spawned) {
      return;
    }
  }

  autoWaveTimer = 0;
  setMessage(`Sandbox summoned ${count} ${enemyType.name}${count === 1 ? "" : "s"}.`, 1.8);
  updateHud();
}

function spawnEnemy() {
  const roll = Math.random();
  let enemyType = ENEMY_TYPES.fast;

  if (waveNumber >= 2 && roll > 0.45) {
    enemyType = ENEMY_TYPES.pentagon;
  }

  if (waveNumber >= 5 && roll > 0.62) {
    enemyType = ENEMY_TYPES.diamond;
  }

  if (waveNumber >= 10 && roll > 0.72) {
    enemyType = ENEMY_TYPES.attacker;
  }

  if (waveNumber >= 4 && roll > 0.78) {
    enemyType = ENEMY_TYPES.hexagon;
  }

  if (waveNumber >= 8 && roll > 0.93) {
    enemyType = ENEMY_TYPES.waffle16;
  }

  if (waveNumber >= 9 && roll > 0.7) {
    enemyType = ENEMY_TYPES.armored;
  }
  if (waveNumber >= 75 && roll > 0.95) {
    enemyType = ENEMY_TYPES.biscuit;
  }

  let hidden = waveNumber >= 6 && Math.random() < Math.min(0.16 + (waveNumber - 6) * 0.025, 0.38);
  if (enemyType.key === "armored" && waveNumber < 12) {
    hidden = false;
  }
  const waffleMods = enemyType.key.startsWith("waffle") ? waffleStatusModifiers() : { hidden: false, armored: false, armorHp: 0 };
  const enemy = createEnemy(enemyType, {
    tier: enemyType.key === "diamond"
      ? diamondTierForWave()
      : genericEnemyTierForWave(),
    hidden: enemyType.key === "attacker" ? true : enemyType.key.startsWith("waffle") ? waffleMods.hidden : hidden,
    armored: enemyType.key === "attacker" || enemyType.key === "armored" || (enemyType.key.startsWith("waffle") && waffleMods.armored),
    armorHp: enemyType.key === "attacker"
      ? ENEMY_TYPES.attacker.armor + Math.max(0, Math.floor((waveNumber - 10) / 4))
      : enemyType.key.startsWith("waffle")
        ? waffleMods.armorHp
        : undefined,
    shielded: waveNumber >= 18 && Math.random() < Math.min(0.08 + (waveNumber - 18) * 0.01, 0.26)
  });
  pushEnemy(enemy);
}

function updateWave(deltaTime) {
  if (!wave || wave.complete) {
    return;
  }

  wave.timer += deltaTime;

  while (wave.spawned < wave.count && wave.timer >= wave.interval) {
    wave.timer -= wave.interval;
    wave.spawned += 1;
    spawnEnemy();
  }

  if (wave.spawned === wave.count && enemies.length === 0) {
    wave.complete = true;
    const supportIncome = supportWaveIncomeEntries();
    const supportTotal = supportIncome.reduce((total, entry) => total + entry.amount, 0);
    money += Math.max(2, Math.round((5 + waveNumber) * rewardMultiplier()));
    money += supportTotal;
    if (supportTotal > 0) {
      for (const entry of supportIncome) {
        addPulse(entry.tower.centerX, entry.tower.centerY, 18, "rgba(255, 228, 122, 0.48)");
        addBurstParticles(entry.tower.centerX, entry.tower.centerY, 4, "rgba(255, 212, 115, 0.7)", 28, 78, 0.18, 0.46);
        addFloatingText(entry.tower.centerX, entry.tower.centerY - 12, `+$${entry.amount}`, "#ffe27a", 1.15);
      }
    }
    freeBlocks = isFactoryMap() ? freeBlocks + 1 : 1;
    currentBlockCost = BLOCK_COST;
    autoWaveTimer = autoWaveEnabled ? 0.9 : 0;
    setMessage(`Wave ${waveNumber} cleared.`, 1.6);
  }
}

function updateEnemies(deltaTime) {
  if (!allRoutesOpen(routes)) {
    return;
  }
  const survivors = [];

  for (const enemy of enemies) {
    const bossBiscuitsAlive = enemy.key === "idaen" && enemies.some((entry) => entry.bossShieldMinion && entry.bossOwnerId === enemy.id && entry.hp > 0);

    if (enemy.stunTimer > 0) {
      enemy.stunTimer = Math.max(0, enemy.stunTimer - deltaTime);
    }

    if (enemy.slowTimer > 0) {
      enemy.slowTimer = Math.max(0, enemy.slowTimer - deltaTime);
      if (enemy.slowTimer === 0) {
        enemy.slowFactor = 1;
      }
    }

    if ((enemy.whiteoutTimer || 0) > 0) {
      enemy.whiteoutTimer = Math.max(0, enemy.whiteoutTimer - deltaTime);
    }

    if ((enemy.healthBarFlashTimer || 0) > 0) {
      enemy.healthBarFlashTimer = Math.max(0, enemy.healthBarFlashTimer - deltaTime);
    } else if ((enemy.healthBarLagHp || enemy.hp) > enemy.hp) {
      const catchup = Math.max((enemy.maxHp || 1) * 2.4 * deltaTime, ((enemy.healthBarLagHp || enemy.hp) - enemy.hp) * deltaTime * 8);
      enemy.healthBarLagHp = Math.max(enemy.hp, (enemy.healthBarLagHp || enemy.hp) - catchup);
    } else {
      enemy.healthBarLagHp = enemy.hp;
    }

    if (enemy.burnTimer > 0 && enemy.hp > 0) {
      enemy.burnTimer = Math.max(0, enemy.burnTimer - deltaTime);
      damageEnemy(enemy, enemy.burnDamage * deltaTime, "laser");
      if (enemy.burnTimer === 0) {
        enemy.burnDamage = 0;
      }
    }

    if ((enemy.poisonTimer || 0) > 0 && enemy.hp > 0) {
      enemy.poisonTimer = Math.max(0, enemy.poisonTimer - deltaTime);
      if (!enemy.armored) {
        damageEnemy(enemy, (enemy.poisonDamage || 0) * deltaTime, "chemical");
      }
      if (enemy.poisonTimer === 0) {
        enemy.poisonDamage = 0;
      }
    }

    if (enemy.key === "idaen") {
      enemy.phaseCooldown = Math.max(0, (enemy.phaseCooldown || 0) - deltaTime);
      enemy.phaseTimer = Math.max(0, (enemy.phaseTimer || 0) - deltaTime);
      if (enemy.phaseTimer === 0 && enemy.phaseColor === "#8a5b2d") {
        enemy.phaseColor = bossBiscuitsAlive ? "#8a5b2d" : "#d94f3d";
      }

      if (enemy.phaseTimer === 0 && enemy.phaseCooldown === 0) {
        enemy.phaseTimer = 3.2;
        enemy.phaseCooldown = waveNumber >= 75 ? 12 : 15;
        enemy.phaseColor = "#8a5b2d";
        spawnIdaenSummons(enemy);
      }
    } else if (enemy.key === "adapter") {
      enemy.spawnCooldown = Math.max(0, (enemy.spawnCooldown || 0) - deltaTime);
      if (enemy.spawnCooldown === 0) {
        enemy.spawnCooldown = 8.5;
        spawnAdapterEscorts(enemy);
      }
    }

    const stunFactor = enemy.stunTimer > 0 || enemy.phaseTimer > 0 ? 0 : 1;
    enemy.progress += (enemy.speed * enemy.slowFactor * stunFactor * deltaTime) / CELL_SIZE;

    const points = enemyRoutePoints(enemy);

    if (enemy.progress >= points.length - 1) {
      lives = Math.max(0, lives - 1);
      setMessage("An enemy slipped through.", 1.0);
      continue;
    }

    const index = Math.floor(enemy.progress);
    const segment = enemy.progress - index;
    const current = points[index];
    const next = points[index + 1];

    enemy.x = current.x + (next.x - current.x) * segment;
    enemy.y = current.y + (next.y - current.y) * segment;
    enemy.facingAngle = Math.atan2(next.y - current.y, next.x - current.x);
    survivors.push(enemy);
  }

  enemies = survivors;
}

function towerStats(tower) {
  const levelBonus = tower.level - 1;

  if (tower.type === "crossbow") {
    const level = tower.level || 1;
    const attackSpeedMultiplier = level >= 4 ? 4 : level >= 2 ? 2 : 1;
    return {
      range: CELL_SIZE * 4.15,
      cooldown: (level >= 3 ? 0.72 : 0.86) / attackSpeedMultiplier,
      damage: [1.35, 1.8, 2.45, 3.2][level - 1] || 3.2,
      boltSpeed: 520,
      boltHoming: 4.2,
      detectHidden: true,
      attackSpeedMultiplier,
      boltPierce: level >= 3 ? level - 2 : 0
    };
  }

  if (tower.type === "laser") {
    const path1 = tower.path1 || 0;
    const path2 = tower.path2 || 0;
    const plasma = path1 >= 3;
    const photon = path2 >= 3;
    return {
      range: CELL_SIZE * (4.9 + path2 * 0.16 + path1 * 0.04 + (plasma ? 0.28 : 0)),
      cooldown: photon
        ? Math.max(1.05 - path1 * 0.04 - path2 * 0.04, 0.54)
        : Math.max(0.84 - path1 * 0.09 - path2 * 0.04 - (plasma ? 0.14 : 0), 0.14),
      damage: 2.5 + path1 * 0.7 + path2 * 1.45 + (plasma ? 1.8 : 0) + (photon ? 3.6 : 0),
      burnDamage: path1 > 0 || path2 > 0 ? 0.8 + path1 * 0.65 + path2 * 0.95 + (photon ? 1.9 : 0) : 0,
      burnDuration: path1 > 0 || path2 > 0 ? 1.5 + path1 * 0.34 + path2 * 0.46 + (plasma ? 0.6 : 0) : 0,
      beamWidth: 12 + path1 * 1.6 + path2 * 2 + (plasma ? 3 : 0) + (photon ? 4 : 0),
      beamColor: photon ? "#ffe35c" : plasma ? "#ffffff" : "#ff96b8",
      beamTtl: plasma ? 0.18 : photon ? 0.16 : 0.12
    };
  }

  if (tower.type === "shotgun") {
    const path1 = tower.path1 || 0;
    const path2 = tower.path2 || 0;
    const bulletStorm = path1 >= 3;
    const wavelength = path2 >= 3;
    const lines = wavelength ? 18 : Math.max(bulletStorm ? 5 : 3, 3 + path2);
    return {
      range: CELL_SIZE * (2.95 + path2 * 0.14),
      cooldown: bulletStorm
        ? Math.max(0.29 - path1 * 0.03 - path2 * 0.02, 0.07)
        : Math.max(0.86 - path1 * 0.07 - path2 * 0.03, 0.26),
      damage: 1.35 + path1 * 0.32 + path2 * 0.52 + (path2 >= 3 ? 1.2 : 0) + (path2 >= 5 ? 0.8 : 0),
      pellets: lines,
      spread: wavelength ? Math.PI : Math.max(0.55 - path2 * 0.045 - (bulletStorm ? 0.04 : 0), 0.18),
      pelletSpeed: 300 + path2 * 14,
      pelletLife: 0.24 + path2 * 0.01,
      detectHidden: false,
      bulletStorm
    };
  }

  if (tower.type === "freezer") {
    const path1 = tower.path1 || 0;
    const path2 = tower.path2 || 0;
    const permafrost = path1 >= 3;
    const aura = path2 >= 3;
    return {
      range: CELL_SIZE * (3.5 + path2 * 0.2 + (path1 >= 4 ? 0.15 : 0)),
      cooldown: Math.max(1.12 - path1 * 0.09 - path2 * 0.03, 0.42),
      damage: 0.7 + path1 * 0.35 + path2 * 0.18 + (path1 >= 5 ? 0.7 : 0),
      slow: Math.max(0.72 - path2 * 0.05 - (path2 >= 5 ? 0.06 : 0), 0.34),
      slowDuration: 1.15 + path1 * 0.22 + path2 * 0.18,
      detectHidden: path2 >= 4,
      permafrost,
      pulseRadius: CELL_SIZE * (2.4 + path1 * 0.12),
      pulseDamage: permafrost ? 1.2 + path1 * 0.5 + path2 * 0.2 : 0,
      pulseFreeze: permafrost ? 0.9 + (path1 - 3) * 0.35 : 0,
      pulseCooldown: permafrost ? Math.max(4.6 - path1 * 0.45, 2.2) : 0,
      aura,
      auraRadius: CELL_SIZE * (2.2 + path2 * 0.16),
      auraDamage: aura ? 0.2 + path2 * 0.16 + path1 * 0.08 : 0,
      auraSlow: aura ? Math.max(0.62 - (path2 - 3) * 0.08, 0.28) : 1,
      auraTick: aura ? 0.22 : 0,
      boltSpeed: 250
    };
  }

  if (tower.type === "dippy") {
    const path1 = tower.path1 || 0;
    const path2 = tower.path2 || 0;
    const dozenEggs = path1 >= 5;
    const mangoPudding = path2 >= 5;
    const biggerEggs = path1 >= 1;
    const boiledEggs = path1 >= 2;
    const eggPudding = path2 >= 3;
    const mangoes = path2 >= 4;
    const baseCooldown = Math.max(2.7 - path1 * 0.12, 1.7);
    const reloadPenalty = (path1 >= 5 ? 0.95 : path1 >= 4 ? 0.28 : 0) + (path2 >= 4 ? 0.5 : 0) + (path2 >= 5 ? 0.32 : 0);
    const damage = mangoPudding
      ? 105
      : mangoes
        ? 20
        : eggPudding
          ? 16
          : biggerEggs
            ? 8
            : 7;
    return {
      range: CELL_SIZE * (11.4 + path2 * 0.28),
      minRange: CELL_SIZE * 3.5,
      cooldown: baseCooldown + reloadPenalty,
      damage,
      splash: Math.max(42, biggerEggs ? 82 + path2 * 14 + (eggPudding ? 16 : 0) + (mangoPudding ? 26 : 0) : (34 - path1 * 2.5 + path2 * 10 + (path2 >= 3 ? 14 : 0) + (path2 >= 5 ? 8 : 0)) * 2),
      burst: path1 >= 5 ? 12 : path1 >= 4 ? 6 : path1 >= 3 ? 3 : 1,
      burstDelay: path1 >= 5 ? 0.06 : path1 >= 4 ? 0.07 : path1 >= 3 ? 0.09 : 0,
      holdDelay: 1,
      burnDamage: boiledEggs ? 9 + path1 * 2.1 : 0,
      burnDuration: boiledEggs ? 4.8 : 0,
      detectHidden: path2 >= 3,
      shells: path2 >= 2,
      shellDamage: path2 >= 2 ? 10 : 0,
      sticky: path2 >= 4,
      stickySlow: path2 >= 5 ? 0.35 : path2 >= 4 ? 0.48 : 1,
      stickyDuration: path2 >= 5 ? 3.4 : path2 >= 4 ? 2.3 : 0,
      shockwaves: path2 >= 5 ? 2 : 1,
      screenShake: path2 >= 5 ? 0.18 : 0,
      screenShakeDuration: path2 >= 5 ? 0.08 : 0,
      projectileSize: path2 >= 5 ? 18 : path2 >= 3 ? 14 : 10,
      whiteoutDuration: path2 >= 5 ? 0.9 : 0,
      yolkColor: path2 >= 5 ? "#ffd11a" : path2 >= 4 ? "#ffcf33" : path2 >= 3 ? "#ffcc4a" : "#ffce54",
      shieldMultiplier: path2 >= 5 ? 10 : 1,
      inaccuracy: path1 >= 5 ? CELL_SIZE * 3 : path2 >= 5 ? CELL_SIZE * 1.5 : 0,
      syrupDamage: path2 >= 5 ? 4.5 : 0,
      syrupRadius: path2 >= 5 ? CELL_SIZE * 2.1 : 0,
      syrupTtl: path2 >= 5 ? 5.2 : 0,
      syrupTowerBuff: path2 >= 5 ? 1.08 : 1
    };
  }

  if (tower.type === "support") {
    const path1 = tower.path1 || 0;
    const path2 = tower.path2 || 0;
    const invested = UPGRADE_COSTS.support.path1.slice(0, path1).reduce((total, cost) => total + cost, 0);
    return {
      range: CELL_SIZE * (1.9 + path2 * 0.18 + (path2 >= 5 ? 0.22 : 0)),
      cooldown: Infinity,
      damage: 0,
      waveCash: invested / 10,
      munitions: path2 >= 5,
      detectHiddenAura: path2 >= 4,
      attackSpeedAura: path2 >= 4 ? 1.24 : path2 >= 3 ? 1.16 : path2 >= 2 ? 1.08 : 1,
      helpMissile: path2 >= 5,
      helpMissileCooldown: 8.8,
      speed: 142,
      acceleration: 560,
      damage: 8.5,
      splash: 28,
      homing: true,
      shrapnel: false,
      clusters: false,
      rain: false,
      auraRadius: CELL_SIZE * (1.9 + path2 * 0.18 + (path2 >= 5 ? 0.22 : 0))
    };
  }

  if (tower.type === "gate") {
    const path1 = tower.path1 || 0;
    const path2 = tower.path2 || 0;
    return {
      range: CELL_SIZE * (0.75 + path2 * 0.05),
      cooldown: Math.max(0.58 - path2 * 0.04 - (path2 >= 4 ? 0.04 : 0), 0.26),
      damage: 0.42 + path1 * 0.18,
      dotDamage: 0.7 + path1 * 0.42 + (path1 >= 3 ? 0.28 : 0) + (path1 >= 5 ? 0.6 : 0),
      poisonDamage: 0.55 + path2 * 0.34 + (path2 >= 3 ? 0.22 : 0) + (path2 >= 5 ? 0.5 : 0),
      stun: 0,
      poolRadius: CELL_SIZE * (0.44 + path1 * 0.05 + (path1 >= 4 ? 0.08 : 0)),
      poolTtl: 5 + path1 * 0.35,
      poisonTtl: 2.1 + path2 * 0.34 + (path2 >= 4 ? 0.35 : 0),
      acidSlow: Math.max(0.88 - path2 * 0.05 - (path2 >= 5 ? 0.05 : 0), 0.52),
      detectHidden: true
    };
  }

  if (tower.type === "tesla") {
    const path1 = tower.path1 || 0;
    const path2 = tower.path2 || 0;
    const supercharge = path1 >= 5;
    const electrocannon = path2 >= 5;
    const path1Chains = [1, 1, 2, 2, 3, 3];
    const path2Chains = [1, 1, 1, 3, 4, 8];
    return {
      range: CELL_SIZE * (2.4 + path2 * 0.06),
      cooldown: electrocannon ? Math.max(1.45 - path1 * 0.04, 0.95) : Math.max(0.48 - path1 * 0.05 - (path1 >= 3 ? 0.09 : 0), 0.14),
      damage: (electrocannon ? 4.8 : 1.3) + path2 * 0.95 + (supercharge ? 1.2 : 0),
      chainCount: Math.max(path1Chains[path1], path2Chains[path2]),
      splash: electrocannon ? 18 : 0,
      stun: 0.22 + path2 * 0.08 + (path1 >= 4 ? 0.12 : 0),
      chainSlow: path1 >= 4 ? 0.75 : 1,
      field: path2 >= 3,
      fieldDamage: path2 >= 4 ? 0.4 : 0.18,
      fieldStun: path2 >= 4 ? 0.14 : 0.06,
      fieldCooldown: path2 >= 4 ? 0.42 : 0.7,
      detectHidden: path2 >= 3,
      supercharge,
      electrocannon
    };
  }

  if (tower.type === "missile") {
    const path1 = tower.path1 || 0;
    const path2 = tower.path2 || 0;
    return {
      range: CELL_SIZE * (3.8 + path1 * 0.28),
      cooldown: Math.max(1.22 - path1 * 0.05, 0.62),
      damage: 4 + path2 * 1.45 + (path1 >= 3 ? 1.05 : 0),
      splash: 36 + path1 * 5 + (path1 >= 3 ? 8 : 0),
      speed: 120 + (path1 >= 3 ? 120 : 0),
      acceleration: 520 + (path1 >= 3 ? 220 : 0),
      burst: path1 >= 5 ? 6 : path1 >= 4 ? 2 : 1,
      burstDelay: path1 >= 5 ? 0.1 : path1 >= 4 ? 0.25 : 0,
      homing: path1 >= 3,
      shrapnel: path2 >= 3,
      clusters: path2 >= 4,
      rain: path2 >= 5
    };
  }

  if (tower.type === "trapper") {
    const path1 = tower.path1 || 0;
    const path2 = tower.path2 || 0;
    const turretMode = path1 >= 3;
    const lifespan = 30 + (path2 >= 1 ? 15 : 0) + (path1 >= 4 ? 15 : 0) + (path1 >= 5 ? 35 : 0);
    return {
      range: CELL_SIZE * (2.8 + path1 * 0.08 + path2 * 0.08),
      cooldown: Math.max(2.25 - path1 * 0.42 - (path1 >= 5 ? 0.2 : 0), 0.5),
      damage: 1.15 + path2 * 0.85 + (path1 >= 5 ? 1.25 : 0),
      trapRadius: 14 + tower.level * 2,
      trapUses: path2 >= 2 ? 12 : 8,
      trapLifetime: lifespan,
      sticky: path2 >= 3,
      slow: path2 >= 3 ? 0.55 : 1,
      duration: path2 >= 3 ? 1.9 + path2 * 0.25 + (path2 >= 5 ? 0.6 : 0) : 0,
      mine: path2 >= 4,
      mango: path2 >= 5,
      turretMode,
      turretCap: path1 >= 5 ? 20 : path1 >= 4 ? 12 : path1 >= 3 ? 6 : 0,
      turretCooldown: Math.max(0.78 - (path1 >= 5 ? 0.18 : 0), 0.24),
      turretDamage: 1.75 + path2 * 0.6 + (path1 >= 5 ? 1.4 : 0),
      turretRange: CELL_SIZE * (2 + path2 * 0.08 + (path1 >= 5 ? 0.4 : 0)),
      turretBarrels: path1 >= 4 ? 2 : 1
    };
  }

  if (tower.type === "drone") {
    const path1 = tower.path1 || 0;
    const path2 = tower.path2 || 0;
    const baseRange = CELL_SIZE * (4 + levelBonus * 0.2) * (path2 >= 5 ? 1.5 : path1 >= 5 ? 1.25 : 1);
    const supportCount = path2 >= 5 ? 4 : path2 >= 3 ? 2 : 0;
    const mainGuns = path2 >= 4 ? 4 : path1 >= 1 ? 2 : 1;
    const supportGuns = path2 >= 4 ? 2 : 1;
    return {
      range: baseRange,
      cooldown: Math.max(0.74 - levelBonus * 0.04 - path2 * 0.05 - (path1 >= 5 ? 0.08 : 0), 0.2),
      damage: 0.9 + levelBonus * 0.32,
      droneRange: CELL_SIZE * (1.5 + levelBonus * 0.08 + (path1 >= 2 ? 0.24 : 0)),
      droneSpeed: 88 + levelBonus * 8 + (path1 >= 5 ? 24 : 0),
      detectHidden: path1 >= 2,
      bulletGuns: mainGuns,
      bulletDamage: 0.9 + levelBonus * 0.28,
      bulletPierce: path2 >= 2 ? 2 : 0,
      rocket: path1 >= 3,
      rocketCooldown: path1 >= 5 ? 0.42 : 0.7,
      rocketDamage: 2.8 + levelBonus * 0.45 + (path1 >= 4 ? 0.8 : 0),
      rocketSplash: path1 >= 4 ? 34 : 24,
      rocketSpeed: path1 >= 5 ? 180 : 132,
      supportCount,
      supportGuns,
      supportDamage: 0.38 + levelBonus * 0.16,
      supportRange: CELL_SIZE * 1.26,
      attackDrone: path1 >= 5
    };
  }

  return { range: CELL_SIZE * (4.6 + levelBonus * 0.22), cooldown: Math.max(0.95 - levelBonus * 0.05, 0.45), damage: 1.8 + levelBonus * 0.65 };
}

function canSeeEnemy(enemy, detectHidden = false) {
  return !enemy.hidden || detectHidden;
}

function canHitArmored(enemy, damageType) {
  const damageClass = damageClassForType(damageType);
  return !enemy.armored || enemy.armorHp <= 0 || damageClass === "energy" || damageClass === "explosive";
}

function supportBuffsForTower(tower) {
  const buffs = {
    munitions: false,
    detectHidden: false,
    attackSpeedMultiplier: 1
  };

  if (!tower) {
    return buffs;
  }

  for (const ally of towers) {
    if (ally.id === tower.id || ally.type !== "support") {
      continue;
    }

    const stats = towerStats(ally);
    if (Math.hypot(tower.centerX - ally.centerX, tower.centerY - ally.centerY) > stats.auraRadius) {
      continue;
    }

    buffs.munitions ||= Boolean(stats.munitions);
    buffs.detectHidden ||= Boolean(stats.detectHiddenAura);
    buffs.attackSpeedMultiplier = Math.max(buffs.attackSpeedMultiplier, stats.attackSpeedAura || 1);
  }

  for (const effect of effects) {
    if (effect.kind !== "puddle" || (effect.towerAttackSpeed || 1) <= 1) {
      continue;
    }

    if (Math.hypot(tower.centerX - effect.x, tower.centerY - effect.y) <= effect.radius) {
      buffs.attackSpeedMultiplier = Math.max(buffs.attackSpeedMultiplier, effect.towerAttackSpeed || 1);
    }
  }

  return buffs;
}

function towerHasHiddenDetection(tower, stats = towerStats(tower)) {
  const buffs = supportBuffsForTower(tower);
  return Boolean(stats.detectHidden || buffs.detectHidden);
}

function effectiveTowerDamageType(tower, baseType, stats = towerStats(tower)) {
  if (baseType === "laser" || baseType === "shock" || baseType === "explosion") {
    return baseType;
  }

  const buffs = supportBuffsForTower(tower);
  return buffs.munitions ? "explosion" : baseType;
}

function activeShieldSourceForEnemy(enemy) {
  let nearest = null;
  let nearestDistance = Infinity;

  for (const source of enemies) {
    if ((!source.shielded && !isShieldEnemy(source)) || source.hp <= 0 || (source.shieldHp || 0) <= 0) {
      continue;
    }

    const distance = Math.hypot(enemy.x - source.x, enemy.y - source.y);
    if (distance <= (source.shieldRadius || 0) && distance < nearestDistance) {
      nearest = source;
      nearestDistance = distance;
    }
  }

  return nearest;
}

function createShieldHitTracker() {
  return { hitShield: false };
}

function damageClassForType(damageType) {
  if (damageType === "laser" || damageType === "shock") {
    return "energy";
  }
  if (damageType === "explosion") {
    return "explosive";
  }
  if (damageType === "chemical" || damageType === "poison" || damageType === "acid" || damageType === "freeze") {
    return "chemical";
  }
  return "kinetic";
}

function damageEnemy(enemy, amount, damageType, options = {}) {
  if (!enemy || amount <= 0) {
    return false;
  }

  const damageClass = damageClassForType(damageType);
  const shieldMultiplier = options.shieldMultiplier || 1;
  let { stun = 0, slow = null, slowDuration = 0, burnDamage = 0, burnDuration = 0 } = options;
  const bossBiscuitsAlive = enemy.key === "idaen" && enemies.some((entry) => entry.bossShieldMinion && entry.bossOwnerId === enemy.id && entry.hp > 0);

  if (enemy.key === "idaen" && ((enemy.phaseTimer || 0) > 0 || bossBiscuitsAlive)) {
    enemy.phaseColor = "#8a5b2d";
    return false;
  }

  const shieldSource = activeShieldSourceForEnemy(enemy);
  if (shieldSource) {
    if (options.shieldHitTracker?.hitShield) {
      return true;
    }
    if (options.shieldHitTracker) {
      options.shieldHitTracker.hitShield = true;
    }
    const shieldDamage = damageClass === "energy"
      ? amount * ((shieldSource.tier || 1) >= 3 ? 3 : 2.6)
      : amount * shieldMultiplier;
    shieldSource.shieldHp = Math.max(0, (shieldSource.shieldHp || 0) - shieldDamage);
    addPulse(shieldSource.x, shieldSource.y, shieldSource.shieldRadius || 18, "rgba(156, 209, 255, 0.38)");
    if (shieldSource.shieldHp === 0) {
      shieldSource.shielded = false;
      shieldSource.shieldRadius = 0;
      addPulse(shieldSource.x, shieldSource.y, 24, "rgba(239, 247, 255, 0.6)");
    }
    return true;
  }

  if (enemy.key === "adapter") {
    enemy.adapterGuards ||= { energy: false, chemical: false, explosive: false, kinetic: false };
    if (enemy.adapterGuards[damageClass]) {
      enemy.adapterGuards[damageClass] = false;
      addPulse(enemy.x, enemy.y, 26, "rgba(255, 226, 164, 0.52)");
      return false;
    }
  }

  if (isDiamondEnemy(enemy)) {
    if (damageClass === "energy") {
      amount *= 0.45;
      stun = 0;
      slow = null;
      slowDuration = 0;
      burnDamage = 0;
      burnDuration = 0;
    } else if (damageClass === "explosive") {
      amount *= 0.65;
      burnDamage = 0;
      burnDuration = 0;
    }
  }

  const hpBefore = enemy.hp;
  if (enemy.armored && enemy.armorHp > 0) {
    if (damageClass === "energy" || damageClass === "explosive") {
      enemy.armorHp = Math.max(0, enemy.armorHp - amount);
      if (enemy.armorHp === 0) {
        addPulse(enemy.x, enemy.y, 18, "#f3f7ff");
      }
    } else {
      return false;
    }
  } else {
    enemy.hp -= amount;
  }

  if (enemy.hp < hpBefore) {
    enemy.healthBarLagHp = Math.max(enemy.healthBarLagHp || hpBefore, hpBefore);
    enemy.healthBarFlashTimer = 0.18;
  }

  if (enemy.key === "adapter" && enemy.hp < hpBefore && enemy.adapterGuards && damageClass in enemy.adapterGuards) {
    enemy.adapterGuards[damageClass] = true;
  }

  if (stun > 0) {
    enemy.stunTimer = Math.max(enemy.stunTimer, stun);
  }

  if (slow !== null && slow < 1 && slowDuration > 0) {
    enemy.slowFactor = Math.min(enemy.slowFactor, slow);
    enemy.slowTimer = Math.max(enemy.slowTimer, slowDuration);
  }

  if (burnDamage > 0 && burnDuration > 0) {
    enemy.burnDamage = Math.max(enemy.burnDamage || 0, burnDamage);
    enemy.burnTimer = Math.max(enemy.burnTimer || 0, burnDuration);
  }

  return true;
}

function canTowerDamageEnemy(tower, enemy, stats = towerStats(tower)) {
  const effectiveType = effectiveTowerDamageType(tower, tower.type === "freezer" ? "freeze" : tower.type === "trapper" ? (stats.mine ? "explosion" : "trap") : tower.type === "drone" ? (stats.rocket ? "explosion" : "bullet") : "bullet", stats);

  if (tower.type === "missile" || tower.type === "laser") {
    return true;
  }

  if (tower.type === "support") {
    return false;
  }

  if (tower.type === "crossbow") {
    return canHitArmored(enemy, effectiveType);
  }

  if (tower.type === "gate") {
    return canSeeEnemy(enemy, true) && !enemy.armored;
  }

  if (tower.type === "shotgun") {
    return canHitArmored(enemy, effectiveType);
  }

  if (tower.type === "tesla") {
    return canHitArmored(enemy, stats.electrocannon ? "laser" : "shock");
  }

  if (tower.type === "trapper") {
    if (stats.turretMode) {
      return canHitArmored(enemy, effectiveTowerDamageType(tower, "bullet", stats));
    }
    return canHitArmored(enemy, effectiveType);
  }

  if (tower.type === "freezer") {
    return canHitArmored(enemy, effectiveType);
  }

  if (tower.type === "dippy") {
    return true;
  }

  if (tower.type === "drone") {
    return canHitArmored(enemy, effectiveType);
  }

  return canHitArmored(enemy, "laser");
}

function enemiesInRange(originX, originY, range, detectHidden = false, requireLineOfSight = true) {
  return enemies.filter((enemy) => {
    const distance = Math.hypot(enemy.x - originX, enemy.y - originY);
    if (distance > range || !canSeeEnemy(enemy, detectHidden)) {
      return false;
    }

    return !requireLineOfSight || hasLineOfSight(originX, originY, enemy.x, enemy.y);
  });
}

function selectEnemyByPriority(candidates, priority = "first") {
  if (candidates.length === 0) {
    return null;
  }

  if (priority === "random") {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  if (priority === "hidden") {
    const hiddenTargets = candidates.filter((enemy) => enemy.hidden);
    if (hiddenTargets.length > 0) {
      return selectEnemyByPriority(hiddenTargets, "first");
    }
    return selectEnemyByPriority(candidates, "first");
  }

  const scored = [...candidates].sort((left, right) => {
    if (priority === "last") {
      return left.progress - right.progress;
    }

    if (priority === "strong") {
      return right.maxHp - left.maxHp || right.hp - left.hp || right.progress - left.progress;
    }

    if (priority === "weak") {
      return left.hp - right.hp || left.maxHp - right.maxHp || right.progress - left.progress;
    }

    return right.progress - left.progress;
  });

  return scored[0];
}

function nearestEnemyInRange(tower, range, detectHidden = false) {
  const stats = towerStats(tower);
  const candidates = enemiesInRange(tower.centerX, tower.centerY, range, detectHidden, tower.type !== "dippy")
    .filter((enemy) => Math.hypot(enemy.x - tower.centerX, enemy.y - tower.centerY) >= (stats.minRange || 0))
    .filter((enemy) => canTowerDamageEnemy(tower, enemy, stats));
  return selectEnemyByPriority(candidates, tower.targetPriority || "first");
}

function towerHasLineOfSightToPoint(tower, x, y) {
  if (!tower || tower.type === "dippy") {
    return true;
  }
  return hasLineOfSight(tower.centerX, tower.centerY, x, y);
}

function hasLineOfSight(x1, y1, x2, y2) {
  const steps = Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 8);

  for (let index = 1; index < steps; index += 1) {
    const t = index / steps;
    const px = x1 + (x2 - x1) * t;
    const py = y1 + (y2 - y1) * t;
    const cx = Math.floor(px / CELL_SIZE);
    const cy = Math.floor(py / CELL_SIZE);

    if (obstacleAt(cx, cy)) {
      return false;
    }
  }

  return true;
}

function addBeam(x1, y1, x2, y2, color, width = 3, ttl = 0.12) {
  effects.push({
    id: nextEffectId,
    kind: "beam",
    x1,
    y1,
    x2,
    y2,
    color,
    width,
    maxTtl: ttl,
    ttl
  });
  nextEffectId += 1;
}

function addPulse(x, y, radius, color) {
  effects.push({
    id: nextEffectId,
    kind: "pulse",
    x,
    y,
    radius,
    color,
    ttl: 0.18
  });
  nextEffectId += 1;
}

function gateArcEndpoints(tower) {
  const center = towerPlacementCenter("gate", tower.x, tower.y);
  if ((tower.rotation || 0) % 2 === 0) {
    return {
      x1: center.x - CELL_SIZE,
      y1: center.y,
      x2: center.x + CELL_SIZE,
      y2: center.y
    };
  }
  return {
    x1: center.x,
    y1: center.y - CELL_SIZE,
    x2: center.x,
    y2: center.y + CELL_SIZE
  };
}

function beamEndPoint(x, y, angle, reach = Math.max(canvas.width, canvas.height) * 2) {
  return {
    x: x + Math.cos(angle) * reach,
    y: y + Math.sin(angle) * reach
  };
}

function distanceToBeam(enemy, startX, startY, angle) {
  const dx = enemy.x - startX;
  const dy = enemy.y - startY;
  const projection = dx * Math.cos(angle) + dy * Math.sin(angle);
  const perpendicular = Math.abs((-Math.sin(angle) * dx) + (Math.cos(angle) * dy));
  return { projection, perpendicular };
}

function fireLaserBeam(tower, target, stats) {
  const angle = Math.atan2(target.y - tower.centerY, target.x - tower.centerX);
  const end = beamEndPoint(tower.centerX, tower.centerY, angle);
  const maxDistance = Math.hypot(end.x - tower.centerX, end.y - tower.centerY);
  const shieldHitTracker = createShieldHitTracker();

  for (const enemy of enemies) {
    if (!canSeeEnemy(enemy, stats.detectHidden)) {
      continue;
    }

    const { projection, perpendicular } = distanceToBeam(enemy, tower.centerX, tower.centerY, angle);
    if (projection < 0 || projection > maxDistance || perpendicular > stats.beamWidth) {
      continue;
    }

    damageEnemy(enemy, stats.damage, "laser", {
      shieldHitTracker,
      burnDamage: stats.burnDamage,
      burnDuration: stats.burnDuration
    });
  }

  addBeam(tower.centerX, tower.centerY, end.x, end.y, stats.beamColor, Math.max(3, stats.beamWidth * 0.32), stats.beamTtl);
}

function spawnDippyEgg(tower, target, stats) {
  const scatter = stats.inaccuracy || 0;
  const scatterAngle = Math.random() * Math.PI * 2;
  const scatterDistance = Math.random() * scatter;
  const scatterX = Math.cos(scatterAngle) * scatterDistance;
  const scatterY = Math.sin(scatterAngle) * scatterDistance;
  addBeam(tower.centerX, tower.centerY, tower.centerX, -30, "#fff4c8", 2.5, 0.16);
  projectiles.push({
    id: nextProjectileId,
    kind: "dippyEgg",
    x: tower.centerX,
    y: tower.centerY,
    delay: stats.eggDelay,
    targetId: target.id,
    targetX: target.x + scatterX,
    targetY: target.y + scatterY,
    holdDelay: stats.holdDelay,
    damage: stats.damage,
    splash: stats.splash,
    burnDamage: stats.burnDamage,
    burnDuration: stats.burnDuration,
    shells: stats.shells,
    shellDamage: stats.shellDamage,
    sticky: stats.sticky,
    stickySlow: stats.stickySlow,
    stickyDuration: stats.stickyDuration,
    syrupDamage: stats.syrupDamage,
    syrupRadius: stats.syrupRadius,
    syrupTtl: stats.syrupTtl,
    syrupTowerBuff: stats.syrupTowerBuff,
    shockwaves: stats.shockwaves,
    screenShake: stats.screenShake,
    screenShakeDuration: stats.screenShakeDuration,
    projectileSize: stats.projectileSize,
    whiteoutDuration: stats.whiteoutDuration,
    yolkColor: stats.yolkColor,
    shieldMultiplier: stats.shieldMultiplier,
    speed: 1400,
    arcDrift: (Math.random() - 0.5) * 26,
    roll: (Math.random() - 0.5) * 0.3,
    spin: 6 + Math.random() * 5,
    trailTimer: 0
  });
  nextProjectileId += 1;
  tower.dippyAmmo = Math.max(0, (tower.dippyAmmo ?? stats.burst) - 1);
}

function applyFreezeEffect(enemy, damage, slow, slowDuration, freezeDuration = 0) {
  const dealtDamage = damage > 0 ? damageEnemy(enemy, damage, "freeze") : true;

  if (!dealtDamage) {
    return false;
  }

  if (isDiamondEnemy(enemy)) {
    return true;
  }

  if ((!enemy.armored || enemy.armorHp <= 0) && slow < 1 && slowDuration > 0) {
    enemy.slowFactor = Math.min(enemy.slowFactor, slow);
    enemy.slowTimer = Math.max(enemy.slowTimer, slowDuration);
  }

  if ((!enemy.armored || enemy.armorHp <= 0) && freezeDuration > 0) {
    enemy.stunTimer = Math.max(enemy.stunTimer, freezeDuration);
  }

  return dealtDamage;
}

function addBurstParticles(x, y, count, color, speedMin = 40, speedMax = 120, ttlMin = 0.18, ttlMax = 0.42) {
  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / Math.max(count, 1) + Math.random() * 0.4;
    const speed = speedMin + Math.random() * (speedMax - speedMin);
    effects.push({
      id: nextEffectId,
      kind: "spark",
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 2 + Math.random() * 3,
      color,
      maxTtl: ttlMin + Math.random() * (ttlMax - ttlMin),
      ttl: ttlMin + Math.random() * (ttlMax - ttlMin)
    });
    nextEffectId += 1;
  }
}

function addStickyPuddle(x, y, radius, slow, ttl, color = "rgba(255, 215, 82, 0.55)", damage = 0, circular = false, poisonDamage = 0, poisonTtl = 0, towerAttackSpeed = 1) {
  effects.push({
    id: nextEffectId,
    kind: "puddle",
    x,
    y,
    radius,
    slow,
    damage,
    poisonDamage,
    poisonTtl,
    towerAttackSpeed,
    maxTtl: ttl,
    ttl,
    color,
    circular
  });
  nextEffectId += 1;
}

function launchSupportAirstrike(tower, target, stats) {
  const bombCount = stats.airstrikeBombs || 8;
  for (let index = 0; index < bombCount; index += 1) {
    const spreadX = (Math.random() - 0.5) * 140 + (index - (bombCount - 1) / 2) * 12;
    const spreadY = (Math.random() - 0.5) * 92;
    const startX = Math.max(24, Math.min(canvas.width - 24, target.x + spreadX));
    const startY = -40 - Math.random() * 120;
    const targetX = Math.max(20, Math.min(canvas.width - 20, target.x + spreadX * 0.45));
    const targetY = Math.max(20, Math.min(canvas.height - 20, target.y + spreadY));
    const angle = Math.atan2(targetY - startY, targetX - startX);
    projectiles.push({
      id: nextProjectileId,
      kind: "mangoBomb",
      x: startX,
      y: startY,
      targetX,
      targetY,
      angle,
      speed: 390 + Math.random() * 150,
      acceleration: 220,
      damage: stats.airstrikeDamage,
      splash: stats.airstrikeSplash,
      impactDamage: stats.airstrikeDamage * 1.35,
      screenShake: 0,
      screenShakeDuration: 0,
      ttl: 2.4
    });
    nextProjectileId += 1;
  }
}

function wallCellsInRange(tower, range) {
  const cells = [];

  for (const block of blocks.values()) {
    for (const cell of block.cells) {
      if (cell.x === tower.x && cell.y === tower.y) {
        continue;
      }

      if (grid[cell.y][cell.x].towerId !== null) {
        continue;
      }

      const center = cellCenter(cell.x, cell.y);
      if (Math.hypot(center.x - tower.centerX, center.y - tower.centerY) <= range) {
        cells.push(cell);
      }
    }
  }

  return cells;
}

function groundCellsInRange(tower, range) {
  const cells = [];

  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      if (!inBounds(x, y) || isEndpoint(x, y) || obstacleAt(x, y) || grid[y][x].blockId !== null) {
        continue;
      }

      const center = cellCenter(x, y);
      if (Math.hypot(center.x - tower.centerX, center.y - tower.centerY) <= range) {
        cells.push({ x, y });
      }
    }
  }

  return cells;
}

function randomPointInCell(x, y, padding = 8) {
  const min = padding;
  const max = CELL_SIZE - padding;
  return {
    x: x * CELL_SIZE + min + Math.random() * Math.max(max - min, 1),
    y: y * CELL_SIZE + min + Math.random() * Math.max(max - min, 1)
  };
}

function spawnTrapperConstruct(tower) {
  const stats = towerStats(tower);
  const trapDamageType = effectiveTowerDamageType(tower, stats.mine ? "explosion" : "trap", stats);
  const turretDamageType = effectiveTowerDamageType(tower, "bullet", stats);
  if (stats.turretMode && stats.turretCap > 0) {
    const activeTurrets = traps.filter((trap) => trap.ownerTowerId === tower.id && trap.kind === "turret").length;
    if (activeTurrets >= stats.turretCap) {
      return false;
    }
  }
  const cells = stats.turretMode ? wallCellsInRange(tower, stats.range) : groundCellsInRange(tower, stats.range);

  if (cells.length === 0) {
    return false;
  }

  const candidates = cells.filter((cell) => {
    const center = cellCenter(cell.x, cell.y);
    return Math.hypot(center.x - tower.centerX, center.y - tower.centerY) <= stats.range;
  });

  if (candidates.length === 0) {
    return false;
  }

  const choice = candidates[Math.floor(Math.random() * candidates.length)];
  const center = randomPointInCell(choice.x, choice.y, stats.turretMode ? 10 : 7);
  effects.push({
    id: nextEffectId,
    kind: "constructLaunch",
    x1: tower.centerX,
    y1: tower.centerY,
    x2: center.x,
    y2: center.y,
    color: stats.turretMode ? "#d9ffb7" : stats.mine ? "#ffd067" : "#9de67b",
    ttl: 0.18,
    maxTtl: 0.18
  });
  nextEffectId += 1;
  traps.push({
    id: nextTrapId,
    ownerTowerId: tower.id,
    kind: stats.turretMode ? "turret" : stats.mine ? "mine" : "trap",
    x: choice.x,
    y: choice.y,
    centerX: center.x,
    centerY: center.y,
    damage: stats.turretMode ? stats.turretDamage : stats.damage,
    slow: stats.slow,
    duration: stats.duration,
    radius: stats.trapRadius,
    damageType: stats.turretMode ? turretDamageType : trapDamageType,
    usesRemaining: stats.trapUses,
    ttl: stats.trapLifetime,
    maxTtl: stats.trapLifetime,
    targetEnemyId: null,
    cooldown: 0,
    tickRate: stats.mine ? 0.55 : 0.3,
    range: stats.turretRange,
    barrels: stats.turretBarrels,
    attackCooldown: stats.turretCooldown,
    mango: stats.mango
  });
  nextTrapId += 1;
  return true;
}

function explodeTrap(trap) {
  const splash = trap.mango ? trap.radius * 2 : trap.radius * 1.2;
  addPulse(trap.centerX, trap.centerY, splash, trap.mango ? "#ffcb73" : "#9de67b");

  for (const enemy of enemies) {
    const distance = Math.hypot(enemy.x - trap.centerX, enemy.y - trap.centerY);
    if (distance > splash) {
      continue;
    }

    const damage = trap.damage * (1.6 - Math.min(distance / Math.max(splash, 1), 1) * 0.5);
    damageEnemy(enemy, damage, "explosion", {
      slow: trap.mango ? 0.52 : null,
      slowDuration: trap.mango ? 1.8 : 0
    });
  }

  if (trap.mango) {
    spawnSecondaryProjectiles(trap.centerX, trap.centerY, 5, "mangoBomb", trap.damage * 0.7, 20, true);
  }
}

function fireTower(tower, target) {
  const stats = towerStats(tower);
  const supportDamageType = effectiveTowerDamageType(tower, "bullet", stats);
  tower.aimAngle = Math.atan2(target.y - tower.centerY, target.x - tower.centerX);

  if (tower.type === "crossbow") {
    projectiles.push({
      id: nextProjectileId,
      kind: "crossbowBolt",
      x: tower.centerX,
      y: tower.centerY,
      targetId: target.id,
      angle: tower.aimAngle,
      speed: stats.boltSpeed,
      homing: stats.boltHoming,
      damage: stats.damage,
      damageType: supportDamageType,
      pierce: stats.boltPierce,
      hitIds: []
    });
    nextProjectileId += 1;
    return;
  }

  if (tower.type === "shotgun") {
    for (let index = 0; index < stats.pellets; index += 1) {
      const spread = (Math.random() - 0.5) * stats.spread;
      projectiles.push({
        id: nextProjectileId,
        kind: "shotgunPellet",
        x: tower.centerX,
        y: tower.centerY,
        angle: tower.aimAngle + spread,
        speed: stats.pelletSpeed,
        damage: stats.damage,
        damageType: supportDamageType
      });
      nextProjectileId += 1;
    }
    return;
  }

  if (tower.type === "tesla") {
    const damage = stats.damage + (stats.supercharge ? Math.min(tower.charge, 4.5) : 0);
    const teslaDamageType = stats.electrocannon ? "laser" : "shock";
    const chainShieldHitTracker = createShieldHitTracker();
    damageEnemy(target, damage, teslaDamageType, { stun: stats.stun, shieldHitTracker: chainShieldHitTracker });
    addBeam(tower.centerX, tower.centerY, target.x, target.y, "#9bd8ff");
    tower.charge = 0;

    const chained = enemies
      .filter((enemy) => enemy.id !== target.id && Math.hypot(enemy.x - target.x, enemy.y - target.y) <= CELL_SIZE * 1.45)
      .slice(0, stats.chainCount);

    for (const enemy of chained) {
      damageEnemy(enemy, damage * 0.5, teslaDamageType, {
        shieldHitTracker: chainShieldHitTracker,
        stun: stats.stun * 0.72,
        slow: stats.chainSlow < 1 ? stats.chainSlow : null,
        slowDuration: stats.chainSlow < 1 ? 0.5 : 0
      });
      addBeam(target.x, target.y, enemy.x, enemy.y, "#b8ebff");
    }
    if (stats.splash > 0) {
      for (const enemy of enemies) {
        if (enemy.id === target.id || chained.some((entry) => entry.id === enemy.id)) {
          continue;
        }

        if (Math.hypot(enemy.x - target.x, enemy.y - target.y) <= stats.splash) {
          damageEnemy(enemy, damage * 0.2, teslaDamageType, { stun: stats.stun * 0.35, shieldHitTracker: chainShieldHitTracker });
        }
      }
      addPulse(target.x, target.y, stats.splash, "#b8ebff");
    }
    return;
  }

  if (tower.type === "laser") {
    fireLaserBeam(tower, target, stats);
    return;
  }

  if (tower.type === "freezer") {
    projectiles.push({
      id: nextProjectileId,
      kind: "frostBolt",
      x: tower.centerX,
      y: tower.centerY,
      angle: tower.aimAngle,
      speed: stats.boltSpeed,
      damage: stats.damage,
      damageType: effectiveTowerDamageType(tower, "freeze", stats),
      slow: stats.slow,
      slowDuration: stats.slowDuration
    });
    nextProjectileId += 1;
    return;
  }

  if (tower.type === "dippy") {
    spawnDippyEgg(tower, target, stats);
    tower.burstTargetId = null;
    tower.burstShotsRemaining = Math.max(0, stats.burst - 1);
    tower.burstTimer = tower.burstShotsRemaining > 0 ? stats.burstDelay : 0;
    return;
  }

  if (tower.type === "trapper") {
    spawnTrapperConstruct(tower);
    return;
  }

  if (tower.type === "support") {
    if (stats.helpMissile && tower.cooldown === 0) {
      const supportTarget = nearestEnemyInRange(tower, stats.auraRadius * 2.4, detectHidden);
      if (supportTarget) {
        tower.aimAngle = Math.atan2(supportTarget.y - tower.centerY, supportTarget.x - tower.centerX);
        spawnMissileProjectile(tower, supportTarget, stats);
        tower.cooldown = stats.helpMissileCooldown;
      }
    }
    return;
  }

  if (tower.type === "drone") {
    return;
  }

  spawnMissileProjectile(tower, target, stats);
  tower.burstTargetId = null;
  tower.burstShotsRemaining = Math.max(0, stats.burst - 1);
  tower.burstTimer = tower.burstShotsRemaining > 0 ? stats.burstDelay : 0;
}

function updateTowers(deltaTime) {
  for (const tower of towers) {
    const stats = towerStats(tower);
    const supportBuffs = supportBuffsForTower(tower);
    const detectHidden = towerHasHiddenDetection(tower, stats);
    const cooldownRate = supportBuffs.attackSpeedMultiplier || 1;
    if (tower.type === "dippy") {
      tower.dippyAmmo = tower.dippyAmmo ?? stats.burst;
      tower.dippyAmmo = Math.min(tower.dippyAmmo, stats.burst);
      tower.dippyReloadTimer = Math.max(0, tower.dippyReloadTimer || 0);
      if (tower.burstShotsRemaining === 0 && tower.cooldown > 0 && tower.dippyAmmo < stats.burst) {
        tower.dippyReloadTimer -= deltaTime * cooldownRate;
        const reloadStep = (stats.cooldown / Math.max(stats.burst, 1)) * 1.12;
        if (tower.dippyReloadTimer <= 0) {
          tower.dippyAmmo += 1;
          tower.dippyReloadTimer = reloadStep;
        }
      } else if (tower.dippyAmmo >= stats.burst) {
        tower.dippyReloadTimer = 0;
      }
    }
    tower.stunnedTimer = Math.max(0, (tower.stunnedTimer || 0) - deltaTime);
    tower.cooldown = Math.max(0, tower.cooldown - deltaTime * cooldownRate);
    tower.burstTimer = Math.max(0, (tower.burstTimer || 0) - deltaTime * cooldownRate);
    tower.fieldCooldown = Math.max(0, (tower.fieldCooldown || 0) - deltaTime * cooldownRate);

    if (tower.stunnedTimer > 0) {
      continue;
    }

    if (tower.type === "tesla" && stats.field && tower.fieldCooldown === 0) {
      const fieldDamageType = stats.electrocannon ? "laser" : "shock";
      const fieldTargets = enemies.filter((enemy) => canSeeEnemy(enemy, detectHidden) && Math.hypot(enemy.x - tower.centerX, enemy.y - tower.centerY) <= stats.range);
      for (const enemy of fieldTargets) {
        damageEnemy(enemy, stats.fieldDamage, fieldDamageType, { stun: stats.fieldStun });
        addBeam(tower.centerX, tower.centerY, enemy.x, enemy.y, "#7cc8ff");
      }
      tower.fieldCooldown = stats.fieldCooldown;
    }

    if (tower.type === "freezer" && stats.permafrost && tower.fieldCooldown === 0) {
      const pulseTargets = enemies.filter((enemy) =>
        canSeeEnemy(enemy, detectHidden)
        && Math.hypot(enemy.x - tower.centerX, enemy.y - tower.centerY) <= stats.pulseRadius
      );

      if (pulseTargets.length > 0) {
        for (const enemy of pulseTargets) {
          applyFreezeEffect(enemy, stats.pulseDamage, stats.slow, stats.slowDuration, stats.pulseFreeze);
        }
        addPulse(tower.centerX, tower.centerY, stats.pulseRadius, "#d9fbff");
        tower.fieldCooldown = stats.pulseCooldown;
      }
    }

    if (tower.type === "freezer" && stats.aura && tower.fieldCooldown === 0) {
      const auraTargets = enemies.filter((enemy) =>
        canSeeEnemy(enemy, detectHidden)
        && Math.hypot(enemy.x - tower.centerX, enemy.y - tower.centerY) <= stats.auraRadius
      );

      if (auraTargets.length > 0) {
        for (const enemy of auraTargets) {
          applyFreezeEffect(enemy, stats.auraDamage, stats.auraSlow, 0.32, 0);
        }
        addPulse(tower.centerX, tower.centerY, stats.auraRadius, "rgba(196, 243, 255, 0.7)");
      }
      tower.fieldCooldown = stats.auraTick;
    }

    if (tower.type === "gate" && tower.cooldown === 0) {
      const center = cellCenter(tower.x, tower.y);
      const arc = gateArcEndpoints(tower);
      const poolOffsets = (tower.rotation || 0) % 2 === 0
        ? [{ x: -9, y: 0 }, { x: 9, y: 0 }]
        : [{ x: 0, y: -9 }, { x: 0, y: 9 }];
      for (const offset of poolOffsets) {
        addStickyPuddle(center.x + offset.x, center.y + offset.y, stats.poolRadius, stats.acidSlow, stats.poolTtl, "rgba(144, 234, 130, 0.32)", stats.dotDamage, true, stats.poisonDamage, stats.poisonTtl);
      }
      addBeam(arc.x1, arc.y1, arc.x2, arc.y2, "rgba(166, 244, 140, 0.7)", 3.5, 0.08);
      addPulse(center.x, center.y, 12, "rgba(154, 235, 131, 0.3)");
      tower.cooldown = stats.cooldown;
    }

    if (tower.type === "tesla" && stats.supercharge && tower.cooldown > 0) {
      tower.charge = Math.min((tower.charge || 0) + deltaTime * 1.2, 4.5);
      if (tower.charge > 1.2) {
        addPulse(tower.centerX, tower.centerY, 8 + tower.charge * 3, "#9fe4ff");
      }
    }

    if (tower.type === "missile" && tower.burstShotsRemaining > 0) {
      if (tower.burstTimer > 0) {
        continue;
      }

      const burstTarget = nearestEnemyInRange(tower, stats.range, detectHidden);

      if (burstTarget) {
        tower.aimAngle = Math.atan2(burstTarget.y - tower.centerY, burstTarget.x - tower.centerX);
        spawnMissileProjectile(tower, burstTarget, stats);
      }

      tower.burstShotsRemaining -= 1;
      if (tower.burstShotsRemaining > 0) {
        tower.burstTimer = stats.burstDelay;
      } else {
        tower.cooldown = stats.cooldown;
      }
      continue;
    }

    if (tower.type === "dippy" && tower.burstShotsRemaining > 0) {
      if (tower.burstTimer > 0) {
        continue;
      }

      const burstTarget = nearestEnemyInRange(tower, stats.range, detectHidden);
      if (burstTarget) {
        tower.aimAngle = Math.atan2(burstTarget.y - tower.centerY, burstTarget.x - tower.centerX);
        spawnDippyEgg(tower, burstTarget, stats);
      }

      tower.burstShotsRemaining -= 1;
      if (tower.burstShotsRemaining > 0) {
        tower.burstTimer = stats.burstDelay;
      } else {
        tower.cooldown = stats.cooldown;
      }
      continue;
    }

    if (tower.cooldown > 0) {
      continue;
    }

    if (tower.type === "trapper") {
      if (spawnTrapperConstruct(tower)) {
        tower.cooldown = stats.cooldown;
      }
      continue;
    }

    if (tower.type === "support") {
      continue;
    }

    const target = nearestEnemyInRange(tower, stats.range, detectHidden);

    if (!target) {
      if (tower.type === "tesla" && stats.supercharge) {
        tower.charge = Math.min((tower.charge || 0) + deltaTime * 1.2, 4.5);
        if (tower.charge > 1.2) {
          addPulse(tower.centerX, tower.centerY, 8 + tower.charge * 3, "#9fe4ff");
        }
      }
      continue;
    }

    tower.aimAngle = Math.atan2(target.y - tower.centerY, target.x - tower.centerX);
    if (tower.type === "drone") {
      continue;
    }
    fireTower(tower, target);
    if ((tower.type !== "missile" && tower.type !== "dippy") || tower.burstShotsRemaining === 0) {
      tower.cooldown = stats.cooldown;
    }
  }
}

function spawnMissileProjectile(tower, target, stats) {
  const angle = Math.atan2(target.y - tower.centerY, target.x - tower.centerX);
  projectiles.push({
    id: nextProjectileId,
    kind: "missile",
    x: tower.centerX,
    y: tower.centerY,
    targetId: target.id,
    speed: stats.speed,
    acceleration: stats.acceleration,
    angle,
    homing: stats.homing,
    damage: stats.damage,
    splash: stats.splash,
    shrapnel: stats.shrapnel,
    clusters: stats.clusters,
    rain: stats.rain
  });
  nextProjectileId += 1;
}

function ensureDroneWing(tower, stats) {
  const owned = drones.filter((entry) => entry.towerId === tower.id);
  const needed = 1 + stats.supportCount;

  for (let index = owned.length; index < needed; index += 1) {
    drones.push({
      id: `${tower.id}:${index}`,
      towerId: tower.id,
      support: index > 0,
      slot: index,
      angle: (Math.PI * 2 * index) / Math.max(needed, 1),
      orbitRadius: CELL_SIZE * (index > 0 ? 1.2 : 0.9),
      x: tower.centerX,
      y: tower.centerY,
      cooldown: 0,
      rocketCooldown: 0,
      range: CELL_SIZE * 1.15,
      bodyRadius: 6
    });
  }

  drones = drones.filter((entry) => entry.towerId !== tower.id || entry.slot < needed);
}

function updateDrones(deltaTime) {
  for (const tower of towers.filter((entry) => entry.type === "drone")) {
    ensureDroneWing(tower, towerStats(tower));
  }

  for (const drone of drones) {
    const tower = towers.find((entry) => entry.id === drone.towerId);

    if (!tower) {
      continue;
    }

    if ((tower.stunnedTimer || 0) > 0) {
      continue;
    }

    const stats = towerStats(tower);
    const isSupport = drone.support;
    const detection = towerHasHiddenDetection(tower, stats);
    const attackRange = isSupport ? stats.supportRange : stats.droneRange;
    const baseDamage = isSupport ? stats.supportDamage : stats.bulletDamage;
    const gunCount = isSupport ? stats.supportGuns : stats.bulletGuns;
    drone.range = attackRange;
    drone.cooldown = Math.max(0, drone.cooldown - deltaTime);
    drone.rocketCooldown = Math.max(0, (drone.rocketCooldown || 0) - deltaTime);

    const enemiesInTowerRadius = enemies.filter((enemy) => {
      if (!canSeeEnemy(enemy, detection)) {
        return false;
      }

      if (!canTowerDamageEnemy(tower, enemy, stats)) {
        return false;
      }

      const insideOwnRadius = Math.hypot(enemy.x - tower.centerX, enemy.y - tower.centerY) <= stats.range;
      const insideAlliedRadius = stats.attackDrone && towers.some((ally) => Math.hypot(enemy.x - ally.centerX, enemy.y - ally.centerY) <= towerStats(ally).range);
      return insideOwnRadius || insideAlliedRadius;
    });

    const target = selectEnemyByPriority(enemiesInTowerRadius, tower.targetPriority || "first");

    if (target) {
      const dx = target.x - drone.x;
      const dy = target.y - drone.y;
      const distance = Math.hypot(dx, dy) || 1;
      const stopDistance = drone.range * 0.72 + drone.bodyRadius + 11;
      const desiredTravel = Math.max(distance - stopDistance, 0);
      const travel = Math.min(desiredTravel, stats.droneSpeed * deltaTime);
      const nextX = drone.x + (dx / distance) * travel;
      const nextY = drone.y + (dy / distance) * travel;
      const leashDistance = Math.hypot(nextX - tower.centerX, nextY - tower.centerY);

      if (leashDistance <= stats.range) {
        drone.x = nextX;
        drone.y = nextY;
      }
    } else {
      const hoverX = tower.centerX;
      const hoverY = tower.centerY;
      const dx = hoverX - drone.x;
      const dy = hoverY - drone.y;
      const distance = Math.hypot(dx, dy) || 1;
      const settleRadius = isSupport ? 20 : 28;

      if (distance > settleRadius) {
        const travel = Math.min(distance - settleRadius, stats.droneSpeed * deltaTime);
        drone.x += (dx / distance) * travel;
        drone.y += (dy / distance) * travel;
      } else {
        drone.angle += deltaTime * (1 + tower.level * 0.08 + (isSupport ? 0.18 : 0));
        drone.orbitRadius = settleRadius;
        drone.x = hoverX + Math.cos(drone.angle + drone.slot) * settleRadius;
        drone.y = hoverY + Math.sin(drone.angle + drone.slot) * settleRadius;
      }
    }

    if (!target) {
      continue;
    }

    const attackDistance = Math.hypot(target.x - drone.x, target.y - drone.y);

    if (attackDistance <= drone.range && attackDistance > drone.bodyRadius + 7) {
      if (drone.cooldown === 0) {
        const angle = Math.atan2(target.y - drone.y, target.x - drone.x);
        for (let index = 0; index < gunCount; index += 1) {
          const spread = gunCount === 1 ? 0 : (index - (gunCount - 1) / 2) * 0.08;
          projectiles.push({
            id: nextProjectileId,
            kind: "droneBullet",
            x: drone.x,
            y: drone.y,
            angle: angle + spread,
            speed: 260,
            damage: baseDamage,
            damageType: effectiveTowerDamageType(tower, "bullet", stats),
            pierce: stats.bulletPierce,
            hitIds: []
          });
          nextProjectileId += 1;
        }
        drone.cooldown = stats.cooldown;
      }

      if (!isSupport && stats.rocket && drone.rocketCooldown === 0) {
        projectiles.push({
          id: nextProjectileId,
          kind: "droneRocket",
          x: drone.x,
          y: drone.y,
          targetId: target.id,
          angle: Math.atan2(target.y - drone.y, target.x - drone.x),
          speed: stats.rocketSpeed,
          acceleration: 240,
          damage: stats.rocketDamage,
          splash: stats.rocketSplash
        });
        nextProjectileId += 1;
        drone.rocketCooldown = stats.rocketCooldown;
      }

      tower.aimAngle = Math.atan2(target.y - tower.centerY, target.x - tower.centerX);
    }
  }
}

function updateTraps(deltaTime) {
  const nextTraps = [];

  for (const trap of traps) {
    trap.ttl -= deltaTime;
    trap.cooldown = Math.max(0, (trap.cooldown || 0) - deltaTime);
    let removeTrap = false;

    if (trap.kind === "spike") {
      const touching = enemies.filter((entry) => Math.hypot(entry.x - trap.centerX, entry.y - trap.centerY) <= trap.radius);
      if (touching.length > 0) {
        const scale = deltaTime / Math.max(trap.tickRate || 0.2, 0.05);
        for (const enemy of touching) {
          damageEnemy(enemy, trap.damage * scale, trap.damageType || "trap");
        }
        if (trap.cooldown === 0) {
          addPulse(trap.centerX, trap.centerY, trap.radius, "rgba(225, 236, 244, 0.6)");
          trap.cooldown = 0.14;
        }
      }
    } else if (trap.kind === "turret") {
      if (trap.cooldown === 0) {
        const target = selectEnemyByPriority(
          enemies.filter((enemy) => canSeeEnemy(enemy, false) && canHitArmored(enemy, trap.damageType || "bullet") && Math.hypot(enemy.x - trap.centerX, enemy.y - trap.centerY) <= trap.range),
          "first"
        );

        if (target) {
          for (let index = 0; index < trap.barrels; index += 1) {
            const spread = trap.barrels === 1 ? 0 : (index === 0 ? -0.08 : 0.08);
            projectiles.push({
              id: nextProjectileId,
              kind: "trapTurretBullet",
              x: trap.centerX,
              y: trap.centerY,
              angle: Math.atan2(target.y - trap.centerY, target.x - trap.centerX) + spread,
              speed: 250,
              damage: trap.damage,
              damageType: trap.damageType || "bullet"
            });
            nextProjectileId += 1;
          }
          trap.cooldown = trap.attackCooldown;
        }
      }
    } else {
      const touching = enemies.filter((enemy) =>
        Math.hypot(enemy.x - trap.centerX, enemy.y - trap.centerY) <= trap.radius &&
        canHitArmored(enemy, "trap")
      );

      if (touching.length > 0) {
        const scale = deltaTime / Math.max(trap.tickRate || 0.2, 0.05);
        trap.targetEnemyId = touching[0].id;
        trap.usesRemaining -= scale;

        for (const enemy of touching) {
          if (trap.kind === "mine") {
            damageEnemy(enemy, trap.damage * 0.35 * scale, trap.damageType || "trap");
          } else {
            damageEnemy(enemy, trap.damage * scale, trap.damageType || "trap", {
              slow: trap.slow < 1 ? trap.slow : null,
              slowDuration: trap.slow < 1 ? trap.duration : 0
            });
          }
        }

        if (trap.cooldown === 0) {
          addPulse(trap.centerX, trap.centerY, trap.radius, trap.kind === "mine" ? "#ffd067" : "#9de67b");
          trap.cooldown = trap.kind === "mine" ? 0.18 : 0.12;
        }

        if (trap.usesRemaining <= 0) {
          if (trap.kind === "mine") {
            explodeTrap(trap);
          }
          removeTrap = true;
        }
      } else if (trap.targetEnemyId) {
        trap.targetEnemyId = null;
      }
    }

    if (!removeTrap && trap.kind === "mine" && trap.ttl <= 0) {
      explodeTrap(trap);
      removeTrap = true;
    }

    if (!removeTrap && trap.ttl > 0 && (trap.kind === "turret" || trap.kind === "spike" || trap.usesRemaining > 0)) {
      nextTraps.push(trap);
    }
  }

  traps = nextTraps;
}

function spawnSecondaryProjectiles(originX, originY, count, kind, damage, splash, rain = false) {
  for (let index = 0; index < count; index += 1) {
    const angle = kind === "dippyShell"
      ? Math.random() * Math.PI * 2
      : (Math.PI * 2 * index) / count;
    projectiles.push({
      id: nextProjectileId,
      kind,
      x: originX,
      y: originY,
      targetId: null,
      speed: kind === "cluster" ? 130 : kind === "mangoBomb" ? 62 : kind === "dippyShell" ? 60 + Math.random() * 85 : 180,
      acceleration: 0,
      angle,
      damage,
      splash,
      impactDamage: kind === "cluster" && rain ? damage * 2.3 : kind === "mangoBomb" ? damage * 1.15 : 0,
      hitIds: kind === "cluster" ? [] : null,
      shrapnel: false,
      clusters: false,
      rain,
      screenShake: 0,
      screenShakeDuration: 0,
      ttl: kind === "dippyShell" ? 0.06 + Math.random() * 0.11 : kind === "cluster" ? 0.32 : kind === "mangoBomb" ? 0.42 : 0.35,
      turnRate: kind === "dippyShell" ? (Math.random() - 0.5) * 32 : 0
    });
    nextProjectileId += 1;
  }
}

function explodeProjectile(projectile) {
  const shieldHitTracker = createShieldHitTracker();
  addPulse(projectile.x, projectile.y, projectile.splash, "#ffc572");

  for (const enemy of enemies) {
    const distance = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);

    if (distance <= projectile.splash) {
      damageEnemy(enemy, projectile.damage * (1 - distance / Math.max(projectile.splash, 1) * 0.5), "explosion", { shieldHitTracker });
      if (projectile.kind === "mangoBomb" && !activeShieldSourceForEnemy(enemy)) {
        enemy.slowFactor = Math.min(enemy.slowFactor, 0.5);
        enemy.slowTimer = Math.max(enemy.slowTimer, 1.8);
      }
    }
  }

  if (projectile.kind === "missile" && projectile.clusters) {
    spawnSecondaryProjectiles(
      projectile.x,
      projectile.y,
      10,
      "cluster",
      projectile.damage * 0.42,
      projectile.rain ? projectile.splash * 0.9 : projectile.splash * 0.56,
      projectile.rain
    );
    return;
  }

  if (projectile.kind === "missile" && projectile.shrapnel) {
    spawnSecondaryProjectiles(projectile.x, projectile.y, 8, "shard", projectile.damage * 0.28, 10);
    return;
  }

  if (projectile.kind === "cluster" && projectile.rain) {
    spawnSecondaryProjectiles(projectile.x, projectile.y, 4, "shard", projectile.damage * 0.45, 22);
  }
}

function projectileCollisionRadius(projectile) {
  if (projectile.kind === "missile" || projectile.kind === "droneRocket") {
    return 12;
  }

  if (projectile.kind === "mangoBomb" || projectile.kind === "cluster" || projectile.kind === "shard" || projectile.kind === "dippyShell") {
    return 10;
  }

  return 10;
}

function firstEnemyTouchingProjectile(projectile) {
  const radius = projectileCollisionRadius(projectile);
  return enemies.find((enemy) => Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y) <= radius) || null;
}

function explodeDroneRocket(projectile) {
  addPulse(projectile.x, projectile.y, projectile.splash, "#ffbb73");
  const shieldHitTracker = createShieldHitTracker();
  for (const enemy of enemies) {
    const distance = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);
    if (distance <= projectile.splash) {
      damageEnemy(enemy, projectile.damage * (1 - distance / Math.max(projectile.splash, 1) * 0.45), "explosion", { shieldHitTracker });
    }
  }
}

function explodeDippyEgg(projectile) {
  addPulse(projectile.x, projectile.y, projectile.splash, "#ffe8a3");
  addBurstParticles(projectile.x, projectile.y, projectile.whiteoutDuration > 0 ? 22 : 8, projectile.whiteoutDuration > 0 ? "#fff6c2" : "#ffe199", projectile.whiteoutDuration > 0 ? 80 : 35, projectile.whiteoutDuration > 0 ? 180 : 90);
  const shieldHitTracker = createShieldHitTracker();

  for (const enemy of enemies) {
    const distance = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);
    if (distance > projectile.splash) {
      continue;
    }

    damageEnemy(enemy, projectile.damage * (1 - distance / Math.max(projectile.splash, 1) * 0.35), "explosion", {
      shieldHitTracker,
      burnDamage: projectile.burnDamage,
      burnDuration: projectile.burnDuration,
      shieldMultiplier: projectile.shieldMultiplier
    });

    if (projectile.sticky && !activeShieldSourceForEnemy(enemy)) {
      enemy.slowFactor = Math.min(enemy.slowFactor, projectile.stickySlow);
      enemy.slowTimer = Math.max(enemy.slowTimer, projectile.stickyDuration);
      if (projectile.whiteoutDuration > 0) {
        enemy.whiteoutTimer = Math.max(enemy.whiteoutTimer || 0, projectile.whiteoutDuration);
      }
    }
  }

  if (projectile.sticky) {
    addStickyPuddle(
      projectile.x,
      projectile.y,
      projectile.syrupRadius || projectile.splash * 0.72,
      projectile.stickySlow,
      projectile.syrupTtl || projectile.stickyDuration + 1.2,
      projectile.syrupDamage > 0 ? "rgba(255, 171, 51, 0.48)" : "rgba(255, 215, 82, 0.55)",
      projectile.syrupDamage || 0,
      Boolean(projectile.syrupDamage > 0),
      0,
      0,
      projectile.syrupTowerBuff || 1
    );
  }

  if (projectile.shells) {
    spawnSecondaryProjectiles(projectile.x, projectile.y, 10, "dippyShell", projectile.shellDamage, 0);
  }

  if ((projectile.shockwaves || 1) > 1) {
    const secondRadius = projectile.splash * 1.45;
    const secondShieldHitTracker = createShieldHitTracker();
    addPulse(projectile.x, projectile.y, secondRadius, "rgba(255, 224, 146, 0.8)");
    for (const enemy of enemies) {
      const distance = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);
      if (distance <= secondRadius) {
        damageEnemy(enemy, projectile.damage * 0.42 * (1 - distance / Math.max(secondRadius, 1) * 0.3), "explosion", {
          shieldHitTracker: secondShieldHitTracker,
          shieldMultiplier: projectile.shieldMultiplier
        });
        if (projectile.sticky && !activeShieldSourceForEnemy(enemy)) {
          enemy.slowFactor = Math.min(enemy.slowFactor, projectile.stickySlow);
          enemy.slowTimer = Math.max(enemy.slowTimer, projectile.stickyDuration);
          if (projectile.whiteoutDuration > 0) {
            enemy.whiteoutTimer = Math.max(enemy.whiteoutTimer || 0, projectile.whiteoutDuration);
          }
        }
      }
    }
  }
}

function updateProjectiles(deltaTime) {
  const survivors = [];

  for (const projectile of projectiles) {
    if (projectile.kind === "crossbowBolt") {
      const target = projectile.targetId ? enemies.find((enemy) => enemy.id === projectile.targetId) : null;
      if (target) {
        const desiredAngle = Math.atan2(target.y - projectile.y, target.x - projectile.x);
        const angleDelta = Math.atan2(Math.sin(desiredAngle - projectile.angle), Math.cos(desiredAngle - projectile.angle));
        const maxTurn = (projectile.homing || 0) * deltaTime;
        projectile.angle += Math.max(-maxTurn, Math.min(maxTurn, angleDelta));
      }
      projectile.x += Math.cos(projectile.angle) * projectile.speed * deltaTime;
      projectile.y += Math.sin(projectile.angle) * projectile.speed * deltaTime;
      let removed = false;

      for (const enemy of enemies) {
        if (projectile.hitIds.includes(enemy.id)) {
          continue;
        }

        if (Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y) <= 10) {
          projectile.shieldHitTracker ||= createShieldHitTracker();
          if (damageEnemy(enemy, projectile.damage, projectile.damageType || "bullet", { shieldHitTracker: projectile.shieldHitTracker })) {
            projectile.hitIds.push(enemy.id);
            projectile.pierce -= 1;
            if (projectile.pierce < 0) {
              removed = true;
              break;
            }
          }
        }
      }

      if (!removed && projectile.x > -20 && projectile.x < canvas.width + 20 && projectile.y > -20 && projectile.y < canvas.height + 20) {
        survivors.push(projectile);
      }
      continue;
    }

    if (projectile.kind === "droneBullet") {
      projectile.x += Math.cos(projectile.angle) * projectile.speed * deltaTime;
      projectile.y += Math.sin(projectile.angle) * projectile.speed * deltaTime;

      let removed = false;
      for (const enemy of enemies) {
        if (projectile.hitIds.includes(enemy.id)) {
          continue;
        }

        if (Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y) <= 11) {
          projectile.shieldHitTracker ||= createShieldHitTracker();
          if (damageEnemy(enemy, projectile.damage, projectile.damageType || "bullet", { shieldHitTracker: projectile.shieldHitTracker })) {
            projectile.hitIds.push(enemy.id);
            projectile.pierce -= 1;
            if (projectile.pierce < 0) {
              removed = true;
              break;
            }
          }
        }
      }

      if (!removed && projectile.x > -20 && projectile.x < canvas.width + 20 && projectile.y > -20 && projectile.y < canvas.height + 20) {
        survivors.push(projectile);
      }
      continue;
    }

    if (projectile.kind === "trapTurretBullet") {
      projectile.x += Math.cos(projectile.angle) * projectile.speed * deltaTime;
      projectile.y += Math.sin(projectile.angle) * projectile.speed * deltaTime;
      let removed = false;

      for (const enemy of enemies) {
        if (Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y) <= 10) {
          damageEnemy(enemy, projectile.damage, projectile.damageType || "bullet");
          removed = true;
          break;
        }
      }

      if (!removed && projectile.x > -20 && projectile.x < canvas.width + 20 && projectile.y > -20 && projectile.y < canvas.height + 20) {
        survivors.push(projectile);
      }
      continue;
    }

    if (projectile.kind === "shotgunPellet") {
      projectile.x += Math.cos(projectile.angle) * projectile.speed * deltaTime;
      projectile.y += Math.sin(projectile.angle) * projectile.speed * deltaTime;
      let removed = false;

      for (const enemy of enemies) {
        if (Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y) <= 9) {
          damageEnemy(enemy, projectile.damage, projectile.damageType || "bullet");
          removed = true;
          break;
        }
      }

      if (!removed && projectile.x > -20 && projectile.x < canvas.width + 20 && projectile.y > -20 && projectile.y < canvas.height + 20) {
        survivors.push(projectile);
      }
      continue;
    }

    if (projectile.kind === "frostBolt") {
      projectile.x += Math.cos(projectile.angle) * projectile.speed * deltaTime;
      projectile.y += Math.sin(projectile.angle) * projectile.speed * deltaTime;
      let removed = false;

      for (const enemy of enemies) {
        if (Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y) <= 10) {
          if ((projectile.damageType || "freeze") === "explosion") {
            damageEnemy(enemy, projectile.damage, "explosion");
          } else {
            applyFreezeEffect(enemy, projectile.damage, projectile.slow, projectile.slowDuration, 0);
          }
          addPulse(projectile.x, projectile.y, 12, "#c8f6ff");
          removed = true;
          break;
        }
      }

      if (!removed && projectile.x > -20 && projectile.x < canvas.width + 20 && projectile.y > -20 && projectile.y < canvas.height + 20) {
        survivors.push(projectile);
      }
      continue;
    }

    if (projectile.kind === "dippyShell") {
      projectile.angle += (projectile.turnRate || 0) * deltaTime;
      projectile.speed = Math.max(18, projectile.speed - 420 * deltaTime);
      projectile.x += Math.cos(projectile.angle) * projectile.speed * deltaTime;
      projectile.y += Math.sin(projectile.angle) * projectile.speed * deltaTime;
      projectile.ttl -= deltaTime;
      let removed = false;

      for (const enemy of enemies) {
        if (Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y) <= 10) {
          damageEnemy(enemy, projectile.damage, projectile.damageType || "bullet");
          removed = true;
          break;
        }
      }

      if (!removed && projectile.ttl > 0 && projectile.x > -20 && projectile.x < canvas.width + 20 && projectile.y > -20 && projectile.y < canvas.height + 20) {
        survivors.push(projectile);
      }
      continue;
    }

    if (projectile.kind === "dippyEgg") {
      if (!(projectile.risingComplete)) {
        projectile.roll += projectile.spin * deltaTime;
        projectile.x += projectile.arcDrift * deltaTime;
        projectile.y -= 2200 * deltaTime;
        projectile.trailTimer = (projectile.trailTimer || 0) - deltaTime;
        if (projectile.trailTimer <= 0) {
          addBurstParticles(projectile.x, projectile.y + 10, 2, "rgba(255, 239, 182, 0.55)", 18, 36, 0.08, 0.16);
          projectile.trailTimer = 0.04;
        }
        if (projectile.y <= 0) {
          projectile.risingComplete = true;
          projectile.y = 0;
          projectile.hiddenOffscreen = true;
        }
        survivors.push(projectile);
        continue;
      }

      if ((projectile.holdDelay || 0) > 0) {
        projectile.holdDelay -= deltaTime;
        survivors.push(projectile);
        continue;
      }

      const target = projectile.targetId ? enemies.find((enemy) => enemy.id === projectile.targetId) : null;
      if (!projectile.falling) {
        projectile.falling = true;
        projectile.hiddenOffscreen = false;
        projectile.x = target ? target.x : projectile.targetX;
        projectile.y = -24;
        projectile.arcDrift *= 0.45;
      }
      if (target) {
        projectile.x += (target.x - projectile.x) * Math.min(1, deltaTime * 4);
        projectile.targetY = target.y;
      }

      projectile.roll += projectile.spin * deltaTime * 1.5;
      projectile.x += projectile.arcDrift * deltaTime;
      projectile.y += projectile.speed * deltaTime;
      projectile.trailTimer = (projectile.trailTimer || 0) - deltaTime;
      if (projectile.trailTimer <= 0) {
        addBurstParticles(projectile.x, projectile.y - 8, 3, "rgba(255, 211, 118, 0.55)", 22, 46, 0.08, 0.18);
        projectile.trailTimer = 0.03;
      }
      const impactEnemy = firstEnemyTouchingProjectile(projectile);
      if (impactEnemy || projectile.y >= projectile.targetY) {
        explodeDippyEgg(projectile);
      } else if (projectile.y < canvas.height + 40) {
        survivors.push(projectile);
      }
      continue;
    }

    const target = projectile.targetId ? enemies.find((enemy) => enemy.id === projectile.targetId) : null;

    if (target && (projectile.homing || projectile.kind === "droneRocket")) {
      projectile.angle = Math.atan2(target.y - projectile.y, target.x - projectile.x);
    }

    projectile.speed += (projectile.acceleration || 0) * deltaTime;
    projectile.x += Math.cos(projectile.angle) * projectile.speed * deltaTime;
    projectile.y += Math.sin(projectile.angle) * projectile.speed * deltaTime;

    if (projectile.ttl !== undefined) {
      projectile.ttl -= deltaTime;
      if (projectile.ttl <= 0) {
        explodeProjectile(projectile);
        continue;
      }
    }

    const impactEnemy = firstEnemyTouchingProjectile(projectile);

    if (projectile.kind === "cluster" && impactEnemy) {
      projectile.hitIds ||= [];
      if (!projectile.hitIds.includes(impactEnemy.id)) {
        damageEnemy(impactEnemy, projectile.impactDamage || projectile.damage, "explosion");
        projectile.hitIds.push(impactEnemy.id);
      }
    }

    if (projectile.kind === "cluster") {
      if (projectile.x > -40 && projectile.x < canvas.width + 40 && projectile.y > -40 && projectile.y < canvas.height + 40) {
        survivors.push(projectile);
      }
      continue;
    }

    const reachedTargetPoint = projectile.targetX !== undefined
      && projectile.targetY !== undefined
      && Math.hypot(projectile.targetX - projectile.x, projectile.targetY - projectile.y) <= Math.max(12, projectile.splash * 0.45);

    if (impactEnemy || reachedTargetPoint || (target && Math.hypot(target.x - projectile.x, target.y - projectile.y) <= 12) || (projectile.kind === "mangoBomb" && projectile.targetY !== undefined && projectile.y >= projectile.targetY)) {
      const directHitEnemy = impactEnemy || target;
      if (directHitEnemy && projectile.impactDamage > 0) {
        damageEnemy(directHitEnemy, projectile.impactDamage, projectile.kind === "mangoBomb" || projectile.kind === "cluster" ? "explosion" : (projectile.damageType || "bullet"));
      }
      if (projectile.kind === "droneRocket") {
        explodeDroneRocket(projectile);
        continue;
      }
      explodeProjectile(projectile);
      continue;
    }

    if (projectile.x > -40 && projectile.x < canvas.width + 40 && projectile.y > -40 && projectile.y < canvas.height + 40) {
      survivors.push(projectile);
    }
  }

  projectiles = survivors;
}

function updateEffects(deltaTime) {
  for (const effect of effects) {
    if (effect.kind === "puddle") {
      for (const enemy of enemies) {
        if (Math.hypot(enemy.x - effect.x, enemy.y - effect.y) <= effect.radius && !activeShieldSourceForEnemy(enemy)) {
          enemy.slowFactor = Math.min(enemy.slowFactor, effect.slow);
          enemy.slowTimer = Math.max(enemy.slowTimer, 0.24);
          if (!enemy.armored && effect.damage > 0) {
            damageEnemy(enemy, effect.damage * deltaTime, "chemical");
          }
          if (!enemy.armored && effect.poisonDamage > 0) {
            enemy.poisonDamage = Math.max(enemy.poisonDamage || 0, effect.poisonDamage);
            enemy.poisonTimer = Math.max(enemy.poisonTimer || 0, effect.poisonTtl || 0);
          }
        }
      }
    } else if (effect.kind === "spark") {
      effect.x += effect.vx * deltaTime;
      effect.y += effect.vy * deltaTime;
    } else if (effect.kind === "floatingText") {
      effect.y += effect.vy * deltaTime;
    }
  }

  effects = effects
    .map((effect) => ({ ...effect, ttl: effect.ttl - deltaTime }))
    .filter((effect) => effect.ttl > 0);
}

function spawnWaffleChildren(enemy, type, count, hpDivisor) {
  const nextTier = Math.max(1, (enemy.tier || 1) - 1);
  if (nextTier === enemy.tier || nextTier < 1) {
    return;
  }

  discoveredEnemies.add(type.key);
  renderAlmanac();

  const originCell = {
    x: Math.max(0, Math.min(COLS - 1, Math.floor(enemy.x / CELL_SIZE))),
    y: Math.max(0, Math.min(ROWS - 1, Math.floor(enemy.y / CELL_SIZE)))
  };
  const directionsForSpawn = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 }
  ];

  for (let index = 0; index < count; index += 1) {
    const direction = directionsForSpawn[index % directionsForSpawn.length];
    const startCell = {
      x: Math.max(0, Math.min(COLS - 1, originCell.x + direction.x)),
      y: Math.max(0, Math.min(ROWS - 1, originCell.y + direction.y))
    };
    const route = findPathFrom(startCell);
    const child = route.length > 0
      ? createEnemy(type, {
        portalIndex: enemy.portalIndex,
        startCell,
        route,
        tier: nextTier,
        reward: Math.max(1, Math.round(type.reward * rewardMultiplier())),
        hp: Math.max(1, Math.round(enemy.maxHp / hpDivisor)),
        speed: Math.max(18, enemy.speed + type.speedBonus),
        hidden: enemy.hidden,
        armored: enemy.armored,
        armorHp: enemy.armored ? Math.max(enemy.maxArmorHp || 0, enemy.armorHp || 0) : 0,
        shielded: enemy.shielded
      })
      : createEnemy(type, {
        portalIndex: enemy.portalIndex,
        tier: nextTier,
        reward: Math.max(1, Math.round(type.reward * rewardMultiplier())),
        hp: Math.max(1, Math.round(enemy.maxHp / hpDivisor)),
        speed: Math.max(18, enemy.speed + type.speedBonus),
        progress: enemy.progress,
        hidden: enemy.hidden,
        armored: enemy.armored,
        armorHp: enemy.armored ? Math.max(enemy.maxArmorHp || 0, enemy.armorHp || 0) : 0,
        shielded: enemy.shielded
      });

    if (child) {
      child.facingAngle = enemy.facingAngle || 0;
      pushEnemy(child);
    }
  }
}

function spawnDiamondChildren(enemy) {
  const nextTier = Math.max(1, (enemy.tier || 1) - 1);
  if (nextTier === enemy.tier || nextTier < 1) {
    return;
  }

  const originCell = {
    x: Math.max(0, Math.min(COLS - 1, Math.floor(enemy.x / CELL_SIZE))),
    y: Math.max(0, Math.min(ROWS - 1, Math.floor(enemy.y / CELL_SIZE)))
  };
  const directionsForSpawn = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 }
  ];

  for (const direction of directionsForSpawn) {
    const startCell = {
      x: Math.max(0, Math.min(COLS - 1, originCell.x + direction.x)),
      y: Math.max(0, Math.min(ROWS - 1, originCell.y + direction.y))
    };
    const route = findPathFrom(startCell);
    const child = route.length > 0
      ? createEnemy(ENEMY_TYPES.diamond, {
        portalIndex: enemy.portalIndex,
        startCell,
        route,
        tier: nextTier,
        reward: Math.max(1, Math.round(enemy.reward / 3)),
        hidden: enemy.hidden,
        armored: enemy.armored,
        armorHp: enemy.armored ? Math.max(0, Math.round((enemy.maxArmorHp || enemy.armorHp || 0) * 0.5)) : 0,
        shielded: enemy.shielded
      })
      : createEnemy(ENEMY_TYPES.diamond, {
        portalIndex: enemy.portalIndex,
        tier: nextTier,
        reward: Math.max(1, Math.round(enemy.reward / 3)),
        progress: enemy.progress,
        hidden: enemy.hidden,
        armored: enemy.armored,
        armorHp: enemy.armored ? Math.max(0, Math.round((enemy.maxArmorHp || enemy.armorHp || 0) * 0.5)) : 0,
        shielded: enemy.shielded
      });

    if (child) {
      child.facingAngle = enemy.facingAngle || 0;
      pushEnemy(child);
    }
  }
}

function spawnShieldChildren(enemy) {
  const nextTier = Math.max(1, (enemy.tier || 1) - 1);
  if (nextTier === enemy.tier || nextTier < 1) {
    return;
  }

  const originCell = {
    x: Math.max(0, Math.min(COLS - 1, Math.floor(enemy.x / CELL_SIZE))),
    y: Math.max(0, Math.min(ROWS - 1, Math.floor(enemy.y / CELL_SIZE)))
  };
  const directionsForSpawn = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 }
  ];

  for (const direction of directionsForSpawn) {
    const startCell = {
      x: Math.max(0, Math.min(COLS - 1, originCell.x + direction.x)),
      y: Math.max(0, Math.min(ROWS - 1, originCell.y + direction.y))
    };
    const route = findPathFrom(startCell);
    const child = route.length > 0
      ? createEnemy(ENEMY_TYPES.shield, {
        portalIndex: enemy.portalIndex,
        startCell,
        route,
        tier: nextTier,
        reward: Math.max(1, Math.round(enemy.reward / 3)),
        hidden: enemy.hidden,
        armored: enemy.armored,
        armorHp: enemy.armored ? Math.max(0, Math.round((enemy.maxArmorHp || enemy.armorHp || 0) * 0.5)) : 0,
        shielded: true
      })
      : createEnemy(ENEMY_TYPES.shield, {
        portalIndex: enemy.portalIndex,
        tier: nextTier,
        reward: Math.max(1, Math.round(enemy.reward / 3)),
        progress: enemy.progress,
        hidden: enemy.hidden,
        armored: enemy.armored,
        armorHp: enemy.armored ? Math.max(0, Math.round((enemy.maxArmorHp || enemy.armorHp || 0) * 0.5)) : 0,
        shielded: true
      });

    if (child) {
      child.facingAngle = enemy.facingAngle || 0;
      pushEnemy(child);
    }
  }
}

function spawnGenericTierChildren(enemy) {
  const nextTier = Math.max(1, (enemy.tier || 1) - 1);
  if (nextTier === enemy.tier || nextTier < 1 || !enemySupportsTiers(enemy.key) || enemy.key.startsWith("waffle")) {
    return;
  }

  const enemyType = ENEMY_TYPES[enemy.key];
  if (!enemyType) {
    return;
  }

  const originCell = {
    x: Math.max(0, Math.min(COLS - 1, Math.floor(enemy.x / CELL_SIZE))),
    y: Math.max(0, Math.min(ROWS - 1, Math.floor(enemy.y / CELL_SIZE)))
  };
  const directionsForSpawn = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 }
  ];

  for (const direction of directionsForSpawn) {
    const startCell = {
      x: Math.max(0, Math.min(COLS - 1, originCell.x + direction.x)),
      y: Math.max(0, Math.min(ROWS - 1, originCell.y + direction.y))
    };
    const route = findPathFrom(startCell);
    const child = route.length > 0
      ? createEnemy(enemyType, {
        portalIndex: enemy.portalIndex,
        startCell,
        route,
        tier: nextTier,
        reward: Math.max(1, Math.round(enemy.reward / 3)),
        hidden: enemy.hidden,
        armored: enemy.armored,
        armorHp: enemy.armored ? Math.max(0, Math.round((enemy.maxArmorHp || enemy.armorHp || 0) * 0.5)) : 0,
        shielded: enemy.shielded
      })
      : createEnemy(enemyType, {
        portalIndex: enemy.portalIndex,
        tier: nextTier,
        reward: Math.max(1, Math.round(enemy.reward / 3)),
        progress: enemy.progress,
        hidden: enemy.hidden,
        armored: enemy.armored,
        armorHp: enemy.armored ? Math.max(0, Math.round((enemy.maxArmorHp || enemy.armorHp || 0) * 0.5)) : 0,
        shielded: enemy.shielded
      });

    if (child) {
      child.facingAngle = enemy.facingAngle || 0;
      pushEnemy(child);
    }
  }
}

function purgeDefeatedEnemies() {
  const nextEnemies = [];

  for (const enemy of enemies) {
    if (enemy.hp > 0) {
      nextEnemies.push(enemy);
    } else {
  if (enemy.key === "waffle16" && (enemy.tier || 1) > 1) {
    spawnWaffleChildren(enemy, ENEMY_TYPES.waffle16, 4, 4);
  } else if (enemy.key === "diamond" && (enemy.tier || 1) > 1) {
        spawnDiamondChildren(enemy);
      } else if (enemy.key === "shield" && (enemy.tier || 1) > 1) {
        spawnShieldChildren(enemy);
      } else if ((enemy.tier || 1) > 1) {
        spawnGenericTierChildren(enemy);
      }
      money += enemy.reward;
    }
  }

  enemies = nextEnemies;
}

function updateHud() {
  nextPieceText.textContent = isFactoryMap() ? `Next conveyor: ${activePiece.name}` : `Next block: ${activePiece.name}`;
  routeText.textContent = isGraveyardMap()
    ? "Routes: gravebound"
    : allRoutesOpen(routes) ? `Routes: ${routes.length} open` : "Routes: blocked";
  updateTowerButtons();
  if (blockToolButton) {
    blockToolButton.textContent = isFactoryMap()
      ? (freeBlocks > 0 ? "Conveyor (Free)" : `Conveyor (${currentBlockCost})`)
      : (freeBlocks > 0 ? "Block (Free)" : `Block (${currentBlockCost})`);
  }
  if (moneyText) {
    moneyText.textContent = `Cash: ${money}`;
  }
  boardCashText.textContent = `Cash: ${money}`;
  freeBlockText.textContent = isFactoryMap()
    ? (freeBlocks > 0 ? `Conveyor price after free: ${currentBlockCost}` : `Conveyor price: ${currentBlockCost}`)
    : (freeBlocks > 0 ? `Block price after free: ${currentBlockCost}` : `Block price: ${currentBlockCost}`);
  livesText.textContent = `Lives: ${lives}`;
  waveText.textContent = `Wave: ${waveNumber}`;
  enemyText.textContent = `Enemies: ${enemies.length}`;
  if (autoWaveToggle) {
    autoWaveToggle.checked = autoWaveEnabled;
  }
  waveButton.textContent = autoWaveEnabled ? "Start Wave Now" : "Start Wave";
  selectionText.textContent = `Selected: ${TOWER_INFO[selectedTowerType].name}`;
  upgradeText.textContent = `Upgrade: ${currentTool === "upgrade" ? "click tower, max 5" : "max 5"}${selectedMap === "outpost" && !crossbowUnlocked ? " | Secret: Brutal Outpost wave 50 without placing walls" : ""}`;
  updateSandboxControls();
  updateAirstrikeControls();
  renderTutorial();

  if (messageTimer > 0) {
    statusText.textContent = message;
  } else if (lives <= 0) {
    statusText.textContent = "Game over.";
  } else if (!allRoutesOpen(routes)) {
    statusText.textContent = isFactoryMap()
      ? "Factory line incomplete. Place conveyors to extend the route."
      : "The path is blocked. Erase a block to reopen the route.";
  } else if (wave && !wave.complete) {
    statusText.textContent = `Wave ${waveNumber} in progress.`;
  } else if (autoWaveEnabled) {
    statusText.textContent = isSandboxMode() && sandboxWaveTarget !== null
      ? `Auto wave armed. Sandbox wave ${sandboxWaveTarget} will repeat on its own.`
      : `Auto wave armed. Next wave ${waveNumber + 1} will start on its own.`;
  } else {
    statusText.textContent = isSandboxMode() && sandboxWaveTarget !== null
      ? `Path ready. Build and start sandbox wave ${sandboxWaveTarget}.`
      : `Path ready. Build and start wave ${waveNumber + 1}.`;
  }
}

function updateAmbientEffects(deltaTime) {
  ambientTimer += deltaTime;

  const spawnRate = activeMap.scenery === "canyon" ? 0.22 : activeMap.scenery === "ruins" ? 0.32 : activeMap.scenery === "mango" ? 0.2 : activeMap.scenery === "graveyard" ? 0.26 : Infinity;

  while (ambientTimer >= spawnRate && spawnRate !== Infinity) {
    ambientTimer -= spawnRate;

    if (activeMap.scenery === "canyon") {
      ambientParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 18 + Math.random() * 22,
        vy: -4 + Math.random() * 8,
        radius: 8 + Math.random() * 12,
        ttl: 1.8 + Math.random() * 1.6,
        color: `rgba(196, 153, 103, ${0.08 + Math.random() * 0.08})`
      });
    } else if (activeMap.scenery === "ruins") {
      ambientParticles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 12,
        vx: -6 + Math.random() * 12,
        vy: -(20 + Math.random() * 18),
        radius: 4 + Math.random() * 7,
        ttl: 2.4 + Math.random() * 1.8,
        color: `rgba(143, 205, 235, ${0.08 + Math.random() * 0.08})`
      });
    } else if (activeMap.scenery === "mango") {
      ambientParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 12 + Math.random() * 16,
        vy: 6 + Math.random() * 12,
        radius: 5 + Math.random() * 9,
        ttl: 1.8 + Math.random() * 1.4,
        color: Math.random() > 0.5
          ? `rgba(255, 193, 77, ${0.08 + Math.random() * 0.08})`
          : `rgba(255, 149, 64, ${0.08 + Math.random() * 0.08})`
      });
    } else if (activeMap.scenery === "graveyard") {
      ambientParticles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: -4 + Math.random() * 8,
        vy: -(10 + Math.random() * 12),
        radius: 3 + Math.random() * 5,
        ttl: 2 + Math.random() * 1.2,
        color: `rgba(220, 235, 222, ${0.05 + Math.random() * 0.05})`
      });
    }
  }

  ambientParticles = ambientParticles
    .map((particle) => ({
      ...particle,
      x: particle.x + particle.vx * deltaTime,
      y: particle.y + particle.vy * deltaTime,
      ttl: particle.ttl - deltaTime
    }))
    .filter((particle) => particle.ttl > 0 && particle.x > -40 && particle.x < canvas.width + 40 && particle.y > -40 && particle.y < canvas.height + 40);
}

function drawGrid() {
  if (activeMap.scenery === "factory") {
    for (let y = 0; y < ROWS; y += 1) {
      for (let x = 0; x < COLS; x += 1) {
        ctx.fillStyle = isFactoryBuildTile(x, y) ? "rgba(110, 118, 128, 0.32)" : "rgba(198, 205, 214, 0.24)";
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
  ctx.strokeStyle = "rgba(217, 196, 164, 0.72)";
  ctx.lineWidth = 1;

  for (let x = 0; x <= COLS; x += 1) {
    ctx.beginPath();
    ctx.moveTo(x * CELL_SIZE, 0);
    ctx.lineTo(x * CELL_SIZE, ROWS * CELL_SIZE);
    ctx.stroke();
  }

  for (let y = 0; y <= ROWS; y += 1) {
    ctx.beginPath();
    ctx.moveTo(0, y * CELL_SIZE);
    ctx.lineTo(COLS * CELL_SIZE, y * CELL_SIZE);
    ctx.stroke();
  }
}

function drawMapScenery() {
  if (activeMap.scenery === "canyon") {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#efd0a5");
    gradient.addColorStop(0.55, "#d2a06b");
    gradient.addColorStop(1, "#b67d4f");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (activeMap.scenery === "fortification") {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#d5dbdf");
    gradient.addColorStop(0.5, "#bcc5cc");
    gradient.addColorStop(1, "#98a6b3");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (activeMap.scenery === "ruins") {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#14385d");
    gradient.addColorStop(0.5, "#1a4d79");
    gradient.addColorStop(1, "#0f2944");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (activeMap.scenery === "mango") {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#fff0a8");
    gradient.addColorStop(0.5, "#f9cf64");
    gradient.addColorStop(1, "#ebb24f");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (activeMap.scenery === "factory") {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#d7dce2");
    gradient.addColorStop(0.5, "#c2c8d0");
    gradient.addColorStop(1, "#aeb6c0");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (activeMap.scenery === "graveyard") {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#2f3b33");
    gradient.addColorStop(0.5, "#1f2923");
    gradient.addColorStop(1, "#131917");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#d9efd2");
    gradient.addColorStop(1, "#bdd8b7");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (activeMap.scenery === "canyon") {
    ctx.fillStyle = "rgba(150, 102, 57, 0.12)";
    for (let band = 0; band < 5; band += 1) {
      ctx.fillRect(0, band * 118 + 18, canvas.width, 18);
    }
  } else if (activeMap.scenery === "fortification") {
    ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
    for (let x = 0; x < canvas.width; x += 72) {
      for (let y = 0; y < canvas.height; y += 72) {
        ctx.fillRect(x + 6, y + 6, 24, 24);
      }
    }
    if (selectedMap === "fortification") {
      ctx.fillStyle = "rgba(35, 47, 58, 0.18)";
      ctx.fillRect(0, 4 * CELL_SIZE, COLS * CELL_SIZE, CELL_SIZE * 2);
      ctx.fillRect(0, 9 * CELL_SIZE, COLS * CELL_SIZE, CELL_SIZE * 2);
      ctx.fillStyle = "rgba(233, 240, 246, 0.12)";
      ctx.fillRect(0, 6 * CELL_SIZE, COLS * CELL_SIZE, CELL_SIZE * 3);
    }
  } else if (activeMap.scenery === "ruins") {
    ctx.fillStyle = "rgba(117, 189, 227, 0.08)";
    for (let band = 0; band < 4; band += 1) {
      ctx.fillRect(0, band * 132 + 28, canvas.width, 14);
    }
  } else if (activeMap.scenery === "mango") {
    ctx.fillStyle = "rgba(255, 240, 167, 0.22)";
    ctx.beginPath();
    ctx.arc(canvas.width * 0.83, canvas.height * 0.22, 68, 0, Math.PI * 2);
    ctx.fill();
  } else if (activeMap.scenery === "factory") {
    ctx.fillStyle = "rgba(77, 87, 98, 0.1)";
    for (let x = 0; x < canvas.width; x += CELL_SIZE * 2) {
      ctx.fillRect(x + 6, 0, 6, canvas.height);
    }
    for (let y = 0; y < canvas.height; y += CELL_SIZE * 2) {
      ctx.fillRect(0, y + 6, canvas.width, 6);
    }
  } else if (activeMap.scenery === "graveyard") {
    ctx.fillStyle = "rgba(196, 214, 197, 0.06)";
    for (let x = 18; x < canvas.width; x += 86) {
      ctx.fillRect(x, 20, 8, canvas.height - 40);
    }
    const zone = mapBuildZone();
    if (zone) {
      ctx.fillStyle = "rgba(173, 211, 181, 0.12)";
      ctx.fillRect(zone.x * CELL_SIZE, zone.y * CELL_SIZE, zone.width * CELL_SIZE, zone.height * CELL_SIZE);
      ctx.strokeStyle = "rgba(205, 235, 210, 0.35)";
      ctx.lineWidth = 3;
      ctx.strokeRect(zone.x * CELL_SIZE, zone.y * CELL_SIZE, zone.width * CELL_SIZE, zone.height * CELL_SIZE);
    }
  }

  for (const particle of ambientParticles) {
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!activeMap.hidePortals) {
    for (const portal of activePortals()) {
      const center = cellCenter(portal.x, portal.y);
      ctx.fillStyle = "rgba(45, 108, 223, 0.18)";
      ctx.beginPath();
      ctx.arc(center.x, center.y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#2d6cdf";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  for (const obstacle of activeMap.obstacles) {
    ctx.fillStyle = "#6b747c";
    ctx.fillRect(obstacle.x * CELL_SIZE + 4, obstacle.y * CELL_SIZE + 4, CELL_SIZE - 8, CELL_SIZE - 8);
  }
}

function drawRoundedRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.fill();
}

function drawRoute() {
  if (activeMap.hideRoutes || !allRoutesOpen(routes)) {
    return;
  }

  const mainRouteCells = new Set(routes.flat().map((point) => `${point.x},${point.y}`));
  const offTrackRoutes = new Map();
  for (const enemy of enemies) {
    if (!enemy.route || enemy.route.length < 2) {
      continue;
    }
    if (!enemy.route.some((point) => !mainRouteCells.has(`${point.x},${point.y}`))) {
      continue;
    }
    const key = enemy.route.map((point) => `${point.x},${point.y}`).join("|");
    offTrackRoutes.set(key, enemy.route);
  }

  for (const path of routes) {
    ctx.save();
    ctx.setLineDash([2, 13]);
    ctx.lineDashOffset = -dashOffset;
    ctx.strokeStyle = "#2d6cdf";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();

    path.forEach((point, index) => {
      const center = cellCenter(point.x, point.y);
      if (index === 0) {
        ctx.moveTo(center.x, center.y);
      } else {
        ctx.lineTo(center.x, center.y);
      }
    });

    ctx.stroke();
    ctx.restore();
  }

  for (const route of offTrackRoutes.values()) {
    ctx.save();
    ctx.setLineDash([2, 10]);
    ctx.lineDashOffset = -dashOffset * 0.8;
    ctx.strokeStyle = "rgba(125, 176, 255, 0.45)";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    route.forEach((point, index) => {
      const center = cellCenter(point.x, point.y);
      if (index === 0) {
        ctx.moveTo(center.x, center.y);
      } else {
        ctx.lineTo(center.x, center.y);
      }
    });
    ctx.stroke();
    ctx.restore();
  }
}

function drawBlock(block) {
  for (const cell of block.cells) {
    ctx.fillStyle = block.color;
    ctx.fillRect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }

  ctx.strokeStyle = "rgba(255, 248, 240, 0.9)";
  ctx.lineWidth = 3;

  for (const cell of block.cells) {
    const has = (dx, dy) => block.cells.some((other) => other.x === cell.x + dx && other.y === cell.y + dy);
    const left = cell.x * CELL_SIZE;
    const top = cell.y * CELL_SIZE;
    const right = left + CELL_SIZE;
    const bottom = top + CELL_SIZE;

    ctx.beginPath();

    if (!has(0, -1)) {
      ctx.moveTo(left + 2, top + 2);
      ctx.lineTo(right - 2, top + 2);
    }
    if (!has(1, 0)) {
      ctx.moveTo(right - 2, top + 2);
      ctx.lineTo(right - 2, bottom - 2);
    }
    if (!has(0, 1)) {
      ctx.moveTo(right - 2, bottom - 2);
      ctx.lineTo(left + 2, bottom - 2);
    }
    if (!has(-1, 0)) {
      ctx.moveTo(left + 2, bottom - 2);
      ctx.lineTo(left + 2, top + 2);
    }

    ctx.stroke();
  }

  if (isFactoryMap() && block.conveyor) {
    for (const cell of block.cells) {
      const arrow = factoryArrowDirectionForCell(cell);
      if (arrow === null) {
        continue;
      }
      const center = cellCenter(cell.x, cell.y);
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(arrow);
      ctx.strokeStyle = "rgba(238, 244, 248, 0.92)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-9, 0);
      ctx.lineTo(7, 0);
      ctx.moveTo(1, -6);
      ctx.lineTo(7, 0);
      ctx.lineTo(1, 6);
      ctx.stroke();
      ctx.restore();
    }
  }
}

function drawPreview() {
  if (!hoverCell || !inBounds(hoverCell.x, hoverCell.y)) {
    return;
  }

  if (currentTool === "wall") {
    const valid = canPlacePiece(hoverCell.x, hoverCell.y);

    for (const cell of placedCells(hoverCell.x, hoverCell.y)) {
      if (!inBounds(cell.x, cell.y) || isEndpoint(cell.x, cell.y)) {
        continue;
      }

      ctx.fillStyle = valid ? `${activePiece.color}66` : "rgba(204, 63, 92, 0.35)";
      ctx.fillRect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    return;
  }

  if (currentTool === "tower") {
    drawTowerGhost(hoverCell.x, hoverCell.y);
  }
}

function drawArmedAbilityPreview() {
  if (armedAbility !== "airstrike" || !hoverPoint) {
    return;
  }

  const tower = preferredAirstrikeTower();
  const stats = tower ? towerStats(tower) : null;
  const blocked = tower ? !towerHasLineOfSightToPoint(tower, hoverPoint.x, hoverPoint.y) : true;
  const radius = stats ? Math.max(stats.airstrikeSplash * 2.2, 42) : 42;

  ctx.save();
  ctx.strokeStyle = blocked ? "rgba(214, 55, 55, 0.92)" : "rgba(255, 192, 78, 0.95)";
  ctx.fillStyle = blocked ? "rgba(214, 55, 55, 0.12)" : "rgba(255, 192, 78, 0.12)";
  ctx.lineWidth = blocked ? 3 : 2;
  ctx.beginPath();
  ctx.arc(hoverPoint.x, hoverPoint.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  if (tower) {
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(tower.centerX, tower.centerY);
    ctx.lineTo(hoverPoint.x, hoverPoint.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  ctx.restore();
}

function drawTowerShape(type, level, centerX, centerY, aimAngle = -Math.PI / 2, ghost = false, invalid = false, tower = null) {
  const stats = tower ? towerStats(tower) : null;
  const path1 = tower?.path1 || 0;
  const path2 = tower?.path2 || 0;
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(aimAngle);

  if (type === "crossbow") {
    ctx.strokeStyle = ghost ? (invalid ? "rgba(255, 225, 225, 0.95)" : "rgba(231, 209, 184, 0.72)") : "#f4dcc1";
    ctx.fillStyle = ghost ? "rgba(161, 119, 82, 0.42)" : "#7b5636";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-7, -7);
    ctx.lineTo(7, 7);
    ctx.moveTo(-7, 7);
    ctx.lineTo(7, -7);
    ctx.stroke();
    ctx.strokeStyle = ghost ? "rgba(246, 231, 214, 0.88)" : "#f7ead8";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(12, 0);
    ctx.stroke();
    if (level >= 2) {
      ctx.beginPath();
      ctx.moveTo(1, -3);
      ctx.lineTo(12, -3);
      ctx.moveTo(1, 3);
      ctx.lineTo(12, 3);
      ctx.stroke();
    }
    if (level >= 3) {
      ctx.strokeStyle = ghost ? "rgba(255, 223, 176, 0.82)" : "#f2c793";
      ctx.beginPath();
      ctx.moveTo(-4, -10);
      ctx.lineTo(4, -10);
      ctx.moveTo(-4, 10);
      ctx.lineTo(4, 10);
      ctx.stroke();
    }
    if (level >= 4) {
      ctx.strokeStyle = ghost ? "rgba(250, 236, 221, 0.9)" : "#f8ecde";
      ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.lineTo(15, 0);
      ctx.stroke();
    }
  } else if (type === "gate") {
    const postFill = ghost ? (invalid ? "rgba(212, 73, 96, 0.85)" : "rgba(133, 179, 102, 0.45)") : "#6e8e57";
    const postStroke = ghost ? "rgba(223, 247, 205, 0.72)" : "#e7f8d5";
    const coilStroke = ghost ? "rgba(192, 243, 148, 0.78)" : "#bdf46d";
    ctx.fillStyle = postFill;
    ctx.strokeStyle = postStroke;
    ctx.lineWidth = 2.2;
    for (const offset of [-CELL_SIZE, CELL_SIZE]) {
      ctx.fillRect(offset - 8, -14, 16, 28);
      ctx.strokeRect(offset - 8, -14, 16, 28);
      ctx.fillStyle = ghost ? "rgba(165, 229, 114, 0.58)" : "#9be45d";
      ctx.fillRect(offset - 5, -4, 10, 8);
      ctx.fillStyle = postFill;
    }
    ctx.strokeStyle = coilStroke;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-CELL_SIZE + 8, -6);
    ctx.bezierCurveTo(-10, -18, 10, 18, CELL_SIZE - 8, 6);
    ctx.stroke();
    if (level >= 3) {
      ctx.beginPath();
      ctx.moveTo(-CELL_SIZE + 8, 6);
      ctx.bezierCurveTo(-10, 18, 10, -18, CELL_SIZE - 8, -6);
      ctx.stroke();
    }
    if (level >= 5) {
      ctx.strokeStyle = ghost ? "rgba(255, 240, 173, 0.72)" : "#ffe072";
      ctx.beginPath();
      ctx.moveTo(-8, -16);
      ctx.lineTo(8, -16);
      ctx.moveTo(-8, 16);
      ctx.lineTo(8, 16);
      ctx.stroke();
    }
  } else if (type === "laser") {
    ctx.fillStyle = ghost ? (invalid ? "rgba(212, 73, 96, 0.85)" : "rgba(255, 124, 168, 0.45)") : "#ff7ca8";
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(-10, -12);
    ctx.lineTo(-10, 12);
    ctx.closePath();
    ctx.fill();
    if (path1 >= 1) {
      ctx.strokeStyle = ghost ? "rgba(255, 250, 250, 0.8)" : "#fffdf8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-3, -7);
      ctx.lineTo(9, 0);
      ctx.lineTo(-3, 7);
      ctx.stroke();
    }
    if (path2 >= 1) {
      ctx.fillStyle = ghost ? "rgba(255, 227, 92, 0.65)" : "#ffe35c";
      ctx.fillRect(-2, -2.5, 10, 5);
    }
    if (path1 >= 3) {
      ctx.strokeStyle = ghost ? "rgba(255, 255, 255, 0.85)" : "#ffffff";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-8, -10);
      ctx.lineTo(-12, 0);
      ctx.lineTo(-8, 10);
      ctx.stroke();
    }
    if (path2 >= 3) {
      ctx.strokeStyle = ghost ? "rgba(255, 238, 147, 0.85)" : "#fff095";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(3, -10);
      ctx.lineTo(13, 0);
      ctx.lineTo(3, 10);
      ctx.stroke();
    }
  } else if (type === "shotgun") {
    ctx.fillStyle = ghost ? (invalid ? "rgba(212, 73, 96, 0.85)" : "rgba(255, 211, 77, 0.52)") : "#ffd34d";
    ctx.beginPath();
    ctx.moveTo(13, 0);
    ctx.lineTo(-7, -9);
    ctx.lineTo(-13, -5);
    ctx.lineTo(-13, 5);
    ctx.lineTo(-7, 9);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = ghost ? "rgba(255, 246, 196, 0.82)" : "#fff0a8";
    ctx.lineWidth = 1.8;
    ctx.stroke();
    if (path1 >= 1) {
      ctx.fillStyle = ghost ? "rgba(255, 183, 87, 0.75)" : "#ffb64f";
      ctx.fillRect(-5, -3, 10, 6);
    }
    if (path1 >= 3) {
      ctx.strokeStyle = ghost ? "rgba(255, 198, 124, 0.85)" : "#ffc76e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-10, -7);
      ctx.lineTo(-3, -2);
      ctx.moveTo(-10, 7);
      ctx.lineTo(-3, 2);
      ctx.stroke();
    }
    if (path2 >= 3) {
      ctx.strokeStyle = ghost ? "rgba(255, 248, 161, 0.88)" : "#fff38c";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(4, -6);
      ctx.lineTo(16, -3);
      ctx.moveTo(4, 6);
      ctx.lineTo(16, 3);
      ctx.stroke();
    }
  } else if (type === "freezer") {
    ctx.fillStyle = ghost ? (invalid ? "rgba(212, 73, 96, 0.85)" : "rgba(181, 235, 255, 0.5)") : "#b5ebff";
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = ghost ? "rgba(255, 255, 255, 0.8)" : "#f8ffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-7, 0);
    ctx.lineTo(7, 0);
    ctx.moveTo(0, -7);
    ctx.lineTo(0, 7);
    ctx.stroke();
    if (path1 >= 3) {
      ctx.strokeStyle = ghost ? "rgba(220, 250, 255, 0.8)" : "#e4fbff";
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (path2 >= 3) {
      ctx.strokeStyle = ghost ? "rgba(168, 231, 255, 0.75)" : "#8fdfff";
      ctx.beginPath();
      ctx.arc(0, 0, 17, 0.3, Math.PI * 1.7);
      ctx.stroke();
    }
  } else if (type === "dippy") {
    const dippyStats = stats || towerStats(tower || mockTower("dippy"));
    const ammoCount = path1 >= 3 ? dippyStats.burst : 0;
    const visibleAmmo = ammoCount > 0 ? (tower ? Math.max(0, tower.dippyAmmo ?? dippyStats.burst) : dippyStats.burst) : 0;
    const sunny = path2 >= 3;
    if (sunny) {
      ctx.fillStyle = ghost ? (invalid ? "rgba(212, 73, 96, 0.85)" : "rgba(255, 255, 245, 0.7)") : "#fffdf7";
      ctx.beginPath();
      ctx.ellipse(0, 0, 21, 17, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ghost ? "rgba(255, 205, 84, 0.8)" : dippyStats.yolkColor || "#ffce54";
      ctx.beginPath();
      ctx.arc(2, 0, 7.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = ghost ? "rgba(255,255,255,0.8)" : "#fefefe";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else {
      ctx.fillStyle = ghost ? (invalid ? "rgba(212, 73, 96, 0.85)" : "rgba(255, 246, 214, 0.72)") : "#fff0d1";
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = ghost ? "rgba(214, 180, 120, 0.85)" : "#c9964b";
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }
    if (ammoCount > 1) {
      const ammoSlots = dippyAmmoSlotLayout(ammoCount);
      const fillOrder = ensureDippyAmmoOrder(tower, ammoSlots.length);
      const filledSlots = new Set(fillOrder.slice(0, Math.min(visibleAmmo, ammoSlots.length)));
      const rackRadius = ammoCount >= 12 ? 33 : ammoCount >= 6 ? 24 : 18;
      ctx.save();
      ctx.fillStyle = ghost ? "rgba(91, 102, 112, 0.55)" : "#5c6670";
      ctx.strokeStyle = ghost ? "rgba(216, 226, 234, 0.55)" : "#dbe4ea";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, rackRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      for (let index = 0; index < ammoSlots.length; index += 1) {
        const slot = ammoSlots[index];
        ctx.fillStyle = ghost ? "rgba(24, 31, 38, 0.55)" : "#24303a";
        ctx.beginPath();
        ctx.arc(slot.x, slot.y, slot.radius, 0, Math.PI * 2);
        ctx.fill();
        if (filledSlots.has(index)) {
          ctx.fillStyle = ghost ? "rgba(255, 247, 224, 0.7)" : "#fff4dc";
          ctx.beginPath();
          ctx.arc(slot.x, slot.y, slot.radius * 0.62, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.fillStyle = ghost ? "rgba(24, 31, 38, 0.35)" : "#1f2a33";
      ctx.beginPath();
      ctx.arc(0, 0, ammoCount >= 12 ? 5.8 : 5.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    if (path1 >= 2) {
      ctx.strokeStyle = ghost ? "rgba(255, 209, 139, 0.85)" : "#ffcb86";
      ctx.beginPath();
      ctx.moveTo(-5, -8);
      ctx.lineTo(4, -2);
      ctx.lineTo(-2, 7);
      ctx.stroke();
    }
    if (path2 >= 2) {
      ctx.fillStyle = ghost ? "rgba(255,255,255,0.8)" : "#fffdf5";
      ctx.beginPath();
      ctx.arc(8, -4, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === "missile") {
    ctx.fillStyle = ghost ? (invalid ? "rgba(212, 73, 96, 0.85)" : "rgba(138, 99, 235, 0.42)") : "#8a63eb";
    regularPolygon(0, 0, 12, 6);
    ctx.fill();
    if (path1 >= 1) {
      ctx.fillStyle = ghost ? "rgba(214, 196, 255, 0.65)" : "#c9b4ff";
      ctx.fillRect(-8, -3, 8, 6);
    }
    if (path2 >= 3) {
      ctx.strokeStyle = ghost ? "rgba(255, 233, 180, 0.75)" : "#ffd27a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-4, -11);
      ctx.lineTo(2, -16);
      ctx.moveTo(-4, 11);
      ctx.lineTo(2, 16);
      ctx.stroke();
    }
    if (path2 >= 4) {
      ctx.fillStyle = ghost ? "rgba(255, 206, 120, 0.75)" : "#ffb44e";
      ctx.fillRect(-14, -5, 5, 10);
    }
    if (path1 >= 5) {
      ctx.fillStyle = ghost ? "rgba(255, 220, 172, 0.75)" : "#ffd6a8";
      ctx.fillRect(10, -6, 10, 12);
    }
    if (path2 >= 5) {
      ctx.fillStyle = ghost ? "rgba(255, 184, 95, 0.75)" : "#ff9d45";
      ctx.fillRect(2, -10, 6, 20);
    }
  } else if (type === "trapper") {
    const fillSquare = path1 >= 3;
    if (fillSquare) {
      ctx.fillStyle = ghost ? (invalid ? "rgba(212, 73, 96, 0.85)" : "rgba(156, 226, 133, 0.55)") : "#9ce285";
      ctx.fillRect(-11, -11, 22, 22);
    } else {
      ctx.strokeStyle = ghost ? (invalid ? "rgba(255, 222, 222, 0.95)" : "rgba(156, 226, 133, 0.55)") : "#9ce285";
      ctx.lineWidth = 4;
      ctx.strokeRect(-11, -11, 22, 22);
    }
    if (path2 >= 1) {
      ctx.strokeStyle = ghost ? "rgba(209, 255, 190, 0.8)" : "#d3ffc0";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-8, -8);
      ctx.lineTo(8, -8);
      ctx.moveTo(-8, 8);
      ctx.lineTo(8, 8);
      ctx.stroke();
    }
    if (path2 >= 2) {
      ctx.fillStyle = ghost ? "rgba(238, 255, 214, 0.8)" : "#ecffd7";
      ctx.beginPath();
      ctx.arc(-5, 0, 2, 0, Math.PI * 2);
      ctx.arc(5, 0, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    if (path2 >= 4) {
      ctx.strokeStyle = ghost ? "rgba(255, 216, 120, 0.8)" : "#ffd067";
      ctx.beginPath();
      ctx.arc(0, 0, 13, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (type === "tesla") {
    ctx.fillStyle = ghost ? (invalid ? "rgba(212, 73, 96, 0.85)" : "rgba(108, 188, 255, 0.45)") : "#6cbcff";
    if (stats?.field) {
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(-9, -11);
      ctx.lineTo(-9, 11);
      ctx.closePath();
      ctx.fill();
    }
    if (path1 >= 2) {
      ctx.fillStyle = ghost ? "rgba(187, 232, 255, 0.8)" : "#bce9ff";
      ctx.fillRect(-10, -2, 7, 4);
    }
    if (path1 >= 4) {
      ctx.strokeStyle = ghost ? "rgba(216, 248, 255, 0.85)" : "#d6f8ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-4, -12);
      ctx.lineTo(2, -18);
      ctx.moveTo(-4, 12);
      ctx.lineTo(2, 18);
      ctx.stroke();
    }
    ctx.fillStyle = ghost ? "rgba(244, 220, 99, 0.78)" : "#f4dc63";
    ctx.fillRect(2, -3 - (path2 >= 5 ? 1 : 0), path2 >= 5 ? 15 : 12, path2 >= 5 ? 8 : 6);
    if (path2 >= 5) {
      ctx.beginPath();
      ctx.arc(-1, 0, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === "drone") {
    ctx.strokeStyle = ghost ? (invalid ? "rgba(255, 222, 222, 0.95)" : "rgba(125, 227, 214, 0.55)") : "#7de3d6";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-14, 0);
    ctx.lineTo(14, 0);
    ctx.moveTo(0, -14);
    ctx.lineTo(0, 14);
    ctx.stroke();
    if (path1 >= 1) {
      ctx.strokeStyle = ghost ? "rgba(199, 255, 246, 0.85)" : "#c7fff6";
      ctx.beginPath();
      ctx.moveTo(10, -4);
      ctx.lineTo(16, -4);
      ctx.moveTo(10, 4);
      ctx.lineTo(16, 4);
      ctx.stroke();
    }
    if (path1 >= 3) {
      ctx.fillStyle = ghost ? "rgba(255, 202, 128, 0.8)" : "#ffc47d";
      ctx.fillRect(2, -4, 8, 8);
    }
    if (path2 >= 3) {
      ctx.strokeStyle = ghost ? "rgba(163, 255, 236, 0.7)" : "#a3ffec";
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0.2, Math.PI - 0.2);
      ctx.stroke();
    }
    if (path2 >= 4) {
      ctx.beginPath();
      ctx.moveTo(-2, -10);
      ctx.lineTo(-2, -16);
      ctx.moveTo(-2, 10);
      ctx.lineTo(-2, 16);
      ctx.stroke();
    }
    if (path2 >= 5) {
      ctx.beginPath();
      ctx.moveTo(-8, -3);
      ctx.lineTo(-14, -12);
      ctx.moveTo(-2, -3);
      ctx.lineTo(-6, -14);
      ctx.stroke();
    }
  } else if (type === "support") {
    ctx.fillStyle = ghost ? (invalid ? "rgba(212, 73, 96, 0.85)" : "rgba(201, 182, 255, 0.5)") : "#c9b6ff";
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(10, -4);
    ctx.lineTo(10, 8);
    ctx.lineTo(0, 14);
    ctx.lineTo(-10, 8);
    ctx.lineTo(-10, -4);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = ghost ? "rgba(248, 243, 255, 0.85)" : "#f5f0ff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = ghost ? "rgba(255, 242, 162, 0.8)" : "#ffe47f";
    ctx.fillRect(-2, -8, 4, 16);
    ctx.fillRect(-7, -2, 14, 4);
    if (path1 >= 1) {
      ctx.fillStyle = ghost ? "rgba(255, 219, 122, 0.85)" : "#ffd36a";
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
    if (path2 >= 3) {
      ctx.strokeStyle = ghost ? "rgba(255, 201, 143, 0.9)" : "#ffc58a";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0.45, Math.PI * 1.55);
      ctx.stroke();
    }
    if (path2 >= 4) {
      ctx.strokeStyle = ghost ? "rgba(206, 245, 255, 0.9)" : "#d7f6ff";
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(0, -20);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -22, 3, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  ctx.restore();

  if (!ghost) {
    ctx.fillStyle = "#fffaf2";
    ctx.font = "bold 12px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(level), centerX, centerY + 16);
  }
}

function drawTowerGhost(x, y) {
  const center = towerPlacementCenter(selectedTowerType, x, y);
  const previewTower = mockTower(selectedTowerType, { x, y, centerX: center.x, centerY: center.y });
  const valid = canPlaceTowerAt(x, y);
  const shake = !valid ? Math.sin(lastTimestamp / 18) * (invalidPlacementTimer > 0 ? 4 : 2) : 0;
  const footprint = towerPlacementCells(selectedTowerType, x, y);

  ctx.save();
  ctx.translate(shake, 0);
  drawTowerRangeOverlay(previewTower, {
    primaryStroke: valid ? "rgba(18,26,35,0.42)" : "rgba(204, 63, 92, 0.72)",
    primaryFill: valid ? "rgba(18,26,35,0.1)" : "rgba(204, 63, 92, 0.1)"
  });
  for (const cell of footprint) {
    if (!inBounds(cell.x, cell.y)) {
      continue;
    }
    ctx.fillStyle = valid ? "rgba(255, 250, 240, 0.12)" : "rgba(204, 63, 92, 0.25)";
    ctx.fillRect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
  ctx.shadowColor = valid ? "rgba(21, 30, 42, 0.22)" : "rgba(212, 73, 96, 0.48)";
  ctx.shadowBlur = 14;
  drawTowerShape(selectedTowerType, 1, center.x, center.y, selectedTowerType === "gate" ? selectedGateRotation * (Math.PI / 2) : -Math.PI / 2, true, !valid);
  ctx.restore();
}

function drawTower(tower) {
  const centerX = tower.centerX;
  const centerY = tower.centerY;
  const stats = towerStats(tower);

  if (tower.type === "gate") {
    ctx.save();
    ctx.strokeStyle = "rgba(171, 236, 121, 0.32)";
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - CELL_SIZE * 0.44, centerY - CELL_SIZE * 0.5, CELL_SIZE * 0.88, CELL_SIZE);
    ctx.restore();
  }

  if (tower.type === "tesla" && stats.field) {
    ctx.save();
    ctx.strokeStyle = "rgba(126, 226, 255, 0.34)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, stats.range * 0.84, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  if (tower.type === "freezer" && stats.aura) {
    ctx.save();
    ctx.strokeStyle = "rgba(196, 243, 255, 0.28)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, stats.auraRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  if (tower.type === "support") {
    ctx.save();
    ctx.strokeStyle = stats.munitions ? "rgba(255, 205, 140, 0.32)" : "rgba(219, 201, 255, 0.28)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, stats.auraRadius, 0, Math.PI * 2);
    ctx.stroke();
    if (stats.detectHiddenAura) {
      ctx.strokeStyle = "rgba(209, 246, 255, 0.34)";
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, stats.auraRadius - 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();
  }

  drawTowerShape(tower.type, tower.level, centerX, centerY, tower.aimAngle || 0, false, false, tower);

  if (selectedTowerId === tower.id) {
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawTowers() {
  for (const tower of towers) {
    drawTower(tower);
  }
}

function drawDrones() {
  for (const drone of drones) {
    ctx.fillStyle = drone.support ? "#9cf0e0" : "#7de3d6";
    ctx.beginPath();
    ctx.arc(drone.x, drone.y, drone.support ? 5 : 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(13, 66, 74, 0.75)";
    ctx.lineWidth = 2;
    ctx.stroke();

    if (selectedTowerId === drone.towerId) {
      ctx.strokeStyle = "rgba(125, 227, 214, 0.32)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(drone.x, drone.y, drone.range, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

function drawTraps() {
  for (const trap of traps) {
    const hovered = hoverPoint && Math.hypot(hoverPoint.x - trap.centerX, hoverPoint.y - trap.centerY) <= 24;

    if (trap.kind === "spike") {
      ctx.strokeStyle = "#e9f0f6";
      ctx.lineWidth = 2;
      for (let index = 0; index < 6; index += 1) {
        const angle = (-Math.PI / 2) + (Math.PI * 2 * index) / 6;
        const inner = 3;
        const outer = 11;
        ctx.beginPath();
        ctx.moveTo(trap.centerX + Math.cos(angle) * inner, trap.centerY + Math.sin(angle) * inner);
        ctx.lineTo(trap.centerX + Math.cos(angle) * outer, trap.centerY + Math.sin(angle) * outer);
        ctx.stroke();
      }
      ctx.fillStyle = "#8b9aa7";
      ctx.beginPath();
      ctx.arc(trap.centerX, trap.centerY, 4.2, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }

    if (trap.kind === "turret") {
      const target = enemies.find((enemy) => Math.hypot(enemy.x - trap.centerX, enemy.y - trap.centerY) <= trap.range);
      const angle = target ? Math.atan2(target.y - trap.centerY, target.x - trap.centerX) : -Math.PI / 2;
      ctx.save();
      ctx.translate(trap.centerX, trap.centerY);
      ctx.rotate(angle);
      ctx.fillStyle = "#9ce285";
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#eef8df";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#dff7c8";
      ctx.fillRect(1, -1.5, 7, 3);
      if (trap.barrels >= 2) {
        ctx.fillRect(1, -4, 6, 2.5);
        ctx.fillRect(1, 1.5, 6, 2.5);
      }
      ctx.restore();
      if (hovered) {
        drawTrapLifetimeBar(trap);
      }
      continue;
    }

    if (trap.kind === "mine") {
      ctx.fillStyle = trap.mango ? "#ffb347" : "#ffd067";
      ctx.beginPath();
      ctx.arc(trap.centerX, trap.centerY, 6, 0, Math.PI * 2);
      ctx.fill();
      const spikeCount = Math.max(1, trap.usesRemaining);
      ctx.strokeStyle = "#fff2c4";
      ctx.lineWidth = 1.4;
      for (let index = 0; index < spikeCount; index += 1) {
        const angle = (-Math.PI / 2) + (Math.PI * 2 * index) / spikeCount;
        const inner = 6.5;
        const outer = 10.5;
        ctx.beginPath();
        ctx.moveTo(trap.centerX + Math.cos(angle) * inner, trap.centerY + Math.sin(angle) * inner);
        ctx.lineTo(trap.centerX + Math.cos(angle) * outer, trap.centerY + Math.sin(angle) * outer);
        ctx.stroke();
      }
      ctx.strokeStyle = "#fff2c4";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(trap.centerX, trap.centerY, 8.5, 0, Math.PI * 2);
      ctx.stroke();
      if (trap.mango) {
        ctx.fillStyle = "#8bc34a";
        ctx.beginPath();
        ctx.moveTo(trap.centerX, trap.centerY - 8);
        ctx.lineTo(trap.centerX + 3, trap.centerY - 12);
        ctx.lineTo(trap.centerX - 2, trap.centerY - 11);
        ctx.closePath();
        ctx.fill();
      }
      if (hovered) {
        drawTrapLifetimeBar(trap);
      }
      continue;
    }

    ctx.strokeStyle = "#9ce285";
    ctx.lineWidth = 1.5;
    const spikeCount = Math.max(1, trap.usesRemaining);
    for (let index = 0; index < spikeCount; index += 1) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * index) / spikeCount;
      const inner = 2;
      const outer = 7;
      ctx.beginPath();
      ctx.moveTo(trap.centerX + Math.cos(angle) * inner, trap.centerY + Math.sin(angle) * inner);
      ctx.lineTo(trap.centerX + Math.cos(angle) * outer, trap.centerY + Math.sin(angle) * outer);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(trap.centerX, trap.centerY, 2, 0, Math.PI * 2);
    ctx.stroke();
    if (trap.slow < 1) {
      ctx.strokeStyle = "#d7ffd2";
      ctx.beginPath();
      ctx.arc(trap.centerX, trap.centerY, 8, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (hovered) {
      drawTrapLifetimeBar(trap);
    }
  }
}

function drawTrapLifetimeBar(trap) {
  const width = 22;
  const height = 4;
  const ratio = Math.max(0, Math.min(1, trap.ttl / Math.max(trap.maxTtl || 1, 1)));
  const left = trap.centerX - width / 2;
  const top = trap.centerY - 16;

  ctx.fillStyle = "rgba(18, 26, 35, 0.55)";
  ctx.fillRect(left, top, width, height);
  ctx.fillStyle = trap.kind === "mine" ? "#ffd067" : "#9ce285";
  ctx.fillRect(left, top, width * ratio, height);
  ctx.strokeStyle = "rgba(255, 249, 240, 0.9)";
  ctx.lineWidth = 1;
  ctx.strokeRect(left, top, width, height);
}

function regularPolygon(x, y, radius, sides) {
  ctx.beginPath();
  for (let index = 0; index < sides; index += 1) {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / sides;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    if (index === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.closePath();
}

function drawEnemies() {
  for (const enemy of enemies) {
    drawEnemyShape(enemy);
    drawDamageLagBar(enemy.x - 12, enemy.y - 18, 24, 4, Math.max(enemy.hp, 0) / enemy.maxHp, Math.max(enemy.healthBarLagHp || enemy.hp, 0) / enemy.maxHp, "#d94f3d");
  }
}

function drawDamageLagBar(x, y, width, height, ratio, lagRatio, fillColor = "#d94f3d") {
  ctx.fillStyle = "rgba(38, 50, 56, 0.24)";
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, width * Math.max(0, Math.min(1, ratio)), height);
  if (lagRatio > ratio) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillRect(x + width * ratio, y, width * Math.max(0, Math.min(1, lagRatio - ratio)), height);
  }
}

function drawEnemyShape(enemy) {
  if (enemy.key === "idaen") {
    drawIdaenEnemy(enemy);
    return;
  }

  if (enemy.key === "adapter") {
    drawAdapterEnemy(enemy);
    return;
  }

  if (enemy.waffleSquares) {
    drawWaffleEnemy(enemy);
    return;
  }

  if (enemy.key === "attacker") {
    drawAttackerEnemy(enemy);
    return;
  }

  const radius = (enemy.shapeSides >= 6 ? 12 : 10.5) * (enemy.sizeScale || 1);
  const rotation = (enemy.facingAngle || 0) + (enemy.shapeSides === 3 ? 0 : Math.PI / enemy.shapeSides);

  ctx.fillStyle = enemy.color;
  ctx.beginPath();

  for (let index = 0; index < enemy.shapeSides; index += 1) {
    const angle = rotation + (Math.PI * 2 * index) / enemy.shapeSides;
    const px = enemy.x + Math.cos(angle) * radius;
    const py = enemy.y + Math.sin(angle) * radius;

    if (index === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }

  ctx.closePath();
  ctx.fill();

  if (enemy.key === "diamond") {
    ctx.fillStyle = enemy.coreColor || "#e8fbff";
    ctx.beginPath();
    const coreRadius = 5 + ((enemy.tier || 1) - 1) * 1.5;
    ctx.moveTo(enemy.x, enemy.y - coreRadius);
    ctx.lineTo(enemy.x + coreRadius, enemy.y);
    ctx.lineTo(enemy.x, enemy.y + coreRadius);
    ctx.lineTo(enemy.x - coreRadius, enemy.y);
    ctx.closePath();
    ctx.fill();
    if ((enemy.tier || 1) >= 2) {
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = enemy.tier >= 3 ? 2.4 : 1.6;
      ctx.beginPath();
      ctx.moveTo(enemy.x, enemy.y - radius - 2);
      ctx.lineTo(enemy.x + radius + 2, enemy.y);
      ctx.lineTo(enemy.x, enemy.y + radius + 2);
      ctx.lineTo(enemy.x - radius - 2, enemy.y);
      ctx.closePath();
      ctx.stroke();
    }
  }

  if (enemy.shielded || enemy.key === "shield") {
    const coreRadius = 4.5 + ((enemy.tier || 1) - 1) * 1.8;
    ctx.fillStyle = enemy.coreColor || "#f4f8ff";
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, coreRadius, 0, Math.PI * 2);
    ctx.fill();
    if ((enemy.shieldHp || 0) > 0) {
      const shieldRatio = Math.max(0, Math.min(1, enemy.shieldHp / Math.max(enemy.maxShieldHp || 1, 1)));
      const outerRadius = enemy.shieldRadius || radius + 10;
      ctx.strokeStyle = `rgba(156, 222, 255, ${0.4 + shieldRatio * 0.45})`;
      ctx.lineWidth = 2 + ((enemy.tier || 1) - 1) * 0.5;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, outerRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([8, 6]);
      ctx.lineDashOffset = -(lastTimestamp / 20);
      ctx.strokeStyle = "rgba(220, 244, 255, 0.85)";
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, Math.max(coreRadius + 5, outerRadius - 6), 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(180, 230, 255, ${0.08 + shieldRatio * 0.08})`;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, outerRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if ((enemy.tier || 1) >= 2 && enemy.key !== "diamond" && enemy.key !== "shield" && !enemy.waffleSquares) {
    ctx.strokeStyle = enemy.tier >= 3 ? "rgba(255, 244, 189, 0.9)" : "rgba(255,255,255,0.8)";
    ctx.lineWidth = enemy.tier >= 3 ? 2.6 : 1.6;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, radius + (enemy.tier >= 3 ? 3 : 1.5), 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = enemy.tier >= 3 ? "rgba(255, 241, 176, 0.8)" : "rgba(255,255,255,0.72)";
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.tier >= 3 ? 4.2 : 2.8, 0, Math.PI * 2);
    ctx.fill();
  }

  if (enemy.armored && enemy.armorHp > 0 && !enemy.suppressArmorVisual) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, radius + 4, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (enemy.hidden) {
    ctx.strokeStyle = enemy.shielded ? "rgba(120, 196, 255, 0.9)" : "rgba(214, 233, 255, 0.85)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

}

function drawAttackerEnemy(enemy) {
  const scale = enemy.sizeScale || 1;
  const bodyLength = (enemy.tier >= 3 ? 20 : enemy.tier === 2 ? 16 : 13) * scale;
  const bodyWidth = (enemy.tier >= 3 ? 7.5 : enemy.tier === 2 ? 6.5 : 5.5) * scale;
  const wingLength = bodyLength * 0.7;
  const wingSpread = bodyLength * 0.48;
  const outlineColor = enemy.shielded ? "rgba(120, 196, 255, 0.9)" : "rgba(214, 233, 255, 0.85)";

  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.rotate(enemy.facingAngle || 0);
  ctx.lineCap = "round";

  ctx.strokeStyle = enemy.color;
  ctx.lineWidth = bodyWidth;
  ctx.beginPath();
  ctx.moveTo(bodyLength * 0.56, 0);
  ctx.lineTo(-bodyLength * 0.56, 0);
  ctx.stroke();

  ctx.lineWidth = Math.max(2.8, bodyWidth * 0.5);
  ctx.beginPath();
  ctx.moveTo(-bodyLength * 0.14, 0);
  ctx.lineTo(-wingLength, -wingSpread);
  ctx.moveTo(-bodyLength * 0.14, 0);
  ctx.lineTo(-wingLength, wingSpread);
  if (enemy.tier >= 2) {
    ctx.moveTo(-bodyLength * 0.36, 0);
    ctx.lineTo(-bodyLength * 0.94, -wingSpread * 0.54);
    ctx.moveTo(-bodyLength * 0.36, 0);
    ctx.lineTo(-bodyLength * 0.94, wingSpread * 0.54);
  }
  ctx.stroke();

  if (enemy.hidden) {
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = bodyWidth + 3;
    ctx.beginPath();
    ctx.moveTo(bodyLength * 0.56, 0);
    ctx.lineTo(-bodyLength * 0.56, 0);
    ctx.stroke();
    ctx.lineWidth = Math.max(4, bodyWidth * 0.56);
    ctx.beginPath();
    ctx.moveTo(-bodyLength * 0.14, 0);
    ctx.lineTo(-wingLength, -wingSpread);
    ctx.moveTo(-bodyLength * 0.14, 0);
    ctx.lineTo(-wingLength, wingSpread);
    if (enemy.tier >= 2) {
      ctx.moveTo(-bodyLength * 0.36, 0);
      ctx.lineTo(-bodyLength * 0.94, -wingSpread * 0.54);
      ctx.moveTo(-bodyLength * 0.36, 0);
      ctx.lineTo(-bodyLength * 0.94, wingSpread * 0.54);
    }
    ctx.stroke();
  }

  if (enemy.shielded && enemy.shieldHp > 0) {
    const outerRadius = enemy.shieldRadius || bodyLength + 10;
    const shieldRatio = Math.max(0, Math.min(1, enemy.shieldHp / Math.max(enemy.maxShieldHp || 1, 1)));
    ctx.strokeStyle = `rgba(156, 222, 255, ${0.4 + shieldRatio * 0.45})`;
    ctx.lineWidth = 2 + ((enemy.tier || 1) - 1) * 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([8, 6]);
    ctx.lineDashOffset = -(lastTimestamp / 20);
    ctx.strokeStyle = "rgba(220, 244, 255, 0.85)";
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(bodyLength * 0.55, outerRadius - 6), 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = `rgba(180, 230, 255, ${0.08 + shieldRatio * 0.08})`;
    ctx.beginPath();
    ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawWaffleEnemy(enemy) {
  const gridSize = Math.max(1, Math.round(Math.sqrt(enemy.waffleSquares || 1)));
  const cellSize = 6;
  const gap = 1.5;
  const totalSize = gridSize * cellSize + (gridSize - 1) * gap;
  const left = -totalSize / 2;
  const top = -totalSize / 2;

  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.rotate(enemy.facingAngle || 0);
  ctx.fillStyle = enemy.color;
  ctx.strokeStyle = "rgba(111, 68, 18, 0.55)";
  ctx.lineWidth = 1;

  for (let row = 0; row < gridSize; row += 1) {
    for (let col = 0; col < gridSize; col += 1) {
      const x = left + col * (cellSize + gap);
      const y = top + row * (cellSize + gap);
      ctx.fillRect(x, y, cellSize, cellSize);
      ctx.strokeRect(x, y, cellSize, cellSize);
    }
  }

  if (enemy.hidden) {
    ctx.strokeStyle = enemy.shielded ? "rgba(120, 196, 255, 0.9)" : "rgba(214, 233, 255, 0.85)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(left - 2, top - 2, totalSize + 4, totalSize + 4);
  }

  if (enemy.armored && enemy.armorHp > 0 && !enemy.suppressArmorVisual) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
    ctx.lineWidth = 4;
    ctx.strokeRect(left - 4, top - 4, totalSize + 8, totalSize + 8);
  }

  if (enemy.shielded && enemy.shieldHp > 0) {
    const shieldRadius = enemy.shieldRadius || totalSize * 0.72 + 10;
    const shieldAlpha = 0.18 + 0.22 * Math.min(1, enemy.shieldHp / Math.max(enemy.maxShieldHp || enemy.shieldHp || 1, 1));
    ctx.fillStyle = `rgba(170, 221, 255, ${shieldAlpha})`;
    ctx.beginPath();
    ctx.arc(0, 0, shieldRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(150, 215, 255, 0.95)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, shieldRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(232, 248, 255, 0.85)";
    ctx.lineWidth = 1.8;
    ctx.setLineDash([7, 5]);
    ctx.beginPath();
    ctx.arc(0, 0, shieldRadius - 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  ctx.restore();
}

function drawBurningEnemyEffect(enemy) {
  if (!(enemy.burnTimer > 0)) {
    return;
  }

  const radius = enemy.waffleSquares ? 14 : enemy.key === "idaen" ? 22 : 12;
  ctx.save();
  ctx.globalAlpha = Math.min(0.85, 0.25 + enemy.burnTimer * 0.12);
  ctx.strokeStyle = "#ffb45f";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(enemy.x, enemy.y, radius + Math.sin(lastTimestamp / 85 + enemy.id) * 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#ffd07d";
  for (let index = 0; index < 3; index += 1) {
    const angle = lastTimestamp / 220 + enemy.id + index * 2.1;
    const sparkX = enemy.x + Math.cos(angle) * (radius - 2);
    const sparkY = enemy.y + Math.sin(angle) * (radius - 2);
    ctx.beginPath();
    ctx.arc(sparkX, sparkY, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawIdaenEnemy(enemy) {
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.rotate(enemy.facingAngle || 0);
  const gridSize = 8;
  const tile = 6;
  const totalSize = gridSize * tile;
  ctx.fillStyle = enemy.phaseTimer > 0 ? "#8a5b2d" : "#8d5f2e";
  ctx.strokeStyle = "rgba(83, 49, 18, 0.75)";
  ctx.lineWidth = 2;
  ctx.fillRect(-totalSize / 2, -totalSize / 2, totalSize, totalSize);
  ctx.strokeRect(-totalSize / 2, -totalSize / 2, totalSize, totalSize);
  ctx.fillStyle = "#ba8748";
  for (let row = 0; row < gridSize; row += 1) {
    for (let col = 0; col < gridSize; col += 1) {
      ctx.fillRect(-totalSize / 2 + col * tile + 1, -totalSize / 2 + row * tile + 1, tile - 2, tile - 2);
    }
  }
  ctx.fillStyle = "#6b4120";
  ctx.fillRect(-totalSize / 2 - 8, -5, 8, 10);
  ctx.fillRect(totalSize / 2, -5, 8, 10);
  if (enemy.hidden) {
    ctx.strokeStyle = enemy.shielded ? "rgba(120, 196, 255, 0.9)" : "rgba(214, 233, 255, 0.85)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-totalSize / 2 - 4, -totalSize / 2 - 4, totalSize + 8, totalSize + 8);
  }
  if (enemy.armored && enemy.armorHp > 0 && !enemy.suppressArmorVisual) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
    ctx.lineWidth = 4;
    ctx.strokeRect(-totalSize / 2 - 6, -totalSize / 2 - 6, totalSize + 12, totalSize + 12);
  }
  ctx.restore();
}

function drawAdapterEnemy(enemy) {
  drawAttackerEnemy(enemy);
  const bodyLength = 26 * (enemy.sizeScale || 1);
  const wingSpread = bodyLength * 0.52;
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.rotate(enemy.facingAngle || 0);
  ctx.strokeStyle = "rgba(248, 236, 255, 0.88)";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(bodyLength * 0.2, -wingSpread * 0.45);
  ctx.lineTo(bodyLength * 0.74, 0);
  ctx.lineTo(bodyLength * 0.2, wingSpread * 0.45);
  ctx.stroke();
  const guardCount = Object.values(enemy.adapterGuards || {}).filter(Boolean).length;
  ctx.fillStyle = guardCount > 0 ? "rgba(255, 225, 173, 0.7)" : "rgba(231, 216, 255, 0.72)";
  ctx.beginPath();
  ctx.arc(0, 0, 6.5, 0, Math.PI * 2);
  ctx.fill();
  if (guardCount > 0) {
    ctx.strokeStyle = "rgba(255, 213, 124, 0.95)";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.arc(0, 0, bodyLength * 0.72, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBossBar() {
  const boss = activeBossEnemy();

  if (!boss) {
    return;
  }

  const biscuitsAlive = enemies.some((enemy) => enemy.bossShieldMinion && enemy.bossOwnerId === boss.id && enemy.hp > 0);
  const ratio = Math.max(0, Math.min(1, boss.hp / Math.max(boss.maxHp, 1)));
  const lagRatio = Math.max(0, Math.min(1, (boss.healthBarLagHp || boss.hp) / Math.max(boss.maxHp, 1)));
  const left = 140;
  const width = canvas.width - 280;
  const top = 12;

  drawDamageLagBar(left, top, width, 18, ratio, lagRatio, boss.phaseTimer > 0 || biscuitsAlive ? "#8a5b2d" : "#d94f3d");
  ctx.strokeStyle = "rgba(255, 249, 240, 0.95)";
  ctx.lineWidth = 2;
  ctx.strokeRect(left, top, width, 18);
  ctx.fillStyle = "#fffaf2";
  ctx.font = "bold 14px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const bossName = boss.key === "adapter" ? "Adapter" : "I-daen";
  const bossState = boss.key === "adapter"
    ? (Object.values(boss.adapterGuards || {}).some(Boolean) ? " - Adaptive Guard" : "")
    : (boss.phaseTimer > 0 || biscuitsAlive ? " - Shielded" : "");
  ctx.fillText(`${bossName}${bossState}`, left + width / 2, top + 9);
}

function drawProjectiles() {
  for (const projectile of projectiles) {
    if (projectile.kind === "droneRocket") {
      ctx.save();
      ctx.translate(projectile.x, projectile.y);
      ctx.rotate(projectile.angle || 0);
      ctx.fillStyle = "#ffa560";
      ctx.beginPath();
      ctx.moveTo(7, 0);
      ctx.lineTo(-6, -4);
      ctx.lineTo(-6, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      continue;
    }

    if (projectile.kind === "droneBullet") {
      ctx.fillStyle = "#fff3b7";
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, 2.8, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }

    if (projectile.kind === "crossbowBolt") {
      ctx.save();
      ctx.translate(projectile.x, projectile.y);
      ctx.rotate(projectile.angle || 0);
      ctx.strokeStyle = "#c6935b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-7, 0);
      ctx.lineTo(7, 0);
      ctx.stroke();
      ctx.restore();
      continue;
    }

    if (projectile.kind === "shotgunPellet") {
      ctx.save();
      ctx.translate(projectile.x, projectile.y);
      ctx.rotate(projectile.angle || 0);
      ctx.strokeStyle = "#ffe177";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-4, 0);
      ctx.lineTo(4, 0);
      ctx.stroke();
      ctx.restore();
      continue;
    }

    if (projectile.kind === "trapTurretBullet") {
      ctx.fillStyle = "#d8f8c2";
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, 3, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }

    if (projectile.kind === "frostBolt") {
      ctx.fillStyle = "#c8f6ff";
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      continue;
    }

    if (projectile.kind === "dippyEgg") {
      if (projectile.hiddenOffscreen) {
        continue;
      }
      const size = projectile.projectileSize || 10;
      ctx.save();
      ctx.translate(projectile.x, projectile.y);
      ctx.rotate(projectile.roll || 0);
      if (projectile.falling) {
        ctx.strokeStyle = "rgba(255, 228, 153, 0.38)";
        ctx.lineWidth = Math.max(2, size * 0.18);
        ctx.beginPath();
        ctx.moveTo(0, -size * 2.2);
        ctx.lineTo(0, size * 0.2);
        ctx.stroke();
      }
      if ((projectile.projectileSize || 10) > 10) {
        ctx.fillStyle = "#fffdf7";
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size * 0.76, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = projectile.yolkColor || "#ffce54";
        ctx.beginPath();
        ctx.arc(size * 0.12, 0, size * 0.34, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = "#fff0d1";
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.82, size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#c9964b";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      ctx.restore();
      continue;
    }

    if (projectile.kind === "dippyShell") {
      ctx.fillStyle = "#fff8da";
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, 3, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }

    if (projectile.kind === "missile") {
      ctx.save();
      ctx.translate(projectile.x, projectile.y);
      ctx.rotate(projectile.angle || 0);
      ctx.fillStyle = "#ffb366";
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(-7, -5);
      ctx.lineTo(-7, 5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      continue;
    }

    if (projectile.kind === "mangoBomb") {
      ctx.save();
      const angle = projectile.angle || Math.PI / 2;
      ctx.strokeStyle = "rgba(255, 190, 78, 0.9)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(projectile.x, projectile.y);
      ctx.lineTo(projectile.x - Math.cos(angle) * 18, projectile.y - Math.sin(angle) * 18);
      ctx.stroke();
      ctx.strokeStyle = "rgba(112, 112, 112, 0.45)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(projectile.x - Math.cos(angle) * 10, projectile.y - Math.sin(angle) * 10);
      ctx.lineTo(projectile.x - Math.cos(angle) * 26, projectile.y - Math.sin(angle) * 26);
      ctx.stroke();
      ctx.fillStyle = "#ffd34d";
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff1a8";
      ctx.beginPath();
      ctx.arc(projectile.x - 1.5, projectile.y - 1.5, 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      continue;
    }

    ctx.fillStyle = "#ffe6a5";
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawEffects() {
  for (const effect of effects) {
    if (effect.kind === "beam") {
      ctx.strokeStyle = effect.color;
      ctx.lineWidth = effect.width || 3;
      ctx.globalAlpha = effect.ttl / Math.max(effect.maxTtl || 0.12, 0.01);
      ctx.beginPath();
      ctx.moveTo(effect.x1, effect.y1);
      ctx.lineTo(effect.x2, effect.y2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      continue;
    }

    if (effect.kind === "floatingText") {
      const alpha = effect.ttl / Math.max(effect.maxTtl || 1, 0.01);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = effect.color;
      ctx.font = "bold 16px Georgia";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(effect.text, effect.x, effect.y);
      ctx.globalAlpha = 1;
      continue;
    }

    if (effect.kind === "puddle") {
      ctx.fillStyle = effect.color;
      ctx.globalAlpha = Math.max(0.2, effect.ttl / Math.max(effect.maxTtl || 1, 1));
      ctx.beginPath();
      if (effect.circular) {
        ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
      } else {
        ctx.ellipse(effect.x, effect.y, effect.radius, effect.radius * 0.66, 0, 0, Math.PI * 2);
      }
      ctx.fill();
      if (effect.damage > 0) {
        ctx.strokeStyle = effect.poisonDamage > 0 ? "rgba(154, 233, 94, 0.78)" : "rgba(255, 129, 41, 0.72)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      continue;
    }

    if (effect.kind === "spark") {
      const alpha = effect.ttl / Math.max(effect.maxTtl || 0.2, 0.01);
      ctx.fillStyle = effect.color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      continue;
    }

    if (effect.kind === "constructLaunch") {
      const progress = 1 - effect.ttl / Math.max(effect.maxTtl || 0.18, 0.01);
      const headX = effect.x1 + (effect.x2 - effect.x1) * progress;
      const headY = effect.y1 + (effect.y2 - effect.y1) * progress;
      ctx.strokeStyle = effect.color;
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.75;
      ctx.beginPath();
      ctx.moveTo(effect.x1, effect.y1);
      ctx.lineTo(headX, headY);
      ctx.stroke();
      ctx.fillStyle = effect.color;
      ctx.beginPath();
      ctx.arc(headX, headY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      continue;
    }

    ctx.strokeStyle = effect.color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = effect.ttl / 0.18;
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, effect.radius * (1 - effect.ttl / 0.18 * 0.3), 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function drawEndpoint(point, fill) {
  const center = cellCenter(point.x, point.y);
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(center.x, center.y, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#fff9f1";
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  drawMapScenery();
  drawGrid();
  drawRoute();

  for (const block of blocks.values()) {
    drawBlock(block);
  }

  drawTraps();
  drawSelectedTowerRange();
  drawPreview();
  drawArmedAbilityPreview();
  drawTowers();
  drawDrones();
  drawProjectiles();
  drawEffects();
  drawEnemies();
  drawBossBar();
  if (!activeMap.hidePortals) {
    for (const portal of activePortals()) {
      drawEndpoint(portal, "#1f8a70");
    }
  }
  drawEndpoint(goalPortal(), "#cc3f5c");
  ctx.restore();
}

function factoryArrowDirectionForCell(cell) {
  for (const path of routes) {
    const index = path.findIndex((entry) => entry.x === cell.x && entry.y === cell.y);
    if (index === -1) {
      continue;
    }
    const next = path[index + 1];
    const previous = path[index - 1];
    if (next) {
      return Math.atan2(next.y - cell.y, next.x - cell.x);
    }
    if (previous) {
      return Math.atan2(cell.y - previous.y, cell.x - previous.x);
    }
  }

  for (const direction of factoryTravelDirections()) {
    const nextX = cell.x + direction.dx;
    const nextY = cell.y + direction.dy;
    if (inBounds(nextX, nextY) && grid[nextY][nextX].blockId !== null) {
      return Math.atan2(direction.dy, direction.dx);
    }
  }

  return null;
}

function drawSelectedTowerRange() {
  const tower = towers.find((entry) => entry.id === selectedTowerId);

  if (!tower) {
    return;
  }

  drawTowerRangeOverlay(tower);
}

function drawTowerRangeOverlay(tower, colors = {}) {
  const stats = towerStats(tower);
  ctx.save();
  ctx.strokeStyle = colors.primaryStroke || "rgba(18,26,35,0.55)";
  ctx.fillStyle = colors.primaryFill || "rgba(18,26,35,0.14)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(tower.centerX, tower.centerY, stats.range, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  if (tower.type === "dippy" && stats.minRange > 0) {
    ctx.strokeStyle = "rgba(214, 55, 55, 0.9)";
    ctx.fillStyle = "rgba(214, 55, 55, 0.08)";
    ctx.beginPath();
    ctx.arc(tower.centerX, tower.centerY, stats.minRange, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  if (tower.type === "tesla" && stats.field) {
    ctx.strokeStyle = "rgba(126, 226, 255, 0.78)";
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.arc(tower.centerX, tower.centerY, stats.range * 0.84, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  if (tower.type === "freezer" && stats.aura) {
    ctx.strokeStyle = "rgba(196, 243, 255, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(tower.centerX, tower.centerY, stats.auraRadius, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (tower.type === "support") {
    ctx.strokeStyle = stats.munitions ? "rgba(255, 205, 140, 0.5)" : "rgba(219, 201, 255, 0.48)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(tower.centerX, tower.centerY, stats.auraRadius, 0, Math.PI * 2);
    ctx.stroke();
    if (stats.detectHiddenAura) {
      ctx.strokeStyle = "rgba(209, 246, 255, 0.52)";
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.arc(tower.centerX, tower.centerY, stats.auraRadius - 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
  ctx.restore();
}

function resetGame() {
  activeMap = MAPS[selectedMap];
  applyMapViewport();
  grid = createGrid();
  blocks = new Map();
  towers = [];
  drones = [];
  traps = [];
  enemies = [];
  projectiles = [];
  effects = [];
  ambientParticles = [];
  ambientTimer = 0;
  wave = null;
  hoverCell = null;
  activePiece = createRandomPiece(selectedMap);
  money = startingMoney();
  freeBlocks = isFactoryMap() ? 5 : 1;
  currentBlockCost = BLOCK_COST;
  lives = DIFFICULTIES[selectedDifficulty].lives;
  waveNumber = 0;
  nextBlockId = 1;
  nextTowerId = 1;
  nextEnemyId = 1;
  nextProjectileId = 1;
  nextEffectId = 1;
  nextTrapId = 1;
  selectedTowerId = null;
  invalidPlacementTimer = 0;
  infiniteMode = selectedDifficulty === "sandbox";
  cheatBuffer = [];
  outpostWalllessQuestFailed = false;
  autoWaveTimer = 0;
  armedAbility = null;
  scrollVelocityX = 0;
  scrollVelocityY = 0;
  selectedGateRotation = 0;
  introducedEnemyKeys.clear();
  shownWaveWarnings.clear();
  shownTutorialPopups.clear();
  tutorialPopupQueue = [];
  activeTutorialPopup = null;
  tutorialResumeMode = null;
  tutorialDismissed = false;
  tutorialStepDelayTimer = 0;
  tutorialOverlay?.classList.remove("active");
  tutorialProgress.scrolled = false;
  tutorialProgress.placedBlock = false;
  tutorialProgress.placedTower = false;
  tutorialProgress.upgradedTower = false;
  resetSpawnPortalOrder();
seedMapFeatures();
routes = computeRoutes();
closeTowerPopup();
  setMessage("Board reset.", 1.0);
  renderTutorial();
  updateHud();
  draw();
}

function updateGame(deltaTime) {
  dashOffset = (dashOffset + deltaTime * 18) % DASH_PERIOD;
  messageTimer = Math.max(0, messageTimer - deltaTime);
  invalidPlacementTimer = Math.max(0, invalidPlacementTimer - deltaTime);
  tutorialStepDelayTimer = Math.max(0, tutorialStepDelayTimer - deltaTime);
  updateSmoothBoardScroll(deltaTime);
  presentQueuedTutorialPopup();

  if (infiniteMode) {
    money = 999999;
    lives = 999999;
  }

  if (lives <= 0) {
    if (gameMode !== "gameover") {
      showGameOver();
    }
    updateHud();
    return;
  }

  updateWave(deltaTime);
  updateAmbientEffects(deltaTime);
  updateEnemies(deltaTime);
  updateTowers(deltaTime);
  updateTraps(deltaTime);
  updateDrones(deltaTime);
  updateProjectiles(deltaTime);
  updateEffects(deltaTime);
  purgeDefeatedEnemies();
  if (autoWaveEnabled && allRoutesOpen(routes) && (!wave || wave.complete)) {
    autoWaveTimer = Math.max(0, autoWaveTimer - deltaTime);
    if (autoWaveTimer === 0) {
      spawnWave();
    }
  }
  updateHud();
}

function animationFrame(timestamp) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  const deltaTime = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
  lastTimestamp = timestamp;

  if (gameMode === "playing") {
    updateGame(deltaTime);
  }
  draw();
  requestAnimationFrame(animationFrame);
}

function pointerToCell(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: Math.floor(((event.clientX - rect.left) * scaleX) / CELL_SIZE),
    y: Math.floor(((event.clientY - rect.top) * scaleY) / CELL_SIZE)
  };
}

function pointerToCanvas(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
}

function useAirstrikeAt(point) {
  const tower = preferredAirstrikeTower();
  if (!tower) {
    armedAbility = null;
    setMessage("No mango airstrike is ready.", 1.4);
    updateHud();
    return false;
  }

  if (!towerHasLineOfSightToPoint(tower, point.x, point.y)) {
    setMessage("Airstrike target blocked by terrain.", 1.4);
    updateHud();
    return false;
  }

  const stats = towerStats(tower);
  launchSupportAirstrike(tower, point, stats);
  tower.fieldCooldown = stats.airstrikeCooldown;
  armedAbility = null;
  setMessage("Mango airstrike called in.", 1.2);
  updateHud();
  return true;
}

function panelDockFor(panelName) {
  return panelName === "board" ? boardPanelDock : sidePanelDock;
}

function createRestoreButton(panelName, label) {
  const button = document.createElement("button");
  button.className = "dock-button";
  button.type = "button";
  button.dataset.restorePanel = panelName;
  button.textContent = `Show ${label}`;
  return button;
}

function hidePanel(panelName) {
  const panel = document.querySelector(`[data-panel="${panelName}"]`);

  if (!panel || panel.classList.contains("panel-hidden")) {
    return;
  }

  panel.classList.add("panel-hidden");
  const label = panel.querySelector("h2")?.textContent || panelName;
  panelDockFor(panelName).appendChild(createRestoreButton(panelName, label));
}

function showPanel(panelName) {
  const panel = document.querySelector(`[data-panel="${panelName}"]`);

  if (!panel) {
    return;
  }

  panel.classList.remove("panel-hidden");
  const button = document.querySelector(`[data-restore-panel="${panelName}"]`);

  if (button) {
    button.remove();
  }
}

canvas.addEventListener("click", (event) => {
  if (armedAbility === "airstrike") {
    useAirstrikeAt(pointerToCanvas(event));
    return;
  }
  const cell = pointerToCell(event);
  applyTool(cell.x, cell.y);
});

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  if (armedAbility) {
    armedAbility = null;
    setMessage("Ability targeting cancelled.", 0.9);
    updateHud();
    draw();
    return;
  }
  clearSelection(true);
  setMessage("Selection cleared.", 0.9);
  updateHud();
  draw();
});

canvas.addEventListener("mousemove", (event) => {
  const cell = pointerToCell(event);
  hoverPoint = pointerToCanvas(event);
  hoverCell = inBounds(cell.x, cell.y) ? cell : null;
  draw();
});

canvas.addEventListener("mouseleave", () => {
  hoverPoint = null;
  hoverCell = null;
  draw();
});

toolGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-tool]");

  if (!button) {
    return;
  }

  setTool(button.dataset.tool);
});

document.addEventListener("click", (event) => {
  const popupUpgrade = event.target.closest("[data-upgrade-tower-id]");

  if (popupUpgrade) {
    const tower = towers.find((entry) => entry.id === Number(popupUpgrade.dataset.upgradeTowerId));

    if (!tower) {
      closeTowerPopup();
      return;
    }

    const path = popupUpgrade.dataset.upgradePath ? Number(popupUpgrade.dataset.upgradePath) : null;
    upgradeTower(tower, null, path);
    updateHud();
    draw();
    return;
  }

  const popupPriority = event.target.closest("[data-priority-tower-id]");

  if (popupPriority) {
    const tower = towers.find((entry) => entry.id === Number(popupPriority.dataset.priorityTowerId));

    if (!tower) {
      clearSelection(false);
      return;
    }

    const allowed = availablePrioritiesForTower(tower);
    const currentIndex = allowed.indexOf(tower.targetPriority || "first");
    tower.targetPriority = allowed[(currentIndex + 1) % allowed.length];
    openTowerPopup(tower);
    setMessage(`${TOWER_INFO[tower.type].name} priority set to ${TARGET_LABELS[tower.targetPriority]}.`, 1.1);
    updateHud();
    draw();
    return;
  }

  const popupSell = event.target.closest("[data-sell-tower-id]");

  if (popupSell) {
    const tower = towers.find((entry) => entry.id === Number(popupSell.dataset.sellTowerId));

    if (!tower) {
      clearSelection(false);
      return;
    }

    sellTower(tower);
    updateHud();
    draw();
    return;
  }

  const hideButton = event.target.closest("[data-toggle-panel]");

  if (hideButton) {
    hidePanel(hideButton.dataset.togglePanel);
    return;
  }

  const restoreButton = event.target.closest("[data-restore-panel]");

  if (restoreButton) {
    showPanel(restoreButton.dataset.restorePanel);
  }
});

towerGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-tower-type]");

  if (!button) {
    return;
  }

  setTowerType(button.dataset.towerType);
});

almanacTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-almanac-tab]");

  if (!button) {
    return;
  }

  almanacTab = button.dataset.almanacTab;
  renderAlmanac();
});

almanacGrid.addEventListener("click", (event) => {
  const towerEntry = event.target.closest("[data-almanac-tower]");

  if (!towerEntry) {
    return;
  }

  selectedAlmanacTower = towerEntry.dataset.almanacTower;
  renderAlmanac();
});

difficultyOptions.addEventListener("click", withUiGuard("Difficulty button", (event) => {
  const button = event.target.closest("[data-difficulty]");
  if (!button) {
    return;
  }
  selectedDifficulty = button.dataset.difficulty;
  updateMenuSelectors();
}));

mapOptions.addEventListener("click", withUiGuard("Map button", (event) => {
  const button = event.target.closest("[data-map]");
  if (!button) {
    return;
  }
  selectedMap = button.dataset.map;
  updateMenuSelectors();
}));

rotateButton.addEventListener("click", rotateActivePiece);
waveButton.addEventListener("click", spawnWave);
autoWaveToggle?.addEventListener("change", () => {
  autoWaveEnabled = autoWaveToggle.checked;
  autoWaveTimer = autoWaveEnabled ? 0.45 : 0;
  setMessage(autoWaveEnabled ? "Auto wave enabled." : "Auto wave disabled.", 1.3);
  updateHud();
});
pauseButton.addEventListener("click", pauseGame);
startGameButton.addEventListener("click", withUiGuard("Start Game", startGame));
openAlmanacButton.addEventListener("click", withUiGuard("Open Almanac", () => openAlmanac("menu")));
resumeGameButton.addEventListener("click", withUiGuard("Resume", resumeGame));
pauseAlmanacButton.addEventListener("click", withUiGuard("Pause Almanac", () => openAlmanac("pause")));
quitToMenuButton.addEventListener("click", withUiGuard("Quit To Menu", quitToMenu));
tutorialOverlayButton?.addEventListener("click", withUiGuard("Tutorial Continue", dismissTutorialPopup));
tutorialDismissButton?.addEventListener("click", withUiGuard("Dismiss Tutorial", dismissEntireTutorial));
closeAlmanacButton.addEventListener("click", withUiGuard("Close Almanac", closeAlmanac));
closeTowerPopupButton.addEventListener("click", withUiGuard("Close Tower Popup", closeTowerPopup));
sandboxSetWaveButton?.addEventListener("click", withUiGuard("Sandbox Set Wave", setSandboxWave));
sandboxEnemySelect?.addEventListener("change", withUiGuard("Sandbox Enemy Select", updateSandboxTierOptions));
sandboxSpawnButton?.addEventListener("click", withUiGuard("Sandbox Spawn", spawnSandboxEnemyFromControls));
airstrikeButton?.addEventListener("click", () => {
  if (armedAbility === "airstrike") {
    armedAbility = null;
    updateHud();
    draw();
    return;
  }
  if (!preferredAirstrikeTower()) {
    setMessage("No mango airstrike is ready.", 1.4);
    updateHud();
    return;
  }
  armedAbility = "airstrike";
  setMessage("Click the board to target the mango airstrike.", 1.4);
  updateHud();
  draw();
});
restartGameButton?.addEventListener("click", withUiGuard("Restart Game", startGame));
gameOverMenuButton?.addEventListener("click", withUiGuard("Game Over Menu", quitToMenu));

window.addEventListener("keydown", (event) => {
  if (event.key.startsWith("Arrow")) {
    heldScrollKeys.add(event.key);
    event.preventDefault();
  }

  if (scrollBoardByArrowKey(event.key)) {
    return;
  }

  if (/^[0-9]$/.test(event.key)) {
    cheatBuffer.push(event.key);
    cheatBuffer = cheatBuffer.slice(-3);

    if (cheatBuffer.join(",") === "5,1,2") {
      infiniteMode = !infiniteMode;
      if (infiniteMode) {
        money = 999999;
        lives = 999999;
        setMessage("Infinite money and lives enabled.", 1.8);
      } else {
        setMessage("Infinite money and lives disabled.", 1.8);
      }
      updateHud();
      draw();
    }
  }

  if (event.key.toLowerCase() === "r") {
    event.preventDefault();
    rotateActivePiece();
  }

  if (event.key === "Escape") {
    if (armedAbility) {
      armedAbility = null;
      updateHud();
      draw();
    } else if (gameMode === "playing") {
      pauseGame();
    } else if (gameMode === "paused") {
      resumeGame();
    }
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key.startsWith("Arrow")) {
    heldScrollKeys.delete(event.key);
  }
});

applyMapViewport();
routes = computeRoutes();
populateSandboxEnemyOptions();
renderAlmanac();
updateMenuSelectors();
openOverlay("menu");
updateHud();
draw();
requestAnimationFrame(animationFrame);
