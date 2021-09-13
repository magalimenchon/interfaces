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
    const quantityCompositionColor = 3; //Cantidad de componentes de color del pixel
    const limit = 127;  //si fuese el gris.

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
                //promedio de los 3 parámetros de color, para saber si se aproxima más a un color
                //claro (se pinta de blanco) u oscuro (se pinta de negro).
                let colorsAVG = (r + g + b) / quantityCompositionColor;
                if (colorsAVG < limit) {    //si es más oscuro, el promedio es menor.
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

    /*Obtiene el dato de la coordenada de R en el arreglo de imageData del pixel determinado,
      que se encuentra en la posición 0 (inicial) en relación a sus 4 datos correspondientes. */
    function getRed(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 0];
    }

    /*Obtiene el dato de la coordenada de G en el arreglo de imageData del pixel determinado,
      que se encuentra en la posición 1 en relación a sus 4 datos correspondientes. */
    function getGreen(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 1];
    }

    /*Obtiene el dato de la coordenada de B en el arreglo de imageData del pixel determinado,
      que se encuentra en la posición 2 en relación a sus 4 datos correspondientes. */
    function getBlue(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 2];
    }

    /*Obtiene el dato de la coordenada de alpha en el arreglo de imageData del pixel determinado,
      que se encuentra en la posición 3 (última) en relación a sus 4 datos correspondientes. */
    function getOpacity(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 3];
    }

    //#endRegion

    //#regionEvents
    //Cuando cambia el selector a Binarización aplica el filtro correspondiente
    selectButton.addEventListener('change', (e) => {
        if (e.target.value == "binary")
            binaryFilter();
    });
    //#endRegion
});