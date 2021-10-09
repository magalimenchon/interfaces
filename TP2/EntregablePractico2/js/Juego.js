class Juego {


    constructor(tablero, canvas) {
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
        this.renderTurno();
        this.finalizado = false;
    }

    getTurno() {
        return this.turno;
    }

    checkFinalizacion() {
        return this.finalizado;
    }

    // cambia el turno de los jugadores
    changeTurno() {
        if (this.turno.equals(this.jugador1))
            this.turno = this.jugador2;

        else if (this.turno.equals(this.jugador2))
            this.turno = this.jugador1;

        this.renderNewTurno();
    }

    // renderiza el cambio de turno
    renderNewTurno() {
        let renderTurno = document.querySelector('#js-turno-jugador');
        renderTurno.innerHTML = this.turno.getNombre();
        //renderTurno.style.color = this.turno.getColorFicha();
    }

    // renderiza el cambio de turno
    renderTurno() {
        let divTurno = document.querySelector('#js-turno-div');
        divTurno.classList.add("turno");
        let turno = document.querySelector('#js-turno');
        turno.innerHTML = "Turno";
        this.renderNewTurno();
    }

    esTurno(ficha) {
        return ficha.getJugador().equals(this.turno);
    }

    // añade una ficha por cada jugador
    addFichas() {
        let ficha1 = new Ficha(130 + this.tablero.getTamanioCelda() * this.tablero.getMatX(), 100, this.jugador1.getColorFicha(), this.ctx, this.jugador1);
        let ficha2 = new Ficha(130 + this.tablero.getTamanioCelda() * this.tablero.getMatX(), 200, this.jugador2.getColorFicha(), this.ctx, this.jugador2);

        this.fichas.push(ficha1);
        this.fichas.push(ficha2);

        ficha1.draw();
        ficha2.draw();
    }

    // al hacer click checkea si la ficha cumple las condiciones para ser resaltada y poder jugarla
    onMouseDown(e) {
        this.isMouseDown = true;

        if (this.lastClickedFicha != null) {
            this.lastClickedFicha.setResaltado(false);
            this.lastClickedFicha = null;
        }

        let currentFicha = this.findClickedFicha(e.layerX, e.layerY);

        // checkea si hay una ficha clickeada y si es el turno del jugador de esa ficha
        if (currentFicha != null && this.esTurno(currentFicha)) {
            currentFicha.setResaltado(true);
            this.lastClickedFicha = currentFicha;
        }

        this.drawFichas();
    }

    // dibuja las fichas a jugar en la capa 1 del canvas
    drawFichas() {
        this.clearCanvas();
        for (let i = 0; i < 2; i++) {
            this.fichas[i].draw();
        }
    }

    // borra el canvas en la capa 1
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    // si se levanta la tecla del mouse
    onMouseUp(e) {
        this.isMouseDown = false;
        this.restartPositions();
        // si se añadio una ficha al tablero => cambio de turno
        if (this.tablero.addFicha(e, this.lastClickedFicha))
            this.changeTurno();
        // si el tablero esta lleno renderizo un mensaje
        if (this.tablero.checkMatrizLlena()) {
            this.terminarJuego("Empate. Tablero completo de fichas");
        }

    }

    //si el mouse está abajo y tengo una figura seleccionada y la puedo desplazar
    //se vuelve a renderizar en cada posicion 
    onMouseMove(e) {
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

    // setea todos los parametros para iniciar un nuevo juego
    iniciarJuego() {
        this.resetInfo();
        this.resetJuego();
        this.setCanvas();
        this.tablero.draw();
        this.addFichas();
        this.restartPositions();
    }

    // oculta el div para notificaciones y mensajes
    resetInfo() {
        let divGanador = document.querySelector('#js-div-ganador');
        divGanador.classList.add("hidden");
    }

    // setea todos los atributos de la clase "Juego" para un nuevo juego
    resetJuego() {
        this.turno = this.jugador1;
        this.renderTurno();
        this.jugador1.setColorFicha(document.querySelector('#js-input-color1').value);
        this.jugador2.setColorFicha(document.querySelector('#js-input-color2').value);
        this.fichas = [];
        let canvas2 = document.querySelector('#canvas-layer2');
        let ctx2 = canvas2.getContext('2d');
        this.tablero = new Tablero(ctx2);
    }

    // setea las dimensiones de las dos capas de canvas
    setCanvas() {

        let canvas1 = document.querySelector('#canvas-layer1');
        let canvas2 = document.querySelector('#canvas-layer2');
        this.setearCanva(canvas1);
        this.setearCanva(canvas2);
        this.canvasWidth = parseInt(canvas1.getAttribute("width"));
        this.canvasHeight = parseInt(canvas1.getAttribute("height"));
    }

    // borra y setea los atributos del canvas
    setearCanva(canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        canvas.setAttribute("width", (this.tablero.matX * this.tablero.tamanioCelda) + this.tablero.tamanioCelda * 3);
        canvas.setAttribute("height", (this.tablero.matY * this.tablero.tamanioCelda) + this.tablero.tamanioCelda * 2);
    }

    // setea los parametros para la finalizacon de un juego
    terminarJuego(mensaje) {
        this.tablero.renderMensaje(mensaje, "Fin de la partida.");
        this.turno = null;
        this.finalizado = true;
    }

}