const log = console.log.bind(console)

const e = (sel, element=document) => element.querySelector(sel)

const es = (selector, element=document) => {
    return element.querySelectorAll(selector)
}

const bind = (selector, eventName, callback) => {
    const element = e(selector)
    element.addEventListener(eventName, (event)=> {
        callback(event)
    })
}

const removeClassAll = (className) => {
    const element = es(`.${className}`)
    for (let i = 0; i < element.length; i++ ) {
        element[i].classList.remove(className)
    }
}

const ajax = (method, path, data, callback) => {
    const r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = () => {
        if (r.readyState === 4 ) {
                let res = JSON.parse(r.response)
                callback(res)
            }
        }
    data = JSON.stringify(data)
    r.send(data)
}

const promiseAjax = (method, path, data) => {
    let promise = new Promise((resolve, reject) => {
        const r = new XMLHttpRequest()
        r.open(method, path, true)
        r.setRequestHeader('Content-Type', 'application/json')
        r.onreadystatechange = () => {
            if (r.readyState === 4) {
                    resolve(r.response)
            }
        }
        r.onerror = () => {
            reject(r)
        }
        r.send(data)
    })
    return promise
}

const get = (callback) => {
    let path = 'https://vip.kybmig.cc/sandbox/todo/271454165/all'
    ajax('GET', path, '', callback)
}

const add = (data, callback) => {
    let task = {
        content:  data,
        done: false,
    }
    let todo = {
        task: JSON.stringify(task)
    }
    let path = 'https://vip.kybmig.cc/sandbox/todo/271454165/add'
   ajax('POST', path, todo, callback)
}

const update = (id, data) => {
    let path = 'https://vip.kybmig.cc/sandbox/todo/271454165/update/' + id
    ajax('POST', path, data, (r) => {
        console.log('updated', r)
    })
}

const remove = (id) => {
    let path = 'https://vip.kybmig.cc/sandbox/todo/271454165/delete/' + id
    ajax('GET', path, '', (r) => {
        console.log('deleted', r)
    })
}

