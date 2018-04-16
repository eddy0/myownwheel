const request = require('sync-request')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const log = console.log.bind(console)

const ensureDir = (dir) => {
    const exist = fs.existsSync(dir)
    if (!exist) {
        fs.mkdirSync(dir)
    }
}

const cacheUrl = (url) => {
    let name = url.split('/').slice(-1)[0] + '.html'
    let dir = 'download/'
    ensureDir(dir)
    const file = path.join(__dirname, './', dir, name )
    const exist = fs.existsSync(file)
    if (exist) {
        let body = fs.readFileSync(file)
        return body
    } else {
        const r = request('GET', url)
        let body = r.getBody('utf-8')
        fs.writeFileSync(file, body)
        return body
    }
}

const moviesFromUrl = (url) => {
    let body = cacheUrl(url)
}

if (require.main === module) {
    const url = 'http://www.imdb.com/chart/top'
    moviesFromUrl(url)
}