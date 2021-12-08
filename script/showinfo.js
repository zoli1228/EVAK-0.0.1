let loginOverlay = document.querySelector(".loginOverlay")
let regOverlay = document.querySelector(".regOverlay")
var body = document.querySelector("body")
const banner = document.querySelector(".imgContainer")
const logo = document.querySelector(".imgContainer > img")
const regButton = document.querySelector("#signup")
const loginButton = document.querySelector("#login")
const menuSelection = document.querySelectorAll(".loginbox > a")
const dataParser = document.querySelector("#dataparser")
const regErrorMsg = document.querySelector("#regerror")
const loginErrorMsg = document.querySelector("#loginerror")
const aszfCheckBox = document.querySelector("#aszfCheck")
const aszfLink = document.querySelector("#aszfLink")

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
    "home": document.querySelector(".home"),
    "login": document.querySelector(".login")
}
let enterBtn = document.querySelector("#enter")
let contactBtn = document.querySelector("#contact")
let regBtn = document.querySelector("#showSignup")

/* let show = "display: block;"
let hide = "display: none;" */

let show = "display: block; font-size: 16px; padding: auto;"
let hide = "display: block; font-size: 0px; padding: 0;"

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

/* function showSpinner(bool) {
    const spinner = document.querySelector("#roller")
    bool ? spinner.setAttribute("class", "roller-show") : spinner.setAttribute("class", "roller-hide")
}
 */

function loginMenu(input) {
    if (input == "show") {
        loginOverlay.setAttribute("style", "opacity: 1; pointer-events: all;")
    }
    else {
        loginOverlay.setAttribute("style", "opacity: 0; pointer-events: none;")
    }
}
function regMenu(input) {
    if (input == "show") {
        regOverlay.setAttribute("style", "opacity: 1; pointer-events: all;")
    }
    else {
        regOverlay.setAttribute("style", "opacity: 0; pointer-events: none;")
    }
}

function validateUsername(username) {
    let userRegExp = /^[a-zA-Z0-9]+$/
    username = username.trim()
    let response = ""
    if (username.includes(" ")) response += "A felhasználónév nem tartalmazhat szóközt. "
    if (username.length < 5) response += "A felhasználónév legalább 5 karakterből kell álljon. "
    if (username.length > 16) response += "A felhasználónév maximum 16 karakter lehet. "
    if (!username.match(userRegExp)) { response += "Csak kis- és nagybetűk, valamint számok engedélyezettek. " }
    if (response == "") { response = "OK" }
    return response
}
function validateEmail(email) {
    let regExp = /^[^\s@]+@[^\s@]+$/
    email = email.trim()
    let response = ""
    if (!email.match(regExp)) { response += "Az email cím helytelen. " }
    if (response == "") { response = "OK" }
    return response
}
function validatePassword(password, cpassword) {

    password = password.trim()
    password = password.toLowerCase()
    cpassword = cpassword.trim()
    cpassword = cpassword.toLowerCase()

    let response = ""
    if(password.length < 8) {response += "A jelszó legalább 8 karakterből kell álljon. "}
    if(password.length > 30) {response += "A jelszó maximum 30 karakterből állhat. "}
    if(password !== cpassword) {response += "A jelszó és a megerősítő jelszó nem egyezik. "}
    if (response == "") { response = "OK" }
    return response
}


function showRegDialog(message, status = "error") {

    if (status == "error") regErrorMsg.setAttribute("class", "dialogError")
    else if (status == "confirm") regErrorMsg.setAttribute("class", "dialogConfirm")
    if (message) regErrorMsg.innerHTML = message
    if (!message) {
        regErrorMsg.setAttribute("class", "hide")
        regErrorMsg.innerHTML = ""
    }

}
function showLoginDialog(message, status = "error") {

    if (status == "error") loginErrorMsg.setAttribute("class", "dialogError")
    else if (status == "confirm") loginErrorMsg.setAttribute("class", "dialogConfirm")
    if (message) loginErrorMsg.innerHTML = message
    if (!message) {
        loginErrorMsg.setAttribute("class", "hide")
        loginErrorMsg.innerHTML = ""
    }

}