const templateCss = () => {
    const css = `
    <style>
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0
    }

    body{
        font-size: 15px;
        font-family: sans-serif;
        background-color: #5BB9B8;
    }

    svg {
        fill:inherit
    }
    
    svg >path {
        pointer-events: none;
    }

    button {
      padding: 2px 16px;
      font: inherit;
      color: inherit;
      cursor: pointer;
      background: #4b908f;
      border: none;
      outline: none;
      appearance: none;
      border-radius: 2px;
    }

    button:focus{
        outline: 0;
        border: 0;
    }

    .wd-btn{
        border: 0;
        cursor: pointer;
        font-size: 14px;
        line-height: 30px;
        padding: 0 16px;
        border-radius: 3px;
        text-align: center;
    }
    
    .wd-todoBox{
        width: 500px;
        margin: 0 auto;
        margin-top: 100px;
        position: relative;
        /* background-color: #2C3845;
        $base: #5BB9B8;
        $hover: #54a1a0;
        $rain: #2C3845;
        $poppy: #BD2A4E;
        c:#7a91aa
        */
        background-color: #414b57;
        color:#fff;
        padding: 20px 50px 20px 20px;
        box-shadow: 2px 5px 9px rgba(0,0,0,0.4);
        border-radius: 4px;
    }

    .todo-title{
        margin-bottom: 10px;
        padding-bottom: 10px;
        margin-right: 20px;
        border-bottom: 1px solid;
        font-weight: 600;
    }

    .wd-todo-menu {
        position: absolute;
        top:20px;
        left: 130px;
    }

    .wd-todo-menu > button {
        margin: 0 8px;
        box-shadow: 1px 2px 3px rgba(26,30,34,0.8)
    }

    .wd-show-all, .wd-show-done, .wd-show-todo{
        background-color: #666e78;
    }

    .wd-show-all.show, .wd-show-done.show, .wd-show-todo.show {
        background-color: #5BB9B8;
    }

    .icon-todo-add{
        display: flex;
        position: absolute;
        right: 30px;
        top: 20px;
        border-radius: 50%;
        background-color: #ED767A;
        fill: #f6f6f6;
        cursor: pointer;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.7);
        /* transition: all 0.5s cubic-bezier(.87, -.41, .19, 1.44); */
        transition: all 0.2s linear;
    }

    .icon-todo-add:hover{
        background-color: #b14d51;
        fill: #fff;
    }

    .icon-todo-add.add-open{
        transform: rotate(45deg);
    }

    .icon-todo-add svg {
        width: 30px;
        height: 30px;
    }


    .todo-addContainer {
        width: 0%;
        display: flex;
        padding-right: 67px;
        margin: 12px 0 0 23px;
        visibility: hidden;
        transform: scale(0);
        transition: transform 0.2s ease;
    }


    .todo-addContainer.add-open{
        width: 100%;
        transition: all 0.3s linear;
        visibility: visible;
        transform: scale(1);
    }

    .input-todo-add{
        flex: 1;
        border: 0;
        outline: 0;
        padding: 2px 10px;
        font-size: 14px;
        line-height: 21px;
        border-radius: 2px;
    }
    .btn-todo-add{
        border-radius: 5px;
        margin-left: 5px;
    }
    

    .todo-addContainer .btn-todo-add{
        background-color: #ED767A;
        color: #fff;
        padding: 2px 5px;
    }

    .todo-addContainer .btn-todo-add:hover{
        background-color: #ee8387;

    }

    .todo-wrapper {
        display: flex;
        position: relative;
        align-items: center;
        position: relative;
        margin-right: 20px;
        margin-top: 10px;
    }

    .todo-content{
        font-size: 16px;
        line-height: 22px;
        flex: 1;
        margin-left: 4px;
        padding: 0 50px 0 10px;
        border-bottom: 1px solid #e6e6e6;
        overflow: hidden;
        word-wrap: break-word;
        white-space: nowrap;
        max-width: 320px;
    }

    .todo-content.done{
        text-decoration: line-through #b14d51;
    }

    .todo-content:focus{
        outline: 0;
    }

    .todo-action {
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
    }

    .todo-action > svg{
        fill: rgba(255,255,255,0.5);
        cursor: pointer;
        /* box-shadow: 0 2px 2px rgba(0,0,0,0.3); */
        transition: fill 0.3s ease;
        margin-left: 7px;
    }

    .todo-action > svg:hover {
        /* fill:rgba(0,0,0,0.5) */
        fill:#fff;
    }

    input[type=checkbox] {
      cursor: pointer;
      visibility: hidden;
      position: relative;
      width: 20px;
      height: 22px;
      border-top: 50%;
      border: 1px solid;
    }

    input[type=checkbox]:after {
      content: "\\2714";
      font-weight:bold;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      color:rgba(0,0,0,0.2);
      width: 20px;
      height: 20px;
      font-size: 13px;
      border-radius: 50%;
      visibility: visible;
      position: relative;
      box-shadow: 0 2px 2px rgba(0,0,0,0.3);
      transition: color 0.2s linear;
    }

    input[type=checkbox]:hover:after {
        color:rgba(0,0,0,0.4);

    }

    input[type=checkbox].done:after {
      color:#fff;
      background-color: #4b908f;
    }

    </style>
    `
    return css
}

const tempalteHtml = () => {
    const t = `
    <div class="wd-todoBox">
        <h3 class="todo-title">Todo List</h3>
        <div class="wd-todo-menu">
            <button class="wd-show-all show">All</button>
            <button class="wd-show-todo">Todo</button>
            <button class="wd-show-done">Done</button>
        </div>
        <div class="todo-container">

        </div>
        <div class="todo-addContainer">
                <input type="text" class="input-todo-add" placeholder="add todo">
                <button class="btn-todo-add">add</button>
        </div>
        <span class="icon-todo-add">
            <svg class="icon icon-add" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
        </span>
    </div>

    `
    return t
}

const templateTodo = (todo) => {
    const {id, qq, task} = todo
    const {content, done} = JSON.parse(task)
    let status = ''
    if (done) {
        status = 'done'
    }
    const t = `
    <div class="todo-wrapper" data-id=${id}>
        <input type="checkbox" class="btn-todo-done ${status}">

        <span class="todo-content ${status}" contenteditable="false">${content}</span>

        <div class="todo-action">
            <svg class="icon btn-todo-edit" fill="#ffffff" height="20" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
            <svg class="icon btn-todo-delete" fill="#ffffff" height="20" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
        </div>
    </div>
    `
    return t
}

const appendTodo = (todo) => {
    const t = templateTodo(todo)
    const container = e('.todo-container')
    container.insertAdjacentHTML('beforeend', t)
}

const initHtml = () => {
    const t = tempalteHtml()
    const body = document.body
    body.innerHTML = ''
    body.insertAdjacentHTML('beforeend', t)
}

