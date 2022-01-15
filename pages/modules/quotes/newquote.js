var addWorkBtn = sel("#add_work_btn")
var addMatBtn = sel("#add_material_btn")
var cancelBtn = sel("#closebtn_1")
var workInputElements = []
var formChanged = false;

setEvent.change(sel("#module"), () => {
    formChanged = true;
})


setEvent.click(cancelBtn, () => {
    if (formChanged == true) {
        new Confirm([
            "Az űrlapon változások vannak", "white",
            "Ha mentés előtt kilép, a változások elvesznek.", "grey"
        ], () => { selectPage("content/quotes/landing") })

    } else {
        selectPage("content/quotes/landing")
    }

})

setEvent.click(addWorkBtn, function () {
    let newRow = createRow.work()
    sel("#work_table > tbody").appendChild(newRow);
})
setEvent.click(addMatBtn, function () {
    sel("#material_table > tbody").appendChild(createRow.material());
})

var saveBtn = sel("#save_quote_btn")
setEvent.click(saveBtn, async function () {
    let workListArray = []
    workInputElements = document.querySelectorAll("tr[name=workphase]")
    workInputElements.forEach(row => {
        let i = workListArray.length
        let workPhaseObject = {
            id: "wp_" + i,
            workphase: row.children[0].firstElementChild["value"],
            note: row.children[1].firstElementChild["value"],
            qty: row.children[2].firstElementChild["value"],
            unit: row.children[3].firstElementChild["value"],
            multiplier: row.children[4].firstElementChild["value"],
            normPrice: row.children[5].firstElementChild["value"],
            fullPrice: row.children[6].firstElementChild["value"]
        }
        workListArray.push(workPhaseObject)
    })

    let matListArray = []
    matInputElements = document.querySelectorAll("tr[name=material]")
    matInputElements.forEach(row => {
        let i = matListArray.length
        let materialObject = {
            id: "mo_" + i,
            material: row.children[0].firstElementChild["value"],
            defaultPrice: row.children[1].firstElementChild["value"],
            qty: row.children[2].firstElementChild["value"],
            unit: row.children[3].firstElementChild["value"],
            multiplier: row.children[4].firstElementChild["value"],
            newPrice: row.children[5].firstElementChild["value"],
            totalPrice: row.children[6].firstElementChild["value"]
        }
        matListArray.push(materialObject)

    })

    /*  username: on server,
        Timestamp on server 
        createdAt on server,
        modifiedAt on server,*/
    let data = {
        clientname: sel("#customer_name")["value"],
        clientaddress: sel("#customer_address")["value"],
        contract_type: sel("#contract_type")["value"],
        serialnumber: sel("#quote_id")["value"],
        worklist: workListArray,
        materiallist: matListArray,
        netPrice: Math.round(finalRawPrice["value"]),
        discount: discountPercentage["value"],
        discountValue: Math.round(discountAmount["value"]),
        valueAfterDiscount: Math.round(priceAfterDiscount["value"]),
        taxCode: taxCode["value"],
        taxAmount: Math.round(taxAmount["value"]),
        grossTotal: Math.round(finalPrice["value"]),
        expiryDate: new Date(sel("#expiry_date")["value"]),
        globalMatMultiplier: sel("[name=material_norm_multiplier]")["value"],
        globalNormPrice: Math.round(sel("input[name='norm_price']")["value"])
    }
    if (checkInputData(data) == false) {
        return new Alert(
            ["Kötelező adatok hiányoznak.", "red", "Kérjük nézze át az űrlapot,", "white", "és minden hiányzó adatot töltsön ki.", "white"]
        )
    }

    spinner.add(100)
    fetch("/content/quotes/savequote", {
        method: "POST",
        headers: {
            "Content-Type": "Application/JSON"
        },
        body: JSON.stringify(data)

    }).then(
        response => response.json()
    ).then(
        (json) => {
            if (json.statusMessage == "OK") {
                new Alert(json.message)
            } else if (json.statusMessage == "ERROR") {
                new Alert(json.message)
            }
            spinner.remove()
        }
    ).catch(
        reject => {
            new Alert([
                "Hiba", "red",
                "Ismeretlen hiba történt.", "white"
            ])
            spinner.remove()
        }
    )
})


