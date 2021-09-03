document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina() {
    "use strict";

    /* 6 - Pintar un rectángulo en pantalla,
    utilizando tres o cuatro colores en un gradiente.
    Los tres colores deben ser armonías tonales.
    Puede ser en el eje X o Y. 


    a - De violeta a rosa en la primer mitad:
        (desplazamiento eje x), de RGB(72, 48, 118) a RGB(149, 51, 89)

    b - De rosa a verde, en la segunda mitad:
        (desplazamiento eje x), de RGB(149, 51, 89) a RGB(109, 156, 54)

    c - De verde a amarillo en la tercera mitad:
        (desplazamiento eje x), de RGB(109, 156, 54) a RGB(172, 158, 59)

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
    let r = 72;
    let g = 48;
    let b = 118;
    let a = 255;

    //--Gradient--
    let coefficient = 255 / (width / 3);

    //INVOCACIONES FUNCIONES
    
    drawRectangle(imageData, r, g, b, a);
    ctx.putImageData(imageData, 0, 0);


    /*---------------functions------------------------*/

    function drawRectangle(imageData, r, g, b, a){
        for (let x = 0; x < width; x++) {
            //Incremento los valores de RGB (en escala de grises) y distribuyo el color
            //con respecto al coeficiente. El color debe ir de 0 a 255 pero
            //en proporción al ancho del contexto.

           /* a - De violeta a rosa en la primer mitad: RGB(72, 48, 118) a RGB(149, 51, 89) */
            if(x <= width / 3){
                r = r + x * ((149-72)/((width/3) * (255)));
                g = g + x * ((51-48)/((width/3) *(255)));
                b = b - x *((118-89)/((width/3) *(255)));
                console.log(r +","+g +","+b);
            }
           /* b - De rosa a verde, en la segunda mitad: RGB(149, 51, 89) a RGB(109, 156, 54) */
            else if(x <= width * (2/3)){
                
                r = r - ((149-109)/((width/3) * (255)));
                g = g + x * ((156-51)/((width/3) * (255)));
                b = b - ((89-54)/((width/3) * (255)));
            } else{
          /* c - De verde a amarillo en la tercera mitad: RGB(109, 156, 54) a RGB(172, 158, 59) */
                r = r + x * ((172-109)/((width/3) * (255)));
                g = g + x * ((158-156)/((width/3) * (255)));
                b = b + x * ((59-54)/((width/3) * (255)));
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