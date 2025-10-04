/**
 * Generate initials from a player's name
 * @param name - The player's full name
 * @returns The player's initials (up to 2 characters)
 */
export function getPlayerInitials(name: string): string {
	if (!name || typeof name !== 'string') {
		return '??';
	}

	const cleanName = name.trim();
	if (cleanName.length === 0) {
		return '??';
	}

	const words = cleanName.split(/\s+/);

	if (words.length === 1) {
		// Single word: take first 2 characters
		return words[0].substring(0, 2).toUpperCase();
	} else {
		// Multiple words: take first character of first two words
		return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
	}
}
