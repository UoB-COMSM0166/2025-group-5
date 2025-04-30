// Animation.js

class Animation {
  /**
   * @param {p5.Image[]} frames    - 已载入的图片帧数组
   * @param {number} frameInterval - 每帧显示时长，毫秒
   * @param {boolean} loop         - 是否循环播放
   */
  constructor(frames, frameInterval = 100, loop = true) {
    this.frames = frames;
    this.interval = frameInterval;
    this.loop = loop;

    this.currentIndex = 0;
    this.lastSwitch = millis();
    this.finished = false;
  }

  /** 调用一次以更新当前帧 */
  update() {
    if (this.finished) return;

    let now = millis();
    if (now - this.lastSwitch >= this.interval) {
      this.lastSwitch = now;
      this.currentIndex++;
      if (this.currentIndex >= this.frames.length) {
        if (this.loop) {
          this.currentIndex = 0;
        } else {
          this.currentIndex = this.frames.length - 1;
          this.finished = true;
        }
      }
    }
  }

  /**
   * 绘制当前帧
   * @param {number} x  - 画布上的 x 坐标
   * @param {number} y  - 画布上的 y 坐标
   * @param {number} w  - 绘制宽度
   * @param {number} h  - 绘制高度
   */
  draw(x, y, w, h) {
    image(this.frames[this.currentIndex], x, y, w, h);
  }

  /** 重置到第一帧并可再次播放 */
  reset() {
    this.currentIndex = 0;
    this.lastSwitch = millis();
    this.finished = false;
  }

  /** 是否已播放完毕（非循环动画时） */
  isFinished() {
    return this.finished;
  }
}
