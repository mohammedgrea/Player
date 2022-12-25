const audio = document.querySelector('audio')
const play = document.querySelector('.fa-play')
const next = document.querySelector('.fa-forward')
const prev = document.querySelector('.fa-backward')
const img =document.querySelector('img')
const title =document.querySelector('.song-title')
const artist =document.querySelector('.artist-name')
const totletime =document.querySelectorAll('span')
const progressContainer =document.querySelector('.progress-container')
const progress =document.querySelector('.progress')

let isPlaying = false
let currentIndex=0
const songs =["0.mp3",'1.mp3']
const imgs =["./imgs/One Piece 0.jpeg","./imgs/One Piece 1.jpeg"]

title.textContent=imgs[currentIndex].split('/').splice(-1)[0].split('.').slice(0,1)[0]
artist.textContent='luffy'
img.setAttribute('src',imgs[currentIndex])
audio.setAttribute('src',songs[currentIndex])

//Events 

play.addEventListener('click',()=> (!isPlaying ? paly() : pause())) 

audio.addEventListener('ended',nextSong) 

next.addEventListener('click',()=>{
    nextSong()
})

prev.addEventListener('click',()=>{
    prevSong()
})

audio.addEventListener('timeupdate',update)

progressContainer.addEventListener('click',setProgress)


//functions 



function pause(){
    play.classList.replace('fa-pause','fa-play')
    title.textContent=imgs[currentIndex].split('/').splice(-1)[0].split('.').slice(0,1)[0]
    audio.pause()
    isPlaying=false
}
function paly(){
    play.classList.replace('fa-play', 'fa-pause')
    title.textContent=imgs[currentIndex].split('/').splice(-1)[0].split('.').slice(0,1)[0]
    audio.play()
    isPlaying=true
}
//update progress bar & time

function update(e){
    if(isPlaying){
        console.log(e);
        const {duration,currentTime} = e.srcElement
        durationSeconds=(duration/60).toFixed(2)
        if(durationSeconds){
            totletime[1].textContent=durationSeconds
        }
        totletime[0].textContent=(currentTime/60).toFixed(2)
        progress.style.width=`${(currentTime/duration)*100}%`
        // if(currentTime===duration){
        //     console.log('next')
        //     setTimeout(palyNext,1000)
        // }
    }
}

function nextSong(e){
    console.log(e)
    if(currentIndex>=songs.length-1){
        currentIndex=0
        audio.setAttribute('src',songs[currentIndex])
        img.setAttribute('src',imgs[currentIndex])
        paly()
    }
    else{
        currentIndex++
        audio.setAttribute('src',songs[currentIndex])
        img.setAttribute('src',imgs[currentIndex])
        paly()
    }
}

function prevSong(){
    if(currentIndex<=0){
        currentIndex=songs.length-1
        audio.setAttribute('src',songs[currentIndex])
        img.setAttribute('src',imgs[currentIndex])
        paly()
    }
    else{
        currentIndex--
        audio.setAttribute('src',songs[currentIndex])
        img.setAttribute('src',imgs[currentIndex])
        paly()
    }
}

function palyNext(){
    if(currentIndex>=songs.length-1){
        currentIndex=0
        audio.setAttribute('src',songs[currentIndex])
        img.setAttribute('src',imgs[currentIndex])
        paly()
    }
    else{
        currentIndex++
        audio.setAttribute('src',songs[currentIndex])
        img.setAttribute('src',imgs[currentIndex])
        paly()
    }
}

function setProgress(e){
    const {duration} = audio
    let width=this.clientWidth
    let widthX = e.offsetX
    progress.style.width=`${widthX/width*duration}%`
    audio.currentTime=widthX/width*duration
}