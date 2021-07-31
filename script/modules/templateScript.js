document.querySelector("#module > h1").addEventListener("click", (e)=> {
    e.target.setAttribute("style", `color: rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}`)
})