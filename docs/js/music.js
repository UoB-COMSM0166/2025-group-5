class Music {
    constructor() {
        this.master = 1;

        this.bgMusic         = new Audio("resources/music/test.mp3");
        this.bgMusic.loop    = true;
        this.bgMusic.baseVol = 0.1;
        this.bgMusic.volume  = this.bgMusic.baseVol * this.master;
        this.bgMusic.isPlaying = false;

    //Level-specific BGM
        this.levels = {};
        for (let i = 1; i <= 4; i++) {
            const a = new Audio(`resources/music/level${i}.mp3`);
            a.loop    = true;
            a.baseVol = 0.2;
            a.volume  = a.baseVol;
            a.isPlaying = false;
            this.levels[i] = a;
        }


        this.sfx = {
            shoot: makeSfx("shoot.mp3"),
            hit:   makeSfx("hit.mp3"),
            start: makeSfx("Starting_Music.mp3")
        };
    }


  // Play/stop the initial background music
  playBackground() {
    if (this.bgMusic.isPlaying) return;
    this.bgMusic.currentTime = 0;
    this.bgMusic.play();
    this.bgMusic.isPlaying = true;
  }
  stopBackground() {
    if (!this.bgMusic.isPlaying) return;
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
    this.bgMusic.isPlaying = false;
  }

  //Play/stop the music for the specified level (level: 1–4)
  playLevel(level) {
    const track = this.levels[level];
    if (!track || track.isPlaying) return;
    track.currentTime = 0;
    track.play();
    track.isPlaying = true;
  }
  stopLevel(level) {
    const track = this.levels[level];
    if (!track || !track.isPlaying) return;
    track.pause();
    track.currentTime = 0;
    track.isPlaying = false;
  }

    playMusic(name) {
        this.sfx[name].play();
    }

    stopMusic(name) {
        this.sfx[name].pause();
        this.sfx[name].currentTime = 0;
    }

    playSFX(name) {
        if (this.sfx[name]) {
            this.sfx[name].currentTime = 0; //Replay
            this.sfx[name].play();
        }
    }

    setMasterVolume(v){
        this.master = constrain(v, 0, 1);
        this.bgMusic.volume = this.bgMusic.baseVol * this.master;

  //New: Adjust level-specific BGM accordingly
  for (const lvl in this.levels) {
    const track = this.levels[lvl];
    track.volume = track.baseVol * this.master;
  }

        Object.values(this.sfx).forEach(a => {
            a.volume = a.baseVol * this.master;
        });
    }
}

// Global music object
const gameMusic = new Music();

function makeSfx(file, base = 0.6) {
    const a = new Audio(`resources/music/${file}`);
    a.baseVol = base;
    a.volume  = base;
    return a;
}
