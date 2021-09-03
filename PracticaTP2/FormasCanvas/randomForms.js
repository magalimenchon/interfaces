document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina() {
    "use strict";

    /*---------------start------------------------*/


    //VARIABLES

    //--Context--
    let canvas = document.querySelector('#myCanvas');
    let ctx = canvas.getContext("2d");
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
   // let cantFigures = 10;
    //let imageData = ctx.createImageData(width, height);

    //INVOCACIONES FUNCIONES
    drawRandomFigures();
   // ctx.putImageData(imageData, 0, 0);

    /*-----------------events--------------------------*/

    /*---------------functions------------------------*/
    function drawRandomFigures(){

        //let xPosRandomWidth = Math.round(Math.random * canvasWidth);
        //let yPosRandomHeight = Math.round(Math.random * canvasHeight);

        //CIRCULOS
        for (let index = 0; index < 10; index++) {
            ctx.fillStyle = randomRGBA();
            console.log(ctx.fillStyle);
            ctx.beginPath();
            ctx.arc(Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight), 20, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
        //RECTANGULOS
        for (let index = 0; index < 10; index++) {
            ctx.fillStyle = randomRGBA();
            ctx.fillRect(Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight), 50, 0);
        }
    }
    function randomRGBA(){
       // let randomColor = Math.round(Math.random() * 255);
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        let a = 255;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
       // return "rgba("+ r + "," + g + "," + b + ", " + a + ")";
    }

}