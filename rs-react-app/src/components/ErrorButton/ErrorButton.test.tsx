import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest';
import { Component, type ReactNode } from 'react';
import ErrorButton from './ErrorButton';

class TestBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  override state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  override componentDidCatch() {}
  override render() {
    if (this.state.hasError) return <span>Caught an error</span>;
    return this.props.children;
  }
}

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
      <TestBoundary>
        <ErrorButton />
      </TestBoundary>
    );

    const button = screen.getByRole('button', { name: /generate error/i });

    await user.click(button);

    expect(screen.getByText('Caught an error')).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });
});
