// AuthStateWrapper.test.tsx
import { render, screen } from '@testing-library/react';
import AuthStateWrapper from './AuthStateWrapper';
import { useAuthState } from '../hooks/useAuthState';

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

// useAuthStateカスタムフックのモック
jest.mock('../hooks/useAuthState');

describe('AuthStateWrapper コンポーネントのテスト', () => {
  const childText = '子コンポーネントのテキスト';

  it('ログイン状態で、showWhenLoggedInがtrueの場合、子コンポーネントが表示される', () => {
    // ログインしている状態をモック
    (useAuthState as jest.Mock).mockReturnValue({ isLoggedIn: true });
    render(
      <AuthStateWrapper showWhenLoggedIn={true}>
        <div>{childText}</div>
      </AuthStateWrapper>,
    );
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('ログイン状態で、showWhenLoggedInがfalseの場合、子コンポーネントが表示されない', () => {
    (useAuthState as jest.Mock).mockReturnValue({ isLoggedIn: true });
    render(
      <AuthStateWrapper showWhenLoggedIn={false}>
        <div>{childText}</div>
      </AuthStateWrapper>,
    );
    expect(screen.queryByText(childText)).toBeNull();
  });

  it('非ログイン状態で、showWhenLoggedInがtrueの場合、子コンポーネントが表示されない', () => {
    (useAuthState as jest.Mock).mockReturnValue({ isLoggedIn: false });
    render(
      <AuthStateWrapper showWhenLoggedIn={true}>
        <div>{childText}</div>
      </AuthStateWrapper>,
    );
    expect(screen.queryByText(childText)).toBeNull();
  });

  it('非ログイン状態で、showWhenLoggedInがfalseの場合、子コンポーネントが表示される', () => {
    (useAuthState as jest.Mock).mockReturnValue({ isLoggedIn: false });
    render(
      <AuthStateWrapper showWhenLoggedIn={false}>
        <div>{childText}</div>
      </AuthStateWrapper>,
    );
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
