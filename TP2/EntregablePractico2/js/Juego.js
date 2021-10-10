class Juego {

    /**
     * @description Modelo de instancias para e
     * @param {Tablero} tablero instancia de la clase @see Tablero
     * @param {*} canvas lienzo donde se va a renderizar el juego
     */
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
        this.timer = new Timer();
    }

    /**
     * @description Retorna el jugador de turno
     * @returns referencia a objeto del tipo @see Jugador
     */
    getTurno() {
        return this.turno;
    }

    /**
     * @description Retorna si el juego terminó o no
     * @returns boolean de finalización
     */
    checkFinalizacion() {
        return this.finalizado;
    }

    /**
     * @description Cambia el turno de los jugadores y renderiza el turno actualizado
     */
    changeTurno() {
        if (this.turno.equals(this.jugador1))
            this.turno = this.jugador2;

        else if (this.turno.equals(this.jugador2))
            this.turno = this.jugador1;

        this.renderTurno();
    }

    /**
     * @description Renderiza el cambio de turno, actualizando el texto que indica por pantalla quien
     * debe jugar, considerando un contraste alto con el color de la ficha del jugador
     * de turno (si es un color oscuro o claro, tomando de parámetro el gris).
     */
    renderNewTurno() {
        let renderTurno = document.querySelector('#js-turno-jugador');
        let turno = document.querySelector('#js-turno');

        turno.innerHTML = "Turno";
        renderTurno.innerHTML = this.turno.getNombre();

        if(this.turno.getColorFicha() > "#808080"){
            renderTurno.style.color = "#222";
            turno.style.color = "#222";
        }
        else{
            renderTurno.style.color = "#fff";
            turno.style.color = "#fff";
        }
    }

    /**
     * @description Renderiza el cambio de turno, modificando el color del contenedor
     * de la ficha del jugador de turno y el de sus letras.
     */
    renderTurno() {
        let divTurno = document.querySelector('#js-turno-div');
        divTurno.classList.add("turno");
        divTurno.style.backgroundColor = this.turno.getColorFicha();
        this.renderNewTurno();
    }

    /**
     * @description Chequea si una ficha pertenece al jugador del turno actual
     * @param {Ficha} ficha objeto de la clase @see Ficha
     * @returns boolean es una ficha de turno
     */
    esTurno(ficha) {
        return ficha.getJugador().equals(this.turno);
    }


    /**
     * @description Añade una ficha por cada jugador en determinada posición del canvas renderizandola
     * y la almacena en un arreglo para almacenar el dato de posicionamiento.
     */
    addFichas() {
        let ficha1 = new Ficha(130 + this.tablero.getTamanioCelda() * this.tablero.getMatX(), 100, this.jugador1.getColorFicha(), this.ctx, this.jugador1);
        let ficha2 = new Ficha(130 + this.tablero.getTamanioCelda() * this.tablero.getMatX(), 200, this.jugador2.getColorFicha(), this.ctx, this.jugador2);

        this.fichas.push(ficha1);
        this.fichas.push(ficha2);

        ficha1.draw();
        ficha2.draw();
    }

    /**
     * @description Al hacer click chequea si la ficha cumple las condiciones para ser resaltada y poder jugarla
     * @param {*} e evento del navegador
     */
    onMouseDown(e) {
        if (!this.finalizado) {
            this.isMouseDown = true;

            if (this.lastClickedFicha != null) {
                this.lastClickedFicha.setResaltado(false);
                this.lastClickedFicha = null;
            }

            let currentFicha = this.findClickedFicha(e.layerX, e.layerY);

            // chequea si hay una ficha clickeada y si es el turno del jugador de esa ficha
            if (currentFicha != null && this.esTurno(currentFicha)) {
                currentFicha.setResaltado(true);
                this.lastClickedFicha = currentFicha;
            }

            this.drawFichas();
        }
    }

    /**
     * @description Dibuja las fichas a jugar en la capa 1 del canvas
     */
    drawFichas() {
        this.clearCanvas();
        for (let i = 0; i < 2; i++) {
            this.fichas[i].draw();
        }
    }

    /**
     * @description Borra el canvas en la capa 1
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }


    /**
     * @description Si se levanta la tecla del mouse y mientras el juego esté activo,
     * restaura las posicion de la ficha que se movió.
     * En caso que la ficha pudo ser soltada en el tablero y aún no ganó nadie,
     * cambia el turno. Y si alguien ganó o el tablero está lleno,
     * termina el juego dando aviso por pantalla de lo sucedido.
     * @param {*} e evento del navegador
     */
    onMouseUp(e) {
        if (!this.finalizado) {
            this.isMouseDown = false;
            this.restartPositions();
            // si se añadio una ficha al tablero => cambio de turno
            if (this.tablero.addFicha(e, this.lastClickedFicha) && !this.tablero.getHayGanador()) {
                this.changeTurno();
            }
            if (this.tablero.getHayGanador()) {
                this.terminarJuego("Ha ganado: " + this.turno.getNombre());
            }
            // si el tablero esta lleno renderizo un mensaje
            if (this.tablero.checkMatrizLlena()) {
                this.terminarJuego("Empate. Tablero completo de fichas");
            }
        }
    }


    /**
     * @description Si el mouse está clickeandose y hay una figura seleccionada
     * y la puedo desplazar se vuelve a renderizar en cada posición 
     * @param {*} e evento del navegador
     */
    onMouseMove(e) {
        if (this.isMouseDown && this.lastClickedFicha != null && !this.finalizado) {
            this.lastClickedFicha.setPosition(e.layerX, e.layerY);
            this.drawFichas();
        }
    }


    /**
     * @description Renderiza los mensajes en el DOM, dando aviso de alguna situación del juego sucedida
     * al usuario que termina con el juego. Además, modifica el elemento de pantalla
     * relacionado con el turno.
     * @param {String} textoH2 contenido de texto a mostrar en el elemento h2
     * @param {String} textoH4 contenido de texto a mostrar en el elemento h4
     */
    renderMensaje(textoH2, textoH4) {
        let divGanador = document.querySelector('#js-div-ganador');
        divGanador.classList.remove("hidden");

        //Añade texto al div
        // Crea un elemento <h2>
        this.añadirTexto(divGanador, "h2", textoH2);
        // Crea un elemento <h4>
        this.añadirTexto(divGanador, "h4", textoH4);

        //Se muestra el div al div-tablero
        divGanador.setAttribute("height", this.canvasHeight);
        // divGanador.setAttribute("width", this.canvasWidth);
        divGanador.setAttribute("width", this.canvaswidth);

        this.canceledTurn();
    }

    /**
     * @description Indica que ya no tiene más turno de juego el jugador de turno, tachando su nombre.
     */
    canceledTurn(){
        let turno = document.querySelector('#js-turno-jugador');
        let texto = turno.innerHTML;
        turno.innerHTML = texto.strike();
    }

    /**
     * @description Añade a un elemento de HTML un elemento hijo
     * @param {*} nodoPadre elemento de HTML al que se le van agregar hijos
     * @param {String} tipoElementoHijo tipo de elemento que será el hijo creado
     * @param {String} textoElegido contenido textual que tendrá el elemento creado.
     */
    añadirTexto(nodoPadre, tipoElementoHijo, textoElegido) {
        const elementoHijo = document.createElement(tipoElementoHijo);
        const texto = document.createTextNode(textoElegido);
        elementoHijo.appendChild(texto);
        //Se agregan los textos al div
        nodoPadre.appendChild(elementoHijo);
    }

    /**
     * @description Vuelve a dibujar las fichas en sus posiciones originales
     */
    restartPositions() {
        let ficha1 = this.fichas[0];
        let ficha2 = this.fichas[1];

        ficha1.setResaltado(false);
        ficha2.setResaltado(false);

        ficha1.setPosition(130 + this.tablero.getTamanioCelda() * this.tablero.getMatX(), 100);
        ficha2.setPosition(130 + this.tablero.getTamanioCelda() * this.tablero.getMatX(), 200);

        this.drawFichas();
    }


    /**
     * @description Recorre las fichas y chequea si hubo un click dentro de su área
     * @param {integer} x posición en el eje X del click en el canvas
     * @param {integer} y posición en el eje Y del click en el canvas
     * @returns ficha de tipo @see Ficha en caso que haya sido clickeada
     */
    findClickedFicha(x, y) {
        for (let i = 0; i < this.fichas.length; i++) {
            const element = this.fichas[i];
            if (element.isPointInside(x, y)) {
                return element;
            }
        }
    }

    /**
     * @description Setea todos los parametros para iniciar un nuevo juego
     */
    iniciarJuego() {
        this.resetInfo();
        this.resetJuego();
        this.resetRenderizado();
    }

    /**
     * @description Oculta el div para notificaciones y mensajes
     */
    resetInfo() {
        let divGanador = document.querySelector('#js-div-ganador');
        divGanador.classList.add("hidden");
        while (divGanador.firstChild) {
            divGanador.removeChild(divGanador.firstChild);
        }
    }

    /**
     * @description  Restaura los elementos que se ven por pantalla al iniciar un nuevo juego
     */
    resetRenderizado(){
        this.setCanvas();
        this.resetRenderStateGame();
        this.tablero.draw();
        this.addFichas();
        this.restartPositions();
        this.renderTurno();
    }

    /**
     * @description Desoculta el elemento que muestra por pantalla los turnos y cambia el texto
     * del botón de jugar por reiniciar en caso que no se haya modificado.
     */
    resetRenderStateGame(){
        let sessionRenderState = document.querySelector('#js-state-game');
        if(sessionRenderState.matches('.hidden')){
            sessionRenderState.classList.remove("hidden");
        }

        let buttonPlay = document.querySelector('#js-btn-jugar');
        if(buttonPlay.innerHTML !== 'reiniciar'){
            buttonPlay.innerHTML = 'reiniciar';
        }
    }

    /**
     * @description Setea todos los atributos de la clase @see Juego para un nuevo juego
     */
    resetJuego() {
        this.finalizado = false;
        this.turno = this.jugador1;
        this.resetPlayers();
        let canvas2 = document.querySelector('#canvas-layer2');
        let ctx2 = canvas2.getContext('2d');
        this.tablero = new Tablero(ctx2);
        this.resetTimer();
    }

    /**
     * @description Resetea la situación del timer a la inicial e inicia la cuenta regresiva, desde la fecha
     * al momento de comenzar la partida, con un incremento numérico proporcionado con el ancho
     * del tablero y el tipo de "en linea" que sea del juego.
     * Mientras el atributo que indica si llegó al tiempo límite de la clase @see Tablero
     * seguirá el intervalo de tiempo hasta que finalmente el temporizador llegue a 0,
     * por lo que termina el @see Juego y para con el conteo.
     */
    resetTimer(){
        this.timer.resetTimeOut();
        this.timer.stopTimer();
        let fecha = new Date();
        let incrementalMinutos = this.tablero.getMatY() + 2 * this.tablero.getWinLineSize();

        this.timer.iniciarCuentaRegresiva(fecha.setMinutes(fecha.getMinutes() + incrementalMinutos));
        
        const limitTime = setInterval(() => {
            if(this.timer.isTimeOut()){
                this.terminarJuego('Tiempo agotado');
                clearInterval(limitTime);
            }
        }, 1000);
    }

    /**
     * @description Setea los colores de la fichas de cada jugador al iniciar el juego
     */
    resetPlayers(){
        this.jugador1.setColorFicha(document.querySelector('#js-input-color1').value);
        this.jugador2.setColorFicha(document.querySelector('#js-input-color2').value);
        this.fichas = [];
    }

    /**
     * @description Setea las dimensiones de las dos capas de canvas
     */
    setCanvas() {

        let canvas1 = document.querySelector('#canvas-layer1');
        let canvas2 = document.querySelector('#canvas-layer2');
        this.setearCanva(canvas1);
        this.setearCanva(canvas2);
        this.canvasWidth = parseInt(canvas1.getAttribute("width"));
        this.canvasHeight = parseInt(canvas1.getAttribute("height"));
    }

    /**
     * @description Borra y setea los atributos del canvas
     * @param {*} canvas lienzo a restaurar con los nuevos datos de según el juego iniciado elegido
     */
    setearCanva(canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        canvas.setAttribute("width", (this.tablero.matX * this.tablero.tamanioCelda) + this.tablero.tamanioCelda * 3);
        canvas.setAttribute("height", (this.tablero.matY * this.tablero.tamanioCelda) + this.tablero.tamanioCelda * 2);
    }

    /**
     * @description Setea los parámetros para la finalización de un juego
     * @param {String} mensaje texto que notifica el porqué termina el juego
     */
    terminarJuego(mensaje) {
        this.renderMensaje(mensaje, "Fin de la partida.");
        this.turno = null;
        this.tablero.setMatrix();
        this.timer.stopTimer();
        this.finalizado = true;
    }

}