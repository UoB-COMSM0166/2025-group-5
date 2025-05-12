// init.js





let nextLevel    = 1;  // The level to enter after clicking level selection
let pausedState  = false;

let skipButton;

async function setup() {
  //Create and position the canvas
  canvasElem = createCanvas(canvasWidth, canvasHeight);
  frameRate(60);
  //Get the canvas position on the page
  canvasX = canvasElem.elt.offsetLeft;
  canvasY = canvasElem.elt.offsetTop;


  //Pre-generate the "Restart" button (used during Game Over)
  startButton = createButton('Restart');
  startButton.hide();

  //Pre-generate "vol+", "vol-", "volValue", "bri+", "bri-", "briValue"

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

  //Initialize video and Skip button
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

  //Prepare the story video, fixed within the canvas area
  story1Video.size(canvasWidth, canvasHeight);
  story1Video.position(canvasX, canvasY);
  story1Video.attribute('playsinline', '');
  story1Video.hide();

  story2Video.size(canvasWidth, canvasHeight);
  story2Video.position(canvasX, canvasY);
  story2Video.attribute('playsinline', '');
  story2Video.hide();

  //Create and initialize level objects (without generating DOM elements)
  level1 = new Level(1, level1ConfFile, level1BGTexture, level1LightTexture, false);
  await level1.init();
  level2 = new Level(2, level2ConfFile, level2BGTexture, level2LightTexture, true);
  await level2.init();
  level3 = new Level(3, level3ConfFile, level3BGTexture, level3LightTexture, false);
  await level3.init();
  level4 = new Level(4, level4ConfFile, level4BGTexture, level4LightTexture, false);
  await level4.init();

  //Load attribute configuration
  attributes = await loadJsonData(attributeFile);
  animations = await loadJsonData(animationFile);

  //Initialize skill bar resources
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


function selectLevel() {
  startButton.hide();

}

//Start the game and hide the button
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

//Return to level selection after Game Over
function restartGame() {
  gameState = 'levelSelect';
  startButton.hide();
  selectLevel();
}

//Main loop, always fill black first
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

  if (bri < 10) {                   // bri 10 = Brightest level, no overlay applied
    noStroke();
    const alpha = (10 - bri) * 25.5; 
    fill(0, alpha); 
    rect(0, 0, width, height); 
  }
}

//"start" screen: press space or click to start, then enter the story1 video
function drawStart(){
  //Calculate animation frame index
  //framesPerImage: number of draw() calls each animation frame lasts; adjust to control speed
  const framesPerImage = 10;
  const idx = Math.floor(frameCount / framesPerImage) % startScreenImages.length;

  //Clear the screen and draw the animation
  background(0);                     // Black background
  imageMode(CENTER);                 
  // Draw the idx-th animation frame centered on the screen
  // image(startScreenImages[idx], width/2, height/2);
  image(startScreenImages[idx], width/2, height/2+40);

  gameMusic.playBackground();


  if (keyIsDown(32) || mouseIsPressed) {
    startStory1(); 
  }
}

//"story1" transition: play once, can be skipped
function startStory1() {
  gameMusic.stopBackground();
  gameState = 'story1';
  story1Video.position(canvasX, canvasY);
  story1Video.show().play();

  //Create a Skip button at the top-right corner of the canvas
  const btnW = 60, btnH = 30, m = 10;
  skipButton = createButton('Skip');
  skipButton.size(btnW, btnH);
  skipButton.position(canvasX + canvasWidth - btnW - m, canvasY + m);
  skipButton.mousePressed(enterLevelSelect);

  story1Video.onended(startStory2);
}

//"story1" transition: play once, skippable
function drawStory1(){
  //he video is already playing on the DOM
  skipButton.mousePressed(()=>{
    story1Video.stop();
    story1Video.hide();
    skipButton.hide();
    enterLevelSelect();
  });
}

//"story2" transition: loop playback, can be skipped or skipped with spacebar
function startStory2() {
  if (skipButton) {
    skipButton.remove();
    skipButton = null;
  }
  story1Video.hide().stop();
  gameState = 'story2';
  story2Video.position(canvasX, canvasY);
  story2Video.show().loop();

  //Create a Skip button at the top-right corner of the canvas
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
  background(0);
  skipButton.show();
  skipButton.mousePressed(()=>enterLevelSelect());
  //Ensure the video is visible on the DOM and set to loop playback
  //Draw the current video frame onto the canvas
  // imageMode(CORNER);
  // image(story2Video, canvasX, canvasY,
  //       canvasWidth, canvasHeight);

  //The Skip button only needs to be shown once; keep it visible every frame after creation
  skipButton.show();
    if (keyIsDown(32)) {
    enterLevelSelect();
  }
}

//Enter the level selection screen
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

//Draw the "Level Selection" screen
function drawLevelSelect() {
  gameMusic.stopLevel(1);
  gameMusic.stopLevel(2);
  gameMusic.stopLevel(3);
  gameMusic.stopLevel(4);
  gameMusic.playBackground(); 
  //Select background image based on cleared level count + 1 (starts at 1 for first entry)
  let unlockedCount = levelCleared.filter(b => b).length + 1;
  unlockedCount = constrain(unlockedCount, 1, 4);

  //Draw the corresponding background
  imageMode(CENTER);
  image(
    levelSelectBGImgs[unlockedCount - 1],
    width / 2, height / 2,
    width, height
  );

  //Draw and check each unlocked button
  for (let i = 0; i < unlockedCount; i++) {
    let area = levelBtnAreas[i];
    //Draw only a transparent border, with fully transparent fill
    noFill();
    stroke(255, 0);
    strokeWeight(2);
    rect(area.x, area.y, area.w, area.h);

    //Click the "invisible" button area
    if (
      mouseIsPressed &&
      mouseX >= area.x && mouseX <= area.x + area.w &&
      mouseY >= area.y && mouseY <= area.y + area.h
    ) {
      nextLevel = i + 1;
      // startGame(i + 1);
      enterTimer = 0;
      gameState = 'interEnter';
    }
  }
}


//"interEnter": 5-second transition before entering levels 2–4, skippable with spacebar
function drawInterEnter(){
  imageMode(CORNER);
  // EnterTimer =0;
  let img = interEnterImages[nextLevel];
  // gameMusic.stopBackground();
  // gameMusic.playLevel(nextLevel);
  if(!img) startGame(nextLevel);
  if (img) image(img,0,0,width,height);
    enterTimer++;
  if (keyIsDown(32) || enterTimer>60*5){
    startGame(nextLevel);
  }
}

//"playing": actual gameplay, remember to reset imageMode
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
