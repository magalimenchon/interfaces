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

    //---Functions---

    //#regionBlurFilter

    function blurFilter() {

        const imageData = ctx.getImageData(0, 0, width, height);
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

    //Calcula el promedio del parámetro rojo entre el pixel y sus celdas vecinas contiguas.
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

    //Calcula el promedio del parámetro verde entre el pixel y sus celdas vecinas contiguas.
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

    //Calcula el promedio del parámetro azul entre el pixel y sus celdas vecinas contiguas.
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

    /*Obtiene el dato de la coordenada de R en el arreglo de imageData del pixel determinado,
      que se encuentra en la posición 2 en relación a sus 4 datos correspondientes. */
    function getBlue(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 2];
    }

    /*Obtiene el dato de la coordenada de R en el arreglo de imageData del pixel determinado,
      que se encuentra en la posición 3 (última) en relación a sus 4 datos correspondientes. */
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
    //Cuando cambia el selector a Binarización aplica el filtro correspondiente
    selectButton.addEventListener('change', (e) => {
        if (e.target.value == "blur")
            blurFilter();
    })
    //#endRegion
});