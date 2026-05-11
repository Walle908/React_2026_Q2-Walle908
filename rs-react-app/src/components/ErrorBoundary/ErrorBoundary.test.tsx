import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import ErrorButton from '../ErrorButton/ErrorButton';

describe('ErrorBoundary Component', () => {
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should render children normally when no error occurs', () => {
    const { unmount } = render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    expect(screen.getByRole('button', { name: /generate error/i })).toBeInTheDocument();
    expect(screen.queryByText('Someting went wrong...')).not.toBeInTheDocument();

    unmount();
  });

  it('should catch error and display fallback UI when real ErrorButton is clicked', async () => {
    const user = userEvent.setup();

    const { unmount } = render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const generateErrorBtn = screen.getByRole('button', { name: /generate error/i });

    await user.click(generateErrorBtn);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Someting went wrong...' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset error/i })).toBeInTheDocument();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Uncaught error:'),
      expect.any(Error),
      expect.any(Object)
    );

    unmount();
  });

  it('should clear error state and recover when click on Reset error button', async () => {
    const user = userEvent.setup();

    const { unmount } = render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const generateErrorBtn = screen.getByRole('button', { name: /generate error/i });
    await user.click(generateErrorBtn);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Someting went wrong...' })
    ).toBeInTheDocument();

    const resetButton = screen.getByRole('button', { name: /reset error/i });
    await user.click(resetButton);

    expect(screen.getByRole('button', { name: /generate error/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Someting went wrong...' })
    ).not.toBeInTheDocument();

    unmount();
  });
});
