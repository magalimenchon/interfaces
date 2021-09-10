document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    //---Elements---

    //Canvas
    const canvas = document.querySelector('#js-canvas');
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const imageDataOriginal = ctx.getImageData(0, 0, width, height);

    // boton select
    const selectButton = document.getElementById("js-select-filters");


    //---Functions---

    //#regionBrightnessFilter
    //todavia no funciona
    function NonFilter(){

        const imageData = ctx.getImageData(0, 0, width, height);
        let r, g, b, a;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                r = getRed(imageDataOriginal, x, y);
                g = getGreen(imageDataOriginal, x, y);
                b = getBlue(imageDataOriginal, x, y);
                a = getOpacity(imageDataOriginal, x, y);

                setPixel(imageData, x, y, r, g, b, a);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function getRed(imageData, x, y) {
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

    function setPixel(imageData, x, y, r, g, b, a) {
        /*Cada pixel está conformado por 4 parámetros de color, contenidos consecutivamente
        dentro del arreglo imageData. La relación de acceso entre la posición dentro del arreglo y la
        matriz gráfica está dada por la posición dentro de la fila y columna de cada pixel en la matriz
        y el ancho de la misma.*/
        let index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }
    //#endRegion

    //#regionEvents
    selectButton.addEventListener('change', (e) => {
        /*if (e.target.value == "non")
            NonFilter();*/
    });
    //#endRegion
});