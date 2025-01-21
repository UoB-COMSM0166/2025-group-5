# Game Mechanics Overview

- [Tanks](#tanksmini-tanks)
- [Snake](#snake)
- [Carrot Fantasy](#carrot-fantasy)
- [The Binding of Isaac: Rebirth (rogue-like)](#the-binding-of-isaac-rebirth-rogue-like)
- [Gomoku](#gomoku)
- [Battle of Balls](#battle-of-balls)
---

# Tanks(Mini-Tanks)
## Basic Controls:
Tank Movement:
Press W to move forward.
Press S to move backward.
Press A to turn left.
Press D to turn right.

Cannon Control:
Move the mouse to adjust the cannon’s direction.
Press the left mouse button to fire a shell.

## Gameplay Objectives:
Control your tank to navigate the battlefield and defeat all enemy tanks to progress through each level.
Survive the encounter by strategically dodging enemy fire and effectively using your own.

## Projectile Behavior:
Shells will bounce once off walls.
If a shell hits another wall after bouncing, it will disappear.

## Boss Mechanics:
Boss tanks appear in specific levels and are more challenging than standard enemy tanks.
Bosses have faster-moving projectiles, requiring quick reflexes to evade.

## Lives and Progression:
Each game session starts with three lives.
Losing all three lives results in failure, and all level progress resets to the beginning.
There is no level progression inheritance; you must restart from Level 1 upon failure.

## No Rankings or Records:
The game does not include a leaderboard or any ranking system.
There is no record of completed levels or player performance.

[Game Links](https://squiggythings.itch.io/mini-tanks)

---


# Snake
## Basic Controls:  
   - Snake Movement:  
     Press `↑` to move up.  
     Press `↓` to move down.  
     Press `←` to move left.  
     Press `→` to move right.  

## Game Objective:
   - Control the snake to eat the randomly appearing food blocks on the screen.  
   - Each piece of food consumed increases the length of the snake.  
   - Try to grow the snake as long as possible without colliding with obstacles.  

## Collision Mechanism: 
   - If the snake's head collides with the screen boundaries, the game will reset, and the snake will return to its initial length.  
   - If the snake's head collides with its own body, the game will also reset.  

## Scoring System:
   - Each food block eaten increases the player's score.  
   - The score increments by 1 for each successful food collection.  
   - No leaderboard or score-saving feature is included.  

## Game Progression:
   - The game starts at a slow pace, but as the snake grows longer, the game becomes increasingly challenging.  
   - There are no predefined levels or checkpoints. Players continue indefinitely until they collide or stop playing.  

## Game Features:  
   - Simple and minimalistic design for easy accessibility.  
   - Randomly generated food positions ensure varied gameplay.  

## Core Gameplay:  
   - Use quick reflexes and strategic planning to navigate the snake around the screen, avoiding collisions while aiming to achieve the longest possible snake!

---

# Carrot Fantasy 
## Objective
-Protect the carrot from monster attacks while eliminating all the monsters.

## Gameplay
-Players must build and upgrade various defense towers along the fixed paths taken by the monsters to prevent them from reaching the carrot.

## Controls
-Players can tap the screen to place defense towers. They can also choose to upgrade or remove the towers.

## Rules and Limitations
-Players start with limited resources and need to manage gold wisely.
-Monsters move along fixed paths, and players can only place defense towers near these paths. Each tower has unique attack range, damage type, and attack speed.
-Killing monsters rewards gold, which can be used to purchase and upgrade towers.
-If monsters reach the carrot, the carrot's health will decrease. The game ends in failure if the carrot’s health reaches 0.

## Rewards and Feedback
-Defeating monsters grants gold rewards.
-Completing hidden tasks (such as destroying certain objects) in special levels provides additional rewards.
-Clearing a level unlocks new maps and towers.

## Difficulty and Advanced Mechanisms
The difficulty increases progressively through the levels:
-Monsters’ health and numbers grow.
-Path layouts become more complex.
-New types of monsters are introduced, such as fast-moving monsters or those immune to specific tower attacks.

## Features
Easy to Learn:
-The rules are simple: place defense towers and stop the monsters from reaching the carrot.
Diverse Designs:
-Defense Towers: Each tower has unique functions (e.g., area damage, single-target attacks, slowing effects).
-Levels: The game offers various themed maps (e.g., forest, desert, ocean), each with unique backgrounds and monster designs.
-Monsters: Includes normal monsters, fast-moving monsters, and high-health monsters. Some monsters have special abilities, such as resistance to certain tower effects.
Fun Hidden Mechanics:
-Maps feature destructible objects (e.g., treasure chests, grass, ice blocks) that may drop gold or hidden items when destroyed.

---


# The Binding of Isaac: Rebirth (rogue-like)

## Game Introduction
When Isaac’s mother starts hearing the voice of God demanding a sacrifice be made to prove her faith,
Issac escapes into the basement facing droves of deranged enemies, lost brothers and sisters, his fears, and eventually his mother.

## Basic Controls:
Character movements: WASD
Shooting and direct control: arrow keys

## Game Objectives:
Control the character to shoot tears to eliminate all enemies in the room and earn rewards,
making the character stronger until defeating the final boss.

## Game Rules
The character shoots tears to attack enemies.
After clearing a room, the player will often receive rewards,
which may include coins for shop purchases, keys to open specific rooms or chests, powerful bombs,
or items that can enhance the character's stats or alter their attacks.
While attacking, the player must avoid contact with enemies or their projectiles, as this will cause the character to lose hearts.
When the character loses all hearts, the game is over.
Alternatively, the game is won when the player defeats the final boss.

## The Fun of the Game
As a roguelike game, The Binding of Isaac's randomness and progression are key features that attract many players.
In each run, players will encounter different room layouts and enemies, and will randomly receive various rewards and items.
This ensures that each playthrough is unique. Sometimes, players may be quickly defeated by small enemies, while other times they can easily one-shot the boss.

---

# Gomoku
## Rules of the game
1. Players play against the computer on a 15x15 board.
2. Black moves first and takes turns.
3. Each side can only place one piece at a time at the intersection.
4. For winning, both Sides needs to form five pieces of the same color in a line (horizontal, vertical, or diagonal).
## Global control buttons
Start: Start a game.
Admit defeat: Throw in the towel from the computer
Repentance: Withdraw the most recent piece of the two sides.
## Game difficulty Setting
AI of this game uses an algorithm of **Minimax**. The difficulty of the game depends on the depth of searching.
## Improvement Items
1. Play online with another player.
2. Appearance and music personalization.
3. Scores and leaderboards.
## Reference
[reference github link](https://github.com/lihongxun945/gobang)

---

# Battle of Balls
## Basic Controls:
Ball Movement:
- Tap or click to move the ball.
- Drag to aim and release to shoot.
## Game Objective:
- Control the ball to hit the opponent's ball.
- Each hit increases the player's score.
Try to score as high as possible without missing shots.
## Collision Mechanism:
- If the ball hits the opponent's ball, the opponent loses a point.
- If the ball hits the opponent's wall, the ball bounces back to the player.
## Scoring System:
- Each successful hit increases the player's score.
- The score increments by 1 for each successful hit.
- No leaderboard or score-saving feature is included.
## Game Progression:
- The game starts at a slow pace, but as the score increases, the game becomes increasingly challenging.
- There are no predefined levels or checkpoints. Players continue indefinitely until they miss a shot or stop playing.
## Game Features:
- Simple and minimalistic design for easy accessibility.
- Randomly generated opponent positions ensure varied gameplay.
## Core Gameplay:
- Use quick reflexes and strategic planning to navigate the ball around the screen, avoiding misses while aiming to achieve the highest possible score!
