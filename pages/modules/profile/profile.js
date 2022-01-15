var fapapucs = () => {
    new Alert([
        "Dö heeeemmm", "green"
    ])
}

setEvent.click(sel("#dropdowntest"), (e) => {
    addDropDown(e, [
        {
            icon: "fas fa-images",
            text: "Profilkép feltöltése",
            func: () => {return}
        },
        {
            icon: "fas fa-images",
            text: "Profilkép törlése",
            func: () => {return}
        },
        {
            icon: "fas fa-user-edit",
            text: "Személyes adatok szerkesztése",
            func: () => {return}
        },
        {
            icon: "fas fa-key",
            text: "Jelszó megváltoztatása",
            func: () => {return}
        },
        {
            icon: "fas fa-trash-alt",
            text: "Fiók törlése a rendszerből",
            class: "dropDown_red",
            func: function() {
                new Confirm([
                    "Figyelem!", "red",
                    "Email címére küldünk egy megerősítő üzenetet.", "white",
                    "Amennyiben megerősíti a törlést, a fiókja az összes tárolt adatával", "white",
                    "véglegesen törölve lesz az adatbázisunkból. Biztos folytatja?", "white"
                ], () => {
                    new Alert([
                        "Megerősítő email elküldve.", "white"
                    ])
                })
            }
        }
    ])
})