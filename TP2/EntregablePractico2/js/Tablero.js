
class Tablero {

    constructor(ctx) {
        let tamanioCelda = 70;
        let matrix = [];
        let winLineSize = parseInt(document.querySelector('#js-select-gameMod').value);
        let matX = winLineSize + 3;
        let matY = winLineSize + 2;
        this.winLineSize = winLineSize;
        this.matX = matX;
        this.matY = matY;
        this.tamanioCelda = tamanioCelda;
        this.width = matX * tamanioCelda;
        this.height = matY * tamanioCelda;
        this.iniDibujoX = 50;
        this.iniDibujoY = 70;
        this.ctx = ctx;
        this.matrix = matrix;
        this.inicializarMatriz();
        this.cantFichasMatriz = 0;
        this.ganaron = false;
    }


    // getters
    setMatrix() {
        this.matrix = [];
    }

    getMatX() {
        return this.matX;
    }
    getMatY() {
        return this.matY;
    }
    getTamanioCelda() {
        return this.tamanioCelda;
    }
    getWinLineSize() {
        return this.winLineSize;
    }
    getContext() {
        return this.context;
    }
    getHeight() {
        return this.height;
    }
    getWidth() {
        return this.width;
    }
    getMatrix() {
        return this.matrix;
    }

    //Inicializa la matriz que almacenará las fichas que se van tirando en el tablero
    inicializarMatriz() {
        for (let x = 0; x < this.matX; x++) {
            this.matrix[x] = [];
            for (let y = 0; y < this.matY; y++) {
                this.matrix[x][y] = null;
            }
        }
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

    // dibuja el tablero en el canvas
    draw() {
        let radius = 30;

        // dibujo un rectangulo azul en la capa 2
        this.ctx.fillStyle = "#00ffff";
        this.ctx.fillRect(this.iniDibujoX, this.iniDibujoY, this.width, this.height);

        this.ctx.fillStyle = "#222";
        //dibuja los circulos en el tablero
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

                    // si hay una ficha en la fila celda
                    if (this.matrix[column][row] !== null) {
                        // si la columna esta llena
                        if (row == 0) {
                            return false;
                        }
                        let ficha = new Ficha((column * this.tamanioCelda) + (this.iniDibujoX + this.tamanioCelda / 2),
                            ((row - 1) * this.tamanioCelda) + (this.iniDibujoY + this.tamanioCelda / 2),
                            lastClickedFicha.getFill(), this.ctx, lastClickedFicha.getJugador());

                        // agrego la ficha en la celda anterior
                        this.matrix[column][row - 1] = ficha;

                        ficha.draw();
                        this.checkGanador(column, row - 1);
                        this.cantFichasMatriz++;
                        return true;
                    }
                    else {
                        // si no hay fichas pero llego a la ultima fila
                        if (row == this.matY - 1) {
                            let ficha = new Ficha((column * this.tamanioCelda) + (this.iniDibujoX + this.tamanioCelda / 2),
                                (row * this.tamanioCelda) + (this.iniDibujoY + this.tamanioCelda / 2),
                                lastClickedFicha.getFill(), this.ctx, lastClickedFicha.getJugador());

                            // agrego la ficha en la ultima poscicion
                            this.matrix[column][row] = ficha;

                            ficha.draw();
                            this.checkGanador(column, row);
                            this.cantFichasMatriz++;
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    // checkea si la matriz esta llena de fichas
    checkMatrizLlena() {
        return this.cantFichasMatriz == this.matX * this.matY;
    }


    /*
        checkea si hubo un ganador
        @param columnFicha columna donde se guarda la última ficha jugada en la matriz.
        @param rowFicha fila donde se guarda la última ficha jugada en la matriz.
     */
    checkGanador(columnFicha, rowFicha) {


        //Se necesita saber de alguna forma q esta jugando el jugador x, por medio de su ficha.
        let fichaDeJugador = this.matrix[columnFicha][rowFicha];


        if (this.checkFila(columnFicha, rowFicha, fichaDeJugador, 0) >= this.winLineSize - 1) {
            this.ganaron = true;
            //this.renderMensaje("Ha ganado: " + fichaDeJugador.getJugador().getNombre(), "Fin de la partida");
        }
        else if (this.checkColumna(columnFicha, rowFicha, fichaDeJugador) >= this.winLineSize) {
            //this.renderMensaje("Ha ganado: " + fichaDeJugador.getJugador().getNombre(), "Fin de la partida");
            this.ganaron = true;
        }
        else if (this.checkDiagonalDerecha(columnFicha, rowFicha, fichaDeJugador) >= this.winLineSize - 1) {
            //this.renderMensaje("Ha ganado: " + fichaDeJugador.getJugador().getNombre(), "Fin de la partida");
            this.ganaron = true;
        }
        else if (this.checkDiagonalIzquierda(columnFicha, rowFicha, fichaDeJugador) >= this.winLineSize - 1) {
            //this.renderMensaje("Ha ganado: " + fichaDeJugador.getJugador().getNombre(), "Fin de la partida");
            this.ganaron = true;
        }
        //return false;

    }

    getGanaron() {
        return this.ganaron;
    }

    //BUSQUEDA POR COLUMNA
    //Se busca desde la fila de la última inserción, hasta el maximo de fila de la matriz.
    checkColumna(columnFicha, rowFicha, fichaDeJugador) {
        let coincidencias = 0;

        for (let rowActual = rowFicha; rowActual < this.matY; rowActual++) {
            let celda = this.matrix[columnFicha][rowActual];
            if (celda.equals(fichaDeJugador)) {
                coincidencias++;
            }
            else {
                rowActual = this.matY;
            }
        }
        return coincidencias;
    }

    //BUSQUEDA POR FILA
    //busca de forma recursiva las fichas iguales a la ultima insertada dentro de la fila y retorna la cantidad de coincidencias
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

    // checkea si la celda no esta fuera de la matrix, si no es nula y si la ficha es del mismo jugador
    checkeoAdyacencia(x, y, fichaDeJugador) {
        return (x >= 0 && x < this.matX &&
            y >= 0 && y < this.matY &&
            this.matrix[x][y] != null &&
            this.matrix[x][y].equals(fichaDeJugador) &&
            this.matrix[x][y].getVisitada() == false);
    }

    //BUSQUEDA POR DIAGONAL DERECHA
    //busca de forma recursiva las fichas iguales a la ultima insertada dentro de la diagonal y retorna la cantidad de coincidencias
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

    //BUSQUEDA POR DIAGONAL IZQUIERDA
    //busca de forma recursiva las fichas iguales a la ultima insertada dentro de la diagonal y retorna la cantidad de coincidencias
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
