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

    //GrayScale Filter
    const quantityCompositionColor = 3;


    //---Functions---

    //#regionGrayscaleFilter

    /*  Recorre cada pixel dado por las coordenadas del lienzo obtenido.
        Toma cada parámetro de color del pixel, calcula el promedio de RGB, y modifica cada
        coordenada RGB con este promedio. Finalmente se actualiza la imagen con esta información.*/
    function grayscaleFilter() {
        /* Retorna un objeto ImageData que representa los datos de píxeles para el área del lienzo.
           Las coordenadas se especifican en unidades espaciales de coordenadas del lienzo. 
         *@param sx coordenada 'x' de la esquina superior izquierda del contexto del que se extraeran los datos de la imagen.
         *@param sy coordenada 'y' de la esquina superior izquierda del rectángulo del que se extraerá el ImageData.
         *@param sw el ancho del contexto.
         *@paran sh el largo del lienzo.
        */
        const imageData = ctx.getImageData(0, 0, width, height);
        let r, g, b, a;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                r = getRed(imageData, x, y);
                g = getGreen(imageData, x, y);
                b = getBlue(imageData, x, y);
                a = getOpacity(imageData, x, y);
                //promedio de los 3 parámwtros de color, para que no sea solo escala de grises
                //dependiente de 1 solo parámetro.
                let grayAVG = (r + g + b) / quantityCompositionColor;
                setPixel(imageData, x, y, grayAVG, grayAVG, grayAVG, a);
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
    //Cuando cambia el selector a Escala de grises aplica el filtro correspondiente
    selectButton.addEventListener('change', (e) => {
        if (e.target.value == "gray-scale")
        grayscaleFilter();
    });
    //#endRegion
});