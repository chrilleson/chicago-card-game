export interface PokerHand {
	name: string;
	points: number;
	symbol: string;
	description: string;
	shortName?: string;
	category: 'basic' | 'advanced' | 'rare';
}

export type PokerHandType = 
	| 'Pair'
	| 'Two Pairs'
	| 'Three of a Kind'
	| 'Straight'
	| 'Flush'
	| 'Full House'
	| 'Four of a Kind'
	| 'Straight Flush'
	| 'Royal Straight Flush';

export const POKER_HANDS: PokerHand[] = [
	{ 
		name: 'Pair', 
		points: 1, 
		symbol: 'K♠ K♥', 
		description: 'Two cards of same rank',
		shortName: 'Pair',
		category: 'basic'
	},
	{ 
		name: 'Two Pairs', 
		points: 2, 
		symbol: 'K♠ K♥ 7♣ 7♦', 
		description: 'Two different pairs',
		shortName: '2 Pairs',
		category: 'basic'
	},
	{ 
		name: 'Three of a Kind', 
		points: 3, 
		symbol: 'K♠ K♥ K♣', 
		description: 'Three cards of same rank',
		shortName: 'Three',
		category: 'basic'
	},
	{ 
		name: 'Straight', 
		points: 4, 
		symbol: '5♠ 6♥ 7♣ 8♦ 9♠', 
		description: 'Five cards in sequence',
		shortName: 'Straight',
		category: 'advanced'
	},
	{ 
		name: 'Flush', 
		points: 5, 
		symbol: 'K♠ 9♠ 7♠ 4♠ 2♠', 
		description: 'Five cards of same suit',
		shortName: 'Flush',
		category: 'advanced'
	},
	{ 
		name: 'Full House', 
		points: 6, 
		symbol: 'K♠ K♥ K♣ 7♦ 7♠', 
		description: 'Three of a kind + pair',
		shortName: 'Full House',
		category: 'advanced'
	},
	{ 
		name: 'Four of a Kind', 
		points: 7, 
		symbol: 'K♠ K♥ K♣ K♦', 
		description: 'Four cards of same rank',
		shortName: 'Four',
		category: 'rare'
	},
	{ 
		name: 'Straight Flush', 
		points: 8, 
		symbol: '5♠ 6♠ 7♠ 8♠ 9♠', 
		description: 'Straight + flush combined',
		shortName: 'Str. Flush',
		category: 'rare'
	},
	{ 
		name: 'Royal Straight Flush', 
		points: 52, 
		symbol: '10♠ J♠ Q♠ K♠ A♠', 
		description: '10-J-Q-K-A of same suit',
		shortName: 'Royal',
		category: 'rare'
	}
];

// Utility functions for working with poker hands
export function getPokerHandByPoints(points: number): PokerHand | undefined {
	return POKER_HANDS.find(hand => hand.points === points);
}

export function getPokerHandsByCategory(category: 'basic' | 'advanced' | 'rare'): PokerHand[] {
	return POKER_HANDS.filter(hand => hand.category === category);
}

export function isRareHand(points: number): boolean {
	const hand = getPokerHandByPoints(points);
	return hand?.category === 'rare' || false;
}