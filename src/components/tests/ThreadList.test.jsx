/**
 * Should show memuat daftar thread when users is undefined / empty
 * Should show belum ada thread when there is no threads
 * Should render correctly
 * Should display correctNumber of threads
 */

import '@testing-library/jest-dom/vitest';
import { it, expect, describe, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ThreadList from '../ThreadList';

vi.mock('../ThreadItem', () => ({
  default: ({ title }) => <div data-testid="thread-item">{title}</div>,
}));

describe('ThreadList Component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('Should show memuat daftar thread when users is undefined / empty', async () => {
    render(<ThreadList threads={[]} users={{}}/>);

    expect(screen.getByText('Memuat daftar thread...')).toBeVisible();
  });

  it('Should show belum ada thread when there is no threads', async () => {
    render(<ThreadList users = {[]} threads={[]}/>);

    expect(screen.getByText('Belum ada thread. Buat diskusi pertama kamu.')).toBeVisible();
  });

  it('Should render correctly', async () => {
    const threads=[{
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2023-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      totalComments: 5,
      upVotesBy: ['user-2'],
      downVotesBy: [],
    }];

    const users=[{
      id: 'user-1',
      name: 'User Pertama',
      avatar: 'https://example.com/avatar1.png',
    }];

    render(<ThreadList users={users} threads={threads} />);

    expect(screen.getByText(threads[0].title)).toBeVisible();
  });

  it('Should display correctNumber of threads', async () => {
    const threads=[{
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2023-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      totalComments: 5,
      upVotesBy: ['user-2'],
      downVotesBy: [],
    },
    {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'General',
      createdAt: '2023-01-02T00:00:00.000Z',
      ownerId: 'user-2',
      totalComments: 3,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    }];

    const users=[{
      id: 'user-1',
      name: 'User Pertama',
      avatar: 'https://example.com/avatar1.png',
    },
    {
      id: 'user-2',
      name: 'User Kedua',
      avatar: 'https://example.com/avatar2.png',
    }];

    render(<ThreadList users={users} threads={threads} />);


    for (const thread of threads) {
      expect(screen.getByText(thread.title)).toBeVisible();
    }
    const threadItems = screen.getAllByTestId('thread-item');
    expect(threadItems).toHaveLength(threads.length);
  });
});