const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

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
    elt: {
        offsetLeft: 0,
        offsetTop: 0
    }
});

global.createButton = jest.fn().mockReturnValue({
    hide: jest.fn().mockReturnThis(),
    show: jest.fn().mockReturnThis(),
    position: jest.fn().mockReturnThis(),
    size: jest.fn().mockReturnThis(),
    mousePressed: jest.fn().mockReturnThis(),
    remove: jest.fn()
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

// 模拟视频对象
global.story1Video = {
    size: jest.fn().mockReturnThis(),
    position: jest.fn().mockReturnThis(),
    attribute: jest.fn().mockReturnThis(),
    show: jest.fn().mockReturnThis(),
    hide: jest.fn().mockReturnThis(),
    play: jest.fn().mockReturnThis(),
    stop: jest.fn().mockReturnThis(),
    loop: jest.fn().mockReturnThis(),
    onended: jest.fn()
};

global.story2Video = {
    size: jest.fn().mockReturnThis(),
    position: jest.fn().mockReturnThis(),
    attribute: jest.fn().mockReturnThis(),
    show: jest.fn().mockReturnThis(),
    hide: jest.fn().mockReturnThis(),
    play: jest.fn().mockReturnThis(),
    stop: jest.fn().mockReturnThis(),
    loop: jest.fn().mockReturnThis()
};

// 模拟图片资源
global.startImg = {};
global.levelSelectImg = {};
global.image_map = {
    'grassSlime_idle': {},
    'ghostSlime_idle': {},
    'waterSlime_idle': {},
    'fireSlime_idle': {},
    'grassWizard_idle': {},
    'ghostWizard_idle': {},
    'waterWizard_idle': {},
    'fireWizard_idle': {}
};

// 模拟游戏对象
global.g_skillTextureList = [];
global.g_skillStatusList = [];
global.g_skillNumList = [];
global.g_skillNumber = 8;

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
global.loadJsonData = jest.fn().mockResolvedValue({}); 