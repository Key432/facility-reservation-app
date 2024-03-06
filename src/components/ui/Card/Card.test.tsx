import { render, screen } from '@testing-library/react';
import Card from '../Card'; // コンポーネントのパスは適宜調整してください

describe('Card コンポーネント', () => {
  it('Cardがレンダリングされ、タイトルが表示される', () => {
    render(<Card title='テストタイトル' />);
    expect(screen.getByText('テストタイトル')).toBeInTheDocument();
  });

  it('Cardのtextプロパティが与えられた場合、そのテキストを表示する', () => {
    render(<Card title='テストタイトル' text='これはテストテキストです。' />);
    expect(screen.getByText('これはテストテキストです。')).toBeInTheDocument();
  });

  it('Cardのtextプロパティが省略された場合、テキストが空または表示されないことを確認する', () => {
    const { container } = render(<Card title='テストタイトル' />);
    expect(container.querySelector('p')).toBeEmptyDOMElement();
  });
});
