document.addEventListener("DOMContentLoaded", () => {

  async function TraerProductos() {
    let container = document.querySelector(".home-container");
    try {
      let response = await fetch("../htmlLoad/searchLoad.html");
      if (response.ok) {
        let t = await response.text();
        container.innerHTML = t;
        initGalleries();
        initShowComments();
        initSearchFilter();
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

  // -------------- filter search ------------------- //

  function initSearchFilter() {
    let buttonsFilter = document.querySelectorAll(".button-filter");
    let sections = document.querySelectorAll(".card-search");

    buttonsFilter.forEach((button) => {
      button.addEventListener("click", () => {
        sections.forEach((section) => {
          if (section.id === button.id) {
            if (section.classList.contains("hidden")) {
              section.classList.remove("hidden");
            }
          } else {
            if (!section.classList.contains("hidden")) {
              section.classList.add("hidden");
            }
          }
        });
        buttonsFilter.forEach((buttonColor) => {
          if (buttonColor.id === button.id) {
            if (!buttonColor.classList.contains("selected-button")) {
              buttonColor.classList.add("selected-button");
            }
          } else {
            if (buttonColor.classList.contains("selected-button")) {
              buttonColor.classList.remove("selected-button");
            }
          }
        });
      });
    });
  }
});
