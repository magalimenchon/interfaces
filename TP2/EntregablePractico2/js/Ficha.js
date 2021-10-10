class Ficha {

    /**
     * @description Modelo de instancias para los objetos fichas
     * @param {integer} posX posición en eje X de la ficha
     * @param {integer} posY posición en eje X de la ficha
     * @param {*} fill relleno
     * @param {*} context cartuchera donde se va a dibujar sobre el lienzo
     * @param {String} jugador nombre del jugador
     */
    constructor(posX, posY, fill, context, jugador) {
        this.posX = posX;
        this.posY = posY;
        this.radius = 30;
        this.fill = fill;
        this.resaltado = false;
        this.resaltadoEstilo = '#fff';
        this.ctx = context;
        const img = new Image();
        img.src = "./images/coin3.png";
        this.img = img;
        this.loadedImg = false;
        this.jugador = jugador;
        this.visitada = false;
    }


    /**
     * @description Compara si otra ficha tiene el mismo dueño que ésta
     * @param {Ficha} ficha del tipo @see Ficha
     * @returns boolean si es una ficha de un mismo jugador
     */
    equals(ficha) {
        if (this.jugador.equals(ficha.getJugador()))
            return true;
        else
            return false;
    }

    /**
     * @description Retorna el dueño de la ficha
     * @returns String de nombre de jugador propietario
     */
    getJugador() {
        return this.jugador;
    }

    /**
     * @description Marca como visitada a la ficha
     * @param {boolean} visitada boolean que indica si en el recorrido de busqueda fue visitada.
     */
    setVisitada(visitada) {
        this.visitada = visitada;
    }

    /**
     * @description Retorna si la ficha está visitada
     * @returns boolean si la ficha fue marcada durante el recorrido de busqueda de ganador
     * @see Juego
     */
    getVisitada() {
        return this.visitada;
    }
    
    /**
     * @description Obtiene el relleno de la ficha
     * @returns del tipo @see Image
     */
    getFill() {
        return this.fill;
    }

    /**
     * @description Setea el relleno de la ficha
     * @param {*} fill del tipo @see Image
     */
    setFill(fill) {
        this.fill = fill;
    }

    /**
     * @description Setea la posición en el canvas que se encuentra la ficha
     * @param {integer} x posición en el eje X de la ficha
     * @param {integer} y posición en el eje Y de la ficha
     */
    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }


    /**
     * @description Retorna la posición en el canvas que se encuentra la ficha
     * @returns objeto que contiene la posición en eje X y eje Y de la ficha respectivamente.
     */
    getPosicion() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    /**
     * @description Obtiene la posición en el eje X de la ficha
     * @returns posición en eje Y de la ficha
     */
    getPosX() {
        return this.posX;
    }

    /**
     * @description Obtiene la posición en el eje Y de la ficha
     * @returns posición en eje Y de la ficha
     */
    getPosY() {
        return this.posY;
    }

    /**
     * @description Obtiene el radio de la ficha
     * @returns integer de longitud de radio
     */
    getRadius() {
        return this.radius;
    }

    /**
     * @description Setea si la ficha se encuentra resaltada
     * @param {boolean} resaltado par indicar si se encuentra seleccionada
     */
    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }

    /**
     * @description Dibuja una ficha en su respectiva capa de canvas.
     * Chequea que si la ficha debe resaltarse, esta sea resaltada y
     * si la imagen aún no se cargó la renderiza una vez que se haya cargado.
     */
    draw() {
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
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

    /**
     * @description Chequea si el punto esta dentro del radio de la ficha
     * @param {integer} x posición en el eje X del evento click dentro del canvas
     * @param {integer} y posición en el eje Y del evento click dentro del canvas
     * @returns boolean si el click fue realizando dentro de esta ficha
     */
    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    };

}