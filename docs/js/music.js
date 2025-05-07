class Music {
    constructor() {
        this.master = 1;

        this.bgMusic         = new Audio("resources/music/test.mp3");
        this.bgMusic.loop    = true;
        this.bgMusic.baseVol = 0.1;
        this.bgMusic.volume  = this.bgMusic.baseVol * this.master;
        this.bgMusic.isPlaying = false;

    // —— 关卡专属 BGM —— 
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
            start: makeSfx("Starting_Music.mp3"),
            // level1: makeSfx("Forest.mp3"),
            // level2: makeSfx("Graveyard.mp3"),
            // level3: makeSfx("Lake.mp3"),
            // level4: makeSfx("Lava.mp3")
        };
    }

    // playBackground() {
    //     this.bgMusic.play();
    // }

    // async playBackground() {
    //     if (this.bgMusic.isPlaying) return;
    //     try {
    //         await this.bgMusic.play();
    //         this.bgMusic.isPlaying = true;
    //     } catch (err) {
    //     console.warn('背景音乐播放失败：', err);
    //     }
    // }

    // stopBackground() {
    //     this.bgMusic.pause();
    //     this.bgMusic.isPlaying = false;
    //     this.bgMusic.currentTime = 0; // 重置音乐进度
    // }

  // 播放／停止初始背景
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

  // 播放／停止指定关卡音乐（level: 1–4）
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
