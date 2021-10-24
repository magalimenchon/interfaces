document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const avatar = document.querySelector('#avatar');

    /*document.addEventListener("keydown", (event) =>{
        //console.log("saltando", event.key);
        if(event.key.toLowerCase() == "w"){
            console.log("saltando", event.key);
            avatar.classList.remove("running");
            avatar.classList.add("jumping");
            console.log(avatar);
        }
    });*/
/*
    document.addEventListener("keyup", (event) =>{
        console.log("termino animacion", event.key);
        if(event.key.toLowerCase() == "w"){
            console.log(avatar);
            avatar.classList.remove("jumping");
            avatar.classList.add("running");
        }
    });*/
    /*avatar.addEventListener("animationend", () =>{
        avatar.classList.remove("jumping");
        avatar.classList.add("running");
    })*/

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