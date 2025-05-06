// 游戏白盒测试文件
require('./jest.setup.js');

describe('游戏核心类测试', () => {
    describe('Character类测试', () => {
        let character;
        beforeEach(() => {
            character = new Character(100, 100, 50, 'red', 100, 100, 10, 'NORMAL', 5, false, {});
        });

        test('角色初始化测试', () => {
            expect(character.x).toBe(100);
            expect(character.y).toBe(100);
            expect(character.size).toBe(50);
            expect(character.health).toBe(100);
            expect(character.maxHealth).toBe(100);
            expect(character.attack).toBe(10);
            expect(character.status).toBe('NORMAL');
            expect(character.speed).toBe(5);
        });

        test('角色生命值变化测试', () => {
            character.changeHealth(-20);
            expect(character.health).toBe(80);
            character.changeHealth(30);
            expect(character.health).toBe(100); // 不能超过最大生命值
            character.changeHealth(-120);
            expect(character.health).toBe(0);
            expect(character.status).toBe('DEAD');
        });

        test('角色状态变化测试', () => {
            character.changeStatus('INVINCIBLE');
            expect(character.status).toBe('INVINCIBLE');
            expect(character.invincibleTimer).toBe(60);
        });
    });

    describe('Player类测试', () => {
        let player;
        beforeEach(() => {
            player = new Player(100, 100, 50, 'red', 100, 100, 10, 'NORMAL', 5, 
                100, 200, 'shooting', 30, 'normal', 10, 5, 200, 'blue', 'fire', 
                true, {}, []);
        });

        test('玩家移动测试', () => {
            // 模拟键盘输入
            global.keyIsDown = jest.fn().mockImplementation(key => {
                return key === 'ArrowRight';
            });
            player.update();
            expect(player.x).toBe(105); // 向右移动
            expect(player.lastDirection).toBe('right');
        });

        test('玩家攻击测试', () => {
            player.shoot();
            expect(player.projectiles.length).toBe(1);
            expect(player.attackCdTimer).toBe(30);
        });

        test('玩家技能测试', () => {
            player.aoe();
            expect(player.projectiles.length).toBe(8);
            expect(player.attackCdTimer).toBe(30);
        });
    });

    describe('Enemy类测试', () => {
        let enemy;
        let level;
        beforeEach(() => {
            enemy = new Enemy(1, 100, 100, 50, 'red', 100, 100, 10, 'NORMAL', 5,
                [{x: 100, y: 100}, {x: 200, y: 200}], 100, 200, 'shooting', 30, 'normal',
                10, 5, 200, 'blue', 'fire', true, {});
            level = {
                player: {
                    x: 150,
                    y: 150,
                    size: 50
                },
                obstacles: []
            };
        });

        test('敌人巡逻测试', () => {
            enemy.update(level);
            expect(enemy.x).toBe(101);
            expect(enemy.y).toBe(101);
        });

        test('敌人追踪测试', () => {
            enemy.findPalyer = true;
            enemy.update(level);
            expect(enemy.x).not.toBe(100);
            expect(enemy.y).not.toBe(100);
        });

        test('敌人攻击测试', () => {
            enemy.update(level);
            expect(enemy.projectiles.length).toBe(1);
        });
    });

    describe('Level类测试', () => {
        let level;
        beforeEach(() => {
            level = new Level(1, {}, {}, {}, false);
            level.jsonData = {
                player: {
                    position: {x: 100, y: 100}
                },
                enemies: [],
                entities: [],
                obstacles: []
            };
        });

        test('关卡初始化测试', async () => {
            await level.init();
            expect(level.jsonData).toBeDefined();
        });

        test('关卡开始测试', () => {
            level.start();
            expect(level.player).toBeDefined();
            expect(level.enemies).toEqual([]);
            expect(level.obstacles).toEqual([]);
        });

        test('关卡更新测试', () => {
            level.start();
            level.update();
            expect(level.player.display).toHaveBeenCalled();
        });
    });

    describe('Projectile类测试', () => {
        let projectile;
        beforeEach(() => {
            projectile = new Projectile(100, 100, 1, 0, 10, 5, 200, 'blue', 'fire');
        });

        test('子弹移动测试', () => {
            projectile.update();
            expect(projectile.x).toBe(110);
            expect(projectile.y).toBe(100);
        });

        test('子弹碰撞测试', () => {
            const character = {
                x: 110,
                y: 100,
                size: 20
            };
            expect(projectile.isHit(character)).toBe(true);
        });
    });

    describe('SpriteAnimator类测试', () => {
        let animator;
        beforeEach(() => {
            animator = new SpriteAnimator({
                idleUp: {
                    frames: [1, 2, 3],
                    period: 300,
                    loop: true
                }
            });
        });

        test('动画状态切换测试', () => {
            animator.setState('idleUp');
            expect(animator.currentState).toBe('idleUp');
            expect(animator.currentIndex).toBe(0);
        });

        test('动画更新测试', () => {
            animator.setState('idleUp');
            animator.update();
            expect(animator.currentIndex).toBe(0);
        });
    });

    describe('SkillBar类测试', () => {
        let skillBar;
        beforeEach(() => {
            skillBar = new SkillBar(5, [], {}, [false, false, false, false, false], 
                [0, 0, 0, 0, 0], 0, 0, 50, 50, 5, 20);
        });

        test('技能栏添加技能测试', () => {
            skillBar.addSkill(1);
            expect(skillBar.statusList[1]).toBe(true);
            expect(skillBar.numberList[1]).toBe(1);
        });

        test('技能栏使用技能测试', () => {
            skillBar.addSkill(1);
            expect(skillBar.useSkill(1, false)).toBe(true);
            expect(skillBar.numberList[1]).toBe(0);
        });
    });

    describe('Curtain类测试', () => {
        let curtain;
        beforeEach(() => {
            curtain = new Curtain(800, 600, 'black', 400, 300, 100, 'round', 150);
        });

        test('幕布更新测试', () => {
            curtain.update(500, 400, 120, 'sector', 180, 'right');
            expect(curtain.px).toBe(500);
            expect(curtain.py).toBe(400);
            expect(curtain.radius).toBe(120);
            expect(curtain.shape).toBe('sector');
            expect(curtain.sectorRadius).toBe(180);
            expect(curtain.lastDirection).toBe('right');
        });
    });
});

