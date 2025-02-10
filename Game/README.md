# Snake Advanture
## Class Define
### Character (Base class)
- **properties**
1. x - x coordinate of center
2. y - y coordinate of center
3. size - edge length
4. format
    - color - if no picture was uploaded, fill by pure color
    - image - must be instance of p5.image
5. health - present health of unit
6. max health
7. attack
8. status - 'Normal' 'Dying' 'Invincible' 'Freezing' 'Blaming' 'Dead' 'Incompetent'.
9. speed - moving speed of Character
- **methods**
1. constructor - initialize properties.
2. display - fill characters by images or colors.
3. changeFormat - change the format of present object.
4. changeHealth - increase of decrease the health of unit.
5. changeAttack - change the attack of the unit.
6. changeStatus - change the status of the unit.
7. changeSpeed - change the move speed of the unit.
8. getHealth - get the present health.
9. getAttack - get the present attack.
10. getStatus - get status.
11. getSpeed - get the present speed.
### Player (Extends 'Character')
- **properties**(Except attributes of 'Character')
1. projectiles[] - store all the projectiles shoot by player.
2. prevX - last x coordinates of player
3. prevY - last y coordinates of player
4. lastDirection - record the last direction as the shooting direction.
- **methods**
1. constructor - initialize properties.
2. update - update the position of the player every frame.
3. undoMove - withdraw the last movement, which is used to avoid getting into the obstacle.
4. shoot - shoot a bullet to the direction the player towards.
### Enemy (Extends 'Character')
- **properties**(Except attributes of 'Character')
1. prevX - last x coordinates of player
2. prevY - last y coordinates of player
- **methods**
1. constructor - initialize properties.
2. update - update the position of the enemy every frame.
3. undoMove - withdraw the last movement, which is used to avoid getting into the obstacle.
### Obstacle (Extends 'Character')
- **properties**(Except attributes of 'Character')
- **methods**
1. constructor - initialize properties.
