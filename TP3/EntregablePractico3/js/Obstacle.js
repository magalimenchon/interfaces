class Obstacle {

    constructor() {
        this.id = Math.floor(Math.random() * 500000);
        this.DOMobstacle;
        this.top = 0;
        this.right = 0;
        this.left = 0;
    }

    init() {
        const newDiv = document.createElement("div");

        newDiv.classList.add('asset');
        newDiv.classList.add(this.setTypeRandomObstacle());

        newDiv.setAttribute("id", this.id);

        document.querySelector("#draw-layer").appendChild(newDiv);

        this.DOMobstacle = document.getElementById(this.id);
        this.DOMobstacle.addEventListener('animationend', () => {

            this.destroyObstacle();
        });
    }

    setTypeRandomObstacle(){
        let objMax = 4;
        let objMin = 1;
        let type = Math.floor(Math.random() * (objMax - objMin)) + objMin;

        if (type == 1)
            type = 'cactus2';
        else if (type == 2) {
            type = 'bush';
        }
        else
            type = 'skeleton';

        return type;
    }

    destroyObstacle() {
        document.querySelector("#draw-layer").removeChild(this.DOMobstacle);
        // this.DOMavatar.style.animationPlayState = "paused";
    }

    updatePositions() {
        this.top = this.DOMobstacle.getBoundingClientRect().top;
        this.right = this.DOMobstacle.getBoundingClientRect().right;
        this.left = this.DOMobstacle.getBoundingClientRect().left;
    }

}