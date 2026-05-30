import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useTheme } from './ThemeContext';
import { ThemeProvider } from './ThemeContextProvider';

function TestComponent() {
  const { isDarkTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-status">{isDarkTheme ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe('Theme System (Context & Provider)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('should initialize with light theme and apply correct class to html element', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-status').textContent).toBe('light');

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should toggle theme and update html class when toggleTheme is triggered', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle/i });

    fireEvent.click(button);

    expect(screen.getByTestId('theme-status').textContent).toBe('dark');

    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.click(button);
    expect(screen.getByTestId('theme-status').textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
