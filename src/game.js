(() => {
  const { GAME_CONFIG, InputHandler, GameState, Renderer } = window.MarcsGame;

  const canvas = document.getElementById("gameCanvas");
  canvas.width = GAME_CONFIG.canvasWidth;
  canvas.height = GAME_CONFIG.canvasHeight;

  const startScreen = document.getElementById("startScreen");
  const gameOverScreen = document.getElementById("gameOverScreen");
  const finalScoreText = document.getElementById("finalScoreText");
  const startButton = document.getElementById("startButton");
  const restartButton = document.getElementById("restartButton");

  const input = new InputHandler();
  const state = new GameState();
  const renderer = new Renderer(canvas);

  let lastTime = performance.now();

  function showStartScreen() {
    startScreen.classList.add("visible");
    gameOverScreen.classList.remove("visible");
  }

  function showGameOverScreen() {
    finalScoreText.textContent = `Dein Score: ${state.score}`;
    gameOverScreen.classList.add("visible");
    startScreen.classList.remove("visible");
  }

  function hideAllScreens() {
    startScreen.classList.remove("visible");
    gameOverScreen.classList.remove("visible");
  }

  function beginGame() {
    state.start();
    hideAllScreens();
  }

  function restartGame() {
    state.restart();
    hideAllScreens();
  }

  function handleUiActions() {
    if (state.phase === "start" && input.confirmPressed) {
      beginGame();
    }

    if (state.phase === "gameover" && input.confirmPressed) {
      restartGame();
    }

    if (state.phase === "start") {
      showStartScreen();
    }

    if (state.phase === "gameover") {
      showGameOverScreen();
    }
  }

  function gameLoop(currentTime) {
    const deltaSeconds = Math.min((currentTime - lastTime) / 1000, 0.033);
    lastTime = currentTime;

    handleUiActions();
    state.update(deltaSeconds, input, currentTime);
    renderer.render(state);

    requestAnimationFrame(gameLoop);
  }

  startButton.addEventListener("click", beginGame);
  restartButton.addEventListener("click", restartGame);

  showStartScreen();
  requestAnimationFrame(gameLoop);
})();
