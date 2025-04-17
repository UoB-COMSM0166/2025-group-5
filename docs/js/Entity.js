// 实体类
class Entity extends Character {
    constructor(x, y, Size, isPassable) {
        let color = isPassable ? 'lightgreen' : 'gray';
        super(x, y, Size, color, 0, 0, 0, charStatus.NORMAL, 0);
        this.isPassable = isPassable;
    }
}