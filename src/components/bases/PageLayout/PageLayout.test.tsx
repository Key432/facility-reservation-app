import { render, screen } from '@testing-library/react';
import PageLayout from '../PageLayout';

describe('PageLayout コンポーネント', () => {
  it('タイトルと子要素が正しくレンダリングされる', () => {
    // テスト用のダミー子要素を定義
    const childrenText = 'テスト子要素';
    render(
      <PageLayout title='テストタイトル'>
        <div>{childrenText}</div>
      </PageLayout>,
    );

    // タイトルが正しく表示されているか確認
    expect(screen.getByText('テストタイトル')).toBeInTheDocument();

    // 子要素が正しく表示されているか確認
    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });
});
