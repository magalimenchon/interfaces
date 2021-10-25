class Avatar {

    constructor(){
        this.DOMavatar = document.querySelector('#avatar');
        this.DOMavatar.addEventListener('animationend', this.restartAnimation());
    }

    jump() {
        this.DOMavatar.classList.add("jumping");
    }

    restartAnimation() {
        this.DOMavatar.classList.remove("jumping");
    }
    

}



