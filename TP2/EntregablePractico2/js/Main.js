document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    // // canvas capa trasera
    // let canvas3 = document.querySelector('#canvas-layer3');
    // let ctx3 = canvas3.getContext('2d');

    // canvas capa media
    let canvas2 = document.querySelector('#canvas-layer2');
    let ctx2 = canvas2.getContext('2d');

    // canvas capa delantera
    let canvas1 = document.querySelector('#canvas-layer1');
    let ctx1 = canvas1.getContext('2d');

    //Manejo del menú
    let buttonReiniciar = document.querySelector('#js-btn-reiniciar');
    let buttonJugar = document.querySelector('#js-btn-jugar');
    // let gameMod = document.querySelector('#js-select-gameMod');
    // let colorP1 = document.querySelector('#js-input-color1');
    // let colorP2 = document.querySelector('#js-input-color2');

    // la altura y el ancho es igual para los 3 canvas superpuestos
    let canvasWidth = canvas1.width;
    let canvasHeight = canvas1.height;

    // iniciarJuego
    // // instancia e imprime la matrix por consola
    // let matX = 7;
    // let matY = 6;

    // const tablero = new Tablero(matX, matY, ctx2);

    // tablero.drawTablero();

    let fichas = [];
    let lastClickedFicha = null;
    let isMouseDown = false;

    function addFichas() {

        let jugador1 = new Jugador("j1");
        let jugador2 = new Jugador("j2");

        let ficha1 = new Ficha(650, 100, "#FF0000", ctx1, jugador1);
        let ficha2 = new Ficha(650, 200, "#FFFF00", ctx1, jugador2);

        fichas.push(ficha1);
        fichas.push(ficha2);

        ficha1.draw();
        ficha2.draw();
    }

    function onMouseDown(e) {
        isMouseDown = true;

        if (lastClickedFicha != null) {
            lastClickedFicha.setResaltado(false);
            lastClickedFicha = null;
        }

        let clickFig = findClickedFigure(e.layerX, e.layerY);

        if (clickFig != null) {
            clickFig.setResaltado(true);
            lastClickedFicha = clickFig;
        }

        drawFichas();
    }

    // dibuja en la capa 1
    function drawFichas() {
        clearCanvas();
        for (let i = 0; i < 2; i++) {
            fichas[i].draw();
        }
    }

    // borra en la capa 1
    function clearCanvas() {
        ctx1.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function onMouseUp(e) {
        isMouseDown = false;
        restartPosition();
        tablero.addFicha(e, lastClickedFicha);
    }

    function onMouseMove(e) {
        //si el mouse está abajo y tengo una figura seleccionada, la puedo "desplazar" =>
        //a la figura seleccionada se le setea la nueva posición
        //se vuelve a renderizar.
        if (isMouseDown && lastClickedFicha != null) {
            lastClickedFicha.setPosition(e.layerX, e.layerY);
            drawFichas();
        }
    }

    function restartPosition() {
        fichas[0].setPosition(650, 100);
        fichas[1].setPosition(650, 200);
        drawFichas();
    }

    function findClickedFigure(x, y) {
        for (let i = 0; i < fichas.length; i++) {
            const element = fichas[i];
            if (element.isPointInside(x, y)) {
                return element;
            }
        }
    }

    addFichas();

    // como las canvas estan superpuestos aplico los listeners a la capa delantera
    canvas1.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);
    canvas1.addEventListener('mousemove', onMouseMove, false);


    buttonJugar.addEventListener('click', () => {
        let tablero = new Tablero(ctx2);
        new Juego(tablero);
        //addFichas();

    });

    buttonReiniciar.addEventListener('click', () => {
        let tablero = new Tablero(ctx2);
        new Juego(tablero);
        //addFichas();
    });


});