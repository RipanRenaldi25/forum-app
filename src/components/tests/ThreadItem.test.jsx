/**
 * Should render correctly
 * Should show text color when user is already upvoted or downvoted
 * Should call handleUpVote function when upvote button clicked
 * Should call handleDownVote function when downvote button clicked
 * Should call handleNeutralVote function when upvote button clicked and user is already upvoted
 * Should call handleNeutralVote function when downvote button clicked and user is already downvoted
 */

import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { it, expect, describe, afterEach, vi } from 'vitest';
import ThreadItem from '../ThreadItem';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockDispatch = vi.fn();
vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: () => mockDispatch
}));

const renderWithProvider = (Component, {
  initialState = {},
  store = configureStore({ reducer: (state) => state, preloadedState: initialState })
}) => {
  return (
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          {Component}
        </Provider>
      </MemoryRouter>
    )
  );
};

describe('ThreadItem Component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('Should render correctly', async () => {
    const initialState = {
      profile: {
        user: {
          id: 'user-1',
          name: 'User Pertama',
          avatar: 'https://example.com/avatar1.png',
        }
      }
    };

    const fakeThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2023-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      totalComments: 5,
      upVotesBy: ['user-2'],
      downVotesBy: [],
    };

    renderWithProvider(<ThreadItem {...fakeThread}/>, { initialState });

    expect(screen.getByText(fakeThread.title)).toBeVisible();
    expect(screen.getByText(fakeThread.body)).toBeVisible();
    expect(screen.getByText(`#${fakeThread.category}`)).toBeVisible();
  });

  it('Should show text color when user is already upvoted or downvoted', async () => {
    const initialState = {
      profile: {
        user: {
          id: 'user-1',
          name: 'User Pertama',
          avatar: 'https://example.com/avatar1.png',
        }
      }
    };

    const fakeThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2023-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      totalComments: 5,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };

    renderWithProvider(<ThreadItem {...fakeThread}/>, { initialState });

    const upVoteButton = screen.getByTestId('upvote-button');

    expect(upVoteButton).toHaveClass('text-cyan-400');
  });

  it('Should show text color when user is already downvoted', async () => {
    const initialState = {
      profile: {
        user: {
          id: 'user-1',
          name: 'User Pertama',
          avatar: 'https://example.com/avatar1.png',
        }
      }
    };

    const fakeThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2023-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      totalComments: 5,
      upVotesBy: [],
      downVotesBy: ['user-1'],
    };

    renderWithProvider(<ThreadItem {...fakeThread}/>, { initialState });

    const downVoteButton = screen.getByTestId('downvote-button');

    expect(downVoteButton).toHaveClass('text-rose-400');
  });
  it('Should call handleUpVote function when upvote button clicked', async () => {
    const initialState = {
      profile: {
        user: {
          id: 'user-1',
          name: 'User Pertama',
          avatar: 'https://example.com/avatar1.png',
        }
      }
    };

    const fakeThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2023-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      totalComments: 5,
      upVotesBy: [],
      downVotesBy: [],
    };

    renderWithProvider(<ThreadItem {...fakeThread}/>, { initialState });

    const upVoteButton = screen.getByTestId('upvote-button');

    await userEvent.click(upVoteButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Should call handleDownVote function when downvote button clicked', async () => {
    const initialState = {
      profile: {
        user: {
          id: 'user-1',
          name: 'User Pertama',
          avatar: 'https://example.com/avatar1.png',
        }
      }
    };

    const fakeThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2023-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      totalComments: 5,
      upVotesBy: [],
      downVotesBy: [],
    };

    renderWithProvider(<ThreadItem {...fakeThread}/>, { initialState });

    const downVoteButton = screen.getByTestId('downvote-button');

    await userEvent.click(downVoteButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Should call handleNeutralVote function when upvote button clicked and user is already upvoted', async () => {
    const initialState = {
      profile: {
        user: {
          id: 'user-1',
          name: 'User Pertama',
          avatar: 'https://example.com/avatar1.png',
        }
      }
    };

    const fakeThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2023-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      totalComments: 5,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };

    renderWithProvider(<ThreadItem {...fakeThread}/>, { initialState });

    const upVoteButton = screen.getByTestId('upvote-button');

    await userEvent.click(upVoteButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Should call handleNeutralVote function when downvote button clicked and user is already downvoted', async () => {
    const initialState = {
      profile: {
        user: {
          id: 'user-1',
          name: 'User Pertama',
          avatar: 'https://example.com/avatar1.png',
        }
      }
    };

    const fakeThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2023-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      totalComments: 5,
      upVotesBy: [],
      downVotesBy: ['user-1'],
    };

    renderWithProvider(<ThreadItem {...fakeThread}/>, { initialState });

    const downVoteButton = screen.getByTestId('downvote-button');

    await userEvent.click(downVoteButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Should not call vote function when user is not logged in', async () => {
    const initialState = {
      profile: {
        user: null
      }
    };

    const fakeThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2023-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      totalComments: 5,
      upVotesBy: [],
      downVotesBy: [],
    };

    renderWithProvider(<ThreadItem {...fakeThread}/>, { initialState });

    const downVoteButton = screen.getByTestId('downvote-button');
    const upVoteButton = screen.getByTestId('upvote-button');

    await userEvent.click(downVoteButton);
    await userEvent.click(upVoteButton);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});