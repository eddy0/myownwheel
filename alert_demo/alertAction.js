class Alert {
    constructor(){
        this.init()
        this.container = this.e('.wd-alert-container')
    }

    then(callback){
        callback()
        return this
    }

    e(sel) {
        return document.querySelector(sel)
    }

    es(sel){
        return document.querySelectorAll(sel)
    }

    bindAll(selector, eventName, callback){
        const element = this.es(selector)
        for (let i = 0; i < element.length; i++ ) {
            let tag = element[i]
            tag.addEventListener(eventName, (event) => {
                callback(event)
            })
        }
    }

    has(event) {
        let self = event.target
        return self.classList.contains.bind(self.classList)
    }

    init() {
        this.initframe()
        this.initCss()
    }

    cssTemplate() {
        const t = `
          <style id="id-style-alert" >
            .wd-alert-container, .wd-alert-container * {
                margin: 0;
                padding: 0;
                font: inherit;
                color: inherit;
                box-sizing: border-box;
            }
            .wd-alert-container{
                font-size: 14px;
                font-family: Helvetica,Arial,sans-serif;
            }
            .wd-alert-container a{
                text-decoration: none;
            }
            .wd-alert-container img{
                vertical-align: top;
            }
            .wd-alert-container.alert-show div{
                display: block;
                opacity: 1
            }

            .wd-alert-overlay{
                display: none;
                opacity: 0;
                background-color: rgba(0,0,0, 0.4);
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                position: absolute;
                z-index: 998;
            }
            .wd-alert-box{
                display: none;
                width: 300px;
                background-color: #fff;
                position: fixed;
                left: 50%;
                top: 50%;
                padding: 20px;
                border-radius: 5px;
                text-align: center;
                transform: translate(-50%, -50%);
                -webkit-transform: translate(-50%, -50%);
                animation: wdAlertShow 0.3s;
                z-index: 999;
            }
            @keyframes wdAlertShow {
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
            .wd-alert-box > .wd-alert-title{
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
            .wd-alert-box  .wd-alert-content {
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

            .wd-alert-box  .wd-alert-input{
                width: 100%;
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

            .wd-alert-box .wd-alert-btns{
                margin: 30px auto 0;
            }
            .wd-alert-box .wd-alert-btn{
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

            .wd-alert-btn:hover{
                background-color: #888;
            }

             .wd-alert-box .wd-alert-btn:focus{
                outline: 0;
                border: 0;
            }

            .wd-alert-btn.wd-alert-submit, .wd-alert-btn.wd-alert-notice {
                 background-color: rgb(48, 133, 214);
            }
            .wd-alert-btn.wd-alert-submit, .wd-alert-btn.wd-alert-notice:hover{
                background-color: rgb(43, 120, 193);
            }

             .wd-alert-btn.wd-alert-confirm {
                 background-color: rgb(92,184,92);
            }
            .wd-alert-btn.wd-alert-confirm:hover{
                background-color: rgb(68,157,68);
            }

           .wd-alert-btn.wd-alert-cancel{
                background-color: #999;
            }
            .wd-alert-btn.wd-alert-cancel:hover{
                background-color: #888;
            }

             .wd-alert-btn.wd-alert-reject{
                background-color: #d9534f;
            }
             .wd-alert-btn.wd-alert-reject:hover{
                 background-color: #c9302c;
             }
        </style>
        `
        return t
    }

    initframe(){
        const container = this.e('.wd-alert-container')
        if (container !== null){
            container.remove()
        }
        let t = `
            <div class="wd-alert-container alert-show">
                <div class="wd-alert-overlay"></div>
                <div class="wd-alert-box"></div>
            </div>
            `
        document.body.insertAdjacentHTML('beforeend', t)
    }

    initCss(){
        const css = this.e('#id-style-alert')
        if (css === null){
            const t = this.cssTemplate()
            document.head.insertAdjacentHTML('beforeend', t)
        }
    }

    insertHtml(t){
        let box = this.e('.wd-alert-box')
        box.innerHTML = ''
        this.container.insertAdjacentHTML('beforeend', t)
    }
}

class AlertNotice extends Alert {
    constructor(args) {
        super()
        this.title = args.title || ''
        this.notice = args.notice || ''
        this.appendHtml()
        this.actionAlert()
    }

