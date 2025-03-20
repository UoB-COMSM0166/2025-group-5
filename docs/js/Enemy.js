// 敌人类
class Enemy extends Character 
{
    constructor(x, y, size, format, health, maxHealth, attack, status, speed, patrolPath,
        attackRange, warningRange, enemyType)
    {
        super(x, y, size, format, health, maxHealth, attack, status, speed);
        this.prevX = x;
        this.prevY = y;
        this.patrolPath = patrolPath;
        this.nextPatrolPoint = patrolPath[0];
        this.nextPatroIndex = 0;
        this.findPalyer = false;
        this.attackRange = attackRange;
        this.warningRange = warningRange;
        this.enemyType = enemyType;
    }

    update(level) 
    {
        this.prevX = this.x;
        this.prevY = this.y;

        if(this.x === this.nextPatrolPoint.x && 
            this.y === this.nextPatrolPoint.y
        )
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
        for (let obstacle of obstacles) 
        {
            if (!obstacle.isPassable &&
                this.x < obstacle.x + obstacle.size &&
                this.x + this.size > obstacle.x &&
                this.y < obstacle.y + obstacle.size &&
                this.y + this.size > obstacle.y) 
            {
                this.undoMove();
                break;
            }
        }

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

    undoMove() 
    {
        this.x = this.prevX;
        this.y = this.prevY;
    }
}
