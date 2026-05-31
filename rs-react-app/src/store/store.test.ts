import { describe, expect, it } from 'vitest';
import { store } from './store';

describe('Redux Global Store Configuration', () => {
  it('should initialize the store with correct combined reducers and initial states', () => {
    const state = store.getState();

    expect(store).toBeDefined();
    expect(typeof store.dispatch).toBe('function');

    expect(state).toHaveProperty('characters');
    expect(state).toHaveProperty('search');
    expect(state).toHaveProperty('characterDetails');
    expect(state).toHaveProperty('selectedCharacters');

    expect(state.search.query).toBe('');
    expect(state.selectedCharacters.selectedChars).toEqual([]);
    expect(state.characterDetails.char).toBeNull();
    expect(state.characters.chars).toEqual([]);
  });
});
