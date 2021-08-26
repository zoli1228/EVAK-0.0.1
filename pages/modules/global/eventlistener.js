var setEvent = {
    click: (element, func) => {
        element.addEventListener("click", (e) => {
            e.preventDefault()
            return func()
        })
    },
    hover: (element, onenter, onleave) => {
        element.addEventListener("mouseenter", () => {
            return onenter()
        },
            element.addEventListener("mouseleave", () => {
                return onleave()
            })

        )
    },
    keypress: (element, key, func) => {
        let keyCode;
        switch(key) {
            case "enter":
                keyCode = 13
                break;
        }
        element.addEventListener("keypress", (e) => {
            if(e.keyCode == keyCode) {
                return func()
            }
        })
    }
}