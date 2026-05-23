import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import styles from './Button.module.css';

describe('Button Component', () => {
  it('should render basic button when variant is not provided', () => {
    render(<Button>Click me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('type', 'button');
    expect(buttonElement.className.trim()).toBe(styles.baseButton);
  });

  it('should render error button', () => {
    render(<Button variant="error">Error</Button>);
    const buttonElement = screen.getByRole('button', { name: /error/i });

    expect(buttonElement.className).toContain(styles.baseButton);
    expect(buttonElement.className).toContain(styles.error);
  });

  it('should render clear button without base styles', () => {
    render(<Button variant="clear">✖</Button>);
    const buttonElement = screen.getByRole('button', { name: /✖/i });

    expect(buttonElement.className).not.toContain(styles.baseButton);
    expect(buttonElement.className).toBe(styles.clear);
  });

  it('should combine custom className and respect type attribute', () => {
    render(
      <Button type="submit" className="custom-external-class">
        Submit Form
      </Button>
    );

    const buttonElement = screen.getByRole('button', { name: /submit form/i });

    expect(buttonElement).toHaveAttribute('type', 'submit');
    expect(buttonElement.className).toContain('baseButton');
    expect(buttonElement.className).toContain('custom-external-class');
  });

  it('should call onClick handler when clicked and respect disabled state', async () => {
    const handleClick = vi.fn();

    const { rerender } = render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    const buttonElement = screen.getByRole('button', { name: /disabled/i });
    expect(buttonElement).toBeDisabled();

    await userEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();

    rerender(<Button onClick={handleClick}>Enabled</Button>);
    const enabledButton = screen.getByRole('button', { name: /enabled/i });

    await userEvent.click(enabledButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should fallback to empty string if a variant does not exist in styles', () => {
    render(<Button variant={undefined}>Fallback test</Button>);

    const buttonElement = screen.getByRole('button', { name: /fallback test/i });

    expect(buttonElement.className.trim()).toBe(styles.baseButton);
  });
});
