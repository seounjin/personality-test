import React from 'react';
import Wrapper from './styles';
import { useState, useCallback } from 'react';
import TwoButton from '../TwoButton';
import fetcher from '../../api/fetcher';
import InputForm from '../InputForm';
import { useRouter } from 'next/router';
import { RootState } from '../../store/modules';
import { useSelector, shallowEqual } from 'react-redux';

const ITEM = [
  { label: '아이디', input: 'id', defaultValue: '' },
  { label: '비밀번호', input: 'password', defaultValue: '' },
];

interface UserModalFormProps {
  handleModal: () => void;
}

const UserModalForm = ({ handleModal }: UserModalFormProps): JSX.Element => {
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
      // 수정
      const res = await fetcher('post', `/tests/${selectCard}/edit-page`, {
        userId: UserId,
        password: Password,
      });

      // 아이디 비밀번호 일치할경우 수정페이지로 이동
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
    event.preventDefault();

    const { value, name } = event.target;

    if (name === 'id') {
      setUserId(value);
    } else {
      setPassword(value);
    }
  }, []);

  return (
    <Wrapper>
      {ITEM.map((data, index) => {
        const { label, input, defaultValue } = data;
        return (
          <InputForm
            key={label + index}
            label={label}
            input={input}
            defaultValue={defaultValue}
            index={index}
            handleChange={handleUser}
          ></InputForm>
        );
      })}
      <div className="modal_button">
        <TwoButton
          leftButton={handleOk}
          rightButton={handleModal}
          leftName={'확인'}
          rightName={'취소'}
        />
      </div>
    </Wrapper>
  );
};

export default UserModalForm;
