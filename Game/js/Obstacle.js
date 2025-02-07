// 障碍物类
class Obstacle extends Character {
    constructor(x, y, isPassable) {
        let color = isPassable ? 'lightgreen' : 'gray';
        super(x, y, 50, color);
        this.isPassable = isPassable;
    }
}
