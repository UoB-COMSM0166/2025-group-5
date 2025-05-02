// 游戏测试文件
const { expect } = require('chai');
const sinon = require('sinon');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// 模拟DOM环境
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// 模拟p5.js环境
global.createCanvas = sinon.stub().returns({
    elt: {
        offsetLeft: 0,
        offsetTop: 0
    }
});
global.createButton = sinon.stub().returns({
    hide: sinon.spy(),
    show: sinon.spy(),
    position: sinon.spy(),
    size: sinon.spy(),
    mousePressed: sinon.spy(),
    remove: sinon.spy()
});
global.loadJsonData = sinon.stub().resolves({});
global.image = sinon.spy();
global.background = sinon.spy();
global.text = sinon.spy();
global.textSize = sinon.spy();
global.fill = sinon.spy();
global.width = 800;
global.height = 600;

// 导入被测试的代码
const { setup, startStory1, startStory2, enterLevelSelect, startGame, restartGame, draw, keyPressed } = require('../init.js');

describe('游戏状态管理测试', () => {
    beforeEach(() => {
        // 重置所有状态
        gameState = 'start';
        story1Video = {
            show: sinon.spy(),
            hide: sinon.spy(),
            play: sinon.spy(),
            stop: sinon.spy(),
            onended: sinon.spy()
        };
        story2Video = {
            show: sinon.spy(),
            hide: sinon.spy(),
            loop: sinon.spy(),
            stop: sinon.spy()
        };
        skipButton = null;
        level1Button = null;
        level2Button = null;
        startButton = {
            hide: sinon.spy(),
            show: sinon.spy(),
            position: sinon.spy(),
            mousePressed: sinon.spy()
        };
    });

    it('测试游戏状态转换', async () => {
        // 1. 初始状态检查
        expect(gameState).to.equal('start');
        expect(startButton.hide.called).to.be.true;

        // 2. 开始游戏状态转换
        keyPressed({ key: ' ' });
        expect(gameState).to.equal('story1');
        expect(story1Video.show.called).to.be.true;
        expect(story1Video.play.called).to.be.true;
        expect(createButton.calledWith('Skip')).to.be.true;

        // 3. 故事1到故事2转换
        story1Video.onended.getCall(0).args[0]();
        expect(gameState).to.equal('story2');
        expect(story2Video.show.called).to.be.true;
        expect(story2Video.loop.called).to.be.true;
        expect(skipButton).to.be.null;

        // 4. 进入关卡选择
        keyPressed({ key: ' ' });
        expect(gameState).to.equal('levelSelect');
        expect(story1Video.hide.called).to.be.true;
        expect(story1Video.stop.called).to.be.true;
        expect(story2Video.hide.called).to.be.true;
        expect(story2Video.stop.called).to.be.true;
    });
});

describe('关卡系统测试', () => {
    beforeEach(() => {
        level1 = {
            init: sinon.stub().resolves(),
            start: sinon.spy(),
            update: sinon.spy(),
            keyPressedInLevel: sinon.spy()
        };
        level2 = {
            init: sinon.stub().resolves(),
            start: sinon.spy(),
            update: sinon.spy(),
            keyPressedInLevel: sinon.spy()
        };
        bulletSpeed = 0;
        spawnInterval = 0;
        present_level = 0;
    });

    it('测试关卡初始化', async () => {
        await setup();
        expect(level1.init.called).to.be.true;
        expect(level2.init.called).to.be.true;
    });

    it('测试关卡切换', () => {
        // 选择关卡1
        startGame(1);
        expect(gameState).to.equal('playing');
        expect(bulletSpeed).to.equal(3);
        expect(spawnInterval).to.equal(30);
        expect(present_level).to.equal(1);
        expect(level1.start.called).to.be.true;

        // 选择关卡2
        startGame(2);
        expect(gameState).to.equal('playing');
        expect(bulletSpeed).to.equal(5);
        expect(spawnInterval).to.equal(20);
        expect(present_level).to.equal(2);
        expect(level2.start.called).to.be.true;
    });
});

describe('资源管理测试', () => {
    beforeEach(() => {
        g_skillTextureList = [];
        g_skillStatusList = [];
        g_skillNumList = [];
        g_skillNumber = 5;
    });

    it('测试资源加载', async () => {
        await setup();
        
        // 验证视频资源
        expect(story1Video.size).to.be.calledWith(canvasWidth, canvasHeight);
        expect(story2Video.size).to.be.calledWith(canvasWidth, canvasHeight);
        
        // 验证技能资源
        expect(g_skillTextureList.length).to.equal(5);
        expect(g_skillStatusList.length).to.equal(5);
        expect(g_skillNumList.length).to.equal(5);
        
        // 验证属性配置
        expect(attributes).to.be.an('object');
    });
});

