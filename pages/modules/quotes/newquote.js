var addWorkBtn = sel("#add_work_btn")
var addMatBtn = sel("#add_material_btn")
var workInputElements = []


setEvent.click(addWorkBtn, function () {
    let newRow = createRow.work()
    sel("#work_table > tbody").appendChild(newRow);
})
setEvent.click(addMatBtn, function () {
    sel("#material_table > tbody").appendChild(createRow.material());
})

var saveBtn = sel("#save_quote_btn")
setEvent.click(saveBtn, function () {
    let workListArray = []
    workInputElements = document.querySelectorAll("tr[name=workphase]")
    workInputElements.forEach(row => {
        let i = workInputElements.length
        let workPhaseObject = {
            id: i,
            workphase: row.children[0].firstElementChild["value"],
            note: row.children[1].firstElementChild["value"],
            qty: row.children[2].firstElementChild["value"],
            unit: row.children[3].firstElementChild["value"],
            multiplier: row.children[5].firstElementChild["value"]
        }
        workListArray.push(workPhaseObject)
    })

    let matList = {}
    let data = {
        /*  username: on server,
            Timestamp on server 
            createdAt on server,
            modifiedAt on server,*/

        clientname: sel("#customer_name")["value"],
        clientaddress: sel("#customer_address")["value"],
        contract_type: sel("#contract_type")["value"],
        serialnumber: sel("#quote_id")["value"],
        worklist: workListArray,
        materiallist: matList

    }
})

let createRow = {
    work: function () {
        let row = elemCreate("tr", { name: "workphase", id: `wp_${sel("#work_table > tbody").childElementCount}` })
        let td_worktype = elemCreate("td", {})
        let work_type = elemCreate("select", { name: "work_type" })
        let work_type_option = elemCreate("option", { value: "none", selected: "true" }, "Válasszon munkafolyamatot!")
        let td_note = elemCreate("td", {})
        let note = elemCreate("input", { type: "text", name: "note", placeholder: "Megjegyzés" })
        let td_qty = elemCreate("td", {})
        let qty = elemCreate("input", { type: "number", name: "qty", value: "1" })
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
        let total = elemCreate("span", { name: "total_price", value: "0" }, "0")
        let td_multiplier = elemCreate("td", {})
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
        td_multiplier.appendChild(multiplier)
        td_multiplier.appendChild(multiplier_x)
        row.appendChild(td_worktype)
        row.appendChild(td_note)
        row.appendChild(td_qty)
        row.appendChild(td_unit)
        row.appendChild(td_multiplier)
        row.appendChild(td_total)
        note.title = "Bármilyen megjegyzés kerülhet ide; Például az adott munkafolyamathoz fűzött részletek. (Horonymarás [téglában], [betonban] stb...)"
        let normPrice = sel("input[name='norm_price']")
        setEvent.change(note, function () {
            note.title = note["value"]
        })
        setArrayEvent.change([normPrice, qty, multiplier], function () {
            calculatePrices.work(normPrice, qty, multiplier, total)
        })
        setTimeout(function () {
            calculatePrices.work(normPrice, qty, multiplier, total)
        }, 10)
        return row
    },
    material: function () {
        let row = elemCreate("tr", { name: "material", id: `wp_${sel("#material_table > tbody").childElementCount}` })
        let td_material = elemCreate("td", {})
        let material_type = elemCreate("select", { name: "work_type" })
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
        let total = elemCreate("span", { name: "total_mat_price", value: 0 }, "0")
        let td_multiplier = elemCreate("td", {})
        let multiplier = elemCreate("input", { type: "number", name: "multiplier", value: "1", step: ".01", class: "width50" })
        let multiplier_x = elemCreate("span", {}, "x")
        unitsArray.forEach(elem => {
            unit.appendChild(elemCreate("option", { value: elem }, elem))
        })

        td_material.appendChild(material_type)
        material_type.appendChild(material_type_option)
        td_price.appendChild(price)
        td_price.appendChild(price_x)
        td_qty.appendChild(qty)
        td_unit.appendChild(unit)
        td_total.appendChild(total)
        td_multiplier.appendChild(multiplier)
        td_multiplier.appendChild(multiplier_x)
        row.appendChild(td_material)
        row.appendChild(td_price)
        row.appendChild(td_qty)
        row.appendChild(td_unit)
        row.appendChild(td_multiplier)
        row.appendChild(td_total)
        let mat_normMultiplier = sel("[name=material_norm_multiplier]")
        setArrayEvent.change([mat_normMultiplier, qty, multiplier, price], function () {
            calculatePrices.material(mat_normMultiplier, qty, multiplier, price, total)
        })
        setTimeout(function () {
            calculatePrices.material(mat_normMultiplier, qty, multiplier, price, total)

        }, 10)
        return row
    }
}

var toCurrency = (number) => {
    let c = new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', maximumFractionDigits: 0 }).format(number)
    return c
}

var calculatePrices = {
    material: function (mat_normMultiplier, qty, multiplier, price, total) {
        let finalPrice = sel("#final_mat_price")
        let final = mat_normMultiplier["value"] * qty["value"] * multiplier["value"] * price["value"]
        total["value"] = final
        total.innerHTML = toCurrency(final)
        let storedSum = 0;
        let matPricesAdded = selArray("[name=total_mat_price]")
        matPricesAdded.forEach(elem => {
            storedSum += elem["value"]
        })
        finalPrice.innerHTML = toCurrency(storedSum)
        finalPrice["value"] = storedSum

    },
    work: function (normPrice, qty, multiplier, total) {
        let computed = normPrice["value"] * qty["value"] * multiplier["value"]
        let finalPrice = sel("#worklist_final_price")
        total["value"] = computed
        total.innerHTML = toCurrency(computed)
        let workPricesAdded = selArray("[name=total_price]")
        let storedSum = 0;
        workPricesAdded.forEach(elem => {
            storedSum += elem["value"]
        })
        finalPrice.innerHTML = toCurrency(storedSum)
    }
}
addWorkBtn.click()
addMatBtn.click()
