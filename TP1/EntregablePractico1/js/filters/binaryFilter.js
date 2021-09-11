document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    //---Elements---

    //Canvas
    const canvas = document.querySelector('#js-canvas');
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // boton select
    const selectButton = document.getElementById("js-select-filters");

    //Binary Filter
    const quantityCompositionColor = 3;
    const limit = 127/3;  //Promedio si fuese el gris.

    //---Functions---

    //#regionBinaryFilter

    
    function binaryFilter() {
        
        const imageData = ctx.getImageData(0, 0, width, height);
        let r, g, b, a;
        const black = 0;
        const white = 255;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                r = getRed(imageData, x, y);
                g = getGreen(imageData, x, y);
                b = getBlue(imageData, x, y);
                a = getOpacity(imageData, x, y);
                //promedio de los 3 parámwtros de color, para saber si se aproxima más a un color
                //claro (se pinta de blanco) u oscuro (se pinta de negro).
                let colorsAVG = (r + g + b) / quantityCompositionColor;
                if (colorsAVG < limit) {    //si es más oscuro, el limite es menor.
                    setPixel(imageData, x, y, black, black, black, a);
                }
                else {
                    setPixel(imageData, x, y, white, white, white, a);
                }
            }
        }
        /* Dibujar la información de píxeles en el lienzo.
           Si se proporciona un rectángulo solo se pintan los píxeles del mismo. */
        ctx.putImageData(imageData, 0, 0);
    }

    function setPixel(imageData, x, y, r, g, b, a) {
        /*Cada pixel está conformado por 4 parámetros de color, contenidos consecutivamente
        dentro del arreglo imageData. La relación de acceso entre la posición dentro del arreglo y la
        matriz gráfica está dada por la posición dentro de la fila y columna de cada pixel en la matriz
        y el ancho de la misma.*/
        const index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }

    function getRed(imageData, x, y) {
        //*************¿DEBERÍAN SER CONSTANTES EN VEZ DE LET?
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 0];
    }

    function getGreen(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 1];
    }

    function getBlue(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 2];
    }

    function getOpacity(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 3];
    }

    //#endRegion

    //#regionEvents
    selectButton.addEventListener('change', (e) => {
        if (e.target.value == "binary")
            binaryFilter();
    });
    //#endRegion
});