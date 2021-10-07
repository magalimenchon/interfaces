class Ficha {

    constructor(posX, posY, fill, context, jugador) {
        this.posX = posX;
        this.posY = posY;
        this.radius = 30;
        this.fill = fill;
        this.resaltado = false;
        this.resaltadoEstilo = '#fff';
        this.ctx = context;
        const img = new Image();
        img.src = "../EntregablePractico2/images/coin3.png";
        this.img = img;
        this.loadedImg = false;
        this.jugador = jugador;
        //nuevo
        this.visitada = false;
    }

    equals(ficha){
        if(this.jugador.equals(ficha.getJugador()))
            return true;
        else
            return false;
    }

    getJugador(){
        return this.jugador;
    }

    setVisitada(visitada) {
        this.visitada = visitada;
    }

    getVisitada(){
        return this.visitada;
    }

    setFill(fill) {
        this.fill = fill;
    }

    getFill(){
        return this.fill;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    getPosicion() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getFill() {
        return this.fill;
    }

    getRadius() {
        return this.radius;
    }

    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }

    draw() {
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI*2);
        this.ctx.fill();

        if (this.resaltado === true) {
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
        this.ctx.closePath();
        if (this.loadedImg) {
            this.ctx.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
        }
        else {
            this.img.onload = () => {
                this.ctx.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
            }
            this.loadedImg = true;
        }
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    };

}