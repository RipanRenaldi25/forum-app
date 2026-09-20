/**
 * Should render avatar correctly
 * Should show no image with "G" alias when given no name
 * Should add class to when given addedStyle props
 */

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Avatar from '../Profile';
describe('ProfileComponent', () => {
  it('Should render avatar correctly', async () => {
    const props = {
      name: 'test',
      image: 'test',
      addedStyle: ''
    };

    render(<Avatar {...props}/>);

    expect(screen.getByAltText('avatar')).toBeVisible();
    expect(screen.getByText(props.name)).toBeVisible();
  });

  it('Should show no image with "G" alias when given no name', async () => {
    const props = {
      name: 'test',
      avatar: 'test',
      addedStyle: ''
    };

    render(<Avatar />);

    expect(screen.getByText('Tamu')).toBeVisible();
    expect(screen.getByText('Silakan login')).toBeVisible();
    expect(screen.getByText('G')).toBeVisible();
  });

  it('Should add class to when given addedStyle props', () => {
    const props = {
      addedStyle: 'bg-red-500'
    };

    const { container } = render(<Avatar {...props}/>);

    expect(container.querySelector('.avatar')).toHaveClass(props.addedStyle);
  });
});