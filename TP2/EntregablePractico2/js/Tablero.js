
class Tablero {

    constructor(matX, matY, ctx) {
        let tamanioCelda = 70;
        let matrix = [];
        this.matX = matX;
        this.matY = matY;
        this.tamanioCelda = tamanioCelda;
        this.width = matX*tamanioCelda;
        this.height = matY*tamanioCelda;
        this.iniDibujoX = 50;
        this.iniDibujoY = 70;
        this.ctx = ctx;
        // esta bien crear la matriz en el constructor??
        for(let x=0; x < matX; x++){
            matrix[x] = [];
            for(let y=0; y < matY; y++){
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
    getColumnaJugada(posXFicha, posYFicha){

        let posX = posXFicha - this.iniDibujoX;
        let posY = posYFicha;

        if(posY > this.iniDibujoY + this.tamanioCelda)
            return null;

        for (let column = 0; column < this.matX; column++) {
            if(posX >= column*this.tamanioCelda & posX < column*this.tamanioCelda + this.tamanioCelda){
                return column;
            }
        }
        return null;
    }

    drawTablero(){
        let radius = 30;

        // dibujo un rectangulo azul en la capa 2
        this.ctx.fillStyle = "#00ffff";
        this.ctx.fillRect(this.iniDibujoX, this.iniDibujoY, this.width, this.height);

        this.ctx.fillStyle = "#222";

       //----------Habria que guardar cada circulo en la matriz?
        for (let x = 0; x < this.matX; x++) {
            for (let y = 0; y < this.matY; y++) {
                this.ctx.beginPath();
               
                this.ctx.arc((x * this.tamanioCelda) + (this.iniDibujoX + this.tamanioCelda/2),
                               (y * this.tamanioCelda) + (this.iniDibujoY + this.tamanioCelda/2), 
                               radius, 0, 2 * Math.PI);
                
                this.ctx.fill();
                this.ctx.closePath();
            } 
        }
    }

    // añade una ficha al tablero si esta cumple todas las condiciones
    addFicha(e, lastClickedFicha){
        if (lastClickedFicha != null){
            let column = this.getColumnaJugada(e.layerX, e.layerY);
            if(column != null){
                for (let row = 0; row < this.matY; row++){
                
                    if(this.matrix[column][row] !== null){
                        if(row == 0){
                            console.log("columna llena!!");
                            return;
                        }
                        let ficha = new Ficha((column * this.tamanioCelda) + (this.iniDibujoX + this.tamanioCelda/2),
                        ((row-1) * this.tamanioCelda) + (this.iniDibujoY + this.tamanioCelda/2),
                                    lastClickedFicha.getFill(), this.ctx);
                        this.matrix[column][row-1] = ficha;
                        ficha.draw();
                        //console.log("C", column, "R", row-1);
                        //nuev0
                        this.checkGanador(column, row-1);
                        //
                        return;
                    }
                    else{
                        if(row == this.matY-1){
                            let ficha = new Ficha((column * this.tamanioCelda) + (this.iniDibujoX + this.tamanioCelda/2),
                            (row * this.tamanioCelda) + (this.iniDibujoY + this.tamanioCelda/2),
                                        lastClickedFicha.getFill(), this.ctx);
                            this.matrix[column][row] = ficha;
                            ficha.draw();
                            //console.log("C", column, "R", row);
                             //nuev0
                            this.checkGanador(column, row);
                            //
                        }
                    }

                }
            }
            //console.log("hola matriz", this.matrix); 
        } 
    }

    /*
        checkea si hubo un ganador
        @param columnFicha columna donde se guarda la última ficha jugada en la matriz.
        @param rowFicha fila donde se guarda la última ficha jugada en la matriz.
     */
    checkGanador(columnFicha, rowFicha){

        //-----------COMPROBAR XQ EN CHECK DIAGONALES Y FILA (RECURSION)
        //contempla 2 veces el console.log del if de coincidencias == 4
        // (En consola figura 2 veces el ganó)

        //Se necesita saber de alguna forma q esta jugando el jugador x, por medio de su ficha.
        let fichaDeJugador = this.matrix[columnFicha][rowFicha].getFill();

        //BUSQUEDA POR COLUMNA
        //Se busca desde la fila de la última inserción, hasta el maximo de fila de la matriz.
        this.checkFila(columnFicha, rowFicha, fichaDeJugador, 0);
        //BUSQUEDA POR FILA
        //Se busca desde la columna de la última inserción, hasta el maximo de columna de la matriz.
        this.checkColumna(columnFicha, rowFicha, fichaDeJugador);

        this.checkDiagonalDerecha(columnFicha, rowFicha, fichaDeJugador, 0);

        this.checkDiagonalIzquierda(columnFicha, rowFicha, fichaDeJugador, 0);
        //BUSQUEDA POR DIAGONAL DERECHA
        //Siempre sucederá que los elementos que coincidan en diagonal hacia la derecha
        //con el elemento, daran todos el mismo resultado al hacer columnaFicha+rowFicha
        //Si la diagonal se dibuja desde la derecha, es porque arranca en fila = 0,
        //por lo tanto:
        //let inicDiagDerecha = columnFicha + rowFicha;

        //Si se pasa de rango en la suma, defino que arranque desde el borde correspondiente.
        /*if(inicDiagDerecha > this.matY)
            inicDiagDerecha = inicDiagDerecha - this.matY;

        for(let columnActual = inicDiagDerecha; columnActual >= 0; columnActual--){
            let filaActual = inicDiagDerecha - columnActual;
            console.log("c"+columnActual+"f"+filaActual);
            let celda = this.matrix[columnActual][filaActual];
            if(celda != null){
                if(celda.getFill() == fichaDeJugador){
                    coincidencias++;
                    if(coincidencias == 4){
                        console.log("Ganó jugador fichas diagonal derecha:" + fichaDeJugador);
                        return true;
                    }
                }
                //Salgo del for de columna
                else {
                    coincidencias = 0;
                    columnActual = -1;
                }  
            }
        }*/

        
         //BUSQUEDA POR DIAGONAL IZQUIERDA
        //Siempre sucederá que los elementos que coincidan en diagonal hacia la izquierda
        //con el elemento, daran todos el mismo resultado al hacer |columnaFicha-rowFicha|

        return false;
        
    }

    checkColumna(columnFicha, rowFicha, fichaDeJugador){
        let coincidencias = 0;

        for(let rowActual = rowFicha; rowActual < this.matY; rowActual++){
            let celda = this.matrix[columnFicha][rowActual];
            if(celda.getFill() === fichaDeJugador){
                coincidencias++;
                if(coincidencias == 4){
                    console.log("Ganó jugador fichas por columna:" + fichaDeJugador);
                    return true;
                }
            }
            //Se sale del for de fila
            else {
                return false;
            }
        }
    }

    checkFila(columnActual, rowFicha, fichaDeJugador, coincidencias){
        if(coincidencias == 4){
            console.log("Ganó jugador fichas por fila:" + fichaDeJugador);
            return true;
        }
        else{
            if(columnActual >= 0 && columnActual < this.matX &&
                this.matrix[columnActual][rowFicha] != null &&
                this.matrix[columnActual][rowFicha].getFill() === fichaDeJugador
                && this.matrix[columnActual][rowFicha].getVisitada() == false){
                this.matrix[columnActual][rowFicha].setVisitada(true);
                coincidencias++;
                this.checkFila(columnActual - 1, rowFicha, fichaDeJugador, coincidencias);
                this.checkFila(columnActual + 1, rowFicha, fichaDeJugador, coincidencias);
                this.matrix[columnActual][rowFicha].setVisitada(false);
            }
            else{
                return false;
            }
        }
    }

    //Comprobar si funciona
    checkDiagonalDerecha(columnActual, rowActual, fichaDeJugador, coincidencias){
        if(coincidencias == 4){
            console.log("Ganó jugador fichas por diagonal derecha:" + fichaDeJugador);
            return true;
        }
        else{
            if( columnActual >= 0 && columnActual < this.matX &&
                rowActual >= 0 && rowActual < this.matY &&
                this.matrix[columnActual][rowActual] != null &&
                this.matrix[columnActual][rowActual].getFill() === fichaDeJugador
                && this.matrix[columnActual][rowActual].getVisitada() == false){

                this.matrix[columnActual][rowActual].setVisitada(true);
                coincidencias++;
                this.checkDiagonalDerecha(columnActual + 1, rowActual - 1, fichaDeJugador, coincidencias);
                this.checkDiagonalDerecha(columnActual - 1, rowActual + 1, fichaDeJugador, coincidencias);
                this.matrix[columnActual][rowActual].setVisitada(false);
            }
            else{
                return false;
            }
        }
    }

    checkDiagonalIzquierda(columnActual, rowActual, fichaDeJugador, coincidencias){
        if(coincidencias == 4){
            console.log("Ganó jugador fichas por diagonal izquierda:" + fichaDeJugador);
            return true;
        }
        else{
            if( columnActual >= 0 && columnActual < this.matX &&
                rowActual >= 0 && rowActual < this.matY &&
                this.matrix[columnActual][rowActual] != null &&
                this.matrix[columnActual][rowActual].getFill() === fichaDeJugador
                && this.matrix[columnActual][rowActual].getVisitada() == false){
                this.matrix[columnActual][rowActual].setVisitada(true);
                coincidencias++;
                this.checkDiagonalIzquierda(columnActual - 1, rowActual - 1, fichaDeJugador, coincidencias);
                this.checkDiagonalIzquierda(columnActual + 1, rowActual + 1, fichaDeJugador, coincidencias);
                this.matrix[columnActual][rowActual].setVisitada(false);
            }
            else{
                return false;
            }
        }
    }
}
