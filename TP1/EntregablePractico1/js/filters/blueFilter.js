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

    //#regionBlueFilter

    
    function blueFilter() {
        
        const imageData = ctx.getImageData(0, 0, width, height);
        let b, a;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                //Se coloca solo el azul de cada pixel correspondiente a la imagen, así como su opacidad.
                b = getBlue(imageData, x, y);
                a = getOpacity(imageData, x, y);
                setPixel(imageData, x, y, 0, 0, b, a);
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
    //Cuando cambia el selector a Azul aplica el filtro correspondiente
    selectButton.addEventListener('change', (e) => {
        if (e.target.value == "blue")
            blueFilter();
    });
    //#endRegion
});