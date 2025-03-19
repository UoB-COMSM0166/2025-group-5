class Curtain{
    constructor(width, height, format, player_x, player_y, radius)
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
    }

    update(player_x, player_y)
    {
        this.px = player_x;
        this.py = player_y;
    }

    display()
    {
        if(this.format.image)
        {
            image(this.format.image, 0, 0, this.w, this.h);
        }
        else
        {
            fill(this.format.color);
            beginShape();

            vertex(0, 0);
            vertex(this.w, 0);
            vertex(this.w, this.h);
            vertex(0, this.h);

            beginContour();
            for (let a = TWO_PI; a > 0; a -= 0.1) 
            {
                let x = this.px + this.radius * cos(a);
                let y = this.py + this.radius * sin(a);
                vertex(x, y);
            }
            endContour();

            endShape(CLOSE);
        }
        // erase();
        // ellipse(this.px, this.py, this.radius, this.radius);
        // noErase();
    }
}