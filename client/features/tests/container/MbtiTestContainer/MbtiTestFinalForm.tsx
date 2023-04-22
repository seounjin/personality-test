import React from 'react';
import { FormEvent } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Radio from '../../../../components/Radio/Radio';
import RadioGroup from '../../../../components/RadioGroup/RadioGroup';
import RoundButton from '../../../../components/RoundButton/RoundButton';
import SubHeadlineLabel from '../../../../components/SubHeadlineLabel/SubHeadlineLabel';
import SubTextBoxSection from '../../../../components/SubTextBoxSection/SubTextBoxSection';
import TextBox from '../../../../components/TextBox/TextBox';
import BoxShadowCard from '../../../../layout/BoxShadowCard/BoxShadowCard';
import FormLayout from '../../../../layout/FormLayout/FormLayout';
import { RootState } from '../../../../store/modules';
import PrivewImage from '../../../../components/PrivewImage/PrivewImage';
import TemporaryTestWrapper from '../../components/TemporaryTestWrapper/TemporaryTestWrapper';
import WeightedScoreBoard from '../../components/WeightedScoreBoard/WeightedScoreBoard';
import useFinalConfirmationForm from '../../hooks/useFinalConfirmationForm';
import useStorage from '../../hooks/useStorage';
import { MBTI_TEST_TYPE_CONTENT } from '../../tests.const';
import {
  base64ToFile,
  objectToFormData,
  setWeightedScoreDictionary,
} from '../../tests.util';
import TextBoxSection from '../TextBoxSection/TextBoxSection';
import WeightedScoreBoardSection from '../WeightedScoreBoardSection/WeightedScoreBoardSection';
import { MBTI_TEST_FINAL_FORM_ID } from './mbtiTest.const';
import MbtiTestType from './MbtiTestType';

const MbtiTestFinalForm = () => {
  const {
    mode,
    title,
    subTitle,
    explain,
    mbtiTestResultFormItems,
    mbtiTestSelectFormItems,
    isPublic,
    thumbnailImgUrl,
    thumbnailImageBase64Data,
    imageBase64DataArray,
  } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,

      title: state.basicForm.title,
      subTitle: state.basicForm.subTitle,
      explain: state.basicForm.explain,
      thumbnailImgUrl: state.basicForm.thumbnailImgUrl,
      thumbnailImageBase64Data: state.basicForm.thumbnailImageBase64Data,

      isPublic: state.mbtiTest.isPublic,
      mbtiTestResultFormItems: state.mbtiTest.mbtiTestResultFormItems,
      mbtiTestSelectFormItems: state.mbtiTest.mbtiTestSelectFormItems,
      imageBase64DataArray: state.mbtiTest.imageBase64DataArray,
    }),
    shallowEqual,
  );

  const {
    requestRegister,
    requestUpdate,
    handleCloseTemporaryTest,
    isTemporaryTestOpen,
  } = useFinalConfirmationForm();

  const setWeightedScoreBoard = (items) => <WeightedScoreBoard items={items} />;

  const { removeTestItems } = useStorage();

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    removeTestItems();

    const formData = new FormData();

    if (thumbnailImageBase64Data) {
      const thumbnailImageFile = await base64ToFile(
        thumbnailImageBase64Data,
        `thumbnail_0`,
      );
      formData.append(`image`, thumbnailImageFile);
    }

    await Promise.all(
      imageBase64DataArray.map(async (imageData, index) => {
        if (!imageData) return null;
        const imageFile = await base64ToFile(imageData, `result_${index}`);
        formData.append(`image`, imageFile);
      }),
    );

    const data = {
      basicInformationItem: {
        title: title,
        subTitle: subTitle,
        explain: explain,
        thumbnailImgUrl: thumbnailImgUrl,
      },
      mbtiResultItems: mbtiTestResultFormItems,
      mbtiSelectItems: mbtiTestSelectFormItems,
      isPublic: (event.target as HTMLFormElement).contact.value === 'public',
      testType: 'mbti',
    };

    objectToFormData(data, formData);

    if (mode === 'create') {
      requestRegister(formData);
    } else {
      requestUpdate(formData);
    }
  };

  return (
    <FormLayout id={MBTI_TEST_FINAL_FORM_ID} onSubmit={onSubmit}>
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
        {mbtiTestResultFormItems.map(
          (
            { mbtiType, resultContent, explanationContent, resultImageUrl },
            index,
          ) => (
            <React.Fragment key={`t${index}`}>
              <TextBoxSection title={`${index + 1}번`} titleLocation="center">
                <SubTextBoxSection>
                  <PrivewImage imgUrl={resultImageUrl} />
                </SubTextBoxSection>
                <SubTextBoxSection>
                  <SubHeadlineLabel
                    label="Mbti 유형"
                    subTitleLocation="start"
                  />
                  <TextBox text={mbtiType} />
                </SubTextBoxSection>
                <SubTextBoxSection>
                  <SubHeadlineLabel label="결 과" subTitleLocation="start" />
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
        {mbtiTestSelectFormItems.map(({ question, optionItems }, index) => (
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

      <BoxShadowCard subtitle="테스트 미리보기">
        <RoundButton
          onClick={handleCloseTemporaryTest}
          text={'미리보기'}
          ariaLabel={'테스트 미리보기 버튼'}
        />
        {isTemporaryTestOpen && (
          <TemporaryTestWrapper onClose={handleCloseTemporaryTest}>
            <MbtiTestType
              testDisposition="temporary"
              testItems={{
                title,
                subTitle,
                explain,
                testType: 'mbti',
                isPublic: false,
                personalityItems: mbtiTestSelectFormItems,
                weightedScoreDictionary: setWeightedScoreDictionary(
                  MBTI_TEST_TYPE_CONTENT,
                ),
              }}
              mbtiResultItems={mbtiTestResultFormItems}
              handleCloseTemporaryTest={handleCloseTemporaryTest}
            />
          </TemporaryTestWrapper>
        )}
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

export default MbtiTestFinalForm;
