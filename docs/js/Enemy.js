// 敌人类
class Enemy extends Character 
{
    constructor(enemyId, x, y, size, format, health, maxHealth, 
        attack, status, speed, patrolPath,
        attackRange, warningRange, enemyType, cd, visionType,
        shootSize, shootSpeed, shootDis, shootFormat, skill, 
        animationFlag, animationSet)
    {
        super(x, y, size, format, health, maxHealth, attack, 
            status, speed, animationFlag, animationSet);
        this.enemyId = enemyId;
        this.prevX = x;
        this.prevY = y;
        this.patrolPath = patrolPath;
        this.nextPatrolPoint = patrolPath[0];
        this.nextPatroIndex = 0;
        this.findPalyer = false;
        this.attackRange = attackRange;
        this.warningRange = warningRange;
        this.enemyType = enemyType;
        this.cd = cd;
        this.visionType = visionType;

        this.shootSize = shootSize;
        this.shootSpeed = shootSpeed;
        this.shootDis = shootDis;
        this.shootFormat = shootFormat;

        this.skill = skill;

        this.projectiles = [];

        this.factSpeed = speed;
        this.factCd = cd;

        this.state = "moveLeft";
    }

    update(level) 
    {
        this.isFindPlayer(level.player);

        if(this.attackCdTimer === 0)
        { // 仅当攻击cd置零时可以发动攻击
            this.enemyMove(level);
            this.doAttack(level.player.x + level.player.size / 2, 
                        level.player.y + level.player.size / 2);
        }

        this.invincibleTimerUpdate();
        
        this.attackCdUpdate();

        this.abnormalTimerUpdate();

        this.fireEffect();

        this.stateUpdate(level);
    }

    undoMove() 
    {
        this.x = this.prevX;
        this.y = this.prevY;
    }

    getEnemyId()
    {
        return this.enemyId;
    }

    enemyMove(level)
    {
        this.prevX = this.x;
        this.prevY = this.y;

        if(this.isGetPoint())
        {
            this.nextPatroIndex = (this.nextPatroIndex + 1) % this.patrolPath.length;
            this.nextPatrolPoint = this.patrolPath[this.nextPatroIndex];
        }

        if (!this.findPalyer) 
        {
            // 按照巡逻路线移动
            let dx = this.nextPatrolPoint.x - this.x;
            let dy = this.nextPatrolPoint.y - this.y;
            let dist = sqrt(dx * dx + dy * dy);
            if (dist > 0) 
            {
                this.x += (dx / dist) * this.speed;
                this.y += (dy / dist) * this.speed;
            }
        } 
        else 
        {
            // 追踪玩家
            let dx = level.player.x - this.x;
            let dy = level.player.y - this.y;
            let dist = sqrt(dx * dx + dy * dy);
            if (dist > 0) 
            {
                this.x += (dx / dist) * this.speed;
                this.y += (dy / dist) * this.speed;
            }
        }

        // 边界约束
        this.x = constrain(this.x, 0, width - this.size);
        this.y = constrain(this.y, 0, height - this.size);

        // 障碍物碰撞检测
        for (let obstacle of level.obstacles) 
        {
            if (!obstacle.isPassable &&
                this.x < obstacle.x + obstacle.size &&
                this.x + this.size > obstacle.x &&
                this.y < obstacle.y + obstacle.size &&
                this.y + this.size > obstacle.y) 
            {
                if(
                    this.prevY >= obstacle.y + obstacle.size ||
                    this.prevY + this.size <= obstacle.y)
                {
                    this.y = this.prevY;
                    if(this.x > this.prevX) this.x = this.prevX + this.speed;
                    else this.x = this.prevX - this.speed;
                }
                else if(this.prevX >= obstacle.x + obstacle.size ||
                    this.prevX + this.size <= obstacle.x)
                {
                    this.x = this.prevX;
                    if(this.y > this.prevY) this.y = this.prevY + this.speed;
                    else this.y = this.prevY - this.speed;
                }
                else
                {
                    this.undoMove();
                }
            }
            
        }
    }

