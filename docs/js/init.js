// init.js

// let level1, level2, level3, level4;
// let attributes, animations;
// let interTimer   = 0;  // 胜利过场计时
// let enterTimer   = 0;  // 进入关卡过场计时

// import { musicManager } from './music.js';

let nextLevel    = 1;  // 点击选关后要进入的关卡
let pausedState  = false;

let skipButton;

async function setup() {
  // 创建并定位画布
  canvasElem = createCanvas(canvasWidth, canvasHeight);
  frameRate(60);
  // 获取画布在页面上的位置
  canvasX = canvasElem.elt.offsetLeft;
  canvasY = canvasElem.elt.offsetTop;


  // 预生成“Restart”按钮（Game Over 时用）
  startButton = createButton('Restart');
  startButton.hide();

  // 预生成 "vol+", "vol-", "volValue", "bri+", "bri-", "briValue"

  volUpButton = createButton('vol+');
  volUpButton.position(980, 475);
  volUpButton.size(150, 50);
  volUpButton.mousePressed(volUp);
  volUpButton.hide();

  volDownButton = createButton('vol-');
  volDownButton.position(580, 475);
  volDownButton.size(150, 50);
  volDownButton.mousePressed(volDown);
  volDownButton.hide();

  volDisplay = createInput(vol.toString());
  volDisplay.position(845, 475);
  volDisplay.size(20, 50);
  volDisplay.attribute('readonly', 'true');
  volDisplay.hide();

  briUpButton = createButton('bri+');
  briUpButton.position(980, 675);
  briUpButton.size(150, 50);
  briUpButton.mousePressed(briUp);
  briUpButton.hide();

  briDownButton = createButton('bri-');
  briDownButton.position(580, 675);
  briDownButton.size(150, 50);
  briDownButton.mousePressed(briDown);
  briDownButton.hide();

  briDisplay = createInput(bri.toString());
  briDisplay.position(845, 675);
  briDisplay.size(20, 50);
  briDisplay.attribute('readonly', 'true');
  briDisplay.hide();

  // —— 初始化视频与 Skip 按钮 —— 
  story1Video = createVideo(['resources/videos/story1.mp4']);
  story1Video.size(canvasWidth, canvasHeight);
  story1Video.position(0, 0);
  story1Video.attribute('playsinline','');
  story1Video.hide();

  story2Video = createVideo(['resources/videos/story2_loop.mp4']);
  story2Video.size(canvasWidth, canvasHeight);
  story2Video.position(0, 0);
  story2Video.attribute('playsinline','');
  story2Video.hide();

  // skipButton = createButton('Skip');
  // skipButton.position(canvasWidth - 100, 20);
  // skipButton.hide();

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
  animations = await loadJsonData(animationFile);

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

  // player
  animations["player"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Standing/Player_Up_Standing_01.png"));
  animations["player"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Standing/Player_Up_Standing_02.png"));
  animations["player"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Standing/Player_Up_Standing_03.png"));
  animations["player"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Standing/Player_Up_Standing_04.png"));
  animations["player"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Standing/Player_Up_Standing_05.png"));
  animations["player"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Standing/Player_Up_Standing_06.png"));
  animations["player"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Standing/Player_Down_Standing_01.png"));
  animations["player"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Standing/Player_Down_Standing_02.png"));
  animations["player"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Standing/Player_Down_Standing_03.png"));
  animations["player"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Standing/Player_Down_Standing_04.png"));
  animations["player"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Standing/Player_Down_Standing_05.png"));
  animations["player"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Standing/Player_Down_Standing_06.png"));
  animations["player"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Standing/Player_Right_Standing_01.png"));
  animations["player"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Standing/Player_Right_Standing_02.png"));
  animations["player"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Standing/Player_Right_Standing_03.png"));
  animations["player"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Standing/Player_Right_Standing_04.png"));
  animations["player"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Standing/Player_Right_Standing_05.png"));
  animations["player"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Standing/Player_Right_Standing_06.png"));
  animations["player"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Standing/Player_Right_Standing_01.png"));
  animations["player"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Standing/Player_Right_Standing_02.png"));
  animations["player"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Standing/Player_Right_Standing_03.png"));
  animations["player"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Standing/Player_Right_Standing_04.png"));
  animations["player"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Standing/Player_Right_Standing_05.png"));
  animations["player"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Standing/Player_Right_Standing_06.png"));

  animations["player"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Moving/Player_Up_Moving_01.png"));
  animations["player"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Moving/Player_Up_Moving_02.png"));
  animations["player"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Moving/Player_Up_Moving_03.png"));
  animations["player"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Moving/Player_Up_Moving_04.png"));
  animations["player"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Moving/Player_Up_Moving_05.png"));
  animations["player"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Moving/Player_Up_Moving_06.png"));
  animations["player"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Moving/Player_Down_Moving_01.png"));
  animations["player"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Moving/Player_Down_Moving_02.png"));
  animations["player"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Moving/Player_Down_Moving_03.png"));
  animations["player"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Moving/Player_Down_Moving_04.png"));
  animations["player"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Moving/Player_Down_Moving_05.png"));
  animations["player"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Moving/Player_Down_Moving_06.png"));
  animations["player"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Moving/Player_Right_Moving_01.png"));
  animations["player"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Moving/Player_Right_Moving_02.png"));
  animations["player"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Moving/Player_Right_Moving_03.png"));
  animations["player"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Moving/Player_Right_Moving_04.png"));
  animations["player"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Moving/Player_Right_Moving_05.png"));
  animations["player"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Moving/Player_Right_Moving_06.png"));
  animations["player"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Moving/Player_Right_Moving_01.png"));
  animations["player"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Moving/Player_Right_Moving_02.png"));
  animations["player"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Moving/Player_Right_Moving_03.png"));
  animations["player"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Moving/Player_Right_Moving_04.png"));
  animations["player"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Moving/Player_Right_Moving_05.png"));
  animations["player"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Moving/Player_Right_Moving_06.png"));

  animations["player"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Attack/Player_Up_Attack_01.png"));
  animations["player"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Attack/Player_Up_Attack_03.png"));
  animations["player"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Up_Attack/Player_Up_Attack_04.png"));
  animations["player"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Attack/Player_Down_Attack_01.png"));
  animations["player"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Attack/Player_Down_Attack_03.png"));
  animations["player"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Down_Attack/Player_Down_Attack_04.png"));
  animations["player"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Attack/Player_Right_Attack_01.png"));
  animations["player"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Attack/Player_Right_Attack_03.png"));
  animations["player"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Left_Attack/Player_Right_Attack_04.png"));
  animations["player"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Attack/Player_Right_Attack_01.png"));
  animations["player"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Attack/Player_Right_Attack_03.png"));
  animations["player"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Player/Player_Right_Attack/Player_Right_Attack_04.png"));

  // grassSlime
  animations["grassSlime"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_0.png"));
  animations["grassSlime"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_0.png"));
  animations["grassSlime"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_0.png"));
  animations["grassSlime"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_0.png"));

  animations["grassSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_0.png"));
  animations["grassSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_1.png"));
  animations["grassSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_2.png"));
  animations["grassSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_3.png"));
  animations["grassSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_4.png"));
  animations["grassSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_5.png"));
  animations["grassSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_6.png"));
  animations["grassSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_0.png"));
  animations["grassSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_1.png"));
  animations["grassSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_2.png"));
  animations["grassSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_3.png"));
  animations["grassSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_4.png"));
  animations["grassSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_5.png"));
  animations["grassSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_left/slime_move_6.png"));
  animations["grassSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_0.png"));
  animations["grassSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_1.png"));
  animations["grassSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_2.png"));
  animations["grassSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_3.png"));
  animations["grassSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_4.png"));
  animations["grassSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_5.png"));
  animations["grassSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_6.png"));
  animations["grassSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_0.png"));
  animations["grassSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_1.png"));
  animations["grassSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_2.png"));
  animations["grassSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_3.png"));
  animations["grassSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_4.png"));
  animations["grassSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_5.png"));
  animations["grassSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime_move_right/slime_move_6.png"));

  // ghostSlime
  animations["ghostSlime"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_0.png"));
  animations["ghostSlime"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_0.png"));
  animations["ghostSlime"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_0.png"));
  animations["ghostSlime"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_0.png"));

  animations["ghostSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_0.png"));
  animations["ghostSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_1.png"));
  animations["ghostSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_2.png"));
  animations["ghostSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_3.png"));
  animations["ghostSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_4.png"));
  animations["ghostSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_5.png"));
  animations["ghostSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_6.png"));
  animations["ghostSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_0.png"));
  animations["ghostSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_1.png"));
  animations["ghostSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_2.png"));
  animations["ghostSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_3.png"));
  animations["ghostSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_4.png"));
  animations["ghostSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_5.png"));
  animations["ghostSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_left/slime_move_6.png"));
  animations["ghostSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_0.png"));
  animations["ghostSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_1.png"));
  animations["ghostSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_2.png"));
  animations["ghostSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_3.png"));
  animations["ghostSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_4.png"));
  animations["ghostSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_5.png"));
  animations["ghostSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_6.png"));
  animations["ghostSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_0.png"));
  animations["ghostSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_1.png"));
  animations["ghostSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_2.png"));
  animations["ghostSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_3.png"));
  animations["ghostSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_4.png"));
  animations["ghostSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_5.png"));
  animations["ghostSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_6.png"));

  // waterSlime
  animations["waterSlime"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_0.png"));
  animations["waterSlime"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_0.png"));
  animations["waterSlime"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_0.png"));
  animations["waterSlime"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_0.png"));

  animations["waterSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_0.png"));
  animations["waterSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_1.png"));
  animations["waterSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_2.png"));
  animations["waterSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_3.png"));
  animations["waterSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_4.png"));
  animations["waterSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_5.png"));
  animations["waterSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_6.png"));
  animations["waterSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_0.png"));
  animations["waterSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_1.png"));
  animations["waterSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_2.png"));
  animations["waterSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_3.png"));
  animations["waterSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_4.png"));
  animations["waterSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_5.png"));
  animations["waterSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_left/slime_move_6.png"));
  animations["waterSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_0.png"));
  animations["waterSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_1.png"));
  animations["waterSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_2.png"));
  animations["waterSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_3.png"));
  animations["waterSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_4.png"));
  animations["waterSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_5.png"));
  animations["waterSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_6.png"));
  animations["waterSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_0.png"));
  animations["waterSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_1.png"));
  animations["waterSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_2.png"));
  animations["waterSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_3.png"));
  animations["waterSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_4.png"));
  animations["waterSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_5.png"));
  animations["waterSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/water_slime/water_slime_move_right/slime_move_6.png"));

  // fireSlime
  animations["fireSlime"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_0.png"));
  animations["fireSlime"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_0.png"));
  animations["fireSlime"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_0.png"));
  animations["fireSlime"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_0.png"));

  animations["fireSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_0.png"));
  animations["fireSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_1.png"));
  animations["fireSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_2.png"));
  animations["fireSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_3.png"));
  animations["fireSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_4.png"));
  animations["fireSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_5.png"));
  animations["fireSlime"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_6.png"));
  animations["fireSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_0.png"));
  animations["fireSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_1.png"));
  animations["fireSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_2.png"));
  animations["fireSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_3.png"));
  animations["fireSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_4.png"));
  animations["fireSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_5.png"));
  animations["fireSlime"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_left/slime_move_6.png"));
  animations["fireSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_0.png"));
  animations["fireSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_1.png"));
  animations["fireSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_2.png"));
  animations["fireSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_3.png"));
  animations["fireSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_4.png"));
  animations["fireSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_5.png"));
  animations["fireSlime"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_6.png"));
  animations["fireSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_0.png"));
  animations["fireSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_1.png"));
  animations["fireSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_2.png"));
  animations["fireSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_3.png"));
  animations["fireSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_4.png"));
  animations["fireSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_5.png"));
  animations["fireSlime"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime_move_right/slime_move_6.png"));

  // ghostWizard
  animations["ghostWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_0.png"));
  animations["ghostWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_1.png"));
  animations["ghostWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_2.png"));
  animations["ghostWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_3.png"));
  animations["ghostWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_4.png"));
  animations["ghostWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_5.png"));
  animations["ghostWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_0.png"));
  animations["ghostWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_1.png"));
  animations["ghostWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_2.png"));
  animations["ghostWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_3.png"));
  animations["ghostWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_4.png"));
  animations["ghostWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_5.png"));
  animations["ghostWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_0.png"));
  animations["ghostWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_1.png"));
  animations["ghostWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_2.png"));
  animations["ghostWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_3.png"));
  animations["ghostWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_4.png"));
  animations["ghostWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_5.png"));
  animations["ghostWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_0.png"));
  animations["ghostWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_1.png"));
  animations["ghostWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_2.png"));
  animations["ghostWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_3.png"));
  animations["ghostWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_4.png"));
  animations["ghostWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_5.png"));

  animations["ghostWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_0.png"));
  animations["ghostWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_1.png"));
  animations["ghostWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_2.png"));
  animations["ghostWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_3.png"));
  animations["ghostWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_4.png"));
  animations["ghostWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_5.png"));
  animations["ghostWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_0.png"));
  animations["ghostWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_1.png"));
  animations["ghostWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_2.png"));
  animations["ghostWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_3.png"));
  animations["ghostWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_4.png"));
  animations["ghostWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_left/sprite_5.png"));
  animations["ghostWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_0.png"));
  animations["ghostWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_1.png"));
  animations["ghostWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_2.png"));
  animations["ghostWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_3.png"));
  animations["ghostWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_4.png"));
  animations["ghostWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_5.png"));
  animations["ghostWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_0.png"));
  animations["ghostWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_1.png"));
  animations["ghostWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_2.png"));
  animations["ghostWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_3.png"));
  animations["ghostWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_4.png"));
  animations["ghostWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_walk_right/sprite_5.png"));

  animations["ghostWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_0.png"));
  animations["ghostWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_1.png"));
  animations["ghostWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_2.png"));
  animations["ghostWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_3.png"));
  animations["ghostWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_4.png"));
  animations["ghostWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_5.png"));
  animations["ghostWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_6.png"));
  animations["ghostWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_7.png"));
  animations["ghostWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_8.png"));
  animations["ghostWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_9.png"));
  animations["ghostWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_10.png"));
  animations["ghostWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_0.png"));
  animations["ghostWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_1.png"));
  animations["ghostWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_2.png"));
  animations["ghostWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_3.png"));
  animations["ghostWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_4.png"));
  animations["ghostWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_5.png"));
  animations["ghostWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_6.png"));
  animations["ghostWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_7.png"));
  animations["ghostWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_8.png"));
  animations["ghostWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_9.png"));
  animations["ghostWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_left/sprite_10.png"));
  animations["ghostWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_0.png"));
  animations["ghostWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_1.png"));
  animations["ghostWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_2.png"));
  animations["ghostWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_3.png"));
  animations["ghostWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_4.png"));
  animations["ghostWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_5.png"));
  animations["ghostWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_6.png"));
  animations["ghostWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_7.png"));
  animations["ghostWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_8.png"));
  animations["ghostWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_9.png"));
  animations["ghostWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_10.png"));
  animations["ghostWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_0.png"));
  animations["ghostWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_1.png"));
  animations["ghostWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_2.png"));
  animations["ghostWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_3.png"));
  animations["ghostWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_4.png"));
  animations["ghostWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_5.png"));
  animations["ghostWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_6.png"));
  animations["ghostWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_7.png"));
  animations["ghostWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_8.png"));
  animations["ghostWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_9.png"));
  animations["ghostWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/round ghost/round_ghost_attack_right/sprite_10.png"));

  // waterWizard
  animations["waterWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_0.png"));
  animations["waterWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_1.png"));
  animations["waterWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_2.png"));
  animations["waterWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_3.png"));
  animations["waterWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_0.png"));
  animations["waterWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_1.png"));
  animations["waterWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_2.png"));
  animations["waterWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_3.png"));
  animations["waterWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_0.png"));
  animations["waterWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_1.png"));
  animations["waterWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_2.png"));
  animations["waterWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_3.png"));
  animations["waterWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_0.png"));
  animations["waterWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_1.png"));
  animations["waterWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_2.png"));
  animations["waterWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_3.png"));

  animations["waterWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_0.png"));
  animations["waterWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_1.png"));
  animations["waterWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_2.png"));
  animations["waterWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_3.png"));
  animations["waterWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_0.png"));
  animations["waterWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_1.png"));
  animations["waterWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_2.png"));
  animations["waterWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_left/lake wizard_3.png"));
  animations["waterWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_0.png"));
  animations["waterWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_1.png"));
  animations["waterWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_2.png"));
  animations["waterWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_3.png"));
  animations["waterWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_0.png"));
  animations["waterWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_1.png"));
  animations["waterWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_2.png"));
  animations["waterWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/move_right/lake wizard_3.png"));

  animations["waterWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _0.png"));
  animations["waterWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _1.png"));
  animations["waterWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _2.png"));
  animations["waterWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _3.png"));
  animations["waterWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _4.png"));
  animations["waterWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _5.png"));
  animations["waterWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _6.png"));
  animations["waterWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _7.png"));
  animations["waterWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _8.png"));
  animations["waterWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _0.png"));
  animations["waterWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _1.png"));
  animations["waterWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _2.png"));
  animations["waterWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _3.png"));
  animations["waterWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _4.png"));
  animations["waterWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _5.png"));
  animations["waterWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _6.png"));
  animations["waterWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _7.png"));
  animations["waterWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_left/lake wizard _8.png"));
  animations["waterWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _0.png"));
  animations["waterWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _1.png"));
  animations["waterWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _2.png"));
  animations["waterWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _3.png"));
  animations["waterWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _4.png"));
  animations["waterWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _5.png"));
  animations["waterWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _6.png"));
  animations["waterWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _7.png"));
  animations["waterWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _8.png"));
  animations["waterWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _0.png"));
  animations["waterWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _1.png"));
  animations["waterWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _2.png"));
  animations["waterWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _3.png"));
  animations["waterWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _4.png"));
  animations["waterWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _5.png"));
  animations["waterWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _6.png"));
  animations["waterWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _7.png"));
  animations["waterWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/lake wizard/attack_right/lake wizard _8.png"));

  // fireWizard
  animations["fireWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_0.png"));
  animations["fireWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_1.png"));
  animations["fireWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_2.png"));
  animations["fireWizard"]["idleUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_3.png"));
  animations["fireWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_0.png"));
  animations["fireWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_1.png"));
  animations["fireWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_2.png"));
  animations["fireWizard"]["idleLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_3.png"));
  animations["fireWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_0.png"));
  animations["fireWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_1.png"));
  animations["fireWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_2.png"));
  animations["fireWizard"]["idleDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_3.png"));
  animations["fireWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_0.png"));
  animations["fireWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_1.png"));
  animations["fireWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_2.png"));
  animations["fireWizard"]["idleRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_3.png"));

  animations["fireWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_0.png"));
  animations["fireWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_1.png"));
  animations["fireWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_2.png"));
  animations["fireWizard"]["moveUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_3.png"));
  animations["fireWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_0.png"));
  animations["fireWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_1.png"));
  animations["fireWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_2.png"));
  animations["fireWizard"]["moveLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_left/move_3.png"));
  animations["fireWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_0.png"));
  animations["fireWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_1.png"));
  animations["fireWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_2.png"));
  animations["fireWizard"]["moveDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_3.png"));
  animations["fireWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_0.png"));
  animations["fireWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_1.png"));
  animations["fireWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_2.png"));
  animations["fireWizard"]["moveRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/move_right/move_3.png"));

  animations["fireWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_0.png"));
  animations["fireWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_1.png"));
  animations["fireWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_2.png"));
  animations["fireWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_3.png"));
  animations["fireWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_4.png"));
  animations["fireWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_5.png"));
  animations["fireWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_6.png"));
  animations["fireWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_7.png"));
  animations["fireWizard"]["attackUp"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_8.png"));
  animations["fireWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_0.png"));
  animations["fireWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_1.png"));
  animations["fireWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_2.png"));
  animations["fireWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_3.png"));
  animations["fireWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_4.png"));
  animations["fireWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_5.png"));
  animations["fireWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_6.png"));
  animations["fireWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_7.png"));
  animations["fireWizard"]["attackLeft"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_left/attack_8.png"));
  animations["fireWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_0.png"));
  animations["fireWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_1.png"));
  animations["fireWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_2.png"));
  animations["fireWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_3.png"));
  animations["fireWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_4.png"));
  animations["fireWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_5.png"));
  animations["fireWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_6.png"));
  animations["fireWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_7.png"));
  animations["fireWizard"]["attackDown"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_8.png"));
  animations["fireWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_0.png"));
  animations["fireWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_1.png"));
  animations["fireWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_2.png"));
  animations["fireWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_3.png"));
  animations["fireWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_4.png"));
  animations["fireWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_5.png"));
  animations["fireWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_6.png"));
  animations["fireWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_7.png"));
  animations["fireWizard"]["attackRight"]["frames"].push(loadImage("resources/images/characters_and_obstacles/wizard/fire wizard/attack_right/attack_8.png"));
}






