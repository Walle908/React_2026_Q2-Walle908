import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { unselectAll } from '@/store/reducers/selectedCharactersSlice';
import { mockCharacter, mockCharacters } from '@/test-utils/mocks';
import { type Character } from '@/types/types';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import Flyout from './Flyout';

vi.mock('@/store/reducers/selectedCharactersSlice', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/store/reducers/selectedCharactersSlice')>();
  return {
    ...actual,
    unselectAll: vi.fn(() => ({ type: 'selectedCharacters/unselectAll' })),
  };
});

describe('Flyout Component', () => {
  const createMockStore = (selectedChars: Character[] = []) => {
    return configureStore({
      reducer: {
        selectedCharacters: () => ({ selectedChars }),
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();

    URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return null if no characters are selected', () => {
    const store = createMockStore([]);
    const { container } = render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render details and handle "Unselect all" click', () => {
    const store = createMockStore([mockCharacter]);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('1 items selected')).toBeInTheDocument();

    const unselectButton = screen.getByRole('button', { name: /unselect all/i });
    fireEvent.click(unselectButton);

    expect(unselectAll).toHaveBeenCalledTimes(1);
  });

  it('should generate CSV and trigger file download when clicking Download', () => {
    const store = createMockStore(mockCharacters);

    const originalCreateElement = document.createElement.bind(document);

    const realAnchor = originalCreateElement('a');

    const clickSpy = vi.spyOn(realAnchor, 'click').mockImplementation(() => {});

    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockImplementation((tagName, options) => {
        if (tagName === 'a') return realAnchor;
        return originalCreateElement(tagName, options);
      });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const downloadButton = screen.getByRole('button', { name: /download/i });
    fireEvent.click(downloadButton);

    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);

    expect(createElementSpy).toHaveBeenCalledWith('a');

    expect(realAnchor.download).toBe('2_items.csv');
    expect(realAnchor.href).toBe('blob:mock-url');

    expect(clickSpy).toHaveBeenCalledTimes(1);

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });
});
