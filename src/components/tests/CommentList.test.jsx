/**
 * Should render component correctly
 * Should show n list item
 * Should show message when there is no comments
 */

import React from 'react';
import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import CommentList from '../CommentList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '../../state/userProfile/userProfileReducer';

const renderWithProvider = (Component, { initialState, store=configureStore({
  reducer: {
    profile: userProfileReducer,
  },
  preloadedState: initialState
}) }) => {
  return (
    render(
      <Provider store={store}>
        {Component}
      </Provider>
    )
  );
};


describe('CommentList Component', () => {
  let dummyComments;
  beforeEach(() => {
    dummyComments = [
      {
        owner: {
          name: 'test3',
          avatar: ''
        },
        content: 'content-1',
        downVotesBy: [],
        upVotesBy: []
      },
      {
        owner: {
          name: 'test2',
          avatar: ''
        },
        content: 'content-2',
        downVotesBy: [],
        upVotesBy: []
      },
      {
        owner: {
          name: 'test',
          avatar: ''
        },
        content: 'content-3',
        downVotesBy: [],
        upVotesBy: []
      }
    ];

    cleanup();
  });

  it('Should render component correctly', async () => {
    renderWithProvider(<CommentList comments={dummyComments} onDownVoteComment={() => {}} onNeutralVoteComment={() => {}} onUpVoteComment={() => {}}/>, { initialState: {
      profile: {
        user: {
          id: 'user-1',
          name:'test'
        }
      }
    } });

    screen.debug();

    for (const comment of dummyComments) {
      expect(screen.getByText(comment.content)).toBeVisible();
      expect(screen.getByText(comment.owner.name)).toBeVisible();
    };
  });

  it('Should show n list item', async () => {
    renderWithProvider(<CommentList comments={dummyComments} onDownVoteComment={() => {}} onNeutralVoteComment={() => {}} onUpVoteComment={() => {}}/>, { initialState: {
      profile: {
        user: {
          id: 'user-1',
          name:'test'
        }
      }
    } });

    const allCommentItem = screen.getAllByTestId('comment-item');

    expect(allCommentItem).toHaveLength(dummyComments.length);
  });

  it('Should show message when there is no comments', async () => {
    renderWithProvider(<CommentList comments={[]} onDownVoteComment={() => {}} onNeutralVoteComment={() => {}} onUpVoteComment={() => {}}/>, { initialState: {
      profile: {
        user: {
          id: 'user-1',
          name:'test'
        }
      }
    } });

    const allCommentItem = screen.queryAllByTestId('comment-item');

    expect(allCommentItem).toHaveLength(0);
    expect(screen.getByRole('paragraph')).toBeVisible();
  });
});