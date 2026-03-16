import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';

// Giả lập ResizeObserver cho jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Frontend Component Tests', () => {
  it('1. Render Navbar với logo Lê Quang Việt', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthProvider>
    );
    expect(screen.getByText(/Lê Quang Việt Shop/i)).toBeTruthy();
    expect(screen.getByText(/Đăng nhập/i)).toBeTruthy();
  });
});
