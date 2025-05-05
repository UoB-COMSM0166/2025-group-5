// 实体类
class Entity extends Character {
    constructor(x, y, Size, isPassable, format, type, triggerDis, condition,
        unmatchedResult, matchedResult, expireAfterTriggered
    ) 
    {
        super(x, y, Size, format, 0, 0, 0, charStatus.NORMAL, 0, false, null);
        this.isPassable = isPassable;
        this.type = type;
        this.triggerDis = triggerDis;
        this.condition = condition;
        this.unmatchedResult = unmatchedResult;
        this.matchedResult = matchedResult;
        this.expireAfterTriggered = expireAfterTriggered;

        this.triggerableFlag = false;
    }

    // 重写Character类的display方法
    display()
    {
        if(this.format.image)
        {
            image(this.format.image, this.x, this.y, this.size, this.size);
        }
        else if(this.format.color)
        {
            fill(this.format.color);
            rect(this.x, this.y, this.size, this.size);
        }
        // 绘制交互提示
        if(this.triggerableFlag)
        {
            let prompt = "Press 'E' to interact."
            textSize(24);
            textAlign(LEFT, BOTTOM);
            fill('red');
            text(prompt, this.x, this.y);
        }
    }

    update(level)
    {
        // 根据距离更新triggerableFlag
        let entityCenterX = this.x + this.size / 2;
        let entityCenterY = this.y + this.size / 2;
        let playerCenterX = level.player.x + level.player.size / 2;
        let playerCenterY = level.player.y + level.player.size / 2;
        let dis = Math.sqrt((entityCenterX - playerCenterX) 
                            * (entityCenterX - playerCenterX)
                            + (entityCenterY - playerCenterY) 
                            * (entityCenterY - playerCenterY));
        this.triggerableFlag = (dis <= this.triggerDis);
    }

    isMatched(level)
    {
        if(this.condition.enemyCleared)
        { // 如果条件要求当前位置敌人被清空，检查敌人数量
            for(let enemy of level.enemies)
            {
                if(enemy.maxHealth !== 100000) return false;
            }
        }

        for(let thing of this.condition.inv)
        { // 如果要求物品清单中包含特定物品，逐个检查
            if(!level.player.inv.includes(thing)) return false;
        }

        return true;

    }
}