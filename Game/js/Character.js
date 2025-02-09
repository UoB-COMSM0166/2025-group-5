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
        if(this.format.image)
        {// 应用图片并调整大小
            image(this.format.image, this.x, this.y, this.size, this.size);
        }
        else
        {
            fill(this.format.color);
            rect(this.x, this.y, this.size, this.size);
        }
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
}