const uName = document.querySelector("#usernamefield")
const email = document.querySelector("#emailfield")
const pWord = document.querySelector("#passwordfield")
const cpWord = document.querySelector("#cpasswordfield")
let enableReg = false
regOverlay.addEventListener("keyup", (e) => {

    let userValidate = validateUsername(uName.value)
    let emailValidate = validateEmail(email.value)
    let pwValidate = validatePassword(pWord.value, cpWord.value)
    if (userValidate != "OK") {
        showRegDialog(userValidate, "error")
        enableReg = false
    }
    else if(emailValidate != "OK") {
        showRegDialog(emailValidate, "error")
        enableReg = false
    } else if(pwValidate != "OK") {
        showRegDialog(pwValidate, "error")
        enableReg = false
    }
    else { 
        showRegDialog()
            enableReg = true
        }
    enableRegistration()
    }

)

function enableRegistration() {
    if(enableReg && aszfCheck()) return regButton.removeAttribute("disabled")
    return regButton.setAttribute("disabled", "true")
}
regOverlay.addEventListener("change", (e) => {
    enableRegistration()
})

enterBtn.addEventListener("click", (e) => {
    e.preventDefault()
    regMenu()
    loginMenu("show")

})
regBtn.addEventListener("click", (e) => {
    e.preventDefault()
    loginMenu()
    regMenu("show")

})

loginOverlay.addEventListener("click", function (e) {
    e.target == loginOverlay ? loginMenu() : null
})
regOverlay.addEventListener("click", function (e) {
    e.target == regOverlay ? regMenu() : null
})
contactBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.location = "mailto:info@evak.hu"
})

function aszfCheck() {
    let result
    aszfCheckBox.checked ? result = true : result = false
    return result
}

aszfCheckBox.addEventListener("click", function () {
    aszfCheck()
})

aszfLink.addEventListener("click", () =>{
    window.open("/aszf", '_blank');
})

regButton.addEventListener("click", async (e) => {
    e.preventDefault()
    spinner.add()
    let uName = document.querySelector("#usernamefield").value
    let email = document.querySelector("#emailfield").value
    let pWord = document.querySelector("#passwordfield").value
    let pWordConfirm = document.querySelector("#cpasswordfield").value

    let userObject = {
        username: uName,
        email: email,
        password: pWord,
        cpassword: pWordConfirm
    }


    let response = await axios.post("/signup", userObject).catch((err) =>
        console.error("Error in response: " + err)
    )

    if (response) {
        spinner.remove()
        if (response.data.status == "error") {
            showRegDialog(response.data.message, "error")
        }
        else if (response.data.status == "OK") {
            showRegDialog(response.data.message, "confirm")
            setTimeout(function () { regMenu() }, 1000)
        }
    }
})





loginButton.addEventListener("click", async (e) => {
    e.preventDefault()
    spinner.add()
    let uName = document.querySelector("#usernamefieldLogin").value
    let pWord = document.querySelector("#passwordfieldLogin").value
    let user = {
        username: uName,
        password: pWord
    }

    let response = await axios.post("/login", user).catch((err) => {
        return console.log(err)
    })

    if (response.data.status == "error") {
            showLoginDialog(response.data.message)
            console.log("Error status")
            spinner.remove()
        }
    
    else{
        console.log("Confirm status")
        showLoginDialog(response.data.message, "confirm")
        spinner.remove()
        setTimeout(function() {
            window.location.href = "/main" 
        }, 2000)

    } 
    
    })

 const cancelLoginBtn = document.querySelector("#cancelLogin")
 const cancelRegBtn = document.querySelector("#cancelReg")

 cancelLoginBtn.addEventListener("click", () => {
     loginMenu()
 })
 cancelRegBtn.addEventListener("click", () => {
    regMenu()
})