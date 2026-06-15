import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import formsReducer from '@/store/formSlice';
import ReactHookForm from './ReactHookForm';
import { type FormDataPayload } from '@/store/formSlice';

vi.mock('@/utils/convertToBase64', () => ({
  default: vi.fn().mockResolvedValue('data:image/png;base64,mockBase64String'),
}));

describe('ReactHookForm Component (Controlled Live Validation)', () => {
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
        <ReactHookForm onClose={mockOnClose} />
      </Provider>
    );

  it('должен блокировать кнопку сабмита при первой загрузке (пустая форма)', () => {
    renderComponent();

    const submitBtn = screen.getByRole('button', { name: /submit/i });
    expect(submitBtn).toBeDisabled();
  });

  it('должен выводить ошибку live-валидации при некорректном вводе и удерживать кнопку заблокированной', async () => {
    renderComponent();

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitBtn = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(nameInput, 'elena');

    await userEvent.type(emailInput, 'elena@gmail');

    expect(await screen.findByText('Name must start with a capital letter')).toBeInTheDocument();
    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();

    expect(submitBtn).toBeDisabled();
  });

  it('должен активировать кнопку при полностью валидных данных и успешно отправлять форму в стор', async () => {
    renderComponent();

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const ageInput = screen.getByRole('spinbutton', { name: 'Age' });
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm password');
    const countryInput = document.querySelector('input[name="country"]') as HTMLInputElement;
    const termsCheckbox = screen.getByRole('checkbox', { name: 'I accept Terms and Conditions' });
    const fileInput = screen.getByLabelText('Upload an image (png/jpeg)');
    const submitBtn = screen.getByRole('button', { name: /submit/i });

    const file = new File(['mock'], 'avatar.png', { type: 'image/png' });

    await userEvent.type(nameInput, 'Elena');
    await userEvent.type(ageInput, '25');
    await userEvent.type(emailInput, 'elena@domain.io');
    await userEvent.type(passwordInput, 'secure123');
    await userEvent.type(confirmPasswordInput, 'secure123');

    await userEvent.click(screen.getByLabelText(/female/i));
    await userEvent.type(countryInput, 'Russia');
    await userEvent.upload(fileInput, file);
    await userEvent.click(termsCheckbox);

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });

    await userEvent.click(submitBtn);

    await waitFor(() => {
      const submissions = store.getState().forms.submissions;
      expect(submissions).toHaveLength(1);
      expect(submissions[0]?.name).toBe('Elena');
      expect(submissions[0]?.image).toBe('data:image/png;base64,mockBase64String');
    });

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('должен прерывать отправку внутри handleFormSubmit, если форма невалидна', async () => {
    renderComponent();

    const formElement = screen
      .getByRole('heading', { name: /react hook form/i })
      .closest('div')
      ?.querySelector('form');
    expect(formElement).toBeInTheDocument();

    if (formElement) {
      fireEvent.submit(formElement);

      const submissions = store.getState().forms.submissions;
      expect(submissions).toHaveLength(0);
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });
});
