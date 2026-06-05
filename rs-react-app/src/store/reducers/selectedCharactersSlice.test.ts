import { describe, expect, it } from 'vitest';
import { mockCharacters } from '@/test-utils/mocks';
import selectedCharactersReducer, { toggleSelection, unselectAll } from './selectedCharactersSlice';

describe('selectedCharactersSlice', () => {
  const initialState = {
    selectedChars: [],
  };

  it('should return the initial state when passed an empty action', () => {
    expect(selectedCharactersReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should add a character to selectedChars if it does not exist', () => {
    if (!mockCharacters[0]) return;

    const nextState = selectedCharactersReducer(initialState, toggleSelection(mockCharacters[0]));

    expect(nextState.selectedChars).toHaveLength(1);
    expect(nextState.selectedChars[0]).toEqual(mockCharacters[0]);
  });

  it('should remove a character from selectedChars if it already exists', () => {
    if (!mockCharacters[0] || !mockCharacters[1]) return;

    const stateWithChar = {
      selectedChars: [mockCharacters[0], mockCharacters[1]],
    };

    const nextState = selectedCharactersReducer(stateWithChar, toggleSelection(mockCharacters[0]));

    expect(nextState.selectedChars).toHaveLength(1);
    expect(nextState.selectedChars).not.toContainEqual(mockCharacters[0]);
    expect(nextState.selectedChars[0]).toEqual(mockCharacters[1]);
  });

  it('should clear all characters when unselectAll is triggered', () => {
    if (!mockCharacters[0] || !mockCharacters[1]) return;

    const stateWithChars = {
      selectedChars: [mockCharacters[0], mockCharacters[1]],
    };

    const nextState = selectedCharactersReducer(stateWithChars, unselectAll());

    expect(nextState.selectedChars).toEqual([]);
    expect(nextState.selectedChars).toHaveLength(0);
  });
});
