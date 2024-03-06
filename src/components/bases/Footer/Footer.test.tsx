import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer コンポーネント', () => {
  it('Footerがレンダリングされ、正しいHTMLタグを使用している', () => {
    const { container } = render(<Footer />);
    // footer タグが使われているか
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
  it('GitHubリンクが正しい', () => {
    render(<Footer />);
    // GitHub リンクが正しいか
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('GitHub').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/Key432/facility-reservation-app',
    );
    // target属性が正しい
    expect(screen.getByText('GitHub').closest('a')).toHaveAttribute('target', '_blank');
  });
});
