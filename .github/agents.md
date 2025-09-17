# Agents Guide: Chicago Card Game Project

## Project Overview
This project is a web application for tracking scores in the Swedish card game "Chicago." Users can add players, update scores, and view standings. Agents should follow the rules and standards outlined below when interacting with the codebase or assisting users.

## Game Rules & Structure
- **Players**: 2-4, standard 52-card deck (no jokers)
- **Objective**: First to reach 52+ points wins
- **Game Flow**: Multiple hands, each with 3 phases

### Phases per Hand
1. Draw/discard cards, score best poker hand
2. Draw/discard again, score best poker hand
3. Draw/discard final time, play tricks (last trick = 5 pts), score final poker hand

### Scoring System
**Poker Hand Points:**
- One pair: 1 pt
- Two pairs: 2 pts
- Three of a kind: 3 pts
- Straight: 4 pts
- Flush: 5 pts
- Full house: 6 pts
- Four of a kind: 7 pts
- Straight flush: 8 pts
- Royal straight flush: 52 pts

**Other Scoring:**
- Last trick winner: 5 pts
- Successful Chicago (all 5 tricks): 15 pts
- Failed Chicago: -15 pts

### Special Rules
- **Chicago Declaration**: Player with 15+ pts can declare Chicago (try to win all tricks)
- **Card Exchange Restriction**: Players with 46+ pts cannot exchange cards in future hands
- **Four of a Kind Special**: Score 7 pts OR reset all other players to 0 pts

## Libraries & Frameworks
- Svelte, SvelteKit, Tailwind CSS, pnpm, TurboRepo

## Folder Structure
- `src/`: Source code
- `docs/`: Documentation
- `src/apps/`: Main app code

## Coding Standards
- Use semicolons at end of statements
- Use single quotes for strings
- Use function-based Svelte components
- Use arrow functions for callbacks

## UI Guidelines
- Toggle for light/dark mode
- Modern, clean design
- Use Tailwind CSS for styling

---
Agents should reference this guide for project context, rules, and standards. For more details, see `.github/copilot-instructions.md` or ask for clarification.