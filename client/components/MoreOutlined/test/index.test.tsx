import { render, screen, act } from '@testing-library/react';
import MoreOutlined from '..';
import userEvent from '@testing-library/user-event';

describe('MoreOutlined button', () => {
  test('Img Button', () => {
    const handleModal = jest.fn();
    const result = render(<MoreOutlined handleModal={handleModal} />);

    const img = result.getByAltText('moreOutlined');
    expect(img).toHaveAttribute('src', '/vertical_icon.png');
  });

  test.skip('Img Button Click', async () => {
    const handleModal = jest.fn();
    const { getByRole, findByRole } = render(
      <MoreOutlined handleModal={handleModal} />,
    );

    const target = getByRole('button', { name: /img-btn/i });

    await act(async () => {
      userEvent.click(target);
    });
    expect(screen.getByText('수정')).toBeInTheDocument();
    expect(screen.getByText('삭제')).toBeInTheDocument();
  });
});
