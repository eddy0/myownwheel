const request = require('sync-request')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const ensureExist = (dir) => {
    let exist = fs.existsSync(dir)
    if (!exist) {
        fs.mkdirSync(path.join(__dirname, dir))
    }
}

const save = (html, url) => {
    let filename = url.split('/').slice(-1)[0]
    let dir = './download'
    ensureExist('./download')
    let p = path.join(__dirname, dir, `${filename}.html`)
    let options = {
        encoding: 'utf8',
    }
    fs.writeFileSync(p, html, options)
}

const moviesFromUrl = (url) => {
    const r = request('GET', url)
    const body = r.getBody('utf-8')
    save(body, url)
}


if (require.main === module) {
    const url = 'http://www.imdb.com/chart/top'
    let movies = moviesFromUrl(url)
}