(() => {
  const { GAME_CONFIG } = window.MarcsGame;

  class Renderer {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
    }

    render(state) {
      this.clearCanvas();
      this.drawStars(state.stars);
      this.drawHud(state);
      this.drawPlayer(state.player);
      this.drawEnemies(state.enemies);
      this.drawBullets(state.playerBullets, state.enemyBullets);
    }

    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawStars(stars) {
      this.ctx.save();
      stars.forEach((star) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(255,255,255,0.75)";
        this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.ctx.fill();
      });
      this.ctx.restore();
    }

    drawHud(state) {
      const ctx = this.ctx;
      ctx.save();
      ctx.font = "bold 20px Segoe UI";
      ctx.fillStyle = "#dbe7ff";
      ctx.fillText(`Score: ${state.score}`, 18, 30);
      ctx.fillText(`Welle: ${state.wave}`, 18, 58);
      ctx.fillText(`Leben: ${state.player.lives}`, 18, 86);
      ctx.restore();
    }

    drawPlayer(player) {
      const ctx = this.ctx;
      const gradient = ctx.createLinearGradient(player.x, player.y, player.x + player.width, player.y + player.height);
      gradient.addColorStop(0, "#69f4ff");
      gradient.addColorStop(1, "#ff71d4");

      ctx.save();
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(player.x + player.width / 2, player.y);
      ctx.lineTo(player.x + player.width, player.y + player.height);
      ctx.lineTo(player.x, player.y + player.height);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#173c95";
      ctx.fillRect(player.x + player.width / 2 - 8, player.y + 8, 16, 18);
      ctx.fillStyle = "#f5f9ff";
      ctx.font = "bold 12px Segoe UI";
      ctx.fillText("MARC", player.x + 12, player.y + player.height - 8);
      ctx.restore();
    }

    drawEnemies(enemies) {
      const ctx = this.ctx;
      enemies.forEach((enemy) => {
        ctx.save();
        ctx.fillStyle = enemy.color;
        this.drawRoundedRect(enemy.x, enemy.y, enemy.width, enemy.height, 8);
        ctx.fill();

        ctx.fillStyle = "rgba(11, 18, 64, 0.8)";
        ctx.beginPath();
        ctx.arc(enemy.x + 12, enemy.y + 12, 4, 0, Math.PI * 2);
        ctx.arc(enemy.x + enemy.width - 12, enemy.y + 12, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    drawRoundedRect(x, y, width, height, radius) {
      const ctx = this.ctx;
      const r = Math.min(radius, width / 2, height / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + width - r, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + r);
      ctx.lineTo(x + width, y + height - r);
      ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
      ctx.lineTo(x + r, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    drawBullets(playerBullets, enemyBullets) {
      const ctx = this.ctx;
      playerBullets.forEach((bullet) => {
        ctx.save();
        ctx.fillStyle = "#83fff0";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        ctx.restore();
      });

      enemyBullets.forEach((bullet) => {
        ctx.save();
        ctx.fillStyle = "#ff8c6e";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        ctx.restore();
      });
    }
  }

  window.MarcsGame = window.MarcsGame || {};
  window.MarcsGame.Renderer = Renderer;
})();
