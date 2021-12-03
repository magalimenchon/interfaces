document.addEventListener("DOMContentLoaded", () => {

  // -------------- Parrallax ------------------- //

  document.addEventListener("mousemove", parallax);
  function parallax(e) {
    document.querySelectorAll(".parrallax").forEach(function (move) {
      let moving_value = move.getAttribute("data-value");
      let x = ((e.clientX - window.innerWidth / 2) * moving_value) / 500;
      let y = ((e.clientY - window.innerHeight / 2) * moving_value) / 500;
      move.style.transform =
        "translateX(" + -x + "px) translateY(" + -y + "px)";
    });
  }

  // -------------- Message errors ------------------- //

  let inputs = document.querySelectorAll("input");

  const onFormSubmit = (event) => {


    inputs.forEach(input => {
      if (input.value == "") {
        event.preventDefault();
        input.classList.add("error");
        if(input.parentNode.querySelector("p") == null){
          let text = document.createTextNode("Complete el campo");
          let newNode = document.createElement("p");
          newNode.classList.add("error-message")
          newNode.appendChild(text);
          input.parentNode.insertBefore(newNode, input.nextSibling);
        }
           
      }
      else {
        input.classList.remove("error");
      }
    })

  }

  document.getElementById('submitForm').addEventListener('submit', onFormSubmit);
});
