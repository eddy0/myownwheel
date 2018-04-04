const log = console.log.bind(console)

const e = (sel, element=document) => {
    return element.querySelector(sel)
}

const removeClassAll = (className) => {
    const element = es(`.${className}`)
    for (let i = 0; i < element.length; i++ ) {
        element[i].classList.remove(className)
    }
}