var createRow = {
    work: function () {
        let row = elemCreate("tr", { name: "workphase", id: `wp_${sel("#work_table > tbody").childElementCount - 1}` })
        let td_worktype = elemCreate("td", {})
        /* let work_type = elemCreate("select", { name: "work_type" }) */
        let work_type = elemCreate("input", { name: "work_type", type: "text" })
        let work_type_option = elemCreate("option", { value: "none", selected: "true" }, "Válasszon munkafolyamatot!")
        let td_note = elemCreate("td", {})
        let note = elemCreate("input", { type: "text", name: "note", placeholder: "Megjegyzés" })
        let td_qty = elemCreate("td", {})
        let qty = elemCreate("input", { type: "number", name: "qty", value: "0" })
        let td_unit = elemCreate("td", {})
        let unit = elemCreate("select", { name: "unit", class: "width50" })
        let unitsArray = [
            "db",
            "fm",
            "óra",
            "ktg",
            "klt",
            "kg",
            "m²",
            "l"
        ]

        let td_total = elemCreate("td", {})
        let total = elemCreate("span", { name: "total_price", value: "0" }, "0")
        let td_multiplier = elemCreate("td", {})
        let singlePrice = elemCreate("span", { name: "single_price", value: "0" }, "0")
        let td_singlePrice = elemCreate("td", {})
        let multiplier = elemCreate("input", { type: "number", name: "multiplier", value: "1", step: ".01", class: "width50" })
        let multiplier_x = elemCreate("span", {}, "x")

        unitsArray.forEach(elem => {
            unit.appendChild(elemCreate("option", { value: elem }, elem))
        })
        td_worktype.appendChild(work_type)
        work_type.appendChild(work_type_option)
        td_note.appendChild(note)
        td_qty.appendChild(qty)
        td_unit.appendChild(unit)
        td_total.appendChild(total)
        td_singlePrice.appendChild(singlePrice)
        td_multiplier.appendChild(multiplier)
        td_multiplier.appendChild(multiplier_x)
        row.appendChild(td_worktype)
        row.appendChild(td_note)
        row.appendChild(td_qty)
        row.appendChild(td_unit)
        row.appendChild(td_multiplier)
        row.appendChild(td_singlePrice)
        row.appendChild(td_total)
        note.title = "Bármilyen megjegyzés kerülhet ide; Például az adott munkafolyamathoz fűzött részletek. (Horonymarás [téglában], [betonban] stb...)"
        let normPrice = sel("input[name='norm_price']")
        setEvent.change(note, function () {
            note.title = note["value"]
        })
        setArrayEvent.change([normPrice, qty, multiplier], function () {
            calculatePrices.work(normPrice, qty, multiplier, total, singlePrice)

        })
        setTimeout(function () {
            calculatePrices.work(normPrice, qty, multiplier, total, singlePrice)

        }, 10)
        return row
    },
    material: function () {
        let row = elemCreate("tr", { name: "material", id: `wp_${sel("#material_table > tbody").childElementCount - 1}` })
        let td_material = elemCreate("td", {})
        /* let material_type = elemCreate("select", { name: "work_type" }) */
        let material_type = elemCreate("input", { name: "material_type", type: "text" })
        let material_type_option = elemCreate("option", { value: "none", selected: "true" }, "Válasszon anyagot!")
        let td_price = elemCreate("td", {})
        let price = elemCreate("input", { type: "number", name: "price", placeholder: "Anyagár", value: 0 })
        let price_x = elemCreate("span", {}, " Ft")
        let td_qty = elemCreate("td", {})
        let qty = elemCreate("input", { type: "number", name: "qty", value: 0 })
        let td_unit = elemCreate("td", {})
        let unit = elemCreate("select", { name: "unit", class: "width50" })
        let unitsArray = [
            "db",
            "fm",
            "ktg",
            "klt",
            "kg",
            "m²",
            "l"

        ]

        let td_total = elemCreate("td", {})
        let total = elemCreate("span", { name: "total_mat_price", value: "0" }, "0")
        let td_multiplier = elemCreate("td", {})
        let multiplier = elemCreate("input", { type: "number", name: "multiplier", value: "1", step: ".01", class: "width50" })
        let multiplier_x = elemCreate("span", {}, "x")
        let newPrice = elemCreate("span", { name: "new_price", value: "0" }, "0")
        let td_newPrice = elemCreate("td", {})
        unitsArray.forEach(elem => {
            unit.appendChild(elemCreate("option", { value: elem }, elem))
        })

        td_material.appendChild(material_type)
      /*   material_type.appendChild(material_type_option) */
        td_price.appendChild(price)
        td_price.appendChild(price_x)
        td_qty.appendChild(qty)
        td_unit.appendChild(unit)
        td_total.appendChild(total)
        td_newPrice.appendChild(newPrice)
        td_multiplier.appendChild(multiplier)
        td_multiplier.appendChild(multiplier_x)
        row.appendChild(td_material)
        row.appendChild(td_price)
        row.appendChild(td_qty)
        row.appendChild(td_unit)
        row.appendChild(td_multiplier)
        row.appendChild(td_newPrice)
        row.appendChild(td_total)
        let mat_normMultiplier = sel("[name=material_norm_multiplier]")
        setArrayEvent.change([mat_normMultiplier, qty, multiplier, price], function () {
            calculatePrices.material(mat_normMultiplier, qty, multiplier, price, total, newPrice)

        })
        setTimeout(function () {
            calculatePrices.material(mat_normMultiplier, qty, multiplier, price, total, newPrice)

        }, 10)
        return row
    }
}


var workFinalPrice = sel("#worklist_final_price")
var matFinalPrice = sel("#final_mat_price")
var storedWorkFinalPrice;
var storedMatFinalPrice;

