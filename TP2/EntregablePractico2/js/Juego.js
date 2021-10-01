class Juego {

    constructor(){
        this.jugador1 = new Jugador();
        this.jugador2 = new Jugador();
        this.tablero = new Tablero();
    }

    jugar(){
        
       // this.jugador1.getTurno().habilitarTurno();



    }

    //on mouse down, e.layerX, e.layerY
    tirarFichaEnColumna(posX, posY){
        if(jugadaValida(posX, posY)){
            column = this.tablero.getColumnaJugada();
            if(column){
                return null;
            }
            else{
                return null
                //retornar a la posicion donde estaba antes de tirarla
            }
        }
        else{
            return null
            //retornar a la posicion donde estaba antes de tirarla 
        }
    }

    //Checkea si se lanzó la ficha dentro de los margenes superiores del tablero,
    //dentro de los límites laterales, y que no sobrepase la base del tablero
    jugadaValida(posXFicha, posYFicha){
        if(posXFicha >= initX &&
        posXFicha <= width //tablero
            && posYFicha <= initY && y >= height){
                return true;
        }
        else return false;
    }
}