describe('游戏控制测试', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 1;
    });

    it('测试键盘控制', () => {
        // 开始游戏控制
        keyPressed({ key: ' ' });
        expect(gameState).to.equal('story1');

        // 故事跳过控制
        gameState = 'story2';
        keyPressed({ key: ' ' });
        expect(gameState).to.equal('levelSelect');

        // 游戏内控制
        gameState = 'playing';
        present_level = 1;
        keyPressed({ key: 'ArrowLeft' });
        expect(level1.keyPressedInLevel.called).to.be.true;
    });
});

describe('音频系统测试', () => {
    beforeEach(() => {
        gameMusic = {
            playBackground: sinon.spy()
        };
    });

    it('测试音频控制', () => {
        // 模拟页面加载
        window.onload();
        expect(gameMusic.playBackground.called).to.be.false;

        // 模拟首次点击
        document.dispatchEvent(new Event('click'));
        expect(gameMusic.playBackground.called).to.be.true;

        // 验证事件监听器只触发一次
        document.dispatchEvent(new Event('click'));
        expect(gameMusic.playBackground.callCount).to.equal(1);
    });
});

describe('游戏主循环测试', () => {
    beforeEach(() => {
        gameState = 'start';
        startImg = {};
        levelSelectImg = {};
    });

    it('测试游戏主循环', () => {
        // 测试开始状态
        draw();
        expect(image.calledWith(startImg, 0, 0, width, height)).to.be.true;

        // 测试故事状态
        gameState = 'story1';
        draw();
        expect(background.calledWith(0)).to.be.true;

        // 测试关卡选择状态
        gameState = 'levelSelect';
        draw();
        expect(image.calledWith(levelSelectImg, 0, 0, width, height)).to.be.true;

        // 测试游戏进行状态
        gameState = 'playing';
        present_level = 1;
        draw();
        expect(level1.update.called).to.be.true;

        // 测试游戏结束状态
        gameState = 'over';
        draw();
        expect(text.calledWith('Game Over', width / 2 - 80, height / 2)).to.be.true;
        expect(startButton.show.called).to.be.true;
    });
});

describe('游戏状态管理扩展测试', () => {
    beforeEach(() => {
        gameState = 'start';
        story1Video = {
            show: sinon.spy(),
            hide: sinon.spy(),
            play: sinon.spy(),
            stop: sinon.spy(),
            onended: sinon.spy()
        };
        story2Video = {
            show: sinon.spy(),
            hide: sinon.spy(),
            loop: sinon.spy(),
            stop: sinon.spy()
        };
    });

    it('测试状态转换路径', () => {
        // 测试所有可能的状态转换路径
        const stateTransitions = [
            ['start', 'story1'],
            ['story1', 'story2'],
            ['story2', 'levelSelect'],
            ['levelSelect', 'playing'],
            ['playing', 'over'],
            ['over', 'start']
        ];

        stateTransitions.forEach(([from, to]) => {
            gameState = from;
            // 根据状态执行相应的转换操作
            switch(from) {
                case 'start':
                    keyPressed({ key: ' ' });
                    break;
                case 'story1':
                    story1Video.onended.getCall(0).args[0]();
                    break;
                case 'story2':
                    keyPressed({ key: ' ' });
                    break;
                case 'levelSelect':
                    startGame(1);
                    break;
                case 'playing':
                    // 模拟游戏结束条件
                    isGameOver = true;
                    break;
                case 'over':
                    restartGame();
                    break;
            }
            expect(gameState).to.equal(to);
        });
    });

    it('测试状态转换边界条件', () => {
        // 测试无效状态转换
        gameState = 'invalid';
        keyPressed({ key: ' ' });
        expect(gameState).to.equal('invalid');

        // 测试重复状态转换
        gameState = 'story1';
        keyPressed({ key: ' ' });
        expect(gameState).to.equal('story1');
    });
});

describe('关卡系统扩展测试', () => {
    beforeEach(() => {
        level1 = {
            init: sinon.stub().resolves(),
            start: sinon.spy(),
            update: sinon.spy(),
            keyPressedInLevel: sinon.spy(),
            checkCollision: sinon.spy(),
            spawnEnemy: sinon.spy()
        };
        level2 = {
            init: sinon.stub().resolves(),
            start: sinon.spy(),
            update: sinon.spy(),
            keyPressedInLevel: sinon.spy(),
            checkCollision: sinon.spy(),
            spawnEnemy: sinon.spy()
        };
    });

    it('测试关卡内部逻辑', () => {
        // 1. 碰撞检测
        level1.checkCollision.returns(true);
        level1.update();
        expect(level1.checkCollision.called).to.be.true;

        // 2. 敌人生成
        level1.spawnEnemy.returns({ x: 100, y: 100 });
        level1.update();
        expect(level1.spawnEnemy.called).to.be.true;

        // 3. 关卡进度
        level1.progress = 0.5;
        level1.update();
        expect(level1.progress).to.be.above(0);
    });

    it('测试关卡资源管理', () => {
        // 1. 资源预加载
        level1.preloadResources = sinon.spy();
        level1.init();
        expect(level1.preloadResources.called).to.be.true;

        // 2. 资源释放
        level1.releaseResources = sinon.spy();
        level1.stop();
        expect(level1.releaseResources.called).to.be.true;
    });
});

