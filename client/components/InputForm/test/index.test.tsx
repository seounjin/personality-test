import { render } from '@testing-library/react';
import InputForm from '..';

describe('InputForm', () => {
  test('InputForm render', () => {
    const handleChange = jest.fn();
    const item = [{ label: '제목', input: 'title', defaultValue: '' }];
    const { getByLabelText } = render(
      <InputForm handleChange={handleChange} item={item} />,
    );

    expect(getByLabelText('제목')).toBeInTheDocument();
  });
});
