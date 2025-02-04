let player;
let enemies = [];
let obstacles = [];
const enemyCount = 5;
const obstacleCount = 5;
let isGameOver = false;

function setup() {
    createCanvas(800, 600);
    player = new Player(width / 2, height / 2);
    createEnemies();
    createObstacles();
}

function draw() {
    background(220);

    // 绘制边界
    stroke(0);
    strokeWeight(5);
    noFill();
    rect(0, 0, width, height);

    if (isGameOver) {
        textSize(32);
        fill('red');
        text('游戏结束', width / 2 - 80, height / 2);
        return;
    }

    player.update();
    player.display();

    drawEnemies();
    drawObstacles();
    drawProjectiles();

    checkCollisions();
}

// 创建敌人
function createEnemies() {
    for (let i = 0; i < enemyCount; i++) {
        enemies.push(new Enemy(random(width - 50), random(height - 50)));
    }
}

// 创建障碍物
function createObstacles() {
    for (let i = 0; i < obstacleCount; i++) {
        let x = random(width - 50);
        let y = random(height - 50);
        let isPassable = random() < 0.5;
        obstacles.push(new Obstacle(x, y, isPassable));
    }
}

// 绘制敌人
function drawEnemies() {
    for (let enemy of enemies) {
        enemy.update();
        enemy.display();
    }
}

// 绘制障碍物
function drawObstacles() {
    for (let obstacle of obstacles) {
        obstacle.display();
    }
}

// 绘制子弹
function drawProjectiles() {
    for (let i = player.projectiles.length - 1; i >= 0; i--) {
        let proj = player.projectiles[i];
        proj.update();
        proj.display();

        // 只检测不可穿越障碍物
        for (let obstacle of obstacles) {
            if (!obstacle.isPassable &&
                proj.x < obstacle.x + obstacle.size &&
                proj.x + proj.size > obstacle.x &&
                proj.y < obstacle.y + obstacle.size &&
                proj.y + proj.size > obstacle.y) {
                
                player.projectiles.splice(i, 1);
                break;
            }
        }
    }

    player.projectiles = player.projectiles.filter(proj => proj.isVisible());
}

// 检测玩家是否在草丛里
function isPlayerInGrass() {
    for (let obstacle of obstacles) {
        if (obstacle.isPassable && 
            player.x < obstacle.x + obstacle.size &&
            player.x + player.size > obstacle.x &&
            player.y < obstacle.y + obstacle.size &&
            player.y + player.size > obstacle.y) {
            return true;
        }
    }
    return false;
}

// 碰撞检测
function checkCollisions() {
    // 玩家与敌人碰撞检测
    for (let enemy of enemies) {
        if (player.x < enemy.x + enemy.size &&
            player.x + player.size > enemy.x &&
            player.y < enemy.y + enemy.size &&
            player.y + player.size > enemy.y) {
            isGameOver = true;
        }
    }

    // 玩家与障碍物碰撞检测
    for (let obstacle of obstacles) {
        if (!obstacle.isPassable &&
            player.x < obstacle.x + obstacle.size &&
            player.x + player.size > obstacle.x &&
            player.y < obstacle.y + obstacle.size &&
            player.y + player.size > obstacle.y) {
            player.undoMove();
        }
    }

    // 子弹与敌人碰撞检测
    for (let i = enemies.length - 1; i >= 0; i--) {
        for (let j = player.projectiles.length - 1; j >= 0; j--) {
            let enemy = enemies[i];
            let proj = player.projectiles[j];

            if (proj.x < enemy.x + enemy.size &&
                proj.x + proj.size > enemy.x &&
                proj.y < enemy.y + enemy.size &&
                proj.y + proj.size > enemy.y) {
                
                enemies.splice(i, 1);
                player.projectiles.splice(j, 1);
                break;
            }
        }
    }
}

// 角色基类
class Character {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    display() {
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
    }
}

// 玩家类（新增方向控制）
class Player extends Character {
    constructor(x, y) {
        super(x, y, 50, 'green');
        this.speed = 5;
        this.projectiles = [];
        this.prevX = x;
        this.prevY = y;
        this.lastDirection = 'up'; // 新增方向记录
    }

    update() {
        this.prevX = this.x;
        this.prevY = this.y;

        // 更新移动方向记录
        if (keyIsDown(UP_ARROW)) {
            this.y -= this.speed;
            this.lastDirection = 'up';
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.y += this.speed;
            this.lastDirection = 'down';
        }
        if (keyIsDown(LEFT_ARROW)) {
            this.x -= this.speed;
            this.lastDirection = 'left';
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.x += this.speed;
            this.lastDirection = 'right';
        }

        this.x = constrain(this.x, 0, width - this.size);
        this.y = constrain(this.y, 0, height - this.size);
    }

    undoMove() {
        this.x = this.prevX;
        this.y = this.prevY;
    }

    shoot() {
        const centerX = this.x + this.size/2 - 2.5;
        const centerY = this.y + this.size/2 - 2.5;
        this.projectiles.push(new Projectile(centerX, centerY, this.lastDirection));
    }
}

// 敌人类（新增障碍物碰撞检测）
class Enemy extends Character {
    constructor(x, y) {
        super(x, y, 40, 'red');
        this.speed = 0.3; // 提高移动速度
        this.prevX = x;
        this.prevY = y;
    }

    update() {
        this.prevX = this.x;
        this.prevY = this.y;

        if (isPlayerInGrass()) {
            // 随机移动
            this.x += random(-this.speed, this.speed);
            this.y += random(-this.speed, this.speed);
        } else {
            // 追踪玩家
            let dx = player.x - this.x;
            let dy = player.y - this.y;
            let dist = sqrt(dx * dx + dy * dy);
            if (dist > 0) {
                this.x += (dx / dist) * this.speed;
                this.y += (dy / dist) * this.speed;
            }
        }

        // 边界约束
        this.x = constrain(this.x, 0, width - this.size);
        this.y = constrain(this.y, 0, height - this.size);

        // 障碍物碰撞检测
        for (let obstacle of obstacles) {
            if (!obstacle.isPassable &&
                this.x < obstacle.x + obstacle.size &&
                this.x + this.size > obstacle.x &&
                this.y < obstacle.y + obstacle.size &&
                this.y + this.size > obstacle.y) {
                this.undoMove();
                break;
            }
        }
    }

    undoMove() {
        this.x = this.prevX;
        this.y = this.prevY;
    }
}

// 障碍物类
class Obstacle extends Character {
    constructor(x, y, isPassable) {
        let color = isPassable ? 'lightgreen' : 'gray';
        super(x, y, 50, color);
        this.isPassable = isPassable;
    }
}

// 子弹类（新增方向控制）
class Projectile {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.speed = 10;
        this.direction = direction;
    }

    update() {
        switch(this.direction) {
            case 'up':
                this.y -= this.speed;
                break;
            case 'down':
                this.y += this.speed;
                break;
            case 'left':
                this.x -= this.speed;
                break;
            case 'right':
                this.x += this.speed;
                break;
        }
    }

    display() {
        fill('blue');
        rect(this.x, this.y, this.size, this.size);
    }

    isVisible() {
        return this.x > -this.size && 
               this.x < width &&
               this.y > -this.size && 
               this.y < height;
    }
}

// 按键监听（新增方向射击支持）
function keyPressed() {
    if (key === ' ') {
        player.shoot();
    }
}