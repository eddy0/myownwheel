
const formattedTime = (time) => {
    time = Number(time)
    const second = Math.floor(time)
    const minute = Math.floor( time / 60)
    let min = minute >=10 ? minute : `0${minute}`
    let sec = Math.floor(second % 60)
    sec = (sec >=10)? sec : `0${sec}`
    let t = `${min}:${sec}`
    return t
}

const toggleActive = (element, className, activeClass) => {
        removeClassAll(activeClass)
        element.classList.add(activeClass)
}

const __main = () => {
    const audio = document.querySelector('#id-player-audio')
    log('audio', audio)

    bindAll('wd-btn-icon', 'click', (event)=> {
        console.log('ok', event.target)
        const self = event.target

        if (self.classList.contains('fa-pause')){
            toggleActive(self, 'fa-pause', 'play-hide')
            audio.pause()
        }

        if (self.classList.contains('fa-play')){
            toggleActive(self, 'fa-play', 'play-hide')
            audio.play()
        }
    })

    audio.addEventListener('canplay', ()=> {
        let duration = audio.duration
        const proceed = e('.wd-music-procced')
        const currentTime = e('.currentTime')
        const dot = e('#id-play-dot')
        setInterval( () => {
            let current = audio.currentTime
            let t = formattedTime(current)
            currentTime.innerHTML =  t
            let ratio = current / duration * 100
            proceed.style.width = `${ratio}%`
            dot.style.left = `${ratio}%`
        }, 1000 )
        const totalTime = e('.totalTime')
        let total = formattedTime(duration)
        log('total', total, audio, audio.duration, duration)
        totalTime.innerHTML =  total
    })






}


__main()