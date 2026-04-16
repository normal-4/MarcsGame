(() => {
  const GAME_CONFIG = {
    canvasWidth: 960,
    canvasHeight: 600,
    player: {
      width: 70,
      height: 34,
      speed: 430,
      fireCooldownMs: 220,
      maxLives: 3
    },
    bullet: {
      width: 5,
      height: 14,
      speed: 640,
      enemySpeed: 300
    },
    enemy: {
      width: 44,
      height: 28,
      spacingX: 18,
      spacingY: 16,
      startRows: 4,
      columns: 10,
      baseSpeed: 80,
      diveStep: 18,
      fireIntervalMs: 850,
      points: 100
    },
    wave: {
      speedStep: 18,
      extraRowsEvery: 2,
      maxRows: 7
    }
  };

  window.MarcsGame = window.MarcsGame || {};
  window.MarcsGame.GAME_CONFIG = GAME_CONFIG;
})();
