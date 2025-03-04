
// 预先导入图片
function preload()
{
    playerTexture = loadImage(playerFile);
    image_map["soldier_idle"] = loadImage(enemyFile);
    grassTexture = loadImage(grassFile);
    obstacleTexture = loadImage(obstacleFile);
    level1BGTexture = loadImage(level1BGFile);
    level1LightTexture = loadImage(level1LightFile);
}

// 起始函数
async function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // 游戏标题
    gameTitle = createElement('h1', 'Snake Adventure');
    gameTitle.position(width / 2 - 100, height / 2 - 100);
    gameTitle.style('color', 'white');
    gameTitle.style('font-size', '48px');
    gameTitle.style('text-align', 'center');

    // 替换按钮为图片
    startButton = createImg('resources/images/UI/example3.jpg', 'Start Game');
    startButton.position(width / 2 - 75, height / 2);
    startButton.size(150, 60); // 设置初始大小

    // 鼠标悬停时放大
    startButton.mouseOver(() => {
        startButton.size(165, 65); // 变大
    });

    // 鼠标移开时恢复原始大小
    startButton.mouseOut(() => {
        startButton.size(150, 60);
    });

    // 点击后开始游戏
    startButton.mousePressed(() => {
        gameState = 'levelSelect';
        selectLevel();
    });

    // 初始化关卡选择界面（但不显示）
    selectLevel();
    if (levelTitle) levelTitle.hide();
    if (level1Button) level1Button.hide();
    if (level2Button) level2Button.hide();

    // 创建各个关卡对象
    level1 = new Level(1, level1ConfFile, level1BGTexture, level1LightTexture);
    await level1.init();
//     level2 = new Level(2, level2ConfFile, level2BGTexture, level2LightTexture);
//     await level2.init();
//     level3 = new Level(3, level3ConfFile, level3BGTexture, level3LightTexture);
//     await level3.init();
//     level4 = new Level(4, level4ConfFile, level4BGTexture, level4LightTexture);
//     await level4.init();

    // 读取配置文件
    attributes = await loadJsonData(attributeFile);
}


function selectLevel() {
    if (levelTitle) return; // 如果已创建，不重复生成

    // 隐藏开始菜单
    gameTitle.hide();
    startButton.hide();

    // 创建关卡选择标题
    levelTitle = createElement('h1', 'Select Level');
    levelTitle.position(width / 2 - 100, height / 2 - 150);
    levelTitle.style('color', 'white');
    levelTitle.style('font-size', '48px');
    levelTitle.style('text-align', 'center');

    // 替换按钮为图片
    level1Button = createImg('resources/images/UI/example3.jpg', 'Level 1');
    level1Button.position(width / 2 - 75, height / 2 - 50);
    level1Button.size(150, 60); // 初始大小

    level2Button = createImg('resources/images/UI/example3.jpg', 'Level 2');
    level2Button.position(width / 2 - 75, height / 2 + 50);
    level2Button.size(150, 60); // 初始大小

    // 鼠标悬停时放大
    level1Button.mouseOver(() => {
        level1Button.size(165, 65);
    });
    level1Button.mouseOut(() => {
        level1Button.size(150, 60);
    });

    level2Button.mouseOver(() => {
        level2Button.size(165, 65);
    });
    level2Button.mouseOut(() => {
        level2Button.size(150, 60);
    });

    // 关卡选择点击事件
    level1Button.mousePressed(() => startGame(1));
    level2Button.mousePressed(() => startGame(2));
}


function startGame(level) {
    gameState = 'playing'; // 进入游戏状态
    isGameOver = false; // 重置游戏结束标志

    // 根据关卡设置游戏参数
    if (level === 1) {
        bulletSpeed = 3;
        spawnInterval = 30;
        level1.start();
    } else if (level === 2) {
        bulletSpeed = 5;
        spawnInterval = 20;
    }

    // // 重置敌人和障碍
    // enemies = [];
    // obstacles = [];
    // createEnemies();
    // createObstacles();

    // // 重置玩家
    // player.x = width / 2;
    // player.y = height / 2;
    // player.projectiles = [];

}

// to be done: 在draw()完成场景转换逻辑：开始 - 选关 - 结束 - 存/读档
function draw() {
    // 绘制边界
    stroke(0);
    strokeWeight(5);
    noFill();
    rect(0, 0, width, height);
    background(220);

    if (gameState === 'start') {
        // 渐变背景
        let c1 = color(30, 50, 80);
        let c2 = color(80, 120, 200);
        for (let y = 0; y < height; y++) {
            let inter = map(y, 0, height, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(0, y, width, y);
        }
        // 显示界面元素
        gameTitle.show();
        startButton.show().html('Start Game');
    } else if (gameState === 'levelSelect') {
        // 关卡选择界面
        let c1 = color(80, 120, 200);
        let c2 = color(30, 50, 80);
        for (let y = 0; y < height; y++) {
            let inter = map(y, 0, height, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(0, y, width, y);
        }

        // 隐藏开始按钮
        gameTitle.hide();
        startButton.hide();

        // 显示关卡选择标题和按钮
        if (levelTitle) levelTitle.show();
        if (level1Button) level1Button.show();
        if (level2Button) level2Button.show();
    } else if (gameState === 'playing') {
        gameTitle.hide();
        startButton.hide();
        if (levelTitle) levelTitle.hide(); // 隐藏关卡选择标题
        if (level1Button) level1Button.hide(); // 隐藏关卡按钮
        if (level2Button) level2Button.hide();

        level1.update();
        // player.update();
        // player.display();

        // drawEnemies();
        // drawObstacles();
        // drawProjectiles();

        // checkCollisions();
    } else if (gameState === 'over') {
        textSize(32);
        fill('red');
        text('Game Over', width / 2 - 80, height / 2);
        startButton.show();
        startButton.position(width / 2 - 50, height / 2);
        startButton.html('Restart');
    }
}



// 按键监听（新增方向射击支持）
function keyPressed() 
{
    if (key === ' ') 
    {
        level1.player.shoot();
    }
}

window.onload = function() {
    gameMusic.playBackground(); // 启动背景音乐
};

document.addEventListener("click", () => {
    gameMusic.playBackground();
}, { once: true }); // 只执行一次

