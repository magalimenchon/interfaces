class Game {

    constructor() {
        this.objects = new Array();
        this.end = false;
        this.avatar = new Avatar();
        this.containerMenu = document.querySelector('#menu-js');
        this.containerGame = document.querySelector('#game-js');
         
    }

    startGameLoop() {
        // startGame();
        console.log("empezo el juego");
        this.changeMenuForGame();
        
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

    changeMenuForGame() {
        this.containerMenu.classList.remove("general-info");
        this.containerMenu.classList.add("hidden");
        //lo siguiente seria crear una instancia de un nuevo juego:
        //-----------
        //Chequear que toma el evento de la tecla w igual, aunque no este el juego renderizado
        //-------
        this.containerGame.classList.remove("hidden");
        this.containerGame.classList.add("game");
    }

    processInput(event) {
        if (event.key.toLowerCase() == "w") {
            this.avatar.jump();
        }

    }


}