// 关卡选择：首次创建按钮，后续 show() 保证可见
function selectLevel() {
  // 隐 Restart
  startButton.hide();

  // 首次创建
  // if (!level1Button) {
  //   const btnW = 110, btnH = 40, gap = 20;
  //   const x = canvasX + canvasWidth / 2 - btnW / 2;
  //   const y1 = canvasY + canvasHeight / 2 - btnH / 2 - gap;
  //   const y2 = y1 + btnH + gap;
  //   const y3 = y2 + btnH + gap;
  //   const y4 = y3 + btnH + gap;

  //   level1Button = createButton('Level 1')
  //     .size(btnW, btnH)
  //     .position(x, y1)
  //     .mousePressed(() => startGame(1));

  //   level2Button = createButton('Level 2')
  //     .size(btnW, btnH)
  //     .position(x, y2)
  //     .mousePressed(() => startGame(2));

  //   level3Button = createButton('Level 3')
  //     .size(btnW, btnH)
  //     .position(x, y3)
  //     .mousePressed(() => startGame(3));

  //   level4Button = createButton('Level 4')
  //     .size(btnW, btnH)
  //     .position(x, y4)
  //     .mousePressed(() => startGame(4));
  // }
  // 保证显示
  // level1Button.show();
  // level2Button.show();
  // level3Button.show();
  // level4Button.show();
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

  // level1Button.hide();
  // level2Button.hide();
  // level3Button.hide();
  // level4Button.hide();
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
  switch(gameState) {
    case 'start':       drawStart();       break;
    case 'story1':      drawStory1();      break;
    case 'story2':      drawStory2();      break;
    case 'levelSelect': drawLevelSelect(); break;
    case 'interEnter':  drawInterEnter();  break;
    case 'playing':     drawPlaying();     break;
    case 'interLevel':  drawInterLevel();  break;
    case 'paused':      drawPaused();      break;
    case 'over':        drawGameOver();    break;
  }

  if (bri < 10) {                   // bri 10 = 最亮，不加遮罩
    noStroke();
    const alpha = (10 - bri) * 25.5; 
    fill(0, alpha); 
    rect(0, 0, width, height); 
  }
}

