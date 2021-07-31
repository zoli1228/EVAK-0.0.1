var mainWindow = document.querySelector("#moduleMain")
var isAdmin = sessionStorage.setItem("role", "fapapucs")
console.log(isAdmin)



mainWindow.addEventListener("mouseenter", () => {
    mainWindow.setAttribute("style", `background: rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}`)
})


