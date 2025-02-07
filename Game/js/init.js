
// 预先导入图片
function preload()
{
    playerTexture = loadImage('resources/images/characters_and_obstacles/dragon.gif');
    enemyTexture = loadImage('resources/images/characters_and_obstacles/example1.jpg');
    grassTexture = loadImage('resources/images/characters_and_obstacles/example3.jpg');
    obstacleTexture = loadImage('resources/images/characters_and_obstacles/example4.jpg');
}

// 起始函数
function setup() 
{
    createCanvas(1280, 800);
    player = new Player(width / 2, height / 2);

    // 游戏标题和开始按钮
    gameTitle = createElement('h1', 'Snake Advanture');
    startButton = createButton('Start Game');
    gameTitle.position(width / 2 - 100, height / 2 - 100);
    gameTitle.style('color', 'white');
    gameTitle.style('font-size', '48px');
    gameTitle.style('text-align', 'center');
    
    startButton.position(width / 2 - 50, height / 2);
    startButton.size(100, 40);
    startButton.style('background', '#4CAF50');
    startButton.style('color', 'white');
    startButton.mousePressed(startGame);
}

function startGame() 
{
    gameState = 'playing';
    isGameOver = false;

    // 重置敌人和障碍
    enemies = [];
    obstacles = [];
    createEnemies();
    createObstacles();
    
    // 重置玩家
    player.x = width / 2;
    player.y = height / 2;
    player.projectiles = [];
}

// to be done: 在draw()完成场景转换逻辑：开始 - 选关 - 结束 - 存/读档
function draw() 
{
    // 绘制边界
    stroke(0);
    strokeWeight(5);
    noFill();
    rect(0, 0, width, height);
    background(220);

    if (gameState === 'start') 
    {
        // 渐变背景
        let c1 = color(30, 50, 80);
        let c2 = color(80, 120, 200);
        for (let y = 0; y < height; y ++) {
            let inter = map(y, 0, height, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(0, y, width, y);
        }
        // 显示界面元素
        gameTitle.show();
        startButton.show().html('Start Game');
    } 
    else if (gameState === 'playing') 
    {
        gameTitle.hide();
        startButton.hide();

        player.update();
        player.display();

        drawEnemies();
        drawObstacles();
        drawProjectiles();

        checkCollisions();
    } 
    else if (gameState === 'over') 
    {
        textSize(32);
        fill('red');
        text('Game Over', width / 2 - 80, height / 2);
        startButton.show();
        startButton.position(width / 2 - 50, height / 2)
        startButton.html('Restart');
    }
    return;
    
}



// 按键监听（新增方向射击支持）
function keyPressed() 
{
    if (key === ' ') 
    {
        player.shoot();
    }
}

window.onload = function() {
    gameMusic.playBackground(); // 启动背景音乐
};

document.addEventListener("click", () => {
    gameMusic.playBackground();
}, { once: true }); // 只执行一次

