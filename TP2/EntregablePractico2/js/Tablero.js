
class Tablero {

    constructor(ctx) {
        let tamanioCelda = 70;
        let matrix = [];
        let winLineSize = parseInt(document.querySelector('#js-select-gameMod').value);
        let matX = winLineSize+3;
        let matY = winLineSize+2;
        this.winLineSize = winLineSize;
        this.matX = matX;
        this.matY = matY;
        this.tamanioCelda = tamanioCelda;
        this.width = matX * tamanioCelda;
        this.height = matY * tamanioCelda;
        this.iniDibujoX = 50;
        this.iniDibujoY = 70;
        this.ctx = ctx;
        for (let x = 0; x < matX; x++) {
            matrix[x] = [];
            for (let y = 0; y < matY; y++) {
                matrix[x][y] = null;
            }
        }
        this.matrix = matrix;
        
        //quizas vaya en juego?
        //define si el turno actual pertenece al jugador 1 o 2.
        this.turnoActual = null;
    }

    getMatrix() {
        return this.matrix;
    }

    //Busca la posible columna donde haya tirado la ficha, sino es válida retorna null
    getColumnaJugada(posXFicha, posYFicha) {

        let posX = posXFicha - this.iniDibujoX;
        let posY = posYFicha;

        if (posY > this.iniDibujoY + this.tamanioCelda)
            return null;

        for (let column = 0; column < this.matX; column++) {
            if (posX >= column * this.tamanioCelda & posX < column * this.tamanioCelda + this.tamanioCelda) {
                return column;
            }
        }
        return null;
    }

