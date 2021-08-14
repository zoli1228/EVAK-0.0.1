var browseBtn = document.querySelector("#browse")

browseBtn.addEventListener("click", (e) => {
    setRoller(dom, true)
    e.preventDefault()
    selectPage("quotes/quotes")
})