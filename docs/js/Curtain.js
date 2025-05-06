class Curtain{
    constructor(width, height, format, player_x, player_y, radius, shape, sectorRadius)
    {
        this.w = width;
        this.h = height;
        this.format = 
        {
            color: typeof format === 'string' ? format : null,
            image: format instanceof p5.Image ? format : null
        };
        this.px = player_x;
        this.py = player_y;
        this.radius = radius;
        this.shape = shape;
        this.sectorRadius = sectorRadius;

        this.lastDirection = 'up';
    }

    update(player_x, player_y, radius, shape, sectorRadius, lastDirection)
    {
        this.px = player_x;
        this.py = player_y;
        this.radius = radius;
        this.shape = shape;
        this.sectorRadius = sectorRadius;
        this.lastDirection = lastDirection;
    }

    display()
    {
        if(this.format.image)
        {
            image(this.format.image, 0, 0, this.w, this.h);
        }
        else
        {
            // fill(this.format.color);
            fill(0, 0, 0, 220);
            beginShape();

            vertex(0, 0);
            vertex(this.w, 0);
            vertex(this.w, this.h);
            vertex(0, this.h);

            // 普通圆形视野
            if(this.shape === "round")
            {
                beginContour();
                for (let a = TWO_PI; a > 0; a -= 0.1) 
                {
                    let x = this.px + this.radius * cos(a);
                    let y = this.py + this.radius * sin(a);
                    vertex(x, y);
                }
                endContour();
            }
            // 普通锥形视野
            if(this.shape === "sector")
            {
                let sectorStartAngle;
                let sectorEndAngle;
                switch(this.lastDirection)
                {
                    case "down":
                        sectorStartAngle = 3 * PI / 4;
                        sectorEndAngle = 1 * PI / 4;
                        break;
                    case "up":
                        sectorStartAngle = 7 * PI / 4;
                        sectorEndAngle = 5 * PI / 4;
                        break;
                    case "left":
                        sectorStartAngle = 5 * PI / 4;
                        sectorEndAngle = 3 * PI / 4;
                        break;
                    case "right":
                        sectorStartAngle = 9 * PI / 4;
                        sectorEndAngle = 7 * PI / 4;
                        break;
                }
                beginContour();
                for (let a = 9 * PI / 4; a > PI / 4; a -= 0.1) 
                {
                    let x, y;
                    if(a < sectorStartAngle && a > sectorEndAngle)
                    {
                        x = this.px + this.sectorRadius * cos(a);
                        y = this.py + this.sectorRadius * sin(a);
                    }
                    else 
                    {
                        x = this.px + this.radius * cos(a);
                        y = this.py + this.radius * sin(a);
                    }
                    vertex(x, y);
                }
                endContour();
            }

            endShape(CLOSE);
        }
        // erase();
        // ellipse(this.px, this.py, this.radius, this.radius);
        // noErase();
    }
}