    drawTablero() {
        let radius = 30;

        // dibujo un rectangulo azul en la capa 2
        this.ctx.fillStyle = "#00ffff";

        this.ctx.fillRect(this.iniDibujoX, this.iniDibujoY, this.width, this.height);

        this.ctx.fillStyle = "#222";

        //----------Habria que guardar cada circulo en la matriz?
        for (let x = 0; x < this.matX; x++) {
            for (let y = 0; y < this.matY; y++) {
                this.ctx.beginPath();

                this.ctx.arc((x * this.tamanioCelda) + (this.iniDibujoX + this.tamanioCelda / 2),
                    (y * this.tamanioCelda) + (this.iniDibujoY + this.tamanioCelda / 2),
                    radius, 0, 2 * Math.PI);

                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }

    // añade una ficha al tablero si esta cumple todas las condiciones
    addFicha(e, lastClickedFicha) {
        if (lastClickedFicha != null) {
            let column = this.getColumnaJugada(e.layerX, e.layerY);
            if (column != null) {
                for (let row = 0; row < this.matY; row++) {

                    if (this.matrix[column][row] !== null) {
                        if (row == 0) {
                            console.log("columna llena!!");
                            return false;
                        }
                        let ficha = new Ficha((column * this.tamanioCelda) + (this.iniDibujoX + this.tamanioCelda / 2),
                            ((row - 1) * this.tamanioCelda) + (this.iniDibujoY + this.tamanioCelda / 2),
                            lastClickedFicha.getFill(), this.ctx, lastClickedFicha.getJugador());

                        this.matrix[column][row - 1] = ficha;

                        ficha.draw();
                        this.checkGanador(column, row - 1);
                        return true;
                    }
                    else {
                        if (row == this.matY - 1) {
                            let ficha = new Ficha((column * this.tamanioCelda) + (this.iniDibujoX + this.tamanioCelda / 2),
                                (row * this.tamanioCelda) + (this.iniDibujoY + this.tamanioCelda / 2),
                                lastClickedFicha.getFill(), this.ctx, lastClickedFicha.getJugador());
                            this.matrix[column][row] = ficha;

                            ficha.draw();
                            this.checkGanador(column, row);
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    //Renderizar el ganador:
    renderGanador(ganador){
        let tableroWindow = document.querySelector('.espacio');
        //Creación del div
       // let widthTablero ="222px", heightTablero= "222px";
        //borra todos los hijos del div con clase tablero, es decir, los canvas dentro de él
        this.borrarHijosNodo(tableroWindow);

        //Se crea un div de renderizado
        //ganador = "Jugador 1"
        this.createDiv(tableroWindow, ganador);


        /*const divGanador = document.createElement("div");
        divGanador.className = "ganador";

        console.log(divGanador);
        tableroWindow.appendChild(divGanador);
        console.log(tableroWindow);*/
    }

    borrarHijosNodo(nodo){
        while (nodo.firstChild) {
            //obtengo el with y height del tablero.
            //widthTablero = tablero.firstChild.getAttribute("width");
            //heightTablero = tablero.firstChild.getAttribute("height");
            nodo.removeChild(nodo.firstChild);
        }
    }

    createDiv(tableroWindow, jugador){
        const divGanador = document.createElement("div");
        divGanador.className = "ganador";
        console.log(jugador);

        //Añade texto al div
        // Crea un elemento <h1>
        this.añadirTexto(divGanador, "h1", "¡¡Felicitaciones!!");
        // Crea un elemento <h2>
        this.añadirTexto(divGanador, "h2", "Ha ganado: " + jugador.getNombre());
        // Crea un elemento <h4>
        this.añadirTexto(divGanador, "h4", "Fin de la partida");

        //Se agrega el div al div tablero
        tableroWindow.appendChild(divGanador);
        console.log(tableroWindow);
    }

    añadirTexto(nodoPadre, tipoElementoHijo, textoElegido){
        const elementoHijo = document.createElement(tipoElementoHijo);
        const texto = document.createTextNode(textoElegido);
        elementoHijo.appendChild(texto); 
        //Se agregan los textos al div
        nodoPadre.appendChild(elementoHijo);
    }

    //no anda, no se usa hasta el momento
    /*newElement(typeElement, className){
        let newElement = document.createElement(typeElement);
        newElement.className = className;
        return newElement;
    }*/

    /*
        checkea si hubo un ganador
        @param columnFicha columna donde se guarda la última ficha jugada en la matriz.
        @param rowFicha fila donde se guarda la última ficha jugada en la matriz.
     */
    checkGanador(columnFicha, rowFicha) {


        //Se necesita saber de alguna forma q esta jugando el jugador x, por medio de su ficha.
        let fichaDeJugador = this.matrix[columnFicha][rowFicha];

       //BUSQUEDA POR FILA
        //Se busca desde la columna de la última inserción, hasta el maximo de columna de la matriz.
        if (this.checkFila(columnFicha, rowFicha, fichaDeJugador, 0) >= this.winLineSize-1){
            console.log("Ganó jugador fichas por fila:" + fichaDeJugador);
            this.renderGanador(fichaDeJugador.getJugador());
        }
        //BUSQUEDA POR COLUMNA
        //Se busca desde la fila de la última inserción, hasta el maximo de fila de la matriz.
        else if(this.checkColumna(columnFicha, rowFicha, fichaDeJugador) >= this.winLineSize){
            console.log("Ganó jugador fichas por columna:" + fichaDeJugador);
            this.renderGanador(fichaDeJugador.getJugador());
        }
        else if(this.checkDiagonalDerecha(columnFicha, rowFicha, fichaDeJugador) >= this.winLineSize-1){
            console.log("Ganó jugador fichas por diagonal derecha:" + fichaDeJugador);
            this.renderGanador(fichaDeJugador.getJugador());
        }
        else if(this.checkDiagonalIzquierda(columnFicha, rowFicha, fichaDeJugador) >= this.winLineSize-1){
            console.log("Ganó jugador fichas por diagonal izquierda:" + fichaDeJugador);
            this.renderGanador(fichaDeJugador.getJugador());
        }
        return false;

    }

    checkColumna(columnFicha, rowFicha, fichaDeJugador) {
        let coincidencias = 0;

        for (let rowActual = rowFicha; rowActual < this.matY; rowActual++) {
            let celda = this.matrix[columnFicha][rowActual];
            if (celda.equals(fichaDeJugador)) {
                coincidencias++;
            }
        }
        return coincidencias;
    }

    checkFila(columnActual, rowFicha, fichaDeJugador) {

        let coincidenciaIzq = 0;
        let coincidenciaDer = 0;

        this.matrix[columnActual][rowFicha].setVisitada(true);

        if (this.checkeoAdyacencia(columnActual - 1, rowFicha, fichaDeJugador)) {
            coincidenciaIzq = 1 + this.checkFila(columnActual - 1, rowFicha, fichaDeJugador);
        }

        if (this.checkeoAdyacencia(columnActual + 1, rowFicha, fichaDeJugador)) {
            coincidenciaDer = 1 + this.checkFila(columnActual + 1, rowFicha, fichaDeJugador);
        }

        this.matrix[columnActual][rowFicha].setVisitada(false);

        return coincidenciaIzq + coincidenciaDer;
    }

    // checkea si la celda no esta fuera de la matrix, si no es nula y si es la ficha es del mismo jugador
    checkeoAdyacencia(x, y, fichaDeJugador) {
        return (x >= 0 && x < this.matX &&
            y >= 0 && y < this.matY &&
            this.matrix[x][y] != null &&
            this.matrix[x][y].equals(fichaDeJugador) &&
            this.matrix[x][y].getVisitada() == false);
    }

    checkDiagonalDerecha(columnActual, rowActual, fichaDeJugador) {

        let coincidenciaIzq = 0;
        let coincidenciaDer = 0;

        this.matrix[columnActual][rowActual].setVisitada(true);

        if (this.checkeoAdyacencia(columnActual - 1, rowActual + 1, fichaDeJugador)) {
            coincidenciaIzq = 1 + this.checkDiagonalDerecha(columnActual - 1, rowActual + 1, fichaDeJugador);
        }

        if (this.checkeoAdyacencia(columnActual + 1, rowActual - 1, fichaDeJugador)) {
            coincidenciaDer = 1 + this.checkDiagonalDerecha(columnActual + 1, rowActual - 1, fichaDeJugador);
        }
        
        this.matrix[columnActual][rowActual].setVisitada(false);

        return coincidenciaIzq + coincidenciaDer;
    }

    checkDiagonalIzquierda(columnActual, rowActual, fichaDeJugador) {
        let coincidenciaIzq = 0;
        let coincidenciaDer = 0;

        this.matrix[columnActual][rowActual].setVisitada(true);

        if (this.checkeoAdyacencia(columnActual - 1, rowActual - 1, fichaDeJugador)) {
            coincidenciaIzq = 1 + this.checkDiagonalIzquierda(columnActual - 1, rowActual - 1, fichaDeJugador);
        }

        if (this.checkeoAdyacencia(columnActual + 1, rowActual + 1, fichaDeJugador)) {
            coincidenciaDer = 1 + this.checkDiagonalIzquierda(columnActual + 1, rowActual + 1, fichaDeJugador);
        }
        
        this.matrix[columnActual][rowActual].setVisitada(false);

        return coincidenciaIzq + coincidenciaDer;
    }
}
