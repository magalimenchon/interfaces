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

    //#regionSepiaFilter


    function sepiaFilter() {

        const imageData = ctx.getImageData(0, 0, width, height);
        let r, g, b, a;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                r = getRed(imageData, x, y);
                g = getGreen(imageData, x, y);
                b = getBlue(imageData, x, y);
                a = getOpacity(imageData, x, y);

                /*Asigna nuevos colores a partir de valores de tonos recomendados por Microsoft.
                  Si alguno de los coeficientes de cada parámetro de color sobrepasa del valor
                  máximo 255 se setea este valor. */
                let newR = Math.min((0.393 * r) + (0.769 * g) + (0.189 * b), 255.0); //new red
                let newG = Math.min((0.349 * r) + (0.686 * g) + (0.168 * b), 255.0); //new green
                let newB = Math.min((0.272 * r) + (0.534 * g) + (0.131 * b), 255.0); //new blue

                setPixel(imageData, x, y, newR, newG, newB, a);
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
    //Cuando cambia el selector a Sepia aplica el filtro correspondiente
    selectButton.addEventListener('change', (e) => {
        if (e.target.value == "sepia")
            sepiaFilter();
    });
    //#endRegion
});