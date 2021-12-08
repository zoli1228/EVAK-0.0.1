var browseBtn = sel("#browse")
var addBtn = sel("#add")
var adminBtn = sel("#admin")

setEvent.click(addBtn, function() {selectPage("content/quotes/newquote")})
setEvent.click(browseBtn, function() {selectPage("content/quotes/quotes")})