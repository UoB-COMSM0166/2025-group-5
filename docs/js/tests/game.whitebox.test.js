require('./jest.setup.js');

// Mock functions
global.restartGame = jest.fn().mockImplementation(() => {
    gameState = 'start';
    present_level = 0;
});

describe('Level Class Test', () => {
    let level;
    
    beforeEach(() => {
        level = new Level(1, 'level1.json', null, null, true);
        level.jsonData = {
            player: {
                position: { x: 100, y: 100 }
            }
        };
    });

    test('Level Initialization Test', () => {
        expect(level.id).toBe(1);
        expect(level.jsonFile).toBe('level1.json');
        expect(level.curtainFlag).toBe(true);
        expect(level.player).toBeNull();
        expect(level.enemies).toEqual([]);
        expect(level.entities).toEqual([]);
        expect(level.obstacles).toEqual([]);
    });

    test('Level.start() Test', () => {
        level.start();
        expect(level.player).not.toBeNull();
    });

    test('Level.update() Test', () => {
        level.start();
        level.player.update = jest.fn();
        level.player.display = jest.fn();
        level.update();
        expect(level.player.update).toHaveBeenCalled();
        expect(level.player.display).toHaveBeenCalled();
    });

    test('Level.reset() Test', () => {
        level.start();
        level.reset();
        expect(level.player).toBeNull();
        expect(level.enemies).toEqual([]);
        expect(level.entities).toEqual([]);
        expect(level.obstacles).toEqual([]);
    });
});

describe('Character Class Test', () => {
    let character;
    
    beforeEach(() => {
        character = new Character(100, 100, 50, 'red', 100, 100, 10, 'NORMAL', 5, true, {}, true);
    });

    test('Character Initialization Test', () => {
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

    test('Character.changeHealth() Test', () => {
        // Normal damage
        character.changeHealth(-20);
        expect(character.health).toBe(80);

        // Healing
        character.changeHealth(10);
        expect(character.health).toBe(90);

        // Exceeding max health
        character.changeHealth(20);
        expect(character.health).toBe(100);

        // Death
        character.changeHealth(-100);
        expect(character.health).toBe(0);
        expect(character.status).toBe('DEAD');
    });

    test('Character.changeStatus() Test', () => {
        character.changeStatus('INVINCIBLE');
        expect(character.status).toBe('INVINCIBLE');
        expect(character.invincibleTimer).toBe(60);
    });
});

describe('Game State Transition Test', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 0;
        level1.start = jest.fn();
    });

    test('Game State Transition Flow Test', () => {
        // Start game
        startGame(1);
        expect(gameState).toBe('playing');
        expect(present_level).toBe(1);
        expect(level1.start).toHaveBeenCalled();

        // Pause game
        const pauseEvent = new KeyboardEvent('keydown', { key: 'p' });
        document.dispatchEvent(pauseEvent);
        expect(gameState).toBe('paused');

        // Resume game
        document.dispatchEvent(pauseEvent);
        expect(gameState).toBe('playing');
    });
});

describe('Game Resource Management Test', () => {
    test('Resource Loading Test', async () => {
        const data = await loadJsonData();
        expect(data).toBeDefined();
    });

    test('Resource Error Handling Test', async () => {
        const error = new Error('Resource not found');
        global.loadJsonData = jest.fn().mockRejectedValue(error);
        await expect(loadJsonData()).rejects.toThrow('Resource not found');
    });
});

describe('Game Configuration Test', () => {
    test('Game Constants Test', () => {
        expect(canvasWidth).toBe(1280);
        expect(canvasHeight).toBe(800);
        expect(frameRate).toBe(60);
        expect(HealthBarHeight).toBe(5);
        expect(globalInvincibleTimer).toBe(90);
        expect(globalWaterStatusTimer).toBe(180);
        expect(globalFireStatusTimer).toBe(120);
    });

    test('Game Attributes Configuration Test', () => {
        expect(attributes).toBeDefined();
        expect(attributes.grassSlime).toBeDefined();
        expect(attributes.ghostSlime).toBeDefined();
        expect(attributes.waterSlime).toBeDefined();
        expect(attributes.fireSlime).toBeDefined();
    });
});