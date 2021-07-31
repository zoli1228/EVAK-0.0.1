let navbar = document.querySelector(".navbar")

navbar.addEventListener("click", (e) => {
    let target = e.target.innerHTML;
    for (let i = 0; i < navbar.children.length; i++) {
        if (navbar.children[i].getAttribute("class") == "nav_button1" || navbar.children[i].getAttribute("class") == "nav_button1 selected") {
            if (e.target.getAttribute("class") == "nav_button1" || e.target.getAttribute("class") == "nav_button1 selected") {
                if (navbar.children[i].innerHTML == target) {
                    navbar.children[i].setAttribute("class", "nav_button1 selected")
                } else {
                    navbar.children[i].setAttribute("class", "nav_button1")
                }
            }
        }
    }
})