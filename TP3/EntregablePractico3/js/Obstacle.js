class Obstacle {

    constructor(){
    }

    init(){
        const newDiv = document.createElement("div");
        newDiv.classList.add('asset');
        newDiv.classList.add('cactus2');
        document.querySelector("#draw-layer").appendChild(newDiv);
    }
}