class Signup {
    constructor() {
        // 支持邮箱（目前只支持 QQ 邮箱）
        this.support_email = 'qq.com',
            // 数字规则
            this.number_rule = '1234567890',
            // 数字账户长度范围
            this.number_min = 3,
            this.number_max = 11,
            // 英文规则
            this.up_rule = 'qwertyuioplkjhgfdsazxcvbnm',
            this.lower_rule = 'MNBVCXZLKJHGFDSAQWERTYUIOP',
            // 英文账户长度范围
            this.str_min = 3,
            this.str_max = 20,
            // 账户名长度范围
            this.name_min = 0,
            this.name_max = 9,
            // 密码长度范围
            this.password_min = 4,
            this.password_max = 18,
            // 错误提示颜色
            this.wrong_color = '',
            // 错误提醒信息
            this.wrong_mes = {
                userEmail: '请输入正确格式的 QQ 邮箱',
                userName: '请输入长度范围在 9 之内的昵称',
                userPassword: '请输入长度范围在 5 至 18之内的密码'
            },
            // 是否可以发送请求
            this.post = false
    }

    // 字符类型检查
    static type_required(str) {
        var result = 'number'
        const bug = this.name
        console.log('bug', bug);  //  Register
        const rule = this.number_rule  // undfined
        for (var i = 0; i < str.length; i++) {
            var ele = str[i]
            if (!rule.includes(ele)) {
                result = 'string'
                break
            }
        }
        return result
    }

    // 英文账户检查
    static string_account(account) {
        const Sign = this
        const len = account.length
        const a = (3 < len) && (len < 20)
        if (a === true) {
            var b = true
            for (var i = 0; i < account.length; i++) {
                var ele = account[i]
                if (!Sign.up_rule.includes(ele)) {
                    b = false
                    break
                }
            }
        }
        const result = a && b
        return result
    }

    // 数字账户检查
    static number_account(account) {
        const Sign = this
        const len = account.length
        const a = (Sign.number_min < len) && (len < Sign.number_max)
        const result = a
        return result
    }

    // 注册邮箱验证
    static email_required(str) {
        const Sign = this
        // console.log('str', str);
        const [ account, email ] = str.split('@')
        // console.log('account', account);
        // console.log('email', email);
        // console.log('bug', Sign.wrong_color);
        const type = Sign.type_required(account)
        let account_result
        if (type === 'string') {
            account_result = Sign.string_account(account)
        } else {
            account_result = Sign.number_account(account)
        }
        const email_result = (email === Sign.support_email)
        const result = account_result && email_result
        return result
    }

    // 账户名验证
    static name_required(str) {
        const Sign = this
        const len = str.length
        const result = (Sign.name_min < len) && (len < Sign.name_max)
        return result
    }

    // 密码验证
    static password_required(str) {
        const Sign = this
        const len = str.length
        const a = (Sign.password_min < len) && (len < Sign.password_max)
        if (a === true) {
            const rule = Sign.number_rule + Sign.up_rule + Sign.lower_rule
            var b = true
            for (var i = 0; i < str.length; i++) {
                var ele = str[i]
                if (!rule.includes(ele)) {
                    b = false
                }
            }
        }
        const result = a && b
        return result
    }

    // 用户资料检查结果
    static form_required(form) {
        const Sign = this
        const result = {
            result: true,
            form: {},
        }
        const checked_form = Sign.form_check(form)
        // console.log('checked_form', checked_form);
        const checks = Object.keys(checked_form)
        for (var i = 0; i < checks.length; i++) {
            var ele = checks[i]
            var ele_result = checked_form[ele]
            if (ele_result === false) {
                result.result = false
                var mes = Sign.wrong_mes[ele]
                result.form[ele] = mes
            }
        }
        return result
    }

    // 错误函数
    static wrong_actives(eleName, mes) {
        const ele = $(`#input-${eleName}`)[0]
        ele.placeholder = mes
        ele.style = 'color: #f1403c;'
        ele.dataset.state = 'wrong'
    }

    // 错误提醒
    static active_wrong(form) {
        const Sign = this
        const wrongs = Object.keys(form)
        // 错误提醒函数集合
        for (var i = 0; i < wrongs.length; i++) {
            var key = wrongs[i]
            var mes = form[key]
            Sign.wrong_actives(key, mes)
        }
    }

    // 在表单中加上 token 字段
    static fill_token(form) {
        const token = $('body').data('csrf')
        form.token = token
        return form
    }

    // 输入检查是否为空
    static input_required(ele) {
        const Sign = this
        // console.log('Sign', Sign);
        const value = ele.value
        const name = ele.placeholder
        if (value === '') {
            ele.placeholder = `请输入${name}`
            ele.dataset.state = 'wrong'
            Sign.post = false
        } else {
            Sign.post = true
        }
    }

    // 清空输入框
    static input_clean(ele) {
        const state = ele.dataset.state
        if (state === 'wrong') {
            ele.value = ''
            ele.style = 'color: black;'
            ele.dataset.state = 'right'
        }
    }

    // 绑定输入事件
    static active_input() {
        const Sign = this
        $('.Input').blur(function(){
            const ele = event.target
            Sign.input_required(ele)
        })

        $('.Input').focus(function(){
            const ele = event.target
            Sign.input_clean(ele)
        })
    }
}

console.log('sign', Signup.number_rule);  // sign undefined

// 子类
class Register extends Signup {
    constructor() {
        super()
    }

    // 是否输入了全部信息
    static null_check(form) {
        var result = true
        const list = Object.keys(form)
        for (var i = 0; i < list.length; i++) {
            var ele = list[i]
            if (form[ele] === '') {
                result = false
                break
            }
        }
        return result
    }

    // 用户资料检查
    static form_check(form) {
        // const Sign = this
        // console.log('form', form);
        const { email, name, password } = form
        // console.log('email', email);
        const a = this.email_required(email)
        const b = this.name_required(name)
        const c = this.password_required(password)
        const result = {
            userEmail: a,
            userName: b,
            userPassword: c,
        }
        return result
    }

    // 用户输入信息
    static user_form() {
        const email = $('#input-userEmail').val()
        const name = $('#input-userName').val()
        const password = $('#input-userPassword').val()
        const o = {
            email: email,
            name: name,
            password: password,
        }
        return o
    }

    // 发送数据
    static post_form(form) {
        const data = this.fill_token(form)
        const path = '/api/index/register'
        ajax(path, 'post', data, function(){
            console.log('ok');
        })
    }

    // 注册
    static register_required() {
        const Sign = this
        // 获得用户输入
        const form = Sign.user_form()
        // console.log('form', form);
        const null_required = Sign.null_check(form)
        if (null_required) {
            // 检验是否规范
            const check_data = Sign.form_required(form)
            console.log('check_data', check_data);
            // 检验结果
            const check_result = check_data.result
            if (check_result === true) {
                // 如果通过，发送数据
                Sign.post_form(form)
            } else {
                // 没通过，提示错误信息
                const check_form = check_data.form
                Sign.active_wrong(check_form)
            }
        }
    }

    // 点击注册
    static active_register() {
        const Sign = this
        $('#button-register').click(function(){
            if (Sign.post === true) {
                Sign.register_required()
            }
        })
    }

    static __main() {
        // const Sign = this.name
        // Sign.active_input()
        // Sign.active_register()
        this.active_input()
        this.active_register()
        console.log('bug', this.number_rule); // undefined
    }
}

// 调用入口
const __main = () => {
    // const register = new Register()
    // console.log(register.support_email)
    // register.__main()
    Register.__main()
    Register.bug()
}

__main()