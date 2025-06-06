class Level
{
    constructor(id, jsonFile, bGTexture, lightTexture, curtainFlag)
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
        this.prompt = new Prompt(
            0, canvasHeight / 3 * 2, canvasWidth, canvasHeight / 3, "",
            textBoardTexture
        );
        this.tempPlayer = null;
        this.transformFlag = false;
        this.promptFlag = false;
        this.endFlag = false;
        this.endAnimation = false;
        this.curtainFlag = curtainFlag;
        this.endTimer = 0;
        this.endMaxTimer = 90;
        this.startAnimation = true;
        this.startTimer = 0;
        this.startMaxTimer = 90;
    }

    async init()
    {
        this.jsonData = await loadJsonData(this.jsonFile);
    }

    start()
    {
        //Clear existing objects
        this.player = null;
        this.enemies = [];
        this.obstacles = [];

        //Create the player object
        this.player = new Player(this.jsonData.player.position.x, 
            this.jsonData.player.position.y, attributes.player.size, 
            playerTexture, attributes.player.health, attributes.player.health,
            attributes.player.attack, charStatus.NORMAL, attributes.player.speed,
            attributes.player.attackRange, attributes.player.warningRange,
            attributes.player.playerType, attributes.player.cd,
            attributes.player.visionType, attributes.player.shootSize,
            attributes.player.shootSpeed, attributes.player.shootDis,
            attributes.player.shootFormat, attributes.player.skill,
            attributes.player.animationFlag, animations["player"],
            []
        );
        //Create enemy objects
        this.createEnemies();
        //Create interactive objects
        this.createEntities();
        //Create obstacle objects
        this.createObstacles();
    }

    update()
    {
        this.drawBG(); //Draw the background
        if(!this.promptFlag && !this.startAnimation)
        {
            this.player.update();
            this.player.display();

            this.drawEnemies();
            this.drawEntities();
            // this.drawObstacles();
            this.drawProjectiles();
            this.checkCollisions();
            this.drawLight(); // Draw the foreground

            if(this.curtainFlag)
            {
                this.drawCurtain(); // Draw the curtain
            }
            
            this.skillBar.display();
        } 
        else
        {
            this.drawWithoutUpdate();

            
            if(!this.endAnimation && !this.startAnimation)this.prompt.display();
            else if(this.endAnimation)
            {
                fill(0, 0, 0, 255 * this.endTimer / this.endMaxTimer);
                noStroke();
                rect(0, 0, canvasWidth, canvasHeight);
                this.endTimer ++;
                if(this.endTimer === this.endMaxTimer) 
                {
                    gameState = "interLevel";
                    levelCleared[present_level - 1] = true;
                    this.reset();
                }
            }
            else 
            {
                fill(0, 0, 0, 255 - 255 * this.startTimer / this.startMaxTimer);
                noStroke();
                rect(0, 0, canvasWidth, canvasHeight);
                this.startTimer ++;
                if(this.startTimer === this.startMaxTimer)
                {
                    this.startAnimation = false;
                }
            }
        }
    }

    drawWithoutUpdate()
    {
        this.player.display();
        for (let enemy of this.enemies) 
        {
            enemy.display();
        }
        for (let entity of this.entities) 
        {
            entity.display();
        }
        this.drawLight(); // Draw the foreground

        if(this.curtainFlag)
        {
            this.drawCurtain(); // Draw the curtain
        }
        
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
        //Player bullets
        this.player.projectiles.forEach(
            proj => {       
                proj.update();       
                proj.display();   
            }
        );
    
        this.player.projectiles = 
            this.player.projectiles.filter(proj => proj.isVisible(this.obstacles));

        // Enemy bullets
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
        //Player damage detection
        if(this.player.getStatus() !== charStatus.INVINCIBLE)
        {
            //Collision detection between player and enemies
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
                        this.player.changeAbnormalStatus(this.enemies[i].skill);
                    }
                    if(this.player.playerType === "collision")
                    {
                        if(this.enemies[i].getStatus() !== charStatus.INVINCIBLE)
                        {
                            this.enemies[i].changeHealth(- this.player.getAttack());
                            this.enemies[i].changeStatus(charStatus.INVINCIBLE);
                            this.enemies[i].changeAbnormalStatus(this.player.skill);
                            if(this.enemies[i].getHealth() === 0)
                            { // remove dead enemy.
                                this.skillBar.addSkill(this.enemies[i].getEnemyId());
                                this.enemies.splice(i, 1);
                            }
                        }
                    }
                }

                

            }
        }

        //Collision detection between player and obstacles
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

        // Collision detection between enemies and obstacles, implemented in the Enemy class

        // Collision detection between bullets and enemies
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
                        this.enemies[i].changeStatus(charStatus.INVINCIBLE);
                        this.enemies[i].changeAbnormalStatus(proj.skill);
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

        // Collision detection between enemy bullets and the player
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
                        this.player.changeAbnormalStatus(proj.skill);
                        this.enemies[i].projectiles.splice(j, 1);
                        break;
                    }
                }
            }
        }

        // Game over and transformation end detection
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
                bullet_map[enemy.type],
                attributes[enemy.type].skill,
                attributes[enemy.type].animationFlag, 
                animations[enemy.type]
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
    { // Create invisible walls based on the content in level.json
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
        if(!this.promptFlag && !this.startAnimation)
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
                if(this.skillBar.useSkill(key - '1', this.transformFlag))
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
                                        bullet_map[name],
                                        attributes[name].skill,
                                        attributes[name].animationFlag, 
                                        animations[name],
                                        this.tempPlayer.inv
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
            else if(key === 'e')
            { // If the player presses 'E', check for triggerable entities nearby
                for(let i = 0; i < this.entities.length; i ++)
                {
                    if(this.entities[i].triggerableFlag)
                    {
                        if(this.entities[i].isMatched(this))
                        {
                            for(let inv of this.entities[i].matchedResult.getInv)
                            {
                                this.player.inv.push(inv);
                            }
                            for(let inv of this.entities[i].matchedResult.consumeInv)
                            {
                                let index = this.player.inv.indexOf(inv);
                                if(index !== -1 )
                                {
                                    this.player.inv.splice(index, 1);
                                }
                            }
                            if(this.entities[i].matchedResult.mapChange)
                            {
                                this.endFlag = true;
                            }
                            this.prompt.updateText(this.entities[i].matchedResult.prompt);
                            if(this.entities[i].expireAfterTriggered)
                            {
                                this.entities.splice(i, 1);
                            }
                        }
                        else 
                        {
                            this.prompt.updateText(this.entities[i].unmatchedResult.prompt);
                        }
                        this.promptFlag = true;
                        break;
                    }
                }
            }
        }
        else if(key === ' ' && !this.endFlag)
        {
            this.promptFlag = false;
        }
        else if(key === ' ')
        {
            this.endAnimation = true;
        }
    }

    reset()
    {
        this.enemies = [];
        this.entities = [];
        this.obstacles = [];
        this.transformFlag = false;
        this.promptFlag = false;
        this.endFlag = false;
        this.endAnimation = false;
        this.endTimer = 0;
        this.endMaxTimer = 90;
        this.startAnimation = true;
        this.startTimer = 0;
        this.startMaxTimer = 90;
    }
}