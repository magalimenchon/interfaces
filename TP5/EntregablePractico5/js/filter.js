document.addEventListener("DOMContentLoaded", () => {
  // -------------- filter search ------------------- //

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
});
