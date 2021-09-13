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

        // matriz kernel usada para detectar bordes en el eje X, al evaluarse produce un contraste de 
        // valores entre columnas
        let kernelDireccionX = [[-47, 0, 47],
                                [-162, 0, 162],
                                [-47, 0, 47]];
        
        // matriz kernel usada para detectar bordes en el eje Y, al evaluarse produce un contraste de 
        // valores entre filas
        let kernelDireccionY = [[-47, -162, -47],
                                [0, 0, 0],
                                [47, 162, 47]];

        // obtengo imagenes del canvas para trabajar por separado
        const ctxImageData = ctx.getImageData(0, 0, width, height);

        let imageDataX = ctx.getImageData(0, 0, width, height);
        let imageDataY = ctx.getImageData(0, 0, width, height);

        // primero aplico un filtro de escala de grises
        const imageDataG = grayscaleFilter(ctxImageData);

        // multiplico la matriz kernel punto a punto para detectar la probabilidad de bordes en el eje X
        imageDataX = kernelMultiplication(imageDataG, imageDataX, kernelDireccionX);
        // hago lo mismo para detectar bordes en el eje Y
        imageDataY = kernelMultiplication(imageDataG, imageDataY, kernelDireccionY);

        // hago un merge de los dos mapas de bits
        let imageDataMerged = mergeImages(imageDataX, imageDataY);

        /* Dibujar la información de píxeles en el lienzo.
           Si se proporciona un rectángulo solo se pintan los píxeles del mismo. */
        ctx.putImageData(imageDataMerged, 0, 0);
    }

    // une dos imagenes superponiendolas y eligiendo pixel a pixel los que tienen mayor luz o color
    function mergeImages(imgX, imgY){

        let r, a;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                
                // al ser escala de grises r=g=b tomo cualquiera de los 3 colores
                let redX = getRed(imgX, x, y);
                let redY = getRed(imgY, x, y);

                // elige el pixel con mayor luz o color
                if (redX > redY)
                    r = redX;
                else
                    r = redY;

                // opcion para hacer un promedio de las dos imagenes
                // r = (redX + redY)/2;
                     
                a = getOpacity(imgX, x, y);

                setPixel(imgX, x, y, r, r, r, a);
            }
        }

        return imgX;
    }

    // recorre una imagen y evalua la matriz kernel punto a punto
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

    // filtro de escala de grises
    function grayscaleFilter(imageData) {
        let r, g, b, a;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                r = getRed(imageData, x, y);
                g = getGreen(imageData, x, y);
                b = getBlue(imageData, x, y);
                a = getOpacity(imageData, x, y);
                //promedio de los 3 parámetros de color, para que no sea solo escala de grises
                //dependiente de 1 solo parámetro.
                let grayAVG = (r + g + b) / quantityCompositionColor;
                setPixel(imageData, x, y, grayAVG, grayAVG, grayAVG, a);
            }
        }

        return imageData;
    }

    // multiplica la matriz kernel en un punto de la imagen, tomando sus pixeles vecinos
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

        // resultado obtiene la probabilidad de un borde en un punto multiplicando dos matrices 3x3
        let result = ((pos00 * matrix[0][0]) + (pos01 * matrix[0][1]) + (pos02 * matrix[0][2]) +
            (pos10 * matrix[1][0]) + (pos11 * matrix[1][1]) + (pos12 * matrix[1][2]) +
            (pos20 * matrix[2][0]) + (pos21 * matrix[2][1]) + (pos22 * matrix[2][2]));

        // valor maximo = (47*255 + 162*255 + 47*255) = 65280

        // uso regla de 3 para pasarlo a color
        // un numero mas alto significa mas probabilidad de borde
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
    //Cuando cambia el selector a Sobel aplica el filtro correspondiente
    selectButton.addEventListener('change', (e) => {
        if (e.target.value == "sobel")
            sobelFilter();
    });
    //#endRegion
});