// —— 1. “start” 界面：按空格或鼠标开始，进入 story1 视频 —— 
function drawStart(){
  // —— 1. 计算动画帧索引 —— 
  // framesPerImage：每张动画帧持续的 draw() 调用次数，你可以根据需要调节速度
  const framesPerImage = 10;
  const idx = Math.floor(frameCount / framesPerImage) % startScreenImages.length;

  // —— 2. 清屏并绘制动画 —— 
  background(0);                     // 黑底背景
  imageMode(CENTER);                 
  // 将第 idx 帧动画居中绘制
  // image(startScreenImages[idx], width/2, height/2);
  image(startScreenImages[idx], width/2, height/2+40);

  gameMusic.playBackground();


  if (keyIsDown(32) || mouseIsPressed) {
    startStory1(); 
  }
}

// —— 2. “story1” 过场：播放一次，可 Skip —— 
function startStory1() {
  gameMusic.stopBackground(); // 停止背景音乐 :contentReference[oaicite:2]{index=2}:contentReference[oaicite:3]{index=3}
  gameState = 'story1';
  story1Video.position(canvasX, canvasY);
  story1Video.show().play();

  // 在画布内右上角创建 Skip 按钮
  const btnW = 60, btnH = 30, m = 10;
  skipButton = createButton('Skip');
  skipButton.size(btnW, btnH);
  skipButton.position(canvasX + canvasWidth - btnW - m, canvasY + m);
  skipButton.mousePressed(enterLevelSelect);

  story1Video.onended(startStory2);
}

