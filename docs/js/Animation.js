class SpriteAnimator {
  /**
   * @param {Object} frameSets  
   *   Key name: state：
   *     'idleUp' | 'idleDown' | 'idleLeft' | 'idleRight' | 'moveUp'|'moveDown'|'moveLeft'|'moveRight'
   *            |'attackUp'|'attackDown'|'attackLeft'|'attackRight'
   *   value { frames: p5.Image[], period: number(ms), loop: boolean }
   * @param {string} initialState - Initial state, default is 'idle'
   */
  constructor(frameSets, initialState = 'idleUp') {
    this.frameSets = frameSets;
    this.currentState = initialState;
    this.currentIndex = 0;
    this.lastSwitch = millis();
    this.finished = false;
  }

  /**
   * Switch state (if the state doesn't change, reset the animation to the first frame)
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

  /** Update the current frame index (call before draw) */
  update() {
    let cfg = this.frameSets[this.currentState];
    if (!cfg || this.finished) return;

    // Calculate the display duration (interval) of each frame
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
   * Draw the current frame
   * @param {number} x  - Canvas x-coordinate
   * @param {number} y  - Canvas y-coordinate
   * @param {number} w  - Drawing width
   * @param {number} h  - Drawing height
   */
  draw(x, y, w, h) {
    let cfg = this.frameSets[this.currentState];
    if (!cfg) return;
    image(cfg.frames[this.currentIndex], x, y, w, h);
  }

  /** Whether the animation has finished (only meaningful for states with loop = false) */
  isFinished() {
    return this.finished;
  }

  /** Force reset the animation sequence of the current state to the first frame */
  reset() {
    this.currentIndex = 0;
    this.lastSwitch = millis();
    this.finished = false;
  }
}