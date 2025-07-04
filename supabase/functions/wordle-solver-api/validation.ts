
import { WordleAPIRequest, ValidationResult } from './types.ts';

export function validateWordleRequest(request: WordleAPIRequest): ValidationResult {
  // Check if guessData exists and is array
  if (!Array.isArray(request.guessData)) {
    return { valid: false, error: 'guessData must be an array' };
  }
  
  // Check wordLength
  if (!request.wordLength || request.wordLength < 3 || request.wordLength > 15) {
    return { valid: false, error: 'wordLength must be between 3 and 15' };
  }
  
  // Check if guessData length matches wordLength
  if (request.guessData.length !== request.wordLength) {
    return { valid: false, error: `guessData length (${request.guessData.length}) must match wordLength (${request.wordLength})` };
  }
  
  // Validate each tile in guessData
  for (let i = 0; i < request.guessData.length; i++) {
    const tile = request.guessData[i];
    
    // Check if tile has required properties
    if (!tile.letter || !tile.state) {
      return { valid: false, error: `Tile at position ${i} is missing letter or state` };
    }
    
    // Check if letter is valid (single alphabetic character)
    if (typeof tile.letter !== 'string' || tile.letter.length !== 1 || !/^[A-Za-z]$/.test(tile.letter)) {
      return { valid: false, error: `Tile at position ${i} has invalid letter. Must be a single alphabetic character` };
    }
    
    // Check if state is valid (only correct, present, or absent allowed)
    if (!['correct', 'present', 'absent'].includes(tile.state)) {
      return { valid: false, error: `Tile at position ${i} has invalid state '${tile.state}'. Only 'correct', 'present', and 'absent' are allowed. All tiles must have a known state` };
    }
  }
  
  return { valid: true };
}
