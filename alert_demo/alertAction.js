const log = console.log.bind(console)

class Alert {
    constructor(args) {
        log(args)
        let {
            wrapperClass,
            title,
            notice,
            overlayColor,
            wrapperColor,
        } = args
        this.wrapperClass = `_${wrapperClass}`
        this.title = title
        this.notice = notice
        this.overlayColor = overlayColor || '#ebebeb'
        this.wrapperColor = wrapperColor || '#fff'
        this.init()
        this.wrapper = this.e(`.${this.wrapperClass}`)
        this.action = undefined
    }

    static create(args) {
        return new this(args)
    }

    on(event) {
        this.action = event
        return this
    }

    fire(...args) {
        if (this.action !== undefined) {
            this.action.apply(this, args)
        }
        this.clear()
    }

    clear() {
        this.wrapper.remove()
    }

    e(sel, element=document) {
        let tags = element.querySelectorAll(sel)
        if (tags.length <= 0){
            return null
        } else if (tags.length === 1){
            return tags[0]
        } else {
            return tags
        }
    }

    bindAll(selector, eventName, callback) {
        const element = this.e(selector)
        for (let i = 0; i < element.length; i++ ) {
            let tag = element[i]
            tag.addEventListener(eventName, (event) => {
                callback(event)
            })
        }
    }

    has(event, className) {
        return event.target.classList.contains(className)
    }

    init() {
        let exist = this.e(`.${this.wrapperClass}`)
        if (exist !== null){
            exist.remove()
        }
        this.initframe()
        this.initCss()
    }

    cssTemplate() {
        const t = (`
          <style id="_id-style-alert" >
            ._wd-alert-wrapper, ._wd-alert-wrapper * {
                margin: 0;
                padding: 0;
                font: inherit;
                color: inherit;
                box-sizing: border-box;
            }
            ._wd-alert-wrapper{
                font-size: 14px;
                font-family: -apple-system, Helvetica, 'Helvetica Neue', Arial, sans-serif;
            }
            ._wd-alert-wrapper a{
                text-decoration: none;
            }
            ._wd-alert-wrapper img{
                vertical-align: top;
            }
            ._wd-alert-wrapper.alert-show div{
                display: block;
                opacity: 1;
            }

            ._wd-alert-wrapper .wd-alert-overlay{
                display: none;
                opacity: 0.6;
                background-color: ${ this.overlayColor };
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                position: absolute;
                z-index: 998;
            }
            ._wd-alert-wrapper .wd-alert-box{
                display: none;
                background-color: ${ this.wrapperColor };
                position: fixed;
                left: 50%;
                top: 50%;
                padding: 20px;
                -webkit-border-radius: 5px; 
                border-radius: 5px;
                text-align: center;
                transform: translate(-50%, -50%);
                -webkit-transform: translate(-50%, -50%);
                animation: _wdAlertShow 0.3s;
                z-index: 999;
                box-shadow: 0 0 20px -3px rgba(0,0,0,0.2);
            }
            @keyframes _wdAlertShow {
                0% {
                    -webkit-transform:translate(-50%, -50%)  scale(.7);
                    transform:translate(-50%, -50%)  scale(.7);
                    }
                45% {
                    -webkit-transform:translate(-50%, -50%)  scale(1.05);
                    transform:translate(-50%, -50%)  scale(1.05);
                }
                80% {
                    -webkit-transform:translate(-50%, -50%)  scale(.95);
                    transform:translate(-50%, -50%)  scale(.95);
                }
                100% {
                    -webkit-transform:translate(-50%, -50%)  scale(1);
                    transform:translate(-50%, -50%)  scale(1);
                }
            }
            ._wd-alert-wrapper .wd-alert-box > .wd-alert-title{
                color: #575757;
                font-size: 30px;
                text-align: center;
                font-weight: 600;
                text-transform: none;
                position: relative;
                margin: 0;
                padding: 0;
                line-height: 60px;
                display: block;
            }
            ._wd-alert-wrapper .wd-alert-box  .wd-alert-content {
                font-size: 18px;
                text-align: center;
                font-weight: 300;
                position: relative;
                float: none;
                margin: 0;
                padding: 0;
                line-height: normal;
                color: #555;
            }

            ._wd-alert-wrapper .wd-alert-box  .wd-alert-input{
                max-width: 300px;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                box-sizing: border-box;
                border-radius: 3px;
                border: 1px solid #d7d7d7;
                margin: 10px auto;
                font-size: 18px;
                box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.3);
                -webkit-transition: all 0.3s;
                transition: all 0.3s;
                height: 40px;
                padding: 0 12px;
             }

            ._wd-alert-wrapper .wd-alert-box .wd-alert-btns{
                margin: 30px auto 0;
            }
            ._wd-alert-wrapper .wd-alert-box .wd-alert-btn{
                margin: 0 5px;
                color: #fff;
                border: 0;
                box-shadow: none;
                font-size: 17px;
                font-weight: 500;
                border-radius: 5px;
                padding: 10px 32px;
                cursor: pointer;
                box-sizing: border-box;
                background-color: #999;
            }

            ._wd-alert-wrapper .wd-alert-btn:hover{
                background-color: #888;
            }

             ._wd-alert-wrapper .wd-alert-box .wd-alert-btn:focus{
                outline: 0;
                border: 0;
            }

            ._wd-alert-wrapper .wd-alert-btn.wd-alert-submit, ._wd-alert-wrapper .wd-alert-btn.wd-alert-notice {
                 background-color: rgb(48, 133, 214);
            }
            ._wd-alert-wrapper .wd-alert-btn.wd-alert-submit, ._wd-alert-wrapper .wd-alert-btn.wd-alert-notice:hover{
                background-color: rgb(43, 120, 193);
            }

             ._wd-alert-wrapper .wd-alert-btn.wd-alert-confirm {
                 background-color: rgb(92,184,92);
            }
            ._wd-alert-wrapper .wd-alert-btn.wd-alert-confirm:hover{
                background-color: rgb(68,157,68);
            }

           ._wd-alert-wrapper .wd-alert-btn.wd-alert-cancel{
                background-color: #999;
            }
           ._wd-alert-wrapper .wd-alert-btn.wd-alert-cancel:hover{
                background-color: #888;
            }

           ._wd-alert-wrapper  .wd-alert-btn.wd-alert-reject{
                background-color: #d9534f;
            }
           ._wd-alert-wrapper  .wd-alert-btn.wd-alert-reject:hover{
                 background-color: #c9302c;
             }
        </style>
        `)
        return t
    }

