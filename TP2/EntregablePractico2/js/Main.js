document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    // canvas capa trasera
    let canvas2 = document.querySelector('#canvas-layer2');
    let ctx2 = canvas2.getContext('2d');

    // canvas capa delantera
    let canvas1 = document.querySelector('#canvas-layer1');

    //Manejo del menú
    let buttonJugar = document.querySelector('#js-btn-jugar');

    //--
    let tablero = new Tablero(ctx2);
    let juego = new Juego(tablero, canvas1);
    let timer = new Timer();
    
    buttonJugar.addEventListener('click', (e) => {
        activebuttonJugar();

    });

    function activebuttonJugar(){
        timer.resetTimer();

        let fecha = new Date();
        timer.countdown(fecha.setMinutes(fecha.getMinutes()+10), 'Tiempo agotado');

        /*let jugador1 = new Jugador("Jugador 1", document.querySelector('#js-input-color1').value);
        let jugador2 = new Jugador("Jugador 2", document.querySelector('#js-input-color1').value);*/

        tablero.inicializarMatriz();
        
        //juego.resetJuego();

        juego.iniciarJuego();
        /*if(juego.checkFinalizacion()){
            tablero = null;
            juego = null;
        }*/

        canvas1.addEventListener('mousedown', onMouseDown, false);
        window.addEventListener('mouseup', onMouseUp, false);
        canvas1.addEventListener('mousemove', onMouseMove, false);

        function onMouseDown(e){
            juego.onMouseDown(e);
        }

        function onMouseMove(e){
            juego.onMouseMove(e);
        }

        function onMouseUp(e){
            juego.onMouseUp(e);
        }
    }


});