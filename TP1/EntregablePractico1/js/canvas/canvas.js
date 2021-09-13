document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    //---Elements---

    //Canvas
    const canvas = document.querySelector('#js-canvas');
    const ctx = canvas.getContext("2d");
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    //Imagen
    
    let imageUrl;
    const uploadImage = document.querySelector('#js-upload-image');
    const cleanImage = document.querySelector('#js-button-limpiar');

    //Boton Borrado de Canvas
    const buttonEraseCanvas = document.getElementById("js-button-reset");

    //Boton Descarga de canvas
    const buttonDownloadCanvas = document.getElementById("js-button-download");


    //---Functions---

    //#regionLoadImage

    //Dibuja la imagen en el canvas de forma centrada y adapta la imagen 
    //si esta excede el tamaño del mismo
    function drawImageInCanvas(img) {
        let canvas = ctx.canvas;
        let hRatio = canvas.width / img.width;
        let vRatio = canvas.height / img.height;
        let ratio = Math.min(hRatio, vRatio);
        let centerShift_x = (canvas.width - img.width * ratio) / 2;
        let centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }


    //Permite descargar la imagen de lo realizado en canvas por medio de los datos obtenidos de la URI
    function downloadCanvas() {

        const a = document.createElement("a");
        document.body.appendChild(a);
        //se le setea la URI con los datos del canvas.
        a.href = canvas.toDataURL();
        a.download = "canvas-image.png"
        //fuerza la descarga automatica por el click con js
        a.click();
        document.body.removeChild(a);

    }

    // Limpia el canvas completo
    function clearCanvas() {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    //Carga de una imagen por disco
    /*function uploadImage(e){
        //Crea la imagen y le asigna la URL
        const imageUpload = new Image();
        imageUpload.src = URL.createObjectURL(e.target.files[0]);
        imageUrl = imageUpload;
        //La dibuja en el canvas luego que se cargó
        imageUpload.onload = () => {
            drawImageInCanvas(imageUpload);
        }
    }*/


    //#endRegion

    //#regionEventsListeners

    //Carga de una imagen a elección
    uploadImage.addEventListener('change', (e) => {
        const imageUpload = new Image();
        imageUpload.src = URL.createObjectURL(e.target.files[0]);
        imageUrl = imageUpload;
        imageUpload.onload = () => {
            drawImageInCanvas(imageUpload);
        }
    });

    //Recarga de la imagen que subió por disco
    cleanImage.addEventListener('click', () => {
        drawImageInCanvas(imageUrl);
    })

    //Evento borra el canvas por completo
    buttonEraseCanvas.addEventListener('click', () => {
        clearCanvas();
    })

    //Evento para descargar el canvas
    buttonDownloadCanvas.addEventListener('click', () => {
        downloadCanvas();
    })

    //#endRegion




});