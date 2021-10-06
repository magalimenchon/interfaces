class Juego {

    constructor(tablero){
        this.jugador1 = new Jugador("Jugador1", document.querySelector('#js-input-color1').value);
        this.jugador2 = new Jugador("Jugador2", document.querySelector('#js-input-color2').value);
        this.tablero = tablero;
       // this.renderCanvas();
        this.tablero.drawTablero();
    }

    
    iniciarJuego(){

    }

    renderCanvas(){
        let tableroWindow = document.querySelector('.espacio');
        this.tablero.borrarHijosNodo(tableroWindow);
        this.createCanvas(tableroWindow, 3, 800, 550);
        //console.log(tableroWindow);
    }

    createCanvas(nodoPadre, cantCanvas, widthCanvas, heightCanvas){
        
        for (let i = 1; i <= cantCanvas; i++) {
            const newCanvas = document.createElement("canvas");
            const stringId ="canvas-layer" + i;
            newCanvas.setAttribute("id", stringId);
            //console.log(newCanvas);
            newCanvas.setAttribute("width", widthCanvas);
            newCanvas.setAttribute("height", heightCanvas);

            nodoPadre.appendChild(newCanvas);
        }
    }

}