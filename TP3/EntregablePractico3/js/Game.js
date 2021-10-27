"use strict";
class Game {

    constructor() {
        this.objects = new Array();
        this.end = false;
        this.avatar = new Avatar();
        this.obstacles = new Array();
        this.GUI = new GUI();
    }

    playGame() {
        this.startGame();

        let gameLoop = setInterval(() => {
            // processInput();
            this.updateStates();
            this.detectCollision();
            // draw();

            setTimeout(() => {
                this.GUI.setMessage("GAME OVER", "Congratulations, you won!");
                this.end = true;
            }, 60000);

            if (this.end) {
                //clearInterval(generateObstaclesLoop);
                //this.GUI.renderGameOver();
                this.endGame();
                clearInterval(gameLoop);
                console.log("termino el juego");
            }
        }, 50);

        //this.endGame();
    }

    startGame(){
        console.log("empezo el juego");
        this.GUI.renderStartGame();
        this.createObstacles();
    }
    
    endGame(){
        this.goDieAvatar();
        this.GUI.renderGameOver();
    }

    goDieAvatar(){
        this.avatar.die();
    }

    createObstacles() {
        let max = 4000;
        let min = 700;
        let randomTime = Math.floor(Math.random() * (max - min)) + min;

        let obs = new Obstacle();
        obs.init();
        this.obstacles.push(obs);
        if(!this.end){
            setTimeout(() => { this.createObstacles() }, randomTime);
        }
    }

    detectCollision() {

        this.obstacles.forEach((obstacle) => {
            if (this.avatar.right > obstacle.left
                && this.avatar.left < obstacle.right
                && this.avatar.bottom > obstacle.top) {
                console.log("colision");
                this.end = true;
                this.GUI.setMessage("GAME OVER");
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

    processInput(event) {
        if (event.key.toLowerCase() == "w") {
            this.avatar.jump();
        }
    }

}

