import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formsReducer, { type FormDataPayload } from '@/store/formSlice';
import { mockPayloads } from '@/test-utils/mocks';
import CardList from './CardList';

const createTestStore = (initialSubmissions: FormDataPayload[] = []) => {
  return configureStore({
    reducer: {
      forms: formsReducer,
    },
    preloadedState: {
      forms: {
        submissions: initialSubmissions,
        countries: [],
      },
    },
  });
};

describe('CardList Component', () => {
  it('должен возвращать пустую заглушку, если массив submissions пуст', () => {
    const store = createTestStore([]);

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(
      screen.getByText('No submissions found. Fill out a form to see it here!')
    ).toBeInTheDocument();

    expect(screen.queryByText('Submitted Forms')).not.toBeInTheDocument();
  });

  it('должен успешно рендерить список карточек и размечать последнюю флагом isLatest', () => {
    const store = createTestStore(mockPayloads);

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(screen.getByText('Submitted Forms')).toBeInTheDocument();

    expect(screen.getByText('Elena')).toBeInTheDocument();
    expect(screen.getByText('Ivan')).toBeInTheDocument();

    const latestBadges = screen.getAllByText('Latest');
    expect(latestBadges).toHaveLength(1);

    const ivanCard =
      screen.getByText('Ivan').closest('.card') ||
      screen.getByText('Ivan').parentElement?.parentElement;
    expect(ivanCard).toBeDefined();
  });
});
