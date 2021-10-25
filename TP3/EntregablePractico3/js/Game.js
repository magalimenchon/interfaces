class Game {

    constructor(){
        this.objects = new Array();
        this.end = false;
    }

    startGameLoop(){
        // startGame();
        console.log("empezo el juego");
        let gameLoop = setInterval(function () {
            // processInput();
            // updateState();
            // draw();
            // setTimeout(this.end = true, 3000);

            if (end)
                clearInterval(gameLoop);
        }, 50);
        console.log("termino el juego");
        // endGame();
    }
    
}