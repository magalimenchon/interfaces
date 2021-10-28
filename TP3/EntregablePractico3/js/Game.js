"use strict";
class Game {

    constructor() {
        this.objects = new Array();
        this.end = false;
        this.avatar = new Avatar();
        this.obstacles = new Array();
        this.GUI = new GUI();
    }

    initGame(){
        this.GUI.renderInitGame();
        this.showChoiceStyleGame();
    }

    showChoiceStyleGame(){
        this.GUI.renderChoicesOptionsGame();
        const buttonPlay = document.querySelector('#button-finish-custom-js');
        buttonPlay.addEventListener('click', () => {
            this.showInstructions();
        });
        const buttonChangeBackground = document.querySelector('#button-custom-background-js');
        buttonChangeBackground.addEventListener('click', () => {
            this.GUI.toogleBackground(buttonChangeBackground);
        });

        const buttonChangeAvatar = document.querySelector('#button-custom-avatar-js');
        buttonChangeAvatar.addEventListener('click', () => {
            this.GUI.toogleAvatar(buttonChangeAvatar);
        });
    
    }

    showInstructions(){
        this.GUI.renderInstructions();
        const buttonStartGame = document.querySelector('#button-start-game-js');
        buttonStartGame.addEventListener('click', () => {
            this.playGame();
        });
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

    startGame() {
        console.log("empezo el juego");
        this.GUI.renderStartGame();
        this.createObstacles();
    }

    endGame() {
        this.goDieAvatar();
        this.GUI.renderGameOver();
        this.stopObstacles();

        const buttonPlay = document.querySelector('#button-play-again-js');
        buttonPlay.addEventListener('click', () => {
            this.GUI.renderResetGame();
            this.resetGame();
        });
    }

    resetGame(){
        this.GUI.renderResetGame();
        this.resetFieldsGame();
        this.showChoiceStyleGame();
       // this.playGame();
       

    }

    resetFieldsGame(){
        this.objects = new Array();
        this.end = false;
        //this.avatar = new Avatar();
        this.avatar = this.avatar.relive();
        this.obstacles = new Array();
    }

    stopObstacles() {
        this.obstacles.forEach((obstacle) => {
            let DOMobstacle = document.getElementById(obstacle.id);
            if (DOMobstacle)
                DOMobstacle.style.animationPlayState = "paused";
        })
    }

    goDieAvatar() {
        this.avatar.die();
    }

    createObstacles() {
        let max = 4000;
        let min = 700;
        let randomTime = Math.floor(Math.random() * (max - min)) + min;



        if (!this.end) {
            let obs = new Obstacle();
            obs.init();
            this.obstacles.push(obs);

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

