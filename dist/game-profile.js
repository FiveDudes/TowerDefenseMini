(function attachProfileRuntime(globalScope) {
  function getUi() {
    return globalScope.ui || {};
  }

  function getState() {
    return globalScope.state || {};
  }

  function getProfileState() {
    return globalScope.profileState || {};
  }

  function getLoginState() {
    return globalScope.loginState || {};
  }

  function readStorageStringSafe(key, fallback = "") {
    if (typeof globalScope.readStorageString === "function") {
      return globalScope.readStorageString(globalScope.localStorage, key, fallback);
    }
    const value = globalScope.localStorage.getItem(key);
    return typeof value === "string" && value.length > 0 ? value : fallback;
  }

  function readStorageNumberSafe(key, fallback = 0, min = -Infinity, max = Infinity) {
    if (typeof globalScope.readStorageNumber === "function") {
      return globalScope.readStorageNumber(globalScope.localStorage, key, fallback, min, max);
    }
    const numeric = Number(readStorageStringSafe(key, String(fallback)));
    if (!Number.isFinite(numeric)) return fallback;
    return Math.max(min, Math.min(max, numeric));
  }

  function readStorageJsonSafe(key, fallback) {
    if (typeof globalScope.readStorageJson === "function") {
      return globalScope.readStorageJson(globalScope.localStorage, key, fallback);
    }
    try {
      const raw = globalScope.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function sanitizeAppwriteIdSafe(value, fallback = "") {
    if (typeof globalScope.sanitizeAppwriteId === "function") {
      return globalScope.sanitizeAppwriteId(value, fallback);
    }
    const next = String(value || "").trim();
    return /^[A-Za-z0-9][A-Za-z0-9._-]{0,35}$/.test(next) ? next : fallback;
  }

  function getLeaderboardState() {
    return globalScope.leaderboardState || {};
  }

  function getTitleCatalog() {
    return globalScope.titleCatalog || {};
  }

  function setLoginStatus(message) {
    const ui = getUi();
    if (ui.loginStatus) {
      ui.loginStatus.textContent = message;
    }
  }

  function getDefaultProfileName(account) {
    const rawName = String(account?.name || "").trim();
    if (rawName) return rawName;
    const email = String(account?.email || "").trim();
    if (!email) return "Player";
    const localPart = email.split("@")[0] || "";
    const words = localPart
      .replace(/[._-]+/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return words.length > 0 ? words.join(" ") : "Player";
  }

  function getAccountAvatarUrl(account) {
    const candidates = [
      account?.avatar,
      account?.avatarUrl,
      account?.photoURL,
      account?.photoUrl,
      account?.prefs?.avatar,
      account?.prefs?.avatarUrl,
      account?.prefs?.photoURL,
      account?.prefs?.photoUrl,
      account?.prefs?.picture,
      account?.prefs?.profilePicture,
    ];
    return candidates.find((value) => typeof value === "string" && value.trim()) || "";
  }

  function getProfileFallbackAvatar(name) {
    const initials = String(name || "C")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "C";
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0b1b34"/>
            <stop offset="100%" stop-color="#102f57"/>
          </linearGradient>
        </defs>
        <rect width="256" height="256" rx="40" fill="url(#g)"/>
        <circle cx="128" cy="106" r="54" fill="#dff2ff" fill-opacity="0.12"/>
        <text x="128" y="144" text-anchor="middle" font-family="Orbitron, Arial, sans-serif" font-size="72" font-weight="700" fill="#dff2ff">${initials}</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function persistProfileState() {
    const profileState = getProfileState();
    globalScope.localStorage.setItem("tdm_profile_name", profileState.name || "");
    globalScope.localStorage.setItem("tdm_profile_avatar", profileState.avatar || "");
    globalScope.localStorage.setItem("tdm_profile_max_wave", String(profileState.maxWave || 0));
    globalScope.localStorage.setItem("tdm_profile_max_damage", String(profileState.maxDamage || 0));
    globalScope.localStorage.setItem("tdm_profile_most_towers", String(profileState.mostTowers || 0));
    globalScope.localStorage.setItem("tdm_profile_favorite_tower", profileState.favoriteTower || "");
    globalScope.localStorage.setItem("tdm_profile_least_favorite_enemy", profileState.leastFavoriteEnemy || "");
    globalScope.localStorage.setItem("tdm_profile_active_title", profileState.activeTitle || "");
    globalScope.localStorage.setItem("tdm_profile_unlocked_titles", JSON.stringify(profileState.unlockedTitles || []));
  }

  function humanizeIdentifier(value) {
    return String(value || "")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[._-]+/g, " ")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase()) || "None";
  }

  function getTowerDisplayName(type) {
    return (globalScope.TDMData && globalScope.TDMData.towers && globalScope.TDMData.towers[type] && globalScope.TDMData.towers[type].name) || humanizeIdentifier(type);
  }

  function getEnemyDisplayName(type) {
    return (globalScope.TDMData && globalScope.TDMData.enemies && globalScope.TDMData.enemies[type] && globalScope.TDMData.enemies[type].name) || humanizeIdentifier(type);
  }

  function getFavoriteTowerName() {
    const state = getState();
    const counts = new Map();
    for (const tower of state.towers || []) {
      if (!tower || tower.isMini) continue;
      counts.set(tower.type, (counts.get(tower.type) || 0) + 1);
    }
    let bestType = "";
    let bestCount = 0;
    for (const [type, count] of counts.entries()) {
      if (count > bestCount) {
        bestType = type;
        bestCount = count;
      }
    }
    return bestType ? getTowerDisplayName(bestType) : "None";
  }

  function getLeastFavoriteEnemyName() {
    const state = getState();
    let worstType = "";
    let worstDamage = 0;
    for (const [type, damage] of Object.entries(state.enemyDamageByType || {})) {
      if (damage > worstDamage) {
        worstType = type;
        worstDamage = damage;
      }
    }
    return worstType ? getEnemyDisplayName(worstType) : "None";
  }

  function getTitleDefinition(titleId) {
    return getTitleCatalog()[titleId] || null;
  }

  function getUnlockedTitleOptions() {
    const profileState = getProfileState();
    const ids = Array.isArray(profileState.unlockedTitles) ? profileState.unlockedTitles : [];
    return ids.map((id) => getTitleDefinition(id)).filter(Boolean);
  }

  function getActiveTitleName() {
    return getTitleDefinition(getProfileState().activeTitle)?.name || "";
  }

  function unlockProfileTitle(titleId) {
    const profileState = getProfileState();
    const definition = getTitleDefinition(titleId);
    if (!definition) return false;
    const unlocked = new Set(Array.isArray(profileState.unlockedTitles) ? profileState.unlockedTitles : []);
    if (unlocked.has(titleId)) return false;
    unlocked.add(titleId);
    profileState.unlockedTitles = [...unlocked];
    if (!profileState.activeTitle) {
      profileState.activeTitle = titleId;
    }
    persistProfileState();
    syncProfileModal();
    syncLoginButtons();
    setLoginStatus(`Title unlocked: ${definition.name}.`);
    return true;
  }

  function applySelectedProfileTitle() {
    const ui = getUi();
    const profileState = getProfileState();
    const nextTitle = ui.profileTitleSelect ? String(ui.profileTitleSelect.value || "") : "";
    if (nextTitle && !getTitleDefinition(nextTitle)) return;
    if (nextTitle && !profileState.unlockedTitles.includes(nextTitle)) return;
    profileState.activeTitle = nextTitle;
    persistProfileState();
    syncProfileModal();
    syncLoginButtons();
  }

  function getLeaderboardName(entry) {
    return String(entry?.name || entry?.playerName || entry?.username || entry?.email || "Unknown");
  }

  function formatLeaderboardDisplayName(entry) {
    const name = getLeaderboardName(entry);
    const title = String(entry?.title || entry?.activeTitle || entry?.equippedTitle || entry?.profileTitle || "").trim();
    return title ? `[${title}] ${name}` : name;
  }

  function getLeaderboardEmail(entry) {
    return String(entry?.email || entry?.playerEmail || entry?.userEmail || "").trim().toLowerCase();
  }

  function dedupeLeaderboardRows(rows, metric = getLeaderboardState().metric) {
    const bestByEmail = new Map();
    const anonymousRows = [];
    for (const row of rows || []) {
      if (!row) continue;
      const email = getLeaderboardEmail(row);
      if (!email) {
        anonymousRows.push(row);
        continue;
      }
      const value = getLeaderboardMetricValue(row, metric);
      const current = bestByEmail.get(email);
      if (!current || value > getLeaderboardMetricValue(current, metric)) {
        bestByEmail.set(email, row);
      }
    }
    return [...bestByEmail.values(), ...anonymousRows];
  }

  function getLeaderboardMetricValue(entry, metric = getLeaderboardState().metric) {
    if (metric === "towers") {
      return Number(entry?.towersPlaced ?? entry?.towerCount ?? entry?.towers ?? entry?.score ?? 0);
    }
    if (metric === "waves") {
      return Number(entry?.waves ?? entry?.maxWave ?? entry?.wave ?? entry?.score ?? 0);
    }
    return Number(entry?.kills ?? entry?.killed ?? entry?.enemiesKilled ?? entry?.score ?? 0);
  }

  function getLeaderboardLabel(metric = getLeaderboardState().metric) {
    if (metric === "towers") return "Towers Placed";
    if (metric === "waves") return "Waves Accomplished";
    return "Enemies Killed";
  }

  function getLeaderboardOrderingQueries(metric = getLeaderboardState().metric) {
    const queryApi = globalScope.appwriteApi?.Query;
    if (!queryApi) return [];
    const primaryField = metric === "towers" ? "towersPlaced" : metric === "waves" ? "wavesCompleted" : "enemiesKilled";
    const secondaryField = metric === "towers" ? "enemiesKilled" : metric === "waves" ? "enemiesKilled" : "wavesCompleted";
    const tertiaryField = metric === "towers" ? "wavesCompleted" : metric === "waves" ? "towersPlaced" : "towersPlaced";
    return [
      queryApi.orderDesc(primaryField),
      queryApi.orderDesc(secondaryField),
      queryApi.orderDesc(tertiaryField),
      queryApi.limit(100),
    ];
  }

  async function loadLeaderboardDocuments(metric = getLeaderboardState().metric) {
    const leaderboardState = getLeaderboardState();
    const ui = getUi();
    if (!globalScope.appwriteClient || !globalScope.appwriteApi?.Databases) {
      leaderboardState.rows = getSavedScoreboardEntries();
      renderLeaderboard(leaderboardState.rows);
      return [];
    }
    const dbId = sanitizeAppwriteIdSafe(readStorageStringSafe("tdm_appwrite_realtime_database"), "");
    const collectionId = sanitizeAppwriteIdSafe(readStorageStringSafe("tdm_appwrite_realtime_collection"), "");
    if (!dbId || !collectionId) {
      if (ui.leaderboardStatus) {
        ui.leaderboardStatus.textContent = "Set leaderboard database and collection ids to enable Realtime.";
      }
      leaderboardState.rows = getSavedScoreboardEntries();
      renderLeaderboard(leaderboardState.rows);
      return [];
    }
    try {
      const databases = new globalScope.appwriteApi.Databases(globalScope.appwriteClient);
      const result = await databases.listDocuments(dbId, collectionId, getLeaderboardOrderingQueries(metric));
      leaderboardState.rows = Array.isArray(result?.documents) ? result.documents.slice(0, 200) : [];
      renderLeaderboard(leaderboardState.rows);
      if (ui.leaderboardStatus) {
        ui.leaderboardStatus.textContent = `Loaded ${leaderboardState.rows.length} leaderboard entries.`;
      }
      return leaderboardState.rows;
    } catch (error) {
      if (ui.leaderboardStatus) {
        ui.leaderboardStatus.textContent = `Leaderboard load failed: ${error?.message || error}`;
      }
      leaderboardState.rows = [];
      renderLeaderboard([]);
      return [];
    }
  }

  function renderLeaderboard(rows = getLeaderboardState().rows) {
    const ui = getUi();
    const leaderboardState = getLeaderboardState();
    if (ui.leaderboardStatus) {
      ui.leaderboardStatus.textContent = leaderboardState.subscription ? "Realtime connected." : "Waiting for Realtime updates.";
    }
    if (ui.leaderboardType && ui.leaderboardType.value !== leaderboardState.metric) {
      ui.leaderboardType.value = leaderboardState.metric;
    }
    if (!ui.leaderboardList) return;
    ui.leaderboardList.innerHTML = "";
    const deduped = dedupeLeaderboardRows(rows, leaderboardState.metric);
    const sorted = [...deduped].sort((a, b) => getLeaderboardMetricValue(b) - getLeaderboardMetricValue(a)).slice(0, 100);
    if (sorted.length === 0) {
      const item = globalScope.document.createElement("li");
      item.textContent = "No leaderboard entries yet.";
      ui.leaderboardList.appendChild(item);
      return;
    }
    for (const [index, entry] of sorted.entries()) {
      const item = globalScope.document.createElement("li");
      const name = formatLeaderboardDisplayName(entry);
      const value = Math.round(getLeaderboardMetricValue(entry));
      const label = getLeaderboardLabel();
      if (index === 0) item.classList.add("leaderboard-gold");
      if (index === 1) item.classList.add("leaderboard-silver");
      if (index === 2) item.classList.add("leaderboard-bronze");
      item.innerHTML = `<strong>${index + 1}. ${name}</strong><span>${label}: ${value}</span>`;
      ui.leaderboardList.appendChild(item);
    }
  }

  function updateLeaderboardUI(payload) {
    const leaderboardState = getLeaderboardState();
    if (!payload) return;
    const id = String(payload.$id || payload.id || getLeaderboardName(payload));
    const nextRow = { ...payload, id };
    const existingIndex = leaderboardState.rows.findIndex((row) => String(row.id || row.$id || "") === id);
    if (existingIndex >= 0) {
      leaderboardState.rows[existingIndex] = nextRow;
    } else {
      leaderboardState.rows.unshift(nextRow);
    }
    leaderboardState.rows = dedupeLeaderboardRows(leaderboardState.rows, leaderboardState.metric)
      .filter(Boolean)
      .sort((a, b) => getLeaderboardMetricValue(b) - getLeaderboardMetricValue(a))
      .slice(0, 200);
    renderLeaderboard();
  }

  async function subscribeLeaderboardRealtime() {
    const ui = getUi();
    const leaderboardState = getLeaderboardState();
    if (!globalScope.appwriteRealtimeClient || !globalScope.appwriteApi?.Client) {
      leaderboardState.subscription = null;
      await loadLeaderboardDocuments();
      return;
    }
    const dbId = sanitizeAppwriteIdSafe(readStorageStringSafe("tdm_appwrite_realtime_database"), "");
    const collectionId = sanitizeAppwriteIdSafe(readStorageStringSafe("tdm_appwrite_realtime_collection"), "");
    if (!dbId || !collectionId) {
      leaderboardState.subscription = null;
      await loadLeaderboardDocuments();
      if (ui.leaderboardStatus) {
        ui.leaderboardStatus.textContent = "Set leaderboard database and collection ids to enable Realtime.";
      }
      return;
    }
    try {
      globalScope.appwriteRealtimeClient.setEndpoint(globalScope.APPWRITE_ENDPOINT).setProject(globalScope.APPWRITE_PROJECT_ID);
      await loadLeaderboardDocuments(leaderboardState.metric);
      const channel = `databases.${dbId}.collections.${collectionId}.documents`;
      leaderboardState.subscription = globalScope.appwriteRealtimeClient.subscribe(channel, (response) => {
        if (response?.payload) {
          updateLeaderboardUI(response.payload);
        }
        if (response?.events && response.events.includes("databases.*.collections.*.documents.*.create")) {
          updateLeaderboardUI(response.payload);
        }
      });
      if (ui.leaderboardStatus) {
        ui.leaderboardStatus.textContent = "Realtime connected.";
      }
    } catch (error) {
      leaderboardState.subscription = null;
      if (ui.leaderboardStatus) {
        ui.leaderboardStatus.textContent = `Realtime unavailable: ${error?.message || error}`;
      }
    }
  }

  function initLeaderboardRealtime() {
    void subscribeLeaderboardRealtime();
  }

  function refreshLeaderboardDocuments() {
    return loadLeaderboardDocuments();
  }

  async function clearLeaderboardDocuments() {
    const ui = getUi();
    const leaderboardState = getLeaderboardState();
    const dbId = sanitizeAppwriteIdSafe(readStorageStringSafe("tdm_appwrite_realtime_database"), "");
    const collectionId = sanitizeAppwriteIdSafe(readStorageStringSafe("tdm_appwrite_realtime_collection"), "");
    const hasRemoteLeaderboard = Boolean(globalScope.appwriteClient && globalScope.appwriteApi?.Databases && dbId && collectionId);
    if (!hasRemoteLeaderboard) {
      globalScope.localStorage.removeItem("tdm_saved_scores");
      leaderboardState.rows = [];
      renderLeaderboard([]);
      if (ui.leaderboardStatus) {
        ui.leaderboardStatus.textContent = "Local leaderboard cleared.";
      }
      return;
    }
    try {
      const databases = new globalScope.appwriteApi.Databases(globalScope.appwriteClient);
      const queryApi = globalScope.appwriteApi.Query;
      let removed = 0;
      while (true) {
        const queries = [];
        if (queryApi?.limit) {
          queries.push(queryApi.limit(100));
        }
        if (queryApi?.offset) {
          queries.push(queryApi.offset(removed));
        }
        const result = await databases.listDocuments(dbId, collectionId, queries);
        const documents = Array.isArray(result?.documents) ? result.documents : [];
        if (documents.length === 0) {
          break;
        }
        await Promise.all(
          documents
            .map((document) => String(document?.$id || document?.id || "").trim())
            .filter(Boolean)
            .map((documentId) => databases.deleteDocument(dbId, collectionId, documentId)),
        );
        removed += documents.length;
        if (!queryApi?.offset || documents.length < 100) {
          break;
        }
      }
      globalScope.localStorage.removeItem("tdm_saved_scores");
      leaderboardState.rows = [];
      renderLeaderboard([]);
      if (ui.leaderboardStatus) {
        ui.leaderboardStatus.textContent = `Cleared ${removed} leaderboard entries.`;
      }
    } catch (error) {
      globalScope.localStorage.removeItem("tdm_saved_scores");
      leaderboardState.rows = [];
      renderLeaderboard([]);
      if (ui.leaderboardStatus) {
        ui.leaderboardStatus.textContent = `Leaderboard clear failed: ${error?.message || error}`;
      }
    }
  }

  function getSavedScoreboardEntries() {
    const parsed = readStorageJsonSafe("tdm_saved_scores", []);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  }

  function persistSavedScoreboardEntries(entries) {
    globalScope.localStorage.setItem("tdm_saved_scores", JSON.stringify(entries.slice(0, 100)));
  }

  function buildScoreEntry(enemiesKilledOverride, towersPlacedOverride, wavesCompletedOverride) {
    const state = getState();
    const profileState = getProfileState();
    const loginState = getLoginState();
    const name = profileState.name || loginState.email || "Player";
    const email = String(loginState.email || "").trim();
    const towersPlaced = Math.max(0, Number(Number.isFinite(towersPlacedOverride) ? towersPlacedOverride : (state.totalTowersPlaced || state.towers?.length || 0)));
    const enemiesKilled = Math.max(0, Number(Number.isFinite(enemiesKilledOverride) ? enemiesKilledOverride : (state.totalEnemiesKilled || state.waveKillsThisWave || 0)));
    const wavesCompleted = Math.max(0, Number(Number.isFinite(wavesCompletedOverride) ? wavesCompletedOverride : (state.wave || 0)));
    const score = (wavesCompleted * 1000) + (enemiesKilled * 25) + (towersPlaced * 5) + Math.round(Number(state.totalDamage || 0));
    return {
      name,
      playerName: name,
      username: name,
      email,
      playerEmail: email,
      userEmail: email,
      title: getActiveTitleName(),
      activeTitle: getActiveTitleName(),
      equippedTitle: getActiveTitleName(),
      profileTitle: getActiveTitleName(),
      wavesCompleted,
      enemiesKilled,
      towersPlaced,
      score,
      totalDamage: Math.round(Number(state.totalDamage || 0)),
      livesRemaining: Math.max(0, Number(state.lives || 0)),
      mapId: state.mapId || "",
      difficulty: state.difficulty || "",
      savedAt: new Date().toISOString(),
    };
  }

  async function uploadGameStats(enemiesKilled, towersPlaced, currentWave) {
    const entry = buildScoreEntry(enemiesKilled, towersPlaced, currentWave);
    const leaderboardState = getLeaderboardState();
    const dbId = sanitizeAppwriteIdSafe(readStorageStringSafe("tdm_appwrite_realtime_database"), "");
    const collectionId = sanitizeAppwriteIdSafe(readStorageStringSafe("tdm_appwrite_realtime_collection"), "");
    const localEntries = getSavedScoreboardEntries();
    localEntries.unshift(entry);
    persistSavedScoreboardEntries(localEntries);
    if (!globalScope.appwriteClient || !globalScope.appwriteApi?.Databases || !dbId || !collectionId) {
      leaderboardState.rows = dedupeLeaderboardRows([entry, ...leaderboardState.rows], leaderboardState.metric).slice(0, 200);
      renderLeaderboard();
      return entry;
    }
    try {
      const databases = new globalScope.appwriteApi.Databases(globalScope.appwriteClient);
      const idFactory = globalScope.appwriteApi.ID;
      const documentId = idFactory && typeof idFactory.unique === "function"
        ? idFactory.unique()
        : `score_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      await databases.createDocument(dbId, collectionId, documentId, entry);
      await loadLeaderboardDocuments(leaderboardState.metric);
      return entry;
    } catch (error) {
      if (getUi().leaderboardStatus) {
        getUi().leaderboardStatus.textContent = `Score saved locally: ${error?.message || error}`;
      }
      leaderboardState.rows = dedupeLeaderboardRows([entry, ...leaderboardState.rows], leaderboardState.metric).slice(0, 200);
      renderLeaderboard();
      return entry;
    }
  }

  async function saveGameOverScore() {
    const state = getState();
    return uploadGameStats(state.totalEnemiesKilled, state.totalTowersPlaced, state.wave);
  }

  function openLeaderboardModal() {
    const ui = getUi();
    if (!ui.leaderboardModal) return;
    renderLeaderboard();
    ui.leaderboardModal.classList.remove("hidden");
  }

  function closeLeaderboardModal() {
    const ui = getUi();
    if (ui.leaderboardModal) ui.leaderboardModal.classList.add("hidden");
  }

  function syncProfileModal() {
    const ui = getUi();
    const profileState = getProfileState();
    const loginState = getLoginState();
    const displayName = profileState.name || loginState.email || "Player";
    const unlockedTitles = getUnlockedTitleOptions();
    if (ui.profileEmail) {
      ui.profileEmail.textContent = loginState.email ? `Signed in as ${loginState.email}` : "No active session";
    }
    if (ui.profileNameInput) {
      ui.profileNameInput.value = displayName;
    }
    if (ui.profileAvatarPreview) {
      ui.profileAvatarPreview.src = profileState.avatar || profileState.defaultAvatar || getProfileFallbackAvatar(displayName);
    }
    if (ui.profileMaxWave) ui.profileMaxWave.textContent = String(profileState.maxWave || 0);
    if (ui.profileMaxDamage) ui.profileMaxDamage.textContent = String(Math.round(profileState.maxDamage || 0));
    if (ui.profileMostTowers) ui.profileMostTowers.textContent = String(profileState.mostTowers || 0);
    if (ui.profileFavoriteTower) ui.profileFavoriteTower.textContent = profileState.favoriteTower || getFavoriteTowerName();
    if (ui.profileLeastFavoriteEnemy) {
      ui.profileLeastFavoriteEnemy.textContent = profileState.leastFavoriteEnemy || getLeastFavoriteEnemyName();
    }
    if (ui.profileTitleCurrent) {
      const titleName = getActiveTitleName();
      ui.profileTitleCurrent.textContent = titleName ? `Equipped title: ${titleName}` : "No title equipped";
    }
    if (ui.profileTitleSelect) {
      ui.profileTitleSelect.innerHTML = "";
      const noneOption = globalScope.document.createElement("option");
      noneOption.value = "";
      noneOption.textContent = unlockedTitles.length > 0 ? "No title equipped" : "No titles unlocked";
      ui.profileTitleSelect.appendChild(noneOption);
      for (const title of unlockedTitles) {
        const option = globalScope.document.createElement("option");
        option.value = title.id;
        option.textContent = title.name;
        option.selected = profileState.activeTitle === title.id;
        ui.profileTitleSelect.appendChild(option);
      }
      ui.profileTitleSelect.value = profileState.activeTitle || "";
      ui.profileTitleSelect.disabled = unlockedTitles.length === 0;
    }
  }

  function updateProfileProgress() {
    const loginState = getLoginState();
    const profileState = getProfileState();
    const state = getState();
    if (!loginState.loggedIn) return;
    const currentWave = Math.max(0, Number(state.wave || 0));
    const currentDamage = Math.max(0, Math.round(state.totalDamage || 0));
    const currentTowers = typeof globalScope.getPlacedTowerCount === "function" ? globalScope.getPlacedTowerCount() : 0;
    const favoriteTower = getFavoriteTowerName();
    const leastFavoriteEnemy = getLeastFavoriteEnemyName();
    let changed = false;
    if (currentWave > profileState.maxWave) {
      profileState.maxWave = currentWave;
      changed = true;
    }
    if (currentDamage > profileState.maxDamage) {
      profileState.maxDamage = currentDamage;
      changed = true;
    }
    if (currentTowers > profileState.mostTowers) {
      profileState.mostTowers = currentTowers;
      changed = true;
    }
    if (profileState.favoriteTower !== favoriteTower) {
      profileState.favoriteTower = favoriteTower;
      changed = true;
    }
    if (profileState.leastFavoriteEnemy !== leastFavoriteEnemy) {
      profileState.leastFavoriteEnemy = leastFavoriteEnemy;
      changed = true;
    }
    if (changed) {
      persistProfileState();
    }
    const ui = getUi();
    if (ui.profileMaxWave) ui.profileMaxWave.textContent = String(profileState.maxWave || 0);
    if (ui.profileMaxDamage) ui.profileMaxDamage.textContent = String(Math.round(profileState.maxDamage || 0));
    if (ui.profileMostTowers) ui.profileMostTowers.textContent = String(profileState.mostTowers || 0);
    if (ui.profileFavoriteTower) ui.profileFavoriteTower.textContent = profileState.favoriteTower || favoriteTower;
    if (ui.profileLeastFavoriteEnemy) {
      ui.profileLeastFavoriteEnemy.textContent = profileState.leastFavoriteEnemy || leastFavoriteEnemy;
    }
  }

  function openProfileModal() {
    const ui = getUi();
    const loginState = getLoginState();
    if (!loginState.loggedIn || !ui.profileModal) return;
    syncProfileModal();
    ui.profileModal.classList.remove("hidden");
  }

  function closeProfileModal() {
    const ui = getUi();
    if (ui.profileModal) ui.profileModal.classList.add("hidden");
  }

  async function handleProfileAvatarUpload(event) {
    const profileState = getProfileState();
    const file = event?.target?.files?.[0];
    if (!file) return;
    if (!file.type || !file.type.startsWith("image/")) {
      setLoginStatus("Choose an image file for the profile picture.");
      return;
    }
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("Failed to read image"));
      reader.readAsDataURL(file);
    });
    profileState.avatar = dataUrl;
    persistProfileState();
    syncProfileModal();
  }

  function saveProfile() {
    const ui = getUi();
    const loginState = getLoginState();
    const profileState = getProfileState();
    const nextName = ui.profileNameInput ? ui.profileNameInput.value.trim() : "";
    profileState.name = nextName || getDefaultProfileName({ name: loginState.email, email: loginState.email });
    persistProfileState();
    syncLoginButtons();
    syncProfileModal();
    setLoginStatus("Profile saved.");
  }

  function syncLoginButtons() {
    const ui = getUi();
    const loginState = getLoginState();
    const profileState = getProfileState();
    if (ui.loginButton) ui.loginButton.textContent = loginState.loggedIn ? "Logged In" : "Sign in with Google";
    if (ui.gameLoginButton) ui.gameLoginButton.textContent = loginState.loggedIn ? "Logged In" : "Sign in with Google";
    const locked = loginState.loading || loginState.loggedIn;
    if (ui.submitLogin) ui.submitLogin.disabled = locked;
    if (ui.loginButton) ui.loginButton.disabled = locked;
    if (ui.gameLoginButton) ui.gameLoginButton.disabled = locked;
    if (ui.logoutButton) ui.logoutButton.disabled = loginState.loading;
    for (const button of ui.profileButtons || []) {
      if (button) button.classList.toggle("hidden", !loginState.loggedIn);
    }
    if (ui.userWelcome) {
      ui.userWelcome.classList.toggle("hidden", !loginState.loggedIn);
      const displayName = profileState.name || loginState.email || "Google user";
      const titlePrefix = getActiveTitleName();
      const prefixText = titlePrefix ? `${titlePrefix.toUpperCase()} ` : "";
      ui.userWelcome.textContent = loginState.loggedIn ? `WELCOME, ${prefixText}${String(displayName).toUpperCase()}` : "";
    }
    if (ui.logoutButton) {
      ui.logoutButton.classList.toggle("hidden", !loginState.loggedIn);
    }
    if (ui.loginButton) {
      ui.loginButton.style.display = loginState.loggedIn ? "none" : "";
    }
    if (ui.gameLoginButton) {
      ui.gameLoginButton.style.display = loginState.loggedIn ? "none" : "";
    }
  }

  function configureAppwriteClient() {
    const loginState = getLoginState();
    if (!globalScope.appwriteClient) return false;
    if (!loginState.endpoint || !loginState.project) return false;
    globalScope.appwriteClient.setEndpoint(loginState.endpoint).setProject(loginState.project);
    return true;
  }

  async function refreshLoginState() {
    const profileState = getProfileState();
    const loginState = getLoginState();
    if (!globalScope.appwriteAccount || !configureAppwriteClient()) {
      loginState.loggedIn = false;
      loginState.email = "";
      profileState.defaultAvatar = "";
      syncProfileModal();
      syncLoginButtons();
      return;
    }
    try {
      const account = await globalScope.appwriteAccount.get();
      loginState.loggedIn = true;
      loginState.email = account?.email || account?.name || "Google user";
      profileState.defaultAvatar = getAccountAvatarUrl(account);
      if (!profileState.name) {
        profileState.name = getDefaultProfileName(account);
      }
      persistProfileState();
      syncProfileModal();
      setLoginStatus(`Signed in as ${loginState.email}.`);
    } catch {
      loginState.loggedIn = false;
      loginState.email = "";
      profileState.defaultAvatar = "";
      syncProfileModal();
    }
    syncLoginButtons();
  }

  function openLoginModal() {
    const loginState = getLoginState();
    if (loginState.loggedIn || loginState.loading) return;
    void submitLogin();
  }

  function closeLoginModal() {
    const ui = getUi();
    if (ui.loginModal) ui.loginModal.classList.add("hidden");
  }

  async function submitLogin() {
    const loginState = getLoginState();
    if (!globalScope.appwriteClient || !globalScope.appwriteAccount) {
      setLoginStatus("Appwrite SDK is not available.");
      return;
    }
    if (loginState.loggedIn || loginState.loading) {
      return;
    }
    const endpoint = globalScope.APPWRITE_ENDPOINT;
    const project = globalScope.APPWRITE_PROJECT_ID;
    if (!endpoint || !project) {
      setLoginStatus("Endpoint and project ID are required.");
      return;
    }
    loginState.loading = true;
    syncLoginButtons();
    setLoginStatus("Redirecting to Google...");
    try {
      loginState.endpoint = endpoint;
      loginState.project = project;
      globalScope.localStorage.setItem("tdm_appwrite_endpoint", endpoint);
      globalScope.localStorage.setItem("tdm_appwrite_project", project);
      configureAppwriteClient();
      await login();
    } catch (error) {
      loginState.loggedIn = false;
      setLoginStatus(`Login failed: ${error?.message || error}`);
    } finally {
      loginState.loading = false;
      syncLoginButtons();
    }
  }

  function login() {
    const loginState = getLoginState();
    if (loginState.loggedIn || loginState.loading) {
      return Promise.resolve();
    }
    return globalScope.appwriteAccount.createOAuth2Session("google", globalScope.APPWRITE_REDIRECT_URL, globalScope.APPWRITE_REDIRECT_URL);
  }

  async function logout() {
    if (!globalScope.appwriteAccount) return;
    try {
      await globalScope.appwriteAccount.deleteSession("current");
    } catch (error) {
      console.error("Logout failed:", error?.message || error);
      return;
    }
    const loginState = getLoginState();
    const profileState = getProfileState();
    loginState.loggedIn = false;
    loginState.email = "";
    profileState.defaultAvatar = "";
    syncLoginButtons();
    syncProfileModal();
    if (typeof globalScope.location !== "undefined") {
      globalScope.location.reload();
    }
  }

  globalScope.setLoginStatus = setLoginStatus;
  globalScope.getDefaultProfileName = getDefaultProfileName;
  globalScope.getAccountAvatarUrl = getAccountAvatarUrl;
  globalScope.getProfileFallbackAvatar = getProfileFallbackAvatar;
  globalScope.persistProfileState = persistProfileState;
  globalScope.humanizeIdentifier = humanizeIdentifier;
  globalScope.getTowerDisplayName = getTowerDisplayName;
  globalScope.getEnemyDisplayName = getEnemyDisplayName;
  globalScope.getFavoriteTowerName = getFavoriteTowerName;
  globalScope.getLeastFavoriteEnemyName = getLeastFavoriteEnemyName;
  globalScope.getTitleDefinition = getTitleDefinition;
  globalScope.getUnlockedTitleOptions = getUnlockedTitleOptions;
  globalScope.getActiveTitleName = getActiveTitleName;
  globalScope.unlockProfileTitle = unlockProfileTitle;
  globalScope.applySelectedProfileTitle = applySelectedProfileTitle;
  globalScope.getLeaderboardName = getLeaderboardName;
  globalScope.getLeaderboardMetricValue = getLeaderboardMetricValue;
  globalScope.getLeaderboardLabel = getLeaderboardLabel;
  globalScope.refreshLeaderboardDocuments = refreshLeaderboardDocuments;
  globalScope.clearLeaderboardDocuments = clearLeaderboardDocuments;
  globalScope.renderLeaderboard = renderLeaderboard;
  globalScope.updateLeaderboardUI = updateLeaderboardUI;
  globalScope.subscribeLeaderboardRealtime = subscribeLeaderboardRealtime;
  globalScope.initLeaderboardRealtime = initLeaderboardRealtime;
  globalScope.uploadGameStats = uploadGameStats;
  globalScope.saveGameOverScore = saveGameOverScore;
  globalScope.openLeaderboardModal = openLeaderboardModal;
  globalScope.closeLeaderboardModal = closeLeaderboardModal;
  globalScope.syncProfileModal = syncProfileModal;
  globalScope.updateProfileProgress = updateProfileProgress;
  globalScope.openProfileModal = openProfileModal;
  globalScope.closeProfileModal = closeProfileModal;
  globalScope.handleProfileAvatarUpload = handleProfileAvatarUpload;
  globalScope.saveProfile = saveProfile;
  globalScope.syncLoginButtons = syncLoginButtons;
  globalScope.configureAppwriteClient = configureAppwriteClient;
  globalScope.refreshLoginState = refreshLoginState;
  globalScope.openLoginModal = openLoginModal;
  globalScope.closeLoginModal = closeLoginModal;
  globalScope.submitLogin = submitLogin;
  globalScope.login = login;
  globalScope.logout = logout;
})(window);
