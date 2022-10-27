import React from 'react';
import { Container, ButtonWrapper } from './UserModalForm.style';
import { useState, useCallback } from 'react';
import TwoButton from '../TwoButton/TwoButton';
import fetcher from '../../api/fetcher';
import InputForm from '../InputForm/InputForm';
import { useRouter } from 'next/router';
import { RootState } from '../../store/modules';
import { useSelector, shallowEqual } from 'react-redux';

const INPUT_ITEM = [
  { id: 't1', label: '아이디', type: 'id', defaultValue: '' },
  { id: 't2', label: '비밀번호', type: 'password', defaultValue: '' },
];

interface UserModalFormProps {
  onClose: () => void;
}

const MTwoButton = React.memo(TwoButton);
const MInputForm = React.memo(InputForm);

const UserModalForm = ({ onClose }: UserModalFormProps): JSX.Element => {
  const [UserId, setUserId] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const router = useRouter();

  const { selectCard, selectAction } = useSelector(
    (state: RootState) => ({
      selectCard: state.home.selectCard,
      selectAction: state.home.selectAction,
    }),
    shallowEqual,
  );

  const requestDelete = async () => {
    try {
      const res = await fetcher('post', `/tests/${selectCard}/delete`, {
        userId: UserId,
        password: Password,
      });

      if (res.success) {
        alert('해당 카드를 삭제하였습니다.');
        router.reload();
      } else {
        alert('아이디 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.log('삭제 에러');
    }
  };

  const requestUpdate = async () => {
    try {
      const res = await fetcher('post', `/tests/${selectCard}/edit-page`, {
        userId: UserId,
        password: Password,
      });

      if (res.success) {
        router.push(`/admin/${selectCard}`);
      } else {
        alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.log('수정 에러');
    }
  };

  const handleOk = () => {
    if (selectAction === 'delete') {
      requestDelete();
    } else if (selectAction === 'modify') {
      requestUpdate();
    }
  };

  const handleUser = useCallback((event): void => {
    const { value, name } = event.target;

    if (name === 'id') {
      setUserId(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }, []);

  return (
    <Container>
      {INPUT_ITEM.map(({ id, label, type, defaultValue }) => (
        <MInputForm
          key={id}
          label={label}
          type={type}
          defaultValue={defaultValue}
          onChange={handleUser}
        />
      ))}
      <ButtonWrapper>
        <MTwoButton
          leftButton={handleOk}
          rightButton={onClose}
          leftName={'확인'}
          rightName={'취소'}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default UserModalForm;
