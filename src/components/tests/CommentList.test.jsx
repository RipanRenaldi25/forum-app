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
        downvotesBy: [],
        upVotesBy: []
      },
      {
        owner: {
          name: 'test2',
          avatar: ''
        },
        content: 'content-2',
        downvotesBy: [],
        upVotesBy: []
      },
      {
        owner: {
          name: 'test',
          avatar: ''
        },
        content: 'content-3',
        downvotesBy: [],
        upVotesBy: []
      }
    ];

    cleanup();
  });

  it('Should render component correctly', async () => {
    render(<CommentList comments={dummyComments}/>);

    for (const comment of dummyComments) {
      expect(screen.getByText(comment.content)).toBeVisible();
      expect(screen.getByText(comment.owner.name)).toBeVisible();
    };
  });

  it('Should show n list item', async () => {
    render(<CommentList comments={dummyComments}/>);

    const allCommentItem = screen.getAllByTestId('comment-item');

    expect(allCommentItem).toHaveLength(dummyComments.length);
  });

  it('Should show message when there is no comments', async () => {
    render(<CommentList comments={[]}/>);

    const allCommentItem = screen.queryAllByTestId('comment-item');

    expect(allCommentItem).toHaveLength(0);
    expect(screen.getByRole('paragraph')).toBeVisible();
  });
});