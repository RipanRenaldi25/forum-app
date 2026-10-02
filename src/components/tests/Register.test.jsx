/**
 * Should handle correctly
 * Should handle typing user correctly
 * Should call onSubmit function when submit button clicked
 * Should navigate to login page when login button clicked
 */

import '@testing-library/jest-dom/vitest';
import { it, expect, describe, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Register from '../Register';
import userEvent from '@testing-library/user-event';

const mockDispatch = vi.fn();
vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: () => mockDispatch
}));

const renderWithProvider = (Component, {
  store = configureStore({
    reducer: (state) => state,
  })
}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/register" element={Component} />
          <Route path="/login" element={<div>Login Page</div>}/>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};
describe('Register Component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('Should render component correctly', async () => {
    renderWithProvider(<Register />, {});

    expect(screen.getByText('Join the forum')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Register' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Login' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeVisible();
    expect(screen.getByLabelText('Password')).toBeVisible();
  });

  it('Should handle typing user correctly', async () => {
    renderWithProvider(<Register />, {});

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'johndoe@gmail.com');
    await userEvent.type(passwordInput, 'password123');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('johndoe@gmail.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('Should call onSubmit function when submit button clicked', async () => {
    renderWithProvider(<Register />, {});

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const emailinput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Register' });

    await userEvent.type(nameInput, 'test');
    await userEvent.type(emailinput, 'test@gmail.com');
    await userEvent.type(passwordInput, 'password123');

    await userEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledOnce();
  });

  it('Should navigate to login page when login button clicked', async () => {
    renderWithProvider(<Register />, {});

    const loginButton = screen.getByRole('link', { name: /login/i });

    await userEvent.click(loginButton);

    expect(screen.getByText('Login Page')).toBeVisible();
  });

  it('Should clear input fields after submit button clicked', async () => {
    renderWithProvider(<Register />, {});

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Register' });

    await userEvent.type(nameInput, 'test');
    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.type(passwordInput, 'password123');

    await userEvent.click(submitButton);

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

});