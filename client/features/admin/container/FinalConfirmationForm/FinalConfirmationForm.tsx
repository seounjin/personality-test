import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import { FINAL_CONFIRMATION_FORM_ID } from '../../admin.const';
import SubHeadlineLabel from '../../components/SubHeadlineLabel/SubHeadlineLabel';
import TextBox from '../../components/TextBox/TextBox';
import WeightedScoreBoard from '../../components/WeightedScoreBoard/WeightedScoreBoard';
import BoxShadowCard from '../BoxShadowCard/BoxShadowCard';
import SubTextBoxSection from '../SubTextBoxSection/SubTextBoxSection';
import TextBoxSection from '../TextBoxSection/TextBoxSection';
import WeightedScoreBoardSection from '../WeightedScoreBoardSection/WeightedScoreBoardSection';
import { Form } from './FinalConfirmationForm.style';

const FinalConfirmationForm = () => {
  const { title, explain, typeFormItems, selectFormItems } = useSelector(
    (state: RootState) => ({
      title: state.admin.title,
      explain: state.admin.explain,
      typeFormItems: state.admin.typeFormItems,
      selectFormItems: state.admin.selectFormItems,
    }),
    shallowEqual,
  );

  const setWeightedScoreBoard = (items) => <WeightedScoreBoard items={items} />;

  const onSubmit = () => {
    console.log('제출');
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
    </Form>
  );
};

export default FinalConfirmationForm;
