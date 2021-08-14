var quoteModule = document.querySelector("#quote_module")
var quoteDetails = document.querySelector(".quote_details")
var closeBtn = document.querySelector(".closebtn")

quoteModule.addEventListener("click", (e) => {

    try {
        if(e.target.id.toString().includes("quote_")) {
            quoteDetails.classList.toggle("quote_hidden")
        }

    } catch(err) {
        return
    }
}
)

closeBtn.addEventListener("click", () => {
    quoteDetails.classList.add("quote_hidden")

})