    invincibleTimerUpdate()
    {
        // 无敌状态倒计时
        if(this.invincibleTimer !== 0)this.invincibleTimer --;
        if(this.invincibleTimer === 0)
        {
            if(this.health <= 0)
            {
                this.status = charStatus.DEAD;
            }
            else if(this.health <= this.maxHealth / 10)
            {
                this.status = charStatus.DYING;
            }
            else 
            {
                this.status = charStatus.NORMAL;
            }
        }
    }

    attackCdUpdate()
    {
        if(this.attackCdTimer !== 0)this.attackCdTimer --;
    }

    abnormalTimerUpdate()
    {
        if(this.abnormalTimer !== 0)this.abnormalTimer --;
        else 
        {
            this.abnormalStatus = "none";
            this.speed = this.factSpeed;
            this.cd = this.factCd;
        }
    }

    doAttack(playerX, playerY)
    {
        let centerX = this.x + this.size / 2;
        let centerY = this.y + this.size / 2;
        if(Math.sqrt((centerX - playerX) * (centerX - playerX)
                    + (centerY - playerY) * (centerY - playerY)) 
                    < this.attackRange)
        {
            if(this.enemyType === "shooting")
            {
                this.projectiles.push(new Projectile(centerX, centerY, 
                    playerX - centerX, playerY - centerY, this.shootSize, 
                    this.shootSpeed, this.shootDis, this.shootFormat, this.skill));
            }
            else if(this.enemyType === "aoe")
            {
                let baseAngle = Math.floor(Math.random() * 31);
                for(let i = 0; i < 12; i ++)
                {
                    let angle = (baseAngle + 30 * i) * (Math.PI / 180);
                    this.projectiles.push(new Projectile(centerX, centerY, 
                        Math.cos(angle), Math.sin(angle), this.shootSize, 
                        this.shootSpeed, this.shootDis, this.shootFormat, this.skill));
                }
            }
            this.attackCdTimer = this.cd;
        }
    }

    isFindPlayer(player)
    {
        let dis = Math.sqrt((this.x - player.x) * (this.x - player.x) 
                    + (this.y - player.y) * (this.y - player.y));
        if(dis < this.warningRange)
        {
            this.findPalyer = true;
        } 
        else 
        {
            this.findPalyer = false;
        }
        return this.findPalyer;
    }

    isGetPoint()
    {
        if(Math.sqrt((this.x - this.nextPatrolPoint.x)
                    * (this.x - this.nextPatrolPoint.x)
                    + (this.y - this.nextPatrolPoint.y)
                    * (this.y - this.nextPatrolPoint.y)) < this.speed)
        return true;
        else return false;
    }

    changeAbnormalStatus(status)
    {
        if(status === "fire")
        {
            this.abnormalStatus = "fire";
            this.abnormalTimer = globalFireStatusTimer;
            this.speed = this.factSpeed;
            this.cd = this.factCd / globalFireSpeedFactor;
        }
        else if(status === "water")
        {
            this.abnormalStatus = "water";
            this.abnormalTimer = globalWaterStatusTimer;
            this.speed = this.factSpeed * globalWaterSpeedFactor;
            this.cd = this.factCd / globalWaterSpeedFactor;
        }
    }

    fireEffect()
    {
        if(this.abnormalStatus === "fire" && this.abnormalTimer % 60 == 0)
        {
            this.changeHealth(- globalFireHealthPerSec);
        }
    }

    stateUpdate(level)
    {
        if (!this.findPalyer) 
        {
            if(this.nextPatrolPoint.x - this.x >= 0)
            {
                if(this.attackCdTimer !== 0) this.state = "attackRight";
                else this.state = "moveRight";
            }
        }
        else 
        {
            if(level.player.x - this.x >= 0)
            {
                if(this.attackCdTimer !== 0) this.state = "attackAttack";
                else this.state = "moveLeft";
            }
        }
    }
}
