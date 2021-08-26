
    var dbBtn = document.querySelector("#db_button")
    var matDbBtn = document.querySelector("#matdb_button")
    dbBtn.addEventListener("click", () => {
        selectPage("admin/dbactions")
    })
    matDbBtn.addEventListener("click", () => {
        selectPage("admin/materiallist")
    })



