import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import ResultBlock from './ResultBlock';
import { ErrorMessage } from '../../constants/constants';
import { mockCharacters } from '../../__tests__/mocks';

describe('ResultBlock Component', () => {
  it('should render a list of Card components when chars array is not empty', () => {
    render(
      <MemoryRouter>
        <ResultBlock chars={mockCharacters} errorMessage={ErrorMessage.NO_ERROR} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { level: 2, name: mockCharacters[0]?.name })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: mockCharacters[1]?.name })
    ).toBeInTheDocument();

    const errorHeading = screen.queryByRole('heading', {
      level: 2,
      name: new RegExp(ErrorMessage.NOT_FOUND),
    });
    expect(errorHeading).not.toBeInTheDocument();
  });

  it('should render an error message when chars array is empty and errorMessage is provided', () => {
    render(
      <MemoryRouter>
        <ResultBlock chars={[]} errorMessage={ErrorMessage.NOT_FOUND} />
      </MemoryRouter>
    );

    const errorHeading = screen.getByRole('heading', { level: 2 });
    expect(errorHeading).toBeInTheDocument();
    expect(errorHeading.className).toBe('bad-result');
    expect(errorHeading.textContent).toBe(ErrorMessage.NOT_FOUND);

    expect(
      screen.queryByRole('heading', { level: 2, name: 'Rick Sanchez' })
    ).not.toBeInTheDocument();
  });

  it('should render initial empty state and no error messages before any search', () => {
    render(
      <MemoryRouter>
        <ResultBlock chars={[]} errorMessage={ErrorMessage.NO_ERROR} />
      </MemoryRouter>
    );

    const errorHeading = screen.queryByRole('heading', { level: 2 });
    expect(errorHeading).not.toBeInTheDocument();
  });
});
