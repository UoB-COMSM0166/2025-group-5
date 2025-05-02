// init.js

let canvasElem, canvasX, canvasY;
let skipButton;

async function setup() {
  // 创建并定位画布
  canvasElem = createCanvas(canvasWidth, canvasHeight);
  // 获取画布在页面上的位置
  canvasX = canvasElem.elt.offsetLeft;
  canvasY = canvasElem.elt.offsetTop;

  // 预生成“Restart”按钮（Game Over 时用）
  startButton = createButton('Restart');
  startButton.hide();

  // 准备剧情视频，固定在画布范围
  story1Video.size(canvasWidth, canvasHeight);
  story1Video.position(canvasX, canvasY);
  story1Video.attribute('playsinline', '');
  story1Video.hide();

  story2Video.size(canvasWidth, canvasHeight);
  story2Video.position(canvasX, canvasY);
  story2Video.attribute('playsinline', '');
  story2Video.hide();

  // 创建并初始化关卡对象（不生成 DOM）
  level1 = new Level(1, level1ConfFile, level1BGTexture, level1LightTexture, false);
  await level1.init();
  level2 = new Level(2, level2ConfFile, level2BGTexture, level2LightTexture, true);
  await level2.init();
  level3 = new Level(3, level3ConfFile, level3BGTexture, level3LightTexture, false);
  await level3.init();
  level4 = new Level(4, level4ConfFile, level4BGTexture, level4LightTexture, false);
  await level4.init();

  // 加载属性配置
  attributes = await loadJsonData(attributeFile);

  // 初始化技能栏资源
  g_skillTextureList.push(image_map['grassSlime_idle']);
  g_skillTextureList.push(image_map['ghostSlime_idle']);
  g_skillTextureList.push(image_map['waterSlime_idle']);
  g_skillTextureList.push(image_map['fireSlime_idle']);
  g_skillTextureList.push(image_map['grassWizard_idle']);
  g_skillTextureList.push(image_map['ghostWizard_idle']);
  g_skillTextureList.push(image_map['waterWizard_idle']);
  g_skillTextureList.push(image_map['fireWizard_idle']);
  for (let i = 0; i < g_skillNumber; i++) {
    g_skillStatusList.push(false);
    g_skillNumList.push(0);
  }
}

// 开始播放第一个剧情
function startStory1() {
  gameState = 'story1';
  story1Video.show().play();

  // Skip 按钮：60×30，画布右上角内边距10px
  const btnW = 60, btnH = 30, m = 10;
  skipButton = createButton('Skip');
  skipButton.size(btnW, btnH);
  skipButton.position(canvasX + canvasWidth - btnW - m, canvasY + m);
  skipButton.mousePressed(enterLevelSelect);

  story1Video.onended(startStory2);
}

// 切换到循环剧情2
function startStory2() {
  if (skipButton) {
    skipButton.remove();
    skipButton = null;
  }
  story1Video.hide().stop();

  gameState = 'story2';
  story2Video.show().loop();
}

// 进入关卡选择
function enterLevelSelect() {
  story1Video.hide().stop();
  story2Video.hide().stop();
  if (skipButton) {
    skipButton.remove();
    skipButton = null;
  }

  gameState = 'levelSelect';
  selectLevel();
}

// 关卡选择：首次创建按钮，后续 show() 保证可见
function selectLevel() {
  // 隐 Restart
  startButton.hide();

  // 首次创建
  if (!level1Button) {
    const btnW = 110, btnH = 40, gap = 20;
    const x = canvasX + canvasWidth / 2 - btnW / 2;
    const y1 = canvasY + canvasHeight / 2 - btnH / 2 - gap;
    const y2 = y1 + btnH + gap;
    const y3 = y2 + btnH + gap;
    const y4 = y3 + btnH + gap;

    level1Button = createButton('Level 1')
      .size(btnW, btnH)
      .position(x, y1)
      .mousePressed(() => startGame(1));

    level2Button = createButton('Level 2')
      .size(btnW, btnH)
      .position(x, y2)
      .mousePressed(() => startGame(2));

    level3Button = createButton('Level 3')
      .size(btnW, btnH)
      .position(x, y3)
      .mousePressed(() => startGame(3));

    level4Button = createButton('Level 4')
      .size(btnW, btnH)
      .position(x, y4)
      .mousePressed(() => startGame(4));
  }
  // 保证显示
  level1Button.show();
  level2Button.show();
  level3Button.show();
  level4Button.show();
}

// 开始游戏并隐藏按钮
function startGame(level) {
  gameState = 'playing';
  isGameOver = false;

  if (level === 1) {
    level1.start();
    present_level = 1;
  } else if (level === 2){
    level2.start();
    present_level = 2;
  } else if (level === 3){
    level3.start();
    present_level = 3;
  } else if (level === 4){
    level4.start();
    present_level = 4;
  }

  level1Button.hide();
  level2Button.hide();
  level3Button.hide();
  level4Button.hide();
}

// Game Over 后回到选关
function restartGame() {
  gameState = 'levelSelect';
  startButton.hide();
  selectLevel();
}

// 主循环，始终先填黑
function draw() {
  background(0);

  switch (gameState) {
    case 'start':
      image(startImg, 0, 0, width, height);
      break;

    case 'story1':
    case 'story2':
      // 视频覆盖画布
      break;

    case 'levelSelect':
      image(levelSelectImg, 0, 0, width, height);
      break;

    case 'playing':
      if (present_level === 1) level1.update();
      else if (present_level === 2) level2.update();
      else if (present_level === 3) level3.update();
      else if (present_level === 4) level4.update();
      break;

    case 'over':
      fill('red');
      textSize(32);
      text('Game Over', width / 2 - 80, height / 2);
      startButton.show().position(
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
  } else if (gameState === 'story2' && key === ' ') {
    enterLevelSelect();
  } else if (gameState === 'playing') {
    if (present_level === 1) level1.keyPressedInLevel();
    else if (present_level === 2) level2.keyPressedInLevel();
    else if (present_level === 3) level3.keyPressedInLevel();
    else if (present_level === 4) level4.keyPressedInLevel();
  }
}

// 首次交互后播放背景音乐
window.onload = () => gameMusic.playBackground();
document.addEventListener('click', () => gameMusic.playBackground(), { once: true });
