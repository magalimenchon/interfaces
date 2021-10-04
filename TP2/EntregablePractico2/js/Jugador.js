class Jugador {

    constructor(nombre) {
        this.nombre = nombre;
        this.puntosX = 0;
        this.puntosY = 0;
    }

    equals(jugador){
        if(this.jugador.nombre === jugador.getNombre())
            return true;
        else
            return false;
    }

    getNombre(){
        return this.nombre;
    }

    getPuntos(index){
        if(index === "x")
            return this.puntosX;
        else if (index === "y")
            return this.puntosY;
    }

    resetPuntos(index){
        if(index === "x")
            this.puntosX = 0;
        else if (index === "y")
            this.puntosY = 0;
    }
}