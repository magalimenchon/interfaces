document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina() {
    "use strict";

    /* 4 - Especificar la función para pintar un cuadrado utilizando un gradiente de la siguiente forma: 
     (desplazamiento eje y), de RGB(0, 0, 0) a RGB(255, 255, 255)
    */
    /*---------------start------------------------*/


    //VARIABLES

    //--Context--
    let canvas = document.querySelector('#myCanvas');
    let ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    let imageData = ctx.createImageData(width, height);

    //--Color--
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 255;

    //--Gradient--
    const coefficient = 255 / height;

    //INVOCACIONES FUNCIONES
    drawRectangle(imageData, r, g, b, a);
    ctx.putImageData(imageData, 0, 0);

    /*---------------functions------------------------*/

    function drawRectangle(imageData, r, g, b, a){
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                //Incremento los valores de RGB (en escala de grises) y distribuyo el color
                //con respecto al coeficiente. El color debe ir de 0 a 255 pero
                //en proporción al largo del contexto.
                 let color = y * coefficient;
                 setPixel(imageData, x, y, color, color, color, a);
            }
            
        }
    }

    function setPixel(imageData, x, y, r, g, b, a) {
        let index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }

}