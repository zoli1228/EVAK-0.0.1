let overlay = document.querySelector(".loginOverlay")
let body = document.querySelector("body")
const banner = document.querySelector(".imgContainer")
const logo = document.querySelector(".imgContainer > img")
const submitBtn = document.querySelector("#submit")
const menuSelection = document.querySelectorAll(".loginbox > a")
const dataParser = document.querySelector("#dataparser")

let menuOpt = "login"

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

const pageElements = {
    "home" : document.querySelector(".home"),
    "login" : document.querySelector(".login")
}
let enterBtn = document.querySelector("#enter")
let contactBtn = document.querySelector("#contact")

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

function loginMenu(input) {
    if(input == "show") {
        overlay.setAttribute("style", "opacity: 1; pointer-events: all;")
    }
    else {
        overlay.setAttribute("style", "opacity: 0; pointer-events: none;")
    }
}

enterBtn.addEventListener("click", (e) => {
    e.preventDefault()
    loginMenu("show")
    
})

overlay.addEventListener("click", function(e) {
    e.target == overlay ? loginMenu() : null
})
contactBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.location = "mailto:info@evak.hu"
})


submitBtn.addEventListener("click", () => {
    const password = document.querySelector("#passwordfield").value
    const username = document.querySelector("#usernamefield").value
    console.log("Submit clicked")
    try {
       

            fetch("/auth", {
            method: "POST",
            headers: {
                
                "Content-Type": "text/plain"
            },
            body: {
                username : username,
                password : password
            }
        }).then(function(response) {
            return JSON.stringify(response)
        }).then(function(data) {
            console.log(data)
        })
    }
    catch(err) {
        throw err
    }
})


