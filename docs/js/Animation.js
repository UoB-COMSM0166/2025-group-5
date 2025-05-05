class SpriteAnimator {
  /**
   * @param {Object} frameSets  
   *   键名为状态(state)：
   *     'idleUp' | 'idleDown' | 'idleLeft' | 'idleRight' | 'moveUp'|'moveDown'|'moveLeft'|'moveRight'
   *            |'attackUp'|'attackDown'|'attackLeft'|'attackRight'
   *   值为 { frames: p5.Image[], period: number(ms), loop: boolean }
   * @param {string} initialState - 初始状态，默认为 'idle'
   */
  constructor(frameSets, initialState = 'idleUp') {
    this.frameSets = frameSets;
    this.currentState = initialState;
    this.currentIndex = 0;
    this.lastSwitch = millis();
    this.finished = false;
  }

  /**
   * 切换状态（如果状态不变，则重置动画到起始帧）
   * @param {string} newState
   */
  setState(newState) {
    if (!(newState in this.frameSets)) {
      console.warn(`Unknown animation state: ${newState}`);
      return;
    }
    if (this.currentState !== newState) {
      this.currentState = newState;
      this.currentIndex = 0;
      this.lastSwitch = millis();
      this.finished = false;
    }
  }

  /** 更新当前帧索引（在 draw 之前调用） */
  update() {
    let cfg = this.frameSets[this.currentState];
    if (!cfg || this.finished) return;

    // 计算每帧的显示时间（interval）
    let interval = cfg.period / cfg.frames.length;
    let now = millis();

    if (now - this.lastSwitch >= interval) {
      this.lastSwitch = now;
      this.currentIndex++;
      if (this.currentIndex >= cfg.frames.length) {
        if (cfg.loop) {
          this.currentIndex = 0;
        } else {
          this.currentIndex = cfg.frames.length - 1;
          this.finished = true;
        }
      }
    }
  }

  /**
   * 绘制当前帧
   * @param {number} x  - 画布 x 坐标
   * @param {number} y  - 画布 y 坐标
   * @param {number} w  - 绘制宽度
   * @param {number} h  - 绘制高度
   */
  draw(x, y, w, h) {
    let cfg = this.frameSets[this.currentState];
    if (!cfg) return;
    image(cfg.frames[this.currentIndex], x, y, w, h);
  }

  /** 是否已播完（仅对 loop=false 的状态有意义） */
  isFinished() {
    return this.finished;
  }

  /** 强制重置当前状态的动画序列到第一帧 */
  reset() {
    this.currentIndex = 0;
    this.lastSwitch = millis();
    this.finished = false;
  }
}