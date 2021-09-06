document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    //---Elements---

    //Canvas
    const canvas = document.querySelector('#js-canvas');
    const ctx = canvas.getContext("2d");

    //Selector color
    const selectorColor = document.querySelector('#js-input-color');
    const hexadecimalColor = document.querySelector('#js-input-hexadecimal-color');

    //Lapiz
    const buttonPencil = document.querySelector('#js-button-pencil');
    let isMouseDown = false;    //si está presionando el mouse para dibujar


    //---Functions---

    //#regionDraw

    //Arranca a dibujar:
    function startDraw(e) {
        isMouseDown = true;
        // ctx.beginPath();
        //Dibuja también cuando clickea
        draw(e);
    };

    //Termina de dibujar:
    function endDraw() {
        isMouseDown = false;
        //Corta la continuación del trazado de la línea.
        ctx.beginPath();
    };

    //Está dibujando una linea:
    function draw(e) {

        if (isMouseDown) {
            //Caracteristicas de la línea
            // ctx.lineWidth = 300;  //probar sin lineCap
            ctx.lineWidth = 3;
            ctx.strokeStyle = selectorColor.value;   //Grafica con el color del selector.
            ctx.lineCap = "round"; //Para que dibuje en redondo

            //Se define el ancho de la linea (simulando un punto)
            ctx.lineTo(e.layerX, e.layerY); //El trazo de la línea es el de las posiciones del mouse dentro del canvas.
            ctx.stroke();   //Obligatorio para que grafique la línea

            //Se agrega la ruta para que se  vea menos pixeleado, definida desde las coordenadas dadas.
            ctx.beginPath();
            ctx.moveTo(e.layerX, e.layerY);
        }

    };
    //#endRegion

    //#regionEventsListeners

    //Define eventos para dibujar sobre el canvas cuando se usa el botón del lapiz.
    buttonPencil.addEventListener('click', () => {
        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mouseup', endDraw);
        canvas.addEventListener('mousemove', draw);
    });

    //-----------------------------------------------------------------
    //Cambio el color del fondo y el value del input indicando el color del pixel
    // cuando cambia el selector de color.
    selectorColor.addEventListener('input', () => {
        let color = selectorColor.value;
        hexadecimalColor.value = color;
        document.body.style.backgroundColor = color;
    });
    //-----------------------------------------------------------------
    //#endRegion

});