// —— 2. “story1” 过场：播放一次，可 Skip —— 
function drawStory1(){
  // 视频已经在 DOM 上播放
  skipButton.mousePressed(()=>{
    story1Video.stop();
    story1Video.hide();
    skipButton.hide();
    enterLevelSelect();
  });
}

// —— 3. “story2” 过场：循环播放，可 Skip 或空格跳过 —— 
function startStory2() {
  if (skipButton) {
    skipButton.remove();
    skipButton = null;
  }
  story1Video.hide().stop();
  gameState = 'story2';
  story2Video.position(canvasX, canvasY);
  story2Video.show().loop();

  // 在画布内右上角创建 Skip 按钮
  const btnW = 60, btnH = 30, m = 10;
  skipButton = createButton('Skip');
  skipButton.size(btnW, btnH);
  skipButton.position(canvasX + canvasWidth - btnW - m, canvasY + m);
  skipButton.mousePressed(enterLevelSelect);

  if (keyIsDown(32)) {
    gameState = 'levelSelect';
    enterLevelSelect();
  }
}

function drawStory2(){
  skipButton.show();
  skipButton.mousePressed(()=>enterLevelSelect());
  // 确保视频在 DOM 上可见并循环播放
  story2Video.show();
  story2Video.loop();

  // Skip 按钮只需 show，一旦创建后每帧都让它保持可见
  skipButton.show();
}

