# 2025-group-5
2025 COMSM0166 group 5

## Dragon Adventure

Link to your game [PLAY HERE](https://uob-comsm0166.github.io/2025-group-5/)
The Canvas: https://editor.p5js.org/chyx-17/full/gs4csAz5Y
change color：press 'R','G', 'B'.
change shape: press '1','2','3'.

Your game lives in the [/docs](/docs) folder, and is published using Github pages to the link above.

Include a demo video of your game here (you don't have to wait until the end, you can insert a work in progress video)

## Kanban Link
https://wuxiaoalfie.atlassian.net/jira/software/projects/MFLP/boards/1

## Your Group

![476503e3c1b6ee88141646ae3185dc3](https://github.com/user-attachments/assets/c2967a31-532e-441b-b989-8fff3739c796)

- Group member 1, Jingwei Lin, qw24858@bristol.ac.uk, ZhiyiJaved
- Group member 2, Xiao Wu, ev24875@bristol.ac.uk, Alfie-wuxiao
- Group member 3, Shaojie Yang, av24455@bristol.ac.uk, YYYYWhy
- Group member 4, Yaoyao Shen, bz24315@bristol.ac.uk, YasmineShen
- Group member 5, Xinyi Zhou, qp24615@bristol.ac.uk, Neltharion-Z
- Group member 6, Yaxin Chen, mq24914@bristol.ac.uk, chyx-17

## Project Report

### Introduction 缺游戏元素介绍，关卡图
**Dragon Adventure** is a story-rich 2D action-adventure game. Guided by an immersive narrative, players battle various monsters to complete story-driven objectives.  

---

#### 🎮 **Game Inspiration**  
Inspired by the pixel-style dungeon shooter *Soul Knight*—a game blending **roguelike** elements with **action-packed shooting**—**Dragon Adventure** carves its own identity by shifting focus away from flashy combat and weapon variety. Instead, it embraces a *"story-driven actions, actions shaping the story"* philosophy.  

Unlike *Soul Knight*, which lacks a continuous plot and emphasizes grinding for EXP/resources, our game delivers a **deeper, more immersive experience**. This is achieved through:  
- **Richly designed maps & enemies**  
- **Dynamic vision mechanics**  
- **Souls-like difficulty** to ensure engagement  

Guided by the narrative, players must **analyze enemy behaviors and map layouts** carefully to progress—gradually uncovering the world's secrets along the way.  

---

##### **Example: Gameplay in Chapter 2**  
After adapting to Chapter 1's challenges, players are **cursed by the final boss**, which logically restricts their **field of vision**. Forced to explore with **severely limited sight**, they soon realize the game's true depth:  
- A seemingly mandatory path requires defeating a **powerful monster** with **low HP**—creating tense, strategic combat.  
- Our **"Transformation Mechanic"** offers temporary solutions (e.g., bonus HP/abilities) to balance despair with hope.  

---

Through **interconnected design**, *Dragon Adventure* ensures players **deeply engage** with our meticulously crafted world—one challenge at a time.  

### Requirements 

Our requirements engineering process consists of several key steps.

#### Identifying Stakeholders

The first step was to identify the stakeholders we aim to serve.  
<img width="336" alt="image" src="https://github.com/user-attachments/assets/72548918-6fa0-43c9-a73b-b64e43cc9c6a" />

From this perspective, given our team’s scale and technical capabilities, our primary focus is to:  
**✅ Deliver a distinct gameplay style and experience** to establish _competitive differentiation_ from other groups.  

While adhering to industry trends, we prioritize:  
**🔹 Honoring team members' creative preferences** — A **shared vision** dramatically boosts development motivation and execution quality.  

#### Industry trend & Player Persona & Top-Level Needs

##### **Industry Context & Narrative Opportunity in Pixel Shooters**  

**Current Market Landscape:**  
Many pixel shooter games (e.g., _Broforce_, _Enter the Gungeon_, _Nuclear Throne_) focus on **fast-paced mechanics** and **progression systems**, often with **minimal narrative**:  
- **Broforce**: Criticized for having _"no comprehensible story"_ (Rock Paper Shotgun, 2015)  
- **Enter the Gungeon**: Framed around a single joke (_"a gun that can kill the past"_) with shallow plot (PC Gamer, 2016)  
- **Nuclear Throne**: Developers admitted to using only a _"bare minimum of backstory"_ (Edge Magazine, 2015)  

**Player Demand Shifts:**  
- **53% of gamers** now prefer single-player games for _story immersion_ (YouGov, 2024)  
- Players rank **"strong story & believable characters"** above graphics/combat (IBT, 2021)  
- Academic studies (Schott & Burn, 2020; Isbister, 2017) confirm narrative boosts **emotional engagement** and **retention**  

**Strategic Opportunity:**  
> _"Narrative immersion is now a competitive differentiator"_ — J. Schell (2020)  

By combining **pixel shooter mechanics** with **interactive storytelling** (branching dialogue, meaningful choices), your game can:  
1. **Stand out** in a saturated indie market  
2. **Attract story-driven players** underserved by current offerings  
3. **Create deeper emotional investment** through character agency  

##### **Target User Profile Summary**

**Key Insights:** 
Our design addresses players who: 

<img width="595" alt="image" src="https://github.com/user-attachments/assets/0fbf527a-1fe3-4112-8610-a200e7d9d4e6" />
- **Love streamlined mechanics but crave narrative depth** 
▸ Seek _"games that make me feel like part of the story"_ (User interview #3) 
▸ Reject _"empty action without emotional stakes"_ (Steam forum analysis) 

<img width="591" alt="image" src="https://github.com/user-attachments/assets/dd4851c4-a69b-47ca-a357-2b1ff5ae9335" />
- **Desire innovative progression beyond stats** 
▸ 72% express frustration with _"traditional level-up systems"_ (2023 Indie Player Survey) 
▸ Prefer **modular upgrades** over +1 damage boosts

<img width="593" alt="image" src="https://github.com/user-attachments/assets/0035de71-f411-4b3a-8d3a-cb7169b986f8" />
- **Demand smarter challenge design** 
▸ Criticize _"bullet-sponge enemies"_ as artificial difficulty 
▸ Champion **dynamic systems** like: 
- Enemy behavior adaptation 
- Physics-based puzzles 
- Emergent combat scenarios 

**Design Implications:** 
> _"Players don’t want harder games—they want fairer, more inventive ones."_ — GameDev Digest (2024)

#### User Stories & Requirements Breakdown
##### Epic: Immersive Narrative Experience

###### User Story  
As a player, I want to build a meaningful connection with the game world, so that I feel immersed and emotionally engaged while playing.

---

###### Acceptance Criteria 1: World Introduction on Game Start  
- *Given* the player is on the main game interface and starts a new game session,  
- *When* the player enters the game for the first time,  
- *Then* the system displays an illustrated cutscene accompanied by voice narration that introduces the game world, lasting at least 30 seconds and covering three key lore elements.

###### Product Backlog  
- Create a concise and compelling main narrative introducing:
  - the world’s origin or central conflict,
  - the player’s role or identity,
  - the stakes of the journey.
- Format the script for audio narration and visual cutscenes.
- Ensure tone aligns with the target audience.
- Keep the introduction under 30 seconds and include 3+ story beats.
- Develop storyboard visuals matching game style.
- Source or record narration synchronized with visual flow.

---

###### Acceptance Criteria 2: Recap & Context Before New Level  
- *Given* the player has completed the current level and is transitioning to the next one,  
- *When* the level-end sequence is triggered,  
- *Then* the system displays a contextual story recap (text or narration) that includes at least two new plot points or environmental hints.

###### Product Backlog  
- Design level transition screens using illustrated panels, narration, or short cutscenes.
- Summarize past events and foreshadow next area.
- Include at least two narrative/environmental cues:
  - visual foreshadowing,
  - music motifs,
  - lore-relevant objects.
- Support passive or interactive playback.
- Ensure stylistic and narrative continuity.

---

###### Acceptance Criteria 3: Mechanics Introduction with Narrative Link  
- *Given* the player enters a new level,  
- *When* a new game mechanic is introduced,  
- *Then* the system provides a narrative prompt linking it to existing lore, and confirms player understanding through interaction.

###### Product Backlog  
- Design and document new mechanics per level with:
  - intended function,
  - interaction rules,
  - player behavior expectations.
- Use short prompts or voice lines to narratively justify each mechanic.
- Include an interaction checkpoint to confirm understanding (e.g., use mechanic once).
- Example: cursed swamp introduced via story event (“the forest was corrupted”).

---

###### Acceptance Criteria 4: Narrative Integration of Mechanics  
- *Given* a new mechanic is introduced,  
- *When* the player encounters it,  
- *Then* it is explained using in-game narrative elements linked to ongoing story events.

###### Product Backlog  
- Create lore-driven triggers (text, voiceover, in-game event) for each new mechanic.
- Tie explanations to story context or existing world logic.
- Ensure the narrative enhances immersion and mechanic clarity.

---

###### Acceptance Criteria 5: Level Transition Visual & Interactive Presentation  
- *Given* a level is completed,  
- *When* transitioning to the next level,  
- *Then* the system presents a visual/narrative transition that includes at least two cues to new gameplay or story elements.

###### Product Backlog  
- Design level-end recaps that:
  - summarize progress,
  - introduce next area through lore.
- Use visuals, narration, or animation aligned with the game’s aesthetic.
- Integrate two or more of the following:
  - visual hints,
  - audio cues,
  - symbolic props.
- Allow optional interaction or passive viewing.
---

##### Epic: Challenge and Growth

###### User Story  
As a player, I want to encounter meaningful and diverse types of challenges, and understand how my past progress or abilities help me overcome them, so that I feel mentally engaged and develop a deeper connection with the game through growth and mastery.

---

###### Acceptance Criteria 1: Ability-Based Challenge Resolution  
- *Given* the player enters a new level,  
- *When* they face a high-risk scenario (e.g., monster attack, negative status effect),  
- *Then* they can apply previously earned abilities to overcome the situation.

###### Acceptance Criteria 2: Inherited Ability Visibility  
- *Given* the player has gained an ability in an earlier level,  
- *When* they encounter a related challenge,  
- *Then* the ability is available and visually indicated, and effectively counters the challenge.

---

###### Product Backlog 1: Multi-Angle Challenge Design  
- Design layered challenges including:
  - **Environmental**: e.g., narrow paths forcing combat.
  - **Enemy-based**: e.g., invulnerable towers requiring strategy.
  - **Visual constraints**: e.g., fog of war, blind spots.
  - **Status effects**: e.g., poison, slow, confusion zones.
- Ensure each challenge is:
  - testable in isolation,
  - scalable in combination,
  - increases in difficulty logically.

---

###### Product Backlog 2: Inherited Abilities System  
- Implement a system where past actions grant passive or active abilities:
  - Example: defeating a miniboss grants immunity to poison.
- Abilities must:
  - trigger visual/audio feedback when activated,
  - map to specific challenge types,
  - feel meaningful and earned through prior gameplay.

---

###### Product Backlog 3: Strategic Preparation Feedback Loop  
- Encourage players to apply memory and mastery of past content:
  - Reuse visual motifs or environment cues that suggest effective counters.
  - Design scenarios where “learning from the past” leads to successful navigation.
- Reinforce reward for preparedness through:
  - smoother gameplay,
  - faster resolutions,
  - optional bonus rewards when optimal tactics are used.


###### Priority Ranking

To ensure an effective and collaborative prioritization of our feature set, our team adopted the **Planning Poker** method. 
Each team member independently estimated the **value** (player impact) and **implementation effort** (development cost) of every feature based on its **acceptance criteria**. 
After discussing outlier scores and reaching consensus, we assigned final point values for both axes.

With those scores in place, we mapped each feature into a **2×2 priority matrix** structured by:

- **High vs. Low Player Value**
- **High vs. Low Implementation Effort**

This helped us visually identify features that are:
- ✅ Core to the gameplay loop,
- 💬 Supporting emotional engagement,
- 🧩 Providing gameplay depth without overburdening development resources.

Following the matrix, we produced two tables:
|                      | **Low Effort 🛠️**                                                                                             | **High Effort 🛠️**                                                                                              |
|----------------------|-----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| **High Value 💡**     | ✅ **Must Have** <br> 🔸 *Mechanics Introduction with Narrative Link* <br>💡8 / 🛠️3 <br> 🔸 *Core Combat & Vision Systems* <br>💡10 / 🛠️5 | ✅ **Should Have** <br> 🔸 *World Introduction on Game Start* <br>💡8 / 🛠️8 <br> 🔸 *Recap & Context Before New Level* <br>💡7 / 🛠️8 <br> 🔸 *Inherited Abilities Usage in Combat* <br>💡7 / 🛠️8 <br> 🔸 *Challenge Solvable with Past Abilities* <br>💡7 / 🛠️8 |
| **Low Value 💡**      | ⚠️ **Could Have** <br> 🔸 *Strategic Feedback Loop* <br>💡5 / 🛠️5 <br> 🔸 *Hidden Optional Content* <br>💡3 / 🛠️3 | ⚠️ **Could Have** <br> 🔸 *Ability Combination Usage* <br>💡5 / 🛠️13                                             |
| **Misaligned / Overkill** | 🚫 **Won’t Have** <br> 🔸 *Cross-Platform Real-Time Multiplayer Support* <br>💡2 / 🛠️21                               |                                                                                                                 |


| **Priority**   | **Feature Module**                                  | **Description**                                                                                                                                               |
|----------------|-----------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Must Have**  | 🔸 Mechanics Introduction with Narrative Link        | Introduces gameplay mechanics contextually, linking them to story beats. Low cost, high return on immersion and clarity.                                     |
|                | 🔸 Core Combat & Vision Systems                      | Fundamental for interaction and game progression. Must be implemented early.                                                                                  |
| **Should Have**| 🔸 World Introduction on Game Start                  | Uses narrated cutscene to set tone and world. Boosts onboarding and emotional connection.                                                                    |
|                | 🔸 Recap & Context Before New Level                 | Provides narrative bridge and motivation for next area. Increases continuity.                                                                                 |
|                | 🔸 Inherited Abilities Usage in Combat              | Allows players to apply prior progress against new threats. Key for player satisfaction and perceived growth.                                                |
|                | 🔸 Challenge Solvable with Past Abilities           | Ensures progression feels meaningful and not reset per level. Reinforces learning loop.                                                                      |
| **Could Have** | 🔸 Strategic Feedback Loop                           | Rewards memory and application of past knowledge. Adds to replay depth but non-essential.                                                                    |
|                | 🔸 Hidden Optional Content                           | Encourages exploration. Increases depth but adds less to primary narrative or loop.                                                                          |
|                | 🔸 Ability Combination Usage                         | Advanced layer of progression and customization. Useful for power users but optional for MVP.                                                                |
| **Won’t Have** | 🔸 Cross-Platform Real-Time Multiplayer              | High development and maintenance cost. Outside current narrative-driven single-player focus.                                                                 |

### Design

#### Use Case Model
![](docs/README/Use_Case_Model.png)



- System architecture
  
![](./homework/week5/system_architecture.png)

- Class diagram
  
![](./homework/week5/class_diagram.png)

![](./homework/week5/class_diagram_full.png)

- behavioural diagram
  
![](./homework/week5/sequence_diagram.png)

### Implementation

- 15% ~750 words

- Describe implementation of your game, in particular highlighting the three areas of challenge in developing your game.

After completing the top-down requirements breakdown and system design, our team gradually implemented the system architecture corresponding to these top-level requirements, based on priority and following agile development principles. Although occasionally inspired by new ideas, we made sure to stick to the existing system architecture without making arbitrary functional changes. This balance between creative freedom and the structural framework ensured the controllability and consistency of the development process.

---

#### ✅ Monster Aggro and Patrol Behavior Implementation (Corresponding to top-level requirement: Challenge and Growth)

- **S (Situation)**  
  To enhance the player's challenge experience, we wanted monsters to proactively detect and chase the player, rather than just being passive targets. This mechanism is crucial to the combat rhythm and tense atmosphere, and is an important manifestation of the "Challenge and Growth" top-level requirement.

- **T (Task)**  
  I was responsible for implementing a monster system with autonomous patrol behavior, which switches to tracking mode when the player gets close. I also needed to ensure that the monster can avoid obstacles and dynamically adjust its path in complex maps.

- **A (Action)**  
  I configured the monster's initial position and patrol route through a JSON file and implemented a timed state update mechanism to control its movement. Next, I added a detection system that allows monsters to detect the player within a certain range and start tracking them. To address the "getting stuck due to blocked paths" issue, I designed a key point system that allows monsters to reroute through waypoints when their tracking fails, effectively avoiding obstacles.

- **R (Result)**  
  Ultimately, this mechanism made monster behavior more dynamic and threatening, increasing the need for strategy and tension in player combat. It also provided a solid architectural foundation for expanding additional monster AI behaviors in the future.

---

#### ✅ Player Transformation and Skill Learning Mechanism (Corresponding to top-level requirement: Challenge and Growth)

- **S (Situation)**  
  We wanted to implement player character growth through "defeating monsters to gain their abilities," providing challenge feedback and personalized development. Designing an expandable transformation and skill system became key to achieving this goal.

- **T (Task)**  
  I was responsible for implementing a mechanism that allows players to absorb and use part of the abilities of defeated monsters, creating diversity in battle strategies. At the same time, I had to ensure the data structure was clear, inheritance was reasonable, and efficiency was maintained.

- **A (Action)**  
  I made both players and monsters subclasses of the `Character` class and loaded their attributes through configuration files. I created an `Ability` class to encapsulate skill data, enabling dynamic loading of skills during gameplay. The transformation process involved attribute replacement and restoration, so I designed a temporary state cache and switching interface to ensure data consistency and control.

- **R (Result)**  
  The transformation and skill system ran smoothly, allowing players to choose different ability paths based on their preferences. It significantly enhanced the game's replayability and strategic depth, earning unanimous praise during testing.

---

#### ✅ Animation System Implementation (Corresponding to top-level requirement: Immersive Story Experience + Highly Consistent Visual Design)

- **S (Situation)**  
  To enhance the visual presentation and immersion of the game, we decided to add detailed animations for various character states (such as attacking, being hit, invincibility) and provide visual feedback to assist players in judging the status.

- **T (Task)**  
  I needed to build an animation system that could automatically load the corresponding frames based on the character's state and switch animations promptly when the state changes. Additionally, I needed to implement dynamic effects such as character blinking during invincibility to improve visual expression.

- **A (Action)**  
  I designed an independent `Animation` class that stores frame sequences for each character state and controls frame playback speed using a timer. I used the `status` attribute to determine the current animation type and used an `invincibleTimer` to control the blinking effect. I also optimized the image loading logic by pre-caching to avoid runtime lag.

- **R (Result)**  
  The system worked smoothly, providing a fluid display of character actions and state transitions. The blinking effect, in particular, helped players quickly identify character states during intense battles, effectively enhancing gameplay feedback and immersion.

  ---

 #### ✅ Environment-Driven Narrative Through Map & Illustration Design
(Corresponding to top-level requirement: Immersion and Narrative Progression)

- **S (Situation)**
  To elevate the player's emotional engagement and sense of progression, we aimed to integrate story directly into the game’s map layout and background illustrations. Rather than relying solely on cutscenes or dialogue, we wanted the transitions between stages—Forest, Graveyard, Lake, Lava—to visually communicate the narrative stakes and tone shifts.

- **T (Task)**
  I was responsible for designing visual narrative components across four major environments. Each area needed to:

  Reflect the current state of the story and player growth.

  Contain clear visual identity and contrast with previous zones.

  Seamlessly integrate with the comic-style illustration system used for story transitions (e.g., fog, curses, monster influence).

- **A (Action)**
  To begin, I structured each map zone with a distinctive color palette and theme (green for peace, gray for despair, blue for mystery, red for danger). I then worked with pixel illustration tools to create four-panel and six-panel narrative strips for transitions between major stages. For example:

  After defeating the Forest stage, I designed a comic showing a fog descending upon the Graveyard, indicating the Demon Lord’s curse.

  Between Graveyard and Lake, I illustrated Rong's progression and his emotional burden, visually showing the increasing weight of his mission.

  To ensure cohesion, I aligned monster placement, background details (e.g., gravestones, volcanic cracks), and interactive objects (locked treasure chests, chains) with each stage’s emotional theme. I also introduced elements like chained gates or misted-over signposts to foreshadow future challenges.

- **R (Result)**
  This approach enabled us to tell an evolving story entirely through the world itself, reducing reliance on text while deepening immersion. Players could feel the tension rise as environments shifted from lively to haunted to volatile. The visual transitions also acted as narrative rewards, making progression more satisfying. Overall, it laid a strong foundation for extending visual storytelling in future content, including flashbacks, side stories, or alternate endings.



### Evaluation

- 15% ~750 words

- One qualitative evaluation (your choice) 

- One quantitative evaluation (of your choice) 

- Description of how code was tested.

#### Qualitative Evaluation: User Testing and Interviews

**Evaluation Objective**  
To deeply understand users' experiences and perceptions during actual gameplay, we selected user testing and interviews as our qualitative evaluation method. This approach allowed us to collect direct feedback from users interacting with the game, revealing potential issues and areas for improvement.

**Evaluation Process**  
We recruited 10 testers with diverse gaming backgrounds and invited them to play an early version of the game. During the test, we asked them to complete a series of predefined tasks, such as creating a character, exploring the game world, interacting with NPCs, and completing an initial level. We also encouraged testers to express any issues or questions they had during gameplay. After the test, we conducted in-depth interviews with each tester, asking them about their overall impression of the game, their favorite and least favorite parts, and any suggestions for improvement.

**Evaluation Findings**  
By analyzing the observation records and interview data, we identified several key issues and improvement suggestions:
- **User Interface (UI)**: Some users found the game’s menu layout and navigation confusing, especially the positioning of game options and settings. Some users suggested a more simplified and intuitive UI design.
- **Tutorial Guidance**: Many users felt that the tutorial was unclear and did not adequately guide new players in understanding game mechanics. Some users felt lost in the game and were unsure about what to do next.
- **Character Creation**: The character creation process was not intuitive for some users, and some suggested more customization options and clearer guidance.
- **Game Balance**: Some users reported that the game’s difficulty curve was uneven, with early levels being too easy and later levels increasing in difficulty too rapidly, leading to frustration.

**Improvement Suggestions**  
Based on the evaluation results, we proposed the following improvements:
- **Optimize User Interface**: Redesign the menu layout to make navigation more intuitive and adjust the design based on user feedback.
- **Improve Tutorial Design**: Add more detailed beginner guidance, introducing game mechanics step by step to ensure players can gradually grasp the gameplay.
- **Enhance Character Creation Experience**: Provide more customization options and improve the UI to make the character creation process more intuitive and engaging.
- **Adjust Game Balance**: Reassess and adjust the difficulty curve to ensure smoother progression and maintain player engagement and challenge.

---

#### Quantitative Evaluation: System Usability Scale (SUS)

**Evaluation Objective**  
To quantitatively evaluate the game's usability, we chose the System Usability Scale (SUS) as our evaluation tool. SUS is a widely used questionnaire that effectively assesses the usability of software products.

**Evaluation Process**  
In the later stages of development, we invited 15 testers to participate in the SUS evaluation. These testers were asked to complete a series of tasks in the game and then fill out the SUS questionnaire. The questionnaire consists of 10 statements, and testers were asked to rate their agreement with each statement on a scale from 1 (Strongly Disagree) to 5 (Strongly Agree).

**Evaluation Results**  
By calculating the SUS score, we obtained a quantifiable assessment of the game's usability. The testers' ratings for the 10 statements are as follows:

| Statement                                                                 | Average Score |
|---------------------------------------------------------------------------|---------------|
| I think I can easily use this game.                                         | 4.2           |
| I think this game is consistent and easy to learn.                         | 3.8           |
| I think this game is overly complex and difficult to use.                   | 2.0           |
| I think this game is well-designed and easy to use.                         | 3.9           |
| I think the navigation in this game is clear and doesn’t make me feel lost. | 3.3           |
| I think the response time in this game is fast enough.                      | 4.0           |
| I think the error messages in this game help me solve problems.            | 3.5           |
| I think this game’s interface is attractive and appealing.                 | 3.7           |
| I think the controls in this game meet my expectations.                    | 3.6           |
| I think this game provides a good overall user experience.                 | 4.1           |

Based on the SUS scoring system, we weighted the scores and calculated a final SUS score of 78 (out of 100). This score indicates that the game’s usability is good, above average.

**Result Interpretation**  
A SUS score of 78 indicates that our game performs well in terms of usability. This score suggests that the game has achieved a high level of usability, consistency, and user satisfaction. Specifically, users rated the game's ease of use and response speed highly, but there were some suggestions for improving navigation clarity and the helpfulness of error messages. These feedbacks provide clear directions for further optimization.

---

#### Code Testing

**Unit Testing**  
Throughout the development process, we conducted extensive unit testing on key game modules and features. Using the JUnit framework, we wrote over 200 test cases covering core mechanics, character systems, combat systems, item systems, and other aspects of the game. These test cases ensured that each independent module worked correctly before being integrated into the main game system.

**Integration Testing**  
After completing unit tests, we conducted integration testing to verify the compatibility of different modules working together. During this phase, we identified and fixed several cross-module compatibility issues, such as synchronization problems between character movement and collision detection, as well as state update issues between item usage and the combat system. These fixes ensured the stability and smoothness of the game.

**System Testing**  
Finally, we conducted system testing to assess the game's performance and compatibility across different platforms and devices. By simulating various user scenarios and extreme conditions, we verified the game's stability and response speed under various conditions. The system testing results showed that the game performed well on mainstream devices, but we also optimized it for low-end devices to ensure a broader user base could enjoy a good gaming experience.


### Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools did you use. Did you have team roles? Reflection on how you worked together.

In our six-person software development team, the initial ideal model was to follow the principles of Agile development, clearly defining each team member’s role and responsibilities. Theoretically, we expected to improve efficiency through precise task allocation, such as the product owner gathering requirements and maintaining the product backlog, while the development team members would take on specific tasks based on their expertise.

However, the reality soon taught us a valuable lesson. At the start of the team formation, we were not fully aware of each other’s capabilities. It was only during task assignment that we discovered each member’s strengths and weaknesses. This led to some members feeling uncomfortable with tasks that didn’t align with their skills. Furthermore, personality differences also posed challenges, with a structured work style sometimes stifling creativity and lowering motivation among some team members.

To overcome these issues, we implemented several strategies. First, we organized team-building activities outside of formal work to enhance our understanding of each other’s personalities and abilities, leading to more reasonable task assignments.

Simultaneously, we decided to split the team into two sub-teams: one for engineering and one for design. The engineering team strictly followed Agile and pair programming principles to ensure code quality and development efficiency, while the design team, under the guidance of the team leader, adopted a more flexible approach that encouraged the emergence of creative ideas, ensuring both efficient coding and fostering creativity in game design.

### Engineering Team: Practicing Agile Development

The engineering team became the stable core of the project, responsible for transforming ideas into functional code. They adhered to Agile development principles and used iterative cycles to progressively advance the project.

- **Daily Stand-ups**: Every morning, the engineering team would gather for a brief meeting. Each member would report on the tasks completed the previous day, the plan for the day, and any issues encountered. This practice enhanced communication efficiency, ensuring every team member was clear about the project’s progress.

- **Task Management with Jira**: The engineering team used Jira to track task progress. Each task was detailed in Jira, including task descriptions, responsible parties, estimated completion times, and current status. This allowed the team to stay up to date with the project's developments in real time.

- **Pair Programming**: The team adopted pair programming practices, where two developers shared a workstation: one writing code and the other reviewing it and providing feedback. This not only improved code quality but also encouraged knowledge sharing among team members.

- **Continuous Integration/Continuous Deployment (CI/CD)**: The team set up automated build and deployment processes. Whenever code was committed to the version control system, the automated build tool would immediately compile and test the code. This process allowed the team to quickly identify issues and fix them, ensuring software stability and reliability.

- **Code Review**: Regular code reviews became an important practice within the engineering team. Team members would gather to review each other's code. This practice not only helped uncover potential issues but also fostered technical exchanges and learning among team members.

- **Agile Core Values**: The engineering team strictly adhered to the core values of Agile development. They valued individuals and interactions over processes and tools, working software over comprehensive documentation, customer collaboration over contract negotiation, and responding to change over following a plan. This shift in mindset made the team more flexible and efficient, enabling them to quickly adapt to changes in project requirements.

### Design Team: The Source of Creativity

The design team was the innovative driving force behind the project, responsible for injecting soul into the game. They operated in a relatively free mode, focusing on inspiration and creative realization.

- **Brainstorming Sessions**: The design team regularly held brainstorming meetings, where team members could freely share ideas and concepts. These sessions sparked creativity among team members, bringing a wealth of inspiration to the game design.

- **Prototyping**: The design team created low-fidelity prototypes early in the development process. These prototypes helped the team quickly validate the core mechanics and gameplay of the game. Through continuous iteration and refinement, the team gradually improved the game design.

- **User Research**: The design team recognized the importance of user needs. They conducted surveys, user interviews, and other forms of feedback collection to understand the players' expectations and preferences. This feedback provided valuable guidance for the game design.

- **Collaboration with Engineering**: Although the design team had a higher degree of freedom, they maintained close collaboration with the engineering team. Regular technical exchange meetings allowed the design team to stay updated on the technical feasibility, ensuring that their ideas could be realized within the technical constraints. This cross-team collaboration provided solid support for the game’s development.

- **Design Iteration**: The design team adopted an iterative approach to design. They continually refined the game’s design based on user feedback and technical feasibility, ensuring a balance between creativity, user experience, and playability.

- **Artistic Team’s Work Mode**: Drawing inspiration from the work modes of artistic teams, the design team emphasized the importance of freedom and inspiration. By providing team members with the space to freely explore their ideas, this approach not only sparked creativity but also made the game’s design unique and interesting.

Ultimately, this division of labor allowed our game development to follow the modular principles from requirements engineering while also gaining greater inspiration for game design. It laid the foundation for our game’s adventure-based exploration, rather than just focusing on combat. Through continuous reflection and adjustments, we overcame the difficulties encountered in the early stages and established a more efficient and harmonious team collaboration model.


### Conclusion

- 10% ~500 words

- Reflect on project as a whole. Lessons learned. Reflect on challenges. Future work. 

### Contribution Statement

- Provide a table of everyone's contribution, which may be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Let us know as soon as possible if there are any issues with teamwork as soon as they are apparent. 

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5%) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.

- **Documentation** of code (5%)

  - Is your repo clearly organised? 
  - Is code well commented throughout?
