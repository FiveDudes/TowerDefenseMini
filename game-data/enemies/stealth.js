(function registerStealthEnemy(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerEnemy("stealth", {
    name: "Shade",
    desc: "Hidden until tapped. Watch towers can see it.",
    waveUnlock: { wave: 4, kind: "enemy", title: "Shade", desc: "Hidden until revealed by Watch Towers or taps." },
    onDamage(context) {
      const { enemy } = context;
      enemy.stealth = false;
      enemy.revealed = true;
      enemy.revealTimer = 0;
    },
  });
})(window);