// —— 4. 进入选关界面 —— 
function enterLevelSelect() {
  story1Video.hide().stop();
  story2Video.hide().stop();
  if (skipButton) {
    skipButton.remove();
    skipButton = null;
  }
  gameMusic.stopLevel(1);
  gameMusic.stopLevel(2);
  gameMusic.stopLevel(3);
  gameMusic.stopLevel(4);
  gameMusic.playBackground(); // 恢复背景音乐 :contentReference[oaicite:4]{index=4}:contentReference[oaicite:5]{index=5}
  gameState = 'levelSelect';
  selectLevel();
}

// —— 2. 绘制“关卡选择”界面 —— 
function drawLevelSelect() {
  // 根据已通关数 +1 选背景图（初次进入即 1）
  let unlockedCount = levelCleared.filter(b => b).length + 1;
  unlockedCount = constrain(unlockedCount, 1, 4);

  // 绘制对应背景
  imageMode(CENTER);
  image(
    levelSelectBGImgs[unlockedCount - 1],
    width / 2, height / 2,
    width, height
  );

  // 绘制并检测每个解锁按钮
  for (let i = 0; i < unlockedCount; i++) {
    let area = levelBtnAreas[i];
    // 仅绘制透明边框，fill 全透明
    noFill();
    stroke(255, 0);
    strokeWeight(2);
    rect(area.x, area.y, area.w, area.h);

    // 点击“隐形”按钮区域
    if (
      mouseIsPressed &&
      mouseX >= area.x && mouseX <= area.x + area.w &&
      mouseY >= area.y && mouseY <= area.y + area.h
    ) {
      startGame(i + 1);
    }
  }
}


