document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    //---Elements---


    //Canvas
    const canvas = document.querySelector('#js-canvas');
    const ctx = canvas.getContext("2d");
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    //Selector color
    const selectorColor = document.querySelector('#js-input-color');
    // const hexadecimalColor = document.querySelector('#js-input-hexadecimal-color');

    //Stroke thickness
    const range = document.querySelector('#js-input-thickness');

    //Lapiz
    const buttonPencil = document.querySelector('#js-button-pencil');
    let isMouseDown = false;    //si está presionando el mouse para dibujar

    //Goma
    const buttonErase = document.getElementById("js-button-erase");
    let borrar = false;

    //Boton Borrado de Canvas
    const buttonEraseCanvas = document.getElementById("js-button-reset");

    //Boton Descarga de canvas
    const buttonDownloadCanvas = document.getElementById("js-button-download");


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

    // Limpia el canvas completo
    function clearCanvas(){
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    //Está dibujando una linea:
    function draw(e) {

        if (isMouseDown) {
            //Caracteristicas de la línea

            // si tiene que borrar pinta de blanco, si no selecciona el color
            if(borrar)
            ctx.strokeStyle = "#FFFFFF"; 
            else
            ctx.strokeStyle = selectorColor.value; 

            // define grosor de la linea
            ctx.lineWidth = range.value;
              //Grafica con el color del selector.
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
        borrar = false;
        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mouseup', endDraw);
        canvas.addEventListener('mousemove', draw);
    });

    //Define eventos para dibujar sobre el canvas cuando se usa el botón del Goma de borrar.
    buttonErase.addEventListener('click', () => {
        borrar = true;
        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mouseup', endDraw);
        canvas.addEventListener('mousemove', draw);
    });

    //Evento borra el canvas por completo
    buttonEraseCanvas.addEventListener('click', () => {
        clearCanvas();
    })
    
    //Evento para descargar el canvas
    buttonDownloadCanvas.addEventListener('click', () => {
        downloadCanvas();
    })

    // todavia no funciona
    function downloadCanvas(){  
        // get canvas data  
        var image = canvas.toDataURL();  
      
        // create temporary link  
        var tmpLink = document.createElement( 'a' );  
        tmpLink.download = 'image.png'; // set the name of the download file 
        tmpLink.href = image; 
    }
    //-----------------------------------------------------------------
    //Cambio el color del fondo y el value del input indicando el color del pixel
    // cuando cambia el selector de color.
    // selectorColor.addEventListener('input', () => {
    //     let color = selectorColor.value;
    //     hexadecimalColor.value = color;
    //     document.body.style.backgroundColor = color;
    // });
    //-----------------------------------------------------------------
    //#endRegion

});