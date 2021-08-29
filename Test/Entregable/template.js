document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina() {
    "use strict";


    /*---------------start------------------------*/


    //VARIABLES

    //--Context--
    let canvas = document.querySelector('#myCanvas');
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    let imageData = ctx.createImageData(width, height);

    //INVOCACIONES FUNCIONES
    drawRectangle(imageData, r, g, b, a);
    ctx.putImageData(imageData, 0, 0);

    /*---------------functions------------------------*/


}