    noticeTemplate() {
        const t = `
                <div class="wd-alert-box">
                    <div class="wd-alert-title">
                        ${this.title.toUpperCase()}
                    </div>
                    <div class="wd-alert-content">
                         ${this.notice}
                    </div>
                    <div class="wd-alert-btns">
                    <button class="wd-alert-btn wd-alert-notice">OK</button>
                     </div>
                </div>
            `
            return t
        }

    appendHtml() {
        const t = this.noticeTemplate()
        this.insertHtml(t)
    }

    actionAlert(){
        this.container.addEventListener('click', () => {
            this.container.classList.toggle('alert-show')
        })
    }
}


class AlertConfirm extends Alert {
    constructor(args) {
        super()
        this.title = args.title || ''
        this.notice = args.notice || ''
        this.callback = args.callback || new Function()
        this.appendHtml()
        this.actionAlert()
    }

    confirmTemplate() {
        const t = `
                <div class="wd-alert-box">
                    <div class="wd-alert-title">
                        ${this.title.toUpperCase()}
                    </div>
                    <div class="wd-alert-content">
                         ${this.notice}
                    </div>
                    <div class="wd-alert-btns">
                    <button class="wd-alert-btn wd-alert-confirm">OK</button>
                    <button class="wd-alert-btn wd-alert-reject">NO</button>
                    </div>
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
            this.container.classList.toggle('alert-show')
            if (this.has(event, 'wd-alert-confirm')){
                this.callback(true)
            } else if (this.has(event,'wd-alert-reject')) {
                this.callback(false)
            }
        })
    }
}

class AlertPrompt extends Alert {
    constructor(args) {
        super()
        this.title = args.title || ''
        this.placeholder = args.placeholder || ''
        this.callback = args.callback || new Function()
        this.appendHtml()
        this.actionAlert()
    }

    PromptTemplate() {
        const t = `
                <div class="wd-alert-box">
                    <div class="wd-alert-title">
                        ${this.title.toUpperCase()}
                    </div>
                    <div class="wd-alert-inputWrapper">
                    <input class="wd-alert-input" placeholder="${this.placeholder}">
                    </div>
                    <div class="wd-alert-btns">
                    <button class="wd-alert-btn wd-alert-submit">Submit</button>
                    <button class="wd-alert-btn wd-alert-cancel">Cancel</button>
                    </div>
                </div>
            `
        return t
    }

    appendHtml() {
        const t = this.PromptTemplate()
        this.insertHtml(t)
    }

    actionAlert() {
        this.bindAll('.wd-alert-btn', 'click', (event) => {
            this.container.classList.toggle('alert-show')
            if(this.has(event, 'wd-alert-submit')) {
                const input = this.e('.wd-alert-input')
                const val = input.value
                this.callback(true, val)
            } else if(this.has('wd-alert-cancel')) {
                this.callback(false)
            }
        })
    }
}

const alertNotice = () => {
    let a = new AlertNotice({
        title: 'notice',
        notice: 'this is a notice'
    })

}

const alertConfirm = () => {
    let b = new AlertConfirm({
        title: 'confirm',
        notice: 'you are sure to delete this?',
        callback: (confirmed) => {
            if (confirmed){
                let a = new AlertNotice({
                    title: 'notice',
                    notice: 'this is a notice'
                })
            } else{
                console.log('cancelled')
                let a = new AlertNotice({
                    title: 'cancelled',
                    notice: 'you have cancelled'
                })
            }},
    })
}

const alertPrompt = () => {
    let confirmFunction = (confirm, value) => {
        if (confirm){
            new AlertConfirm({
                    title: 'confirm?',
                    notice: `you have typed ${value}`,
                    callback: (confirmed) => {
                        if (confirmed){
                            let a = new AlertNotice({
                                title: 'notice',
                                notice: `you have submitted `
                            })
                        } else{
                            console.log('cancelled')
                            let a = new AlertNotice({
                                title: 'cancelled',
                                notice: 'you have cancelled'
                            })
                        }},
                })
        }
    }
    let a = new AlertPrompt({
        title: 'Please input',
        placeholder: 'input something',
        callback: confirmFunction ,
    })

}

// alertNotice()
alertConfirm()
// alertPrompt()
