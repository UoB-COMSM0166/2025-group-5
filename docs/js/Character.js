// Character entity
class Character {
    constructor(x, y, size, format, health, maxHealth, attack, status, speed, animationFlag, animationSet) 
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
        this.status = status;
        this.speed = speed;
        this.invincibleTimer = 0;
        this.attackCdTimer = 0;
        this.abnormalStatus = "none";
        this.abnormalTimer = 0;

        this.animationFlag = animationFlag;
        this.animator = new SpriteAnimator(animationSet);

        this.state = "MovingLeft";
    }

    display() 
    {
        // fill the Character with pure color or image
        if(!this.animationFlag)
        {
            if(Math.floor(this.invincibleTimer / globalInvincibleFlashingInterval)
                % 2 === 0)
            {
                if(this.format.image)
                {
                    image(this.format.image, this.x, this.y, this.size, this.size);
                }
                else
                {
                    fill(this.format.color);
                    rect(this.x, this.y, this.size, this.size);
                }
                if(this.abnormalStatus === "water")
                {
                    noStroke();
                    fill(0, 0, 255, 100);
                    rect(this.x, this.y, this.size, this.size);
                }
                else if(this.abnormalStatus === "fire")
                {
                    noStroke();
                    fill(255, 0, 0, 100);
                    rect(this.x, this.y, this.size, this.size);
                }
            }
            // // Display the health of Player and Enemy
            // if(this instanceof Player || this instanceof Enemy)
            // {
            //         this.drawHealthBar();
            // }
        }
        else 
        {
            if(Math.floor(this.invincibleTimer / globalInvincibleFlashingInterval)
                % 2 === 0)
            {
                this.animator.setState(this.state);
                this.animator.update();
                this.animator.draw(this.x, this.y, this.size, this.size);
                if(this.abnormalStatus === "water")
                {
                    noStroke();
                    fill(0, 0, 255, 100);
                    rect(this.x, this.y, this.size, this.size);
                }
                else if(this.abnormalStatus === "fire")
                {
                    noStroke();
                    fill(255, 0, 0, 100);
                    rect(this.x, this.y, this.size, this.size);
                }
                this.drawHealthBar();
            }
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
            this.health = 0;
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
        // console.log(typeof status); // for debug
        this.status = status;
        if(this.status === charStatus.INVINCIBLE)
        {
            this.invincibleTimer = globalInvincibleTimer;
        }
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

    set_x_position(x)
    {
        this.x = x;
    }

    set_y_position(y)
    {
        this.y = y;
    }

    getSize()
    {
        return this.size;
    }
}
