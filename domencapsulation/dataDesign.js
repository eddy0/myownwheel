const data = [
    {
        id: 1,
        name: '中国',
        pid: null,
    },
    {
        id: 2,
        name: '湖南',
        pid: 1,
    },
    {
        id: 3,
        name: '上海',
        pid: 1,
    },
    {
        id: 4,
        name: '广东',
        pid: 1,
    },
    {
        id: 5,
        name: '广州',
        pid: 4,
    },
    {
        id: 6,
        name: '长沙',
        pid: 2,
    },
    {
        id: 7,
        name: '怀化',
        pid: 2,
    },
    {
        id: 8,
        name: '县城',
        pid: 7,
    },
    {
        id: 9,
        name: '乡村',
        pid: 8,
    },
]


const log = console.log.bind(console)

const formattedNode = (node) => {
    return {
        id: node.id,
        name: node.name,
        children: node.children || [],
    }
}

const nodeByPid = (data, pid=null) => {
    let nodes = []
    for (let i = 0; i < data.length; i++ ) {
        let n = data[i]
        if ( n.pid=== pid) {
            let node = formattedNode(n)
            nodes.push(node)
        }
    }
    return nodes
}

const tree = (data, pid=null) => {
    // 根据 pid 先生成 header, 子节点可能有多个, 所以要用 array
    let header = nodeByPid(data, pid)
    for (let x = 0; x < header.length; x++ ) {
        let parent = header[x]
        // 每一个 header 根据 header 的 id 和 pid 生成 children
        for (let i = 0; i < data.length; i++ ) {
            let node = data[i]
            if (node.pid === parent.id) {
                // 格式化 node
                node = formattedNode(node)
                node.children = tree(data, node.id)
                header[x].children.push(node)
            }
        }
    }
    return header
}

const __test = () => {
    let header = tree(data)
    log(JSON.stringify(header, 2))
}

// __test()


let obj1 = {
    a: 1,
    b: {
        b1: 21
    },
    c: [2],
}

let obj2 = {
    a: 2,
    b: {
        b2: 22
    },
    c: [3],

}

const isObject = (item) => {
    return Object.prototype.toString.call(item) === '[object Object]'
}

const mergeObj = (obj1, obj2) => {
    let o = {...obj1, ...obj2}
    let keys = Object.keys(obj1)
    keys.forEach((k) => {
        if (obj2[k] !== undefined ) {
            let key = obj2[k]
            if (isObject(key)) {
                o[k] = {...obj1[k], ...obj2[k]}
            } else if (Array.isArray(key)) {
                o[k] = [].concat(obj1[k], obj2[k])
            }
        }
    })
    return o
}



let polls = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        question: "Who is the best basketball player to ever live?",
        author: 'sarah_edo',
        timestamp: 1467166872634,
        a: {
            text: 'Michael Jordan',
            votes: ['sarah_edo'],
        },
        b: {
            text: 'Jimmer Fredette',
            votes: [],
        },
        c: {
            text: 'Lebron James',
            votes: [],
        },
        d: {
            text: 'Kobe Bryant',
            votes: [],
        }
    },
}


function flattenPoll (poll) {
    return Object.keys(poll)
        .reduce((flattenedPoll, key) => {
            const val = poll[key]

            if (isObject(val)) {
                flattenedPoll[key + 'Text'] = val.text
                flattenedPoll[key + 'Votes'] = val.votes
                return flattenedPoll
            }

            flattenedPoll[key] = val
            return flattenedPoll
        }, {})
}

function formatUsers (users) {
    return Object.keys(users)
        .reduce((formattedUsers, id) => {
            const user = users[id]

            formattedUsers[id] = {
                ...user,
                answers: Object.keys(user.answers)
            }

            return formattedUsers
        }, {})
}

var arr = [
    [1, 2, 2],
    [3, 4, 5, 5],
    [6, 7, 8, 9,
        [11, 12,
            [12, 13,
                [14]
            ]
        ],
    ],
    10
]

var flatten = function(list) {
    var l = []
    for (var i = 0; i < list.length; i++) {
        var e = list[i]
        // 如果 e 是一个数组，递归调用 flatten 函数
        if (Array.isArray(e)) {
            var result = flatten(e)
            // 得到拍平的结果之后拼接在 l 后面, 当然也可以用循环一个一个 push 进去
            l = l.concat(result)
        } else {
            // 如果 e 不是数组, 直接 push 到 l 中
            l.push(e)
        }
    }

    return l
}
