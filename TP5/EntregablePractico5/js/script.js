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

    // -------------- Galleries ------------------- //

    let galleries = document.querySelectorAll(".gallery");

    galleries.forEach(item => {

        let slideIndex = 1;
        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function showSlides(n) {
            let i;
            let slides = item.querySelectorAll(".mySlides");
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex - 1].style.display = "block";
        }

        let nextButton = item.querySelector(".next");

        nextButton.addEventListener('click', () => {
            plusSlides(1);
        });

        let prevButton = item.querySelector(".prev");

        prevButton.addEventListener('click', () => {
            plusSlides(-1);
        });

    });

    // -------------- show comments ------------------- //

    let posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        let showCommentButton = post.querySelector(".see-comments");
        let comments = post.querySelector(".comments");

        showCommentButton.addEventListener("click", () => {

            if (comments.classList.contains("hidden")) {
                comments.classList.remove("hidden");
                console.log(comments.classList);
            }
            else
                comments.classList.add("hidden");
                console.log(comments.classList);
        });
    });

    // -------------- change page search ------------------- //

    let searchBar = document.querySelector('.search-bar');

    searchBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            //set time Out de carga
            	
            location.assign('search.html');
        }
    });


    // -------------- filter search ------------------- //

    let buttonsFilter = document.querySelectorAll('.button-filter');
    let sections = document.querySelectorAll('.card-search');

    buttonsFilter.forEach(button => {

        button.addEventListener("click", () => {

            sections.forEach(section => {
                if(section.id === button.id){
                    if(section.classList.contains("hidden")){
                        section.classList.remove("hidden");
                    }
                }
                else{
                    if(!section.classList.contains("hidden")){
                        section.classList.add("hidden");
                    }
                }
            });
            buttonsFilter.forEach(buttonColor => {
                if(buttonColor.id === button.id){
                    if(!buttonColor.classList.contains("selected-button")){
                        buttonColor.classList.add("selected-button");
                    }
                }
                else{
                    if(buttonColor.classList.contains("selected-button")){
                        buttonColor.classList.remove("selected-button");
                    }
                }
            });
        });
    });
});