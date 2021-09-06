document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    let canvas = document.querySelector('#myCanvas');
    let ctx = canvas.getContext("2d");

    //selector color
    let colorInput = document.querySelector('#color');
    let hexInput = document.querySelector('#hex');
    let buttonPencil = document.querySelector('#pencil');

    //lapiz
    let isMouseDown = false;    //si está presionando el mouse para dibujar

    //evento cambio de color selector
    colorInput.addEventListener('input', () => {
        let color = colorInput.value;
        hexInput.value = color;
        document.body.style.backgroundColor = color;
    });

    //arranca a dibujar:
    function startPosition(e) {
        isMouseDown = true;
        //arranca a dibujar
       // ctx.beginPath();
        draw(e);
    };

    //termina de dibujar:
    function finishedPosition() {
        isMouseDown = false;
        ctx.beginPath();
    };

    //esta dibujando una linea:
    function draw(e) {
        //
        if (isMouseDown){
           // ctx.lineWidth = 300;  //probar sin lineCap
            ctx.lineWidth = 3;
            ctx.strokeStyle = colorInput.value;   //acá iria el color del selector de color.
            ctx.lineCap = "round"; //para que dibuje en redondo
            
            ctx.lineTo(e.layerX, e.layerY); //el trazo de la linea es el de las posiciones del mouse dentro del canvas.
            ctx.stroke();   //Obligatorio para que grafique la linea

            //se agrega la ruta para que se  vea menos pixeleado
            ctx.beginPath();
            
            ctx.moveTo(e.layerX, e.layerY);
        }


    };


    //EventListeners
    buttonPencil.addEventListener('click', () =>{
        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', finishedPosition);
        canvas.addEventListener('mousemove', draw);
    });
   /* canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);*/
});