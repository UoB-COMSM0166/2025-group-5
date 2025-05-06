/* ----------  原有常量与逻辑，无改动 ---------- */
let gameState = 'start'; // 游戏状态 start/levelSelect/playing/over
let startButton;
let gameTitle;
let levelTitle; // 关卡选择标题

// canvas
canvasWidth = 1280;
canvasHeight = 800;

// ** —— 新增：开始界面动态图与关卡过场图资源配置 —— **
const startScreenFiles = [
  'resources/images/start/anim1.png',
  'resources/images/start/anim2.png',
  'resources/images/start/anim3.png',
  'resources/images/start/anim4.png',
  'resources/images/start/anim5.png',
  'resources/images/start/anim6.png'
];
let startScreenImages = [];
let startAnimFrame = 0;
const startAnimInterval = 10; // 帧切换间隔
let startAnimCounter = 0;

// —— 新增：关卡过场图 —— 
const interLevelFiles = [
  'resources/images/transition/inter1.png',
  'resources/images/transition/inter2.png',
  'resources/images/transition/inter3.png',
  'resources/images/transition/inter4.png'
];
let interLevelImages = [];
let interLevelIndex = 0;
let interTimer = 0;
const interDuration = 180; // 3秒 @60fps

// 3) 进入第 2-4 关前过场（占位前两个元素空字符串）
const interEnterFiles = [
  '', // index 0 unused
  '', // index 1 unused
  'resources/images/transition/enter2.png',
  'resources/images/transition/enter3.png',
  'resources/images/transition/enter4.png'
];
let interEnterImages = [];
let interEnterIndex = 0;
let EnterTimer = 0;
const enterDuration = 300; // 5秒 @60fps

// —— 新增：关卡选择界面资源 —— 
const levelSelectBGFile = 'resources/images/selectlevel/Select_Total.png';
let levelSelectBGImage;
const levelBtnFiles = [
  'resources/images/selectlevel/Lock.png',
  'resources/images/selectlevel/Lock.png',
  'resources/images/selectlevel/Lock.png',
  'resources/images/selectlevel/Lock.png'
];
let levelBtnImages = [];
const levelBtnPos = [
  { x: 200, y: 300 },
  { x: 500, y: 300 },
  { x: 800, y: 300 },
  { x: 1100, y: 300 }
];
const levelBtnSize = { w: 150, h: 150 };

// 5) ESC 暂停菜单按钮尺寸与位置
const pauseBtnSize    = { w: 150, h: 50 };
const pauseBtnOffsetX = 200; // 相对画布中心左右偏移
const pauseBtnPosY    = canvasHeight/2 - pauseBtnSize.h/2;

let player;
let enemies = [];
let obstacles = [];
const enemyCount = 5;
const obstacleCount = 5;
let isGameOver = false;

// configuration
let attributeFile = './config/attribute.json';
let attributes;
let animationFile = './config/animationStruct.json';
let animations;



// Game values
// # Character
let HealthBarHeight = 5;
let globalInvincibleTimer = 90;
let globalInvincibleFlashingInterval = 10;
let globalWaterStatusTimer = 300;
let globalFireStatusTimer = 120;
let globalWaterSpeedFactor = 0.5;
let globalFireSpeedFactor = 0.5;
let globalFireHealthPerSec = 1;

// ## Player
let playerInitHealth = 100;
let maxAttack = 100; // max attack of all the units
let playerInitAttack = 5;
let maxSpeed = 5; // max speed of all the units
let playerInitSpeed = 2;
let playerSize = 50;
let playerFile = 'resources/images/characters_and_obstacles/dragon.gif';
let playerTexture;

// ## Enemy
// ### Soldier
let enemyFile = 'resources/images/characters_and_obstacles/example1.jpg';
let enemyTexture;
// ### tower
let towerFile = 'resources/images/characters_and_obstacles/tower/skeletonTower.png';
let towerTexture;
// ### faye
let fayeFile = 'resources/images/characters_and_obstacles/wizard/fire wizard/move/move_0.png';
let fayeTexture;

// ## obstacle
let obstacleSize = 50;
let grassFile = 'resources/images/characters_and_obstacles/example3.jpg';
let grassTexture;
let obstacleFile = 'resources/images/characters_and_obstacles/example4.jpg';
let obstacleTexture;

