class Juego {

    constructor(tablero, canvas){
        let jugador1 = new Jugador("Jugador1", document.querySelector('#js-input-color1').value);
        this.jugador1 = jugador1;
        this.jugador2 = new Jugador("Jugador2", document.querySelector('#js-input-color2').value);
        this.tablero = tablero;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.fichas = [];
        this.lastClickedFicha = null;
        this.isMouseDown = false;
        this.ctx = canvas.getContext('2d');
        this.turno = jugador1;
       // this.renderCanvas();
    }

    getTurno(){
        return this.turno;
    }

    changeTurno(){
        if(this.turno.equals(this.jugador1))
            this.turno = this.jugador2;

        else if(this.turno.equals(this.jugador2))
            this.turno = this.jugador1;
    }

    esTurno(ficha){
        return ficha.getJugador().equals(this.turno);
    }

    addFichas() {

        let ficha1 = new Ficha(650, 100, this.jugador1.getColorFicha(), this.ctx, this.jugador1);
        let ficha2 = new Ficha(650, 200, this.jugador2.getColorFicha(), this.ctx, this.jugador2);

        this.fichas.push(ficha1);
        this.fichas.push(ficha2);

        ficha1.draw();
        ficha2.draw();
    }

    onMouseDown(e) {
        this.isMouseDown = true;

        if (this.lastClickedFicha != null) {
            this.lastClickedFicha.setResaltado(false);
            this.lastClickedFicha = null;
        }

        let currentFicha = this.findClickedFicha(e.layerX, e.layerY);

        if (currentFicha != null && this.esTurno(currentFicha)) {
            currentFicha.setResaltado(true);
            this.lastClickedFicha = currentFicha;
        }

        this.drawFichas();
    }

    // dibuja en la capa 1
    drawFichas() {
        this.clearCanvas();
        for (let i = 0; i < 2; i++) {
            this.fichas[i].draw();
        }
    }

    // borra en la capa 1
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    onMouseUp(e) {
        this.isMouseDown = false;
        this.restartPositions();
        if(this.tablero.addFicha(e, this.lastClickedFicha))
            this.changeTurno();
    }

    onMouseMove(e) {
        //si el mouse está abajo y tengo una figura seleccionada, la puedo "desplazar" =>
        //a la figura seleccionada se le setea la nueva posición
        //se vuelve a renderizar.
        if (this.isMouseDown && this.lastClickedFicha != null) {
            this.lastClickedFicha.setPosition(e.layerX, e.layerY);
            this.drawFichas();
        }
    }

    restartPositions() {
        let ficha1 = this.fichas[0];
        let ficha2 = this.fichas[1];

        ficha1.setResaltado(false);
        ficha2.setResaltado(false);

        ficha1.setPosition(650, 100);
        ficha2.setPosition(650, 200);
        
        this.drawFichas();
    }

    findClickedFicha(x, y) {
        for (let i = 0; i < this.fichas.length; i++) {
            const element = this.fichas[i];
            if (element.isPointInside(x, y)) {
                return element;
            }
        }
    }
    
    iniciarJuego(){
        this.addFichas();
        this.tablero.drawTablero();
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