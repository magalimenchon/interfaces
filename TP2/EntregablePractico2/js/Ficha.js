class Ficha {

    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.radius = 30;
        this.fill = fill;
        this.resaltado = false;
        this.resaltadoEstilo = 'red';
        this.ctx = context;
        this.loadedImg = false;
    }

    setFill(fill) {
        this.fill = fill;
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
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        if (this.resaltado === true) {
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
        this.ctx.closePath();
        const img = new Image();
        img.src = "../EntregablePractico2/images/coin.png";
        if (this.loadedImg) {
            this.ctx.drawImage(img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
        }
        else {
            img.onload = () => {
                this.ctx.drawImage(img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
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