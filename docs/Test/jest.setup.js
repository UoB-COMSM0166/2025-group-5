const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

// Game constants
global.canvasWidth = 1280;
global.canvasHeight = 800;
global.width = canvasWidth;
global.height = canvasHeight;
global.frameRate = 60;
global.HealthBarHeight = 5;
global.globalInvincibleTimer = 90;
global.globalWaterStatusTimer = 180;
global.globalFireStatusTimer = 120;

// Game states
global.gameState = 'start';
global.isGameOver = false;
global.present_level = 0;
global.pausedState = false;
global.nextLevel = 0;

// Define all classes
class Character {
    constructor(x, y, size, color, health, maxHealth, attack, status, speed, isInvincible, animations, isPlayer = false) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.health = health;
        this.maxHealth = maxHealth;
        this.attack = attack;
        this.status = status;
        this.speed = speed;
        this.isInvincible = isInvincible;
        this.animations = animations;
        this.invincibleTimer = 0;
        this.isPlayer = isPlayer;
        this.display = jest.fn();
    }

    changeHealth(amount) {
        this.health = Math.max(0, Math.min(this.maxHealth, this.health + amount));
        if (this.health === 0) {
            this.status = 'DEAD';
        }
    }

    changeStatus(newStatus) {
        this.status = newStatus;
        if (newStatus === 'INVINCIBLE') {
            this.invincibleTimer = 60;
        }
    }

    update() {
        // Add default update method
    }
}

class Player extends Character {
    constructor(x, y, size, color, health, maxHealth, attack, status, speed,
                mana, maxMana, attackType, attackCd, attackType2, attack2, attackCd2,
                maxMana2, color2, attackType3, isInvincible, animations, projectiles) {
        super(x, y, size, color, health, maxHealth, attack, status, speed, isInvincible, animations);
        this.mana = mana;
        this.maxMana = maxMana;
        this.attackType = attackType;
        this.attackCd = attackCd;
        this.attackType2 = attackType2;
        this.attack2 = attack2;
        this.attackCd2 = attackCd2;
        this.maxMana2 = maxMana2;
        this.color2 = color2;
        this.attackType3 = attackType3;
        this.projectiles = projectiles || [];
        this.attackCdTimer = 0;
        this.lastDirection = 'right';
    }

    update() {
        if (keyIsDown('ArrowRight')) {
            this.x += this.speed;
            this.lastDirection = 'right';
        }
    }

    shoot() {
        if (this.attackCdTimer === 0) {
            this.projectiles.push({});
            this.attackCdTimer = this.attackCd;
        }
    }

    aoe() {
        if (this.attackCdTimer === 0) {
            for (let i = 0; i < 8; i++) {
                this.projectiles.push({});
            }
            this.attackCdTimer = this.attackCd;
        }
    }
}

class Enemy extends Character {
    constructor(id, x, y, size, color, health, maxHealth, attack, status, speed,
                patrolPoints, mana, maxMana, attackType, attackCd, attackType2,
                attack2, attackCd2, maxMana2, color2, attackType3, isInvincible, animations) {
        super(x, y, size, color, health, maxHealth, attack, status, speed, isInvincible, animations);
        this.id = id;
        this.patrolPoints = patrolPoints;
        this.mana = mana;
        this.maxMana = maxMana;
        this.attackType = attackType;
        this.attackCd = attackCd;
        this.attackType2 = attackType2;
        this.attack2 = attack2;
        this.attackCd2 = attackCd2;
        this.maxMana2 = maxMana2;
        this.color2 = color2;
        this.attackType3 = attackType3;
        this.projectiles = [];
        this.findPalyer = false;
    }

    update(level) {
        if (this.findPalyer) {
            const dx = level.player.x - this.x;
            const dy = level.player.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0) {
                this.x += (dx / dist) * this.speed;
                this.y += (dy / dist) * this.speed;
            }
        } else {
            this.x += 1;
            this.y += 1;
        }
        this.projectiles.push({});
    }
}

class Projectile {
    constructor(x, y, dx, dy, speed, damage, range, color, type) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = speed;
        this.damage = damage;
        this.range = range;
        this.color = color;
        this.type = type;
    }

    update() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }

    isHit(character) {
        const dx = character.x - this.x;
        const dy = character.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < character.size;
    }
}

class SpriteAnimator {
    constructor(animations) {
        this.animations = animations;
        this.currentState = '';
        this.currentIndex = 0;
    }

    setState(state) {
        this.currentState = state;
        this.currentIndex = 0;
    }

    update() {
        // Simulate animation update
    }
}

