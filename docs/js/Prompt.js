// 提示类，用于生成对话框
class Prompt {
    constructor(x, y, width, height, text, format) 
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.format = format;
        
        this.timer = 0;
        this.maxTimer = 30;
        this.frameWidth = 160;
        this.frameheight = 60;
    }

    display()
    {
        image(
            this.format, this.x, this.y, 
            this.width * this.timer / this.maxTimer, 
            this.height * this.timer / this.maxTimer
        );
        if(this.timer < this.maxTimer)this.timer ++;
        else if(this.timer == this.maxTimer)
        {
            textStyle(NORMAL);
            fill('green');
            textSize(24);
            
            textAlign(LEFT, TOP);
            text(this.text, this.x + this.frameWidth, this.y + this.frameheight);
            text("(press SPACE to continue.)", 
                this.x + this.frameWidth, this.y + this.frameheight + 60);
        }
    }

    updateText(text)
    {
        this.text = text;
        this.timer = 0;
    }
}