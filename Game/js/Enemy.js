// 敌人类（新增障碍物碰撞检测）
class Enemy extends Character 
{
    constructor(x, y, size, format, health, maxHealth, attack, status, speed) 
    {
        super(x, y, size, format, health, maxHealth, attack, status, speed);
        this.prevX = x;
        this.prevY = y;
    }

    update(level) 
    {
        this.prevX = this.x;
        this.prevY = this.y;

        if (level.isPlayerInGrass()) 
        {
            // 随机移动
            this.x += random(-this.speed, this.speed);
            this.y += random(-this.speed, this.speed);
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
    }

    undoMove() 
    {
        this.x = this.prevX;
        this.y = this.prevY;
    }
}
