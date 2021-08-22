var browseBtn = document.querySelector("#browse")
var addBtn = document.querySelector("#add")
var adminBtn = document.querySelector("#admin")

browseBtn.addEventListener("click", (e) => {
    selectPage("content/quotes/quotes")
    e.preventDefault()
})
addBtn.addEventListener("click", (e) => {
    selectPage("content/quotes/newquote")
    e.preventDefault()
})
adminBtn.addEventListener("click", (e) => {
    selectPage("content/quotes/admin")
    e.preventDefault()
})
