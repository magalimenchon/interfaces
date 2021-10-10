class Jugador {

    /**
     * @description Molde de instancias de jugadores
     * @param {String} nombre nombre jugador
     * @param {String} colorFicha color de relleno de ficha
     */
    constructor(nombre, colorFicha) {
        this.nombre = nombre;
        this.colorFicha = colorFicha;
    }

    /**
     * @description Dado un jugador, chequea si es la misma instancia
     * @param {Jugador} jugador del tipo @see Jugador
     * @returns boolean es el mismo jugador
     */
    equals(jugador) {
        if (this.nombre === jugador.getNombre())
            return true;
        else
            return false;
    }

    /**
     * @description Obtiene nombre de propietario
     * @returns String nombre del jugador
     */
    getNombre() {
        return this.nombre;
    }

    /**
     * @description Obtiene el color elegido de ficha para jugar
     * @returns String color ficha
     */
    getColorFicha() {
        return this.colorFicha;
    }

    /**
     * @description Setea el color de la ficha del jugador
     * @param {String} colorFicha color en sistema hexadecimal
     */
    setColorFicha(colorFicha) {
        this.colorFicha = colorFicha;
    }

}