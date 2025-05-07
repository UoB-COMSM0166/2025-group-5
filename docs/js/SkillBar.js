class SkillBar{
    constructor(skillNum, textureList, lockedTexture, statusList, numberList,
        x, y, height, width, blankwidth, textSize)
    {
        this.skillNum = skillNum;
        this.textureList = textureList;
        this.lockedTexture = lockedTexture;
        this.statusList = statusList;
        this.numberList = numberList;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.blankwidth = blankwidth;
        this.textSize = textSize;
    }

    display()
    {
        

        for(let i = 0; i < this.skillNum; i ++)
        {
            // 绘制矩形框
            noFill();
            stroke("white");
            strokeWeight(this.blankwidth);
            rect(this.x + i * this.width, this.y, this.width, this.height);
            
            // 绘制填充物
            if(this.statusList[i] === false)
            {
                image(this.lockedTexture, 
                    this.x + this.blankwidth + i * this.width,
                    this.y + this.blankwidth,
                    this.width - this.blankwidth * 2,
                    this.height - this.blankwidth * 2);
            }
            else 
            {
                image(this.textureList[i], 
                    this.x + this.blankwidth + i * this.width,
                    this.y + this.blankwidth,
                    this.width - this.blankwidth * 2,
                    this.height - this.blankwidth * 2);
            }

            // 绘制技能快捷键
            if(this.statusList[i] === true)
            {
                fill("red");
                noStroke();
                textSize(this.textSize);
                textStyle(BOLD);
                let numberToDisplay = i + 1;
                text(numberToDisplay, 
                    this.x + this.blankwidth + i * this.width, 
                    this.y + this.blankwidth * 4);

            // 绘制技能剩余次数
                fill("yellow");
                noStroke();
                textSize(this.textSize);
                textStyle(BOLD);
                numberToDisplay = this.numberList[i];
                text(numberToDisplay, 
                    this.x - this.blankwidth * 3 + i * this.width + this.width, 
                    this.y - this.blankwidth * 1 + this.height);
            }
        }
    }

    addSkill(id)
    {
        if(this.statusList[id] === false)
        {
            this.statusList[id] = true;
        }
        this.numberList[id] ++;
    }

    useSkill(id, transformFlag)
    {
        if(this.statusList[id] === true && this.numberList[id] > 0)
        {
            if(!transformFlag) this.numberList[id] --;
            return true;
        }
        else 
        {
            return false;
        }
    }

}