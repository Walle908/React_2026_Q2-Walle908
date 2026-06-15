import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  it('должен успешно рендерить children текст', () => {
    render(<Button>Нажми меня</Button>);
    expect(screen.getByRole('button', { name: /нажми меня/i })).toBeInTheDocument();
  });

  it('должен иметь дефолтный тип type="button"', () => {
    render(<Button>Кнопка</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('должен корректно применять кастомный тип type="submit"', () => {
    render(<Button type="submit">Отправить</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('должен успешно вызывать onClick при клике', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Клик</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('должен прокидывать кастомный className и комбинировать его', () => {
    render(<Button className="my-test-class">Тест</Button>);
    expect(screen.getByRole('button')).toHaveClass('my-test-class');
  });

  it('должен корректно обрабатывать разные варианты variant и color', () => {
    const { rerender } = render(
      <Button variant="plain" color="accent">
        Submit
      </Button>
    );

    const button = screen.getByRole('button');

    expect(button.className).toContain('plain');
    expect(button.className).toContain('accent');

    rerender(
      <Button variant="default" color={undefined} className="test-class">
        False Branches
      </Button>
    );

    expect(button.className).toContain('default');
    expect(button.className).toContain('test-class');
  });

  it('должен корректно прокидывать остальные HTML-атрибуты через ...props', () => {
    render(
      <Button aria-label="Закрыть форму" id="test-btn-id" disabled>
        Close
      </Button>
    );
    const button = screen.getByRole('button', { name: /закрыть форму/i });

    expect(button).toHaveAttribute('id', 'test-btn-id');
    expect(button).toBeDisabled();
  });
});
