"use strict";
class GUI {

    constructor(){
        this.DOMGame = document.querySelector('#game-js');
        this.info;
        //"Thank you for playing";
        this.status;
    }

    setMessage(status, text = null){

        this.status = status;
        if(text != null){
            this.info = text; 
        }
    }

    /**
     * RENDERIZAR ESTILO DE JUEGO
     */
    renderInitGame(){
        this.renderRemoveMenu();
        this.renderAvatar();
    }

     renderResetGame(){
        this.renderRemoveInfo();
        this.renderRemovePreviousGame();
       // this.renderChoicesOptionsGame();
     }

     renderRemovePreviousGame(){
         //RESET DE OBSTACULOS Y COLECCIONES
        let objects = document.querySelectorAll('.asset');
        objects.forEach(asset => {
            asset.parentNode.removeChild(asset);
        });
        //activar el fondo
        this.renderPlayBackground();
     }

     renderPlayBackground(){
        let background = document.querySelectorAll('.layer');
        //console.log(background);

        background.forEach(layer => {
            layer.style.animationPlayState = "running";
        });
    }

     //chequear si se puede pasar funcion por parametro (seria createDivSecOption, etc)
     renderChoicesOptionsGame(){
        let newDivPrincipal = this.createDivPrincipal();

        //DIV SECUNDARIO
        let newDivSec = this.createDivSecOptions();

        //de div sec a div principal
        newDivPrincipal.appendChild(newDivSec);
        //de div principal a la seccion
        this.DOMGame.appendChild(newDivPrincipal);
    }
    
    toogleBackground(DOMButton){

        DOMButton.classList.toggle("button-color-init-background");
        DOMButton.classList.toggle("button-color-toogle-background");

        let background = document.querySelectorAll('.layer');
        //console.log(background);

        let indexLayer = 9;
        background.forEach(layer => {
            layer.classList.toggle("layer-night-"+indexLayer);
            layer.classList.toggle("layer-"+indexLayer);
            indexLayer--;
        });
    }

    toogleAvatar(DOMButton){

        DOMButton.classList.toggle("button-color-init-avatar");
        DOMButton.classList.toggle("button-color-toogle-avatar");

        /*let avatar = document.querySelector('#avatar');
        //console.log(avatar);

        avatar.classList.toggle("girl");
        avatar.classList.toggle("boy");*/
    }

    createDivSecOptions(){

        let newDivSec = this.createDivSec();

        //H2
        let h3 = document.createElement("h3");
        h3.innerHTML = "Customizer";
        
        //info
        let ul = document.createElement("ul");
        ul.innerHTML = "Click to toogle the style of the game:";

        //button custom background
        let buttonCustomBackground =  document.createElement("button");
        buttonCustomBackground.setAttribute("id", "button-custom-background-js");
        buttonCustomBackground.innerHTML = "Change Background";
        buttonCustomBackground.classList.add('button-custom-background');
        buttonCustomBackground.classList.add('button-color-init-background');

        //button custom avatar
        let buttonCustomAvatar =  document.createElement("button");
        buttonCustomAvatar.setAttribute("id", "button-custom-avatar-js");
        buttonCustomAvatar.innerHTML = "Change Avatar";
        buttonCustomAvatar.classList.add('button-custom-avatar');
        buttonCustomAvatar.classList.add('button-color-init-avatar');

        //button finish
        let buttonFinish =  document.createElement("button");
        buttonFinish.setAttribute("id", "button-finish-custom-js");
        buttonFinish.innerHTML = "Ready!";

        /**
         * INSERTAR EN DIV LOS BOTONES
         */
        let divButtons = document.createElement("div");
        divButtons.appendChild(buttonCustomBackground);
        divButtons.appendChild(buttonCustomAvatar);
        /**
         * INSERCION EN DOM
         */
        newDivSec.appendChild(h3);
        newDivSec.appendChild(ul);
        newDivSec.appendChild(divButtons);
        newDivSec.appendChild(buttonFinish);

        return newDivSec;
    }

    /**
     * RENDERIZAR INSTRUCCIONES
     */
    renderInstructions(){
        this.renderRemoveInfo();
        this.renderWindowInformation();
    }

    renderRemoveInfo(){
        this.DOMGame.removeChild(this.DOMGame.lastChild);
    }

    renderWindowInformation(){
        let newDivPrincipal = this.createDivPrincipal();

        //DIV SECUNDARIO
        let newDivSec = this.createDivSecInstructions();

        //de div sec a div principal
        newDivPrincipal.appendChild(newDivSec);
        //de div principal a la seccion
        this.DOMGame.appendChild(newDivPrincipal);
    }

    createDivSecInstructions(){

        let newDivSec = this.createDivSec();

        //H2
        let h3 = document.createElement("h3");
        h3.innerHTML = "Instructions";
        
        //ul1
        let ul1 = document.createElement("ul");
        ul1.innerHTML = "You must dodge the obstacles, and collect coins.";

        //ul2
        let ul2 = document.createElement("ul");
        ul2.innerHTML = "Be careful, the collision with an obstacle could kill you!";

        //ul3
        let ul3 = document.createElement("ul");
        ul3.innerHTML = "Use 'W' to jump!!";

        //li
        let li = document.createElement("li");

        //button
        let button =  document.createElement("button");
        button.setAttribute("id", "button-start-game-js");
        button.innerHTML = "Start";

        /**
         * INSERTAR UL EN LI
         */
        li.appendChild(ul1);
        li.appendChild(ul2);
        li.appendChild(ul3);
        /**
         * INSERCION EN DOM
         */
        //de button, li y h2 en div word-congrats
        newDivSec.appendChild(h3);
        newDivSec.appendChild(li);
        newDivSec.appendChild(button);

        return newDivSec;
    }

    /**
     * RENDERIZACION INICIAL DE JUEGO
     */

    renderStartGame() {
        this.renderRemoveInfo();
        //Se agrega el avatar
        // this.renderAvatar();
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


    renderStatusGame(){
        /**
         * CREACION DE ELEMENTOS
         */
        //DIV PRINCIPAL
        let newDivPrincipal = this.createDivPrincipal();

        //DIV SECUNDARIO
        let newDivSec = this.createDivSecStatus();

        //de div sec a div principal
        newDivPrincipal.appendChild(newDivSec);
        //de div principal a la seccion
        this.DOMGame.appendChild(newDivPrincipal);

    }

    createDivPrincipal(){
        let newDivPrincipal = document.createElement("div");

        newDivPrincipal.classList.add('layer');
        newDivPrincipal.classList.add('information');
        return newDivPrincipal;
    }

    createDivSecStatus(){

        let newDivSec = this.createDivSec();
        //H2
        let h2 = document.createElement("h2");
        h2.innerHTML = this.status;
        
        //P
        let p = document.createElement("p");
        p.innerHTML = this.info;

        //button
        let button =  document.createElement("button");
        button.setAttribute("id", "button-play-again-js");
        button.innerHTML = "Play Again";

        /**
         * INSERCION EN DOM
         */
        //de button, p y h2 en div word-congrats
        newDivSec.appendChild(h2);
        newDivSec.appendChild(p);
        newDivSec.appendChild(button);

        return newDivSec;
    }

    createDivSec(){
        let newDivSec = document.createElement("div");
        newDivSec.classList.add('word-congrats');
        return newDivSec;
    }

}