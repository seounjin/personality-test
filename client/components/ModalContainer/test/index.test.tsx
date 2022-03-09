import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalContainer from '..';

describe('ModalContainer', () => {
  test('ModalContainer render', () => {
    const handleModal = jest.fn();
    const result = render(<ModalContainer handleModal={handleModal} />);
    expect(result.getByLabelText('아이디')).toBeInTheDocument();
    expect(result.getByLabelText('비밀번호')).toBeInTheDocument();
  });

  test('ModalContainer handleModal Click', () => {
    const handleModal = jest.fn();
    const result = render(<ModalContainer handleModal={handleModal} />);

    userEvent.click(result.getByText('확인'));
    userEvent.click(result.getByText('취소'));

    expect(handleModal).toHaveBeenCalled();
  });
});
