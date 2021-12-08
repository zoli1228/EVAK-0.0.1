var body = document.body
var img, imgUrl, div

var preloadSpinner = () => {
    img = document.createElement("img")
    imgUrl = "resources/spinner02.gif"
    img.src = imgUrl
    img.alt = "Spinner_gif"
    div = document.createElement("div")
    div.id = "spinner"
    div.appendChild(img)

}
var spinnerDelay
var spinner = {
    add: function (parent = body, delay = 750) {
        spinnerDelay = setTimeout(() => {
            parent.appendChild(div)
        }, delay)

    },
    remove: function () {
        clearTimeout(spinnerDelay)
        let elem = document.querySelector("#spinner")
        if (elem) {
            elem.remove()
        }
    }
}
preloadSpinner()