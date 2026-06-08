import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Text from './Text';

describe('Text Component', () => {
  it('должен успешно рендерить children текст с дефолтным HTML-тегом p', () => {
    render(<Text>Привет мир</Text>);
    const element = screen.getByText('Привет мир');
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe('p');
  });

  it('должен динамически менять HTML-тег на основе свойства as', () => {
    render(<Text as="h1">Заголовок</Text>);
    const element = screen.getByRole('heading', { level: 1 });
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe('h1');
  });

  it('должен корректно прокидывать остальные HTML-атрибуты через ...props', () => {
    render(
      <Text id="unique-text-id" data-testid="custom-text">
        Тест атрибутов
      </Text>
    );
    const element = screen.getByTestId('custom-text');
    expect(element).toHaveAttribute('id', 'unique-text-id');
  });

  it('должен прокидывать кастомный className и комбинировать его', () => {
    render(<Text className="my-custom-class">Классы</Text>);
    const element = screen.getByText('Классы');
    expect(element).toHaveClass('my-custom-class');
  });
});
