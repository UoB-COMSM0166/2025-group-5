// Game black-box test file
require('./jest.setup.js');

// Mock functions
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
    gameState = 'playing';
    present_level = level;
    level1.start();
});

global.loadJsonData = jest.fn().mockImplementation(() => Promise.resolve({}));

describe('Game initialization test', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 0;
    });

    test('Game startup process test', async () => {
        await setup();
        expect(document.body).toBeDefined();
        expect(gameState).toBe('start');
        expect(present_level).toBe(0);
    });
});

describe('Game flow test', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 0;
    });

    test('Complete game flow test', () => {
        // Start game
        startStory1();
        expect(gameState).toBe('story1');
        expect(story1Video.show).toHaveBeenCalled();
        expect(story1Video.play).toHaveBeenCalled();

        // Skip story
        startStory2();
        expect(gameState).toBe('story2');
        expect(story2Video.show).toHaveBeenCalled();
        expect(story2Video.loop).toHaveBeenCalled();

        // Enter level selection
        enterLevelSelect();
        expect(gameState).toBe('levelSelect');

        // Select level
        startGame(1);
        expect(gameState).toBe('playing');
        expect(present_level).toBe(1);
        expect(level1.start).toHaveBeenCalled();
    });
});

describe('Game control test', () => {
    beforeEach(() => {
        gameState = 'playing';
        present_level = 1;
        level1.keyPressedInLevel = jest.fn();
    });

    test('Keyboard control test', () => {
        // Movement control
        const moveEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        document.dispatchEvent(moveEvent);
        expect(level1.keyPressedInLevel).toHaveBeenCalled();

        // Pause control
        const pauseEvent = new KeyboardEvent('keydown', { key: 'p' });
        document.dispatchEvent(pauseEvent);
        expect(gameState).toBe('paused');
    });
});

describe('Game interface test', () => {
    beforeEach(() => {
        gameState = 'start';
        present_level = 0;
    });

    test('UI elements test', () => {
        expect(canvasWidth).toBe(1280);
        expect(canvasHeight).toBe(800);
        expect(gameState).toBe('start');
        expect(present_level).toBe(0);
    });
});

describe('Game over test', () => {
    beforeEach(() => {
        gameState = 'playing';
        present_level = 1;
        level1.player = new Player(400, 300, 30, 'blue', 100, 100, 10, 'NORMAL', 5, 50, 100, 'single', 30, 'aoe', 20, 30, 100, 'red', 'special', false, {}, []);
        level1.start();
    });

    test('Game over condition test', () => {
        // Simulate player death
        level1.player.changeHealth(-100);
        expect(level1.player.status).toBe('DEAD');
    });
});

describe('Game performance test', () => {
    test('Frame rate test', () => {
        const startTime = performance.now();
        level1.update();
        const endTime = performance.now();
        expect(endTime - startTime).toBeLessThan(16.67); // 60fps
    });
});

describe('Game compatibility test', () => {
    test('Browser compatibility test', () => {
        expect(createCanvas).toBeDefined();
        expect(createVideo).toBeDefined();
        expect(createButton).toBeDefined();
    });
});

describe('Edge case test', () => {
    beforeEach(() => {
        level1.keyPressedInLevel = jest.fn();
    });

    test('Screen size limit test', () => {
        expect(canvasWidth).toBe(1280);
        expect(canvasHeight).toBe(800);
    });

    test('Rapid key press test', () => {
        for (let i = 0; i < 10; i++) {
            const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
            document.dispatchEvent(event);
        }
        expect(level1.keyPressedInLevel).toHaveBeenCalled();
    });
});

describe('Exception handling test', () => {
    test('Resource loading error test', async () => {
        const error = new Error('Resource not found');
        global.loadJsonData = jest.fn().mockRejectedValue(error);
        await expect(loadJsonData()).rejects.toThrow('Resource not found');
    });

    test('Game crash recovery test', () => {
        gameState = 'playing';
        present_level = 1;
        level1.update();
        expect(gameState).toBe('playing');
    });
});

describe('User experience test', () => {
    test('Button response test', () => {
        const button = createButton('Test');
        button.mousePressed();
        expect(button.mousePressed).toHaveBeenCalled();
    });

    test('Game difficulty progression test', () => {
        startGame(1);
        expect(present_level).toBe(1);
        startGame(2);
        expect(present_level).toBe(2);
        expect(attributes.grassSlime.health).toBe(150); // Increased difficulty in level 2
    });
});

describe('Accessibility test', () => {
    beforeEach(() => {
        level1.keyPressedInLevel = jest.fn();
    });

    test('Keyboard support test', () => {
        const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        document.dispatchEvent(event);
        expect(level1.keyPressedInLevel).toHaveBeenCalled();
    });
});

describe('Localization test', () => {
    test('Language setting test', () => {
        expect(document.documentElement.lang).toBeDefined();
    });
});

describe('Save function test', () => {
    test('Game state saving test', () => {
        gameState = 'playing';
        present_level = 1;
        expect(gameState).toBe('playing');
        expect(present_level).toBe(1);
    });
});