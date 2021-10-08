document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    // canvas capa trasera
    let canvas2 = document.querySelector('#canvas-layer2');
    let ctx2 = canvas2.getContext('2d');

    // canvas capa delantera
    let canvas1 = document.querySelector('#canvas-layer1');
    // let ctx1 = canvas1.getContext('2d');

    //Manejo del menú
    let buttonJugar = document.querySelector('#js-btn-jugar');
    

    buttonJugar.addEventListener('click', () => {
        activebuttonJugar();

    });

    function activebuttonJugar(){

        let tablero = new Tablero(ctx2);
        let juego = new Juego(tablero, canvas1);

        juego.iniciarJuego();

        canvas1.addEventListener('mousedown', onMouseDown, false);
        window.addEventListener('mouseup', onMouseUp, false);
        canvas1.addEventListener('mousemove', onMouseMove, false);

        function onMouseDown(e){
            juego.onMouseDown(e);
        }

        function onMouseMove(e){
            juego.onMouseMove(e);
        }

        function onMouseUp(e){
            juego.onMouseUp(e);
        }
    }


});