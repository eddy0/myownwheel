const cheerio = require('cheerio')
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
        this.rank = Number(movie.rank)
        this.title = String(movie.title)
        this.rate = Number(movie.rate)
        this.ratingBase = Number(movie.ratingBase)
        this.year = Number(movie.year)
        this.director = String(movie.director)
        this.actors = movie.actors
        this.link = String(movie.link)
        this.imgUrl = String(movie.imgUrl)
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
    let  m = {rank, rate, ratingBase, title, year, director, actors, link, imgUrl}
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
    let movie = []
    for (let i = 0; i < movieDiv.length; i++) {
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