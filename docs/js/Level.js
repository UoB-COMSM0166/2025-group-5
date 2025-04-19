class Level
{
    constructor(id, jsonFile, bGTexture, lightTexture)
    {
        this.id = id;
        this.jsonFile = jsonFile;
        this.jsonData = null;
        this.player = null;
        this.enemies = [];
        this.entities = [];
        this.obstacles = [];
        this.bGTexture = bGTexture;
        this.lightTexture = lightTexture;
        this.curtain = new Curtain(canvasWidth, canvasHeight, 
            "black", 0, 0, transparentRadius, "sector", transparentSectorRadius);
        this.skillBar = new SkillBar(g_skillNumber, g_skillTextureList, 
            questionMarkTexture, g_skillStatusList, g_skillNumList, 
            g_skillBarX, g_skillBarY, g_skillBarHeight, g_skillBarWidth,
            g_skillBarBlankWidth, g_textSize);
        this.tempPlayer = null;
        this.transformFlag = false;
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
            this.jsonData.player.position.y, attributes.player.size, 
            playerTexture, attributes.player.health, attributes.player.health,
            attributes.player.attack, charStatus.NORMAL, attributes.player.speed,
            attributes.player.attackRange, attributes.player.warningRange,
            attributes.player.playerType, attributes.player.cd,
            attributes.player.visionType, attributes.player.shootSize,
            attributes.player.shootSpeed, attributes.player.shootDis,
            attributes.player.shootFormat,
        );
        // 创建敌人对象
        this.createEnemies();
        // 创建可交互对象
        this.createEntities();
        // 创建障碍物对象
        this.createObstacles();
    }

    update()
    {
        this.drawBG(); // 绘制背景

        this.player.update();
        this.player.display();

        this.drawEnemies();
        this.drawEntities();
        // this.drawObstacles();
        this.drawProjectiles();
        this.checkCollisions();

        this.drawLight(); // 绘制前景

        // this.drawCurtain(); // 绘制幕布
        
        this.skillBar.display();
    }

    drawEntities()
    {
        for (let entity of this.entities) 
        {
            entity.update(this);
            entity.display();
        }
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
        // 玩家子弹
        this.player.projectiles.forEach(
            proj => {       
                proj.update();       
                proj.display();   
            }
        );
    
        this.player.projectiles = 
            this.player.projectiles.filter(proj => proj.isVisible(this.obstacles));

        // 敌人子弹
        for (let i = this.enemies.length - 1; i >= 0; i --) 
        {
        
            this.enemies[i].projectiles.forEach(
                proj => {
                    proj.update();
                    proj.display();
                }
            );
            this.enemies[i].projectiles.filter(proj => proj.isVisible(this.obstacles));
            
        }
    }

    checkCollisions()
    {
        // 玩家遭受伤害判定
        if(this.player.getStatus() !== charStatus.INVINCIBLE)
        {
            // 玩家与敌人碰撞检测
            for (let i = this.enemies.length - 1; i >= 0; i --) 
            {

                if (this.player.x < this.enemies[i].x + this.enemies[i].size &&
                    this.player.x + this.player.size > this.enemies[i].x &&
                    this.player.y < this.enemies[i].y + this.enemies[i].size &&
                    this.player.y + this.player.size > this.enemies[i].y) 
                {
                    if(this.enemies[i].enemyType === "collision")
                    {
                        this.player.changeHealth(- this.enemies[i].getAttack());
                        this.player.changeStatus(charStatus.INVINCIBLE);
                    }
                    if(this.player.playerType === "collision")
                    {
                        this.enemies[i].changeHealth(- this.player.getAttack());
                        this.enemies[i].changeStatus(charStatus.INVINCIBLE);
                        if(this.enemies[i].getHealth() === 0)
                        { // remove dead enemy.
                            this.skillBar.addSkill(this.enemies[i].getEnemyId());
                            this.enemies.splice(i, 1);
                        }
                    }
                }

                

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

        // // 敌人与障碍物碰撞检测,在enemy类中实现

        // 子弹与敌人碰撞检测
        for (let i = this.enemies.length - 1; i >= 0; i --)
        {
            for (let j = this.player.projectiles.length - 1; j >= 0; j--) 
            {
                let enemy = this.enemies[i];
                let proj = this.player.projectiles[j];
                if(enemy.getStatus() !== charStatus.INVINCIBLE)
                {
                    if (proj.x < enemy.x + enemy.size &&
                        proj.x + proj.size > enemy.x &&
                        proj.y < enemy.y + enemy.size &&
                        proj.y + proj.size > enemy.y) 
                    {    
                        this.enemies[i].changeHealth(- this.player.getAttack());
                        enemy.changeStatus(charStatus.INVINCIBLE);
                        
                        this.player.projectiles.splice(j, 1);

                        gameMusic.playSFX("hit");
                        break;
                    }
                }
            }
            if(this.enemies[i].getHealth() === 0)
            { // remove dead enemy.
                this.skillBar.addSkill(this.enemies[i].getEnemyId());
                this.enemies.splice(i, 1);
            }
        }

        // 敌人子弹与玩家碰撞检测
        for (let i = this.enemies.length - 1; i >= 0; i --)
        {
            for (let j = this.enemies[i].projectiles.length - 1; j >= 0; j--) 
            {
                let proj = this.enemies[i].projectiles[j];
                if(this.player.getStatus() !== charStatus.INVINCIBLE)
                {
                    if (proj.isHit(this.player)) 
                    {
                        this.player.changeHealth(- this.enemies[i].getAttack());
                        this.player.changeStatus(charStatus.INVINCIBLE);

                        this.enemies[i].projectiles.splice(j, 1);
                        break;
                    }
                }
            }
        }

        // 游戏失败及变身结束判定
        if(this.player.getHealth() === 0)
        {
            if(!this.transformFlag)
            {
                isGameOver = true;
                gameState = 'over';
            }
            else 
            {
                let temp_x = this.player.get_x_position();
                let temp_y = this.player.get_y_position();
                this.player = this.tempPlayer;
                this.player.set_x_position(temp_x);
                this.player.set_y_position(temp_y);
                this.player.changeStatus(charStatus.INVINCIBLE);
                this.player.invincibleTimer = globalInvincibleTimer;
                this.transformFlag = false;
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
            let temp = new Enemy(attributes[enemy.type].enemyId,
                enemy.position.x, 
                enemy.position.y, attributes[enemy.type].size, 
                image_map[enemy.type + '_idle'], attributes[enemy.type].health,
                attributes[enemy.type].health, 
                attributes[enemy.type].attack, 
                charStatus.NORMAL, attributes[enemy.type].speed,
                enemy.patrolPath, attributes[enemy.type].attackRange,
                attributes[enemy.type].warningRange, 
                attributes[enemy.type].enemyType,
                attributes[enemy.type].cd,
                attributes[enemy.type].visionType,
                attributes[enemy.type].shootSize,
                attributes[enemy.type].shootSpeed,
                attributes[enemy.type].shootDis,
                bullet_map[enemy.type]
            );
            this.enemies.push(temp);
        }
    }

    createEntities()
    {
        for(let entity of this.jsonData.entities)
        {
            let temp = new Entity(entity.position.x,
                entity.position.y,
                attributes[entity.type].size,
                attributes[entity.type].isPassable,
                image_map[entity.type + '_idle'],
                entity.type,
                entity.triggerDis,
                entity.condition,
                entity.unmatchedResult,
                entity.matchedResult,
                entity.expireAfterTriggered
            );
            this.entities.push(temp);
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
        if("round" === this.player.visionType)
        {
            this.curtain.update(
                this.player.get_x_position() + this.player.getSize() / 2, 
                this.player.get_y_position() + this.player.getSize() / 2,
                this.player.warningRange,
                this.player.visionType,
                this.player.warningRange,
                "up"
            );
        }
        else 
        {
            this.curtain.update(
                this.player.get_x_position() + this.player.getSize() / 2, 
                this.player.get_y_position() + this.player.getSize() / 2,
                transparentRadius,
                this.player.visionType,
                this.player.warningRange,
                this.player.lastDirection
            );
        }
        this.curtain.display();
    }

    keyPressedInLevel()
    {
        if(key === ' ' && this.player.playerType === "shooting")
        {
            this.player.shoot();
        }
        else if(key === ' ' && this.player.playerType === "aoe")
        {
            this.player.aoe();
        }
        else if(key === '1' || key === '2' || key === '3' || key === '4'
             || key === '5' || key === '6' || key === '7' || key === '8'
             || key === '9')
        {
            if(this.skillBar.useSkill(key - '1'))
            {
                if(!this.transformFlag)
                {
                    this.tempPlayer = this.player;
                    for(let name in attributes)
                    {
                        if("enemyId" in attributes[name])
                        {
                            this.transformFlag = true;
                            if(attributes[name].enemyId == key - '1')
                            {
                                this.player = new Player(this.tempPlayer.get_x_position(),
                                    this.tempPlayer.get_y_position(),
                                    attributes[name].size,
                                    g_skillTextureList[key - '1'],
                                    attributes[name].health,
                                    attributes[name].health,
                                    attributes[name].attack,
                                    charStatus.NORMAL,
                                    attributes[name].speed,
                                    attributes[name].attackRange,
                                    attributes[name].warningRange,
                                    attributes[name].enemyType,
                                    attributes[name].cd,
                                    attributes[name].visionType,
                                    attributes[name].shootSize,
                                    attributes[name].shootSpeed,
                                    attributes[name].shootDis,
                                    bullet_map[name]
                                );
                            }
                        }
                    }
                }
            }
        }
        else if(key === 'q')
        {
            if(this.transformFlag === true)
            {
                let temp_x = this.player.get_x_position();
                let temp_y = this.player.get_y_position();
                this.player = this.tempPlayer;
                this.player.set_x_position(temp_x);
                this.player.set_y_position(temp_y);
                this.player.changeStatus(charStatus.INVINCIBLE);
                this.player.invincibleTimer = globalInvincibleTimer;
                this.transformFlag = false;
            }
        }
    }
}