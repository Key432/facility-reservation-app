import { render, screen } from '@testing-library/react';
import Header from '../Header';

// supabaseのauth-helpersはモック化しないと依存関係が解決できないらしい
// https://stackoverflow.com/questions/77186543/cannot-run-unit-tests-in-next-13-with-supabase-due-to-syntaxerror-unexpected-t
jest.mock('@supabase/auth-helpers-nextjs', () => {
  return {
    createClientComponentClient: jest.fn().mockImplementation(() => {
      return {
        auth: {
          signIn: jest.fn(),
          onAuthStateChange: jest.fn().mockImplementation(() => {
            return {
              data: {
                subscription: {
                  id: '123',
                  callback: jest.fn(),
                  unsubscribe: jest.fn(),
                },
              },
              error: null,
              fetching: false,
            };
          }),
        },
      };
    }),
  };
});

// AuthStateWrapperをモック化する
jest.mock('@/features/Auth/component/AuthStateWrapper', () => {
  return jest.fn(({ showWhenLoggedIn }: { showWhenLoggedIn: boolean }) =>
    showWhenLoggedIn ? (
      <div>Wrapper Mock: True View</div>
    ) : (
      <div>Wrapper Mock: False View</div>
    ),
  );
});

describe('Headerコンポーネント', () => {
  it('Headerがレンダリングされ、基本的なナビゲーションリンクを含む', () => {
    render(<Header />);
    // ホームリンクが正しいか
    expect(screen.getByText('設備予約デモ')).toBeInTheDocument();
    expect(screen.getByText('設備予約デモ').closest('a')).toHaveAttribute('href', '/');
  });
});