describe('游戏对象系统测试', () => {
    beforeEach(() => {
        player = {
            x: 400,
            y: 300,
            speed: 5,
            health: 100,
            update: sinon.spy(),
            move: sinon.spy(),
            takeDamage: sinon.spy()
        };
        enemies = [];
        bullets = [];
    });

    it('测试游戏对象生命周期', () => {
        // 1. 对象创建
        const enemy = { x: 100, y: 100, health: 50 };
        enemies.push(enemy);
        expect(enemies.length).to.equal(1);

        // 2. 对象更新
        player.update();
        expect(player.update.called).to.be.true;

        // 3. 对象销毁
        enemy.health = 0;
        enemies = enemies.filter(e => e.health > 0);
        expect(enemies.length).to.equal(0);
    });

    it('测试对象交互', () => {
        // 1. 碰撞检测
        const bullet = { x: 400, y: 300, damage: 10 };
        bullets.push(bullet);
        player.takeDamage(bullet.damage);
        expect(player.takeDamage.calledWith(bullet.damage)).to.be.true;
        expect(player.health).to.equal(90);

        // 2. 移动限制
        player.move(1000, 1000);
        expect(player.x).to.be.below(800);
        expect(player.y).to.be.below(600);
    });
});

describe('技能系统测试', () => {
    beforeEach(() => {
        skills = {
            fireball: {
                cooldown: 1000,
                damage: 20,
                lastUsed: 0,
                use: sinon.spy()
            },
            shield: {
                cooldown: 2000,
                duration: 5000,
                active: false,
                use: sinon.spy()
            }
        };
    });

    it('测试技能冷却机制', () => {
        // 1. 技能使用
        skills.fireball.use();
        expect(skills.fireball.use.called).to.be.true;
        expect(skills.fireball.lastUsed).to.be.above(0);

        // 2. 冷却检查
        const canUse = Date.now() - skills.fireball.lastUsed > skills.fireball.cooldown;
        expect(canUse).to.be.false;
    });

    it('测试技能效果', () => {
        // 1. 伤害技能
        const enemy = { health: 100 };
        skills.fireball.use(enemy);
        expect(enemy.health).to.equal(80);

        // 2. 防御技能
        skills.shield.use();
        expect(skills.shield.active).to.be.true;
        setTimeout(() => {
            expect(skills.shield.active).to.be.false;
        }, skills.shield.duration);
    });
});

describe('游戏事件系统测试', () => {
    beforeEach(() => {
        eventListeners = {
            'gameStart': [],
            'gameOver': [],
            'levelComplete': [],
            'enemyKilled': []
        };
    });

    it('测试事件订阅和发布', () => {
        // 1. 事件订阅
        const handler = sinon.spy();
        eventListeners['gameStart'].push(handler);
        expect(eventListeners['gameStart'].length).to.equal(1);

        // 2. 事件发布
        const event = { type: 'gameStart', data: {} };
        eventListeners['gameStart'].forEach(h => h(event));
        expect(handler.calledWith(event)).to.be.true;

        // 3. 事件取消订阅
        eventListeners['gameStart'] = eventListeners['gameStart'].filter(h => h !== handler);
        expect(eventListeners['gameStart'].length).to.equal(0);
    });
});

describe('游戏数据持久化测试', () => {
    beforeEach(() => {
        gameData = {
            level: 1,
            score: 0,
            unlockedSkills: ['fireball'],
            settings: {
                sound: true,
                music: true,
                difficulty: 'normal'
            }
        };
    });

    it('测试数据保存和加载', () => {
        // 1. 数据保存
        const saveData = JSON.stringify(gameData);
        localStorage.setItem('gameSave', saveData);
        expect(localStorage.getItem('gameSave')).to.equal(saveData);

        // 2. 数据加载
        const loadedData = JSON.parse(localStorage.getItem('gameSave'));
        expect(loadedData.level).to.equal(gameData.level);
        expect(loadedData.score).to.equal(gameData.score);

        // 3. 数据验证
        expect(loadedData.unlockedSkills).to.deep.equal(gameData.unlockedSkills);
        expect(loadedData.settings).to.deep.equal(gameData.settings);
    });
});

describe('游戏性能优化测试', () => {
    beforeEach(() => {
        gameObjects = [];
        for (let i = 0; i < 1000; i++) {
            gameObjects.push({
                x: Math.random() * 800,
                y: Math.random() * 600,
                update: sinon.spy()
            });
        }
    });

    it('测试对象池管理', () => {
        // 1. 对象重用
        const obj = gameObjects[0];
        obj.active = false;
        const newObj = gameObjects.find(o => !o.active);
        expect(newObj).to.equal(obj);

        // 2. 性能监控
        const startTime = performance.now();
        gameObjects.forEach(obj => obj.update());
        const endTime = performance.now();
        expect(endTime - startTime).to.be.below(16); // 60fps
    });
}); 