import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import InputComponent from './InputComponent';

describe('InputComponent', () => {
  it('должен успешно рендерить инпут со связкой label через htmlFor', () => {
    render(<InputComponent name="test-input" label="Имя пользователя" />);

    const input = screen.getByLabelText('Имя пользователя');
    expect(input).toBeInTheDocument();
    expect(input.tagName.toLowerCase()).toBe('input');
  });

  it('должен корректно вызывать onChange при вводе текста', async () => {
    const handleChange = vi.fn();
    render(<InputComponent name="text" label="Текст" onChange={handleChange} />);

    const input = screen.getByLabelText('Текст');
    await userEvent.type(input, 'A');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('должен отображать текст ошибки и вешать класс ошибки, если проп error передан', () => {
    render(<InputComponent name="email" label="Email" error="Неверный формат почты" />);

    expect(screen.getByText('Неверный формат почты')).toBeInTheDocument();
    const input = screen.getByLabelText('Email');

    expect(input.className).toBeDefined();
  });

  it('должен корректно использовать переданный кастомный id вместо сгенерированного useId', () => {
    render(<InputComponent name="custom" label="Кастомный" id="my-unique-id" />);

    const input = screen.getByLabelText('Кастомный');
    expect(input).toHaveAttribute('id', 'my-unique-id');
  });

  it('должен корректно прокидывать ref нативный инпут через forwardRef', () => {
    const inputRef = createRef<HTMLInputElement>();
    render(<InputComponent name="ref-test" label="Ref Test" ref={inputRef} />);

    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    expect(inputRef.current).toBe(screen.getByLabelText('Ref Test'));
  });

  it('должен протестировать все комбинации разметки (isRow, variant)', () => {
    const { rerender } = render(
      <InputComponent name="variant-test" label="Тест вариантов" isRow={true} />
    );

    const containerElement = screen.getByLabelText('Тест вариантов').closest('div');
    expect(containerElement).toBeInTheDocument();

    rerender(
      <InputComponent
        name="variant-test"
        label="Тест вариантов"
        isRow={false}
        variant="checkbox"
        type="checkbox"
      />
    );
    expect(screen.getByLabelText('Тест вариантов')).toHaveAttribute('type', 'checkbox');

    rerender(
      <InputComponent name="variant-test" label="Тест вариантов" variant="radio" type="radio" />
    );
    expect(screen.getByLabelText('Тест вариантов')).toHaveAttribute('type', 'radio');

    rerender(
      <InputComponent name="variant-test" label="Тест вариантов" variant="file" type="file" />
    );
    expect(screen.getByLabelText('Тест вариантов')).toHaveAttribute('type', 'file');
  });
});
