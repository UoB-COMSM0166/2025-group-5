// 创建敌人
function createEnemies() 
{
    for (let i = 0; i < enemyCount; i++) 
    {
        enemies.push(new Enemy(random(width - 50), random(height - 50), 
            soldierSize, enemyTexture, soldierHealth, soldierHealth, soldierAttack,
            charStatus.NORMAL, soldierSpeed));
    }
}

// 创建障碍物
function createObstacles() 
{
    for (let i = 0; i < obstacleCount; i++) 
    {
        let x = random(width - 50);
        let y = random(height - 50);
        let isPassable = random() < 0.5;
        obstacles.push(new Obstacle(x, y, isPassable));
        if(isPassable)
        {
            obstacles[i].changeFormat(grassTexture);
        }
        else
        {
            obstacles[i].changeFormat(obstacleTexture);
        }
    }
}

// 绘制敌人
function drawEnemies() 
{
    for (let enemy of enemies) 
    {
        enemy.update();
        enemy.display();
    }
}

// 绘制障碍物
function drawObstacles() 
{
    for (let obstacle of obstacles) 
    {
        obstacle.display();
    }
}

// 绘制子弹
function drawProjectiles() 
{
    for (let i = player.projectiles.length - 1; i >= 0; i --) 
    {
        let proj = player.projectiles[i];
        proj.update();
        proj.display();

        // 只检测不可穿越障碍物
        for (let obstacle of obstacles) 
        {
            if (!obstacle.isPassable &&
                proj.x < obstacle.x + obstacle.size &&
                proj.x + proj.size > obstacle.x &&
                proj.y < obstacle.y + obstacle.size &&
                proj.y + proj.size > obstacle.y) 
            {
                player.projectiles.splice(i, 1);
                break;
            }
        }
    }

    player.projectiles = player.projectiles.filter(proj => proj.isVisible());
}

// 检测玩家是否在草丛里
function isPlayerInGrass() 
{
    for (let obstacle of obstacles) 
    {
        if (obstacle.isPassable && 
            player.x < obstacle.x + obstacle.size &&
            player.x + player.size > obstacle.x &&
            player.y < obstacle.y + obstacle.size &&
            player.y + player.size > obstacle.y) 
        {
            return true;
        }
    }
    return false;
}

// 碰撞检测
function checkCollisions() 
{
    // 玩家与敌人碰撞检测
    for (let enemy of enemies) 
    {
        if (player.x < enemy.x + enemy.size &&
            player.x + player.size > enemy.x &&
            player.y < enemy.y + enemy.size &&
            player.y + player.size > enemy.y) 
        {
            isGameOver = true;
            gameState = 'over';
        }
    }

    // 玩家与障碍物碰撞检测
    for (let obstacle of obstacles) 
    {
        if (!obstacle.isPassable &&
            player.x < obstacle.x + obstacle.size &&
            player.x + player.size > obstacle.x &&
            player.y < obstacle.y + obstacle.size &&
            player.y + player.size > obstacle.y) 
        {
            player.undoMove();
        }
    }

    // 子弹与敌人碰撞检测
    for (let i = enemies.length - 1; i >= 0; i --)
    {
        for (let j = player.projectiles.length - 1; j >= 0; j--) 
        {
            let enemy = enemies[i];
            let proj = player.projectiles[j];

            if (proj.x < enemy.x + enemy.size &&
                proj.x + proj.size > enemy.x &&
                proj.y < enemy.y + enemy.size &&
                proj.y + proj.size > enemy.y) 
            {    
                enemies[i].changeHealth(- player.getAttack());
                if(enemies[i].getStatus() === charStatus.DEAD)
                { // remove dead enemy.
                    enemies.splice(i, 1);
                }
                player.projectiles.splice(j, 1);

                gameMusic.playSFX("hit");
                break;
            }
        }
    }
}
