import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import styles from './Button.module.css';

describe('Button Component', () => {
  it('should render basic button when variant and color is not provided', () => {
    render(<Button>Click me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('type', 'button');
    expect(buttonElement.className).toBe(`${styles.default} ${styles.base}`);
  });

  it('should render plain button with clean style', () => {
    render(
      <Button color="no" variant="plain">
        ✖
      </Button>
    );
    const buttonElement = screen.getByRole('button', { name: /✖/i });

    expect(buttonElement.className).not.toContain(styles.default);
    expect(buttonElement.className).toBe(`${styles.plain} ${styles.no}`);
  });

  it('should combine custom className and respect type attribute', () => {
    render(
      <Button className="custom-external-class" type="submit">
        Submit Form
      </Button>
    );

    const buttonElement = screen.getByRole('button', { name: /submit form/i });

    expect(buttonElement).toHaveAttribute('type', 'submit');
    expect(buttonElement.className).toContain(`${styles.default} ${styles.base}`);
    expect(buttonElement.className).toContain('custom-external-class');
  });

  it('should call onClick handler when clicked and respect disabled state', async () => {
    const handleClick = vi.fn();

    const { rerender } = render(
      <Button disabled onClick={handleClick}>
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

  it('should fallback to default variant and base color if variant and color do not exist in styles', () => {
    render(<Button variant={undefined}>Fallback test</Button>);

    const buttonElement = screen.getByRole('button', { name: /fallback test/i });

    expect(buttonElement.className).toBe(`${styles.default} ${styles.base}`);
  });
});
