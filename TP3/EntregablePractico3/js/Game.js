class Game {

    constructor() {
        this.objects = new Array();
        this.end = false;
        this.avatar = new Avatar();
        this.DOMGame = document.querySelector('#game-js');

    }

    startGameLoop() {
        // startGame();
        console.log("empezo el juego");
        this.renderStartGame();

        //sacando el hidden del bush
        //document.querySelector("#draw-layer").lastChild.previousSibling.classList.remove("hidden");
        /*const newDiv = document.createElement("div");
        newDiv.classList.add('asset');
        newDiv.classList.add('bush');
        document.querySelector("#draw-layer").appendChild(newDiv);*/

        /* setTimeout(() => { 
             let obs = new Obstacle();
             obs.init();
             
         }, 2000);*/


        let gameLoop = setInterval(() => {
            // processInput();
            // updateState();
            // draw();
            /*this.createObstacles();
            setTimeout(() => {this.createObstacles()}, Math.random() * 50000);*/
            //quizas se deban agregar mas cuestiones del juego
            //como el temporizador, la seleccion del avatar y fondo, etc

            setTimeout(() => { this.end = true }, 50000);
            ///SOLUCION 1
           let randomTime = 50;
           let max = 50;
           let min = 10;
            let generateObstaclesLoop = setTimeout(() => {
                this.createObstacles();
              
               randomTime += Math.floor(Math.random() * (max - min)) + min;
                
            }, randomTime);
            
           /////////////////////////
           //SOLUCION 2

           /*let randomTime = Math.random() * (8000 - 1000) + 1000;
           this.createObstacles();
           let timeId = setInterval(function(){
               if(this.end){
                   clearInterval(timeId);
               }
           }, 20);
           setTimeout(this.createObstacles(), randomTime);
           this.createObstacles();*/
           ///////////////////
            if (this.end) {
                //clearInterval(generateObstaclesLoop);
                clearInterval(gameLoop);
                console.log("termino el juego");
            }
        }, 2500);
        // endGame();
    }

    createObstacles() {
        const max = 3;
        const min = 1;
        const type = Math.floor(Math.random() * (max - min)) + min;
        let obs = new Obstacle();
        obs.init(type);
    }

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
        console.log(flyerPrincipal);
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

    processInput(event) {
        if (event.key.toLowerCase() == "w") {
            this.avatar.jump();
        }
    }


}