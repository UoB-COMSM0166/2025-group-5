let gameState = 'start'; // 游戏状态 start/playing/over
let startButton;
let gameTitle;

let player;
let enemies = [];
let obstacles = [];
const enemyCount = 5;
const obstacleCount = 5;
let isGameOver = false;

let playerTexture;
let enemyTexture;
let grassTexture;
let obstacleTexture;