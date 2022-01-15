
let loginButton = document.querySelector("#login")
let msg = document.querySelector("#msg")
loginButton.addEventListener("click", async (e) => {
    e.preventDefault()

    let uName = document.querySelector("#usernamefieldLogin").value
    let pWord = document.querySelector("#passwordfieldLogin").value



    await fetch("/login", {
        method: "POST",
        body: JSON.stringify({
            username: uName,
            password: pWord
        }),
        headers: {
            "Content-Type": "Application/json"
        }
    })
        .then(response => response.json())
        .then((json) => {

            if (json.statusMsg == "error") {
                msg.innerHTML = json.message                
                return
            }

            if (json["status"] == "OK") {
                console.log("Confirm status")
                window.location.href = "/main"
            }
            console.log("Semmi nem érkezett vissza.")
            console.log(json)
        })
        .catch((err) => {
            return console.log(err)
        })

})

let logo = document.querySelector(".logo")
let displayLoginCounter = 0
logo.addEventListener("click", (e) => {
    if(displayLoginCounter < 10) {
        displayLoginCounter++
        if(displayLoginCounter == 10) {
            document.querySelector("#loginBox").classList.toggle("hidden")
            document.querySelector(".text").classList.toggle("hidden")
        }
    }

})