"use strict";
/**
 * Interfaz gráfica de usuario. Maneja la parte de vista del juego
 */
class GUI {

    constructor() {
        this.DOMGame = document.querySelector('#game-js');
        this.info;
        this.status;
        this.background;
        this.avatar;
        this.setFieldBackground();
        this.setFieldAvatar();
    }

    /**
     * Setea el mensaje que va a mostrarse por pantalla ante un cambio de estado del juego
     * @param {} status 
     * @param {*} text 
     */
    setMessage(status, text = null) {

        this.status = status;
        if (text != null) {
            this.info = text;
        }
    }

    /**
     * Define el atributo conforme al modo de fondo elegido alternadamente
     */
    setFieldBackground() {

        if (document.querySelector('#draw-layer').classList.contains("layer-day-1")) {
            this.background = "day";
        }
        else {
            this.background = "night";
        }
    }
    /**
     * Define el atributo conforme al modo de avatar elegido alternadamente
     */
    setFieldAvatar() {

        if (document.querySelector('#avatar').classList.contains("running-cowgirl")
        || document.querySelector('#avatar').classList.contains("jumping-cowgirl")
        || document.querySelector('#avatar').classList.contains("dying-cowgirl")) {
            this.avatar = "cowgirl";
        }
        else {
            this.avatar = "cowboy";
        }
    }
    /**
     * CAMBIO DE RENDERIZACIÓN DINÁMICA DE INICIO DE JUEGO
     */

    /**
     * Renderizado inicial del sitio, para comenzar a jugar.
     * Quita la pantalla principal de inicio y muestra un avatar que se encontraba oculto.
     */
    renderInitGame() {
        this.renderRemoveMenu();
        this.renderAvatar();
    }

    /**
     * Borra la pantalla inicial para poder mostrar luego
     * la pantalla de opciones de customizado
     */
    renderRemoveMenu() {
        this.DOMGame.classList.remove("general-info");
        this.DOMGame.classList.add("game");
        //Se modifica sector cartel runner
        this.renderRemoveFlyerRunner();
        //Se modifica el sector cartel principal info
        this.renderRemoveFlyerPrincipal();
    }

    /**
     * Borra el div que contiene el título y el botón de la pantalla de juego inicial
     */
    renderRemoveFlyerPrincipal() {
        const flyerPrincipal = this.DOMGame.lastChild.previousSibling;
        this.DOMGame.removeChild(flyerPrincipal);
    }

    /**
     * Borra banner de la pantalla de juego inicial
     */
    renderRemoveFlyerRunner() {
        const flyerRunner = this.DOMGame.firstChild.nextSibling;
        flyerRunner.classList.remove("information");
        flyerRunner.removeChild(flyerRunner.firstChild.nextSibling);
    }

    /**
     * Muestra en patalla el div del avatar que se encontraba oculto,
     * luego de clickear el botón de play now de la pantalla de juego inicial
     */
    renderAvatar() {
        const avatar = document.querySelector('#avatar');
        avatar.classList.remove("hidden");
    }

    /**
     * CAMBIO DE RENDERIZACIÓN DINÁMICA DE COMIENZO DE PARTIDA
     */

    /**
     * Borra la pantalla de opciones de customización
     * para poder renderizar luego el juego
     * y genera los elementos del DOM para el score
     */
    renderStartGame() {
        this.renderRemoveInfo();
        this.renderScore();
    }

    /**
     * Crea un elemento en el DOM para mostrar la cantidad
     * de coleccionables que tiene hasta el momento
     */
    renderScore(){
        let divScore = this.createDivPrincipal();

        divScore.setAttribute("id", "score");

        let divQuantity = document.createElement("div");
        divQuantity.classList.add("score");

        let h4 = document.createElement("h4");
        h4.innerHTML = 0;
        h4.classList.add("number-score");

        let divCollectible = document.createElement("div");
        divCollectible.classList.add("collectible-img");

        divQuantity.appendChild(h4);
        divQuantity.appendChild(divCollectible);
        divScore.appendChild(divQuantity);
        this.DOMGame.appendChild(divScore);
    }
    /**
     * actualiza el renderizado de la cantidad de coleccionables que tiene hasta el momento.
     * @param {int} score número de score de coleccionables acumulados
     */
     updateScoreInGame(score){
        document.querySelector('.number-score').innerHTML = score;
     }

