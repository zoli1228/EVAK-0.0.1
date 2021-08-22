

let dom = document.querySelector("#update")
let userDetails = document.querySelector("#userdetails")
let roller = document.querySelector("#roller")
let span = document.createElement("span")
span.setAttribute("id", "usernameField")
let navbarMenu = document.querySelector(".navbar")
let mainFrame = document.querySelector("#mainframe")
let logoutBtn = document.querySelector("#logoutBtn")
let indicator = document.querySelector("#navindicator")
let rollerDelay = 500
var getCookie = (name) => {
    let re = new RegExp(name + "=([^;]+)");
    let value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

var rollerDiv = document.createElement("div")
var container = document.createElement("div")
var rollerImg = document.createElement("img")
container.setAttribute("class", "container")
rollerImg.src = "resources/spinner04.gif"
rollerImg.alt = "evak_roller_img"
rollerDiv.setAttribute("id", "rollerDiv")
container.appendChild(rollerImg)
/* container.appendChild(loadingText) */
rollerDiv.appendChild(container)


var getUserDetails = async () => {
    let span = document.createElement("span")
    await fetch("/system/getuserdetails/").then(
        response => response.json()).then((data) => {
            if (data.username) {
                span.innerHTML = data.username
                span.setAttribute("style", "color: #cf0;")
                userDetails.appendChild(span)
            }
            if (data.role) {
                if (data.role == "admin") {
                    let parser = new DOMParser()
                    let elem = parser.parseFromString(data.adminmenu, "text/html")
                    navbarMenu.insertBefore(elem.body.firstChild, navbarMenu.querySelector("a"))
                }
            }
        }).catch((err) => { console.log("Hiba az adatok lekérdezésében" + err) })

}
getUserDetails()

logoutBtn.addEventListener("click", (e) => {
    document.cookie = "username=" + getCookie("username") + "=; Max-Age=-9999;"

})


var selectPage = async (string) => {
    await fetch(`/${string}`).then(Response => {

        if (Response.status == 404) {
            return "404 - A keresett oldal nem található."
        }
        else if (Response.status == 401) {
           return 401
        } else if(Response.status == 200) {
            return Response.json()
        }
    }).then(function (input) {
        input == 401 ? window.location.href = "/" : null
        if (input) {
            changeHeader(input.data.header)
            changeContent(input.template)
        } else {
            changeContent("Nincs tartalom...")
            console.log("Nincs tartalom")
        }
        setRoller(dom, false)
    }).catch(err => {

        changeContent("Hiba az adatok lekérdezésében:  " + err)
        setRoller(dom, false)
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

        let trimmedLoc = scriptTag.innerHTML.replace(/\s/g, '')
        newScript.src = trimmedLoc
        newScript.setAttribute("version", genRandomNumber(10))
        document.body.appendChild(newScript)
    }
    dom.innerHTML = ""
    dom.appendChild(htmlDoc.firstChild)
}


var rollerTimeout;
var setRoller = (parent, bool) => {
    if (bool) {
        rollerTimeout = setTimeout(function () {
            parent.appendChild(rollerDiv)
        }, rollerDelay)
    }
    else {

        clearTimeout(rollerTimeout)

        /* roller.setAttribute("class", "roller-hide") */
        if (parent.children.toString().includes(rollerDiv)) {
            parent.removeChild(rollerDiv)

        }



        return
    }
}

navbarMenu.addEventListener("mouseenter", () => {
    navbarMenu.classList.toggle("shownav")
    mainFrame.classList.toggle("shrinkmainframe")
    indicator.classList.toggle("hideIndicator")
})

navbarMenu.addEventListener("mouseleave", () => {
    navbarMenu.classList.remove("shownav")
    mainFrame.classList.remove("shrinkmainframe")
    indicator.classList.remove("hideIndicator")

})