var option_key = sel("#option_key")
var option_value = sel("#option_value")
var matCategory = sel("#material_category")
var matFlowTable = sel("#options_row")
var optionAddBtn = sel("#option_add")
var optionRemoveBtn = sel("#option_remove")
var elemTitle = sel("#material_title")
var elemPrice = sel("#material_price")
var flowTable = sel("#materialflowtable")
var matCounter = sel("#material_counter")
var backBtn = sel("#module_back_button")

var optionsObj = []
var elementsList = []
var categories = [
    'segédanyagok',
    'földelőrudak',
    'toldóhüvelyek',
    'sorkapcsok',
    'elágazódobozok',
    'védőcsövek',
    'bilincsek',
    'vezetékek',
    'erősáramú kábelek',
    'gyengeáramú kábelek',
    'elosztó szekrények',
    'szerelvények',
    'szerelvény keretek',
    'kismegszakítók',
    'relék',
    'egyéb'
]

if (!matCategory.children.length) {
    categories.forEach(element => {
        let option = document.createElement("option")
        option.innerHTML = cap(element)
        option.value = element
        matCategory.appendChild(option)
    });
}

var addPropertiesToList = (objKey, objValue) => {
    let currentLength = optionsObj.length
    let object = { "key": objKey, "value": objValue }
    let li = elemCreate("li", "", {
        "class": "property",
        "id": `property_${currentLength}`
    })
    let p = elemCreate("span", `${cap(objKey)} : ${cap(objValue)}`)
    let a = elemCreate("a", `<i class="fas fa-trash-alt"></i>`, {
        "href": "#",
        "class": "property_del_btn",
        "id": `property_del_btn_${optionsObj.length}`
    })
    setEvent.click(a, () => {
        elem = sel(`#property_${currentLength}`)
        elem.remove()
        delete optionsObj[currentLength]
    })

    li.appendChild(p)
    li.appendChild(a)
    matFlowTable.appendChild(li)
    optionsObj.push(object)
    option_key.value = ""
    option_value.value = ""
    option_key.focus()
}



var addElementToList = async () => {

    let title = elemTitle.value
    let price = elemPrice.value
    let category = matCategory.value
    let object = {
        "title": title,
        "price": price,
        "category": category,
        "tags": optionsObj
    }
    try {
        await sendDataToDb(object)
    } catch (err) {
        console.error("Hiba az adatok hozzáadása közben. Hibaüzenet: " + err)
    }
}

var getDataFromDb = async (key, value, location) => {
    spinner.add(sel("#module"), 0)
    flowTable.innerHTML = ""
    var keepList = sel("#keep_properties").checked
    let keyLower, valueLower, dir;
    if (!location) {
        dir = "root"
    } else {
        dir = location.toLowerCase()
    }
    if (key && value) {
        keyLower = key.toString().toLowerCase()
        valueLower = value.toString().toLowerCase()
    } else {
        keyLower = "none"
        valueLower = "none"
    }
    try {
        await fetch(`/admin/lists/materiallist/${keyLower}&${valueLower}&${dir}`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                matCounter.innerHTML = json.length
                json.forEach(entry => {
                    let tr = elemCreate("tr")
                    if (flowTable.children.length % 2 == 0) {
                        tr.classList.toggle("dimmed")
                    }
                    let title_string = elemCreate("td", cap(entry.title))
                    let price_string = elemCreate("td", cap(entry.price))
                    let category_string = elemCreate("td", cap(entry.category))

                    tr.appendChild(title_string)
                    tr.appendChild(price_string)
                    tr.appendChild(category_string)
                    if (entry.tags.length) {
                        let properties_td = elemCreate("td")
                        let properties_dropdown = elemCreate("details", "", {
                            "class" : "prop_dropdown"
                        })
                        let summary = elemCreate("summary", cap("hozzáadott értékek"))
                        properties_dropdown.appendChild(summary)
                        properties_td.appendChild(properties_dropdown)
                        entry.tags.forEach(elem => {
                            let span = elemCreate("span", `${cap(elem["key"])}: ${cap(elem["value"])} </br>`)
                            properties_dropdown.appendChild(span)
                        })
                        tr.appendChild(properties_td)
                    } else {
                        tr.appendChild(elemCreate("td"))
                    }
                    flowTable.appendChild(tr)
                    elementsList.push(entry)

                })
                if (!keepList) {
                    clearList()
                }
                spinner.remove()
            })

            .catch(err => console.error("Hiba..." + err))
    }
    catch (err) {
        console.error("Hiba az adatok lekérdezése közben. Hibaüzenet: " + err)
    }
}

var sendDataToDb = async (object) => {
    spinner.add(flowTable)
    try {
        await fetch("/admin/lists/materiallist", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(object)
        }).then(response => {
            if (response.status == 200) {
                getDataFromDb()
                spinner.remove()
                return
            }
            else {
                response.json().then(json => {
                    throw json.message

                }).catch(err => {
                    console.error("Hiba az adatok adatbázisba való tárolása közben. Hibaüzenet: " + err)
                })

            }
        })

    } catch (err) {
        console.error("Hiba az adatok adatbázisba való tárolása közben.")
    }
}

var clearList = () => {
    let propertyArray = document.querySelectorAll(".property")
    propertyArray.forEach(elem => {
        elem.remove()
    })
    optionsObj = []
}

setEvent.click(optionAddBtn, () => {
    if (option_value.value.length) {
        addPropertiesToList(option_key.value, option_value.value)
    } else {
        addElementToList()
    }
})
setEvent.keypress(option_value, "enter", () => {
    if (option_value.value.length) {
        addPropertiesToList(option_key.value, option_value.value)
    } else {
        addElementToList()
    }
})
setEvent.keypress(option_key, "enter", () => {
    if (option_key.value.length) {
        option_value.focus()
    } else {
        addElementToList()
    }
})
setEvent.click(optionRemoveBtn, () => {
    clearList()
})
setEvent.keypress(elemTitle, "enter", () => { elemPrice.focus() })
setEvent.keypress(elemPrice, "enter", () => { matCategory.focus() })
getDataFromDb()
setEvent.click(backBtn, () => {
    selectPage("admin")
})

selArray("a").forEach(elem => {
    if(elem.classList.toString().includes("btn_disabled")) {
        elem.classList.toggle("btn_disabled")
    }
})