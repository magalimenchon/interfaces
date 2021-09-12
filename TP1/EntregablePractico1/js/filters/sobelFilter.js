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
    function sobelFilter() {

        let kernelDireccionX = [[-47, 0, 47],
                                [-162, 0, 162],
                                [-47, 0, 47]];
        
        let kernelDireccionY = [[-47, -162, -47],
                                [0, 0, 0],
                                [47, 162, 47]];

        const ctxImageData = ctx.getImageData(0, 0, width, height);

        var imageDataX = ctx.getImageData(0, 0, width, height);
        var imageDataY = ctx.getImageData(0, 0, width, height);

        const imageDataG = grayscaleFilter(ctxImageData);

        imageDataX = kernelMultiplication(imageDataG, imageDataX, kernelDireccionX);
        imageDataY = kernelMultiplication(imageDataG, imageDataY, kernelDireccionY);

        let imageDataMerged = mergeImages(imageDataX, imageDataY);
        /* Dibujar la información de píxeles en el lienzo.
           Si se proporciona un rectángulo solo se pintan los píxeles del mismo. */
        ctx.putImageData(imageDataMerged, 0, 0);
    }

    function mergeImages(imgX, imgY){

        let r, a;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                
                let redX = getRed(imgX, x, y);
                let redY = getRed(imgY, x, y);

                r = (redX + redY)/2;
                     
                a = getOpacity(imgX, x, y);

                setPixel(imgX, x, y, r, r, r, a);
            }
        }

        return imgX;
    }

    function kernelMultiplication(imageDataFixed, imageData, kernelDireccion) {
        
        let r, a;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                // como en el filtro de escala de grises los valores rgb son iguales 'r=g=b'
                // entonces solo tomo uno de ellos por ejemplo el rojo.
                r = Convolution(imageDataFixed, kernelDireccion, x, y);
                a = getOpacity(imageDataFixed, x, y);

                setPixel(imageData, x, y, r, r, r, a);
            }
        }

        return imageData;
    }

    function grayscaleFilter(imageData) {
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

        return imageData;
    }

    function Convolution(imageData, matrix, x, y) {
        
        //fila 1
        let pos00 = getRed(imageData, x - 1, y - 1);
        let pos01 = getRed(imageData, x, y - 1);
        let pos02 = getRed(imageData, x + 1, y - 1);
        //fila 2
        let pos10 = getRed(imageData, x - 1, y);
        let pos11 = getRed(imageData, x, y);
        let pos12 = getRed(imageData, x + 1, y);
        //fila 3
        let pos20 = getRed(imageData, x - 1, y + 1);
        let pos21 = getRed(imageData, x, y + 1);
        let pos22 = getRed(imageData, x + 1, y + 1);

        let result = ((pos00 * matrix[0][0]) + (pos01 * matrix[0][1]) + (pos02 * matrix[0][2]) +
            (pos10 * matrix[1][0]) + (pos11 * matrix[1][1]) + (pos12 * matrix[1][2]) +
            (pos20 * matrix[2][0]) + (pos21 * matrix[2][1]) + (pos22 * matrix[2][2]));

        result = Math.abs(result*255/65280);
       

        return result;
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
    selectButton.addEventListener('change', (e) => {
        if (e.target.value == "sobel")
            sobelFilter();
    });
    //#endRegion
});