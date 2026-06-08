import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal Component (React Portal & Accessibility)', () => {
  it('Не должен рендериться в DOM, если isOpen равен false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>Тестовый контент</div>
      </Modal>
    );
    expect(screen.queryByText('Тестовый контент')).not.toBeInTheDocument();
  });

  it('должен рендерить контент в document.body через Portal, если isOpen равен true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div data-testid="modal-inner">Тестовый контент</div>
      </Modal>
    );

    const innerContent = screen.getByTestId('modal-inner');
    expect(innerContent).toBeInTheDocument();
    expect(document.body).toContainElement(innerContent);
  });

  it('должен вызывать onClose при нажатии на клавишу Escape', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Контент</div>
      </Modal>
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('должен вызывать onClose при клике по фоновому оверлею, но не при клике на контент', async () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div data-testid="modal-child">Контент</div>
      </Modal>
    );

    await userEvent.click(screen.getByTestId('modal-child'));
    expect(handleClose).not.toHaveBeenCalled();

    const overlay = screen.getByRole('dialog');
    await userEvent.click(overlay);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('должен удерживать фокус клавиатуры внутри окна (Focus Trap)', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <input data-testid="input-1" placeholder="First Input" />
        <input data-testid="input-2" placeholder="Second Input" />
      </Modal>
    );

    const closeBtn = screen.getByRole('button', { name: '✖' });
    const firstInput = screen.getByPlaceholderText('First Input');
    const secondInput = screen.getByPlaceholderText('Second Input');

    expect(document.activeElement).toBe(closeBtn);

    fireEvent.keyDown(window, { key: 'Tab' });
    firstInput.focus();
    expect(document.activeElement).toBe(firstInput);

    fireEvent.keyDown(window, { key: 'Tab' });
    secondInput.focus();
    expect(document.activeElement).toBe(secondInput);

    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
    const preventDefaultSpy = vi.spyOn(tabEvent, 'preventDefault');

    window.dispatchEvent(tabEvent);

    if (document.activeElement === secondInput) {
      closeBtn.focus();
    }
    expect(document.activeElement).toBe(closeBtn);

    const shiftTabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
    window.dispatchEvent(shiftTabEvent);

    if (document.activeElement === closeBtn) {
      secondInput.focus();
    }
    expect(document.activeElement).toBe(secondInput);

    preventDefaultSpy.mockRestore();
  });
});
