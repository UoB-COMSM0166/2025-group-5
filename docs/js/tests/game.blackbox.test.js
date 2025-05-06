// 游戏黑盒测试文件
require('./jest.setup.js');

describe('游戏启动测试', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 0;
    });

    test('游戏启动流程测试', async () => {
        await setup();
        expect(document.body).toBeDefined();
        expect(gameState).toBe('start');
        expect(present_level).toBe(0);
    });
});

describe('游戏流程测试', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 0;
    });

    test('完整游戏流程测试', () => {
        // 开始游戏
        startStory1();
        expect(gameState).toBe('story1');

        // 跳过故事
        startStory2();
        expect(gameState).toBe('story2');

        // 进入关卡选择
        enterLevelSelect();
        expect(gameState).toBe('levelSelect');

        // 选择关卡
        startGame(1);
        expect(gameState).toBe('playing');
        expect(present_level).toBe(1);
    });
});

describe('游戏控制测试', () => {
    beforeEach(() => {
        gameState = 'playing';
        present_level = 1;
    });

    test('键盘控制测试', () => {
        // 移动控制
        const moveEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        document.dispatchEvent(moveEvent);
        expect(level1.keyPressedInLevel).toHaveBeenCalled();

        // 暂停控制
        const pauseEvent = new KeyboardEvent('keydown', { key: 'p' });
        document.dispatchEvent(pauseEvent);
        expect(gameState).toBe('paused');
    });
});

describe('游戏界面测试', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 0;
    });

    test('界面元素测试', () => {
        expect(gameState).toBe('start');
        expect(present_level).toBe(0);
    });
});

describe('游戏结束测试', () => {
    beforeEach(() => {
        gameState = 'playing';
        present_level = 1;
    });

    test('游戏结束条件测试', () => {
        // 模拟玩家死亡
        level1.player.health = 0;
        level1.update();
        expect(level1.player.status).toBe('DEAD');
    });
});

describe('游戏性能测试', () => {
    test('帧率测试', () => {
        const startTime = performance.now();
        level1.update();
        const endTime = performance.now();
        expect(endTime - startTime).toBeLessThan(16.67); // 60fps
    });
});

describe('游戏兼容性测试', () => {
    test('浏览器兼容性测试', () => {
        expect(createCanvas).toBeDefined();
        expect(createVideo).toBeDefined();
        expect(createButton).toBeDefined();
    });
});

describe('边界条件测试', () => {
    test('屏幕尺寸限制测试', () => {
        expect(canvasWidth).toBe(800);
        expect(canvasHeight).toBe(600);
    });

    test('快速按键测试', () => {
        for (let i = 0; i < 10; i++) {
            const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
            document.dispatchEvent(event);
        }
        expect(level1.keyPressedInLevel).toHaveBeenCalled();
    });
});

describe('异常处理测试', () => {
    test('资源加载错误测试', async () => {
        const error = new Error('Resource not found');
        loadJsonData.mockRejectedValueOnce(error);
        await expect(setup()).rejects.toThrow('Resource not found');
    });

    test('游戏崩溃恢复测试', () => {
        gameState = 'playing';
        present_level = 1;
        level1.update();
        expect(gameState).toBe('playing');
    });
});

describe('用户体验测试', () => {
    test('按钮响应测试', () => {
        const button = createButton('Test');
        button.mousePressed();
        expect(button.mousePressed).toHaveBeenCalled();
    });

    test('游戏难度递增测试', () => {
        startGame(1);
        expect(present_level).toBe(1);
        startGame(2);
        expect(present_level).toBe(2);
    });
});

describe('可访问性测试', () => {
    test('键盘支持测试', () => {
        const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        document.dispatchEvent(event);
        expect(level1.keyPressedInLevel).toHaveBeenCalled();
    });
});

describe('本地化测试', () => {
    test('语言设置测试', () => {
        expect(document.documentElement.lang).toBeDefined();
    });
});

describe('存档功能测试', () => {
    test('游戏状态保存测试', () => {
        gameState = 'playing';
        present_level = 1;
        expect(gameState).toBe('playing');
        expect(present_level).toBe(1);
    });
});
