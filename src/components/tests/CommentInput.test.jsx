/**
 * Should render component correctly
 * Should handle comment typing event correctly
 * Should call onSubmti function when submit button clicked
 */

import React, { useState } from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import CommentInput from '../CommentInput';
import userEvent from '@testing-library/user-event';

describe('CommentInput Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should render component correctly', async () => {
    render(<CommentInput commentValue={''} onChangeCommentValue={() => {}} onSubmitHandler={() => {}}/>);

    const heading = await screen.getByRole('heading', {
      level: 2,
      name: 'Berikan komentar'
    });

    expect(heading).not.toBeVisible();
  });

  it('Should handle comment typing event correctly', async () => {
    const onChangeHandler = vi.fn();
    render(<CommentInput commentValue={''} onChangeCommentValue={onChangeHandler} onSubmitHandler={() => {}}/>);

    const commentInput = screen.getByRole('textbox');

    await userEvent.type(commentInput, 'Contoh Comment');

    expect(onChangeHandler).toHaveBeenCalledTimes('Contoh Comment'.length);
  });

  it('Should call onSubmti function when submit button clicked', async () => {
    const onSubmit = vi.fn();
    render(<CommentInput commentValue={''} onChangeCommentValue={() => {}} onSubmitHandler={onSubmit}/>);

    const submitButton = await screen.getByRole('button', {
      name: 'Kirim'
    });

    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalled();
  });
});