import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from './SignUpForm';

describe('SignUpForm コンポーネント', () => {
  it('全てのフォーム要素が正しく表示される', () => {
    render(<SignUpForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/名前\*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/性別\*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/メールアドレス\*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード\*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /登録/i })).toBeInTheDocument();
  });

  it('入力値のバリデーションエラーを正しく表示する', async () => {
    render(<SignUpForm onSubmit={jest.fn()} />);
    void userEvent.click(screen.getByRole('button', { name: /登録/i }));
    // エラー時に名前欄と性別欄の二か所に「必須項目です」が表示される
    expect(await screen.findAllByText(/必須項目です/i)).toHaveLength(2);
    await userEvent.type(screen.getByLabelText(/メールアドレス\*/i), 'invalidemail');
    await userEvent.tab(); // focusを外してバリデーションをトリガー
    expect(
      await screen.findByText(/正しい形式のメールアドレスを入力してください/i),
    ).toBeInTheDocument();
  });

  it('適切な入力でonSubmitを呼び出す', async () => {
    const onSubmit = jest.fn();
    render(<SignUpForm onSubmit={onSubmit} />);
    await act(async () => {
      await userEvent.type(screen.getByLabelText(/名前\*/i), 'テスト太郎');
      await userEvent.selectOptions(screen.getByLabelText(/性別\*/i), '男性');
      await userEvent.type(
        screen.getByLabelText(/メールアドレス\*/i),
        'test@example.com',
      );
      await userEvent.type(screen.getByLabelText(/パスワード\*/i), 'password123');
      await userEvent.click(screen.getByRole('button', { name: /登録/i }));
    });
  });
});
