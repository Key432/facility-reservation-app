import { render, screen } from '@testing-library/react';
import Layout from '../RootLayout';
import React from 'react';

// HeaderとFooterをモック化
jest.mock('../Header', () => {
  return jest.fn(() => <header data-testid='header'>Header</header>);
});
jest.mock('../Footer', () => {
  return jest.fn(() => <footer data-testid='footer'>Footer</footer>);
});

describe('Layout コンポーネント', () => {
  it('HeaderとFooterが存在し、子要素が正しくレンダリングされる', () => {
    const childrenText = '子要素テスト';
    render(
      <Layout>
        <div>{childrenText}</div>
      </Layout>,
    );

    // Headerの存在確認
    expect(screen.getByTestId('header')).toBeInTheDocument();
    // Footerの存在確認
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    // 子要素が正しく表示されているか確認
    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });
});
