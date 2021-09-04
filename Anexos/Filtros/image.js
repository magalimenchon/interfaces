document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina() {
    "use strict";

    /* 7 - Cargar una Imagen desde disco o URL 
            a)  Dibujar la imagen dentro del canvas 
            b)  Implementar una función que aplique el filtro de escala de grises y
            muestre el resultado en el canvas. 
    */
    /*-------------------start----------------------------*/


    //VARIABLES

    //--Context--
    let canvas = document.querySelector('#myCanvas');
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;

    //--Image--
    let imageDisc = new Image();
    imageDisc.src = "image.jpg";
    //imageDisc.src = "pexels-photo.jpg";

    //--filter--
    //GrayScale
    const quantityCompositionColor = 3;
    //Negative
    const maxbits = 255;
    //Blur
    let matrixBoxBlur = [];
    const BoxBlurWidth = 3;
    const BoxBlurHeight = 3;

    /*-----------------events--------------------------*/

    imageDisc.onload = () => {
        DrawImageMethod(imageDisc);
        //GrayscaleFilter();
        //NegativeFilter();
        //BlurFilter();
        //BrightnessFilter(0.5);
    }
    /*---------------functions------------------------*/

    function DrawImageMethod(image) {
        ctx.drawImage(image, 0, 0);
    }

    /*BRIGHTNESS */
    function BrightnessFilter(coefficientBritness) {

        let imageData = ctx.getImageData(0, 0, width, height);

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let r = getRed(imageData, x, y);
                let g = getGreen(imageData, x, y);
                let b = getBlue(imageData, x, y);
                let a = getOpacity(imageData, x, y);
                //Se le incrementa el porcentaje de cada parámetro de color por igual.
                //rango de brillo [-1, 1] Siendo 0 el valor de la imagen original.
                r += coefficientBritness*maxbits;
                g += coefficientBritness*maxbits;
                b += coefficientBritness*maxbits;
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
        /* Dibujar la información de píxeles en el lienzo.
           Si se proporciona un rectángulo solo se pintan los píxeles del mismo. */
        ctx.putImageData(imageData, 0, 0);
    }
    /*BLUR FILTER */
    function BlurFilter() {

        let imageData = ctx.getImageData(0, 0, width, height);
        let r, g, b, a;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                //Si no se sobrepasa de los límites de acceso a la matriz, si no está en un borde:
                if (!(x < 1 || y < 1 || x + 1 == width || y + 1 == height)) {
                    //Por cada parámetro de color que compone al pixel, voy a sacar un promedio
                    //de cada componente de las celdas vecinas.
                    r = avgRed(imageData, x, y);
                    g = avgGreen(imageData, x, y);
                    b = avgBlue(imageData, x, y);
                    a = getOpacity(imageData, x, y);
                    setPixel(imageData, x, y, r, g, b, a);
                }
            }
        }
        /* Dibujar la información de píxeles en el lienzo.
           Si se proporciona un rectángulo solo se pintan los píxeles del mismo. */
        ctx.putImageData(imageData, 0, 0);
    }

    function avgRed(imageData, x, y) {
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

        return (pos00 + pos01 + pos02 + pos10 + pos11 + pos12 + pos20 + pos21 + pos22) / 9;
    }
    function avgGreen(imageData, x, y) {
        //fila 1
        let pos00 = getGreen(imageData, x - 1, y - 1);
        let pos01 = getGreen(imageData, x, y - 1);
        let pos02 = getGreen(imageData, x + 1, y - 1);
        //fila 2
        let pos10 = getGreen(imageData, x - 1, y);
        let pos11 = getGreen(imageData, x, y);
        let pos12 = getGreen(imageData, x + 1, y);
        //fila 3
        let pos20 = getGreen(imageData, x - 1, y + 1);
        let pos21 = getGreen(imageData, x, y + 1);
        let pos22 = getGreen(imageData, x + 1, y + 1);

        return (pos00 + pos01 + pos02 + pos10 + pos11 + pos12 + pos20 + pos21 + pos22) / 9;
    }
    function avgBlue(imageData, x, y) {
        //fila 1
        let pos00 = getBlue(imageData, x - 1, y - 1);
        let pos01 = getBlue(imageData, x, y - 1);
        let pos02 = getBlue(imageData, x + 1, y - 1);
        //fila 2
        let pos10 = getBlue(imageData, x - 1, y);
        let pos11 = getBlue(imageData, x, y);
        let pos12 = getBlue(imageData, x + 1, y);
        //fila 3
        let pos20 = getBlue(imageData, x - 1, y + 1);
        let pos21 = getBlue(imageData, x, y + 1);
        let pos22 = getBlue(imageData, x + 1, y + 1);

        return (pos00 + pos01 + pos02 + pos10 + pos11 + pos12 + pos20 + pos21 + pos22) / 9;
    }


    /* NEGATIVE FILTER */
    function NegativeFilter() {

        let imageData = ctx.getImageData(0, 0, width, height);

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let r = getRed(imageData, x, y);
                let g = getGreen(imageData, x, y);
                let b = getBlue(imageData, x, y);
                let a = getOpacity(imageData, x, y);
                //Por cada parámetro de color que compone al pixel, voy a su complementario u opuesto.
                r = maxbits - r;
                g = maxbits - g;
                b = maxbits - b;
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
        /* Dibujar la información de píxeles en el lienzo.
           Si se proporciona un rectángulo solo se pintan los píxeles del mismo. */
        ctx.putImageData(imageData, 0, 0);
    }


    /* GRAYSCALE FILTER */

    /*  Recorre cada pixel dado por las coordenadas del lienzo obtenido.
        Toma cada parámetro de color del pixel, calcula el promedio de RGB, y modifica cada
        coordenada RGB con este promedio. Finalmente se actualiza la imagen con esta información.*/
    function GrayscaleFilter() {
        /* Retorna un objeto ImageData que representa los datos de píxeles para el área del lienzo.
           Las coordenadas se especifican en unidades espaciales de coordenadas del lienzo. 
         *@param sx coordenada 'x' de la esquina superior izquierda del contexto del que se extraeran los datos de la imagen.
         *@param sy coordenada 'y' de la esquina superior izquierda del rectángulo del que se extraerá el ImageData.
         *@param sw el ancho del contexto.
         *@paran sh el largo del lienzo.
        */
        let imageData = ctx.getImageData(0, 0, width, height);

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let r = getRed(imageData, x, y);
                let g = getGreen(imageData, x, y);
                let b = getBlue(imageData, x, y);
                let a = getOpacity(imageData, x, y);
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
        let index = (x + y * imageData.width) * 4;
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
}