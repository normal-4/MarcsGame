(() => {
  class InputHandler {
    constructor() {
      this.leftPressed = false;
      this.rightPressed = false;
      this.firePressed = false;
      this.confirmPressed = false;
      this.bindEvents();
    }

    bindEvents() {
      window.addEventListener("keydown", (event) => {
        if (event.code === "ArrowLeft" || event.code === "KeyA") {
          this.leftPressed = true;
        }

        if (event.code === "ArrowRight" || event.code === "KeyD") {
          this.rightPressed = true;
        }

        if (event.code === "Space") {
          this.firePressed = true;
          event.preventDefault();
        }

        if (event.code === "Enter") {
          this.confirmPressed = true;
        }
      });

      window.addEventListener("keyup", (event) => {
        if (event.code === "ArrowLeft" || event.code === "KeyA") {
          this.leftPressed = false;
        }

        if (event.code === "ArrowRight" || event.code === "KeyD") {
          this.rightPressed = false;
        }

        if (event.code === "Space") {
          this.firePressed = false;
        }

        if (event.code === "Enter") {
          this.confirmPressed = false;
        }
      });
    }
  }

  window.MarcsGame = window.MarcsGame || {};
  window.MarcsGame.InputHandler = InputHandler;
})();
