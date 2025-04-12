// 子弹类（新增方向控制）
class Projectile {
    constructor(x, y, dx, dy, size, speed, maxDistance, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.maxDistance = maxDistance;
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        this.dx = dx / magnitude;        
        this.dy = dy / magnitude;
        this.color = color;

        // 起始位置，控制子弹范围
        this.startX = x;        
        this.startY = y;
    }

    update() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }

    display() {
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
    }

    isVisible() {
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
        dis = Math.sqrt((character.x + character.size / 2 - this.x) 
                        * (character.x + character.size / 2 - this.x)
                        + (character.y + character.size / 2 - this.y) 
                        * (character.y + character.size / 2 - this.y));
        return dis < this.size + character.size / 2;
    }
}