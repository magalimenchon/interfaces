class Avatar {

    constructor() {
        let DOMavatar = document.querySelector('#avatar');
        this.DOMavatar = DOMavatar;
        DOMavatar.addEventListener('animationend', () => {
            this.restartAnimation();
        });
        this.top = 0;
        this.right = 0;
        this.left = 0;
        this.bottom = 0;
        this.avatar;
        this.setFieldAvatar();
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
     * Chequea el estado actual del avatar, y cambia el estado de dying a running
     */
    revive() {
        this.setFieldAvatar();
        this.DOMavatar.classList.remove("dying-" + this.avatar);
        this.DOMavatar.classList.add("running-" + this.avatar);
    }

    /**
     * Chequea el estado actual del avatar, y cambia el estado de running o jumping a dying
     */
    die() {
        this.setFieldAvatar();
        this.DOMavatar.classList.remove("running-" + this.avatar);
        this.DOMavatar.classList.remove("jumping-" + this.avatar);
        this.DOMavatar.classList.add("dying-" + this.avatar);

    }

    /**
     * Chequea el estado actual del avatar, y cambia el estado de running a jumping
     */
    jump() {
        this.setFieldAvatar();
        this.DOMavatar.classList.remove("running-" + this.avatar);
        this.DOMavatar.classList.add("jumping-" + this.avatar);
    }

    /**
     * Chequea el estado actual del avatar, y cambia el estado de jumping a running en caso
     * que esté saltando y tiene que dejar de saltar
     */
    restartAnimation() {
        this.setFieldAvatar();
        if (this.DOMavatar.classList.contains("jumping-" + this.avatar)) {
            this.DOMavatar.classList.remove("jumping-" + this.avatar);
            this.DOMavatar.classList.add("running-" + this.avatar);
        }

    }
    
    /**
     * Actualiza las posiciones relativas con respecto a la
     * pantalla de visualización en las que se encuentra 
     */
    updatePositions() {
        this.top = this.DOMavatar.getBoundingClientRect().top;
        this.right = this.DOMavatar.getBoundingClientRect().right - 40;
        this.left = this.DOMavatar.getBoundingClientRect().left + 30;
        this.bottom = this.DOMavatar.getBoundingClientRect().bottom;
    }

}





