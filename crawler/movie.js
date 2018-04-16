const cheerio = require('cheerio')
const request = require('sync-request')
const fs = require('fs')

const loadFile = () => {
    const options = {
        encoding: 'utf8'
    }
    const data = fs.readFileSync('./download/top.html', options)
    return data
}

class Movie {
    constructor(movie){
        this.rank = Number(movie.rank) || -1
        this.title = String(movie.title) || ''
        this.rate = Number(movie.rate) || 0
        this.ratingBase = Number(movie.ratingBase) || 0
        this.year = Number(movie.year) || 0
        this.director = String(movie.director) || ''
        this.actors = movie.actors || []
        this.link = String(movie.link) || ''
        this.imgUrl = String(movie.imgUrl) || ''
        this.video = String(movie.video) || ''
    }
}

const getVideoSrc = (url) => {
    const r = request('GET', url, {
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36',
            'Host': 'm.imdb.com',

        },
    })
    const body = r.getBody('utf-8')
    let link = body.split('videoUrl":"')[1]
    link = link.split('"}')[0]
    return link
}

const trailerFromLink = (url) => {
    const r = request('GET', url)
    const body = r.getBody('utf-8')
    const e = cheerio.load(body)
    const video = e('.video-modal').attr('data-video')
    // http://www.imdb.com/title/tt0111161/videoplayer/vi3877612057?ref_=tt_ov_vi
    // https://m.imdb.com/videoplayer/vi3877612057
    // const link = `${url}videoplayer/${video}`
    if (video){
        const link = `https://m.imdb.com/videoplayer/${video}`
        let src = getVideoSrc(link)
        // console.log('trailerSrc', src)
        return src
    } else {
        console.log('no video')
        return null
    }
}

const movieFromDiv = (div) => {
    const e = cheerio.load(div)
    let rank = e('.posterColumn').find('span[name="rk"]').attr('data-value')
    let rate = e('.posterColumn').find('span[name="ir"]').attr('data-value')
    rate = Number(rate).toFixed(2)
    let ratingBase = e('.posterColumn').find('span[name="nv"]').attr('data-value')
    let imgUrl = e('.posterColumn').find('a').find('img').attr('src')
    let title = e('.titleColumn').find('a').text()
    let link = e('.titleColumn').find('a').attr('href')
    link = 'http://www.imdb.com' + link.split('?')[0]
    let actorInfo = e('.titleColumn').find('a').attr('title')
    let [director, actors] = actorInfo.split(' (dir.), ')
    actors = actors.split(', ')
    let year = e('.titleColumn').find('span.secondaryInfo').text().slice(1, -1)
    let video = trailerFromLink(link)
    let  m = {rank, rate, ratingBase, title, year, director, actors, link, imgUrl, video}
    let movie = new Movie(m)
    return movie
}

const saveFile = (movie) => {
    let data = JSON.stringify(movie, null, 2)
    fs.writeFileSync('./download/result.json', data)
}

const movieFromFile = () => {
    const body = loadFile()
    const e = cheerio.load(body)
    const movieDiv = e('.lister-list').children()
    // let m = movieFromDiv(movieDiv[0])
    // console.log('m', m)
    let movie = []
    for (let i = 0; i < movieDiv.length; i++) {
        console.log(`**********${i}**********`)
        let div = movieDiv[i]
        let m = movieFromDiv(div)
        movie.push(m)
    }
    saveFile(movie)
}

const __main = () => {
    movieFromFile()

}

__main()