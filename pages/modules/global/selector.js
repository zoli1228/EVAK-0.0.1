var sel = (tag) => {
    return document.querySelector(`${tag}`)
}

var selArray = (tag) => {
    return document.querySelectorAll(`${tag}`)
}

var cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

var elemCreate = (element, {...attributes}, innerHTML) => {

    let elem = document.createElement(element)
    innerHTML ? elem.innerHTML = innerHTML : null
    if(Object.entries(attributes)) {
        for(let i = 0; i < Object.keys(attributes).length; i++) {
            elem.setAttribute(Object.entries(attributes)[i][0], Object.entries(attributes)[i][1])
        }
    } else {
        return elem
    }


    return elem
}