    /**
     * CAMBIO DE RENDERIZACIÓN DINÁMICA DE RESET DE PARTIDA
     */

    /**
     * Borra la pantalla que indicaba el fin de la partida,
     * borra los objetos que quedaron estáticos/pausados,
     * restaurando la pantalla para permitir customizar.
     */
    renderResetGame() {
        this.renderRemoveInfo();
        this.renderRemovePreviousGame();
    }

    /**
     * Elimina los objetos del DOM a interactuar de la pantalla,
     * y reanuda el movimiento del fondo.
     */
    renderRemovePreviousGame() {
        //eliminar div score
        let score = document.querySelector('#score');
        score.parentNode.removeChild(score);
        //RESET DE OBSTACULOS Y COLECCIONES
        let objects = document.querySelectorAll('.asset');
        objects.forEach(asset => {
            asset.parentNode.removeChild(asset);
        });
        //activar el fondo
        this.renderPlayBackground();
    }

    /**
     * Selecciona cada capa del DOM y reanuda la pausa del parallax
     */
    renderPlayBackground() {
        let background = document.querySelectorAll('.layer');
        //console.log(background);

        background.forEach(layer => {
            layer.style.animationPlayState = "running";
        });
    }

    /**
     * PANTALLA DE OPCIONES DE CUSTOMIZACIÓN
     */
    /**
     * Crea dinámicamente la pantalla de opciones de customización
     */
    renderChoicesOptionsGame() {
        let newDivPrincipal = this.createDivPrincipal();

        //DIV SECUNDARIO
        let newDivSec = this.createDivSecOptions();

        //de div sec a div principal
        newDivPrincipal.appendChild(newDivSec);
        //de div principal a la seccion
        this.DOMGame.appendChild(newDivPrincipal);
    }

    /**
     * Selecciona del DOM todas las capas de fondo, y alterna la de noche/día
     * según corresponda el cambio.
     * Modifica el color del botón que se clickeó, por el modo contrario al que
     * se cambió, permitiendo al usuario saber que si clickea en este cambiará
     * al de ese color (referenciando naranja == día / violeta == noche).
     * Actualiza el atributo que guarda el modo actual del fondo.
     * @param {button} DOMButton Botón para alternar fondo, que ha sido clickeado
     */
    toogleBackground(DOMButton) {

        DOMButton.classList.toggle("button-color-background-with-day");
        DOMButton.classList.toggle("button-color-background-with-night");

        let background = document.querySelectorAll('.layer');

        let indexLayer = 9;
        background.forEach(layer => {
            layer.classList.toggle("layer-night-" + indexLayer);
            layer.classList.toggle("layer-day-" + indexLayer);
            indexLayer--;
        });

        console.log(this.background);
    }

    /**
     * Selecciona el avatar del DOM y lo alterna por otro.
     * Modifica el color del botón que se clickeó, por el modo contrario al que
     * se cambió, permitiendo al usuario saber que si clickea en este cambiará
     * al de ese color (referenciando green == cowboy / grey == cowgirl).
     * Actualiza el atributo que guarda el avatar actual.
     * @param {button} DOMButton Botón para alternar avatar, que ha sido clickeado 
     */
    toogleAvatar(DOMButton) {

        this.se
        DOMButton.classList.toggle("button-color-avatar-with-cowboy");
        DOMButton.classList.toggle("button-color-avatar-with-cowgirl");

        let avatar = document.querySelector('#avatar');
        //console.log(avatar);

        avatar.classList.toggle("running-cowgirl");
        avatar.classList.toggle("running-cowboy");
    }

