/**
 * Should render component correctly
 * Should show button login when user is not loggin
 * Should show button logout when user is loggin
 * Should navigate to /login page when login button clicked
 * Should call dispatch function when logout button clicked
 * Should navigate to /newthread page when new thread button clicked
 * Should navigate to /leaderboard page when leaderboard button clicked
 */

import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/vitest';
import { screen, cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Navigation from '../Navigation';
import userEvent from '@testing-library/user-event';

const mockDispatch = vi.fn();
vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: () => mockDispatch
}));

const renderWithRouter = (Component, {
  initialState = {},
  store = configureStore({
    reducer: (state = {}) => state,
    preloadedState: initialState
  })
}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        {Component}
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/newthread" element={<div>New Thread Page</div>} />
          <Route path="/leaderboard" element={<div>Leaderboard Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Navigation Component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('Should render component correctly', async () => {
    renderWithRouter(<Navigation />, { initialState: { user: null } });


    expect(screen.getByRole('link', { name: /threads/i })).toBeVisible();
    expect(screen.getByRole('link', { name: /leaderboard/i })).toBeVisible();
    expect(screen.getByRole('link', { name: /login/i })).toBeVisible();
  });

  it('Should show button logout when user is loggin', async () => {
    renderWithRouter(<Navigation />, { initialState: { user: {
      id: 'user-1',
      name: 'John Doe',
      email: ''
    }
    } });

    expect(screen.getByRole('button', {
      name: /logout/i
    })).toBeVisible();
  });

  it('Should show button login when user is not loggin', async () => {
    renderWithRouter(<Navigation />, { initialState: { user: null } });

    expect(screen.getByRole('link', {
      name: /login/i
    })).toBeVisible();
  });

  it('Should navigate to /login page when login button clicked', async () => {
    renderWithRouter(<Navigation />, { initialState: { user: null } });

    const loginButton = screen.getByRole('link', { name: /login/i });

    await userEvent.click(loginButton);

    expect(screen.getByText('Login Page')).toBeVisible();
  });

  it('Should navigate to / page when new thread button clicked', async () => {
    renderWithRouter(<Navigation />, {
      initialState: {
        user: {
          id: 'user-1',
          name: 'John Doe',
          email: ''
        }
      }
    });

    const threadButton = screen.getByRole('link', {
      name: /buat thread/i
    });

    expect(threadButton).toBeVisible();

    await userEvent.click(threadButton);

    expect(screen.getByText('New Thread Page')).toBeVisible();

  });

  it('Should navigate to /leaderboard page when leaderboard button clicked', async () => {
    renderWithRouter(<Navigation />, { initialState: { user: null } });

    const leaderBoardButton = screen.getByRole('link', {
      name: /leaderboard/i
    });

    await userEvent.click(leaderBoardButton);

    expect(screen.getByText('Leaderboard Page')).toBeVisible();
  });

  it('Should call dispatch function when logout button clicked', async () => {
    renderWithRouter(<Navigation />, {
      initialState: {
        user: {
          id: 'user-1',
          name: 'John Doe',
          email: ''
        }
      }
    });

    const logoutButton = screen.getByRole('button', {
      name: /logout/i
    });

    await userEvent.click(logoutButton);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

});