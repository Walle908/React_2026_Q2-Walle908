import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';
import ErrorButton from '@/components/features/error-handling/ErrorButton/ErrorButton';
import { ErrorMessage } from '@/constants/constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary Component', () => {
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should render children normally when no error occurs', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    expect(screen.getByRole('button', { name: /generate error/i })).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { level: 1, name: ErrorMessage.BOUNDARY_ERROR })
    ).not.toBeInTheDocument();
  });

  it('should catch error and display fallback UI when real ErrorButton is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const generateErrorBtn = screen.getByRole('button', { name: /generate error/i });

    await user.click(generateErrorBtn);

    expect(
      screen.getByRole('heading', { level: 1, name: ErrorMessage.BOUNDARY_ERROR })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset error/i })).toBeInTheDocument();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Uncaught error:'),
      expect.any(Error),
      expect.any(Object)
    );
  });

  it('should clear error state and recover when click on Reset error button', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const generateErrorBtn = screen.getByRole('button', { name: /generate error/i });
    await user.click(generateErrorBtn);
    expect(
      screen.getByRole('heading', { level: 1, name: ErrorMessage.BOUNDARY_ERROR })
    ).toBeInTheDocument();

    const resetButton = screen.getByRole('button', { name: /reset error/i });
    await user.click(resetButton);

    expect(screen.getByRole('button', { name: /generate error/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 1, name: ErrorMessage.BOUNDARY_ERROR })
    ).not.toBeInTheDocument();
  });
});
