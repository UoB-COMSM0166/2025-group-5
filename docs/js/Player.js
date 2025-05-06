// 玩家类
class Player extends Character 
{
    constructor(x, y, size,
        format, health, maxHealth, attack, status, speed,
        attackRange, warningRange, playerType, cd, visionType,
        shootSize, shootSpeed, shootDis, shootFormat, skill, 
        animationFlag, animationSet, inv
    ) 
    {// Use playerTexture as the initial player image.
        super(x, y, size, format, health, 
            maxHealth, attack, 
            status, speed, 
            animationFlag, animationSet);
        this.projectiles = [];
        this.prevX = x;
        this.prevY = y;
        this.lastDirection = 'up'; // use the last direction to shoot.
        this.attackRange = attackRange;
        this.warningRange = warningRange;
        this.playerType = playerType;
        this.cd = cd;
        this.visionType = visionType;

        this.shootSize = shootSize;
        this.shootSpeed = shootSpeed;
        this.shootDis = shootDis;
        this.shootFormat = shootFormat;

        this.attackCdTimer = 0;

        this.skill = skill;

        this.inv = inv;

        this.factSpeed = speed;
        this.factCd = cd;

        this.state = "idleUp";
    }

    update() 
    { // to do: status changed by status here.
        this.prevX = this.x;
        this.prevY = this.y;

        // use D-pad to direct the movement.
        if (keyIsDown(UP_ARROW)) 
        {
            this.y -= this.speed;
            this.lastDirection = 'up';
        }
        else if (keyIsDown(DOWN_ARROW)) 
        {
            this.y += this.speed;
            this.lastDirection = 'down';
        }
        else if (keyIsDown(LEFT_ARROW)) 
        {
            this.x -= this.speed;
            this.lastDirection = 'left';
        }
        else if (keyIsDown(RIGHT_ARROW)) 
        {
            this.x += this.speed;
            this.lastDirection = 'right';
        }

        this.x = constrain(this.x, 0, width - this.size);
        this.y = constrain(this.y, 0, height - this.size);

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

        this.attackCdUpdate();
        
        this.abnormalTimerUpdate();

        this.fireEffect();

        this.stateUpdate();
    }

    undoMove() 
    {
        this.x = this.prevX;
        this.y = this.prevY;
    }

    shoot()
    {
        let dx, dy;
        switch(this.lastDirection){
            case "up":
                dx = 0;
                dy = -1;
                break;
            case "down":
                dx = 0;
                dy = 1;
                break;
            case "left":
                dx = -1;
                dy = 0;
                break;
            case "right":
                dx = 1;
                dy = 0;
                break;
        }
        const centerX = this.x + this.size/2 - 2.5;
        const centerY = this.y + this.size/2 - 2.5;
        if(this.attackCdTimer === 0)
        {
            this.projectiles.push(new Projectile(centerX, centerY, 
                dx, dy, this.shootSize, this.shootSpeed, 
                this.shootDis, this.shootFormat, this.skill));

            playerShootGunMusic();
            this.attackCdTimer = this.cd;
        }
    }

    aoe()
    {
        const centerX = this.x + this.size/2 - 2.5;
        const centerY = this.y + this.size/2 - 2.5;
        if(this.attackCdTimer === 0)
        {
            let baseAngle = Math.floor(Math.random() * 31);
            for(let i = 0; i < 8; i ++)
            {
                let angle = (baseAngle + 45 * i) * (Math.PI / 180);
                this.projectiles.push(new Projectile(centerX, centerY, 
                    Math.cos(angle), Math.sin(angle), this.shootSize, 
                    this.shootSpeed, this.shootDis, this.shootFormat, this.skill));
            }
            this.attackCdTimer = this.cd;
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

    stateUpdate()
    {
        if(this.attackCdTimer !== 0)
        {
            switch(this.lastDirection){
                case "up": 
                    this.state = 'attackUp';
                    break;
                case "down": 
                    this.state = 'attackDown';
                    break;
                case "left": 
                    this.state = 'attackLeft';
                    break;
                case "right": 
                    this.state = 'attackRight';
                    break;
                default:
                    break;
            }
            return;
        }
        if (keyIsDown(UP_ARROW)) 
        {
            this.state = 'moveUp';
        }
        else if (keyIsDown(DOWN_ARROW)) 
        {
            this.state = 'moveDown';
        }
        else if (keyIsDown(LEFT_ARROW)) 
        {
            this.state = 'moveLeft';
        }
        else if (keyIsDown(RIGHT_ARROW)) 
        {
            this.state = 'moveRight';
        } 
        else
        {
            switch(this.lastDirection){
                case "up": 
                    this.state = 'idleUp';
                    break;
                case "down": 
                    this.state = 'idleDown';
                    break;
                case "left": 
                    this.state = 'idleLeft';
                    break;
                case "right": 
                    this.state = 'idleRight';
                    break;
                default:
                    break;
            }
        }
    }
}
