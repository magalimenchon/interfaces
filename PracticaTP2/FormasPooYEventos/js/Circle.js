/*document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina() {*/
    "use strict";

    class Circle extends Figure{
        //CONSTRUCTOR
        constructor(posX, posY, radius, fill, context){
            super(posX, posY, fill, context);
            this.radius= radius;
        }

        draw(){
            super.draw();
            this.ctx.beginPath();
            this.ctx.arc(this.posX, this.posY, this.radius, 0, 2* Math.PI);
            this.ctx.fill();
            if(this.resaltado === true){
                this.ctx.strokeStyle = this.resaltadoEstilo;
                this.ctx.lineWidth = 5;
                this.ctx.stroke();
            }
            this.ctx.closePath();
        }

        getRadius(){
            return this.radius;
        }


        //Distancia entre 2 puntos. Pitágoras
        // x e y son las posiciones del mouse.
        
        isPointInside(x, y){
            let _x = this.posX - x;
            let _y = this.posY - y; 
            return Math.sqrt((_x * _x) + (_y * _y)) < this.radius;
        };
    }

//}