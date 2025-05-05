// 障碍物类
class Obstacle extends Character {
    constructor(x, y, obstacleSize, isPassable) {
        let color = isPassable ? 'lightgreen' : 'gray';
        super(x, y, obstacleSize, color, 0, 0, 0, charStatus.NORMAL, 0, false, null);
        this.isPassable = isPassable;
    }
}
