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

    destroyAsset() {
        document.querySelector("#draw-layer").removeChild(this.DOMasset);
    }

    updatePositions() {
        this.top = this.DOMasset.getBoundingClientRect().top;
        this.right = this.DOMasset.getBoundingClientRect().right;
        this.left = this.DOMasset.getBoundingClientRect().left;
        this.bottom = this.DOMasset.getBoundingClientRect().bottom;
    }
}