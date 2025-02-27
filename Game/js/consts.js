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

// Game values
// # Character
let HealthBarHeight = 5;

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

// ## obstacle
let obstacleSize = 50;
let grassFile = 'resources/images/characters_and_obstacles/example3.jpg';
let grassTexture;
let obstacleFile = 'resources/images/characters_and_obstacles/example4.jpg';
let obstacleTexture;

// # Paths
let attributeFile = './config/attribute.json';
let level1ConfFile = './config/level1.json';
let level2ConfFile = './config/level2.json';
let level3ConfFile = './config/level3.json';
let level4ConfFile = './config/level4.json';

let level1BGFile = './resources/images/game_background/level1.png'
let level1BGTexture;

// # Level
let level1;
let level2;
let level3;
let level4;

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