(() => {
  const { GAME_CONFIG, Player, Enemy, Star, Bullet } = window.MarcsGame;

  function intersects(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  class GameState {
    constructor() {
      this.phase = "start";
      this.score = 0;
      this.wave = 1;
      this.enemyDirection = 1;
      this.enemySpeed = GAME_CONFIG.enemy.baseSpeed;
      this.lastEnemyShotTime = 0;
      this.player = new Player();
      this.playerBullets = [];
      this.enemyBullets = [];
      this.enemies = [];
      this.stars = this.createStars();
      this.spawnWave();
    }

    createStars() {
      const stars = [];
      for (let i = 0; i < 85; i += 1) {
        stars.push(new Star(
          Math.random() * GAME_CONFIG.canvasWidth,
          Math.random() * GAME_CONFIG.canvasHeight,
          30 + Math.random() * 90,
          1 + Math.random() * 2
        ));
      }
      return stars;
    }

    start() {
      this.phase = "playing";
    }

    restart() {
      const freshState = new GameState();
      Object.assign(this, freshState);
      this.phase = "playing";
    }

    update(deltaSeconds, input, nowMs) {
      this.updateStars(deltaSeconds);

      if (this.phase !== "playing") {
        return;
      }

      this.updatePlayer(deltaSeconds, input, nowMs);
      this.updateEnemies(deltaSeconds);
      this.updateEnemyShots(nowMs);
      this.updateBullets(deltaSeconds);
      this.handleCollisions();
      this.cleanupOffscreenBullets();
      this.checkWaveClear();
    }

    updateStars(deltaSeconds) {
      this.stars.forEach((star) => star.update(deltaSeconds, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight));
    }

    updatePlayer(deltaSeconds, input, nowMs) {
      const direction = Number(input.rightPressed) - Number(input.leftPressed);
      if (direction !== 0) {
        this.player.move(direction, deltaSeconds);
      }

      if (input.firePressed && this.player.canShoot(nowMs)) {
        this.playerBullets.push(this.player.shoot(nowMs));
      }
    }

    updateEnemies(deltaSeconds) {
      let shouldDrop = false;

      this.enemies.forEach((enemy) => {
        enemy.x += this.enemyDirection * this.enemySpeed * deltaSeconds;
        if (enemy.x <= 0 || enemy.x + enemy.width >= GAME_CONFIG.canvasWidth) {
          shouldDrop = true;
        }
      });

      if (shouldDrop) {
        this.enemyDirection *= -1;
        this.enemies.forEach((enemy) => {
          enemy.y += GAME_CONFIG.enemy.diveStep;
        });
      }
    }

    updateEnemyShots(nowMs) {
      if (nowMs - this.lastEnemyShotTime < GAME_CONFIG.enemy.fireIntervalMs) {
        return;
      }

      const shooters = this.lowestEnemiesByColumn();
      if (shooters.length === 0) {
        return;
      }

      const shooter = shooters[Math.floor(Math.random() * shooters.length)];
      this.enemyBullets.push(new Bullet(
        shooter.x + shooter.width / 2,
        shooter.y + shooter.height,
        GAME_CONFIG.bullet.enemySpeed,
        "enemy"
      ));
      this.lastEnemyShotTime = nowMs;
    }

    lowestEnemiesByColumn() {
      const byColumn = new Map();
      this.enemies.forEach((enemy) => {
        const column = Math.round(enemy.x / (GAME_CONFIG.enemy.width + GAME_CONFIG.enemy.spacingX));
        const current = byColumn.get(column);
        if (!current || enemy.y > current.y) {
          byColumn.set(column, enemy);
        }
      });
      return [...byColumn.values()];
    }

    updateBullets(deltaSeconds) {
      this.playerBullets.forEach((bullet) => bullet.update(deltaSeconds));
      this.enemyBullets.forEach((bullet) => bullet.update(deltaSeconds));
    }

    handleCollisions() {
      this.playerBullets.forEach((bullet) => {
        this.enemies.forEach((enemy) => {
          if (!bullet.active || !enemy.alive) {
            return;
          }

          if (intersects(bullet.bounds(), enemy.bounds())) {
            bullet.active = false;
            enemy.alive = false;
            this.score += GAME_CONFIG.enemy.points;
          }
        });
      });

      this.enemyBullets.forEach((bullet) => {
        if (!bullet.active) {
          return;
        }

        if (intersects(bullet.bounds(), this.player.bounds())) {
          bullet.active = false;
          this.player.lives -= 1;
          if (this.player.lives <= 0) {
            this.phase = "gameover";
          }
        }
      });

      this.enemies.forEach((enemy) => {
        if (!enemy.alive) {
          return;
        }

        const touchesPlayer = intersects(enemy.bounds(), this.player.bounds());
        const reachedBottom = enemy.y + enemy.height >= this.player.y;
        if (touchesPlayer || reachedBottom) {
          this.phase = "gameover";
        }
      });

      this.enemies = this.enemies.filter((enemy) => enemy.alive);
    }

    cleanupOffscreenBullets() {
      this.playerBullets = this.playerBullets.filter((bullet) => bullet.active && bullet.y + bullet.height >= 0);
      this.enemyBullets = this.enemyBullets.filter((bullet) => bullet.active && bullet.y <= GAME_CONFIG.canvasHeight);
    }

    checkWaveClear() {
      if (this.enemies.length > 0 || this.phase !== "playing") {
        return;
      }

      this.wave += 1;
      this.enemySpeed = GAME_CONFIG.enemy.baseSpeed + (this.wave - 1) * GAME_CONFIG.wave.speedStep;
      this.spawnWave();
    }

    spawnWave() {
      this.enemies = [];
      const rows = Math.min(
        GAME_CONFIG.enemy.startRows + Math.floor((this.wave - 1) / GAME_CONFIG.wave.extraRowsEvery),
        GAME_CONFIG.wave.maxRows
      );

      const formationWidth =
        GAME_CONFIG.enemy.columns * GAME_CONFIG.enemy.width +
        (GAME_CONFIG.enemy.columns - 1) * GAME_CONFIG.enemy.spacingX;
      const startX = (GAME_CONFIG.canvasWidth - formationWidth) / 2;
      const startY = 70;
      const palette = ["#46d7ff", "#9f73ff", "#ff67d6", "#67ffaf", "#ffe56a", "#ff9b5e", "#74f1ff"];

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < GAME_CONFIG.enemy.columns; column += 1) {
          const x = startX + column * (GAME_CONFIG.enemy.width + GAME_CONFIG.enemy.spacingX);
          const y = startY + row * (GAME_CONFIG.enemy.height + GAME_CONFIG.enemy.spacingY);
          this.enemies.push(new Enemy(x, y, palette[row % palette.length]));
        }
      }
    }
  }

  window.MarcsGame = window.MarcsGame || {};
  window.MarcsGame.GameState = GameState;
})();
