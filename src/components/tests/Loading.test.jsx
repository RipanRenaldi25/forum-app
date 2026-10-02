import '@testing-library/jest-dom/vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Loading from '../Loading';

const NavigationTrigger = ({ to }) => {
  const navigate = useNavigate();
  return <button onClick={() => navigate(to)}>Navigate</button>;
};

const renderWithRouter = (component, initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <NavigationTrigger to="/new-path" />
      {component}
      <Routes>
        <Route path="/new-path" element={<div>New Path</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('Loading Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();

    vi.useRealTimers();
  });

  it('Should render correctly', () => {
    const { container } = renderWithRouter(<Loading />);
    const bar = container.querySelector('.sticky');

    expect(bar).toHaveClass('invisible');
    expect(bar).not.toHaveClass('loading-bar-fill');
  });

  it('Should show loading bar when navigating to a new path', () => {
    const { container } = renderWithRouter(<Loading />);

    fireEvent.click(screen.getByText('Navigate'));

    const bar = container.querySelector('.sticky');
    expect(screen.getByText('New Path')).toBeVisible();
    expect(bar).toHaveClass('h-1');
    expect(bar).not.toHaveClass('invisible');
  });

  it('Should hide loading bar after 800ms', () => {
    const { container } = renderWithRouter(<Loading />);

    fireEvent.click(screen.getByText('Navigate'));
    expect(container.querySelector('.sticky')).not.toHaveClass('invisible');

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(container.querySelector('.sticky')).toHaveClass('invisible');
  });
});