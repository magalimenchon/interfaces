"use strict";
class Game {

    constructor() {
        this.objects = new Array();
        this.end = false;
        this.avatar = new Avatar();
        this.obstacles = new Array();
        this.DOMGame = document.querySelector('#game-js');
    }

    startGameLoop() {
        // startGame();
        console.log("empezo el juego");
        this.renderStartGame();
        this.createObstacles();

        let gameLoop = setInterval(() => {
            // processInput();
            this.updateStates();
            this.detectCollision();
            // draw();

            setTimeout(() => { this.end = true }, 60000);

            if (this.end) {
                //clearInterval(generateObstaclesLoop);
                clearInterval(gameLoop);
                console.log("termino el juego");
            }
        }, 50);

        // endGame();
    }

    createObstacles() {
        let max = 4000;
        let min = 700;
        let randomTime = Math.floor(Math.random() * (max - min)) + min;

        let objMax = 4;
        let objMin = 1;
        let type = Math.floor(Math.random() * (objMax - objMin)) + objMin;

        let obs = new Obstacle();
        obs.init(type);
        this.obstacles.push(obs);

        setTimeout(() => { this.createObstacles() }, randomTime);
    }

    detectCollision() {

        this.obstacles.forEach((obstacle) => {
            if (this.avatar.right > obstacle.left 
                && this.avatar.left < obstacle.right 
                && this.avatar.bottom > obstacle.top) {
                console.log("colision");
                // retornar obstaculo
            }
        })
    }

    updateStates() {
        this.avatar.updatePositions();

        this.obstacles.forEach((obstacle) => {
            obstacle.updatePositions();
            if (obstacle.left < 0) {
                this.obstacles.shift();
            }
        })
    }

    renderStartGame() {
        this.renderRemoveMenu();
        //Se agrega el avatar
        this.renderAvatar();
    }

    renderRemoveMenu() {
        this.DOMGame.classList.remove("general-info");
        this.DOMGame.classList.add("game");
        //Se modifica sector cartel runner
        this.renderRemoveFlyerRunner();
        //Se modifica el sector cartel principal info
        this.renderRemoveFlyerPrincipal();
    }

    renderRemoveFlyerPrincipal() {
        const flyerPrincipal = this.DOMGame.lastChild.previousSibling;
        this.DOMGame.removeChild(flyerPrincipal);
    }
    renderRemoveFlyerRunner() {
        const flyerRunner = this.DOMGame.firstChild.nextSibling;
        flyerRunner.classList.remove("information");
        flyerRunner.removeChild(flyerRunner.firstChild.nextSibling);
    }

    renderAvatar() {
        const avatar = document.querySelector('#avatar');
        avatar.classList.remove("hidden");
    }

    processInput(event) {
        if (event.key.toLowerCase() == "w") {
            this.avatar.jump();
        }
    }


}

