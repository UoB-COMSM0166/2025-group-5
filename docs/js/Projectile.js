// 子弹类（新增方向控制）
class Projectile {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.speed = 10;
        this.direction = direction;
    }

    update() {
        switch(this.direction) {
            case 'up':
                this.y -= this.speed;
                break;
            case 'down':
                this.y += this.speed;
                break;
            case 'left':
                this.x -= this.speed;
                break;
            case 'right':
                this.x += this.speed;
                break;
        }
    }

    display() {
        fill('blue');
        rect(this.x, this.y, this.size, this.size);
    }

    isVisible() {
        return this.x > -this.size && 
               this.x < width &&
               this.y > -this.size && 
               this.y < height;
    }
}