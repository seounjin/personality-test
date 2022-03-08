import { render, screen } from '@testing-library/react';
import Multilist from '..';
import userEvent from '@testing-library/user-event';

describe('Multilist', () => {
  test('Multilist render', () => {
    const handleModal = jest.fn();

    const { getByText } = render(<Multilist handleModal={handleModal} />);
    const modify = getByText('수정');
    expect(modify).toBeInTheDocument();

    const del = getByText('삭제');
    expect(del).toBeInTheDocument();
  });
});
