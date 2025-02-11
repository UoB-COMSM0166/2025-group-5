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

// # Game values
// Character
let HealthBarHeight = 5;

// ## Player
let playerInitHealth = 100;
let maxAttack = 100; // max attack of all the units
let playerInitAttack = 5;
let maxSpeed = 5; // max speed of all the units
let playerInitSpeed = 2;
let playerSize = 50;
let playerTexture;

// ## Enemy
// ### Soldier
let soldierHealth = 10;
let soldierAttack = 5;
let soldierSpeed = 1;
let soldierSize = 40;
let enemyTexture;

// ## obstacle
let obstacleSize = 50;
let grassTexture;
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