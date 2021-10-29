"use strict";
class Game {

    constructor() {
        this.assets = new Array();
        this.end = false;
        this.avatar = new Avatar();
        this.GUI = new GUI();
        this.timeOut;
        this.timeLimit = 0;
        this.score = 0;
        this.collectibleId;
    }

    /**
     * Renderiza el inicio del juego con la GUI y muestra la pantalla de opciones de customización
     */
    initGame() {
        this.GUI.renderInitGame();
        this.showChoiceStyleGame();
    }

    /**
     * Genera dinámicamente los elementos en el DOM para mostrar la pantalla de opciones
     * de customización por medio de la GUI y responde a diferentes eventos:
     * 1. La finalización de la customización y proseguir a kas instrucciones del juego.
     * 2. La alternancia del modo de fondo o escenario, cambiando a diurno o nocturno.
     * 3. La alternancia del tipo de avatar, cambiando a cowboy o cowgirl.
     */
    showChoiceStyleGame() {
        this.GUI.renderChoicesOptionsGame();
        const buttonReady = document.querySelector('#button-finish-custom-js');
        buttonReady.addEventListener('click', () => {
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

    /**
     * Renderiza las pantalla de instrucciones por medio de la GUI y
     * responde al evento de click del botón para poner iniciar la nueva partida.
     */
    showInstructions() {
        this.GUI.renderInstructions();
        const buttonStartGame = document.querySelector('#button-start-game-js');
        buttonStartGame.addEventListener('click', () => {
            this.playGame();
        });
    }

    /**
     * Maneja la nueva partida del juego en 3 grandes partes:
     * 1. Comienzo: donde se renderiza lo correspondiente para poder jugar y
     *              se crean los objetos tales como obstáculos y coleccionables,
     *              así como generar el límite de tiempo de la partida.
     * 2. Loop: chequeo continuo de lo que sucede en la partida por intervalos
     *          de tiempo para actualizar el estado del avatar y detectar colisiones.
     * 3. Finalización: dentro del loop se controla si se ha finalizado por el límite de tiempo
     *                  y se notifica al usuario del estado del juego.
     */
    playGame() {

        this.startGame();

        let gameLoop = setInterval(() => {
            this.updateStates();
            this.detectCollision();

            if (this.end) {
                clearInterval(gameLoop);
                this.endGame();
                console.log("termino el juego");
            }
        }, 50);

    }

    /**
     * Renderiza lo correspondiente para poder jugar y se crean los objetos tales
     * como obstáculos y coleccionables, así como generar el límite de tiempo de la partida.
     */
    startGame() {
        console.log("empezo el juego");
        this.GUI.renderStartGame();
        this.createAssets();
        this.getLimitTime();
    }

    /**
     * Finaliza el juego y setea en la interfaz gráfica de usuario lo que debe notificar al usuario
     * cuando se ejecuta el thread del setTimeOut
     */
    getLimitTime() {
        // this.timeOut = setTimeout(() => {
        //     this.GUI.setMessage("GAME OVER", "Congratulations, you won!");
        //     this.end = true;
        // }, 50000);

        this.timeOut = setInterval(() => {
            this.timeLimit += 1000;
            if (this.timeLimit == 50000) {
                this.GUI.setMessage("GAME OVER", "Congratulations, you won!");
                this.end = true;
                clearInterval(this.timeOut);
            }
        }, 1000);
    }

    /**
     * Renderiza una pausa del juego ya que este ha terminado.
     * Si el avatar colisiona con un obstáculo muestra la animación de la secuencia de muerte.
     * Responde al evento del click en botón de volver a jugar y genera una nueva partida.
     */
    endGame() {
        if (this.GUI.info != "Congratulations, you won!") {
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

    /**
     * Reinicia los atributos de la clase y regresa nuevamente
     * al estado de la pantalla de opciones de custiomización
     */
    resetGame() {
        this.resetFieldsGame();
        this.showChoiceStyleGame();
    }

    /**
     * Reinicia los atributos de la clase y restaura las clases de la hoja de estilos
     *  que hace que animen al avatar corriendo
     */
    resetFieldsGame() {
        this.GUI = new GUI();
        this.avatar = this.avatar.revive();
        this.avatar = new Avatar();
        this.assets = new Array();
        this.end = false;
        this.score = 0;
        this.timeLimit = 0;
    }

    /**
     * Pausa la animación de desplazamiento de los objetos que son obstaculos y coleccionables
     * al cambiar el estado del juego para demostrar que finalizó la partida.
     */
    stopAssets() {
        this.assets.forEach((asset) => {
            let DOMasset = document.getElementById(asset.id);
            if (DOMasset)
                DOMasset.style.animationPlayState = "paused";
        })
    }

    /**
     * Crea en tiempos aleatorios diferentes divs con clases que representan
     * a un objeto random que puede ser obstáculo o coleccionable.
     */
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

                if (asset.type == "collectible") {
                    asset.DOMasset.style.animation = "collect 1s ease-out, asset 3.82s linear forwards";
                    this.updateScore(asset);
                }
                else {
                    this.end = true;
                    this.GUI.setMessage("GAME OVER", "Do you want to try again?");
                }
            }
        })
    }

    updateScore(asset) {
        if (asset.id != this.collectibleId) {
            this.score++;
            this.collectibleId = asset.id;
            this.GUI.updateScoreInGame(this.score);
        }
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

    /**
     * Chequea que la tecla presionada sea la w y activa la animación de salto del avatar.
     * @param {event} event Evento de presionar una tecla
     */
    processInput(event) {
        if (event.key.toLowerCase() == "w") {
            this.avatar.jump();
        }
    }

}

