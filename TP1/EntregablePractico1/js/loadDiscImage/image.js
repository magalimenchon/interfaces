document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    //---Elements---

    //Canvas
    const canvas = document.querySelector('#js-canvas');
    const ctx = canvas.getContext("2d");
    //const width = canvas.width;
    //const height = canvas.height;

    //Imagen
    const imageDisc = new Image();
    imageDisc.src = "images/image.jpg";
    //imageDisc.src = "pexels-photo.jpg";


    //---Functions---

    //#regionLoadImage

    //Dibuja la imagen en el canvas
    /*  
        img      Especifica la imagen,video o elemento a usar.
        sx       Opcional: coordenada en x de la esquina superior izquierda de donde se comenzará a extraer los datos. 
        sy       Opcional: coordenada en y de la esquina superior izquierda de donde se extraerá el ImageData.
    
    context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);*/
    function drawImageInCanvas(image) {
        ctx.drawImage(image, 0, 0/*, imageDisc.width, imageDisc.height, 0, 0, width, height*/);
    }

    //#endRegion

    //#regionEventsListeners

    //Sucede cuando se ha cargado el objeto imageDisc del disco de forma asincrónica.
    //Luego de eso, reenderizará la imagen.
    imageDisc.onload = () => {
        drawImageInCanvas(imageDisc);
    }

    //#endRegion

});