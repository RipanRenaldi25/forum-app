/**
 * Should render correctly
 * Should handle email and password input change correctly
 * Should call onSubmit function when submit button clicked
 * Should navigate to signup page when signup link clicked
 */

import React from 'react';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Login from '../Login';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const renderWithRedux = (
  component,
  {
    initialState = {},
    store = configureStore({
      reducer: (state = {}) => state,
      preloadedState: initialState,
    }),
  } = {}
) =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={component} />
          <Route path="/signup" element={<div>Signup Page</div>} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

const mockDispatch = vi.fn();
vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: () => mockDispatch,
}));


describe('Login Component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('Should render correctly', async () => {
    renderWithRedux(<Login />);

    expect(screen.getByText('Login')).toBeVisible();
    expect(screen.getByText('Welcome back')).toBeVisible();
    expect(screen.getByPlaceholderText('Email')).toBeVisible();
    expect(screen.getByLabelText('Password')).toBeVisible();
    expect(screen.getByRole('button', {
      name: 'Log In'
    })).toBeVisible();
    expect(screen.getByRole('link', {
      name: /daftar sekarang/i
    })).toBeVisible();
  });

  it('Should handle email and password input change correctly', async () => {
    renderWithRedux(<Login />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByLabelText('Password');

    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.type(passwordInput, 'password');

    expect(emailInput).toHaveValue('test@gmail.com');
    expect(passwordInput).toHaveValue('password');
  });

  it('Should call onSubmit function when submit button clicked', async () => {
    renderWithRedux(<Login />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', {
      name: 'Log In'
    });

    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledOnce();
  });

  it('Should navigate to signup page when signup link clicked', async () => {
    renderWithRedux(<Login />);

    const signupLink = screen.getByRole('link', {
      name: /daftar sekarang/i
    });

    await userEvent.click(signupLink);

    expect(screen.getByText(/signup page/i)).toBeVisible();
  });
});