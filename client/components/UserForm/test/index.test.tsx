import { render, screen, act } from '@testing-library/react';
import UserForm from '..';

describe('UserForm', () => {
  test('UserForm render', () => {
    const handleUser = jest.fn();
    const item = [{ label: '제목', input: 'title' }];
    const { getByLabelText } = render(
      <UserForm handleUser={handleUser} item={item} />,
    );

    expect(getByLabelText('제목')).toBeInTheDocument();
  });
});
