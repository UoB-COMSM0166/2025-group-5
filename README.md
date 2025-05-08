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

This section outlines the design process of the game system, starting from the user-centered use case model and progressing through architectural decomposition, class design, and behavioral modeling. Along the way, we reflect on key lessons and iterative improvements that shaped the final structure.

#### Use Case Model: From Player Perspective
![](docs/README/Use_Case_Model.png)

Our design began with constructing a use case model to capture the interactions between the player and the game system. As shown in the diagram, we identified core gameplay features such as **defeating monsters**, **opening chests**, **reading signs**, **entering the next level**, **adjusting settings**, and **viewing story scenes**. These use cases gave us a clear starting point: what the player can do and what the system must support.

Initially, our focus was narrowly placed on combat actions like defeating enemies or progressing levels. We neglected utility and narrative interactions such as settings adjustment or environmental reading. Later iterations added use cases like “Read Sign Content” and “Press ESC to Adjust Settings,” enhancing player immersion and control. Including contextual actors (e.g., Monster, Sign, Settings) further clarified responsibility boundaries, a valuable step for modular game logic.

#### Architectural Design: Modular Decomposition
![](./homework/week5/system_architecture.png)

Based on the use case model, we then designed a modular architecture to meet these functional requirements. The system is structured into several independent yet connected modules: **Core Entities**, **UI & HUD**, **Audio Manager**, **Level Manager**, and a centralized **Game Loop**. These modules run inside a browser environment, orchestrated via JavaScript and Phaser 3 library.

A practical lesson we learned here was the importance of **reverse mapping from use cases to modules**. For example, the “Level Selection” case justified the Level Manager, while “Adjust Volume” motivated an independent Audio Manager. One critical improvement was centralizing the update() logic within the Game Loop. Early versions had entity-specific update methods called independently, which led to desynchronized rendering and inconsistent behavior. Refactoring to a centralized loop significantly improved stability and debuggability.


#### Class Design: Inheritance and Entity Specialization
![](./homework/week5/class_diagram.png)

![](./homework/week5/class_diagram_full.png)

With the system modules defined, we moved to class-level design. A core part of this was modeling the **Character** superclass, from which **Player**, **Enemy**, **Obstacle**, and **Projectile** inherit. Each subclass implements its specialized behavior while reusing shared logic such as movement, state management, and health tracking.

In our first attempt, we placed all logic in a monolithic `Entity` class to achieve reuse, but this led to bloated, unmanageable code. The move to a polymorphic hierarchy was a major breakthrough, improving maintainability and clarity. Each entity class (e.g., Enemy or Player) now encapsulates only the behaviors it owns, like patrol or shooting for enemies, and keyboard control for the player.

We also implemented reusable UI components like `Curtain` and `Prompt`, which were originally hardcoded into the game loop. Refactoring them into standalone classes with consistent display() and update() interfaces made them modular and extensible.

#### Level Configuration: Beyond Hardcoding

A critical turning point in our design thinking occurred during level design. At first, we hardcoded level layouts and enemy stats using embedded JSON files. This approach worked for prototyping but lacked scalability and flexibility.

Initially, we only focused on class inheritance for code reuse, and in terms of level design, we only thought of hardcoding configuration files. Later, we realized that **level configuration could serve as a parameterization tool**—by designing configuration files to define enemy types, positions, trigger zones, and even map styles, we could decouple gameplay logic from level content. This not only maximized code reuse but also empowered non-programmers to participate in level design by simply editing config files. This approach turned into a core strategy in our design: **code handles behavior, configuration defines variation**.

#### Sequence Modeling: Dynamic Behavior Over Time

![](./homework/week5/sequence_diagram.png)

To visualize how entities interact over time, we created sequence diagrams showing player and system interactions across the **Game**, **Level**, **Player**, and **Enemy** components. The diagram illustrates how starting a level triggers `init()` and `create()` methods, how player input results in movement or shooting, and how updates propagate through the game loop.

One lesson we learned here was the importance of consistent interfaces. By requiring each major entity to implement an `update()` method, we ensured they could all be synchronized in the game loop. Collision detection (`collisionCheck()`), rendering, and state transitions became easier to debug and extend.

#### Reflective Lessons and Design Techniques

Throughout this iterative design process, several key lessons emerged:

- **Start from user behavior**, not implementation. Designing from the player's perspective helped ensure gameplay was intuitive and feature-complete.
- **Abstract progressively**: move from high-level use cases to concrete modules, then into object-oriented classes and finally dynamic sequences.
- **Centralize game loop logic** to maintain update consistency across the system.
- **Favor configuration over hardcoding** for flexibility in level and gameplay tuning. This shift was crucial in making the game scalable.
- **Use interface unification** (e.g., common update(), display()) to enable polymorphic handling and simplify integration.

Each stage of the design involved rethinking and refactoring. Our initial plan emphasized inheritance for code reuse but ignored flexibility. By re-examining level design as a configuration-driven system and enforcing modular behaviors, we arrived at a structure that was both elegant and practical for long-term development.


### Implementation