var calculatePrices = {
    material: function (mat_normMultiplier, qty, multiplier, price, total, newPrice) {
        storedMatFinalPrice = 0;
        let final = mat_normMultiplier["value"] * qty["value"] * multiplier["value"] * price["value"]
        let newPriceValue = multiplier["value"] * price["value"] * mat_normMultiplier["value"]
        newPrice.innerHTML = toCurrency(newPriceValue)
        newPrice["value"] = newPriceValue
        total["value"] = final
        total.innerHTML = toCurrency(final)
        let storedSum = 0;
        let matPricesAdded = selArray("[name=total_mat_price]")
        matPricesAdded.forEach(elem => {
            storedSum += elem["value"]
        })
        matFinalPrice.innerHTML = toCurrency(storedSum)
        matFinalPrice.setAttribute("value", storedSum)
        storedMatFinalPrice = storedSum;
        calculateFinalPrices()

    },
    work: function (normPrice, qty, multiplier, total, singlePrice) {
        let computed = normPrice["value"] * qty["value"] * multiplier["value"]
        storedWorkFinalPrice = 0;
        let singlePriceValue = multiplier["value"] * normPrice["value"]
        singlePrice.innerHTML = toCurrency(singlePriceValue)
        singlePrice["value"] = singlePriceValue
        total["value"] = computed
        total.innerHTML = toCurrency(computed)
        let workPricesAdded = selArray("[name=total_price]")
        let storedSum = 0;
        workPricesAdded.forEach(elem => {
            storedSum += elem["value"]
        })
        workFinalPrice.innerHTML = toCurrency(storedSum)
        workFinalPrice.setAttribute("value", storedSum)
        storedWorkFinalPrice = storedSum;
        calculateFinalPrices()

    },

}

addWorkBtn.click()
addMatBtn.click()

var finalRawPrice = sel("#total_final_price")
var discountPercentage = sel("#discount")
var discountAmount = sel("#discount_amount")
var priceAfterDiscount = sel("#total_final_price_after_discount")
var taxCode = sel("#tax")
var taxCodeParsed
var taxAmount = sel("#tax_amount")
var finalPrice = sel("#final_end_price")


setArrayEvent.change([discountPercentage, taxCode], () => { calculateFinalPrices() })

var calculateFinalPrices = () => {
    try {
        taxCodeParsed = parseFloat(taxCode["value"])
        if(taxCodeParsed.toString() == "NaN") {
            taxCodeParsed = 0
        }
    } catch(e) {
        taxCodeParsed = 0
    }

    
    let total = storedWorkFinalPrice + storedMatFinalPrice
    let discount;
    discountPercentage["value"] > 0 ? discount = discountPercentage["value"] / 100 : discount = 0
    let discVal = total * discount
    let priceAfterDiscount_data = total - discVal
    let taxAmount_data = priceAfterDiscount_data * taxCodeParsed
    let finalPrice_data = priceAfterDiscount_data + taxAmount_data;

    finalRawPrice.innerHTML = toCurrency(total)
    finalRawPrice["value"] = total
    discountAmount.innerHTML = toCurrency(discVal)
    discountAmount["value"] = discVal
    priceAfterDiscount.innerHTML = toCurrency(priceAfterDiscount_data)
    priceAfterDiscount["value"] = priceAfterDiscount_data
    taxAmount.innerHTML = toCurrency(taxAmount_data)
    taxAmount["value"] = taxAmount_data
    finalPrice.innerHTML = toCurrency(finalPrice_data)
    finalPrice["value"] = finalPrice_data

}

var clientNameInput = sel("#customer_name")
var generateSerialNumber = () => {
    let clientName = clientNameInput["value"]
    let numberString = ""
    let nameString = ""

    for (let i = 0; i < clientName.length;) {
        if (clientName[i] != " " && i == 0) {
            nameString += clientName[i].toUpperCase()
        }
        if (clientName[i] == " ") {
            if (clientName[i + 1] != " ") {
                nameString += clientName[i + 1].toUpperCase()
            }
        }
        i++
    }
    for (let i = 0; i < 10 - nameString.length; i++) {
        numberString += Math.round(Math.random() * 9)
    }

    sel("#quote_id")["value"] = numberString + nameString
    sel("#quote_id").innerHTML = numberString + nameString
}

var checkInputData = (input) => {
    let passed = true;
    let clientname = sel("#customer_name")
    let clientaddress = sel("#customer_address")
    let expiryDate = sel("#expiry_date")
    let highLight = (elem) => {
        elem.style = "background: rgb(255,200,200);"
        setEvent.keypress(elem, "any", () => {
            elem.style = ""
        })
        setEvent.change(elem, () => {
            elem.style = ""
        })
    }
    if (!input.clientname) {
        highLight(clientname)
        passed = false
    }
    if (!input.clientaddress) {
        highLight(clientaddress)
        passed = false
    }
    if (!input.expiryDate) {
        highLight(expiryDate)
        passed = false
    }
    if (!passed) {
        return false
    } else {
        return true
    }
}

setEvent.click(sel("#refresh_serial_btn"), () => { generateSerialNumber() })
setEvent.change(clientNameInput, () => { generateSerialNumber() })

selArray("a").forEach(elem => {
    if(elem.classList.toString().includes("btn_disabled")) {
        elem.classList.toggle("btn_disabled")
    }
})