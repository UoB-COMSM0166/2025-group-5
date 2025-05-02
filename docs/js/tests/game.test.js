// 游戏测试文件
require('./jest.setup.js');

// 导入被测试的代码
const game = require('../init.js');
const { setup, startStory1, startStory2, enterLevelSelect, startGame, restartGame, draw, keyPressed } = game;

describe('游戏状态管理测试', () => {
    beforeEach(() => {
        // 重置所有状态
        global.gameState = 'start';
        jest.clearAllMocks();
    });

    test('setup函数应该正确初始化游戏状态', async () => {
        await setup();
        expect(createCanvas).toHaveBeenCalledWith(canvasWidth, canvasHeight);
        expect(createButton).toHaveBeenCalled();
    });

    test('startStory1应该开始第一个故事', () => {
        startStory1();
        expect(story1Video.show).toHaveBeenCalled();
        expect(story1Video.play).toHaveBeenCalled();
    });

    test('startStory2应该开始第二个故事', () => {
        startStory2();
        expect(story2Video.show).toHaveBeenCalled();
        expect(story2Video.loop).toHaveBeenCalled();
    });
});

describe('关卡系统测试', () => {
    beforeEach(() => {
        global.level1 = {
            init: jest.fn().mockResolvedValue(),
            start: jest.fn(),
            update: jest.fn()
        };
        global.level2 = {
            init: jest.fn().mockResolvedValue(),
            start: jest.fn(),
            update: jest.fn()
        };
        global.present_level = 0;
    });

    test('测试关卡初始化', async () => {
        await setup();
        expect(level1.init).toHaveBeenCalled();
        expect(level2.init).toHaveBeenCalled();
    });

    test('测试关卡切换', () => {
        // 选择关卡1
        startGame(1);
        expect(gameState).toBe('playing');
        expect(present_level).toBe(1);
        expect(level1.start).toHaveBeenCalled();

        // 选择关卡2
        startGame(2);
        expect(gameState).toBe('playing');
        expect(present_level).toBe(2);
        expect(level2.start).toHaveBeenCalled();
    });
});

describe('资源管理测试', () => {
    beforeEach(() => {
        g_skillTextureList = [];
        g_skillStatusList = [];
        g_skillNumList = [];
        g_skillNumber = 5;
    });

    test('测试资源加载', async () => {
        await setup();
        
        // 验证视频资源
        expect(story1Video.size).toHaveBeenCalledWith(canvasWidth, canvasHeight);
        expect(story2Video.size).toHaveBeenCalledWith(canvasWidth, canvasHeight);
        
        // 验证技能资源
        expect(g_skillTextureList.length).toBe(5);
        expect(g_skillStatusList.length).toBe(5);
        expect(g_skillNumList.length).toBe(5);
        
        // 验证属性配置
        expect(attributes).toBeInstanceOf(Object);
    });
});

describe('游戏控制测试', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 1;
    });

    test('测试键盘控制', () => {
        // 开始游戏控制
        keyPressed({ key: ' ' });
        expect(gameState).toBe('story1');

        // 故事跳过控制
        gameState = 'story2';
        keyPressed({ key: ' ' });
        expect(gameState).toBe('levelSelect');

        // 游戏内控制
        gameState = 'playing';
        present_level = 1;
        keyPressed({ key: 'ArrowLeft' });
        expect(level1.keyPressedInLevel).toHaveBeenCalled();
    });
});

describe('音频系统测试', () => {
    beforeEach(() => {
        gameMusic = {
            playBackground: jest.fn()
        };
    });

    test('测试音频控制', () => {
        // 模拟页面加载
        window.onload();
        expect(gameMusic.playBackground).not.toHaveBeenCalled();

        // 模拟首次点击
        document.dispatchEvent(new Event('click'));
        expect(gameMusic.playBackground).toHaveBeenCalled();

        // 验证事件监听器只触发一次
        document.dispatchEvent(new Event('click'));
        expect(gameMusic.playBackground).toHaveBeenCalledTimes(1);
    });
});

describe('游戏主循环测试', () => {
    beforeEach(() => {
        gameState = 'start';
        startImg = {};
        levelSelectImg = {};
    });

    test('测试游戏主循环', () => {
        // 测试开始状态
        draw();
        expect(image).toHaveBeenCalledWith(startImg, 0, 0, width, height);

        // 测试故事状态
        gameState = 'story1';
        draw();
        expect(background).toHaveBeenCalledWith(0);

        // 测试关卡选择状态
        gameState = 'levelSelect';
        draw();
        expect(image).toHaveBeenCalledWith(levelSelectImg, 0, 0, width, height);

        // 测试游戏进行状态
        gameState = 'playing';
        present_level = 1;
        draw();
        expect(level1.update).toHaveBeenCalled();

        // 测试游戏结束状态
        gameState = 'over';
        draw();
        expect(text).toHaveBeenCalledWith('Game Over', width / 2 - 80, height / 2);
        expect(startButton.show).toHaveBeenCalled();
    });
});

describe('游戏状态管理扩展测试', () => {
    beforeEach(() => {
        gameState = 'start';
        story1Video = {
            show: jest.fn(),
            hide: jest.fn(),
            play: jest.fn(),
            stop: jest.fn(),
            onended: jest.fn()
        };
        story2Video = {
            show: jest.fn(),
            hide: jest.fn(),
            loop: jest.fn(),
            stop: jest.fn()
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
            expect(gameState).toBe(to);
        });
    });

    it('测试状态转换边界条件', () => {
        // 测试无效状态转换
        gameState = 'invalid';
        keyPressed({ key: ' ' });
        expect(gameState).toBe('invalid');

        // 测试重复状态转换
        gameState = 'story1';
        keyPressed({ key: ' ' });
        expect(gameState).toBe('story1');
    });
});

