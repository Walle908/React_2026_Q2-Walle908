import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import formsReducer, { type FormDataPayload } from '@/store/formSlice';
import UncontrolledForm from './UncontrolledForm';

vi.mock('@/utils/convertToBase64', () => ({
  default: vi.fn().mockResolvedValue('data:image/png;base64,mockUncontrolledString'),
}));

describe('UncontrolledForm Component', () => {
  let store: EnhancedStore<{
    forms: {
      submissions: FormDataPayload[];
      countries: string[];
    };
  }>;
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        forms: formsReducer,
      },
      preloadedState: {
        forms: {
          submissions: [],
          countries: ['Russia', 'Serbia', 'USA'],
        },
      },
    });
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <UncontrolledForm onClose={mockOnClose} />
      </Provider>
    );

  it('должен оставлять кнопку сабмита активной при первой загрузке', () => {
    renderComponent();

    const submitBtn = screen.getByRole('button', { name: /submit/i });
    expect(submitBtn).not.toBeDisabled();
  });

  it('должен выводить ошибки Yup-валидации только после попытки отправки формы', async () => {
    renderComponent();

    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const submitBtn = screen.getByRole('button', { name: /submit/i });

    expect(screen.queryByText('Name must start with a capital letter')).not.toBeInTheDocument();

    await userEvent.type(nameInput, 'elena');
    await userEvent.type(emailInput, 'wrong-email');
    expect(screen.queryByText('Name must start with a capital letter')).not.toBeInTheDocument();

    await userEvent.click(submitBtn);

    expect(await screen.findByText('Name must start with a capital letter')).toBeInTheDocument();
    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
  });

  it('должен успешно проходить валидацию при корректном заполнении и отправлять данные в Redux', async () => {
    renderComponent();
    const formElement = document.querySelector('form');
    expect(formElement).toBeInTheDocument();

    if (formElement) {
      const file = new File(['mock-data'], 'test-avatar.jpg', { type: 'image/jpeg' });

      const originalGet = FormData.prototype.get;
      const originalHas = FormData.prototype.has;

      FormData.prototype.get = function (key: string) {
        switch (key) {
          case 'name':
            return 'Elena';
          case 'age':
            return '25';
          case 'email':
            return 'elena@domain.io';
          case 'password':
            return 'password123';
          case 'confirmPassword':
            return 'password123';
          case 'gender':
            return 'female';
          case 'country':
            return 'Russia';
          case 'image':
            return file;
          default:
            return null;
        }
      };

      FormData.prototype.has = function (key: string) {
        if (key === 'terms') return true;
        return false;
      };

      fireEvent.submit(formElement);

      await waitFor(() => {
        const submissions = store.getState().forms.submissions;
        expect(submissions).toHaveLength(1);
        expect(submissions[0]?.name).toBe('Elena');
        expect(submissions[0]?.image).toBe('data:image/png;base64,mockUncontrolledString');
      });

      FormData.prototype.get = originalGet;
      FormData.prototype.has = originalHas;

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('должен прерывать выполнение handleSubmit, если элемент не является формой', async () => {
    renderComponent();

    const submitBtn = screen.getByRole('button', { name: /submit/i });

    const formElement = document.querySelector('form');
    expect(formElement).toBeInTheDocument();

    if (formElement) {
      const originalHasInstance = HTMLFormElement[Symbol.hasInstance];

      Object.defineProperty(HTMLFormElement, Symbol.hasInstance, {
        value: () => false,
        configurable: true,
      });

      await userEvent.click(submitBtn);

      const submissions = store.getState().forms.submissions;
      expect(submissions).toHaveLength(0);
      expect(mockOnClose).not.toHaveBeenCalled();

      if (originalHasInstance) {
        Object.defineProperty(HTMLFormElement, Symbol.hasInstance, {
          value: originalHasInstance,
          configurable: true,
        });
      }
    }
  });
});
