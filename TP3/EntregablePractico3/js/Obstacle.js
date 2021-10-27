class Obstacle {

    constructor() {
        this.id = Math.floor(Math.random() * 500000);
        this.DOMobstacle;
        this.top = 0;
        this.right = 0;
        this.left = 0;
    }

    init(type) {
        const newDiv = document.createElement("div");
        newDiv.classList.add('asset');
        
        if (type == 1)
            newDiv.classList.add('cactus2');
        else if (type == 2)
            newDiv.classList.add('bush');
        else
            newDiv.classList.add('skeleton');

        newDiv.setAttribute("id", this.id);
        document.querySelector("#draw-layer").appendChild(newDiv);
        this.DOMobstacle = document.getElementById(this.id);
        this.DOMobstacle.addEventListener('animationend', () => {

            this.destroyObstacle();
        });
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