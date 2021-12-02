document.addEventListener("DOMContentLoaded", () => {

    // -------------- Loading ------------------- //

    async function TraerProductos() {
        let container = document.querySelector(".home-container");
        try {
            let response = await fetch("../htmlLoad/chatLoad.html");
            if (response.ok) {
                let t = await response.text();
                container.innerHTML = t;
                initChat();
                initChatContacts();
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

    // -------------- chat ------------------- //

    function initChat() {
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

    }

    // -------------- chat contacts ------------------- //

    function initChatContacts() {
        let chatList = document.querySelectorAll(".chat-item");

        chatList.forEach(item => {
            item.addEventListener("click", () => {
                chatList.forEach(item => {
                    if (item.classList.contains("selected")) {
                        item.classList.remove("selected");
                    }
                });
                if (!item.classList.contains("selected")) {
                    item.classList.add("selected");
                }
            });
        })
    }



});