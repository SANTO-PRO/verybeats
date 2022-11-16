class DrumKit {
	constructor() {
		// Buttons And Pads:
		this.pads = document.querySelectorAll('.pad');
		this.palyBtn = document.querySelector('.play-btn');
		this.palyBtnIcon = document.querySelector('.fa-play');
		this.stopBtnIcon = document.querySelector('.fa-stop');
		this.selects = document.querySelectorAll('select');
		this.muteBtns = document.querySelectorAll('.mute');
		this.resetBtn = document.querySelector('.clear');
		this.bpmSlider = document.querySelector('.beatPerMin-slider');

		// Sounds:
		this.kickAudio = document.querySelector('.kick-sound');
		this.hihatAudio = document.querySelector('.hihat-sound');
		this.snareAudio = document.querySelector('.snare-sound');
		this.openhihatAudio = document.querySelector('.hihat-open-sound');
		this.clapAudio = document.querySelector('.clap-sound');

		this.currentKick = './sounds/kicks/kick-heavy.wav';
		this.currentHihat = './sounds/hihats/hihat-808.wav';
		this.currentOpenhat = './sounds/openhats/openhat-analog.wav';
		this.currentSnare = './sounds/snares/snare-acoustic01.wav';
		this.currentClap = './sounds/claps/clap-crushed.wav';

		// Others:
		this.index = 0;
		this.bpm = 150;
		this.isPlaying = null;
	}

	activePad() {
		this.classList.toggle('active');
	}

	repeat() {
		let step = this.index % 14;
		const activePads = document.querySelectorAll(`.b${step}`);

		// if (step >= 7) {
		// 	this.changeToPart2();
		// } else {
		// 	this.changeToPart1();
		// }

		//==> Loop over the pads:
		activePads.forEach((pad) => {
			pad.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

			//=> Checking for play Audio:
			if (pad.classList.contains('active')) {
				if (pad.classList.contains('kick-pad')) {
					this.kickAudio.currentTime = 0;
					this.kickAudio.play();
				}

				if (pad.classList.contains('hihat-pad')) {
					this.hihatAudio.currentTime = 0;
					this.hihatAudio.play();
				}

				if (pad.classList.contains('snare-pad')) {
					this.snareAudio.currentTime = 0;
					this.snareAudio.play();
				}

				if (pad.classList.contains('hihat-open-pad')) {
					this.openhihatAudio.currentTime = 0;
					this.openhihatAudio.play();
				}

				if (pad.classList.contains('clap-pad')) {
					this.clapAudio.currentTime = 0;
					this.clapAudio.play();
				}
			}
		});
		this.index++;
	}

	start() {
		const interval = (60 / this.bpm) * 1000;

		if (!this.isPlaying) {
			this.isPlaying = setInterval(() => {
				this.repeat();
			}, interval);
		} else {
			clearInterval(this.isPlaying);
			this.isPlaying = null;
		}
	}

	updateBtn() {
		if (this.isPlaying) {
			this.palyBtnIcon.style.display = 'none';
			this.stopBtnIcon.style.display = 'block';

			this.palyBtn.classList.add('active');
		} else {
			this.palyBtn.classList.remove('active');

			this.palyBtnIcon.style.display = 'block';
			this.stopBtnIcon.style.display = 'none';

			this.index = 0;
		}
	}

	changeSound(event) {
		const trackName = event.target.name;
		const trackValue = event.target.value;

		switch (trackName) {
			case 'kick-select':
				this.kickAudio.src = trackValue;
				break;
			case 'snare-select':
				this.snareAudio.src = trackValue;
				break;
			case 'hihat-select':
				this.hihatAudio.src = trackValue;
				break;
			case 'hihat-open-select':
				this.openhihatAudio.src = trackValue;
				break;
			case 'clap-select':
				this.clapAudio.src = trackValue;
				break;
		}
	}

	muteSound(event) {
		const muteIndex = event.target.getAttribute('data-track');

		event.target.children[0].classList.toggle('active');
		event.target.children[1].classList.toggle('active');

		event.target.classList.toggle('active');

		if (event.target.classList.contains('active')) {
			switch (muteIndex) {
				case '0':
					this.kickAudio.volume = 0;
					break;
				case '1':
					this.hihatAudio.volume = 0;
					break;
				case '2':
					this.snareAudio.volume = 0;
					break;
				case '3':
					this.openhihatAudio.volume = 0;
					break;
				case '4':
					this.clapAudio.volume = 0;
					break;
			}
		} else {
			switch (muteIndex) {
				case '0':
					this.kickAudio.volume = 1;
					break;
				case '1':
					this.hihatAudio.volume = 1;
					break;
				case '2':
					this.snareAudio.volume = 1;
					break;
				case '3':
					this.openhihatAudio.volume = 1;
					break;
				case '4':
					this.clapAudio.volume = 1;
					break;
			}
		}
	}

	changeBpm(event) {
		this.bpm = event.target.value;

		clearInterval(this.isPlaying);
		this.isPlaying = null;

		if (this.palyBtn.classList.contains('active')) {
			this.start();
		}
	}

	changeBpmText(event) {
		const bpmText = document.querySelector('.beatPerMin-value');

		bpmText.innerText = event.target.value;
	}
}

const drumKit = new DrumKit();

// >>===> EventListeners:

drumKit.pads.forEach((pad) => {
	pad.addEventListener('click', drumKit.activePad);
	pad.addEventListener('animationend', function () {
		this.style.animation = '';
	});
});

drumKit.palyBtn.addEventListener('click', () => {
	drumKit.start();
	drumKit.updateBtn();
});

drumKit.selects.forEach((select) => {
	select.addEventListener('change', function (event) {
		drumKit.changeSound(event);
	});
});

drumKit.muteBtns.forEach((btn) => {
	btn.addEventListener('click', function (event) {
		drumKit.muteSound(event);
	});
});

drumKit.resetBtn.addEventListener('click', () => {
	drumKit.pads.forEach((pad) => {
		pad.classList.remove('active');
	});
});

drumKit.bpmSlider.addEventListener('input', function (event) {
	drumKit.changeBpmText(event);
});

drumKit.bpmSlider.addEventListener('change', function (event) {
	drumKit.changeBpm(event);
});
