

let data = {
    "store": {
        "book": [
          { "category": "reference",
            "author": "Nigel Rees",
            "title": "Sayings of the Century",
            "price": 8.95
          },
          { "category": "fiction",
            "author": "Evelyn Waugh",
            "title": "Sword of Honour",
            "price": 12.99
          }
        ],
        "bicycle": {
          "color": "red",
          "price": 19.95
        }
      }
}

const flatten = (data, path, price) => {
        let p = path[0]
        if (data[p] === undefined) {
           throw new Error(`wrong element of ${p} `)
        } else {
            if (path.length > 1) {
                path.shift()
                flatten(data[p], path, price)
            } else {
                data[p] = price
            }
        }
    return data
}

const test = (data, path) => {
    let price = path.pop()
    let d = flatten(data, path, price)
    console.log(JSON.stringify(d))
}

const main = () => {
    let path = ['store', 'book', 0, 'price', 3.99]
    test(data, path)
}

main()
