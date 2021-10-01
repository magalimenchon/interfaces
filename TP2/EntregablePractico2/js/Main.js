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
    const table = new Tablero(7, 6);
    console.log(table.getMatrix());


    let figures = [];
    let lastClickedFicha = null;
    let isMouseDown = false;

    function addFichas(){

        let ficha1 = new Ficha(600, 100, "#FF0000", ctx2);
        let ficha2 = new Ficha(600, 200, "#FFFF00", ctx2);

        figures.push(ficha1);
        figures.push(ficha2);

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
        //busca si dentro de todas las figuras, alguna fue clickeada
        //el parámetro 'e', viene por defecto en todos los eventos, es el MouseEvent.
        //Trae un montón de posiciones de x e y del mouse, ya que es diferente la posición de
        //(x, y) dentro de la pantalla, dentro del elemento en el que estoy (canvas), etc.
        let clickFig = findClickedFigure(e.layerX, e.layerY);//coordenadas de x e y adentro del canv
        
        //si encontró algo, se resalta y se guarda la última seleccionada. 
        if(clickFig != null){
            clickFig.setResaltado(true);
            lastClickedFicha = clickFig;
        }
        //dibujo todas las figuras
        drawFicha();
    }

    // dibuja en la capa 2
    function drawFicha(){
        clearCanvas();
        for (let i = 0; i < 2; i++) {
            figures[i].draw();
        }
    }

    // borra en la capa 2
    function clearCanvas(){
        ctx2.fillStyle = "rgba(255, 255, 255, 1)";
        ctx2.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    
    function onMouseUp(e){
        isMouseDown = false;
    }

    function onMouseMove(e){
        //si el mouse está abajo y tengo una figura seleccionada, la puedo "desplazar" =>
        //a la figura seleccionada se le setea la nueva posición
        //se vuelve a renderizar.
        if(isMouseDown && lastClickedFicha != null){
            lastClickedFicha.setPosition(e.layerX, e.layerY);
            drawFicha();
        }
    }

    function findClickedFigure(x, y){
        for (let i = 0; i < figures.length; i++) {
            const element = figures[i];
            if(element.isPointInside(x, y)){
                return element;
            }
        }
    }

    // dibuja el tablero en el canvas
    function drawTablero(){
        let iniX = 20;
        let iniY = 20;
        let width = 500;
        let height = 450;
        let radius = 30;

        // dibujo un rectangulo azul en la capa 1
        ctx1.fillStyle = "rgba(80, 80, 255, 1)";
        ctx1.fillRect(iniX, iniY, width, height);

        // dibuja algunas transparencias en la capa 1 (no funciona bien)
        ctx1.fillStyle = "rgba(255, 255, 255, 1)";
       // ctx1.beginPath();
       //Deberian pasarse a la hora de construir el tablero
       const maxX= 7;
       const maxY = 6;
       const widthPixelsTablero = width - iniX;
       const heightPixelsTablero = height - iniY;
       //----------Habria que guardar cada circulo en la matriz?
        for (let x = 0; x < maxX; x++) {
            for (let y = 0; y < maxY; y++) {
                ctx1.beginPath();
                //ctx1.arc(iniX * 3 +(x*70), iniY * 3 +(y*75), radius, 0, 2 * Math.PI);
                ctx1.arc(x * (widthPixelsTablero/maxX) + (widthPixelsTablero/maxX),
                                y * (heightPixelsTablero/maxY) + (heightPixelsTablero/maxX), radius, 0, 2 * Math.PI);
                //ctx1.arc(iniX *3*x, iniY*3*x, radius, 0, 2 * Math.PI);
                ctx1.fill();
                ctx1.closePath();
            }
            
        }
        /*ctx1.arc(iniX *3, iniY*3, radius, 0, 2 * Math.PI);
        ctx1.arc(iniX *3*2, iniY*3*2, radius, 0, 2 * Math.PI);
        ctx1.arc(iniX *3*3, iniY*3*3, radius, 0, 2 * Math.PI);
        ctx1.arc(iniX *3*4, iniY*3*4, radius, 0, 2 * Math.PI);*/
        /*ctx1.fill();
        ctx1.closePath();*/
        //QUITAR PARA VER LOS ESPACIOS
        drawFichasEnTablero(maxX, maxY, widthPixelsTablero,  heightPixelsTablero);
    }

    //Prueba de renderizar todas las fichas en el tablero
    function drawFichasEnTablero(maxX, maxY, widthPixelsTablero,  heightPixelsTablero){
        // ctx1.beginPath();
       //Deberian pasarse a la hora de construir el tablero
      /* const maxX= 7;
       const maxY = 6;
       const widthPixelsTablero = width - iniX;
       const heightPixelsTablero = height - iniY;*/
       //----------Habria que guardar cada circulo en la matriz?
        for (let x = 0; x < maxX; x++) {
            for (let y = 0; y < maxY; y++) {
                ctx1.beginPath();
                //ctx1.arc(iniX * 3 +(x*70), iniY * 3 +(y*75), radius, 0, 2 * Math.PI);
                let ficha1 = new Ficha(x * (widthPixelsTablero/maxX) + (widthPixelsTablero/maxX),
                y * (heightPixelsTablero/maxY) + (heightPixelsTablero/maxX), "#FF0000", ctx1);
                ficha1.draw();
                ctx1.fill();
                ctx1.closePath();
            }
            
        }
    }

    //Dibujar una ficha en la posición dada
    function drawFichasEnTablero(maxX, maxY, widthPixelsTablero,  heightPixelsTablero){
        // ctx1.beginPath();
       //Deberian pasarse a la hora de construir el tablero
      /* const maxX= 7;
       const maxY = 6;
       const widthPixelsTablero = width - iniX;
       const heightPixelsTablero = height - iniY;*/
       //----------Habria que guardar cada circulo en la matriz?
        for (let x = 0; x < maxX; x++) {
            for (let y = 0; y < maxY; y++) {
                ctx1.beginPath();
                //ctx1.arc(iniX * 3 +(x*70), iniY * 3 +(y*75), radius, 0, 2 * Math.PI);
                let ficha1 = new Ficha(x * (widthPixelsTablero/maxX) + (widthPixelsTablero/maxX),
                y * (heightPixelsTablero/maxY) + (heightPixelsTablero/maxX), "#FF0000", ctx1);
                ficha1.draw();
                ctx1.fill();
                ctx1.closePath();
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
        ctx1.fill();
        ctx1.closePath();


        //Opcion 2:
        //Matriz render sería una matriz que guarda una estructura completa de fichas,
        //que conforme tiran las fichas le cambia la imagen, pero 
        ficha = matrixRender[celdaPosX][celdaPosY];
        ficha.setFill(fillFicha);
        ficha.draw();
        
    }




    drawTablero();

    addFichas();

    // como las canvas estan superpuestos aplico los listeners a la capa delantera
    canvas1.addEventListener('mousedown', onMouseDown, false);
    canvas1.addEventListener('mouseup', onMouseUp, false);
    canvas1.addEventListener('mousemove', onMouseMove, false);
});