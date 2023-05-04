document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  //---Elements---

  //Canvas
  let canvas = document.querySelector("#js-canvas");
  const ctx = canvas.getContext("2d");

  //Selector color
  const selectorColor = document.querySelector("#js-input-color");

  //Stroke thickness
  const range = document.querySelector("#js-input-thickness");

  //Lapiz
  const buttonPencil = document.querySelector("#js-button-pencil");
  let isMouseDown = false; //si está presionando el mouse para dibujar

  //Goma
  const buttonErase = document.getElementById("js-button-erase");
  let borrar = false;

  //---Functions---

  //#regionDraw

  //Arranca a dibujar:
  function startDraw(e) {
    isMouseDown = true;
    //Dibuja también cuando clickea
    draw(e);
  }

  //Termina de dibujar:
  function endDraw() {
    isMouseDown = false;
    //Corta la continuación del trazado de la línea.
    ctx.beginPath();
  }

  //Está dibujando una linea:
  function draw(e) {
    console.log(e.srcElement.offsetTop, e.srcElement.offsetLeft);
    if (isMouseDown) {
      //Caracteristicas de la línea

      // si tiene que borrar pinta de blanco, si no selecciona el color
      if (borrar) ctx.strokeStyle = "#FFFFFF";
      else ctx.strokeStyle = selectorColor.value;

      // define grosor de la linea
      ctx.lineWidth = range.value;
      //Grafica con el color del selector.
      ctx.lineCap = "round"; //Para que dibuje en redondo

      //Se define el ancho de la linea (simulando un punto)
      ctx.lineTo(
        e.layerX - e.srcElement.offsetLeft,
        e.layerY - e.srcElement.offsetTop
      ); //El trazo de la línea es el de las posiciones del mouse dentro del canvas.
      ctx.stroke(); //Obligatorio para que grafique la línea

      //Se agrega la ruta para que se  vea menos pixeleado, definida desde las coordenadas dadas.
      ctx.beginPath();
      ctx.moveTo(
        e.layerX - e.srcElement.offsetLeft,
        e.layerY - e.srcElement.offsetTop
      );
    }
  }
  //#endRegion

  //#regionEventsListeners

  //Define eventos para dibujar sobre el canvas cuando se usa el botón del lapiz.
  buttonPencil.addEventListener("click", () => {
    borrar = false;
    canvas.addEventListener("mousedown", startDraw);
    window.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mousemove", draw);
  });

  //Define eventos para dibujar sobre el canvas cuando se usa el botón del Goma de borrar.
  buttonErase.addEventListener("click", () => {
    borrar = true;
    canvas.addEventListener("mousedown", startDraw);
    window.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mousemove", draw);
  });

  //#endRegion
});
