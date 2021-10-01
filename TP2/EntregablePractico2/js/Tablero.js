
class Tablero {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = Array(width).fill(Array(height));
    }

    getMatrix() {
        return this.matrix;
    }

    //Busca la posible columna donde haya tirado la ficha, sino es válida retorna null
    getColumnaJugada(posXFicha, posYFicha){

            for (let column = 0; column < this.matrix.width; column++) {
           
                if(this.matrix[column].posY - widthPixelsTablero
                    )
                {
                    return column;
                }
            }
        return null;
    }

    //Busca en determinada columna un espacio libre,
    //iterando por filas, comenzando desde la última. Sino encuentra retorna null
    getEspacioLibreEnColumna(column){
        for (let row = this.matrix.height-1; row >= 0; row--) {
            if(this.matrix[row][column] == null){
                return this.matrix[row][column];
            }
        }
        return null;
    }
}
