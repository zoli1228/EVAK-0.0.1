const submit = document.querySelector("#submit")
const dialog = document.querySelector("#dialog")
const span = document.querySelector("#dialogMessage")
const email = document.querySelector("#email")

function showSpinner(bool) {
    const spinner = document.querySelector("#roller")
    bool ? spinner.setAttribute("class", "roller-show") : spinner.setAttribute("class", "roller-hide")
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

    let response = await axios.post("/passwordrecovery", {'email' : email.value}).catch((err) => {
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