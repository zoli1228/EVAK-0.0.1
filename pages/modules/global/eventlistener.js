var setEvent = {
    click: (element, func) => {
        element.addEventListener("click", (e) => {
            e.preventDefault()
            return func(e)
        })
    },
    change: (element, func) => {
        element.addEventListener("change", (e) => {
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
        switch (key) {
            case "enter":
                keyCode = 13
                break;
            case "any":
                keyCode = "any"
        }
        element.addEventListener("keypress", (e) => {
            if (e.keyCode == keyCode) {
                return func()
            } else if(keyCode == "any") {
                return func()
            }
        })
    }
}

var setArrayEvent = {
    click: ([...element], func) => {
        element.forEach(elem => {
            elem.addEventListener("click", (e) => {
                e.preventDefault()
                return func()
            })
        });

    },
    change: ([...elements], func) => {
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("change", (e) => {
                e.preventDefault()
                return func()
            })

        }


    }
}