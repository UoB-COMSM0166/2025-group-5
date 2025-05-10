// 游戏白盒测试文件
require('./jest.setup.js');

// 模拟函数
global.restartGame = jest.fn().mockImplementation(() => {
    gameState = 'start';
    present_level = 0;
});

describe('Level类测试', () => {
    let level;
    
    beforeEach(() => {
        level = new Level(1, 'level1.json', null, null, true);
        level.jsonData = {
            player: {
                position: { x: 100, y: 100 }
            }
        };
    });

    test('Level初始化测试', () => {
        expect(level.id).toBe(1);
        expect(level.jsonFile).toBe('level1.json');
        expect(level.curtainFlag).toBe(true);
        expect(level.player).toBeNull();
        expect(level.enemies).toEqual([]);
        expect(level.entities).toEqual([]);
        expect(level.obstacles).toEqual([]);
    });

    test('Level.start()测试', () => {
        level.start();
        expect(level.player).not.toBeNull();
    });

    test('Level.update()测试', () => {
        level.start();
        level.player.update = jest.fn();
        level.player.display = jest.fn();
        level.update();
        expect(level.player.update).toHaveBeenCalled();
        expect(level.player.display).toHaveBeenCalled();
    });

    test('Level.reset()测试', () => {
        level.start();
        level.reset();
        expect(level.player).toBeNull();
        expect(level.enemies).toEqual([]);
        expect(level.entities).toEqual([]);
        expect(level.obstacles).toEqual([]);
    });
});

describe('Character类测试', () => {
    let character;
    
    beforeEach(() => {
        character = new Character(100, 100, 50, 'red', 100, 100, 10, 'NORMAL', 5, true, {}, true);
    });

    test('Character初始化测试', () => {
        expect(character.x).toBe(100);
        expect(character.y).toBe(100);
        expect(character.size).toBe(50);
        expect(character.color).toBe('red');
        expect(character.health).toBe(100);
        expect(character.maxHealth).toBe(100);
        expect(character.attack).toBe(10);
        expect(character.status).toBe('NORMAL');
        expect(character.speed).toBe(5);
        expect(character.isPlayer).toBe(true);
    });

    test('Character.changeHealth()测试', () => {
        // 正常伤害
        character.changeHealth(-20);
        expect(character.health).toBe(80);

        // 治疗
        character.changeHealth(10);
        expect(character.health).toBe(90);

        // 超出最大生命值
        character.changeHealth(20);
        expect(character.health).toBe(100);

        // 死亡
        character.changeHealth(-100);
        expect(character.health).toBe(0);
        expect(character.status).toBe('DEAD');
    });

    test('Character.changeStatus()测试', () => {
        character.changeStatus('INVINCIBLE');
        expect(character.status).toBe('INVINCIBLE');
        expect(character.invincibleTimer).toBe(60);
    });
});

describe('游戏状态转换测试', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 0;
        level1.start = jest.fn();
    });

    test('游戏状态转换流程测试', () => {
        // 开始游戏
        startGame(1);
        expect(gameState).toBe('playing');
        expect(present_level).toBe(1);
        expect(level1.start).toHaveBeenCalled();

        // 暂停游戏
        const pauseEvent = new KeyboardEvent('keydown', { key: 'p' });
        document.dispatchEvent(pauseEvent);
        expect(gameState).toBe('paused');

        // 继续游戏
        document.dispatchEvent(pauseEvent);
        expect(gameState).toBe('playing');
    });
});

describe('游戏资源管理测试', () => {
    test('资源加载测试', async () => {
        const data = await loadJsonData();
        expect(data).toBeDefined();
    });

    test('资源错误处理测试', async () => {
        const error = new Error('Resource not found');
        global.loadJsonData = jest.fn().mockRejectedValue(error);
        await expect(loadJsonData()).rejects.toThrow('Resource not found');
    });
});

describe('游戏配置测试', () => {
    test('游戏常量测试', () => {
        expect(canvasWidth).toBe(1280);
        expect(canvasHeight).toBe(800);
        expect(frameRate).toBe(60);
        expect(HealthBarHeight).toBe(5);
        expect(globalInvincibleTimer).toBe(90);
        expect(globalWaterStatusTimer).toBe(180);
        expect(globalFireStatusTimer).toBe(120);
    });

    test('游戏属性配置测试', () => {
        expect(attributes).toBeDefined();
        expect(attributes.grassSlime).toBeDefined();
        expect(attributes.ghostSlime).toBeDefined();
        expect(attributes.waterSlime).toBeDefined();
        expect(attributes.fireSlime).toBeDefined();
    });
}); 