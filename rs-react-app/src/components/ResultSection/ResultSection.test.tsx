import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResultSection from './ResultSection';
import { ErrorMessage } from '../../constants/constants';
import { mockCharacters } from '../../__tests__/mocks';

describe('ResultSection Component', () => {
  it('should render a list of Card components when chars array is not empty', () => {
    render(<ResultSection chars={mockCharacters} errorMessage={ErrorMessage.NO_ERROR} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Rick Sanchez' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Morty Smith' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /generate error/i })).toBeInTheDocument();

    const errorHeading = screen.queryByRole('heading', {
      level: 2,
      name: new RegExp(ErrorMessage.NOT_FOUND),
    });
    expect(errorHeading).not.toBeInTheDocument();
  });

  it('should render an error message when chars array is empty and errorMessage is provided', () => {
    render(<ResultSection chars={[]} errorMessage={ErrorMessage.NOT_FOUND} />);

    const errorHeading = screen.getByRole('heading', { level: 2 });
    expect(errorHeading).toBeInTheDocument();
    expect(errorHeading.className).toBe('bad-result');
    expect(errorHeading.textContent).toBe(ErrorMessage.NOT_FOUND);

    expect(
      screen.queryByRole('heading', { level: 2, name: 'Rick Sanchez' })
    ).not.toBeInTheDocument();
  });

  it('should render initial empty state with ErrorButton and no error messages before any search', () => {
    render(<ResultSection chars={[]} errorMessage={ErrorMessage.NO_ERROR} />);

    expect(screen.getByRole('button', { name: /generate error/i })).toBeInTheDocument();

    const errorHeading = screen.queryByRole('heading', { level: 2 });
    expect(errorHeading).not.toBeInTheDocument();
  });
});
