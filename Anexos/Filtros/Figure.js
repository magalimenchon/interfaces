/*document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina() {*/
    "use strict";

    class Figure {
        //CONSTRUCTOR
        constructor(posX, posY, fill, context){
            this.posX = posX;
            this.posY = posY;
            this.fill = fill;
            this.resaltado = false;
            this.resaltadoEstilo = 'red';
            this.ctx = context;
        }

        setFill(fill){
            this.fill = fill;
        }

        setPosition(x, y){
            this.posX = x;
            this.posY = y;
        }

        getPosicion(){
            return {
                x: this.getPosX(),
                y: this.getPosY()
            };
        }

        getPosX(){
            return this.posX;
        }

        getPosY(){
            return this.posY;
        }

        getFill(){
            return this.fill;
        }

        draw(){
            this.ctx.fillStyle = this.fill;
        }

        setResaltado(resaltado){
            this.resaltado = resaltado;
        }

        //método abstracto o hook (Usado cuando se necesita asociar algo funcional
        //a un componente que se repite en la página),
        //que indicaría si el mouse está dentro de la figura, sirve para cuando se selecciona.
        isPointInside(x, y){  };
    }

//}