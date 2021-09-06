/*document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina() {*/
    "use strict";

    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    const CANT_FIG = 30;

    let figures = [];
    let lastClickedFigure = null;
    //flag
    let isMouseDown = false;

    function addFigure(){
        if(Math.random() > 0.5){
            addRect();
        }
        else{
            addCircle();
        }
        drawFigure();
    }

    function drawFigure(){
        clearCanvas();
        for (let i = 0; i < figures.length; i++) {
            figures[i].draw();
        }
    }

    //#region AddFigures
    function addRect(){
        let posX = Math.round(Math.random() * canvasWidth);
        let posY = Math.round(Math.random() * canvasHeight);
        let color = randomRGBA();

        let rect = new Rect(posX, posY, 20, 20, color, ctx);
        figures.push(rect);
    }

    function addCircle(){
        let posX = Math.round(Math.random() * canvasWidth);
        let posY = Math.round(Math.random() * canvasHeight);
        let color = randomRGBA();

        let circle = new Circle(posX, posY, 10, color, ctx);
        figures.push(circle);
    }
    //#endregion

    function onMouseDown(e){
        isMouseDown = true;

        //si ya hay una figura seleccionada y con down "la dejé de seleccionar" --> la des-resalto.
        if(lastClickedFigure != null){
            lastClickedFigure.setResaltado(false);
            lastClickedFigure = null;
        }
        //busca si dentro de todas las figuras, alguna fue clickeada
        //el parámetro 'e', viene por defecto en todos los eventos, es el MouseEvent.
        //Trae un montón de posiciones de x e y del mouse, ya que es diferente la posición de
        //(x, y) dentro de la pantalla, dentro del elemento en el que estoy (canvas), etc.
        let clickFig = findClickedFigure(e.layerX, e.layerY);//coordenadas de x e y adentro del canv
        
        //si encontró algo, se resalta y se guarda la última seleccionada. 
        if(clickFig != null){
            clickFig.setResaltado(true);
            lastClickedFigure = clickFig;
        }
        //dibujo todas las figuras
        drawFigure();
    }

    function onMouseUp(e){
        isMouseDown = false;
    }

    function onMouseMove(e){
        //si el mouse está abajo y tengo una figura seleccionada, la puedo "desplazar" =>
        //a la figura seleccionada se le setea la nueva posición
        //se vuelve a renderizar.
        if(isMouseDown && lastClickedFigure != null){
            lastClickedFigure.setPosition(e.layerX, e.layerY);
            drawFigure();
        }
    }

    //#regionUtil
    function clearCanvas(){
        ctx.fillStyle = '#F8F8FF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    function randomRGBA(){
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        let a = 255;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    function addFigures(){
        addFigure();
        if(figures.length < CANT_FIG){
            setTimeout(addFigures, 333);
        }
    }
    //#endregion

    setTimeout( () =>{
        addFigures();
    }, 333);

    function findClickedFigure(x, y){
        for (let i = 0; i < figures.length; i++) {
            const element = figures[i];
            if(element.isPointInside(x, y)){
                return element;
            }
        }
    }

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
//}