let bt1 = document.querySelector("#whatIsEvak")
let bt2 = document.querySelector("#howItWorks")
let bt3 = document.querySelector("#whosItFor")
let bt4 = document.querySelector("#pricing")

let menuElements = {
    "dp1": document.querySelector(".whatIsEvak"),
    "dp2": document.querySelector(".howItWorks"),
    "dp3": document.querySelector(".whosItFor"),
    "dp4": document.querySelector(".pricing")
}

let show = "display: block;"
let hide = "display: none;"

bt1.addEventListener("click", () => {
    showMenu("dp1")
})
bt2.addEventListener("click", () => {
    showMenu("dp2")
})
bt3.addEventListener("click", () => {
    showMenu("dp3")
})
bt4.addEventListener("click", () => {
    showMenu("dp4")
})

let showMenu = (menuToShow) => {

    for (elem in menuElements) {
        if (elem == menuToShow) {
            menuElements[elem].getAttribute("style") != show ? menuElements[elem].setAttribute("style", show) : menuElements[elem].setAttribute("style", hide)
        }
        else { menuElements[elem].setAttribute("style", hide) }
    }
}