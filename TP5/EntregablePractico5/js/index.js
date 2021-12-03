document.addEventListener("DOMContentLoaded", () => {

    // -------------- Message errors ------------------- //

    let inputs = document.querySelectorAll("input");

    const onFormSubmit = (event) => {

        inputs.forEach(input => {
            let p = input.parentNode.querySelector("p");
            if (p != null) {
                p.parentElement.removeChild(p); 
            }

            if (input.value == "") {
                event.preventDefault();
                input.classList.add("error");

                errorMessage("Complete el campo", input);
            }
            else {
                let inputAtt = input.getAttribute('name');

                if (inputAtt == "user" && input.value != "usuario") {
                    event.preventDefault();
                    errorMessage("Usuario incorrecto", input);
                    input.classList.add("error");
                }
                else if (inputAtt == "password" && input.value != "usuario") {
                    event.preventDefault();
                    errorMessage("Contraseña incorrecta", input);
                    input.classList.add("error");
                }
                else{
                    input.classList.remove("error");
                }

            }
        })

    }

    function errorMessage(textNode, input) {
        let text = document.createTextNode(textNode);
        let newNode = document.createElement("p");
        newNode.classList.add("error-message")
        newNode.appendChild(text);
        input.parentNode.insertBefore(newNode, input.nextSibling);
    }

    document.getElementById('submitForm').addEventListener('submit', onFormSubmit);
});
