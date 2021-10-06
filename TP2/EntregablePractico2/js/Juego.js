class Juego {

    constructor(tablero, jugador1, jugador2){
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.tablero = tablero;
       // this.renderCanvas();
        this.tablero.drawTablero();
    }

    
    jugar(){
        
       // this.jugador1.getTurno().habilitarTurno();



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