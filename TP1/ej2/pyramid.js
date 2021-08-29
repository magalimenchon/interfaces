document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina(){
    "use strict";

    /*  2- Pintar una región rectangular de un color utilizando el Contexto de HTML5.  */

/*---------------start------------------------*/
    let canvas = document.querySelector("#myCanvas");
    let ctx = canvas.getContext("2d");

    crearPiramideColores();

/*---------------functions------------------------*/

    function crearPiramideColores(){

        //Inicializo proceso de dibujo
        ctx.beginPath();

        // Purple rectangle
        ctx.fillStyle = "#500596";
        ctx.fillRect(600, 100, 100, 100);
        
        // Yellow rectangle
        ctx.fillStyle = "#E39E34";
        ctx.fillRect(650, 200, 100, 100);
        
        // Lilac rectangle
        ctx.fillStyle = "#841EE3";
        ctx.fillRect(550, 200, 100, 100);
        
        // Light Green rectangle
        ctx.fillStyle = "#07E353";
        ctx.fillRect(600, 300, 100, 100);
        
        // Blue rectangle
        ctx.fillStyle = "#054996";
        ctx.fillRect(500, 300, 100, 100);
        
        // Dark Green rectangle
        ctx.fillStyle = "#0C963C";
        ctx.fillRect(700, 300, 100, 100);
    }


}