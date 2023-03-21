import React from 'react';
import { FormEvent } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Radio from '../../../../components/Radio/Radio';
import RadioGroup from '../../../../components/RadioGroup/RadioGroup';
import SubHeadlineLabel from '../../../../components/SubHeadlineLabel/SubHeadlineLabel';
import SubTextBoxSection from '../../../../components/SubTextBoxSection/SubTextBoxSection';
import TextBox from '../../../../components/TextBox/TextBox';
import BoxShadowCard from '../../../../layout/BoxShadowCard/BoxShadowCard';
import FormLayout from '../../../../layout/FormLayout/FormLayout';
import { RootState } from '../../../../store/modules';
import PrivewImage from '../../components/PrivewImage/PrivewImage';
import WeightedScoreBoard from '../../components/WeightedScoreBoard/WeightedScoreBoard';
import useFinalConfirmationForm from '../../hooks/useFinalConfirmationForm';
import useStorage from '../../hooks/useStorage';
import TextBoxSection from '../TextBoxSection/TextBoxSection';
import WeightedScoreBoardSection from '../WeightedScoreBoardSection/WeightedScoreBoardSection';
import { SCORE_TEST_FINAL_FORM_ID } from './scoreTestType.const';

const ScoreTestFinalForm = () => {
  const {
    mode,
    title,
    subTitle,
    explain,
    scoreTestResultFormItems,
    scoreTestSelectFormItems,
    isPublic,
    thumbnailImgUrl,
    imageData,
    isChangeImage,
  } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,

      title: state.basicForm.title,
      subTitle: state.basicForm.subTitle,
      explain: state.basicForm.explain,
      thumbnailImgUrl: state.basicForm.thumbnailImgUrl,
      imageData: state.basicForm.imageData,
      isChangeImage: state.basicForm.isChangeImage,

      isPublic: state.scoreTest.isPublic,
      scoreTestResultFormItems: state.scoreTest.scoreTestResultFormItems,
      scoreTestSelectFormItems: state.scoreTest.scoreTestSelectFormItems,
    }),
    shallowEqual,
  );

  const { requestRegister, requestUpdate } = useFinalConfirmationForm();

  const setWeightedScoreBoard = (items) => <WeightedScoreBoard items={items} />;

  const { removeTestItems } = useStorage();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    removeTestItems();
    const isPublic =
      (event.target as HTMLFormElement).contact.value === 'public'
        ? true
        : false;

    const data = {
      basicInformationItem: {
        title: title,
        subTitle: subTitle,
        explain: explain,
        imageData: isChangeImage ? JSON.stringify({ imageData }) : '',
      },
      resultItems: scoreTestResultFormItems,
      selectItems: scoreTestSelectFormItems,
      isPublic: isPublic,
      testType: 'score',
      isChangeImage: isChangeImage,
      thumbnailImgUrl: thumbnailImgUrl,
    };

    console.log('스코어 데이터', data);
    if (mode === 'create') {
      requestRegister(data);
    } else {
      requestUpdate(data);
    }
  };

  return (
    <FormLayout id={SCORE_TEST_FINAL_FORM_ID} onSubmit={onSubmit}>
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

      <BoxShadowCard subtitle="썸네일">
        <PrivewImage imgUrl={thumbnailImgUrl} />
      </BoxShadowCard>

      <BoxShadowCard subtitle="유형 설정">
        {scoreTestResultFormItems.map(
          ({ resultContent, explanationContent }, index) => (
            <React.Fragment key={`t${index}`}>
              <TextBoxSection title={`${index + 1}번`} titleLocation="center">
                <SubTextBoxSection>
                  <SubHeadlineLabel label="유 형" subTitleLocation="start" />
                  <TextBox text={resultContent} />
                </SubTextBoxSection>
                <SubTextBoxSection>
                  <SubHeadlineLabel label="설 명" subTitleLocation="start" />
                  <TextBox text={explanationContent} />
                </SubTextBoxSection>
              </TextBoxSection>
            </React.Fragment>
          ),
        )}
      </BoxShadowCard>

      <BoxShadowCard subtitle="선택지 설정">
        {scoreTestSelectFormItems.map(({ question, optionItems }, index) => (
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
    </FormLayout>
  );
};

export default ScoreTestFinalForm;
