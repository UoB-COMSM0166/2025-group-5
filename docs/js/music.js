class Music {
    constructor() {
        this.master = 1;

        this.bgMusic         = new Audio("resources/music/test.mp3");
        this.bgMusic.loop    = true;
        this.bgMusic.baseVol = 0.1;
        this.bgMusic.volume  = this.bgMusic.baseVol * this.master;

        this.sfx = {
            shoot: makeSfx("shoot.mp3"),
            hit:   makeSfx("hit.mp3"),
            start: makeSfx("Starting_Music.mp3"),
            level1: makeSfx("Forest.mp3"),
            level2: makeSfx("Graveyard.mp3"),
            level3: makeSfx("Lake.mp3"),
            level4: makeSfx("Lava.mp3")
        };
    }

    playBackground() {
        this.bgMusic.play();
    }

    stopBackground() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0; // 重置音乐进度
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
            this.sfx[name].currentTime = 0; // 重新播放
            this.sfx[name].play();
        }
    }

    setMasterVolume(v){
        this.master = constrain(v, 0, 1);
        this.bgMusic.volume = this.bgMusic.baseVol * this.master;
        Object.values(this.sfx).forEach(a => {
            a.volume = a.baseVol * this.master;
        });
    }
}

// 全局音乐对象
const gameMusic = new Music();

function makeSfx(file, base = 0.6) {
    const a = new Audio(`resources/music/${file}`);
    a.baseVol = base;
    a.volume  = base;
    return a;
}
