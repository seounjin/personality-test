import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';

import Admin from '..';

const renderAdminForm = () => {
  const result = render(
    <ThemeProvider theme={theme}>
      <Admin />
    </ThemeProvider>,
  );

  const Title = () => result.getByText('만들어 보아요');
  const UserTitle = () => result.getByText('유저 등록');
  const ImgTitle = () => result.getByText('이미지 등록');
  const SelectTitle = () => result.getByText('선택지 작성');

  const QuestionNumber = () => result.getByText('3번 질문');

  const AddButton = () => result.queryByText('추가');
  const CompleteButton = () => result.queryByText('완료');

  const clickAdd = () => userEvent.click(AddButton());

  const clickExcute = () => userEvent.click(ExcuteButton());

  const clickComplete = async () => {
    await act(async () => {
      await userEvent.click(CompleteButton());
    });
  };

  //결과폼
  const ResultTitle = () => result.queryByText('결과 작성');

  const ResultQusetion = () => result.queryAllByText('1번질문에 대한');
  const ResultSelect = () => result.queryAllByText('1번 선택함');

  const ResultWho = () => result.queryAllByText('당신은?');
  const ResultExp = () => result.queryAllByText('설명');

  const ExcuteButton = () => result.queryByText('취소');
  const CreateButton = () => result.queryByText('생성');

  return {
    Title,
    UserTitle,
    ImgTitle,
    SelectTitle,
    ResultTitle,
    AddButton,
    CompleteButton,
    clickAdd,
    clickComplete,
    QuestionNumber,
    ExcuteButton,
    CreateButton,
    clickExcute,
    ResultQusetion,
    ResultSelect,
    ResultWho,
    ResultExp,
  };
};

describe('<Admin />', () => {
  test.skip('제목 , 부제목 렌더', () => {
    const { Title, UserTitle, ImgTitle, SelectTitle } = renderAdminForm();

    expect(Title()).toBeInTheDocument();
    expect(UserTitle()).toBeInTheDocument();
    expect(ImgTitle()).toBeInTheDocument();
    expect(SelectTitle()).toBeInTheDocument();
  });

  test.skip('완료버튼을 누르면 결과작성 폼이 나와야 한다.', async () => {
    const {
      clickComplete,
      ResultTitle,
      ExcuteButton,
      CreateButton,
      ResultQusetion,
      ResultSelect,
      ResultWho,
      ResultExp,
    } = renderAdminForm();

    await clickComplete();

    expect(ResultTitle()).toBeInTheDocument();

    expect(ResultQusetion()).not.toBeNull();
    expect(ResultSelect()).not.toBeNull();
    expect(ResultWho()).not.toBeNull();
    expect(ResultExp()).not.toBeNull();

    expect(ExcuteButton()).toBeInTheDocument();
    expect(CreateButton()).toBeInTheDocument();
  });

  test.skip('완료버튼을 누르면 완료버튼과 추가버튼은 제거된다.', async () => {
    const { clickComplete, AddButton, CompleteButton } = renderAdminForm();

    await clickComplete();

    expect(AddButton()).not.toBeInTheDocument();
    expect(CompleteButton()).not.toBeInTheDocument();
  });

  test.skip('추가버튼을 누르면 3번 질문 폼이 생성된다.', () => {
    const { QuestionNumber, clickAdd } = renderAdminForm();

    clickAdd();

    expect(QuestionNumber()).toBeInTheDocument();
  });

  test.skip('완료 버튼을 누른뒤 다시 취소버튼을 누르면 결과 작성폼이 사라진다.', async () => {
    const {
      clickComplete,
      clickExcute,
      ResultTitle,
      ExcuteButton,
      CreateButton,
      ResultQusetion,
      ResultSelect,
      ResultWho,
      ResultExp,
    } = renderAdminForm();

    await clickComplete();
    clickExcute();

    expect(ResultTitle()).not.toBeInTheDocument();

    expect(ResultQusetion()).toHaveLength(0);
    expect(ResultSelect()).toHaveLength(0);
    expect(ResultWho()).toHaveLength(0);
    expect(ResultExp()).toHaveLength(0);

    expect(ExcuteButton()).not.toBeInTheDocument();
    expect(CreateButton()).not.toBeInTheDocument();
  });
});
