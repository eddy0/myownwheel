const __wdSearchBar = () => {


    const e = (sel, container=document) => container.querySelector(sel)
    const link = e('head')
    const t = `<link rel="stylesheet" href="./searchbar.css">`
    link.insertAdjacentHTML('beforeend', t)

    const input = document.querySelector('.wd-input')
    input.addEventListener( 'focus', (event) => {
        const p = event.target.parentElement
        if (p.classList.contains('wd-searchbar-input')) {

            let container = e('.wd-searchbar')
            container.classList.add('wd-searchbar-focused')

            let inputWrapper = e('.wd-searchbar-input', container)
            inputWrapper.classList.add('is-focus')

            let AskBtn = e('.wd-searchbar-ask', container)
            AskBtn.classList.add('wd-askBtn-hidden')
        }
    })

    input.addEventListener( 'blur', (event) => {
        const t = event.target
        const p = t.parentElement
        if (p.classList.contains('wd-searchbar-input')) {
            let container = e('.wd-searchbar')
            let inputWrapper = e('.wd-searchbar-input', container)
            container.classList.remove('wd-searchbar-focused')
            inputWrapper.classList.remove('is-focus')

            let AskBtn = e('.wd-searchbar-ask', container)
            AskBtn.classList.remove('wd-askBtn-hidden')
        }
    })


}

__wdSearchBar()