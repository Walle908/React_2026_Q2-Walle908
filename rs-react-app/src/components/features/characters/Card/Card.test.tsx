import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { SearchParams } from '@/constants/constants';
import { toggleSelection } from '@/store/reducers/selectedCharactersSlice';
import { mockCharacter } from '@/test-utils/mocks';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';

const createMockStore = (initialSelectedChars = []) => {
  return configureStore({
    reducer: {
      selectedCharacters: () => ({
        selectedChars: initialSelectedChars,
      }),
    },
  });
};

describe('Card Component', () => {
  it('should render character details correctly when all data is provided', () => {
    const store = createMockStore([]);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card char={mockCharacter} />
        </MemoryRouter>
      </Provider>
    );

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(mockCharacter.image);
    expect(image.alt).toBe(mockCharacter.name);

    const title = screen.getByRole('heading', { level: 2, name: mockCharacter.name });
    expect(title).toBeInTheDocument();
  });

  it('should construct correct URL preserving existing search params', () => {
    const store = createMockStore([]);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/?${SearchParams.PAGE}=3`]}>
          <Card char={mockCharacter} />
        </MemoryRouter>
      </Provider>
    );

    const link = screen.getByRole('link') as HTMLAnchorElement;
    expect(link).toBeInTheDocument();

    const expectedHref = `/?${SearchParams.PAGE}=3&${SearchParams.DETAILS}=${mockCharacter.id}`;
    expect(link.getAttribute('to') || link.getAttribute('href')).toContain(expectedHref);
  });

  it('should dispatch toggleSelection and stop propagation when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const store = createMockStore([]);

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card char={mockCharacter} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    await user.click(checkbox);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);

    expect(dispatchSpy).toHaveBeenCalledWith(toggleSelection(mockCharacter));
  });
});
