const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

// 模拟 p5.js 环境
global.canvasWidth = 800;
global.canvasHeight = 600;
global.width = canvasWidth;
global.height = canvasHeight;

global.createCanvas = jest.fn().mockReturnValue({
    width: 800,
    height: 600,
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

global.image = jest.fn();
global.background = jest.fn();
global.text = jest.fn();
global.textSize = jest.fn();
global.fill = jest.fn();

// 模拟游戏状态
global.gameState = 'start';
global.isGameOver = false;
global.present_level = 0;
global.pausedState = false;
global.nextLevel = 0;

// 模拟视频对象
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

// 模拟图片资源
global.startImg = {};
global.levelSelectImg = {};
global.image_map = {
    start: { width: 800, height: 600 },
    levelSelect: { width: 800, height: 600 },
    background: { width: 800, height: 600 }
};

// 模拟游戏对象
global.g_skillTextureList = [];
global.g_skillStatusList = [];
global.g_skillNumList = [];
global.g_skillNumber = 8;

// 模拟游戏核心类
class Character {
    constructor(x, y, size, color, health, maxHealth, attack, status, speed, isInvincible, animations) {
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
        // 模拟动画更新
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

// 导出模拟的类
global.Character = Character;
global.Player = Player;
global.Enemy = Enemy;
global.Projectile = Projectile;
global.SpriteAnimator = SpriteAnimator;
global.SkillBar = SkillBar;
global.Curtain = Curtain;

// 模拟关卡对象
class Level {
    constructor(number, conf, bg, light, isSpecial) {
        this.number = number;
        this.conf = conf;
        this.bg = bg;
        this.light = light;
        this.isSpecial = isSpecial;
    }

    async init() {}
    start() {}
    update() {}
}

global.Level = Level;
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

// 模拟加载 JSON 数据
global.loadJsonData = jest.fn().mockImplementation((path, callback) => {
    callback({
        player: {
            position: { x: 100, y: 100 }
        },
        enemies: [],
        entities: [],
        obstacles: []
    });
});

// 模拟游戏常量
global.frameRate = 30;

// 模拟动画数据
global.animations = {
    player: {
        idleUp: { frames: [1, 2, 3], period: 300, loop: true },
        idleDown: { frames: [1, 2, 3], period: 300, loop: true },
        idleLeft: { frames: [1, 2, 3], period: 300, loop: true },
        idleRight: { frames: [1, 2, 3], period: 300, loop: true },
        walkUp: { frames: [1, 2, 3], period: 300, loop: true },
        walkDown: { frames: [1, 2, 3], period: 300, loop: true },
        walkLeft: { frames: [1, 2, 3], period: 300, loop: true },
        walkRight: { frames: [1, 2, 3], period: 300, loop: true }
    },
    grassSlime: {
        idleUp: { frames: [] },
        idleDown: { frames: [] },
        idleLeft: { frames: [] },
        idleRight: { frames: [] },
        moveUp: { frames: [] },
        moveDown: { frames: [] },
        moveLeft: { frames: [] },
        moveRight: { frames: [] }
    },
    ghostSlime: {
        idleUp: { frames: [] },
        idleDown: { frames: [] },
        idleLeft: { frames: [] },
        idleRight: { frames: [] },
        moveUp: { frames: [] },
        moveDown: { frames: [] },
        moveLeft: { frames: [] },
        moveRight: { frames: [] }
    },
    waterSlime: {
        idleUp: { frames: [] },
        idleDown: { frames: [] },
        idleLeft: { frames: [] },
        idleRight: { frames: [] },
        moveUp: { frames: [] },
        moveDown: { frames: [] },
        moveLeft: { frames: [] },
        moveRight: { frames: [] }
    },
    fireSlime: {
        idleUp: { frames: [] },
        idleDown: { frames: [] },
        idleLeft: { frames: [] },
        idleRight: { frames: [] },
        moveUp: { frames: [] },
        moveDown: { frames: [] },
        moveLeft: { frames: [] },
        moveRight: { frames: [] }
    }
};

// 模拟属性数据
global.attributes = {
    grassSlime: {
        health: 100,
        attack: 10,
        speed: 5
    },
    ghostSlime: {
        health: 40,
        attack: 4,
        speed: 4
    },
    waterSlime: {
        health: 60,
        attack: 6,
        speed: 2
    },
    fireSlime: {
        health: 70,
        attack: 7,
        speed: 3
    }
};

// 模拟关卡
global.level1 = {
    start: jest.fn(),
    update: jest.fn(),
    draw: jest.fn(),
    keyPressedInLevel: jest.fn(),
    player: {
        x: 100,
        y: 100,
        size: 50,
        display: jest.fn()
    }
};

// 模拟键盘状态
global.keyIsDown = jest.fn().mockReturnValue(false);

// 模拟游戏函数
global.startGame = jest.fn().mockImplementation(level => {
    gameState = 'playing';
    present_level = level;
    if (level === 2) {
        attributes.grassSlime.health = 150; // 第二关提高难度
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

global.draw = jest.fn();

// 添加事件监听器
document.addEventListener('keydown', event => {
    if (event.key === ' ') {
        if (gameState === 'start') {
            startStory1();
        } else if (gameState === 'story1') {
            startStory2();
        } else if (gameState === 'story2') {
            enterLevelSelect();
        }
    } else if (event.key === 'p') {
        pausedState = !pausedState;
        gameState = pausedState ? 'paused' : 'playing';
    } else if (gameState === 'playing') {
        level1.keyPressedInLevel(event);
    }
});

// 设置JSDOM环境
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

// 模拟p5.js函数
global.createCanvas = jest.fn().mockReturnValue({
    width: 800,
    height: 600
});

global.createButton = jest.fn().mockReturnValue({
    mousePressed: jest.fn(),
    position: jest.fn(),
    size: jest.fn()
});

global.createVideo = jest.fn().mockReturnValue({
    show: jest.fn(),
    play: jest.fn(),
    loop: jest.fn(),
    hide: jest.fn()
});

// 游戏常量
global.canvasWidth = 800;
global.canvasHeight = 600;
global.frameRate = 60;

// 游戏状态
global.gameState = 'start';
global.present_level = 0;
global.pausedState = false;
global.nextLevel = 0;

// 游戏资源
global.image_map = {};
global.animations = {};
global.g_skillTextureList = [];
global.g_skillStatusList = [];
global.g_skillNumList = [];
global.g_skillNumber = 8;

// 模拟游戏类
class Character {
    constructor(x, y, size, color, health, maxHealth, attack, status, speed, isPlayer, attributes) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.health = health;
        this.maxHealth = maxHealth;
        this.attack = attack;
        this.status = status;
        this.speed = speed;
        this.isPlayer = isPlayer;
        this.attributes = attributes;
        this.invincibleTimer = 0;
    }

    changeHealth(amount) {
        this.health = Math.max(0, Math.min(this.maxHealth, this.health + amount));
        if (this.health === 0) {
            this.status = 'DEAD';
        }
    }

    changeStatus(status) {
        this.status = status;
        if (status === 'INVINCIBLE') {
            this.invincibleTimer = 60;
        }
    }
}

class Player extends Character {
    constructor(x, y, size, color, health, maxHealth, attack, status, speed,
                mana, maxMana, attackType, attackCd, attackType2, attack2, speed2,
                maxMana2, color2, attackType3, isPlayer, attributes, projectiles) {
        super(x, y, size, color, health, maxHealth, attack, status, speed, isPlayer, attributes);
        this.mana = mana;
        this.maxMana = maxMana;
        this.attackType = attackType;
        this.attackCd = attackCd;
        this.attackCdTimer = 0;
        this.attackType2 = attackType2;
        this.attack2 = attack2;
        this.speed2 = speed2;
        this.maxMana2 = maxMana2;
        this.color2 = color2;
        this.attackType3 = attackType3;
        this.projectiles = projectiles || [];
        this.lastDirection = 'right';
    }

    update() {
        if (global.keyIsDown('ArrowRight')) {
            this.x += this.speed;
            this.lastDirection = 'right';
        }
        if (global.keyIsDown('ArrowLeft')) {
            this.x -= this.speed;
            this.lastDirection = 'left';
        }
        if (global.keyIsDown('ArrowUp')) {
            this.y -= this.speed;
        }
        if (global.keyIsDown('ArrowDown')) {
            this.y += this.speed;
        }
    }

    shoot() {
        if (this.attackCdTimer <= 0) {
            this.projectiles.push(new Projectile(this.x, this.y, 1, 0, 10, 5, 200, 'blue', 'fire'));
            this.attackCdTimer = this.attackCd;
        }
    }

    aoe() {
        if (this.attackCdTimer <= 0) {
            for (let i = 0; i < 8; i++) {
                this.projectiles.push(new Projectile(this.x, this.y, Math.cos(i * Math.PI / 4), Math.sin(i * Math.PI / 4), 10, 5, 200, 'blue', 'fire'));
            }
            this.attackCdTimer = this.attackCd;
        }
    }
}

class Enemy extends Character {
    constructor(id, x, y, size, color, health, maxHealth, attack, status, speed,
                path, mana, maxMana, attackType, attackCd, attackType2, attack2,
                speed2, maxMana2, color2, attackType3, isPlayer, attributes) {
        super(x, y, size, color, health, maxHealth, attack, status, speed, isPlayer, attributes);
        this.id = id;
        this.path = path;
        this.mana = mana;
        this.maxMana = maxMana;
        this.attackType = attackType;
        this.attackCd = attackCd;
        this.attackCdTimer = 0;
        this.attackType2 = attackType2;
        this.attack2 = attack2;
        this.speed2 = speed2;
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

        if (this.attackCdTimer <= 0) {
            this.projectiles.push(new Projectile(this.x, this.y, 1, 0, 10, 5, 200, 'blue', 'fire'));
            this.attackCdTimer = this.attackCd;
        }
    }
}

class Projectile {
    constructor(x, y, dx, dy, speed, size, damage, color, type) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = speed;
        this.size = size;
        this.damage = damage;
        this.color = color;
        this.type = type;
    }

    update() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }

    isHit(character) {
        const dx = this.x - character.x;
        const dy = this.y - character.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < (this.size + character.size) / 2;
    }
}

class SpriteAnimator {
    constructor(animations) {
        this.animations = animations;
        this.currentState = 'idleUp';
        this.currentIndex = 0;
        this.timer = 0;
    }

    setState(state) {
        if (this.currentState !== state) {
            this.currentState = state;
            this.currentIndex = 0;
            this.timer = 0;
        }
    }

    update() {
        this.timer += 1;
        if (this.timer >= this.animations[this.currentState].period) {
            this.timer = 0;
            this.currentIndex = (this.currentIndex + 1) % this.animations[this.currentState].frames.length;
        }
    }
}

class SkillBar {
    constructor(skillNumber, skillTextureList, skillStatusList, statusList, numberList, x, y, width, height, gap, size) {
        this.skillNumber = skillNumber;
        this.skillTextureList = skillTextureList;
        this.skillStatusList = skillStatusList;
        this.statusList = statusList;
        this.numberList = numberList;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gap = gap;
        this.size = size;
    }

    addSkill(index) {
        this.statusList[index] = true;
        this.numberList[index] = 1;
    }

    useSkill(index, isAoe) {
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
        this.lastDirection = 'right';
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
    constructor(id, jsonData, image_map, animations, isPlayer) {
        this.id = id;
        this.jsonData = jsonData;
        this.image_map = image_map;
        this.animations = animations;
        this.isPlayer = isPlayer;
        this.player = null;
        this.enemies = [];
        this.obstacles = [];
    }

    async init() {
        this.jsonData = await loadJsonData();
    }

    start() {
        this.player = new Player(100, 100, 50, 'red', 100, 100, 10, 'NORMAL', 5,
            100, 200, 'shooting', 30, 'normal', 10, 5, 200, 'blue', 'fire',
            true, {}, []);
        this.enemies = [];
        this.obstacles = [];
    }

    update() {
        if (this.player) {
            this.player.update();
            this.player.display = jest.fn();
        }
    }

    keyPressedInLevel = jest.fn();
}

// 模拟游戏函数
global.setup = jest.fn().mockImplementation(async () => {
    createCanvas(canvasWidth, canvasHeight);
    createButton('开始游戏');
    createButton('跳过');
    createVideo('story1.mp4');
    createVideo('story2.mp4');
    await loadJsonData();
});

global.draw = jest.fn().mockImplementation(() => {
    if (gameState === 'start') {
        background();
    } else if (gameState === 'story1') {
        story1Video.show();
    } else if (gameState === 'story2') {
        story2Video.show();
    } else if (gameState === 'levelSelect') {
        background();
    } else if (gameState === 'playing') {
        level1.draw();
    }
});

global.background = jest.fn();
global.story1Video = createVideo('story1.mp4');
global.story2Video = createVideo('story2.mp4');
global.level1 = new Level(1, {}, {}, {}, false);

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

global.startGame = jest.fn().mockImplementation((level) => {
    present_level = level;
    gameState = 'playing';
});

global.restartGame = jest.fn().mockImplementation(() => {
    gameState = 'start';
    present_level = 0;
});

global.loadJsonData = jest.fn().mockResolvedValue({
    player: {
        position: { x: 100, y: 100 }
    },
    enemies: [],
    entities: [],
    obstacles: []
});

// 模拟键盘事件
global.keyIsDown = jest.fn().mockReturnValue(false);

// 模拟性能API
global.performance = {
    now: jest.fn().mockReturnValue(0)
}; 