    initframe() {
        let t = `
            <div class="${this.wrapperClass} _wd-alert-wrapper alert-show">
                <div class="wd-alert-overlay"></div>
                <div class="wd-alert-box"></div>
            </div>
            `
        document.body.insertAdjacentHTML('beforeend', t)
    }

    initCss() {
        const css = this.e(`#_id-style-alert`)
        if (css === null){
            const t = this.cssTemplate()
            document.head.insertAdjacentHTML('beforeend', t)
        }
    }

    insertHtml(t) {
        let box = this.e('.wd-alert-box', this.wrapper )
        box.innerHTML = ''
        box.insertAdjacentHTML('beforeend', t)
    }
}

class AlertNotice extends Alert {
    constructor(args) {
        super(args)
        this.appendHtml()
        this.actionAlert()
    }

    noticeTemplate() {
        let notice = (this.notice === undefined) ?'none' : 'block'
        let title = (this.title === undefined) ? 'none' : 'block'
        const t = `
                    <div class="wd-alert-title" style="display: ${title}">
                        ${this.title}
                    </div>
                    <div class="wd-alert-content" style="display: ${notice}">
                         ${this.notice}
                    </div>
                    <div class="wd-alert-btns">
                    <button class="wd-alert-btn wd-alert-notice">OK</button>
                     </div>
            `
            return t
        }

    appendHtml() {
        const t = this.noticeTemplate()
        this.insertHtml(t)
    }

    actionAlert() {
        this.wrapper.addEventListener('click', () => {
            this.wrapper.classList.toggle('alert-show')
                this.fire()
        })
    }
}

class AlertConfirm extends Alert {
    constructor(args) {
        super(args)
        this.appendHtml()
        this.actionAlert()
    }

    confirmTemplate() {
        let notice = (this.notice === undefined) ?'none' : 'block'
        let title = (this.title === undefined) ? 'none' : 'block'
        const t = `
                    <div class="wd-alert-title" style="display: ${title}">
                        ${this.title}
                    </div>
                    <div class="wd-alert-content" style="display: ${notice}">
                         ${this.notice}
                    </div>
                    <div class="wd-alert-btns">
                    <button class="wd-alert-btn wd-alert-confirm">OK</button>
                    <button class="wd-alert-btn wd-alert-reject">NO</button>
                    </div>
                    
            `
        return t
    }

    appendHtml() {
        const t = this.confirmTemplate()
        this.insertHtml(t)
    }

    actionAlert(){
        this.bindAll('.wd-alert-btn', 'click', (event) => {
            this.wrapper.classList.toggle('alert-show')
            if (this.has(event, 'wd-alert-confirm')){
                this.fire(true)
            } else if (this.has(event,'wd-alert-reject')) {
                this.fire(false)
            }
        })
    }
}

