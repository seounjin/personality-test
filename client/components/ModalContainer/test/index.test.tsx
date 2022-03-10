import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalContainer from '..';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('ModalContainer', () => {
  test('ModalContainer render', () => {
    const handleModal = jest.fn();
    const result = render(<ModalContainer handleModal={handleModal} />);
    expect(result.getByLabelText('아이디')).toBeInTheDocument();
    expect(result.getByLabelText('비밀번호')).toBeInTheDocument();
  });

  test('handleOk handleModal Click', () => {
    const handleModal = jest.fn();
    const result = render(<ModalContainer handleModal={handleModal} />);

    userEvent.click(result.getByText('확인'));
    userEvent.click(result.getByText('취소'));

    expect(handleModal).toHaveBeenCalled();
  });

  test.skip('API test handleOk Click ', async () => {
    const mock = new MockAdapter(axios, { delayResponse: 200 });
    mock.onDelete('/test/1').reply(200, { sucess: true });

    const mockAlert = jest.fn();
    window.alert = mockAlert;

    const handleModal = jest.fn();
    const result = render(<ModalContainer handleModal={handleModal} />);
    userEvent.click(result.getByText('확인'));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('성공');
    });
  });
});
