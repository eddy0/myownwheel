/*
store function
事件监听函数 和 注册函数
 */
class Widget{
    constructor() {
        //{ type: [handler event1, handler event2, ]}
        this.actions = {}
    }
    
    // bind event listener
    on(type, action) {
        if(typeof this.actions[type] === 'undefined' || this.actions[type] === null) {
            this.actions[type] = []
        }
        this.actions[type].push(action)
        return this
    }
    
    // trigger function, eventType, action
    fire(...args) {
       const [type, ...rest] = args
       const actions = this.actions[type]
       if (Array.isArray(actions)){
           actions.forEach( (action) => {
               action.apply(this, rest)
           })
       } 
       return this
    }
    
    // to unbind the type
    off(type) {
        if (type !== undefined){
                this.actions[type] = null
        } else{
            this.actions = {}
        }
        return this
    }
    
    // to make a singleton
    static single() {
        const cls = this
        if (cls.instance === undefined){
            cls.instance = new cls()
        }
        return cls.instance
    }
    
}