// slime
let grassSlimeFile = 'resources/images/characters_and_obstacles/Slime/grass_slime/grass_slime move/slime_move_0.png';
let ghostSlimeFile = 'resources/images/characters_and_obstacles/Slime/ghost_slime/ghost_slime_move_right/slime_move_0.png';
let waterSlimeFile = 'resources/images/characters_and_obstacles/Slime/water_slime/water_slime move/slime_move_0.png';
let fireSlimeFile = 'resources/images/characters_and_obstacles/Slime/fire_slime/fire_slime move/slime_move_0.png';
let forestTowerFile = 'resources/images/characters_and_obstacles/tower/forestTower.png';
let skeletonTowerFile = 'resources/images/characters_and_obstacles/tower/skeletonTower.png';
let waterTowerFile = 'resources/images/characters_and_obstacles/tower/waterTower.png';
let magmaTowerFile = 'resources/images/characters_and_obstacles/tower/magmaTower.png';
let grassWizardFile = 'resources/images/characters_and_obstacles/round ghost/round ghost walk/sprite_0.png';
let ghostWizardFile = 'resources/images/characters_and_obstacles/round ghost/round ghost walk/sprite_0.png';
let waterWizardFile = 'resources/images/characters_and_obstacles/wizard/lake wizard/move/lake wizard _0.png';
let fireWizardFile = 'resources/images/characters_and_obstacles/wizard/fire wizard/move/move_0.png';

const charStatus = Object.freeze({
  NORMAL: 'normal',
  DYING: 'dying',
  INVINCIBLE: 'invincible',
  FREEZING: 'freezing',
  BLAMING: 'blaming',
  DEAD: 'dead',
  INCOMPETENT: 'incompetent',
});

const charMoving = Object.freeze({
  UP_WALKING: 'up_w',
  DOWN_WALKING: 'down_w',
  LEFT_WALKING: 'left_w',
  RIGHT_WALKING: 'right_w',
  UP_ATTACK: 'up_a',
  DOWN_ATTACK: 'down_a',
  LEFT_ATTACK: 'left_a',
  RIGHT_ATTACK: 'right_a',
  IDLE: 'idle',
});

// # entity
let chestFile = './resources/images/entities/Treasure_Chest_Close.png';
let nextlevelFile = './resources/images/entities/next_level.png'

// # Paths
let level1ConfFile = './config/level1.json';
let level2ConfFile = './config/level2.json';
let level3ConfFile = './config/level3.json';
let level4ConfFile = './config/level4.json';

let level1BGTexture;
let level1LightTexture;
let level1BGFile = './resources/images/web_background/Dragon_Adventure_01.png';
let level1LightFile = './resources/images/web_background/Dragon_Adventure_01_Light.png';

let level2BGTexture;
let level2LightTexture;
let level2BGFile = './resources/images/web_background/Dragon_Adventure_02.png';
let level2LightFile = './resources/images/web_background/nothing.png';

let level3BGTexture;
let level3LightTexture;
let level3BGFile = './resources/images/web_background/Dragon_Adventaure_03.png';
let level3LightFile = './resources/images/web_background/nothing.png';

let level4BGTexture;
let level4LightTexture;
let level4BGFile = './resources/images/web_background/Dragon_Adventure_04_without chest.png';
let level4LightFile = './resources/images/web_background/nothing.png';

// # Level
let present_level;
let level1;
let level2;
let level3;
let level4;

// # bullet
let forestTowerBulletFile = 'resources/images/characters_and_obstacles/tower/forestBullet.png';
let skeletonTowerBulletFile = 'resources/images/characters_and_obstacles/tower/skeletonBullet.png';
let waterTowerBulletFile = 'resources/images/characters_and_obstacles/tower/waterBullet.png';
let magmaTowerBulletFile = 'resources/images/characters_and_obstacles/tower/magmaBullet.png';
let grassWizardBulletFile = 'resources/images/characters_and_obstacles/round ghost/round ghost bullet/light_blue_bullet.png';
let ghostWizardBulletFile = 'resources/images/characters_and_obstacles/round ghost/round ghost bullet/light_blue_bullet.png';
let waterWizardBulletFile = 'resources/images/characters_and_obstacles/wizard/lake wizard/bullet/lake wizard bullet.png';
let fireWizardBulletFile = 'resources/images/characters_and_obstacles/wizard/fire wizard/bullet/fire wizard bullet.png';

// # prompt
let textBoardFile = "resources/images/text/Board.png";
let textBoardTexture;

// #mapping
let image_map = {
  soldier_idle: null,
  grassSlime_idle: null,
  ghostSlime_idle: null,
  waterSlime_idle: null,
  fireSlime_idle: null,
  skeletonTower_idle: null,
  forestTower_idle: null,
  magmaTower_idle: null,
  waterTower_idle: null,
  grassWizard_idle: null,
  ghostWizard_idle: null,
  waterWizard_idle: null,
  fireWizard_idle: null,
};

let bullet_map = {
  faye: null,
  skeletonTower: null,
  forestTower: null,
  magmaTower: null,
  waterTower: null,
  grassWizard: null,
  ghostWizard: null,
  waterWizard: null,
  fireWizard: null,
};

// # Curtain
let transparentRadius = 30;
let transparentSectorRadius = 200;

