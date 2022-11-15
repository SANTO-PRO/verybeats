class DrumKit {
	constructor() {
		this.pads = document.querySelectorAll('.pad');
		this.palyBtn = document.querySelector('.play-btn');
		this.palyBtnIcon = document.querySelector('.fa-play');
		this.stopBtnIcon = document.querySelector('.fa-stop');
		this.kickAudio = document.querySelector('.kick-sound');
		this.hihatAudio = document.querySelector('.hihat-sound');
		this.snareAudio = document.querySelector('.snare-sound');
		this.openhihatAudio = document.querySelector('.hihat-open-sound');
		this.clapAudio = document.querySelector('.clap-sound');

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
					this.hihatAudio.currentTime = 0;
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
		}
	}
}

const drumKit = new DrumKit();

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
