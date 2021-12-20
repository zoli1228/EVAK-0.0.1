var mainWindow = document.querySelector("#moduleMain")
var mainChatFrame = document.querySelector("#main")
var chatWindow = document.querySelector("#chatwindow")
var rules = document.querySelector(".rules")
var input = document.querySelector("#message")
var submit = document.querySelector("#send")
var ownUserName = localStorage.getItem("username")

spinner.add()

/* var getCookie = (name) => {
    let re = new RegExp(name + "=([^;]+)");
    let value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
} */

submit.addEventListener("click", (e) => {
    e.preventDefault()
    let enteredMessage = input.value.trim()
    if (!enteredMessage.length) {
        return
    }
    if (enteredMessage.length > 500) {
        alert("Maximum 500 karakter engedélyezett.")
        return;
    }
    sendMessage(enteredMessage, e)
    input.value = ""
    input.placeholder = ""
})

var sendMessage = async (message) => {
    let messageToSend = message

    await fetch("/chat/messages", {
        method: "POST",
        body: JSON.stringify({ "message": messageToSend }),
        headers: {
            "Content-Type": "Application/Json",
            "Cache-Control": "no-cache"
        }
    }).then(
        data => data
    )
        .catch((err) => {
            console.error(err)
        })
}

var swapEmoji = (input) => {
    input = input.replace(":)", "🙂")
    input = input.replace(":D", "😃")
    input = input.replace(":|", "😐")
    input = input.replace(":(", "☹️")
    input = input.replace(":'D", "😂")
    input = input.replace("XD", "🤣")
    input = input.replace(":P", "😜")
    input = input.replace(":'('", "😢")
    input = input.replace(":O", "😲")
    input = input.replace(":@", "🤬")
    input = input.replace(":*", "😙")
    input = input.replace("B-)", "😎")
    input = input.replace(":$", "🤢")
    input = input.replace("<3", "❤️")
    return input
}

input.addEventListener("keyup", () => {
    input.value = swapEmoji(input.value)
})
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
    messageDiv.setAttribute("id", "message" + (chatWindow.children.length + 1))
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
        input.value += "@" + highlight + " "
        input.focus()
    })
    
    if (message.innerHTML.trim().toLowerCase().includes("@" + ownUserName)) {
        messageDiv.classList.toggle("ownmessage")
    }

    user.setAttribute("style", `color: rgb(${json.colour.R}, ${json.colour.G}, ${json.colour.B})`)
    user.setAttribute("class", "user")
    messageDiv.appendChild(time)
    messageDiv.appendChild(user)
    messageDiv.appendChild(message)

    if (chatWindow.childNodes.length >= 100) {
        for (let i = 100; i < chatWindow.childNodes.length - 1; i++) {
            chatWindow.removeChild(chatWindow.children[i])
        }
    }
    chatWindow.insertBefore(messageDiv, chatWindow.firstChild)
}

var messages = []



var loopChatRefresh = async () => {
    isActive = document.querySelector("#injected1")?.src.includes("chat")
    if(isActive) {
        await fetch("/chat/messages").then(
            data => data.json()
        ).then(
            (json) => {
                if (json.length) {
                    if (JSON.stringify(json[0]) != JSON.stringify(messages[messages.length - 1])) {
                        if (!messages.length) {
                            for (let i = 0; i < json.length; i++) {
                                messages.unshift(json[i])
                                
                            }
                            for (let i = 0; i < messages.length; i++) {
                                insertMessage(messages[i])
                            }
                            
                            return
                        }
                        let lastEntry = json[0]
                        if (lastEntry != messages[0]) {
                            insertMessage(lastEntry)
                            messages.push(lastEntry)
    
    
                        }

                    }
                    spinner.remove()
                }
            }
        ).catch((err) => {
            spinner.remove()
            console.error(err)
            new Alert([
                "Hiba történt", "red",
                "Hiba: " + err, "white"
            ])
            clearInterval(refresh)
            return
        })
    }
}

var refresh = setInterval(loopChatRefresh, 1000)