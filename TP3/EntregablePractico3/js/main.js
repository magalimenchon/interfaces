document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /**
     *  --------------- CONSTANTES --------------- 
     */
    const avatar = document.querySelector('#avatar');
    const buttonPlay = document.querySelector('#button-play-js');
    const containerMenu = document.querySelector('#menu-js');
    const containerGame = document.querySelector('#game-js');
    /**
     * --------------- EVENTS LISTENERS --------------- 
     */

    document.addEventListener('keydown', processInput);

    avatar.addEventListener('animationend', restartAnimation);


    // let nuevoJuego = new Game();

    // nuevoJuego.startGameLoop();

    /**
    * GAME
    */
    function processInput(event) {
        if (event.key.toLowerCase() == "w") {
            jump();
        }
    }

    /**
     * MENU
     */
    buttonPlay.addEventListener('click', startGame);

    avatar.addEventListener('animationend', restartAnimation);

    /**
     * --------------- FUNCTIONS --------------- 
     */

    /**
     * MENU
     */
    function startGame() {
        changeMenuForGame();
        //quizas se deban agregar mas cuestiones del juego
        //como el temporizador, la seleccion del avatar y fondo, etc
    }

    function changeMenuForGame() {
        containerMenu.classList.remove("general-info");
        containerMenu.classList.add("hidden");
        //lo siguiente seria crear una instancia de un nuevo juego:
        //-----------
        //Chequear que toma el evento de la tecla w igual, aunque no este el juego renderizado
        //-------
        containerGame.classList.remove("hidden");
        containerGame.classList.add("game");
    }


    function jump() {
        avatar.classList.add("jumping");
        console.log("saltando");
        console.log(avatar.getAttribute("background"));

    }

    function restartAnimation() {
        avatar.classList.remove("jumping");
        console.log("deja de saltar");
        console.log(avatar.getAttribute("background"));
    }



});