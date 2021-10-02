document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    // canvas capa trasera
    let canvas3 = document.querySelector('#canvas-layer3');
    let ctx3 = canvas3.getContext('2d');

    // canvas capa media
    let canvas2 = document.querySelector('#canvas-layer2');
    let ctx2 = canvas2.getContext('2d');

    // canvas capa delantera
    let canvas1 = document.querySelector('#canvas-layer1');
    let ctx1 = canvas1.getContext('2d');

    // la altura y el ancho es igual para los 3 canvas superpuestos
    let canvasWidth = canvas3.width;
    let canvasHeight = canvas3.height;

    // instancia e imprime la matrix por consola
    const tablero = new Tablero(7, 6, ctx2);

    tablero.drawTablero();

    let fichas = [];
    let lastClickedFicha = null;
    let isMouseDown = false;

    function addFichas(){

        let ficha1 = new Ficha(650, 100, "#FF0000", ctx1);
        let ficha2 = new Ficha(650, 200, "#FFFF00", ctx1);

        fichas.push(ficha1);
        fichas.push(ficha2);

        ficha1.draw();
        ficha2.draw();
    }

    function onMouseDown(e){
        isMouseDown = true;

        //si ya hay una figura seleccionada y con down "la dejé de seleccionar" --> la des-resalto.
        if(lastClickedFicha != null){
            lastClickedFicha.setResaltado(false);
            lastClickedFicha = null;
        }
 
        let clickFig = findClickedFigure(e.layerX, e.layerY);//coordenadas de x e y adentro del canv
        
        //si encontró algo, se resalta y se guarda la última seleccionada. 
        if(clickFig != null){
            clickFig.setResaltado(true);
            lastClickedFicha = clickFig;
        }
        //dibujo todas las fichas
        drawFichas();
    }

    // dibuja en la capa 1
    function drawFichas(){
        clearCanvas();
        for (let i = 0; i < 2; i++) {
            fichas[i].draw();
        }
    }

    // borra en la capa 1
    function clearCanvas(){
        ctx1.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    
    function onMouseUp(e){
        isMouseDown = false;
        restartPosition();
        tablero.addFicha(e, lastClickedFicha);
    }

    function onMouseMove(e){
        //si el mouse está abajo y tengo una figura seleccionada, la puedo "desplazar" =>
        //a la figura seleccionada se le setea la nueva posición
        //se vuelve a renderizar.
        if(isMouseDown && lastClickedFicha != null){
            lastClickedFicha.setPosition(e.layerX, e.layerY);
            drawFichas();
        }
    }

    function restartPosition(){
        fichas[0].setPosition(650, 100);
        fichas[1].setPosition(650, 200);
        drawFichas();
    }

    function findClickedFigure(x, y){
        for (let i = 0; i < fichas.length; i++) {
            const element = fichas[i];
            if(element.isPointInside(x, y)){
                return element;
            }
        }
    }


    //Renderizar la ficha que tiró el jugador
    function drawFichaJugadaEnTablero(celdaPosX, celdaPosY, fillFicha){

        //Opcion 1:
        //Matriz render sería una matriz que guarda los datos de las posiciones
        //donde deberían ir todas las fichas
        //Dependiendo el jugador, se le setea el fill que le llega por parámetro

        //Punto del eje X que debe estar el centro de la ficha.
        matrixRender[celdaPosX][celdaPosY].posX;
        //Punto del eje Y que debe estar el centro de la ficha.
        matrixRender[celdaPosX][celdaPosY].posY;
        ctx1.beginPath();
        let ficha1 = new Ficha(posX, posY, fillFicha, ctx1);
        ficha1.draw();
     


        //Opcion 2:
        //Matriz render sería una matriz que guarda una estructura completa de fichas,
        //que conforme tiran las fichas le cambia la imagen, pero 
        ficha = matrixRender[celdaPosX][celdaPosY];
        ficha.setFill(fillFicha);
        ficha.draw();
        
    }

    addFichas();

    // como las canvas estan superpuestos aplico los listeners a la capa delantera
    canvas1.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);
    canvas1.addEventListener('mousemove', onMouseMove, false);
});