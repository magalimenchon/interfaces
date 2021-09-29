class Jugador {

    constructor(cantFichas, nombre) {
        this.fichas = [];
        this.CANT_FICHAS = cantFichas;
        this.nombre = nombre;
    }

    addFichas(){

        for (let i = 0; i < this.CANT_FICHAS; i++) {
            this.addFicha();
            
        }
    }

    addFicha(){
        let ficha = new Ficha(posX, posY, fill, ctx3);
        fichas.push(ficha);
        ficha.draw();
    }

    getTurno(){
        return this.turno;
    }

    getNombre(){
        return this.nombre;
    }
}