class AlertInput extends Alert {
    constructor(args) {
        super(args)
        let {
            template,
            hideCancel,
            input,
            } = args
        this.template = template
        this.hideCancel = hideCancel
        this.input = input
        this.appendHtml()
        this.actionAlert()
    }

    parseInput() {
        let list = this.input.map( (item) =>{
            let name = item.name || ''
            let placeholder = item.placeholder || ''
            let type = item.type || 'text'
            let t = (`
                 <input class="wd-alert-input" type="${type}" name="${name}"  placeholder="${placeholder}">
            `)
            return t
        })
        list = list.join('\n')
        return list
    }

    inputTemplate() {
        let hideCancel = (this.hideCancel === undefined) ? 'inline-block' : 'none'
        let title = (this.title === undefined) ? 'none' : 'block'
        let notice = (this.notice === undefined) ?'none' : 'block'
        let input = this.parseInput()
        let t = (`
                    <div class="wd-alert-title" style="display: ${title}">
                        ${this.title}
                    </div>
                    <div class="wd-alert-inputWrapper">
                       ${ input }
                    </div>
                     <div class="wd-alert-content" style="display: ${notice}; font-size: 14px; padding-top: 5px">
                         ${this.notice}
                    </div>
                    <div class="wd-alert-btns">
                        <button class="wd-alert-btn wd-alert-submit">Submit</button>
                        <button class="wd-alert-btn wd-alert-cancel" style="display: ${hideCancel}">Cancel</button>
                    </div>
            `)
        return t
    }

    appendHtml() {
        const t = this.inputTemplate()
        this.insertHtml(t)
    }

    actionAlert() {
        this.bindAll('.wd-alert-btn', 'click', (event) => {
            this.wrapper.classList.toggle('alert-show')
            if (this.has(event, 'wd-alert-submit')) {
                const input = this.e('.wd-alert-input')
                let o = {}
                let data = [...input]
                data.forEach( (n) => {
                    o[n.name] = n.value
                })
                this.fire(true, o)
            } else if (this.has(event, 'wd-alert-cancel')) {
                this.fire(false)
            }
        })
    }
}


const test_Notice = () => {
    AlertNotice.create({
        wrapperClass: 'notice',
        title: 'Success',
        notice: 'you have logged in',
        overlayColor: '#D7EFEE',
        wrapperColor: '#fff',
    })
}

const test_Confirm = () => {
    AlertConfirm.create({
        wrapperClass: 'confirm',
        title: 'confirm',
        notice: 'do you want to delete?' ,
    }).on( (confirm) => {
        if (confirm){
            AlertNotice.create({
                wrapperClass: 'confirmed',
                title: 'you have deleted',
                notice: 'see you again' ,
            })
        } else {
            AlertNotice.create({
                wrapperClass: 'cancelled',
                notice: 'you have cancelled' ,
            })
        }
    })
}

const test_Input = () => {
    AlertInput.create({
        wrapperClass: 'input',
        title: 'Welcome Back' ,
        notice: 'username and password is required' ,
        input: [
            {
                name: 'username',
                placeholder: 'username',
            },
            {
                name: 'password',
                placeholder: 'password',
                type: 'password',
            },
            {
                name: 'email',
                placeholder: 'email',
                type: 'email',
            }
        ],
    }).on( (check) => {
        if (check){
            AlertConfirm.create({
                wrapperClass: 'test',
                notice: 'you have confirmed' ,
            }).on( (confirm) =>{
                if (confirm){
                    AlertNotice.create({
                        wrapperClass: 'confirm',
                        notice: 'you have confirmed' ,
                    })
                }
            })
        } else {
            AlertNotice.create({
                wrapperClass: 'test',
                notice: 'you have cancelled' ,
            })
        }
    })
}

const test_Input2 = (callback) => {
    AlertInput.create({
        wrapperClass: 'input',
        title: 'Welcome Back' ,
        notice: 'username and password is required' ,
        input: [
            {
                name: 'username',
                placeholder: 'username',
            },
            {
                name: 'password',
                placeholder: 'password',
                type: 'password',
            },
            {
                name: 'email',
                placeholder: 'email',
                type: 'email',
            }
        ],
    }).on(callback)
}

const test = () => {
    // test_Notice()
    // test_Confirm()
    // test_Input()
    test_Input2((check) => {
        if (check){
            AlertConfirm.create({
                wrapperClass: 'test',
                title: 'you you you have confirmed' ,
                notice: 'youyou have confirmed' ,
            }).on( (confirm) =>{
                if (confirm){
                    AlertNotice.create({
                        wrapperClass: 'confirm',
                        notice: 'you have confirmed' ,
                    })
                }
            })
        } else {
            AlertNotice.create({
                wrapperClass: 'test',
                notice: 'you have cancelled' ,
            })
        }
    })
}

test()


