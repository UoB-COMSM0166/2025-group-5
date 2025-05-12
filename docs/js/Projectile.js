// Bullet class (with added direction control)
class Projectile {
    constructor(x, y, dx, dy, size, speed, maxDistance, format, skill) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.maxDistance = maxDistance;
        this.skill = skill;
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        this.dx = dx / magnitude;        
        this.dy = dy / magnitude;
        this.format = 
        {
            color: typeof format === 'string' ? format : null,
            image: format instanceof p5.Image ? format : null
        };

        //Starting position to control bullet range
        this.startX = x;        
        this.startY = y;
    }

    update() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }

    display() {
        if(this.format.image)
        {
            image(this.format.image, this.x, this.y, this.size, this.size);
        }
        else
        {
            fill(this.format.color);
            ellipse(this.x, this.y, this.size * 2, this.size * 2);
        }
    }

    isVisible(obstacles) {
        for (let obstacle of obstacles) //Obstacle detection
        {
            if (!obstacle.isPassable &&
                this.x < obstacle.x + obstacle.size &&
                this.x + this.size > obstacle.x &&
                this.y < obstacle.y + obstacle.size &&
                this.y + this.size > obstacle.y) 
            {
                return false;
            }
        }

        const traveledDistance = Math.sqrt(            
            Math.pow(this.x - this.startX, 2) + Math.pow(this.y - this.startY, 2)        
        );
        
        return traveledDistance < this.maxDistance &&
               this.x > -this.size && 
               this.x < canvasWidth &&
               this.y > -this.size && 
               this.y < canvasHeight;
    }

    isHit(character){
        let dis;
        if(this.format.image)
        {
            dis = Math.sqrt((character.x + character.size / 2 - this.x) 
                    * (character.x + character.size / 2 - this.x)
                    + (character.y + character.size / 2 - this.y) 
                    * (character.y + character.size / 2 - this.y));
        }
        else 
        {
            dis = Math.sqrt((character.x + character.size / 2 - this.x - this.size) 
                    * (character.x + character.size / 2 - this.x - this.size)
                    + (character.y + character.size / 2 - this.y - this.size) 
                    * (character.y + character.size / 2 - this.y - this.size));
        }
        return dis < this.size + character.size / 2;
    }
}