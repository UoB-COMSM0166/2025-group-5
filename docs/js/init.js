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
