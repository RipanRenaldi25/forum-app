/**
 * Should render correctly
 * Should not shown label when there is no label
 * Should call onInputChange when user interact with input
 * Should extends className when user is given addedStyle props
 */

import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import InputGroup from '../InputGroup';
import userEvent from '@testing-library/user-event';

describe('InputGroup Component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('Should render correctly', () => {
    const props = {
      label: 'Label',
      type: 'text',
      placeHolder: 'placeholder',
      onInputChange: () => {},
      name: 'label',
      value: 'test',
      addedStyle: 'no-style',
    };
    render(<InputGroup {...props}/>);

    expect(screen.getByLabelText(props.label)).toBeVisible();
    expect(screen.getByPlaceholderText(props.placeHolder));
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue(props.value);
  });

  it('Should not shown label when there is no label', () => {
    const props = {
      label: 'Label',
      type: 'text',
      placeHolder: 'placeholder',
      onInputChange: () => {},
      name: 'label',
      value: 'test',
      addedStyle: 'no-style',
    };

    render(<InputGroup {...props} label={null}/>);

    expect(screen.queryByLabelText(props.label)).toBeNull();
    expect(screen.getByPlaceholderText(props.placeHolder)).toBeVisible();
  });

  it('Should call onInputChange when user interact with input', async () => {
    const onInputChange = vi.fn();
    const props = {
      label: 'Label',
      type: 'text',
      placeHolder: 'placeholder',
      onInputChange: () => {},
      name: 'label',
      value: 'test',
      addedStyle: 'no-style',
    };

    render(<InputGroup {...props} onInputChange={onInputChange}/>);

    await userEvent.type(screen.getByRole('textbox'), 'test');

    expect(onInputChange).toHaveBeenCalledTimes(4);
  });

  it('Should extends className when user is given addedStyle props', () => {
    const props = {
      label: 'Label',
      type: 'text',
      placeHolder: 'placeholder',
      onInputChange: () => {},
      name: 'label',
      value: 'test',
      addedStyle: 'no-style',
    };

    const { container } = render(<InputGroup {...props} addedStyle={'text-slate-500 bg-red-500'}/>);

    expect(screen.getByRole('textbox')).toHaveClass('bg-red-500', 'text-slate-500');
  });
});