// —— 5. “interEnter”：进入 2–4 关前的 5 秒过场，可空格跳过 —— 
function drawInterEnter(){
  imageMode(CORNER);
  let img = interEnterImages[nextLevel];
  if (img) image(img,0,0,width,height);
  enterTimer++;
  if (keyIsDown(32) || enterTimer>60*5){
    startGame(nextLevel);
  }
}

// —— 6. “playing”：实际游戏，记得先重置 imageMode —— 
function drawPlaying(){
  imageMode(CORNER);
  if      (present_level===1){
    gameMusic.stopBackground(); 
    gameMusic.playLevel(1);
    level1.update();

  } 
  else if (present_level===2){
    gameMusic.stopBackground();
    gameMusic.playLevel(2);
    level2.update();
  }
  else if (present_level===3){
    gameMusic.stopBackground();
    gameMusic.playLevel(3);
    level3.update();
  } 
  else if (present_level===4){
    gameMusic.stopBackground();
    gameMusic.playLevel(4);
    level4.update();
  } 
}

// —— 7. “interLevel”：关卡胜利后 3 秒过场，可空格跳过 —— 
function drawInterLevel(){
  imageMode(CORNER);
  image(interLevelImages[present_level-1],0,0,width,height);
  interTimer++;
  if (keyIsDown(32) || interTimer>60*3){
    interTimer=0;
    // levelCleared[present_level - 1] = true;
    gameState='levelSelect';
  }
}

