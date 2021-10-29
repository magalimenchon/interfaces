class Asset {

    constructor() {
        this.id = Math.floor(Math.random() * 500000);
        this.DOMasset;
        this.top = 0;
        this.right = 0;
        this.left = 0;
        this.bottom = 0;
        this.type = "";
    }

    /**
     * Crea un asset de tipo aleatorio (definido por la clase de la
     * hoja de estilos aleatoria) en el DOM.
     * Responde al evento de finalización de la animación de los elementos de esta clase,
     * haciendo que se eliminen en el DOM.
     */
    init() {
        const newDiv = document.createElement("div");

        newDiv.classList.add('asset');
        newDiv.classList.add(this.getTypeOf());

        newDiv.setAttribute("id", this.id);

        document.querySelector("#draw-layer").appendChild(newDiv);

        this.DOMasset = document.getElementById(this.id);
        this.DOMasset.addEventListener('animationend', () => {

            this.destroyAsset();
        });
    }

    /**
     * A partir de un random numérico define la clase de hoja de estilo que será el asset
     * @returns el tipo de asset
     */
    getTypeOf() {
        let objMax = 5;
        let objMin = 1;
        let randomNum = Math.floor(Math.random() * (objMax - objMin)) + objMin;

        switch (randomNum) {
            case 1:
                this.type = 'cactus2';
                break;
            case 2:
                this.type = 'bush';
                break;
            case 3:
                this.type = 'skeleton';
                break;
            default:
                this.type = 'collectible';
        }
  
        return this.type;
    }

    /**
     * Elimina del DOM a sí mismo (div que lo contiene)
     */
    destroyAsset() {
        document.querySelector("#draw-layer").removeChild(this.DOMasset);
    }

    /**
     * Actualiza las posiciones relativas con respecto a la
     * pantalla de visualización en las que se encuentra 
     */
    updatePositions() {
        this.top = this.DOMasset.getBoundingClientRect().top;
        this.right = this.DOMasset.getBoundingClientRect().right;
        this.left = this.DOMasset.getBoundingClientRect().left;
        this.bottom = this.DOMasset.getBoundingClientRect().bottom;
    }
}