// # SkillBar
let questionMarkTexture;
let questionMarkFile = './resources/images/skillbar/questionMark.png';
let g_skillNumber = 9;
let g_skillTextureList = [];
let g_skillStatusList = [];
let g_skillNumList = [];
let g_skillBarX = 0;
let g_skillBarY = 0;
let g_skillBarHeight = 50;
let g_skillBarWidth = 50;
let g_skillBarBlankWidth = 5;
let g_textSize = 16;

/* ----------  新增：开场 / 剧情 / 选关 资源 ---------- */
// 开始界面图片,
let startImgFile = './resources/images/game_background/GameStart.jpg';
let startImg = [];
// let startAnimInterval = 100;

// 选关界面底图
let levelSelectImgFile = './resources/images/game_background/LevelSelect.jpg';
let levelSelectImg;

// 剧情视频
let story1VideoFile = './resources/videos/story1.mp4';   // 剧情介绍
let story2VideoFile = './resources/videos/story2_loop.mp4'; // 循环等待
let story1Video; // p5.MediaElement
let story2Video;

/* ----------  统一预加载 ---------- */
function preload() {
  /* 原有加载 */
    textBoardTexture = loadImage(textBoardFile);
    playerTexture = loadImage(playerFile);
    image_map["soldier_idle"] = loadImage(enemyFile);
    image_map["skeletonTower_idle"] = loadImage(towerFile);
    image_map["faye_idle"] = loadImage(fayeFile);
    image_map["chest1_idle"] = loadImage(chestFile);
    image_map["door_idle"] = loadImage(nextlevelFile);
    image_map["grassSlime_idle"] = loadImage(grassSlimeFile);
    image_map["ghostSlime_idle"] = loadImage(ghostSlimeFile);
    image_map["waterSlime_idle"] = loadImage(waterSlimeFile);
    image_map["fireSlime_idle"] = loadImage(fireSlimeFile);
    image_map["forestTower_idle"] = loadImage(forestTowerFile);
    image_map["skeletonTower_idle"] = loadImage(skeletonTowerFile);
    image_map["waterTower_idle"] = loadImage(waterTowerFile);
    image_map["magmaTower_idle"] = loadImage(magmaTowerFile);
    image_map["grassWizard_idle"] = loadImage(grassWizardFile);
    image_map["ghostWizard_idle"] = loadImage(ghostWizardFile);
    image_map["waterWizard_idle"] = loadImage(waterWizardFile);
    image_map["fireWizard_idle"] = loadImage(fireWizardFile);
    
    bullet_map["skeletonTower"] = loadImage(skeletonTowerBulletFile);
    bullet_map["forestTower"] = loadImage(forestTowerBulletFile);
    bullet_map["magmaTower"] = loadImage(magmaTowerBulletFile);
    bullet_map["waterTower"] = loadImage(waterTowerBulletFile);
    bullet_map["grassWizard"] = loadImage(grassWizardBulletFile);
    bullet_map["ghostWizard"] = loadImage(ghostWizardBulletFile);
    bullet_map["waterWizard"] = loadImage(waterWizardBulletFile);
    bullet_map["fireWizard"] = loadImage(fireWizardBulletFile);

    grassTexture = loadImage(grassFile);
    obstacleTexture = loadImage(obstacleFile);
    level1BGTexture = loadImage(level1BGFile);
    level1LightTexture = loadImage(level1LightFile);
    level2BGTexture = loadImage(level2BGFile);
    level2LightTexture = loadImage(level2LightFile);
    questionMarkTexture = loadImage(questionMarkFile);
    level3BGTexture = loadImage(level3BGFile);
    level3LightTexture = loadImage(level3LightFile);
    level4BGTexture = loadImage(level4BGFile);
    level4LightTexture = loadImage(level4LightFile);

  /* 新增加载 */
  // startImg = loadImage(startImgFile);
  levelSelectImg = loadImage(levelSelectImgFile);

  // --- 新增：开始界面 6 帧动画 ---
  for (let f of startScreenFiles) {
    startScreenImages.push(loadImage(f));
  }
  // --- 新增：关卡胜利过场 ---
  for (let f of interLevelFiles) {
    interLevelImages.push(loadImage(f));
  }
  // --- 新增：进入第 2-4 关前过场 ---
  for (let f of interEnterFiles) {
    interEnterImages.push(f ? loadImage(f) : null);
  }
  // --- 新增：选关背景 & 按钮图 ---
  levelSelectBGImage = loadImage(levelSelectBGFile);
  for (let f of levelBtnFiles) {
    levelBtnImages.push(loadImage(f));
  }

  // p5 视频使用 createVideo，必须立即隐藏，防止自动播放
  story1Video = createVideo([story1VideoFile]);
  story1Video.hide();

  story2Video = createVideo([story2VideoFile]);
  story2Video.hide();
}