describe('游戏初始化测试', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 0;
    });

    test('setup函数测试', async () => {
        await setup();
        expect(createCanvas).toHaveBeenCalledWith(canvasWidth, canvasHeight);
        expect(createButton).toHaveBeenCalledTimes(2);
        expect(createVideo).toHaveBeenCalledTimes(2);
        expect(loadJsonData).toHaveBeenCalledTimes(2);
    });
});

describe('游戏状态管理测试', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 0;
    });

    test('游戏状态转换测试', () => {
        // 开始游戏
        startStory1();
        expect(gameState).toBe('story1');
        expect(story1Video.show).toHaveBeenCalled();
        expect(story1Video.play).toHaveBeenCalled();

        // 进入故事2
        startStory2();
        expect(gameState).toBe('story2');
        expect(story2Video.show).toHaveBeenCalled();
        expect(story2Video.loop).toHaveBeenCalled();

        // 进入关卡选择
        enterLevelSelect();
        expect(gameState).toBe('levelSelect');

        // 重新开始游戏
        restartGame();
        expect(gameState).toBe('start');
    });
});

describe('游戏控制测试', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 0;
    });

    test('键盘控制测试', () => {
        // 开始游戏
        startStory1();
        expect(gameState).toBe('story1');

        // 跳过故事
        startStory2();
        expect(gameState).toBe('story2');

        // 游戏内控制
        gameState = 'playing';
        present_level = 1;
        const moveEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        document.dispatchEvent(moveEvent);
        expect(level1.keyPressedInLevel).toHaveBeenCalled();
    });
});

describe('游戏资源管理测试', () => {
    beforeEach(() => {
        g_skillTextureList = [];
        g_skillStatusList = [];
        g_skillNumList = [];
        g_skillNumber = 8;
    });

    test('资源加载测试', async () => {
        await setup();
        expect(g_skillTextureList.length).toBe(8);
        expect(g_skillStatusList.length).toBe(8);
        expect(g_skillNumList.length).toBe(8);
    });
});

describe('游戏渲染测试', () => {
    test('游戏渲染函数测试', () => {
        // 开始界面
        gameState = 'start';
        draw();
        expect(background).toHaveBeenCalled();

        // 故事1界面
        gameState = 'story1';
        draw();
        expect(story1Video.show).toHaveBeenCalled();

        // 故事2界面
        gameState = 'story2';
        draw();
        expect(story2Video.show).toHaveBeenCalled();

        // 关卡选择界面
        gameState = 'levelSelect';
        draw();
        expect(background).toHaveBeenCalled();

        // 游戏界面
        gameState = 'playing';
        draw();
        expect(level1.draw).toHaveBeenCalled();
    });
});

describe('游戏暂停测试', () => {
    test('游戏暂停功能测试', () => {
        gameState = 'playing';
        pausedState = false;
        const pauseEvent = new KeyboardEvent('keydown', { key: 'p' });
        document.dispatchEvent(pauseEvent);
        expect(pausedState).toBe(true);
        expect(gameState).toBe('paused');

        document.dispatchEvent(pauseEvent);
        expect(pausedState).toBe(false);
        expect(gameState).toBe('playing');
    });
});

describe('游戏关卡测试', () => {
    test('关卡切换测试', () => {
        gameState = 'levelSelect';
        nextLevel = 2;
        startGame(nextLevel);
        expect(present_level).toBe(2);
        expect(gameState).toBe('playing');
    });
}); 