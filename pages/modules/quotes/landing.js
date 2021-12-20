var browseBtn = sel("#browse")
var addBtn = sel("#add")


setEvent.click(addBtn, function() {selectPage("content/quotes/newquote")})
setEvent.click(browseBtn, function() {selectPage("content/quotes/quotes")})
selArray("a").forEach(elem => {
    if(elem.classList.toString().includes("btn_disabled")) {
        elem.classList.toggle("btn_disabled")
    }
})