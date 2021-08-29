document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina() {
    "use strict";

    /* 5 - Pintar un rectángulo en pantalla,
    utilizando tres colores en un gradiente:
    De negro a amarillo en la primera mitad del ancho del rectángulo,
    y de amarillo a rojo, en la segunda mitad.
    Por otro lado, en Y el degrade se mantiene constante.  


    a - De negro a amarillo en la primera mitad del ancho del rectángulo
        (desplazamiento eje x), de RGB(0, 0, 0) a RGB(255, 255, 0)

    b - De amarillo a rojo, en la segunda mitad:
        (desplazamiento eje x), de RGB(255, 255, 0) a RGB(255, 0, 0)
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
    const coefficient = 255 / (width/ 2);

    //INVOCACIONES FUNCIONES
    drawRectangle(imageData, r, g, b, a);
    ctx.putImageData(imageData, 0, 0);

    /*---------------functions------------------------*/

    function drawRectangle(imageData, r, g, b, a){
        for (let x = 0; x < width; x++) {
            //Incremento los valores de RGB (en escala de grises) y distribuyo el color
            //con respecto al coeficiente. El color debe ir de 0 a 255 pero
            //en proporción al ancho del contexto.
            if(x <= width / 2){
                let color = x * coefficient;
                r = color;
                g = color;
            }
            else{
                g = g - coefficient;
            }
            for (let y = 0; y < height; y++) {
                 setPixel(imageData, x, y, r, g, b, a);
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