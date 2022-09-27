"use strict"

const player = document.querySelector('.player'),
	playBtn = document.querySelector('.play'),
	prevBtn = document.querySelector('.prev'),
	nextBtn = document.querySelector('.next'),

	audio = document.querySelector('.audio'),
	progressContainer = document.querySelector('.player__progress-container'),
	progress = document.querySelector('.progress'),

	title = document.querySelector('.player__song'),
	cover = document.querySelector('.cover-img'),
	imgSrc = document.querySelector('.img__src'),

	volume = document.getElementById('volume-input');

	audio.volume = 0.1

//названия песен

const songs = [
	'Miyagi - Andy Panda-Atlant',
	'Miyagi - Andy Panda-Yamakasi',
	'Post Malone- Swae Lee-Sunflower',
	'Ollane feat. Miyagi - Andy Panda-Where Are You'
]

//изменение громкости

volume.addEventListener('change', () => {
	audio.volume = volume.value
})

//песня по умолчанию

let songIndex = 0

function loadSong(song) {
	title.innerHTML = song
	audio.src = `./assets/audio/${song}.mp3`
	cover.src = `./assets/img/cover${songIndex + 1}.svg`
}

loadSong(songs[songIndex])


//play

function playSong() {
	player.classList.add('play')
	cover.classList.add('active')
	imgSrc.src = './assets/img/stop-icon.png'
	audio.play()

}


//pause

function pauseSong() {
	imgSrc.src = './assets/img/play-icon.png'
	player.classList.remove('play')
	cover.classList.remove('active')
	audio.pause()

}

playBtn.addEventListener('click', () => {
	const isPlaying = player.classList.contains('play')
	if (isPlaying) {
		pauseSong()
	} else {
		playSong()
	}
})

//next song

function nextSong() {
	songIndex++

	if (songIndex > songs.length - 1) {
		songIndex = 0
	}
	loadSong(songs[songIndex])
	playSong()
}

nextBtn.addEventListener('click', () => {
	nextSong()
})

//prev song

function prevSong() {
	songIndex--
	if (songIndex < 0) {
		songIndex = songs.length - 1
	}
	loadSong(songs[songIndex])
	playSong()
}

prevBtn.addEventListener('click', () => {
	prevSong()
})


//progress bar

function updateProgress(e) {
	const { duration, currentTime } = e.srcElement
	const progressPercent = (currentTime / duration) * 100
	progress.style.width = progressPercent + '%'
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress(e) {
	const width = this.clientWidth
	const clickX = e.offsetX
	const duration = audio.duration

	audio.currentTime = (clickX / width) * duration

}

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)