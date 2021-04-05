let bt1 = document.querySelector("#whatIsEvak")
let bt2 = document.querySelector("#howItWorks")
let bt3 = document.querySelector("#whosItFor")
let bt4 = document.querySelector("#pricing")

let dp1 = document.querySelector(".whatIsEvak")
let dp2 = document.querySelector(".howItWorks")
let dp3 = document.querySelector(".whosItFor")
let dp4 = document.querySelector(".pricing")

let enterBtn = document.querySelector("#enter")
let contactBtn = document.querySelector("#contact")

bt1.addEventListener("click", () => {
    dp1.getAttribute("style") == "display: none;" ? dp1.setAttribute("style", "display: block;") : dp1.setAttribute("style", "display: none;")
})
bt2.addEventListener("click", () => {
    dp2.getAttribute("style") == "display: none;" ? dp2.setAttribute("style", "display: block;") : dp2.setAttribute("style", "display: none;")
})
bt3.addEventListener("click", () => {
    dp3.getAttribute("style") == "display: none;" ? dp3.setAttribute("style", "display: block;") : dp3.setAttribute("style", "display: none;")
})
bt4.addEventListener("click", () => {
    dp4.getAttribute("style") == "display: none;" ? dp4.setAttribute("style", "display: block;") : dp4.setAttribute("style", "display: none;")
})


enterBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.location = "https://www.evak.hu/login"
})

contactBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.location = "mailto:info@evak.hu"
})