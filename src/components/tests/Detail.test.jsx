/**
 * Should show loading when there is no detail
 * Should show detail thread when there is detail props
 * Should show login button when user not login yet on detail tab
 * Should show comment form when user is already login
 */

import React from 'react';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import Detail from '../Detail';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../state/users/userReducer';
import { BrowserRouter } from 'react-router-dom';

const renderWithProvider = (Component, { initialState, store = configureStore({
  reducer: {
    user: userReducer
  },
  preloadedState: initialState
}) }) => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        {Component}
      </BrowserRouter>
    </Provider>);
};


describe('Detail Component', () => {
  let dummyComments = null;
  let fakeComment;

  beforeEach(() => {
    cleanup();

    dummyComments = [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama yang diuji.',
        createdAt: '2026-09-19T10:00:00.000Z',
        upVotesBy: ['user-1', 'user-2'],
        downVotesBy: [],
        owner: {
          id: 'user-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg/john.jpg',
        },
      },
      {
        id: 'Comment-2',
        content: 'Komentar kedua untuk memastikan iterasi komponen berjalan.',
        createdAt: '2026-09-19T11:30:00.000Z',
        upVotesBy: [],
        downVotesBy: ['user-3'],
        owner: {
          id: 'user-2',
          name: 'Jane Smith',
          avatar: 'https://generated-image-url.jpg/jane.jpg',
        },
      },
    ];

    fakeComment = {
      id: 'thread-1',
      title: 'Judul Thread Diskusi',
      body: '<p>Ini adalah isi thread dalam format HTML.</p>',
      category: 'react',
      createdAt: '2026-09-19T08:00:00.000Z',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      owner: {
        id: 'user-1',
        name: 'Dicoding Indonesia',
        avatar: 'https://generated-image-url.jpg/dicoding.jpg',
      },
      comments: dummyComments,
    };

  });

  it('Should show loading when there is no detail', async () => {
    renderWithProvider(<Detail detail={{}} />, {
      initialState: {
        users: null
      }
    });

    expect(screen.getByText('Memuat detail thread...')).toBeVisible();
  });

  it('Should show detail thread correctly when there is detail props', async () => {

    renderWithProvider(<Detail detail={fakeComment}/>, { initialState: {
      users: null
    } });

    expect(screen.getByText(fakeComment.title)).toBeVisible();
    expect(screen.getByText(`#${fakeComment.category}`)).toBeVisible();
  });

  it('Should show login button when user not login yet on detail tab', async () => {

    renderWithProvider(
      <Detail detail={fakeComment}/>, {
        initialState: {
          users: null
        }
      }
    );

    expect(screen.getByRole('link')).toBeVisible();
    expect(screen.getByText('Login')).toBeVisible();
  });

  it('Should show comment form when user is already login', async () => {
    renderWithProvider(<Detail detail={fakeComment}/>, {
      initialState: {
        user: {
          id: 'user-1',
          name:'test'
        }
      }
    });

    expect(screen.getByRole('button', {
      name: 'Kirim'
    })).toBeVisible();
    expect(screen.getByPlaceholderText('Tulis komentar kamu...')).toBeVisible();
  });
});