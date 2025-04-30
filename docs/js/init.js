// init.js

let canvasElem, canvasX, canvasY;
let skipButton;

async function setup() {
  // 创建并定位画布
  canvasElem = createCanvas(canvasWidth, canvasHeight);
  // 取到画布在页面中的像素坐标
  canvasX = canvasElem.elt.offsetLeft;
  canvasY = canvasElem.elt.offsetTop;

  // 预生成“Restart”按钮（Game Over 时用）
  startButton = createButton('Restart');
  startButton.hide();

  // 准备剧情视频
  // 故事1
  story1Video.size(canvasWidth, canvasHeight);
  story1Video.position(canvasX, canvasY);
  story1Video.attribute('playsinline', '');
  story1Video.hide();
  // 故事2
  story2Video.size(canvasWidth, canvasHeight);
  story2Video.position(canvasX, canvasY);
  story2Video.attribute('playsinline', '');
  story2Video.hide();

  // 创建并初始化关卡（不生成任何 DOM）
  level1 = new Level(1, level1ConfFile, level1BGTexture, level1LightTexture);
  await level1.init();
  level2 = new Level(2, level2ConfFile, level2BGTexture, level2LightTexture);
  await level2.init();

  // 加载属性配置
  attributes = await loadJsonData(attributeFile);

  // 初始化技能栏资源列表
  g_skillTextureList.push(image_map['soldier_idle']);
  g_skillTextureList.push(grassTexture);
  g_skillTextureList.push(grassTexture);
  g_skillTextureList.push(image_map['tower_idle']);
  g_skillTextureList.push(image_map['faye_idle']);
  for (let i = 0; i < g_skillNumber; i++) {
    g_skillStatusList.push(false);
    g_skillNumList.push(0);
  }
}

// 开始播放第一个剧情
function startStory1() {
  gameState = 'story1';
  // 显示并播放视频1
  story1Video.show();
  story1Video.play();

  // 创建 Skip 按钮：60×30，画布右上角，内边距10px
  const btnW = 60, btnH = 30, margin = 10;
  skipButton = createButton('Skip');
  skipButton.size(btnW, btnH);
  skipButton.position(
    canvasX + canvasWidth - btnW - margin,
    canvasY + margin
  );
  skipButton.mousePressed(enterLevelSelect);

  // 第一个视频播完后进入第二个剧情
  story1Video.onended(startStory2);
}

// 切换到循环播放的剧情2
function startStory2() {
  // 清理剧情1
  if (skipButton) {
    skipButton.remove();
    skipButton = null;
  }
  story1Video.hide();
  story1Video.stop();

  // 播放剧情2（循环）
  story2Video.show();
  story2Video.loop();
  gameState = 'story2';
}

// 进入关卡选择界面
function enterLevelSelect() {
  // 停止并隐藏所有视频
  story1Video.hide();
  story1Video.stop();
  story2Video.hide();
  story2Video.stop();

  if (skipButton) {
    skipButton.remove();
    skipButton = null;
  }

  gameState = 'levelSelect';
  selectLevel();
}

// 关卡选择：只生成两个按钮，不再有标题
function selectLevel() {
  // 如果已经生成过，就不重复生成
  if (level1Button) return;

  // 确保隐藏 Restart 按钮
  startButton.hide();

  // 两个按钮水平居中，垂直稍微偏上/下
  const btnW = 110, btnH = 40, gap = 20;
  const x = canvasX + canvasWidth / 2 - btnW / 2;
  const y1 = canvasY + canvasHeight / 2 - btnH / 2 - gap;
  const y2 = y1 + btnH + gap;

  level1Button = createButton('Level 1');
  level1Button.size(btnW, btnH);
  level1Button.position(x, y1);
  level1Button.mousePressed(() => startGame(1));

  level2Button = createButton('Level 2');
  level2Button.size(btnW, btnH);
  level2Button.position(x, y2);
  level2Button.mousePressed(() => startGame(2));
}

// 开始游戏并隐藏关卡按钮
function startGame(level) {
  gameState = 'playing';
  isGameOver = false;

  if (level === 1) {
    bulletSpeed = 3;
    spawnInterval = 30;
    level1.start();
    present_level = 1;
  } else {
    bulletSpeed = 5;
    spawnInterval = 20;
    level2.start();
    present_level = 2;
  }

  // 隐藏关卡按钮
  level1Button.hide();
  level2Button.hide();
}

// 重新回到开场
function restartGame() {
  gameState = 'start';
  startButton.hide();
}

// 主循环：根据 gameState 切换场景
function draw() {
  // **始终先填黑，确保无透明区域**
  background(0);

  switch (gameState) {
    case 'start':
      image(startImg, 0, 0, width, height);
      break;

    case 'story1':
    case 'story2':
      // 视频 DOM 元素位于画布之上，会覆盖这块黑底
      break;

    case 'levelSelect':
      image(levelSelectImg, 0, 0, width, height);
      break;

    case 'playing':
      // 进入游戏主逻辑
      if (present_level === 1) level1.update();
      else if (present_level === 2) level2.update();
      break;

    case 'over':
      fill('red');
      textSize(32);
      text('Game Over', width / 2 - 80, height / 2);
      startButton.show();
      startButton.position(
        canvasX + canvasWidth / 2 - 55,
        canvasY + canvasHeight / 2 + 40
      );
      startButton.mousePressed(restartGame);
      break;
  }
}

// 键盘事件
function keyPressed() {
  if (gameState === 'start' && key === ' ') {
    startStory1();
    return;
  }
  if (gameState === 'story2' && key === ' ') {
    enterLevelSelect();
    return;
  }
  if (gameState === 'playing') {
    if (present_level === 1) level1.keyPressedInLevel();
    else if (present_level === 2) level2.keyPressedInLevel();
  }
}

// 页面首次交互后启动背景音乐
window.onload = () => gameMusic.playBackground();
document.addEventListener(
  'click',
  () => gameMusic.playBackground(),
  { once: true }
);