class SkillBar {
    constructor(maxSkills, textures, statusList, numberList, x, y, width, height, padding, gap) {
        this.maxSkills = maxSkills;
        this.textures = textures;
        this.statusList = statusList;
        this.numberList = numberList;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.gap = gap;
    }

    addSkill(index) {
        this.statusList[index] = true;
        this.numberList[index] = 1;
    }

    useSkill(index, isSpecial) {
        if (this.statusList[index] && this.numberList[index] > 0) {
            this.numberList[index]--;
            return true;
        }
        return false;
    }
}

class Curtain {
    constructor(width, height, color, px, py, radius, shape, sectorRadius) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.px = px;
        this.py = py;
        this.radius = radius;
        this.shape = shape;
        this.sectorRadius = sectorRadius;
        this.lastDirection = '';
    }

    update(px, py, radius, shape, sectorRadius, lastDirection) {
        this.px = px;
        this.py = py;
        this.radius = radius;
        this.shape = shape;
        this.sectorRadius = sectorRadius;
        this.lastDirection = lastDirection;
    }
}

class Level {
    constructor(id, jsonFile, bGTexture, lightTexture, curtainFlag) {
        this.id = id;
        this.jsonFile = jsonFile;
        this.bGTexture = bGTexture;
        this.lightTexture = lightTexture;
        this.curtainFlag = curtainFlag;
        this.player = null;
        this.enemies = [];
        this.projectiles = [];
        this.entities = [];
        this.obstacles = [];
        this.isSpecial = false;
        this.transformFlag = false;
        this.promptFlag = false;
        this.endFlag = false;
        this.endAnimation = false;
        this.endTimer = 0;
        this.startAnimation = true;
        this.startTimer = 0;
    }

    async init() {
        // Initialize level
        return Promise.resolve();
    }

    start() {
        // Start level
        this.player = new Character(100, 100, 50, 'red', 100, 100, 10, 'NORMAL', 5, true, {}, true);
    }

    update() {
        // Update level state
        if (this.player) {
            this.player.update();
            this.player.display();
        }
        this.enemies.forEach(enemy => enemy.update(this));
    }

    reset() {
        this.player = null;
        this.enemies = [];
        this.projectiles = [];
        this.entities = [];
        this.obstacles = [];
        this.transformFlag = false;
        this.promptFlag = false;
        this.endFlag = false;
        this.endAnimation = false;
        this.endTimer = 0;
        this.startAnimation = true;
        this.startTimer = 0;
    }
}

// Add classes to global object
global.Character = Character;
global.Player = Player;
global.Enemy = Enemy;
global.Projectile = Projectile;
global.SpriteAnimator = SpriteAnimator;
global.SkillBar = SkillBar;
global.Curtain = Curtain;
global.Level = Level;

// Mock canvas and UI elements
global.createCanvas = jest.fn().mockReturnValue({
    width: canvasWidth,
    height: canvasHeight,
    getContext: jest.fn().mockReturnValue({
        fillRect: jest.fn(),
        drawImage: jest.fn(),
        clearRect: jest.fn(),
        beginPath: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        stroke: jest.fn(),
        closePath: jest.fn()
    })
});

global.createButton = jest.fn().mockReturnValue({
    mousePressed: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    position: jest.fn(),
    size: jest.fn(),
    style: jest.fn()
});

global.createVideo = jest.fn().mockReturnValue({
    show: jest.fn(),
    hide: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    loop: jest.fn(),
    volume: jest.fn()
});

// Mock video objects
global.story1Video = {
    show: jest.fn(),
    hide: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    loop: jest.fn()
};

global.story2Video = {
    show: jest.fn(),
    hide: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    loop: jest.fn()
};

// Mock image assets
global.startImg = {};
global.levelSelectImg = {};
global.image_map = {
    start: { width: canvasWidth, height: canvasHeight },
    levelSelect: { width: canvasWidth, height: canvasHeight },
    background: { width: canvasWidth, height: canvasHeight }
};

// Mock game objects
global.g_skillTextureList = [];
global.g_skillStatusList = [];
global.g_skillNumList = [];
global.g_skillNumber = 8;

// Game attributes configuration
global.attributes = {
    grassSlime: { health: 150 },
    ghostSlime: { health: 100 },
    waterSlime: { health: 120 },
    fireSlime: { health: 130 }
};

// Mock level1 object
global.level1 = new Level(1, 'level1.json', {}, {}, true);
level1.player = new Player(400, 300, 30, 'blue', 100, 100, 10, 'NORMAL', 5, 50, 100, 'single', 30, 'aoe', 20, 30, 100, 'red', 'special', false, {}, []);
level1.start = jest.fn();
level1.update = jest.fn();
level1.reset = jest.fn();
level1.keyPressedInLevel = jest.fn();

