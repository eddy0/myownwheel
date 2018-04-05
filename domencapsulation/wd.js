const log = console.log.bind(console)

const e = (sel, element=document) => {
    return element.querySelector(sel)
}

const es = (sel, element=document) => {
    return element.querySelectorAll(sel)
}

const removeClassAll = (className) => {
    const element = es(`.${className}`)
    for (let i = 0; i < element.length; i++ ) {
        element[i].classList.remove(className)
    }
}

const bind = (className, eventName, callback) => {
    const selector = e(`.${className}`)
    selector.addEventListener(eventName, (event) => {
        callback(event)
    })
}

const bindAll = (className, eventName, callback) => {
    const selector = es(`.${className}`)
    for (let i = 0; i < selector.length; i++ ) {
        selector[i].addEventListener(eventName, (event) => {
            callback(event)
        })
    }
}