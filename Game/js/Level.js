class Level
{
    constructor(id, jsonFile)
    {
        this.id = id;
        this.jsonFile = jsonFile;
        this.jsonData = null;
        this.player = null;
        this.enemies = [];
        this.obstacles = [];
    }

    async init()
    {
        this.jsonData = await loadJsonData(this.jsonFile);
    }

    start()
    {
        // 清空原有对象
        this.player = null;
        this.enemies = [];
        this.obstacles = [];

        // 创建玩家对象
        this.player = new Player(this.jsonData.player.position.x, 
            this.jsonData.player.position.y);
        // 创建敌人对象
        for (let i = 0; i < enemyCount; i++) 
        {
            this.enemies.push(new Enemy(random(width - 50), random(height - 50), 
                soldierSize, enemyTexture, soldierHealth, soldierHealth, soldierAttack,
                charStatus.NORMAL, soldierSpeed));
        }
        // 创建障碍物对象
        for (let i = 0; i < obstacleCount; i++) 
        {
            let x = random(width - 50);
            let y = random(height - 50);
            let isPassable = random() < 0.5;
            this.obstacles.push(new Obstacle(x, y, isPassable));
            if(isPassable)
            {
                this.obstacles[i].changeFormat(grassTexture);
            }
            else
            {
                this.obstacles[i].changeFormat(obstacleTexture);
            }
        }
    }

    update()
    {
        this.player.update();
        this.player.display();

        this.drawEnemies();
        this.drawObstacles();
        this.drawProjectiles();
        this.checkCollisions();
    }

    drawEnemies()
    {
        for (let enemy of this.enemies) 
        {
            enemy.update(this);
            enemy.display();
        }
}

    drawObstacles()
    {
        for (let obstacle of this.obstacles) 
        {
            obstacle.display();
        }
    }

    drawProjectiles()
    {
        for (let i = this.player.projectiles.length - 1; i >= 0; i --) 
        {
            let proj = this.player.projectiles[i];
            proj.update();
            proj.display();
    
            // 只检测不可穿越障碍物
            for (let obstacle of this.obstacles) 
            {
                if (!obstacle.isPassable &&
                    proj.x < obstacle.x + obstacle.size &&
                    proj.x + proj.size > obstacle.x &&
                    proj.y < obstacle.y + obstacle.size &&
                    proj.y + proj.size > obstacle.y) 
                {
                    this.player.projectiles.splice(i, 1);
                    break;
                }
            }
        }
    
        this.player.projectiles = this.player.projectiles.filter(proj => proj.isVisible());
    }

    checkCollisions()
    {
        // 玩家与敌人碰撞检测
        for (let enemy of this.enemies) 
        {
            if (this.player.x < enemy.x + enemy.size &&
                this.player.x + this.player.size > enemy.x &&
                this.player.y < enemy.y + enemy.size &&
                this.player.y + this.player.size > enemy.y) 
            {
                isGameOver = true;
                gameState = 'over';
            }
        }

        // 玩家与障碍物碰撞检测
        for (let obstacle of this.obstacles) 
        {
            if (!obstacle.isPassable &&
                this.player.x < obstacle.x + obstacle.size &&
                this.player.x + this.player.size > obstacle.x &&
                this.player.y < obstacle.y + obstacle.size &&
                this.player.y + this.player.size > obstacle.y) 
            {
                this.player.undoMove();
            }
        }

        // 子弹与敌人碰撞检测
        for (let i = this.enemies.length - 1; i >= 0; i --)
        {
            for (let j = this.player.projectiles.length - 1; j >= 0; j--) 
            {
                let enemy = this.enemies[i];
                let proj = this.player.projectiles[j];

                if (proj.x < enemy.x + enemy.size &&
                    proj.x + proj.size > enemy.x &&
                    proj.y < enemy.y + enemy.size &&
                    proj.y + proj.size > enemy.y) 
                {    
                    this.enemies[i].changeHealth(- this.player.getAttack());
                    if(this.enemies[i].getStatus() === charStatus.DEAD)
                    { // remove dead enemy.
                        this.enemies.splice(i, 1);
                    }
                    this.player.projectiles.splice(j, 1);

                    gameMusic.playSFX("hit");
                    break;
                }
            }
        }
    }

    isPlayerInGrass()
    {
        for (let obstacle of this.obstacles) 
        {
            if (obstacle.isPassable && 
                this.player.x < obstacle.x + obstacle.size &&
                this.player.x + this.player.size > obstacle.x &&
                this.player.y < obstacle.y + obstacle.size &&
                this.player.y + this.player.size > obstacle.y) 
            {
                return true;
            }
        }
        return false;
    }
}