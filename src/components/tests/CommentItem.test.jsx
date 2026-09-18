/**
 * Should Render Correctly
 * Should handle default fallback avatar if owner avatar is missing
 * Should render correct total vote counts
 */

import React from 'react';
import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import CommentItem from '../CommentItem';

const dummyComment = {
  content: '<p>Ini adalah konten komentar dengan tag HTML</p>',
  createdAt: '2026-06-06T10:00:00.000Z',
  upVotesBy: ['user-1', 'user-2'],
  downVotesBy: ['user-3'],
  owner: {
    name: 'Budi Santoso',
    avatar: 'https://example.com/avatar.jpg',
  },
};

describe('CommentItem Component', () => {
  beforeEach(() => {
    cleanup();
  });
  it('Should Render Correctly', async () => {
    render(<CommentItem {...dummyComment}/>);

    const ownerName = screen.getByText(dummyComment.owner.name);
    const commentContent = screen.getByText('Ini adalah konten komentar dengan tag HTML');


    expect(ownerName).toBeVisible();
    expect(commentContent).toBeVisible();
  });

  it('Should handle default fallback avatar if owner avatar is missing', async () => {
    render(<CommentItem {...dummyComment} owner={{ ...dummyComment.owner, avatar: '' }}/>);

    const avatar = await screen.getByAltText('avatar');

    expect(avatar).toHaveAttribute('src', 'https://generated-image-url.jpg');
  });

  it('Should render correct total vote counts', async () => {
    render(<CommentItem {...dummyComment}/>);

    const upVote = await screen.getByText('2');
    const downVote = await screen.getByText('1');

    expect(upVote).toBeVisible();
    expect(downVote).toBeVisible();
  });
});