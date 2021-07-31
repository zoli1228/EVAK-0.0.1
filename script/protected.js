

let dom = document.querySelector("#update")
let userDetails = document.querySelector("#userdetails")
let roller = document.querySelector("#roller")
let span = document.createElement("span")
span.innerHTML = "username"
userDetails.appendChild(span)

/* let genRandomNumber = () => {
    result = ""
    for(let i = 0; i < 20; i++) {
        result+= Math.round(Math.random()*9)
    }
    return result;
} */
let selectPage = async (string) => {
    setRoller(true)

    await fetch(`/content/${string}`).then(Response => {

        if (Response.status == 404) {
            return "404 - A keresett oldal nem található."
        }
        else if (Response.status == 200) {
            return Response.text()
        }
    }).then(function (data) {

        if (data) {
            changeContent(data)
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

let genRandomNumber = (length) => {
    let result = "";
    for(let i = 0; i < length; i++) {
        result += Math.round(Math.random() * 9)
    }
    return result;
}

let changeContent = (content) => {
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


let rollerTimeout;
let setRoller = (bool) => {
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
