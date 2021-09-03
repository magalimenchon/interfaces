/*document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina() {*/
    "use strict";

    class Rect extends Figure{
        //CONSTRUCTOR
        constructor(posX, posY, width, height, fill, context){
            super(posX, posY, fill, context);
            this.width= width;
            this.height = height;
        }

        draw(){
            super.draw();
            this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
            if(this.resaltado === true){
                this.ctx.strokeStyle = this.resaltadoEstilo;
                this.ctx.lineWidth = 5;
                this.ctx.strokeRect(this.posX, this.posY, this.width, this.height);
            }
        }

        getWidth(){
            return this.width;
        }

        getHeight(){
            return this.height;
        }

        //Mide el x de donde arranca el rectangulo (margen superior izquierdo del rectangulo)
        // (es decir, desde el origen del lienzo hasta esta coordenada del rectangulo),
        //comparado con la diferencia del valor de x donde se clickea (es decir, la distancia
        //entre el lienzo y el punto donde se clickea).
        //Esa distancia debe ser menor (estar dentro del rango) del ancho del rectangulo.
        // Univoco para eje y.
        isPointInside(x, y){ 
                    //En x: si está mas a la izquierda de donde arranca el rectangulo, no lo tomo
                    //si está más a la derecha, tiene que estar dentro del rango del rectangulo.
                    //En y: si está mas arriba de donde arranca el rectangulo, no lo tomo
                    //si está más abajo, tiene que estar dentro del rango del rectangulo.
            return !(x < this.posX || x > this.posX * this.width || y < this.posY || y > this.posY* this.height);
        };
    }

//}