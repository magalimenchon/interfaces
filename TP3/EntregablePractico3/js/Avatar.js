class Avatar {

    constructor(){
        let DOMavatar = document.querySelector('#avatar');
        this.DOMavatar = DOMavatar;
        DOMavatar.addEventListener('animationend', () => {
            this.restartAnimation();
        });
    }

    jump() {
        console.log(this.DOMavatar.style.animationPlayState);
        this.DOMavatar.classList.remove("running");
        this.DOMavatar.classList.add("jumping");
    }

    restartAnimation() {
        this.DOMavatar.classList.remove("jumping");
        this.DOMavatar.classList.add("running");
        // this.DOMavatar.style.animationPlayState = "paused";
    }
    

}





