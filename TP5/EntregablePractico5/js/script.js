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
            }
            else
                comments.classList.add("hidden");
        });
    });

    // -------------- chat ------------------- //

    const onFormSubmit = (event) => {
        event.preventDefault();

        let input = document.querySelector('.text-message');
        let text = input.value

        input.value = '';
        input.focus();

        let newDiv = document.createElement("div");

        let textNode = document.createTextNode(text);
        let p = document.createElement("p");
        p.appendChild(textNode);

        newDiv.appendChild(p);

        newDiv.classList.add("message-out")
        document.querySelector(".chat-center").appendChild(newDiv);
    }

    document.getElementById('chat').addEventListener('submit', onFormSubmit);

    // -------------- chat contacts ------------------- //

    let chatList = document.querySelectorAll(".chat-item");

    chatList.forEach(item => {
        item.addEventListener("click", () =>{ 
            chatList.forEach(item => {
                if(item.classList.contains("selected")){
                    item.classList.remove("selected");
                }
            });
            if(!item.classList.contains("selected")){
                item.classList.add("selected");
            }
        });
    })


});