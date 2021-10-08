document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    let tablero = null;
    let juego = null;
    // // canvas capa trasera
    // let canvas3 = document.querySelector('#canvas-layer3');
    // let ctx3 = canvas3.getContext('2d');

    // canvas capa media
    let canvas2 = document.querySelector('#canvas-layer2');
    let ctx2 = canvas2.getContext('2d');

    // canvas capa delantera
    let canvas1 = document.querySelector('#canvas-layer1');
    // let ctx1 = canvas1.getContext('2d');

    //Manejo del menú
    let buttonReiniciar = document.querySelector('#js-btn-reiniciar');
    let buttonJugar = document.querySelector('#js-btn-jugar');
    // let gameMod = document.querySelector('#js-select-gameMod');
    // let colorP1 = document.querySelector('#js-input-color1');
    // let colorP2 = document.querySelector('#js-input-color2');

    // la altura y el ancho es igual para los 3 canvas superpuestos

    // como las canvas estan superpuestos aplico los listeners a la capa delantera
    // canvas1.addEventListener('mousedown', onMouseDown, false);
    // window.addEventListener('mouseup', onMouseUp, false);
    // canvas1.addEventListener('mousemove', onMouseMove, false);


    buttonJugar.addEventListener('click', () => {
        activebuttonJugar();

    });

    function activebuttonJugar(){
        tablero = new Tablero(ctx2);
        juego = new Juego(tablero, canvas1);

        juego.iniciarJuego();
        
        //buttonJugar.className = "hidden";
        buttonReiniciar.classList.remove("hidden");

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

    buttonReiniciar.addEventListener('click', () => {
        tablero = new Tablero(ctx2);
        new Juego(tablero, canvas1);
        //addFichas();
    });


});