document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    // canvas capa trasera
    let canvas2 = document.querySelector('#canvas-layer2');
    let ctx2 = canvas2.getContext('2d');

    // canvas capa delantera
    let canvas1 = document.querySelector('#canvas-layer1');

    // Manejo del menú
    let buttonJugar = document.querySelector('#js-btn-jugar');

    // --
    let tablero = new Tablero(ctx2);
    let juego = new Juego(tablero, canvas1);

    let creacionEventListeners = false;

    buttonJugar.addEventListener('click', (e) => {
        activebuttonJugar();

    });

    // inicia un nuevo juego
    function activebuttonJugar() {

        juego.iniciarJuego();

        // los eventListeners se crean por unica vez
        if (!creacionEventListeners) {
            canvas1.addEventListener('mousedown', onMouseDown, false);
            window.addEventListener('mouseup', onMouseUp, false);
            canvas1.addEventListener('mousemove', onMouseMove, false);
            creacionEventListeners = true;
        }

        function onMouseDown(e) {
            juego.onMouseDown(e);
        }

        function onMouseMove(e) {
            juego.onMouseMove(e);
        }

        function onMouseUp(e) {
            juego.onMouseUp(e);
        }
    }


});