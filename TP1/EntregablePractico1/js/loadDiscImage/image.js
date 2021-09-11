document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    //---Elements---

    //Canvas
    const canvas = document.querySelector('#js-canvas');
    const ctx = canvas.getContext("2d");
    //const width = canvas.width;
    //const height = canvas.height;

    //Imagen
    // const imageDisc = new Image();
    // imageDisc.src = "images/image.jpg";
    //imageDisc.src = "images/pexels-photo.jpg";

    const uploadImage = document.querySelector('#js-upload-image');


    //---Functions---

    //#regionLoadImage

    //Dibuja la imagen en el canvas
    /*  
        img      Especifica la imagen,video o elemento a usar.
        sx       Opcional: coordenada en x de la esquina superior izquierda de donde se comenzará a extraer los datos. 
        sy       Opcional: coordenada en y de la esquina superior izquierda de donde se extraerá el ImageData.
    
    context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);*/
    function drawImageInCanvas(img) {
            var canvas = ctx.canvas ;
            var hRatio = canvas.width  / img.width;
            var vRatio =  canvas.height / img.height;
            var ratio  = Math.min ( hRatio, vRatio );
            var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
            var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
            ctx.clearRect(0,0,canvas.width, canvas.height);
            ctx.drawImage(img, 0,0, img.width, img.height,
                               centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
    }

    //#endRegion

    //#regionEventsListeners

    //Sucede cuando se ha cargado el objeto imageDisc del disco de forma asincrónica.
    //Luego de eso, reenderizará la imagen.
    // imageDisc.onload = () => {
    //     drawImageInCanvas(imageDisc);
    // }

    //#endRegion

    uploadImage.addEventListener('change', (e) =>{
        const imageUpload = new Image();
        imageUpload.src = URL.createObjectURL(e.target.files[0]);
        imageUpload.onload = () => {
            drawImageInCanvas(imageUpload);
        }
    });


});