
class Tablero {

    /**
     * @description Molde de instancias de objetos de tipo Tablero
     * @param {*} ctx contexto en el cual se podrá dibujar el tablero
     */
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
        this.hayGanador = false;
    }

    /**
     * @description resetea la matriz de fichas dentro del tablero
     */
    setMatrix() {
        this.matrix = [];
    }

    /**
     * @description devuelve cantidad celdas en eje X del tablero
     * @returns integer de la cantidad de columnas que tiene la matriz de fichas
     */
    getMatX() {
        return this.matX;
    }

    /**
     * @description devuelve cantidad celdas en eje Y del tablero
     * @returns integer de la cantidad de filas que tiene la matriz de fichas
     */
    getMatY() {
        return this.matY;
    }

    /**
     * @description Obtiene el tamaño de una celda
     * @returns integer del tamaño de cada celda del tablero
     */
    getTamanioCelda() {
        return this.tamanioCelda;
    }
    
    /**
     * @description parámetro de cantidad de coincidencias para ganar un juego
     * @returns integer límite buscado para ganar
     */
    getWinLineSize() {
        return this.winLineSize;
    }

    /**
     * @description Obtiene herramienta para el renderizado del tablero
     * @returns instancia de contexto donde se encuentra
     */
    getContext() {
        return this.context;
    }
    
    /**
     * @description Obtiene la longitud que abarca una celda
     * @returns integer longitud en eje Y
     */
    getHeight() {
        return this.height;
    }

    /**
     * @description Obtiene la longitud que abarca una celda
     * @returns integer longitud en eje X
     */
    getWidth() {
        return this.width;
    }

    /**
     * @description Obtiene la matriz que almacena las instancias de fichas que se van jugando en el tablero
     * @returns array de array @see array
     */
    getMatrix() {
        return this.matrix;
    }

    /**
     * @description Obtiene si algún jugador fue definido ganador
     * @returns boolean indicando si alguien ganó la partida
     */
    getHayGanador() {
        return this.hayGanador;
    }

    /**
     * @description Inicializa la matriz que almacenará las fichas que se van tirando en el tablero
     */
    inicializarMatriz() {
        for (let x = 0; x < this.matX; x++) {
            this.matrix[x] = [];
            for (let y = 0; y < this.matY; y++) {
                this.matrix[x][y] = null;
            }
        }
    }

    /**
     * @description Busca la posible columna donde haya tirado la ficha, sino es válida retorna null
     * @param {integer} posXFicha posición en el eje X del canvas donde se lanzó la ficha
     * @param {integer} posYFicha posición en el eje Y del canvas donde se lanzó la ficha
     * @returns Integer de columna de la matriz o null
     */
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

    /**
     * @description dibuja el tablero en el canvas, indicandole el color que debe llevar
     * y renderizando los huecos donde irían las fichas según las dimensiones definidas de
     * la matriz conforme al tipo de instancia de juego
     */
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

    /**
     * @description Añade una ficha al tablero si esta cumple todas las condiciones
     * @param {*} e evento del navegador
     * @param {Ficha} lastClickedFicha del tipo @see Ficha indicando la ficha clickeada
     * @returns boolean si pudo agregarse al tablero
     */
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

                        // agrega la ficha en la celda anterior
                        this.matrix[column][row - 1] = ficha;

                        ficha.draw();
                        this.checkGanador(column, row - 1);
                        this.cantFichasMatriz++;
                        return true;
                    }
                    else {
                        // si no hay fichas pero llego a la última fila
                        if (row == this.matY - 1) {
                            let ficha = new Ficha((column * this.tamanioCelda) + (this.iniDibujoX + this.tamanioCelda / 2),
                                (row * this.tamanioCelda) + (this.iniDibujoY + this.tamanioCelda / 2),
                                lastClickedFicha.getFill(), this.ctx, lastClickedFicha.getJugador());

                            // agrega la ficha en la última posición
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

    /**
     * @description Chequea si la matriz esta llena de fichas
     * @returns boolean de atributo que se incrementa cada vez que se agrega una ficha a la matriz
     */
    checkMatrizLlena() {
        return this.cantFichasMatriz == this.matX * this.matY;
    }

    /**
     * @description Chequea si hibo ganador
     * @param {integer} columnFicha número de columna donde se guarda la última ficha jugada en la matriz.
     * @param {integer} rowFicha número de fila donde se guarda la última ficha jugada en la matriz.
     */
    checkGanador(columnFicha, rowFicha) {


        //Se necesita saber de alguna forma q esta jugando el jugador x, por medio de su ficha.
        let fichaDeJugador = this.matrix[columnFicha][rowFicha];


        if (this.checkFila(columnFicha, rowFicha, fichaDeJugador, 0) >= this.winLineSize - 1) {
            this.hayGanador = true;
        }
        else if (this.checkColumna(columnFicha, rowFicha, fichaDeJugador) >= this.winLineSize) {
            this.hayGanador = true;
        }
        else if (this.checkDiagonalDerecha(columnFicha, rowFicha, fichaDeJugador) >= this.winLineSize - 1) {
            this.hayGanador = true;
        }
        else if (this.checkDiagonalIzquierda(columnFicha, rowFicha, fichaDeJugador) >= this.winLineSize - 1) {
           this.hayGanador = true;
        }

    }

    /**
     * @description BUSQUEDA POR COLUMNA: Se busca desde la fila de la última inserción, hasta el maximo de fila de la matriz
     * @param {integer} columnFicha número de columna donde está la última ficha que se tiró en el tablero
     * @param {integer} rowFicha  número de fila donde está la última ficha que se tiró en el tablero
     * @param {Ficha} fichaDeJugador instancia de @see Ficha
     * @returns integer de cantidad de fichas adyascentes a la ficha analizada
     */
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

    /**
     * @description BUSQUEDA POR FILA: Se busca de forma recursiva las fichas iguales a la ultima
     * insertada dentro de la fila y retorna la cantidad de coincidencias
     * @param {integer} columnActual número de fila donde está la última ficha que se tiró en el tablero
     * @param {integer} rowFicha número de fila donde está la última ficha que se tiró en el tablero 
     * @param {Ficha} fichaDeJugador instancia de @see Ficha
     * @returns integer de cantidad de fichas adyascentes a la ficha analizada
     */
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

    /**
     * @description Chequea si la celda no esta fuera de la matrix, si no es nula y
     * si la ficha es del mismo jugador
     * @param {integer} x número de fila donde está la última ficha que se tiró en el tablero 
     * @param {integer} y número de columna donde está la última ficha que se tiró en el tablero
     * @param {Ficha} fichaDeJugador instancia de @see Ficha
     * @returns boolean
     */
    checkeoAdyacencia(x, y, fichaDeJugador) {
        return (x >= 0 && x < this.matX &&
            y >= 0 && y < this.matY &&
            this.matrix[x][y] != null &&
            this.matrix[x][y].equals(fichaDeJugador) &&
            this.matrix[x][y].getVisitada() == false);
    }

    /**
     * @description BUSQUEDA POR DIAGONAL SUPERIOR DE INICIO A LA DERECHA:
     * busca de forma recursiva las fichas iguales a la ultima insertada
     * dentro de la diagonal y retorna la cantidad de coincidencias
     * @param {integer} columnActual número de de fila donde está la última ficha que se tiró en el tablero
     * @param {integer} rowActual número de fila donde está la última ficha que se tiró en el tablero 
     * @param {Ficha} fichaDeJugador instancia de @see Ficha
     * @returns integer de cantidad de fichas adyascentes a la ficha analizada
     */
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

    /**
     * @description BUSQUEDA POR DIAGONAL SUPERIOR DE INICIO A LA IZQUIERDA:
     * busca de forma recursiva las fichas iguales a la ultima insertada dentro de la diagonal y
     * retorna la cantidad de coincidencias
     * @param {integer} columnActual número de columna donde está la última ficha que se tiró en el tablero
     * @param {integer} rowActual número de fila donde está la última ficha que se tiró en el tablero 
     * @param {Ficha} fichaDeJugador instancia de @see Ficha
     * @returns integer de cantidad de fichas adyascentes a la ficha analizada
     */
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
