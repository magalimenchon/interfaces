document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina() {
    "use strict";

    /*  3- Pintar una región rectangular de un color utilizando la estructura de ImageData.  */

    /*---------------start------------------------*/


    //VARIABLES

    //--Context--
    let canvas = document.querySelector('#myCanvas');
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    let imageData = ctx.createImageData(width, height);

    //--Range element--
    let rangeR = document.querySelector('#js-r');
    let rangeG = document.querySelector('#js-g');
    let rangeB = document.querySelector('#js-b');
    let rangeA = document.querySelector('#js-a');

    //--Color Value--
    let r = document.querySelector('#js-r').value;
    let g = document.querySelector('#js-g').value;
    let b = document.querySelector('#js-b').value;
    let a = document.querySelector('#js-a').value;

    //--Outputs values--
    let outputR = document.querySelector('#value-r');
    let outputG = document.querySelector('#value-g');
    let outputB = document.querySelector('#value-b');
    let outputA = document.querySelector('#value-a');

    //INCONVOCACIONES FUNCIONES
    drawRectangle(imageData, r, g, b, a);
    ctx.putImageData(imageData, 0, 0);
    outputR.innerHTML = r;
    outputG.innerHTML = g;
    outputB.innerHTML = b;
    outputA.innerHTML = a;

    /*---------------functions------------------------*/

    //--CAMBIOS EN RANGO--
    rangeR.oninput = function () {
        outputR.innerHTML = this.value;
        r = this.value;
        updateRectangle();
    }
    rangeG.oninput = function () {
        outputG.innerHTML = this.value;
        g = this.value;
        updateRectangle();
    }
    rangeB.oninput = function () {
        outputB.innerHTML = this.value;
        b = this.value;
        updateRectangle();
    }
    rangeA.oninput = function () {
        outputA.innerHTML = this.value;
        a = this.value;
        updateRectangle();
    }


    //--RECTANGULO--

    function updateRectangle() {
        drawRectangle(imageData, r, g, b, a);
        //Indicamos al contexto que el imageData modificado
        //se coloque a partir de la posicion (0, 0) del contexto
        ctx.putImageData(imageData, 0, 0);
    }


    function drawRectangle(imageData, r, g, b, a) {
        for (let x = 0; x < width; x++) {

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