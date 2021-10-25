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

        let gameLoop = setInterval(function () {
            // processInput();
            // updateState();
            // draw();
            

            //quizas se deban agregar mas cuestiones del juego
            //como el temporizador, la seleccion del avatar y fondo, etc

            setTimeout(() => { this.end = true }, 5000);

            if (this.end) {
                clearInterval(gameLoop);
                console.log("termino el juego");
            }
        }, 50);
        // endGame();
    }

    renderStartGame(){
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

    renderRemoveFlyerPrincipal(){
        const flyerPrincipal = this.DOMGame.lastChild.previousSibling;
        console.log(flyerPrincipal);
        this.DOMGame.removeChild(flyerPrincipal);
    }
    renderRemoveFlyerRunner(){
        const flyerRunner = this.DOMGame.firstChild.nextSibling;
        flyerRunner.classList.remove("information");
        flyerRunner.removeChild(flyerRunner.firstChild.nextSibling);
    }

    renderAvatar(){
        const containerAvatar = document.querySelector('.layer-1');
        const avatar = containerAvatar.lastChild.previousSibling;
        avatar.classList.remove("hidden");
    }

    processInput(event) {
        console.log(event);
        if (event != null && event.key.toLowerCase() == "w") {
            this.avatar.jump();
        }
    }

}