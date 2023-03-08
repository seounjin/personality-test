import React, { FormEvent } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import { FINAL_CONFIRMATION_FORM_ID } from '../../tests.const';
import SubHeadlineLabel from '../../../../components/SubHeadlineLabel/SubHeadlineLabel';
import TextBox from '../../../../components/TextBox/TextBox';
import WeightedScoreBoard from '../../components/WeightedScoreBoard/WeightedScoreBoard';
import BoxShadowCard from '../../../../layout/BoxShadowCard/BoxShadowCard';
import SubTextBoxSection from '../../../../components/SubTextBoxSection/SubTextBoxSection';
import TextBoxSection from '../TextBoxSection/TextBoxSection';
import WeightedScoreBoardSection from '../WeightedScoreBoardSection/WeightedScoreBoardSection';
import Radio from '../../../../components/Radio/Radio';
import RadioGroup from '../../../../components/RadioGroup/RadioGroup';
import { Form } from '../BasicInformationForm/BasicInformationForm.style';
import useFinalConfirmationForm from '../../hooks/useFinalConfirmationForm';

const FinalConfirmationMbtiForm = () => {
  const {
    testType,
    mode,
    title,
    subTitle,
    explain,
    mbtiTypeFormItems,
    mbtiSelectFormItems,
    isPublic,
  } = useSelector(
    (state: RootState) => ({
      testType: state.tests.testType,
      mode: state.tests.mode,
      title: state.tests.title,
      subTitle: state.tests.subTitle,
      explain: state.tests.explain,
      mbtiTypeFormItems: state.tests.mbtiTypeFormItems,
      mbtiSelectFormItems: state.tests.mbtiSelectFormItems,
      isPublic: state.tests.isPublic,
    }),
    shallowEqual,
  );

  const { requestRegister, requestUpdate } = useFinalConfirmationForm();

  const setWeightedScoreBoard = (items) => <WeightedScoreBoard items={items} />;

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const isPublic =
      (event.target as HTMLFormElement).contact.value === 'public'
        ? true
        : false;

    const data = {
      basicInformationItem: {
        title: title,
        subTitle: subTitle,
        explain: explain,
      },
      mbtiTypeItems: mbtiTypeFormItems,
      mbtiSelectItems: mbtiSelectFormItems,
      isPublic: isPublic,
      testType: testType,
    };

    if (mode === 'create') {
      requestRegister(data, testType);
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
          <SubHeadlineLabel label="부제목" subTitleLocation="start" />
          <TextBox text={subTitle} />
        </SubTextBoxSection>

        <SubTextBoxSection>
          <SubHeadlineLabel label="설 명" subTitleLocation="start" />
          <TextBox text={explain} />
        </SubTextBoxSection>
      </BoxShadowCard>

      <BoxShadowCard subtitle="유형 설정">
        {mbtiTypeFormItems.map(({ typeContent, explanationContent }, index) => (
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
        {mbtiSelectFormItems.map(({ question, optionItems }, index) => (
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

export default FinalConfirmationMbtiForm;
