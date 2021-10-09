class Juego {

    
    constructor(tablero, canvas){
        let jugador1 = new Jugador("Jugador 1", document.querySelector('#js-input-color1').value);
        this.jugador1 = jugador1;
        this.jugador2 = new Jugador("Jugador 2", document.querySelector('#js-input-color2').value);
        this.tablero = tablero;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.fichas = [];
        this.lastClickedFicha = null;
        this.isMouseDown = false;
        this.ctx = canvas.getContext('2d');
        this.turno = jugador1;
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

        let ficha1 = new Ficha(130 + this.tablero.getTamanioCelda() * this.tablero.getMatX(), 100, this.jugador1.getColorFicha(), this.ctx, this.jugador1);
        let ficha2 = new Ficha(130 + this.tablero.getTamanioCelda() * this.tablero.getMatX(), 200, this.jugador2.getColorFicha(), this.ctx, this.jugador2);

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

    // vuelve a dibujar las fichas en sus pocisiones originales
    restartPositions() {
        let ficha1 = this.fichas[0];
        let ficha2 = this.fichas[1];

        ficha1.setResaltado(false);
        ficha2.setResaltado(false);

        ficha1.setPosition(130 + this.tablero.getTamanioCelda() * this.tablero.getMatX(), 100);
        ficha2.setPosition(130 + this.tablero.getTamanioCelda() * this.tablero.getMatX(), 200);
        
        this.drawFichas();
    }

    //recorre las fichas y checkea si hubo un click dentro de su area
    findClickedFicha(x, y) {
        for (let i = 0; i < this.fichas.length; i++) {
            const element = this.fichas[i];
            if (element.isPointInside(x, y)) {
                return element;
            }
        }
    }
    

    iniciarJuego(){

        this.setCanvas();
        this.tablero.draw();

        this.addFichas();
    }


    setCanvas() {

        let canvas1 = document.querySelector('#canvas-layer1');
        let canvas2 = document.querySelector('#canvas-layer2');
        this.setearCanva(canvas1);
        this.setearCanva(canvas2);
        this.canvasWidth = parseInt(canvas1.getAttribute("width"));
        this.canvasHeight = parseInt(canvas1.getAttribute("height"));
    }

    setearCanva(canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width , canvas.height);
        canvas.setAttribute("width", (this.tablero.matX * this.tablero.tamanioCelda) + this.tablero.tamanioCelda * 3);
        canvas.setAttribute("height", (this.tablero.matY * this.tablero.tamanioCelda) + this.tablero.tamanioCelda * 2);
    }

}