import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router'; // Импорт из react-router
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';
import { SearchParams } from '../../constants/constants';

describe('Pagination Component', () => {
  it('should render current page and total pages correctly based on URL', () => {
    render(
      <MemoryRouter initialEntries={[`/?${SearchParams.PAGE}=3`]}>
        <Pagination totalPages={42} onChange={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText('Page 3 of 42')).toBeInTheDocument();
  });

  it('should disable Prev button and enable Next button on the first page', () => {
    render(
      <MemoryRouter initialEntries={[`/?${SearchParams.PAGE}=1`]}>
        <Pagination totalPages={42} onChange={vi.fn()} />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('should enable Prev button and disable Next button on the last page', () => {
    render(
      <MemoryRouter initialEntries={[`/?${SearchParams.PAGE}=42`]}>
        <Pagination totalPages={42} onChange={vi.fn()} />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('should disable both buttons if totalPages is 0', () => {
    render(
      <MemoryRouter initialEntries={[`/?${SearchParams.PAGE}=1`]}>
        <Pagination totalPages={0} onChange={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('should call onChange with current page + 1 when Next is clicked', async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();

    render(
      <MemoryRouter initialEntries={[`/?${SearchParams.PAGE}=2`]}>
        <Pagination totalPages={42} onChange={onChangeMock} />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    expect(onChangeMock).toHaveBeenCalledWith(3);
  });

  it('should call onChange with current page - 1 when Prev is clicked', async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();

    render(
      <MemoryRouter initialEntries={[`/?${SearchParams.PAGE}=5`]}>
        <Pagination totalPages={42} onChange={onChangeMock} />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    await user.click(prevButton);

    expect(onChangeMock).toHaveBeenCalledWith(4);
  });
});
