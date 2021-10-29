"use strict";
class Game {

    constructor() {
        this.assets = new Array();
        this.end = false;
        this.avatar = new Avatar();
        this.GUI = new GUI();
        this.timeOut;
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
        this.timeOut = setTimeout(() => {
            this.GUI.setMessage("GAME OVER", "Congratulations, you won!");
            this.end = true;
            
        }, 50000);

        let gameLoop = setInterval(() => {
            this.updateStates();
            this.detectCollision();

            if (this.end) {
                clearTimeout(this.timeOut);
                clearInterval(gameLoop);
                this.endGame();
                console.log("termino el juego");
            }
        }, 50);

    }

    startGame() {
        console.log("empezo el juego");
        this.GUI.renderStartGame();
        this.createAssets();
    }

    endGame() {
        if(this.GUI.info != "Congratulations, you won!"){
            this.avatar.die();
        }
        this.GUI.renderGameOver();
        this.stopAssets();

        const buttonPlay = document.querySelector('#button-play-again-js');
        buttonPlay.addEventListener('click', () => {
            this.GUI.renderResetGame();
            this.resetGame();
        });
    }

    resetGame(){
        this.resetFieldsGame();
        this.showChoiceStyleGame();
    }

    resetFieldsGame(){
        this.GUI = new GUI();
        this.avatar = this.avatar.revive();
        this.avatar = new Avatar();
        this.assets = new Array();
        this.end = false;
    }

    stopAssets() {
        this.assets.forEach((asset) => {
            let DOMasset = document.getElementById(asset.id);
            if (DOMasset)
                DOMasset.style.animationPlayState = "paused";
        })
    }

    createAssets() {
        let max = 4000;
        let min = 1000;
        let randomTime = Math.floor(Math.random() * (max - min)) + min;



        if (!this.end) {
            let asset = new Asset();
            asset.init();
            this.assets.push(asset);

            setTimeout(() => { this.createAssets() }, randomTime);
        }
    }

    detectCollision() {

        this.assets.forEach((asset) => {
            if (this.avatar.right > asset.left
                && this.avatar.left < asset.right
                && this.avatar.bottom > asset.top
                && this.avatar.top < asset.bottom) {

                if (asset.type == "collectible"){
                    asset.DOMasset.style.animation = "collect 1s ease-out, asset 3.82s linear forwards";
                    // aca va el score ++
                }
                else{
                    this.end = true;
                    this.GUI.setMessage("GAME OVER", "Do you want to try again?");
                }
            }
        })
    }

    updateStates() {
        this.avatar.updatePositions();

        this.assets.forEach((asset) => {
            asset.updatePositions();
            if (asset.left < 0) {
                this.assets.shift();
            }
        })
    }

    processInput(event) {
        if (event.key.toLowerCase() == "w") {
            this.avatar.jump();
        }
    }

}

