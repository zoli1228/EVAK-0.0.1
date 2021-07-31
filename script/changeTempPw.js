const password = document.querySelector("#password")
const cpassword = document.querySelector("#cpassword")
const submit = document.querySelector("#submit")
const dialog = document.querySelector("#dialog")
const span = document.querySelector("#dialogMessage")
showDialog()

function showSpinner(bool) {
    const spinner = document.querySelector("#roller")
    bool ? spinner.setAttribute("class", "roller-show") : spinner.setAttribute("class", "roller-hide")
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

function showDialog(message, status = "error") {

    if (status == "error") dialog.setAttribute("class", "show error")
    else if (status == "confirm") dialog.setAttribute("class", "show confirm")
    if (message) span.innerHTML = message
    if (!message) {
        dialog.setAttribute("class", "hide")
        span.innerHTML = ""
    }

}

submit.addEventListener("click", async (e) =>{
    showSpinner(true)
    e.preventDefault()
    let pw = password.value;
    let cpw = cpassword.value;

    if(validatePassword(pw, cpw) != "OK") {
        showDialog(validatePassword(pw, cpw))
        return
    }

   

    let response = await axios.post("/newpassword", {'password' : pw, 'cpassword' : cpw}).catch((err) => {
        console.log(err)
        return
    })
if(response) {
    showSpinner(false)

    if(response.data.status == "error") {
        showDialog(response.data.message)
        return
    }

   
        
        showDialog(response.data.message, "confirm")
        setTimeout(() => {window.location = "/protected"}, 3000)
        return

}

})
