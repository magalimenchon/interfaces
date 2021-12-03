document.addEventListener("DOMContentLoaded", () => {

    // -------------- Loading ------------------- //

    async function TraerProductos() {
        let container = document.querySelector(".home-container");
        try {
            let response = await fetch("../htmlLoad/homeLoad.html");
            if (response.ok) {
                let t = await response.text();
                container.innerHTML = t;
                initGalleries();
                initShowComments();
                initPromotePost();
                container.classList.remove("justify-content");
            }
            else
                container.innerHTML = "<h1>Error - Failed URL!</h1>";
        }
        catch (error) {
            console.log(error);
            container.innerHTML = "<h1>Connection error</h1>";
        };
    }

    setTimeout(TraerProductos, 1500);

    // -------------- Promote post ------------------- //

    function initPromotePost() {
        let posts = document.querySelectorAll(".post");

        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the <span> element that closes the modal
        let close = document.querySelector(".button-cancel");
        let send = document.querySelector(".button-send");

        posts.forEach(post => {
            let button = post.querySelector(".button-prom");

            button.onclick = function () {
                modal.style.display = "block";
            }
            
            send.onclick = function () {
                post.classList.add("promoted");
                button.innerHTML = "";
                modal.style.display = "none";
            }

            close.onclick = function () {
                modal.style.display = "none";
            }

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

        })
    }

    // -------------- Galleries ------------------- //

    function initGalleries() {
        let galleries = document.querySelectorAll(".gallery");

        galleries.forEach(item => {

            let slideIndex = 1;
            showSlides(slideIndex);

            function plusSlides(n) {
                showSlides(slideIndex += n);
            }

            function showSlides(n) {
                let i;
                let slides = item.querySelectorAll(".fade");
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
    }


    // -------------- show comments ------------------- //

    function initShowComments() {
        let posts = document.querySelectorAll(".post");

        posts.forEach(post => {
            let showCommentButton = post.querySelector(".see-comments");
            let comments = post.querySelector(".comments");

            showCommentButton.addEventListener("click", () => {
                if (comments.classList.contains("hidden")) {
                    comments.classList.remove("hidden");
                }
                else
                    comments.classList.add("hidden");
            });
        });
    }


});