import type { Player } from './player';

export interface Game {
	id: string;
	players: Player[];
	currentRound: number;
	isActive: boolean;
	startedAt: Date;
	finishedAt?: Date;
}

export interface GameState {
	game: Game | null;
	isGameStarted: boolean;
}
