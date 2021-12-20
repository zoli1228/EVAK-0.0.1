var workListArray = {};
var moduleDom = sel("#module")
var addBtn = sel("#work_add")
var workList = sel("#workflowtable")
var input_workTitle = sel("#work_title")
var input_workPrice = sel("#work_price")
var input_workCategory = sel("#work_category")
var backBtn = sel("#module_back_button")

var getWorkList = async (input) => {

    if (!input) {
        await fetch("/admin/lists/worklist")
            .then(
                response => response.json()
                )
            .then((json) => {
                let result = json
                workListArray = result
                populateTable(workListArray)
                
            })
            .catch(err => {
                console.log("Hiba a munkafolyamatok lekérdezésekor. : " + err)
            })
    }
}
addBtn.addEventListener("click", (e) => {
    e.preventDefault()
    postWork(input_workTitle.value, input_workCategory.value, input_workPrice.value)
    input_workTitle.value = input_workPrice.value = input_workCategory.value = null;
})

var postWork = async (title, category, price) => {

    let data = {
        title,
        category,
        price,
        "uniqueId" : genRandomId(6)
    }

    fetch("/admin/lists/worklist", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(data)

    }).then((response) => {

        switch (response.status) {
            case 500:
                console.error("Belső szerver hiba az adatok küldése során.")
                break;
            case 200:
                getWorkList()
                console.log("Sikeres adatküldés")
                break;
        }
    })
        .catch(err => {
            console.log("Hiba a munkafolyamat hozzáadaása közben: " + err)
        })
}

var genRandomId = (length) => {
    let id = ""
    for(let i = 0; i < length; i++) {
        let rand = Math.round(Math.random() * 9)
        id+= rand
    }
    return id;
}

var deleteFromDb = async (elem) => {
    if(elem) {
        try {
        await fetch(`/admin/lists/worklist/${elem}`, {
            method: "DELETE"
        }).then((response) => {
            if(response.status == 200) {
                getWorkList()
            }
            else {
                return;
            }
        })
    } catch(err) {
        console.error("Hiba a törlés során: " + err)
    }

       /*  getWorkList() */
    }
}
var populateTable = (object) => {

    workList.innerHTML = ""
    for (let i = 0; i < object.length; i++) {

        
        let element = object[i]
        let tr = document.createElement("tr")
        let titleTd = document.createElement("td")
        let categoryTd = document.createElement("td")
        let priceTd = document.createElement("td")
        let actionsTd = document.createElement("td")
        let deleteBtn = document.createElement("a")
        let editBtn = document.createElement("a")
        let btnContainer = document.createElement("div")
        btnContainer.setAttribute("class", "btn_container")
        deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`
        editBtn.innerHTML = `<i class="fas fa-edit"></i>`
        tr.id = `work_row_${i}`
        titleTd.id = element.uniqueId
        titleTd.innerHTML = element.worktitle
        priceTd.innerHTML = element.workprice
        categoryTd.innerHTML = element.category
        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault()
            if(confirm("Biztos törlöd a tételt? Ezt nem lehet visszavonni.")) {
                deleteFromDb(element.uniqueId)
            }
            

        })
        editBtn.addEventListener("click", (e) => {
            e.preventDefault()
            console.log("Edit id " + i)
        })
        tr.setAttribute("class", "list_row")
        editBtn.setAttribute("class", "action_btn color_blue")
        deleteBtn.setAttribute("class", "action_btn color_red")
        btnContainer.appendChild(editBtn)
        btnContainer.appendChild(deleteBtn)
        actionsTd.appendChild(btnContainer)
        tr.appendChild(titleTd)
        tr.appendChild(categoryTd)
        tr.appendChild(priceTd)
        tr.appendChild(actionsTd)

        workList.appendChild(tr)
    };


}
getWorkList()
setEvent.click(backBtn, () => {
    selectPage("admin")
})

selArray("a").forEach(elem => {
    if(elem.classList.toString().includes("btn_disabled")) {
        elem.classList.toggle("btn_disabled")
    }
})