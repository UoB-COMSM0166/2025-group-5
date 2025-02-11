class Music {
    constructor() {
        this.bgMusic = new Audio("resources/music/test.mp3");
        this.bgMusic.loop = true; // 让背景音乐循环播放
        this.bgMusic.volume = 0.2; // 设置音量（0.0 - 1.0）

        this.sfx = {
            shoot: new Audio("resources/music/shoot.mp3"),
            hit: new Audio("resources/music/hit.mp3"),
            click: new Audio("resources/music/click.mp3")
        };
    }

    playBackground() {
        this.bgMusic.play();
    }

    stopBackground() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0; // 重置音乐进度
    }

    playSFX(name) {
        if (this.sfx[name]) {
            this.sfx[name].currentTime = 0; // 重新播放
            this.sfx[name].play();
        }
    }
}

// 全局音乐对象
const gameMusic = new Music();
