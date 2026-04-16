(() => {
  class Bullet {
    constructor(x, y, speed, owner) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.owner = owner;
      this.width = window.MarcsGame.GAME_CONFIG.bullet.width;
      this.height = window.MarcsGame.GAME_CONFIG.bullet.height;
      this.active = true;
    }

    update(deltaSeconds) {
      this.y += this.speed * deltaSeconds;
    }

    bounds() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    }
  }

  class Player {
    constructor() {
      const { canvasWidth, canvasHeight, player } = window.MarcsGame.GAME_CONFIG;

      this.width = player.width;
      this.height = player.height;
      this.speed = player.speed;
      this.x = canvasWidth / 2 - this.width / 2;
      this.y = canvasHeight - this.height - 24;
      this.lives = player.maxLives;
      this.lastShotTime = 0;
      this.name = "Marc";
    }

    move(direction, deltaSeconds) {
      const { canvasWidth } = window.MarcsGame.GAME_CONFIG;
      this.x += direction * this.speed * deltaSeconds;
      this.x = Math.max(0, Math.min(canvasWidth - this.width, this.x));
    }

    canShoot(currentTime) {
      const cooldown = window.MarcsGame.GAME_CONFIG.player.fireCooldownMs;
      return currentTime - this.lastShotTime >= cooldown;
    }

    shoot(currentTime) {
      this.lastShotTime = currentTime;
      return new Bullet(this.x + this.width / 2 - 2, this.y - 12, -window.MarcsGame.GAME_CONFIG.bullet.speed, "player");
    }

    bounds() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    }
  }

  class Enemy {
    constructor(x, y, color) {
      const { enemy } = window.MarcsGame.GAME_CONFIG;
      this.x = x;
      this.y = y;
      this.width = enemy.width;
      this.height = enemy.height;
      this.color = color;
      this.alive = true;
    }

    bounds() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    }
  }

  class Star {
    constructor(x, y, speed, radius) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.radius = radius;
    }

    update(deltaSeconds, width, height) {
      this.y += this.speed * deltaSeconds;
      if (this.y > height) {
        this.y = -8;
        this.x = Math.random() * width;
      }
    }
  }

  window.MarcsGame = window.MarcsGame || {};
  window.MarcsGame.Bullet = Bullet;
  window.MarcsGame.Player = Player;
  window.MarcsGame.Enemy = Enemy;
  window.MarcsGame.Star = Star;
})();
