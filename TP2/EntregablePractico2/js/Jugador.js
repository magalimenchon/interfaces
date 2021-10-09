class Jugador {

    constructor(nombre, colorFicha) {
        this.nombre = nombre;
        this.colorFicha = colorFicha;
    }

    equals(jugador) {
        if (this.nombre === jugador.getNombre())
            return true;
        else
            return false;
    }

    getNombre() {
        return this.nombre;
    }

    getColorFicha() {
        return this.colorFicha;
    }

    setColorFicha(colorFicha) {
        this.colorFicha = colorFicha;
    }

}