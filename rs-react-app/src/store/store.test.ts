import { describe, expect, it } from 'vitest';
import { store } from './store';

describe('Redux Global Store Configuration', () => {
  it('should initialize the store with selectedCharacters reducer and initial states', () => {
    const state = store.getState();

    expect(store).toBeDefined();
    expect(typeof store.dispatch).toBe('function');
    expect(state).toHaveProperty('selectedCharacters');
    expect(state.selectedCharacters.selectedChars).toEqual([]);
  });
});
