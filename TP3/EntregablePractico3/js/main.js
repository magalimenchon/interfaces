document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /**
     *  --------------- CONSTANTES --------------- 
     */
    
    const buttonPlay = document.querySelector('#button-play-js');
    /**
     * --------------- EVENTS LISTENERS --------------- 
     */

     

    let nuevoJuego = new Game();

    buttonPlay.addEventListener('click', () => {
        nuevoJuego.playGame();
    });

    document.addEventListener('keydown', (e) => {
        nuevoJuego.processInput(e);
    });


});