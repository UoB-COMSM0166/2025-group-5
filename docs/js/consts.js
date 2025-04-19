let gameState = 'start'; // 游戏状态 start/levelSelect/playing/over
let startButton;
let gameTitle;
let levelTitle; // 关卡选择标题
let level1Button; // 关卡1按钮
let level2Button; // 关卡2按钮

let player;
let enemies = [];
let obstacles = [];
const enemyCount = 5;
const obstacleCount = 5;
let isGameOver = false;

// configuration
let attributeFile = './config/attribute.json';
let attributes;

// canvas
canvasWidth = 1280;
canvasHeight = 800;

// Game values
// # Character
let HealthBarHeight = 5;
let globalInvincibleTimer = 120;
let globalInvincibleFlashingInterval = 10;

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
let soldierHealth = 10;
let soldierAttack = 5;
let soldierSpeed = 1;
let soldierSize = 40;
let enemyFile = 'resources/images/characters_and_obstacles/example1.jpg';
let enemyTexture;
// ### tower
let towerFile = 'resources/images/characters_and_obstacles/tower/skeletonTower.png';
let towerTexture;
// ### faye
let fayeFile = 'resources/images/characters_and_obstacles/wizard/wizard-walk/Wizard-Walk_1.png';
let fayeTexture;

// ## obstacle
let obstacleSize = 50;
let grassFile = 'resources/images/characters_and_obstacles/example3.jpg';
let grassTexture;
let obstacleFile = 'resources/images/characters_and_obstacles/example4.jpg';
let obstacleTexture;

const charStatus = Object.freeze
( // ## Use charStatus to identify the status of the unit
    {
        NORMAL: 'normal',
        DYING: 'dying',
        INVINCIBLE: 'invincible',
        FREEZING: 'freezing',
        BLAMING: 'blaming',
        DEAD: 'dead',
        INCOMPETENT: 'incompetent',
    }
);

const charMoving = Object.freeze
( // ## Use charMoving to indentify the moving of the unit
    {
        UP_WALKING: 'up_w',
        DOWN_WALKING: 'down_w',
        LEFT_WALKING: 'left_w',
        RIGHT_WALKING: 'right_w',
        UP_ATTACK: 'up_a',
        DOWN_ATTACK: 'down_a',
        LEFT_ATTACK: 'left_a',
        RIGHT_ATTACK: 'right_a',
        IDLE: 'idle',
    }
);

// # entity
let chestFile = './resources/images/entities/Treasure_Chest_Close.png';

// # Paths

let level1ConfFile = './config/level1.json';
let level2ConfFile = './config/level2.json';
let level3ConfFile = './config/level3.json';
let level4ConfFile = './config/level4.json';

let level1BGTexture;
let level1LightTexture;
let level1BGFile = './resources/images/web_background//Dragon_Adventure_01.png'
let level1LightFile = './resources/images/web_background/Dragon_Adventure_01_Light.png';

let level2BGTexture;
let level2LightTexture;
let level2BGFile = './resources/images/web_background//Dragon_Adventure_01.png'
let level2LightFile = './resources/images/web_background/Dragon_Adventure_01_Light.png';
// # Level
let present_level;
let level1;
let level2;
let level3;
let level4;

// # bullet
let skeletonTowerFile = "resources/images/characters_and_obstacles/tower/skeletonBullet.png";

// #mapping
let image_map = 
{
    "soldier_idle": null,
    "skeletonTower_idle": null,
    "forestTower_idle": null,
    "magmaTower_idle": null,
    "waterTower_idle": null
};

let bullet_map = 
{
    "faye": null,
    "skeletonTower": null,
    "forestTower": null,
    "magmaTower": null,
    "waterTower": null,
};

// # Curtain
let transparentRadius = 30;
let transparentSectorRadius = 200;

// # SkillBar
let questionMarkTexture;
let questionMarkFile = "./resources/images/skillbar/questionMark.png";
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

// 预先导入图片
function preload()
{
    playerTexture = loadImage(playerFile);
    image_map["soldier_idle"] = loadImage(enemyFile);
    image_map["skeletonTower_idle"] = loadImage(towerFile);
    image_map["faye_idle"] = loadImage(fayeFile);
    image_map["chest1_idle"] = loadImage(chestFile);
    bullet_map["skeletonTower"] = loadImage(skeletonTowerFile);
    bullet_map["faye"] = loadImage(skeletonTowerFile);
    grassTexture = loadImage(grassFile);
    obstacleTexture = loadImage(obstacleFile);
    level1BGTexture = loadImage(level1BGFile);
    level1LightTexture = loadImage(level1LightFile);
    level2BGTexture = loadImage(level2BGFile);
    level2LightTexture = loadImage(level2LightFile);
    questionMarkTexture = loadImage(questionMarkFile);
}