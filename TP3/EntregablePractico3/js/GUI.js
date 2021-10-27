"use strict";
class GUI {

    constructor(){
        this.DOMGame = document.querySelector('#game-js');
        this.info = "Do you want to try again?";
        //"Thank you for playing";
        this.status = "playing";
    }

    setMessage(status, text = null){

        this.status = status;
        if(text != null){
            this.info = text; 
        }
    }

    /**
     * RENDERIZACION INICIAL
     */

    renderStartGame() {
        this.renderRemoveMenu();
        //Se agrega el avatar
        this.renderAvatar();
    }

    renderRemoveMenu() {
        this.DOMGame.classList.remove("general-info");
        this.DOMGame.classList.add("game");
        //Se modifica sector cartel runner
        this.renderRemoveFlyerRunner();
        //Se modifica el sector cartel principal info
        this.renderRemoveFlyerPrincipal();
    }

    renderRemoveFlyerPrincipal() {
        const flyerPrincipal = this.DOMGame.lastChild.previousSibling;
        this.DOMGame.removeChild(flyerPrincipal);
    }
    renderRemoveFlyerRunner() {
        const flyerRunner = this.DOMGame.firstChild.nextSibling;
        flyerRunner.classList.remove("information");
        flyerRunner.removeChild(flyerRunner.firstChild.nextSibling);
    }

    renderAvatar() {
        const avatar = document.querySelector('#avatar');
        avatar.classList.remove("hidden");
    }

    /**
     * RENDERIZACION FINAL
     */
    renderGameOver(){
        this.renderStopBackground();
        this.renderStatusGame();
    }

    renderStopBackground(){
        let background = document.querySelectorAll('.layer');
        //console.log(background);

        background.forEach(layer => {
            layer.style.animationPlayState = "paused";
        });
    }

    /**
     * <div class="layer information" >
                <div class="word-congrats">
                    <h2>Game over</h2>
                    <p>Congrats, you won!</p>
                    <button id="button-play-js">Play again</button>
                </div>
            </div>
     */

    renderStatusGame(){

        /**
         * CREACION DE ELEMENTOS
         */
        //DIV PRINCIPAL
        let newDivPrincipal = document.createElement("div");

        newDivPrincipal.classList.add('layer');
        newDivPrincipal.classList.add('information');

        console.log(newDivPrincipal);
        //DIV SECUNDARIO
        let newDivSec = document.createElement("div");
        newDivSec.classList.add('word-congrats');

        //H2
        let h2 = document.createElement("h2");
        h2.innerHTML = this.status;
        
        //P
        let p = document.createElement("p");
        p.innerHTML = this.info;

        //button
        let button =  document.createElement("button");
        button.setAttribute("id", "button-play-js");
        button.innerHTML = "Play Again";

        /**
         * INSERCION EN DOM
         */
        //de button, p y h2 en div word-congrats
        newDivSec.appendChild(h2);
        newDivSec.appendChild(p);
        newDivSec.appendChild(button);

        //de div sec a div principal
        newDivPrincipal.appendChild(newDivSec);
        //de div principal a la seccion
        this.DOMGame.appendChild(newDivPrincipal);


        
    }
}