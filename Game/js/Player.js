// 玩家类
class Player extends Character 
{
    constructor(x, y, size) 
    {// Use playerTexture as the initial player image.
        super(x, y, size, playerTexture, playerInitHealth, 
            playerInitHealth, playerInitAttack, 
            charStatus.NORMAL, playerInitSpeed);
        this.projectiles = [];
        this.prevX = x;
        this.prevY = y;
        this.lastDirection = 'up'; // use the last direction to shoot.
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
        this.projectiles.push(new Projectile(centerX, centerY, 
            this.lastDirection));

        playerShootGunMusic();
    }
}