// Mock game functions
global.setup = jest.fn().mockImplementation(async () => {
    createCanvas(canvasWidth, canvasHeight);
    const startButton = createButton('Start Game');
    const skipButton = createButton('Skip');
    const story1Video = createVideo('assets/videos/story1.mp4');
    const story2Video = createVideo('assets/videos/story2.mp4');
    
    // Load resources
    image_map.start = { width: canvasWidth, height: canvasHeight };
    image_map.levelSelect = { width: canvasWidth, height: canvasHeight };
    image_map.background = { width: canvasWidth, height: canvasHeight };
    
    // Initialize skill list
    for (let i = 0; i < g_skillNumber; i++) {
        g_skillTextureList.push({});
        g_skillStatusList.push(false);
        g_skillNumList.push(0);
    }
    
    return Promise.resolve();
});

global.draw = jest.fn();

// Add keyboard event handling
document.addEventListener('keydown', (event) => {
    if (event.key === 'p') {
        pausedState = !pausedState;
        gameState = pausedState ? 'paused' : 'playing';
    } else if (gameState === 'playing') {
        level1.keyPressedInLevel(event);
    }
});

// Mock loading JSON data
global.loadJsonData = jest.fn().mockImplementation(() => Promise.resolve({
    player: {
        position: { x: 100, y: 100 }
    },
    enemies: [],
    entities: [],
    obstacles: []
}));

// Other global functions
global.image = jest.fn();
global.background = jest.fn();
global.text = jest.fn();
global.textSize = jest.fn();
global.fill = jest.fn();
global.keyIsDown = jest.fn().mockReturnValue(false);

// Other global variables
global.animations = {};
global.level1ConfFile = {};
global.level2ConfFile = {};
global.level3ConfFile = {};
global.level4ConfFile = {};
global.level1BGTexture = {};
global.level2BGTexture = {};
global.level3BGTexture = {};
global.level4BGTexture = {};
global.level1LightTexture = {};
global.level2LightTexture = {};
global.level3LightTexture = {};
global.level4LightTexture = {};

// Export all classes
module.exports = {
    Character,
    Player,
    Enemy,
    Projectile,
    SpriteAnimator,
    SkillBar,
    Curtain,
    Level
};

global.startGame = jest.fn().mockImplementation(level => {
    gameState = 'playing';
    present_level = level;
    level1.start();
    if (level === 2) {
        attributes.grassSlime.health = 150; // Increase difficulty in level 2
    }
});

global.startStory1 = jest.fn().mockImplementation(() => {
    gameState = 'story1';
    story1Video.show();
    story1Video.play();
});

global.startStory2 = jest.fn().mockImplementation(() => {
    gameState = 'story2';
    story2Video.show();
    story2Video.loop();
});

global.enterLevelSelect = jest.fn().mockImplementation(() => {
    gameState = 'levelSelect';
});

global.restartGame = jest.fn().mockImplementation(() => {
    gameState = 'start';
    present_level = 0;
});

global.draw = jest.fn().mockImplementation(() => {
    background();
    if (gameState === 'start') {
        image(startImg, 0, 0);
    } else if (gameState === 'story1') {
        story1Video.show();
        story1Video.play();
    } else if (gameState === 'story2') {
        story2Video.show();
        story2Video.loop();
    } else if (gameState === 'levelSelect') {
        image(levelSelectImg, 0, 0);
    } else if (gameState === 'playing') {
        // Draw game scene
    }
});

global.setup = async function() {
    createCanvas(canvasWidth, canvasHeight);
    const startButton = createButton('Start Game');
    const skipButton = createButton('Skip');
    const story1Video = createVideo('assets/videos/story1.mp4');
    const story2Video = createVideo('assets/videos/story2.mp4');
    
    // Load resources
    image_map.start = { width: canvasWidth, height: canvasHeight };
    image_map.levelSelect = { width: canvasWidth, height: canvasHeight };
    image_map.background = { width: canvasWidth, height: canvasHeight };
    
    // Initialize skill list
    for (let i = 0; i < g_skillNumber; i++) {
        g_skillTextureList.push({});
        g_skillStatusList.push(false);
        g_skillNumList.push(0);
    }
    
    return Promise.resolve();
};

// Add level instance
global.level1 = new Level(1, level1ConfFile, level1BGTexture, level1LightTexture, true);
level1.start = jest.fn();