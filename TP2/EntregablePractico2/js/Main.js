/**
 * @since Octubre, 2021
 * @version 1.0
 * @supported Testado en Chrome Versión 94.0.4606.71
 * @author Scaminaci, Luciano
 * @author Menchón, Magalí
 */
document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    // canvas capa trasera
    let canvas2 = document.querySelector('#canvas-layer2');
    let ctx2 = canvas2.getContext('2d');

    // canvas capa delantera
    let canvas1 = document.querySelector('#canvas-layer1');

    // Manejo del menú
    let buttonJugar = document.querySelector('#js-btn-jugar');

    // Instancias de clase
    let tablero = new Tablero(ctx2);
    let juego = new Juego(tablero, canvas1);

    //Control de eventos del DOM
    let creacionEventListeners = false;

    //Activación del botón jugar
    buttonJugar.addEventListener('click', (e) => {
        activebuttonJugar();

    });

    // Inicia un nuevo juego
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