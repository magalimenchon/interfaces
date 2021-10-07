class Jugador {

    constructor(nombre, colorFicha) {
        this.nombre = nombre;
        this.colorFicha = colorFicha;
    }

    equals(jugador){
        if(this.nombre === jugador.getNombre())
            return true;
        else
            return false;
    }

    getNombre(){
        return this.nombre;
    }

    getColorFicha(){
        return this.colorFicha;
    }

    // getPuntos(index){
    //     if(index === "x")
    //         return this.puntosX;
    //     else if (index === "y")
    //         return this.puntosY;
    // }

    // resetPuntos(index){
    //     if(index === "x")
    //         this.puntosX = 0;
    //     else if (index === "y")
    //         this.puntosY = 0;
    // }
}