// —— 8. “paused”：ESC 调出，画面变灰，两个按钮 —— 
function drawPaused(){
  // 先画静态游戏画面（不更新逻辑）
  imageMode(CORNER);
  if      (present_level===1) level1.drawWithoutUpdate();
  else if (present_level===2) level2.drawWithoutUpdate();
  else if (present_level===3) level3.drawWithoutUpdate();
  else if (present_level===4) level4.drawWithoutUpdate();

  // // 叠加灰层
  // fill(0,0,0,150);
  // rect(0,0,width,height);
  // 绘制底片
  image(escSelectImg, 128, 0, 1024, 800);

  // 画音量和亮度控制
  volUpButton.show();
  volDownButton.show();
  volDisplay.show();
  briUpButton.show();
  briDownButton.show();
  briDisplay.show();

  // 画 Exit / Continue 按钮
  for(let i=0;i<2;i++){
    let txt = i===0?'Exit':'Continue';
    let x   = width/2 + (i===0?-pauseBtnOffsetX:pauseBtnOffsetX);
    let y   = pauseBtnPosY;
    let w   = pauseBtnSize.w, h=pauseBtnSize.h;
    let over = mouseX>x-w/2 && mouseX<x+w/2
            && mouseY>y-h/2 && mouseY<y+h/2;
    fill(over?'lightblue':'white');
    rect(x-w/2,y-h/2,w,h,8);
    fill('black');
    textAlign(CENTER,CENTER);
    textSize(20);
    text(txt,x,y);
    if (over && mouseIsPressed){
      if (i===0){ // Exit
        volUpButton.hide();
        volDownButton.hide();
        volDisplay.hide();
        briUpButton.hide();
        briDownButton.hide();
        briDisplay.hide();
        // gameState='levelSelect';
        enterLevelSelect();
      } else {   // Continue
        volUpButton.hide();
        volDownButton.hide();
        volDisplay.hide();
        briUpButton.hide();
        briDownButton.hide();
        briDisplay.hide();
        gameState='playing';
      }
    }
  }
}

