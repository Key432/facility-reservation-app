import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

// NOTE: describe()はいくつかのテストをまとめるブロックを表す
describe('Buttonコンポーネント', () => {
  // NOTE: it()は実際のテストを記述する
  it('ボタンが正しくレンダリングされる', () => {
    render(<Button label='テスト' />);
    expect(screen.getByRole('button', { name: 'テスト' })).toBeInTheDocument();
  });

  it('labelプロパティがボタン内に正しく表示される', () => {
    const testLabel = 'クリックミー';
    render(<Button label={testLabel} />);
    expect(screen.getByText(testLabel)).toBeInTheDocument();
  });

  it('onClickハンドラが正しく機能する', () => {
    const handleClick = jest.fn();
    render(<Button label='クリック' onClick={handleClick} />);
    fireEvent.click(screen.getByText('クリック'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
