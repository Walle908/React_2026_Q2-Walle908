import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { ErrorMessage } from '@/constants/constants';
import { mockCharacters } from '@/test-utils/mocks';
import { render, screen } from '@testing-library/react';
import ResultBlock from './ResultBlock';

describe('ResultBlock Component', () => {
  it('should render a list of Card components when when errorMessage is NO_ERROR', () => {
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

    expect(screen.queryByTestId('bad-result')).not.toBeInTheDocument();
  });
});

it('should render an error message when errorMessage is NOT_FOUND', () => {
  render(
    <MemoryRouter>
      <ResultBlock chars={[]} errorMessage={ErrorMessage.NOT_FOUND} />
    </MemoryRouter>
  );

  const errorHeading = screen.getByTestId('bad-result');

  expect(errorHeading).toBeInTheDocument();
  expect(errorHeading.textContent).toBe(ErrorMessage.NOT_FOUND);

  expect(
    screen.queryByRole('heading', { level: 2, name: mockCharacters[0]?.name })
  ).not.toBeInTheDocument();
});

it('should render an error message when errorMessage is SERVER_ERROR', () => {
  render(
    <MemoryRouter>
      <ResultBlock chars={[]} errorMessage={ErrorMessage.SERVER_ERROR} />
    </MemoryRouter>
  );

  const errorHeading = screen.getByTestId('bad-result');

  expect(errorHeading).toBeInTheDocument();
  expect(errorHeading.textContent).toBe(ErrorMessage.SERVER_ERROR);
});
