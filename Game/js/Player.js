// 玩家类
class Player extends Character 
{
    constructor(x, y) 
    {
        super(x, y, 50, playerTexture);
        this.speed = 5;
        this.projectiles = [];
        this.prevX = x;
        this.prevY = y;
        this.lastDirection = 'up'; // 记录最后方向为子弹方向
    }

    update() 
    {
        this.prevX = this.x;
        this.prevY = this.y;

        // 更新移动方向记录
        if (keyIsDown(UP_ARROW)) 
        {
            this.y -= this.speed;
            this.lastDirection = 'up';
        }
        if (keyIsDown(DOWN_ARROW)) 
        {
            this.y += this.speed;
            this.lastDirection = 'down';
        }
        if (keyIsDown(LEFT_ARROW)) 
        {
            this.x -= this.speed;
            this.lastDirection = 'left';
        }
        if (keyIsDown(RIGHT_ARROW)) 
        {
            this.x += this.speed;
            this.lastDirection = 'right';
        }

        this.x = constrain(this.x, 0, width - this.size);
        this.y = constrain(this.y, 0, height - this.size);
    }

    undoMove() 
    {
        this.x = this.prevX;
        this.y = this.prevY;
    }

    shoot()
    {
        const centerX = this.x + this.size/2 - 2.5;
        const centerY = this.y + this.size/2 - 2.5;
        this.projectiles.push(new Projectile(centerX, centerY, this.lastDirection));
    }
}