To ensure that development remained focused and manageable, our team adopted a top-down implementation strategy, dividing the project into three primary domains:

- **Core combat system development**  
- **Level and progression integration**  
- **Art and visual design**

During the **first phase**, all members collaborated in **pair programming** mode to quickly establish a functional game demo. Agile stand-up meetings were held daily to align progress, share blockers, and re-evaluate priorities. This phase emphasized fast iteration, shared code ownership, and early discovery of architectural risks.

As we transitioned into the **second phase**, work became more specialized. The team split into **visual development** (responsible for environment art, UI, animations, and narrative illustration) and **code development** (handling combat mechanics, AI, system optimization). Integration checkpoints ensured continuous alignment across modules.

Despite the division of responsibilities, we encountered multiple **cross-domain challenges**—particularly in aligning visual expectations with system limitations, or ensuring narrative and environment assets could support the intended gameplay mechanics. Below are **three representative implementation challenges**, each corresponding to one of the project’s top-level goals.

---

#### 🧠 Challenge 1: Dynamic Monster Behavior for Strategic Combat  
(Corresponding to: **Challenge and Growth**)

- **S (Situation)**  
  Static or passive enemies failed to provide a meaningful threat. To maintain tension and reward strategic thinking, we needed enemies to react intelligently to the player’s presence.

- **T (Task)**  
  The team was tasked with building monsters that could patrol autonomously and dynamically switch to an aggressive chase mode when players entered a detection radius. Pathfinding and obstacle avoidance were required for realistic movement.

- **A (Action)**  
  Patrol routes were defined via JSON, with a state machine controlling transitions between idle, patrol, and tracking. Detection radius triggered pursuit behavior, and a waypoint-based rerouting system was implemented to handle blocked paths or narrow corridors.

  🔀 **Cross-domain Special Consideration**  
  During testing, monster patrol zones occasionally overlapped with **decorative tiles or foreground assets** placed by the art team that the engine didn’t recognize as obstacles. This caused unpredictable AI behavior. Since we were not using a full tilemap collision editor, the solution we adopted was pragmatic: **artists manually marked walkable and blocked tiles using an Excel sheet**, labeling positions and layers for each zone. While rudimentary, this approach created a shared communication layer that helped programmers configure collisions correctly based on artistic intent.

- **R (Result)**  
  The system introduced unpredictability and threat to enemy encounters. Players could no longer rely on fixed patterns, resulting in more adaptive and engaging combat. It also served as a foundation for future AI upgrades like group coordination or ranged tactics.

---

#### 🔁 Challenge 2: Player Transformation and Skill System  
(Corresponding to: **Challenge and Growth**)

- **S (Situation)**  
  To support meaningful progression and combat variety, we aimed to allow players to absorb and use abilities from defeated monsters. This would also reflect the narrative arc of internalizing enemy power.

- **T (Task)**  
  The team needed to design a modular transformation system, allowing players to temporarily take on new forms and skillsets while maintaining balance and performance.

- **A (Action)**  
  A shared `Character` superclass was used for both players and monsters. A modular `Ability` class encapsulated reusable skill data. When a player transformed, the system cached their base state and swapped in new attributes. Configuration files drove stat definitions and skill effects. The UI and animation were dynamically updated based on transformation state.

  🔀 **Cross-domain Special Consideration**  
  Monster transformation required **distinct visual forms**, but the art team initially only produced static enemy sprites. To unblock development, the programming team implemented **placeholder effects**—like glows and overlays—while artists prepared the final forms. This approach ensured parallel progress and avoided system bottlenecks due to pending assets.

- **R (Result)**  
  This system gave players a sense of tactical agency, letting them choose ability paths suited to their playstyle. It dramatically increased replayability and combat depth, and received highly positive feedback during test sessions.

---

#### 🎨 Challenge 3: Visual Storytelling Through Environment and Animation  
(Corresponding to: **Immersion and Narrative Progression**)

- **S (Situation)**  
  Cutscenes alone were insufficient to convey emotional progression. The team wanted players to “feel” the story through changing environments and character visual feedback.

- **T (Task)**  
  Our task was twofold: (1) implement an animation system that reflected combat states clearly (e.g., hit, invincible, attack), and (2) embed narrative elements into environmental transitions using visual motifs and illustrations.

- **A (Action)**  
  The animation system used a timer-based `Animation` class to switch frames based on character status, including blinking for invincibility. Meanwhile, level artists developed four distinct environmental stages (Forest → Graveyard → Lake → Lava), each with a specific color theme and narrative role. Comic-style panels were created to bridge stages, and interactive objects were themed accordingly (e.g., chained gates, cursed mist).

  🔀 **Cross-domain Special Consideration**  
  Some visual proposals—like **animated fog overlays or dynamic lava flows**—clashed with engine limitations, causing masking and performance issues. The teams coordinated to rework these as **parallax-safe static layers or looped effects**, and introduced strict conventions for asset layering and naming. This kept performance stable while preserving artistic impact.

- **R (Result)**  
  Visual feedback improved player decision-making and immersion. Environmental storytelling helped reinforce the world’s emotional arc without relying on dialogue. Players consistently commented on the atmospheric tension and narrative continuity between zones.