describe('关卡系统扩展测试', () => {
    beforeEach(() => {
        level1 = {
            init: jest.fn().mockResolvedValue(),
            start: jest.fn(),
            update: jest.fn(),
            keyPressedInLevel: jest.fn(),
            checkCollision: jest.fn(),
            spawnEnemy: jest.fn()
        };
        level2 = {
            init: jest.fn().mockResolvedValue(),
            start: jest.fn(),
            update: jest.fn(),
            keyPressedInLevel: jest.fn(),
            checkCollision: jest.fn(),
            spawnEnemy: jest.fn()
        };
    });

    it('测试关卡内部逻辑', () => {
        // 1. 碰撞检测
        level1.checkCollision.returns(true);
        level1.update();
        expect(level1.checkCollision).toHaveBeenCalled();

        // 2. 敌人生成
        level1.spawnEnemy.returns({ x: 100, y: 100 });
        level1.update();
        expect(level1.spawnEnemy).toHaveBeenCalled();

        // 3. 关卡进度
        level1.progress = 0.5;
        level1.update();
        expect(level1.progress).toBeGreaterThan(0);
    });

    it('测试关卡资源管理', () => {
        // 1. 资源预加载
        level1.preloadResources = jest.fn();
        level1.init();
        expect(level1.preloadResources).toHaveBeenCalled();

        // 2. 资源释放
        level1.releaseResources = jest.fn();
        level1.stop();
        expect(level1.releaseResources).toHaveBeenCalled();
    });
});

describe('游戏对象系统测试', () => {
    beforeEach(() => {
        player = {
            x: 400,
            y: 300,
            speed: 5,
            health: 100,
            update: jest.fn(),
            move: jest.fn(),
            takeDamage: jest.fn()
        };
        enemies = [];
        bullets = [];
    });

    it('测试游戏对象生命周期', () => {
        // 1. 对象创建
        const enemy = { x: 100, y: 100, health: 50 };
        enemies.push(enemy);
        expect(enemies.length).toBe(1);

        // 2. 对象更新
        player.update();
        expect(player.update).toHaveBeenCalled();

        // 3. 对象销毁
        enemy.health = 0;
        enemies = enemies.filter(e => e.health > 0);
        expect(enemies.length).toBe(0);
    });

    it('测试对象交互', () => {
        // 1. 碰撞检测
        const bullet = { x: 400, y: 300, damage: 10 };
        bullets.push(bullet);
        player.takeDamage(bullet.damage);
        expect(player.takeDamage).toHaveBeenCalledWith(bullet.damage);
        expect(player.health).toBe(90);

        // 2. 移动限制
        player.move(1000, 1000);
        expect(player.x).toBeLessThan(800);
        expect(player.y).toBeLessThan(600);
    });
});

describe('技能系统测试', () => {
    beforeEach(() => {
        skills = {
            fireball: {
                cooldown: 1000,
                damage: 20,
                lastUsed: 0,
                use: jest.fn()
            },
            shield: {
                cooldown: 2000,
                duration: 5000,
                active: false,
                use: jest.fn()
            }
        };
    });

    it('测试技能冷却机制', () => {
        // 1. 技能使用
        skills.fireball.use();
        expect(skills.fireball.use).toHaveBeenCalled();
        expect(skills.fireball.lastUsed).toBeGreaterThan(0);

        // 2. 冷却检查
        const canUse = Date.now() - skills.fireball.lastUsed > skills.fireball.cooldown;
        expect(canUse).toBe(false);
    });

    it('测试技能效果', () => {
        // 1. 伤害技能
        const enemy = { health: 100 };
        skills.fireball.use(enemy);
        expect(enemy.health).toBe(80);

        // 2. 防御技能
        skills.shield.use();
        expect(skills.shield.active).toBe(true);
        setTimeout(() => {
            expect(skills.shield.active).toBe(false);
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
        const handler = jest.fn();
        eventListeners['gameStart'].push(handler);
        expect(eventListeners['gameStart'].length).toBe(1);

        // 2. 事件发布
        const event = { type: 'gameStart', data: {} };
        eventListeners['gameStart'].forEach(h => h(event));
        expect(handler).toHaveBeenCalledWith(event);

        // 3. 事件取消订阅
        eventListeners['gameStart'] = eventListeners['gameStart'].filter(h => h !== handler);
        expect(eventListeners['gameStart'].length).toBe(0);
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
        expect(localStorage.getItem('gameSave')).toBe(saveData);

        // 2. 数据加载
        const loadedData = JSON.parse(localStorage.getItem('gameSave'));
        expect(loadedData.level).toBe(gameData.level);
        expect(loadedData.score).toBe(gameData.score);

        // 3. 数据验证
        expect(loadedData.unlockedSkills).toEqual(gameData.unlockedSkills);
        expect(loadedData.settings).toEqual(gameData.settings);
    });
});

describe('游戏性能优化测试', () => {
    beforeEach(() => {
        gameObjects = [];
        for (let i = 0; i < 1000; i++) {
            gameObjects.push({
                x: Math.random() * 800,
                y: Math.random() * 600,
                update: jest.fn()
            });
        }
    });

    it('测试对象池管理', () => {
        // 1. 对象重用
        const obj = gameObjects[0];
        obj.active = false;
        const newObj = gameObjects.find(o => !o.active);
        expect(newObj).toEqual(obj);

        // 2. 性能监控
        const startTime = performance.now();
        gameObjects.forEach(obj => obj.update());
        const endTime = performance.now();
        expect(endTime - startTime).toBeLessThan(16); // 60fps
    });
}); 