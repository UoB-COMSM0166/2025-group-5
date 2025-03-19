class Level
{
    constructor(id, jsonFile, bGTexture, lightTexture)
    {
        this.id = id;
        this.jsonFile = jsonFile;
        this.jsonData = null;
        this.player = null;
        this.enemies = [];
        this.obstacles = [];
        this.bGTexture = bGTexture;
        this.lightTexture = lightTexture;
        this.curtain = new Curtain(canvasWidth, canvasHeight, 
            "black", 0, 0, transparentRadius);
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
            this.jsonData.player.position.y, attributes.player.size);
        // 创建敌人对象
        this.createEnemies();
        // 创建障碍物对象
        this.createObstacles();
    }

    update()
    {
        this.drawBG(); // 绘制背景

        this.player.update();
        this.player.display();

        this.drawEnemies();
        // this.drawObstacles();
        this.drawProjectiles();
        this.checkCollisions();

        this.drawLight(); // 绘制前景

        this.drawCurtain();
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
    
        this.player.projectiles = 
            this.player.projectiles.filter(proj => proj.isVisible());
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

    drawBG()
    {
        background(172, 199, 101);
        image(this.bGTexture, 0, 0, canvasWidth, canvasHeight);
    }

    drawLight()
    {
        image(this.lightTexture, 0, 0, canvasWidth, canvasHeight);
    }

    createEnemies()
    {
        for(let enemy of this.jsonData.enemies)
        {
            let temp = new Enemy(enemy.position.x, 
                enemy.position.y, attributes[enemy.type].size, 
                image_map[enemy.type + '_idle'], attributes[enemy.type].health,
                attributes[enemy.type].health, 
                attributes[enemy.type].attack, 
                charStatus.NORMAL, attributes[enemy.type].speed,
                enemy.patrolPath, attributes[enemy.type].attackRange,
                attributes[enemy.type].warningRange);
            this.enemies.push(temp);
        }
    }

    createObstacles()
    { // 根据level.json中的内容创建隐形墙
        for(let obstacle of this.jsonData.obstacles)
        {
            let temp = new Obstacle(obstacle.position.x, 
                obstacle.position.y, attributes[obstacle.type].size , false);
            temp.changeFormat(grassTexture);
            this.obstacles.push(temp);
        }
    }

    drawCurtain()
    {
        this.curtain.update(
            this.player.get_x_position() + this.player.getSize() / 2, 
            this.player.get_y_position() + this.player.getSize() / 2);
        this.curtain.display();
    }
}