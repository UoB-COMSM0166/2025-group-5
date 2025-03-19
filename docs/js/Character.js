// 角色基类
class Character {
    constructor(x, y, size, format, health, maxHealth, attack, status, speed) 
    {
        this.x = x;
        this.y = y;
        this.size = size;
        this.format = 
        {
            color: typeof format === 'string' ? format : null,
            image: format instanceof p5.Image ? format : null
        };
        this.health = health;
        this.maxHealth = maxHealth;
        this.attack = attack;
        this.status = (typeof status === 'string' ? status : null);
        this.speed = speed;
    }

    display() 
    {
        // fill the Character with pure color or image
        if(this.format.image)
        {
            image(this.format.image, this.x, this.y, this.size, this.size);
        }
        else
        {
            fill(this.format.color);
            rect(this.x, this.y, this.size, this.size);
        }
        // Display the health of Player and Enemy
        if(this instanceof Player || this instanceof Enemy)
        {
            this.drawHealthBar();
        }
    }

    drawHealthBar()
    {
        const barWidth = this.size;
        const barHeight = HealthBarHeight;
        const healthRatio = this.health / this.maxHealth;
        const barX = this.x;
        const barY = this.y - barHeight;

        // back
        fill(255, 255, 255);
        strokeWeight(0.5);
        rect(barX, barY, barWidth, barHeight);

        let color;
        // front
        if(healthRatio > 0.5)
        {
            color = 'green';
        }
        else if(healthRatio > 0.1)
        {
            color = 'yellow';
        }
        else 
        { // when health is less than 10%, the Character is DYING.
            color = 'red';
        }
        fill(color);
        noStroke();
        rect(barX, barY, barWidth * healthRatio, barHeight);
    }

    changeFormat(format)
    {
        this.format = 
        {
            color: typeof format === 'string' ? format : null,
            image: format instanceof p5.Image ? format : null
        };
    }

    changeHealth(change)
    {
        this.health += change;
        if(this.health > this.maxHealth)
        {
            this.health = this.maxHealth;
        }
        else if(this.health <= 0)
        {
            this.status = charStatus.DEAD;
        }
        else if(this.health <= this.maxHealth / 10)
        {
            this.status = charStatus.DYING;
        }
        // console.log('status: ', this.status); // for debug
    }

    changeAttack(attack)
    {
        if(attack >= maxAttack)
        {
            this.attack = maxAttack;
        }
        else if(attack <= 0)
        {
            this.attack = 0;
            this.status = charStatus.INCOMPETENT;
        }
    }

    changeStatus(status)
    {
        this.status = (typeof status === 'string' ? status : null);
    }

    getHealth()
    {
        return this.health;
    }

    getAttack()
    {
        return this.attack;
    }

    getStatus()
    {
        return this.status;
    }

    get_x_position()
    {
        return this.x;
    }

    get_y_position()
    {
        return this.y;
    }

    getSize()
    {
        return this.size;
    }
}
