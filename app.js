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
		this.trackIcons = document.querySelectorAll('.icons');
		this.part1ToggleBtn = document.querySelector('.part-1-toggle');
		this.part2ToggleBtn = document.querySelector('.part-2-toggle');
		this.padsPart1 = document.querySelectorAll('.pad-part-1');
		this.padsPart2 = document.querySelectorAll('.pad-part-2');

		// Sounds:
		this.kickAudio = document.querySelector('.kick-sound');
		this.hihatAudio = document.querySelector('.hihat-sound');
		this.snareAudio = document.querySelector('.snare-sound');
		this.openhihatAudio = document.querySelector('.hihat-open-sound');
		this.clapAudio = document.querySelector('.clap-sound');
		this.percAudio = document.querySelector('.perc-sound');

		// this.currentKick = './sounds/kicks/kick-heavy.wav';
		// this.currentHihat = './sounds/hihats/hihat-808.wav';
		// this.currentOpenhat = './sounds/openhats/openhat-analog.wav';
		// this.currentSnare = './sounds/snares/snare-acoustic01.wav';
		// this.currentClap = './sounds/claps/clap-crushed.wav';

		// Others:
		this.index = 0;
		this.bpm = 150;
		this.isPlaying = null;
	}

	activePad() {
		this.classList.toggle('active');
	}

	repeat() {
		let step = this.index % 16;
		const activePads = document.querySelectorAll(`.b${step}`);

		if (step >= 8) {
			this.changeToPart2();
		} else {
			this.changeToPart1();
		}

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

				if (pad.classList.contains('perc-pad')) {
					this.percAudio.currentTime = 0;
					this.percAudio.play();
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
			case 'perc-select':
				this.percAudio.src = trackValue;
				break;
		}
	}

	playDefaltSound(event) {
		const trackIcon = event.target.classList[1];

		switch (trackIcon) {
			case 'kick-icon':
				this.kickAudio.currentTime = 0;
				this.kickAudio.play();
				break;
			case 'hihat-icon':
				this.hihatAudio.currentTime = 0;
				this.hihatAudio.play();
				break;
			case 'snare-icon':
				this.snareAudio.currentTime = 0;
				this.snareAudio.play();
				break;
			case 'hihat-open-icon':
				this.openhihatAudio.currentTime = 0;
				this.openhihatAudio.play();
				break;
			case 'clap-icon':
				this.clapAudio.currentTime = 0;
				this.clapAudio.play();
				break;
			case 'perc-icon':
				this.percAudio.currentTime = 0;
				this.percAudio.play();
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
				case '5':
					this.percAudio.volume = 0;
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
				case '5':
					this.percAudio.volume = 1;
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

	// Parts Shifting for Phone:
	changeToPart1() {
		drumKit.part2ToggleBtn.classList.remove('active');
		drumKit.part1ToggleBtn.classList.add('active');

		drumKit.padsPart1.forEach((div) => {
			div.classList.add('activee');
		});

		drumKit.padsPart2.forEach((div) => {
			div.classList.remove('activee');
		});
	}

	changeToPart2() {
		drumKit.part1ToggleBtn.classList.remove('active');
		drumKit.part2ToggleBtn.classList.add('active');

		drumKit.padsPart2.forEach((div) => {
			div.classList.add('activee');
		});

		drumKit.padsPart1.forEach((div) => {
			div.classList.remove('activee');
		});
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

drumKit.trackIcons.forEach((div) => {
	div.addEventListener('click', function (event) {
		drumKit.playDefaltSound(event);
	});
});

drumKit.part1ToggleBtn.addEventListener('click', () => {
	drumKit.changeToPart1();
});

drumKit.part2ToggleBtn.addEventListener('click', () => {
	drumKit.changeToPart2();
});
