import type { Player } from './player';

export interface Game {
	id: string;
	name: string;
	players: Player[];
	isActive: boolean;
	startedAt: Date;
	finishedAt?: Date;
}

export interface GameState {
	game: Game | null;
	isGameStarted: boolean;
}
