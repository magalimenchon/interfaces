document.addEventListener("DOMContentLoaded", () => {

    // -------------- Parrallax ------------------- //

    document.addEventListener("mousemove", parallax);
    function parallax(e) {

        document.querySelectorAll(".parrallax").forEach(function (move) {
            let moving_value = move.getAttribute("data-value");
            let x = (((e.clientX - (window.innerWidth / 2)) * moving_value) / 500);
            let y = (((e.clientY - (window.innerHeight / 2)) * moving_value) / 500);
            move.style.transform = "translateX(" + -x + "px) translateY(" + -y + "px)";
        });
    }

});