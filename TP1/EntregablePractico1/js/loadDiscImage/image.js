document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    //---Elements---

    //Canvas
    const canvas = document.querySelector('#js-canvas');
    const ctx = canvas.getContext("2d");

    //Imagen

    const uploadImage = document.querySelector('#js-upload-image');
    const cleanImage = document.querySelector('#js-button-limpiar');

    //---Functions---

    //#regionLoadImage

    //Dibuja la imagen en el canvas de forma centrada y adapta la imagen 
    //si esta excede el tamaño del mismo
    function drawImageInCanvas(img) {
            let canvas = ctx.canvas ;
            let hRatio = canvas.width  / img.width;
            let vRatio =  canvas.height / img.height;
            let ratio  = Math.min ( hRatio, vRatio );
            let centerShift_x = ( canvas.width - img.width*ratio ) / 2;
            let centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
            // ctx.clearRect(0,0,canvas.width, canvas.height);
            ctx.drawImage(img, 0,0, img.width, img.height,
                               centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
    }

    //#endRegion

    //#regionEventsListeners

    var imageUrl;

    uploadImage.addEventListener('change', (e) =>{
        const imageUpload = new Image();
        imageUpload.src = URL.createObjectURL(e.target.files[0]);
        imageUrl = imageUpload;
        imageUpload.onload = () => {
            drawImageInCanvas(imageUpload);
        }
    });

    cleanImage.addEventListener('click', () =>{
        drawImageInCanvas(imageUrl);
    })
    
    //#endRegion

    

    


});