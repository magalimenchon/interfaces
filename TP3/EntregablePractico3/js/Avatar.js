class Avatar {

    constructor() {
        let DOMavatar = document.querySelector('#avatar');
        this.DOMavatar = DOMavatar;
        DOMavatar.addEventListener('animationend', () => {
            this.restartAnimation();
        });
        this.bottom = 0;
        this.right = 0;
        this.left = 0;
    }

    revive() {
        this.DOMavatar.classList.remove("dying");
        this.DOMavatar.classList.add("running");
    }

    die() { 
        this.DOMavatar.classList.remove("running");
        this.DOMavatar.classList.remove("jumping");
        this.DOMavatar.classList.add("dying");
        
        console.log(this.DOMavatar.classList);
        //this.DOMavatar.style.animationPlayState = "paused";
    }

    jump() {
        this.DOMavatar.classList.remove("running");
        this.DOMavatar.classList.add("jumping");
    }

    restartAnimation() {
        if (this.DOMavatar.classList.contains("jumping")){
            this.DOMavatar.classList.remove("jumping");
            this.DOMavatar.classList.add("running");
        }
        
        // this.DOMavatar.style.animationPlayState = "paused";
    }

    updatePositions() {
        this.bottom = this.DOMavatar.getBoundingClientRect().bottom;
        this.right = this.DOMavatar.getBoundingClientRect().right - 40;
        this.left = this.DOMavatar.getBoundingClientRect().left + 30;
    }

}