---

#### 📊 Summary of Key Challenges and Outcomes

| Challenge | Goal | Solution | Cross-Domain Friction | Result |
|----------|------|----------|------------------------|--------|
| **Monster AI** | Increase tension and strategic depth | Patrol + Aggro system, rerouting with waypoints | Manual collision mapping via Excel to resolve art-program mismatches | More dynamic encounters, better challenge pacing |
| **Player Transformation** | Enable progression and build diversity | Config-driven ability system, dynamic state swap | Delay in final sprites led to fallback FX collaboration | High replayability, player-driven combat strategy |
| **Environment & Animation** | Deepen immersion and storytelling | Themed environments + responsive animation | Performance tuning due to animated visual layers | Strong narrative tone, enhanced player clarity |


### Evaluation

To evaluate whether our design and implementation successfully delivered an immersive, strategically challenging experience, we conducted a user-centered evaluation using both **qualitative** and **quantitative** methods. Specifically, we employed:

1. **Think-Aloud Protocols** — to capture real-time user thoughts and frustrations during gameplay, guiding iterative design.
2. **NASA Task Load Index (NASA-TLX)** — to quantitatively compare perceived cognitive and physical workload across levels.

This dual-method approach helped us refine key features, validate design assumptions, and align player experience with our stated top-level goals: **Challenge and Growth** and **Immersive Narrative Integration**.

---

#### 🧠 Think-Aloud Testing: Iterative Feedback and In-Game Adjustments

We invited a group of users, our classmates in fact, (N = 6) to play through the first two levels while narrating their thought process aloud. Sessions were recorded and tagged based on observed frustrations, expectations, surprises, and suggestions.

Key findings and responses included:

| **User Observation** | **Design Response** |
|---------------------------------------------------------------|-------------------------------------------------------------------------------------|
| *“I finished the level and nothing really happened... was that it?”* | 🚀 We added **level-clear animation and story recap panels** to create visual closure and narrative flow. |
| *“It’s hard to tell if the monster sees me or not.”* | 👁️ We plan to add **subtle sound and sprite cues** when enemies switch from idle to aggro. |
| *“It’s too hard. I didn’t know what I was supposed to do.”* | ⚠️ Added to the **“Could Have” backlog**: contextual tips or hint popups during peak difficulty spikes. |
| *“I like that I got a new ability, but I wasn’t sure how to use it.”* | 🎯 We improved the **UI feedback for new abilities**, including an indicator and number hint. |

These observations directly influenced multiple polish and UX updates across all levels. The Think-Aloud approach also helped us identify **non-obvious pain points**, especially in transitions, ability clarity, and feedback consistency—areas which are difficult to surface via analytical method of ourselves.

---

#### 📊 NASA-TLX Workload Comparison: Forest vs. Graveyard Levels

To evaluate the **cognitive and physical workload** imposed by our level design, we conducted a **within-subject** NASA Task Load Index (NASA-TLX) assessment. Each participant (N = 6) completed both the **Forest (Level 1)** and **Graveyard (Level 2)** levels in sequence, then rated the workload dimensions immediately after each level.

##### Summary of Results:

| **Dimension** | **Forest (Level 1)** | **Graveyard (Level 2)** |
|----------------------|----------------------|--------------------------|
| Mental Demand | 42.5 | **71.3** 🔺 |
| Physical Demand | 25.2 | 33.0 |
| Temporal Demand | 36.1 | 65.4 |
| Effort | 44.8 | **70.1** 🔺 |
| Frustration | 28.0 | 40.7 |
| Performance (Reverse)| 55.5 | **67.2** 🔺 |

(*Scores normalized to 0–100 scale, higher = more intense*)

##### Interpretation:

The **Graveyard level introduced a dynamic vision-limiting mechanic**, simulating a cursed effect from the Chapter 1 boss. This constraint increased:
- **Mental load** (players needed to memorize or infer map layout)
- **Effort** (required more cautious movement and combat)
- **Temporal pressure** (due to ambush-prone design and reduced visibility)

Yet despite the added difficulty, players **reported higher satisfaction scores for perceived performance** in the Graveyard level, suggesting that the added challenge felt **earned rather than unfair**.

🔍 **Conclusion:** 
The data confirms our design intent: the **vision-limiting mechanic successfully raised difficulty**, but also **deepened immersion and player satisfaction**—fulfilling our “Immersive Narrative” and “Challenge and Growth” requirements simultaneously.

---

#### ✅ Evaluation Insights & Design Confirmation

Based on both qualitative feedback and quantitative workload data, we can conclude:

- Players want to be **challenged—but with clarity**.
- Even subtle **narrative or visual cues** (e.g., animations, hint text) significantly improve onboarding and player confidence.
- Our **Level 2 vision mechanic** achieved the desired increase in difficulty without triggering frustration, validating its inclusion as a core mechanic.

This evaluation stage not only helped verify core design decisions, but also informed our roadmap priorities—focusing future development on **enhanced feedback systems**, **adaptive challenge design**, and **optional hint mechanics**.


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
