// 角色基类
class Character {
    constructor(x, y, size, format) 
    {
        this.x = x;
        this.y = y;
        this.size = size;
        this.format = 
        {
            color: typeof format === 'string' ? format : null,
            image: format instanceof p5.Image ? format : null
        };
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
}
