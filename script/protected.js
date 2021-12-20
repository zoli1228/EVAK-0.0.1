let docBody = document.querySelector("body")
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
                localStorage["username"] = data.username
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

var navBarButtons = [
    navbar_homeBtn = sel("#navbar_homeBtn"),
    navbar_chatBtn = sel("#navbar_chatBtn"),
    navbar_quotesBtn = sel("#navbar_quotesBtn"),
    navbar_profileBtn = sel("#navbar_profileBtn"),
    navbar_forumBtn = sel("#navbar_forumBtn"),
    navbar_helpBtn = sel("#navbar_helpBtn"),
    navbar_settingsBtn = sel("#navbar_settingsBtn"),
    navbar_404testBtn = sel("#navbar_404testBtn"),

]

navBarButtons.forEach(elem => {
    setEvent.click(elem, function() {
        selectPage(elem.target)
    })
})
var selectPage = async (string) => {
    spinner.add()
    await fetch(`/${string}`).then(Response => {
        if (Response.status == 404) {
            return 404
        }
        else if (Response.status == 401) {
            return 401
        } else if (Response.status == 200) {
            return Response.json()
        }
    }).then(function (input) {
        if(input == 401) {
            window.location.href = "/"
        }
        if(input == 404) {
            changeHeader("404 hibakód")
            changeContent("A keresett tartalom nem létezik a szerveren.")
            spinner.remove()
            return
        }
            
        if (input) {
            changeHeader(input.data.header)
            changeContent(input.template)
        } else {
            changeContent("Nincs tartalom...")

        }
        spinner.remove()
    }).catch(err => {
        spinner.remove()
        if(err.status == 404) {
        changeContent("404 hibakód: A kért tartalom nem létezik")

        }
        changeContent("Hiba az adatok lekérdezésében:  " + err)
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
var deleteScripts = () => {
    let scripts = document.querySelectorAll("script")
    scripts.forEach(element => {
        let elemId = element.getAttribute("id")
        if(elemId?.includes("injected")) {
                element.remove()
        } 
    })
}
var changeContent = (content) => {

    let parser = new DOMParser()
    let htmlDoc = parser.parseFromString(content, 'text/html').body
    let scriptTag = htmlDoc.querySelectorAll("script")
    deleteScripts()
    if (scriptTag) {
        let id = 0
        scriptTag.forEach(element => {
            let newScript = document.createElement("script")
            newScript.id = "injected" + id
            let trimmedLoc = element.innerHTML.replace(/\s/g, '')
            newScript.src = trimmedLoc
            newScript.innerHTML = ""
            newScript.setAttribute("version", genRandomNumber(10))
            id++
            docBody.appendChild(newScript)
        });
    }
    dom.innerHTML = ""
    dom.appendChild(htmlDoc.firstChild)
}


navbarMenu.addEventListener("mouseenter", () => {
    navbarMenu.classList.toggle("shownav")
/*     mainFrame.classList.toggle("shrinkmainframe") */
    indicator.classList.toggle("hideIndicator")
})

navbarMenu.addEventListener("mouseleave", () => {
    navbarMenu.classList.remove("shownav")
/*     mainFrame.classList.remove("shrinkmainframe") */
    indicator.classList.remove("hideIndicator")

})

sel("#navbar_homeBtn").click()