    /**
     * Crea el div con la información para la pantalla de opciones de customización
     * @returns Div con el contenido agregado
     */
    createDivSecOptions() {

        let newDivSec = this.createDivSec();

        //H2
        let h3 = document.createElement("h3");
        h3.innerHTML = "Customizer";

        //info
        let ul = document.createElement("ul");
        ul.innerHTML = "Click to toogle the style of the game:";

        //button custom background
        let buttonCustomBackground = document.createElement("button");
        buttonCustomBackground.setAttribute("id", "button-custom-background-js");
        buttonCustomBackground.innerHTML = "Change Background";
        buttonCustomBackground.classList.add('button-custom-background');
        buttonCustomBackground.classList.add('button-color-background-with-' + this.background);

        //button custom avatar
        let buttonCustomAvatar = document.createElement("button");
        buttonCustomAvatar.setAttribute("id", "button-custom-avatar-js");
        buttonCustomAvatar.innerHTML = "Change Avatar";
        buttonCustomAvatar.classList.add('button-custom-avatar');
        buttonCustomAvatar.classList.add('button-color-avatar-with-' + this.avatar);

        //button finish
        let buttonFinish = document.createElement("button");
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
     * PANTALLA DE INSTRUCCIONES
     */

    /**
     * Crea dinámcicamente la pantalla de instrucciones,
     * borrando la información anterior que se estaba mostrando
     * y agregando la nueva que se quiere renderizar.
     */
    renderInstructions() {
        this.renderRemoveInfo();
        this.renderWindowInformation();
    }

    /**
     * Borra la pantalla con información, siendo esta
     * el último div creado en la sección del DOM
     */
    renderRemoveInfo() {
        this.DOMGame.removeChild(this.DOMGame.lastChild);
    }

    /**
     * Renderiza la información sobre las instrucciones en la pantalla
     */
    renderWindowInformation() {
        let newDivPrincipal = this.createDivPrincipal();

        //DIV SECUNDARIO
        let newDivSec = this.createDivSecInstructions();

        //de div sec a div principal
        newDivPrincipal.appendChild(newDivSec);
        //de div principal a la seccion
        this.DOMGame.appendChild(newDivPrincipal);
    }

    /**
     * Crea los elementos del DOM con la respectivas clases y contenidos
     * para mostrar sobre las instrucciones dentro de un div
     * @returns elemento del DOM del tipo DIV con el contenido ya asociado
     */
    createDivSecInstructions() {

        let newDivSec = this.createDivSec();

        //H2
        let h3 = document.createElement("h3");
        h3.innerHTML = "Instructions";

        //ul1
        let ul1 = document.createElement("ul");
        ul1.innerHTML = "You must dodge the obstacles and collect treasures";

        //ul2
        let ul2 = document.createElement("ul");
        ul2.innerHTML = "Be careful, the collision with an obstacle could kill you!";

        //ul3
        let ul3 = document.createElement("ul");
        ul3.innerHTML = "Run and use 'W' to jump!!";

        //li
        let li = document.createElement("li");

        //button
        let button = document.createElement("button");
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
        //de button, li y h3 en div word-congrats
        newDivSec.appendChild(h3);
        newDivSec.appendChild(li);
        newDivSec.appendChild(button);

        return newDivSec;
    }

    /**
     * PANTALLA FINAL PARTIDA
     */

    /**
     * Crea dinámicamente la pantalla de fin de partida.
     * Frena la animación de movimiento de las capas de fondo, 
     * y muestra la pantalla asociada con la información de fin de partida.
     */
    renderGameOver() {
        this.renderStopBackground();
        this.renderStatusGame();
    }

    /**
     * Frena y pausa el movimiento del fondo de parallax
     */
    renderStopBackground() {
        let background = document.querySelectorAll('.layer');
        //console.log(background);

        background.forEach(layer => {
            layer.style.animationPlayState = "paused";
        });
    }


    /**
     * Crea la información a renderizar en el DOM para indicar lo
     * sucedido al finalizar la partida.
     */
    renderStatusGame() {
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

    /**
     * Crea un div para colocar la información prinicpal de pantalla
     * @returns elemento del DOM del tipo DIV con el contenido ya asociado
     */
    createDivPrincipal() {
        let newDivPrincipal = document.createElement("div");

        newDivPrincipal.classList.add('layer');
        newDivPrincipal.classList.add('information');
        return newDivPrincipal;
    }

    /**
     * Crea un div para mostrar la información de finalización de partida
     * @returns div con el contenido correspondiente
     */
    createDivSecStatus() {

        let newDivSec = this.createDivSec();
        //H2
        let h2 = document.createElement("h2");
        h2.innerHTML = this.status;

        //P
        let p = document.createElement("p");
        p.innerHTML = this.info;

        //button
        let button = document.createElement("button");
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

    /**
     * Crea un div con la estructura para la información de finalización de partida
     * @returns div para insertar en el DOM
     */
    createDivSec() {
        let newDivSec = document.createElement("div");
        newDivSec.classList.add('word-congrats');
        return newDivSec;
    }

}