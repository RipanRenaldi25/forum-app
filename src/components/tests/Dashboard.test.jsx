import React from 'react';
import '@testing-library/jest-dom/vitest';
import { expect, describe, it, beforeEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userProfileReducer from '../../state/userProfile/userProfileReducer';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from '../Dashboard';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const renderWithProvider = (Component, { initialState, store=configureStore({
  reducer: {
    profile: userProfileReducer
  },
  preloadedState: initialState
}) }) => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        {Component}
      </Provider>
    </BrowserRouter>
  );
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('Should render correctly', () => {
    renderWithProvider(<Dashboard />, { initialState: {
      profile: {
        user: {
          id: 'user-1',
          name: 'test',
          avatar: ''
        }
      }
    } });

    const forumHeading = screen.getByText('Forum');
    const diskusiHeading = screen.getByText('Diskusi');
    const menuButton = screen.getByRole('button', { name: 'Menu' });

    expect(forumHeading).toBeVisible();
    expect(diskusiHeading).toBeVisible();
    expect(menuButton).toBeVisible();
  });

  it('Should toggle menu when menu button is clicked', async () => {
    renderWithProvider(<Dashboard />, { initialState: {
      profile: {
        user: {
          id: 'user-1',
          name: 'test',
          avatar: ''
        }
      }
    } });

    expect(screen.getByTestId('dashboard-menu')).toHaveClass('hidden');

    const menuButton = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(menuButton);

    expect(screen.getByTestId('dashboard-menu')).toHaveClass('block');
  });

  it('Should display profile information correctly', () => {
    const initialState = {
      profile: {
        user: {
          id: 'user-1',
          name: 'John Doe',
          avatar: 'https://example.com/avatar.jpg'
        }
      }
    };

    renderWithProvider(<Dashboard />, { initialState });

    const profileName = screen.getByText('John Doe');
    const profileImage = screen.getByAltText('avatar');

    expect(profileName).toBeVisible();
    expect(profileImage).toHaveAttribute('src', initialState.profile.user.avatar);
  });
});