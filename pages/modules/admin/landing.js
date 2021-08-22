var btn = document.querySelector("#loginbutton")
var module_dom = document.querySelector("#module > table > tfoot")


btn.addEventListener("click", async (e) => {
    spinner.add()
    let username = document.querySelector("#username").value
    let password = document.querySelector("#pass").value
    let userDetails = {
        "username": username,
        "password": password
    }
    
    await fetch("/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails)
    }).then(
        response => response.json()
    ).then(
        (json) => {
            var existing = document.querySelector(".messagebar")
            if (!existing) {
                let div = document.createElement("div")
                let span = document.createElement("span")
                div.appendChild(span)
                module_dom.appendChild(div)
                var timer = setTimeout(() => {
                    module_dom.removeChild(div)
                }, 4000)
                spinner.remove()
                if (json.status != "OK") {
                    div.setAttribute("class", "messagebar msgerror")
                    span.innerHTML = json.message
                }
                else {
                    div.setAttribute("class", "messagebar msgsuccess")
                    span.innerHTML = json.message
                        if (json.status == "OK") {
                            selectPage("admin")
                            clearTimeout(timer)
                        } else {
                            div.setAttribute("class", "messagebar msgerror")
                            span.innerHTML = "Hiba a beérkezett adatokban."
                        }
                }
            }

            else {
                return;
            }
        }

    ).catch((err) => {
        console.error("Caught Error: " + err)
    })
})