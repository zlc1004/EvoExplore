# Questions for EvoExplore Game Development

## Technical Foundation

1. **Platform & Engine**
   - What game engine should be used? (Unity, Godot, custom engine?)
   we are using Phaser 3 Next.js.
   - Target platform(s)? (Web browser, desktop, mobile, or multiple?)
   Web browser
   - Programming language preference? (C#, JavaScript/TypeScript, Python, etc.)
   TypeScript
   - Should this be 2D or 3D? (The description suggests 2D top-down)
   2D

2. **Network Architecture**
   - Is this multiplayer-only, or does it support single-player offline mode?
   multiplayer only.
   - What networking solution? (Dedicated servers, P2P, or hybrid?)
   Dedicated servers
   - How should PVP be handled? (Real-time combat, instanced arenas?)
   
   - Server capacity expectations? (How many players per server/world?)
   100.

## Game Mechanics Clarification

3. **Petals & Combat System**
   - What is the exact formula for petal damage calculation?
   - How do rarity tiers work? (Common -> Rare -> Ultra -> Mythic progression?)
   - What is "2nd rarity" mentioned for level 10 transition?
   - How many petal slots can a player have maximum?
   - What are the base stats for each rarity level?

4. **Progression & Leveling**
   - What is the XP curve formula? (Linear, exponential, custom?)
   - How much XP do different mob rarities give?
   - What happens when a player dies before level 75? (respawn mechanics, penalties?)
   - Can players de-level below level 90 except through boss failure?

5. **Industrial Zone**
   - What are the 8 cog piece locations/challenges?
   - What mobs spawn in Industrial zone?
   - What is the "special ability" that lets players split and dodge?
   - What happens if a player enters Industrial zone multiple times?
   - Can players trade ultra petals picked up from dead players?

6. **Final Boss**
   - What are ALL the Industrial mob abilities that the boss has?
   - Boss health pool and damage values?
   - How many players in a squad maximum?
   - What is the "ability" unlocked after defeating the boss?
   - What are the differences between "ending the game" vs "keeping the world like before"?

## Content Specifics

7. **Biomes & Mobs**
   - How many mob types per biome?
   - What are the specific mob stats and behaviors for each biome?
   - Are there regular mobs, elite mobs, and small bosses for each mob type?
   - Level ranges for each biome (more specific than provided)?

8. **Story & Evidence**
   - What is the complete storyline? (hints collected, Industrial revelation, etc.)
   - What exactly are the "pieces of hint" players unlock from levels 10-75?
   - What is the full truth revealed in Industrial zone?
   - What evidence exists? (You mentioned "False Sky projector" - what else?)

9. **Skills, Abilities & Talents**
   - Complete list of all abilities with cooldowns and mana costs?
   - How do players unlock each ability? (Which elite monsters drop which fragments?)
   - Full talent tree structure with exact stat bonuses per level?
   - What are "talent points" awarded per level? (1 per level?)
   - What is the mana system formula? (base mana, generation rate, etc.)

## Systems & Features

10. **Crafting & Economy**
    - What is the petal synthesis system exactly? (5 common -> 1 rare? ratios for all tiers?)
    - What are "Essences" and how do players obtain them?
    - What items can be crafted beyond petals?
    - How does trading work between players?
    - What can be purchased with coins? (specific prices?)

11. **NPCs & Shops**
    - Where are NPCs located? (in biomes, safe zones, or specific locations?)
    - What does each NPC sell/trade?
    - Are there NPC questlines?

12. **P2W & Monetization**
    <!-- - Exact price for one-time purchase?
    - How many coins per month does the purchase give?
    - Can all items be obtained F2P eventually?
    - Are there cosmetic-only options? -->
    completely F2P.

13. **Special Game Modes**
    - What are the "Special Game Modes" mentioned?
    - How does the PVP mini-game work mechanically? (matchmaking, arena layout, etc.)
    - What is "gacha" exactly? (loot boxes, random petal drops?)
    <!-- - What "Community Events" are planned? -->

## UI/UX Design

14. **Interface Elements**
    - What UI screens are needed? (main menu, inventory, talent tree, achievement, etc.)
    - How does the equipment preview system work?
    - What information is displayed on the HUD during gameplay?
    - How do players navigate the open world? (minimap, full map?)

15. **Visual & Audio**
    - Art style reference? (cell-shaded, pixel art, realistic?)
    for now, create white image with the filename looping over the entire image. will be replaced with actual artwork later. use png.
    - Character/petal size relative to screen?
    - What visual effects are priority? (particle systems, shaders, etc.)
    particle systems, animations, shaders.
    - Complete music/sound effect list needed?
    yes.
    - How does the Industrial zone BGM gear-collection mechanic work technically?

## Polish & Launch

16. **Testing & Balance**
    - What metrics should be tracked for balancing?
    all error messages.
    - Planned testing phases? (alpha, beta, early access?)
    closed dev alpha.
    - How will cheating/exploits be prevented?
    no anti chat.

17. **Launch & Community**
    - Steam launch timeline?
    no steam launch.
    - Discord server structure? (channels, roles, bots?)
    no discord server.
    - Content update schedule post-launch?
    no update.schedule
    - Achievement system details? (how many achievements total?)
    use mongodb.

## Technical Details Needed

18. **Save System**
    - How is player progress saved? (cloud save, local, both?)
    use mongodb.
    create a docker compose file that nextjs server will access. 
    - Can players have multiple save slots/characters?
    we will auth using clerk.com
    - What happens if a player switches servers?
    only one server.

19. **Performance**
    - Expected concurrent player count in one visible area?
    around 10. and mobs around 150.
    - Particle/entity limits for optimization?
    nope
    - Target frame rate and resolution?
    1080p, 60fps easy.

20. **Accessibility & Settings**
    - What game settings should be available? (graphics, controls, audio, colorblind modes?)
    audio (each type of sound, mob, background...), controls (keybind), graphics (shader quality).
    - Control scheme? (WASD + mouse, controller support?)
    WASD browser on pc only.
    - Language localization plans?
    english only. use File-Based Approach. with local json files. example, en-us.json: {"text.start.game":"Start Game", "desc.start.game": "Press Anywhere To Start Game"}

---

## Priority Questions (Most Critical)

- **What game engine/platform?** (Blocks all development)
- **What is the complete petal rarity system and crafting progression?** (Core gameplay loop)
- **Exact XP curve and mob stat tables?** (Required for progression balance)
- **Complete ability list with unlock conditions?** (Major gameplay feature)
- **Network architecture decisions?** (Affects entire codebase structure)
