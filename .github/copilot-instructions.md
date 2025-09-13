# Project Overview
This project is a web application designed to help users keep track of the score in a game of "Chicago". The application allows users to add players, update their scores, and view the current standings.

## About Chicago Card Game
Chicago is a Swedish card game for 2-4 players using a standard 52-card deck. The game consists of multiple hands, each with three distinct phases:

**Source:** [Chicago card game rules - Pagat.com](https://www.pagat.com/last/chicago.html)

### Game Structure
- **Players**: 2-4 players using standard 52-card deck (no jokers)
- **Objective**: First player to reach 52+ points wins
- **Game Flow**: Multiple hands with 3 phases each until someone reaches 52 points

### Phases per Hand
1. **Phase 1**: Draw/discard cards, score for best poker hand
2. **Phase 2**: Draw/discard cards again, score for best poker hand again  
3. **Phase 3**: Draw/discard final time, play tricks to win last trick (5 points), then score final poker hand

### Scoring System
**Poker Hand Points:**
- One pair: 1 point
- Two pairs: 2 points
- Three of a kind: 3 points
- Straight: 4 points
- Flush: 5 points
- Full house: 6 points
- Four of a kind: 7 points
- Straight flush: 8 points
- Royal straight flush: 52 points

**Other Scoring:**
- Last trick winner: 5 points
- Successful Chicago (taking all 5 tricks): 15 points
- Failed Chicago: -15 points

### Special Rules
- **Chicago Declaration**: Player with 15+ points can declare Chicago (attempt to take all tricks)
- **Card Exchange Restriction**: Players with 46+ points cannot exchange cards in subsequent hands
- **Four of a Kind Special**: Can choose to score 7 points OR reset all other players to 0 points

## Libraries and Frameworks
- Svelte: A modern JavaScript framework for building user interfaces.
- SvelteKit: A framework for building Svelte applications with server-side rendering and routing.
- Tailwind CSS: A utility-first CSS framework for styling the application.
- pnpm: A fast, disk space-efficient package manager.
- TurboRepo: A high-performance build system for JavaScript and TypeScript monorepos.

## Folder Structure
- `src\`: Contains the source code for the application.
- `docs\`: Contains documentation files.
- `src\apps\`: Contains the main application code.

## Coding Standards

- Use semicolons at the end of each statement.
- Use single quotes for strings.
- Use function based components in Svelte.
- Use arrow functions for callbacks.

## UI guidelines

- A toggle is provided to switch between light and dark mode.
- Application should have a modern and clean design.
- Use Tailwind CSS classes for styling.