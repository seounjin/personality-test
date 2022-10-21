import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Multilist from '..';

describe('Multilist', () => {
  test('Multilist render', () => {
    const handleMultilist = jest.fn();

    const { getByText } = render(
      <Multilist cardId={1} handleMultilist={handleMultilist} />,
    );
    const modify = getByText('수정');
    expect(modify).toBeInTheDocument();

    const del = getByText('삭제');
    expect(del).toBeInTheDocument();
  });

  test('Multilist Click', () => {
    const handleMultilist = jest.fn();
    const { getByRole } = render(
      <Multilist cardId={1} handleMultilist={handleMultilist} />,
    );

    const modify = getByRole('modify', { hidden: true });
    const del = getByRole('delete', { hidden: true });

    userEvent.click(modify);
    userEvent.click(del);
  });
});
