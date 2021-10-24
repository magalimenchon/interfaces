document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const avatar = document.querySelector('#avatar');

    document.addEventListener('keyup', action);

    avatar.addEventListener('animationend', restartAnimation);

    function action(event){
        if(event.key.toLowerCase() == "w"){
            jump();
        }
    }

    function jump(){
        avatar.classList.add("jumping");
        console.log("saltando");
        console.log(avatar.getAttribute("background"));

    }

    function restartAnimation(){
        avatar.classList.remove("jumping");
        console.log("deja de saltar");
        console.log(avatar.getAttribute("background"));
    }

    
});