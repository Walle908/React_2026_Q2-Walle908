import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

vi.mock('./components/features/forms/uncontrolledForm/UncontrolledForm', () => ({
  default: () => <div data-testid="mock-uncontrolled">Uncontrolled Form Content</div>,
}));

vi.mock('./components/features/forms/reactHookForm/ReactHookForm', () => ({
  default: () => <div data-testid="mock-hookform">React Hook Form Content</div>,
}));

vi.mock('./components/features/cards/cardList/CardList', () => ({
  default: () => <div data-testid="mock-cardlist">Card List Content</div>,
}));

describe('App Component Structure and State Logic', () => {
  it('должен успешно рендерить базовую структуру приложения и список карточек', () => {
    render(<App />);

    expect(screen.getByText('Hello! Please fill out a form!')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Open Uncontrolled Form' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open React Hook Form' })).toBeInTheDocument();

    expect(screen.getByTestId('mock-cardlist')).toBeInTheDocument();

    expect(screen.queryByTestId('mock-uncontrolled')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-hookform')).not.toBeInTheDocument();
  });

  it('должен открывать неконтролируемую форму при клике на соответствующую кнопку', async () => {
    render(<App />);

    const uncontrolledBtn = screen.getByRole('button', { name: 'Open Uncontrolled Form' });

    await userEvent.click(uncontrolledBtn);

    expect(screen.getByTestId('mock-uncontrolled')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-hookform')).not.toBeInTheDocument();
  });

  it('должен открывать контролируемую форму при клике на соответствующую кнопку', async () => {
    render(<App />);

    const hookFormBtn = screen.getByRole('button', { name: 'Open React Hook Form' });

    await userEvent.click(hookFormBtn);

    expect(screen.getByTestId('mock-hookform')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-uncontrolled')).not.toBeInTheDocument();
  });

  it('должен успешно закрывать модальное окно при вызове onClose', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Open React Hook Form' }));
    expect(screen.getByTestId('mock-hookform')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: '✖' });
    await userEvent.click(closeBtn);

    expect(screen.queryByTestId('mock-hookform')).not.toBeInTheDocument();
  });
});
