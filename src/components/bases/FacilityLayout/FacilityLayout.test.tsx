import { render, screen } from '@testing-library/react';
import FacilityLayout from '../FacilityLayout';
import List from '@/features/Facility/component/List';

// List コンポーネントをモック化
jest.mock('@/features/Facility/component/List', () => {
  return jest.fn(() => <div>List Mock</div>);
});

describe('FacilityLayoutコンポーネント', () => {
  it('FacilityLayoutはchildrenとListコンポーネントをレンダリングする', () => {
    render(
      <FacilityLayout>
        <div>テストチルドレン</div>
      </FacilityLayout>,
    );

    // children の内容がレンダリングされているか
    expect(screen.getByText('テストチルドレン')).toBeInTheDocument();

    // List コンポーネントがレンダリングされているか
    expect(List).toHaveBeenCalled();
    expect(screen.getByText('List Mock')).toBeInTheDocument();
  });
});