// —— 9. “over” 界面：失败后返回选关 —— 
function drawGameOver(){
  background(0);
  fill('red'); textSize(48);
  textAlign(CENTER,CENTER);
  text('Game Over',width/2,height/2-50);
  drawLevelSelect();
}

// 保留原有按键处理，仅加入跳过过场的逻辑
function keyPressed() {
  if (gameState === 'interLevel' && key === ' ') {
    interTimer = 60 * 3;
  }
  if (gameState === 'interEnter' && key === ' ') {
    enterTimer = 60 * 5;
  }
  // 如果当前正处于 story2 状态，且刚好按下空格
  if (gameState === 'story2' && key === ' ') {
    enterLevelSelect();
  }
  // 下面保留你的其它按键逻辑...
  if (gameState === 'playing' && keyCode === ESCAPE) {
    gameState = 'paused';
  }
  if (gameState === 'playing') {
    if      (present_level === 1) level1.keyPressedInLevel();
    else if (present_level === 2) level2.keyPressedInLevel();
    else if (present_level === 3) level3.keyPressedInLevel();
    else if (present_level === 4) level4.keyPressedInLevel();
  }
}

function mousePressed() {
  // 阻止原 DOM 事件干扰
}

// 保留原有 startGame，不改动
function startGame(level) {
  gameState = 'playing';
  present_level = level;
  if      (level === 1) level1.start();
  else if (level === 2) level2.start();
  else if (level === 3) level3.start();
  else if (level === 4) level4.start();
}

// 首次交互后播放背景音乐
// window.onload = () => gameMusic.playBackground();
// document.addEventListener('click', () => gameMusic.playBackground(), { once: true });

function volUp()
{
  if (vol < 10) 
  {   
    vol ++;    
    gameMusic.setMasterVolume(vol / 10);
    volDisplay.value(vol); 
  }
}

function volDown()
{
  if (vol > 0) 
  {   
    vol --;    
    gameMusic.setMasterVolume(vol / 10);
    volDisplay.value(vol);  
  }
}

function briUp()
{
  if (bri < 10) 
  {   
    bri ++;    
    briDisplay.value(bri); 
  }
}

function briDown()
{
  if (bri > 0) 
  {     
    bri --;    
    briDisplay.value(bri); 
  }
}
