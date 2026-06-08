import { describe, it, expect } from 'vitest';
import { store } from './store';
import { addSubmission } from './formSlice';
import { mockPayload } from '@/test-utils/mocks';

describe('Redux Store and Form Slice', () => {
  it('должен инициализироваться с корректным дефолтным состоянием', () => {
    const state = store.getState().forms;

    expect(state.submissions).toEqual([]);
    expect(state.countries).toBeDefined();
    expect(state.countries.length).toBeGreaterThan(0);
  });

  it('должен успешно добавлять новую форму в массив submissions', () => {
    store.dispatch(addSubmission(mockPayload));

    const currentSubmissions = store.getState().forms.submissions;

    expect(currentSubmissions).toHaveLength(1);
    expect(currentSubmissions[0]).toEqual(mockPayload);
  });
});
