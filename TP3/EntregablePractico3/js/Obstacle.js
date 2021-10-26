class Obstacle {

    constructor(){
        this.id = Math.random() * 500000;
        this.idDOM;
    }

    init(type){
        const newDiv = document.createElement("div");
        newDiv.classList.add('asset');
        if(type == 1){
            newDiv.classList.add('cactus2');
        }
        else
            newDiv.classList.add('bush');
        newDiv.setAttribute("id", this.id);
        document.querySelector("#draw-layer").appendChild(newDiv);
        this.idDOM = document.getElementById(this.id);
        this.idDOM.addEventListener('animationend', () => {
            this.destroyObstacle();
        });
    }

    destroyObstacle() {
        document.querySelector("#draw-layer").removeChild(this.idDOM);
        // this.DOMavatar.style.animationPlayState = "paused";
    }
}