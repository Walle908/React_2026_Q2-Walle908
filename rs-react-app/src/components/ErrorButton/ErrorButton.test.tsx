import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import { ErrorMessage } from '@constants/constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorButton from './ErrorButton';

describe('ErrorButton Component', () => {
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should render the button initially', () => {
    render(<ErrorButton />);

    const button = screen.getByRole('button', { name: /generate error/i });
    expect(button).toBeInTheDocument();
  });

  it('should throw an error and crash when clicked', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /generate error/i });

    await user.click(button);

    expect(
      screen.getByRole('heading', { level: 1, name: ErrorMessage.BOUNDARY_ERROR })
    ).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });
});
