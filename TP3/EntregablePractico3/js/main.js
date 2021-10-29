document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /**
     *  --------------- VARIABLES Y CONSTANTES --------------- 
     */
    
    const buttonPlay = document.querySelector('#button-play-js');
    let nuevoJuego = new Game();

    /**
     * --------------- EVENT LISTENERS --------------- 
     */

    /**
     * Evento de click en botón de la pantalla de inicio que
     * lleva a la inicialización de un nuevo juego.
     */
    buttonPlay.addEventListener('click', () => {
        nuevoJuego.initGame();
    });

    /**
     * Evento de presionar cualquier tecla para evaluar
     * una posible acción/animación del avatar durante el juego.
     */
    document.addEventListener('keydown', (e) => {
        nuevoJuego.processInput(e);
    });


});