const initStyle = () => {
    const css = templateCss()
    document.head.insertAdjacentHTML('beforeend', css)
}

const insertTodo = (todo) => {
    if (todo !== undefined && todo.length !== 0) {
        todo.map( t => {
            appendTodo(t)
        })
    } else {
        console.log('no todo', todo)
    }
}

const initTodo = () => {
    get( (todo) => {
        insertTodo(todo)
    })
}

const init = () => {
    initStyle()
    initHtml()
    initTodo()
}

const showContent = (todo) => {
    const container = e('.todo-container')
    container.innerHTML=''
    insertTodo(todo)
}

const bindShowAll = (self, todo) => {
    if (self.classList.contains('wd-show-all')){
        showContent(todo)
    }
}

const bindShowTodo = (self, todo) => {
    if (self.classList.contains('wd-show-todo')){
        todo = todo.filter( t => {
            let {done} = JSON.parse(t.task)
            return done === false
        })
        console.log('todo', todo)
        showContent(todo)
    }
}

const bindShowDone = (self, todo) => {
    if (self.classList.contains('wd-show-done')){
        todo = todo.filter( t => {
            let {done} = JSON.parse(t.task)
            return done === true
        })
        console.log('done', todo)
        showContent(todo)
    }
}

const bindMenuDelegate = () => {
    bind('.wd-todo-menu', 'click', (event)=>{
        const self = event.target
        removeClassAll('show')
        self.classList.add('show')
        get( (todo) => {
            bindShowAll(self, todo)
            bindShowTodo(self, todo)
            bindShowDone(self, todo)
        })
    })
}

const AddContainerhandler = () => {
    const icon = e('.icon-todo-add')
    const addBar = e('.todo-addContainer')
    const input = e('.input-todo-add', addBar)
    if (icon.classList.contains('add-open')) {
        removeClassAll('add-open')
        input.value = ''
    } else{
        icon.classList.add('add-open')
        addBar.classList.add('add-open')
        setTimeout( () => {
            input.focus()
        }, 60)
    }
}

const activeAddBar = () => {
    bind('.icon-todo-add', 'click', AddContainerhandler)
}

const addTodo = () => {
    bind('.btn-todo-add', 'click', (event)=> {
        const input = e('.input-todo-add')
        const task = input.value
        add(task, (r)=> {
            console.log('r', r)
            appendTodo(r)
        })
        AddContainerhandler()
    })
}

const deleteTodo = (self) => {
    const wrapper = self.closest('.todo-wrapper')
    const id = wrapper.dataset.id
    wrapper.remove()
    remove(id)
}

const updateTodo = (container) => {
    const wrapper = container.closest('.todo-wrapper')
    const id = Number(wrapper.dataset.id)
    let content = container.innerText
    let done = false
    if (container.classList.contains('done')) {
        done = true
    }
    let task = {
        content: content,
        done: done
    }
    let data = {
        id: id,
        task: JSON.stringify(task)
    }
    update(id, data)
}

const editUpdateEvent = (container) => {
    container.addEventListener('keydown', (event)=>{
        let key = event.key
        if (key ==='Enter') {
            event.preventDefault()
            container.blur()
        }
    })

    container.addEventListener('blur', ()=>{
        container.setAttribute('contenteditable', 'false')
        updateTodo(container)
    })
    }

const editTodo = (self) => {
    const wrapper = self.closest('.todo-wrapper')
    const content = e('.todo-content', wrapper)
    if (!content.classList.contains('done')){
        content.setAttribute('contenteditable', 'true')
        content.focus()
        editUpdateEvent(content)
    }
}

const finishTodo = (self) => {
    const wrapper = self.closest('.todo-wrapper')
    const content = e('.todo-content', wrapper)
    content.classList.toggle('done')
    self.classList.toggle('done')
    content.contentEditable=false
    updateTodo(content)
}

const bindUpdateDelegate = () => {
    bind('.todo-container', 'click', (event)=> {
        const self = event.target
        if (self.classList.contains('btn-todo-delete')) {
            deleteTodo(self)
        } else if (self.classList.contains('btn-todo-edit')) {
            editTodo(self)
        } else if (self.classList.contains('btn-todo-done')) {
            finishTodo(self)
        }
    })
}

const bindAddEvent = () => {
    activeAddBar()
    addTodo()
}

const bindEvents = () => {
    bindMenuDelegate()
    bindAddEvent()
    bindUpdateDelegate()
}

const __main = () => {
    init()
    bindEvents()
}

__main()
