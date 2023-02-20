import { useRouter } from 'next/router';
import React, { FormEvent } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import fetcher from '../../../../api/fetcher';
import { RootState } from '../../../../store/modules';
import { FINAL_CONFIRMATION_FORM_ID } from '../../admin.const';
import SubHeadlineLabel from '../../../../components/SubHeadlineLabel/SubHeadlineLabel';
import TextBox from '../../../../components/TextBox/TextBox';
import WeightedScoreBoard from '../../components/WeightedScoreBoard/WeightedScoreBoard';
import BoxShadowCard from '../BoxShadowCard/BoxShadowCard';
import SubTextBoxSection from '../../../../components/SubTextBoxSection/SubTextBoxSection';
import TextBoxSection from '../TextBoxSection/TextBoxSection';
import WeightedScoreBoardSection from '../WeightedScoreBoardSection/WeightedScoreBoardSection';
import { Form } from './FinalConfirmationForm.style';
import Radio from '../../../../components/Radio/Radio';
import RadioGroup from '../../../../components/RadioGroup/RadioGroup';

const FinalConfirmationForm = () => {
  const { mode, title, explain, typeFormItems, selectFormItems, isPublic } =
    useSelector(
      (state: RootState) => ({
        mode: state.admin.mode,
        title: state.admin.title,
        explain: state.admin.explain,
        typeFormItems: state.admin.typeFormItems,
        selectFormItems: state.admin.selectFormItems,
        isPublic: state.admin.isPublic,
      }),
      shallowEqual,
    );

  const setWeightedScoreBoard = (items) => <WeightedScoreBoard items={items} />;

  const router = useRouter();

  const requestRegister = async (data) => {
    const res = await fetcher('post', `/personality`, { data });
    if (res.success) {
      alert('성향 테스트가 등록 되었습니다');
      router.push('/');
    } else {
      if (res.status === 401) {
        alert('로그인 유효시간이 만료 되었습니다 \n다시 로그인해 주세요');
        router.push('/login?redirect=admin');
      } else {
        alert('서버 점검중입니다.');
      }
    }
  };

  const requestUpdate = async (data) => {
    const id = router.query.id;
    const res = await fetcher('put', `/personality/detail-personality/${id}`, {
      data,
    });
    if (res.success) {
      alert('해당 테스트가 업데이트 되었습니다');
      router.push('/mypage');
    } else {
      if (res.status === 401) {
        alert('로그인 유효시간이 만료 되었습니다 \n다시 로그인해 주세요');
        router.push('/login?redirect=mypage');
      } else {
        alert('서버 점검중입니다.');
      }
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const isPublic =
      (event.target as HTMLFormElement).contact.value === 'public'
        ? true
        : false;

    const data = {
      basicInformationItem: { title: title, explain: explain },
      typeItems: typeFormItems,
      selectItems: selectFormItems,
      isPublic: isPublic,
    };

    if (mode === 'create') {
      requestRegister(data);
    } else {
      requestUpdate(data);
    }
  };

  return (
    <Form id={FINAL_CONFIRMATION_FORM_ID} onSubmit={onSubmit}>
      <BoxShadowCard subtitle="기본 정보 입력">
        <SubTextBoxSection>
          <SubHeadlineLabel label="제 목" subTitleLocation="start" />
          <TextBox text={title} />
        </SubTextBoxSection>

        <SubTextBoxSection>
          <SubHeadlineLabel label="설 명" subTitleLocation="start" />
          <TextBox text={explain} />
        </SubTextBoxSection>
      </BoxShadowCard>

      <BoxShadowCard subtitle="유형 설정">
        {typeFormItems.map(({ typeContent, explanationContent }, index) => (
          <React.Fragment key={`t${index}`}>
            <TextBoxSection title={`${index + 1}번`} titleLocation="center">
              <SubTextBoxSection>
                <SubHeadlineLabel label="유 형" subTitleLocation="start" />
                <TextBox text={typeContent} />
              </SubTextBoxSection>
              <SubTextBoxSection>
                <SubHeadlineLabel label="설 명" subTitleLocation="start" />
                <TextBox text={explanationContent} />
              </SubTextBoxSection>
            </TextBoxSection>
          </React.Fragment>
        ))}
      </BoxShadowCard>

      <BoxShadowCard subtitle="선택지 설정">
        {selectFormItems.map(({ question, optionItems }, index) => (
          <React.Fragment key={`s${index}`}>
            <TextBoxSection title={`${index + 1}번`} titleLocation="center">
              <SubTextBoxSection>
                <SubHeadlineLabel label="질 문" subTitleLocation="start" />
                <TextBox text={question} />
              </SubTextBoxSection>

              {optionItems.map(({ option, weightedScoreItems }, index) => (
                <SubTextBoxSection key={`o${index}`}>
                  <SubHeadlineLabel
                    label={`${index + 1}번`}
                    subTitleLocation="start"
                  />
                  <TextBox text={option} />
                  <WeightedScoreBoardSection>
                    <SubHeadlineLabel
                      label="가중치 점수"
                      subTitleLocation="center"
                    />
                    {setWeightedScoreBoard(weightedScoreItems)}
                  </WeightedScoreBoardSection>
                </SubTextBoxSection>
              ))}
            </TextBoxSection>
          </React.Fragment>
        ))}
      </BoxShadowCard>

      <BoxShadowCard subtitle="공개 하시겠습니까?">
        <RadioGroup>
          <Radio name="contact" value="public" defaultChecked={isPublic}>
            공개
          </Radio>
          <Radio name="contact" value="private" defaultChecked={!isPublic}>
            비공개
          </Radio>
        </RadioGroup>
      </BoxShadowCard>
    </Form>
  );
};

export default FinalConfirmationForm;
