

let dom = document.querySelector("#update")
let userDetails = document.querySelector("#userdetails")
let roller = document.querySelector("#roller")
let span = document.createElement("span")
span.setAttribute("id", "usernameField")
let navbarMenu = document.querySelector(".navbar")
let mainFrame = document.querySelector("#mainframe")
let logoutBtn = document.querySelector("#logoutBtn")

var getCookie = (name) =>
  {
    let re = new RegExp(name + "=([^;]+)");
    let value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }

var getUserDetails = async () => {
    let span = document.createElement("span")
    await fetch("/system/getuserdetails/").then(
        response => response.json()).then((data) => {
            if (data.username) {
                span.innerHTML = data.username
                span.setAttribute("style", "color: #cf0;")
                userDetails.appendChild(span)
            }
        }).catch((err) => { console.log("Hiba az adatok lekérdezésében" + err) })

}
getUserDetails()

logoutBtn.addEventListener("click", (e) => {
    document.cookie = "username=" + getCookie("username") + "=; Max-Age=-999;"

})


var selectPage = async (string) => {
    setRoller(true)

    await fetch(`/content/${string}`).then(Response => {

        if (Response.status == 404) {
            return "404 - A keresett oldal nem található."
        }
        else if (Response.status == 200) {

            return Response.json()
        }
    }).then(function (input) {
        if (input) {
            changeHeader(input.data.header)
            changeContent(input.template)
        } else {
            changeContent("Nincs tartalom...")
            console.log("Nincs tartalom")
        }
        setRoller(false)
    }).catch(err => {
        console.log(err)

        changeContent("Hiba az adatok lekérdezésében")
        setRoller(false)
    })


}

var changeHeader = (content) => {
    let title = document.querySelector("#title")

    let span = document.createElement("span")
    span.innerHTML = content
    title.innerHTML = ""
    title.appendChild(span)
}

var genRandomNumber = (length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += Math.round(Math.random() * 9)
    }
    return result;
}

var changeContent = (content) => {

    let parser = new DOMParser()
    let htmlDoc = parser.parseFromString(content, 'text/html').body
    let scriptTag = htmlDoc.querySelector("script")
    let findScript = document.querySelector("#injected")
    if (findScript) {
        findScript.remove()
    }
    if (scriptTag) {
        let newScript = document.createElement("script")

        newScript.id = "injected"
        newScript.src = scriptTag.innerHTML
        newScript.setAttribute("version", genRandomNumber(10))
        document.body.appendChild(newScript)
    }
    dom.innerHTML = ""
    dom.appendChild(htmlDoc.firstChild)
}


var rollerTimeout;
var setRoller = (bool) => {
    if (bool) {
        rollerTimeout = setTimeout(function () {
            roller.setAttribute("class", "roller-show")
        }, 400)
    }
    else {
        clearTimeout(rollerTimeout)
        roller.setAttribute("class", "roller-hide")
        return
    }
}

navbarMenu.addEventListener("mouseenter", () => {
    navbarMenu.classList.toggle("shownav")
    mainFrame.classList.toggle("shrinkmainframe")
})

navbarMenu.addEventListener("mouseleave", () => {
    navbarMenu.classList.remove("shownav")
    mainFrame.classList.remove("shrinkmainframe")
})