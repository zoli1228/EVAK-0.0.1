var mainWindow = document.querySelector("#moduleMain")
var mainChatFrame = document.querySelector("#main")
var chatWindow = document.querySelector("#chatwindow")
var rules = document.querySelector(".rules")
var input = document.querySelector("#message")
var submit = document.querySelector("#send")
var proceedBtn = document.querySelector("#proceed")

proceedBtn.addEventListener("click", () => {
    rules.classList.add("nodisplay")
    mainChatFrame.classList.remove("nodisplay")
})

var getCookie = (name) => {
    let re = new RegExp(name + "=([^;]+)");
    let value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

submit.addEventListener("click", (e) => {
    e.preventDefault()
    if (!input.value.trim().length) {
        return
    }
    if (input.value.trim().length > 150) {
        alert("Maximum 150 karakter engedélyezett.")
        return;
    }
    sendMessage(input.value.trim(), e)
    input.value = ""
    input.placeholder = ""
})

var sendMessage = async (message) => {
    let messageToSend = message

    await fetch("/chat/messages", {
        method: "POST",
        body: JSON.stringify({ "message": messageToSend }),
        headers: {
            "Content-Type": "Application/Json"
        }
    }).then(
        data => data
    )
        .catch((err) => {
            console.error(err)
        })
}

/* var genRandomUser = (length) => {
    let string = ""
        let abc = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
        let array = []

        for (let i = 0; i < (length / 2); i++) {
            array.push(Math.round(Math.random() * 9))
            let randomIndex = (Math.floor(Math.random() * abc.length))
            array.push(abc[randomIndex])

        }

        for (item in array) {
            string += array[item]
        }

        return string;
    } */


var insertMessage = (json) => {

    let messageDiv = document.createElement("div")
    let time = document.createElement("span")
    let user = document.createElement("span")
    let message = document.createElement("span")
    time.innerHTML = json.timestamp
    time.setAttribute("class", "time")
    user.innerHTML = json.username
    message.innerHTML = json.message
    
    message.setAttribute("class", "message")
    user.addEventListener("click", (e) => {
        let highlight = e.target.innerHTML
        input.value += " " + highlight + " "
        input.focus()
    })
    if (message.innerHTML.trim().toLowerCase().includes(getCookie("username"))) {
        messageDiv.classList.toggle("ownmessage")
    }


    user.setAttribute("style", `color: rgb(${json.colour.R}, ${json.colour.G}, ${json.colour.B})`)
    user.setAttribute("class", "user")
    messageDiv.appendChild(time)
    messageDiv.appendChild(user)
    messageDiv.appendChild(message)

    /* chatWindow.appendChild(messageDiv) */
    chatWindow.insertBefore(messageDiv, chatWindow.firstChild)
}

var messages = []

var loopChatRefresh = async () => {
    await fetch("/chat/messages").then(
        data => data.json()
    ).then(
        (json) => {

            if (json) {
                if (!messages.length) {


                    for (let i = 0; i < json.length; i++) {
                        insertMessage(json[i])

                    }
                    for (let i = 0; i < json.length; i++) {
                        messages.push(json[i])
                    }

                }
                if (messages.length != json.length) {
                    if (messages[messages.length - 1] != json[json.length - 1]) {
                        let lastEntry = json[json.length - 1]
                        messages.push(lastEntry)
                        insertMessage(lastEntry)

                    }
                }
            }
        }
    ).catch((err) => {
        console.error(err)
    })
}

setInterval(loopChatRefresh, 1000)
