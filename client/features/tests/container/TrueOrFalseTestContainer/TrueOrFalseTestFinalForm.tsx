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
import SelectedOptionsTable from '../../components/SelectedOptionsTable/SelectedOptionsTable';
import TemporaryTestWrapper from '../../components/TemporaryTestWrapper/TemporaryTestWrapper';
import useFinalConfirmationForm from '../../hooks/useFinalConfirmationForm';
import useStorage from '../../hooks/useStorage';
import TextBoxSection from '../TextBoxSection/TextBoxSection';
import { TF_FINAL_FORM_ID } from './trueOrFalse.const';
import TrueOrFalseTypeTest from './TrueOrFalseTypeTest';
import {
  appendBase64ImagesToFormData,
  objectToFormData,
} from '../../tests.util';

const TrueOrFalseTestFinalForm = () => {
  const {
    mode,
    title,
    subTitle,
    explain,
    isPublic,
    thumbnailImgUrl,
    thumbnailImageBase64Data,
    trueOrFalseTestSelectFormItems,
    trueOrFalseTestResultFormItems,
    imageBase64DataArray,
  } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,

      title: state.basicForm.title,
      subTitle: state.basicForm.subTitle,
      explain: state.basicForm.explain,
      thumbnailImgUrl: state.basicForm.thumbnailImgUrl,
      thumbnailImageBase64Data: state.basicForm.thumbnailImageBase64Data,

      isPublic: state.trueOrFalseTest.isPublic,
      trueOrFalseTestSelectFormItems:
        state.trueOrFalseTest.trueOrFalseTestSelectFormItems,
      trueOrFalseTestResultFormItems:
        state.trueOrFalseTest.trueOrFalseTestResultFormItems,
      imageBase64DataArray: state.trueOrFalseTest.imageBase64DataArray,
    }),
    shallowEqual,
  );

  const {
    requestRegister,
    requestUpdate,
    handleCloseTemporaryTest,
    isTemporaryTestOpen,
  } = useFinalConfirmationForm();

  const { removeTestItems } = useStorage();

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    removeTestItems();

    const formData = new FormData();

    const formDataWithImages = await appendBase64ImagesToFormData(
      formData,
      thumbnailImageBase64Data,
      imageBase64DataArray,
    );

    const data = {
      basicInformationItem: {
        title: title,
        subTitle: subTitle,
        explain: explain,
        thumbnailImgUrl: thumbnailImgUrl,
      },
      trueOrFalseTestSelectFormItems: trueOrFalseTestSelectFormItems,
      trueOrFalseTestResultFormItems: trueOrFalseTestResultFormItems,
      isPublic: (event.target as HTMLFormElement).contact.value === 'public',
      testType: 'true-or-false',
    };

    const formDataWithImagesAndData = objectToFormData(
      data,
      formDataWithImages,
    );

    if (mode === 'create') {
      requestRegister(formDataWithImagesAndData, 'true-or-false');
    } else {
      requestUpdate(formDataWithImagesAndData, 'true-or-false');
    }
  };

  return (
    <FormLayout id={TF_FINAL_FORM_ID} onSubmit={onSubmit}>
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

      <BoxShadowCard subtitle="선택지 설정">
        {trueOrFalseTestSelectFormItems.map(
          ({ question, optionItems }, index) => (
            <React.Fragment key={`s${index}`}>
              <TextBoxSection title={`${index + 1}번`} titleLocation="center">
                <SubTextBoxSection>
                  <SubHeadlineLabel label="질 문" subTitleLocation="start" />
                  <TextBox text={question} />
                </SubTextBoxSection>

                {optionItems.map(({ option }, index) => (
                  <SubTextBoxSection key={`o${index}`}>
                    <SubHeadlineLabel
                      label={`${index + 1}번`}
                      subTitleLocation="start"
                    />
                    <TextBox text={option} />
                  </SubTextBoxSection>
                ))}
              </TextBoxSection>
            </React.Fragment>
          ),
        )}
      </BoxShadowCard>

      <BoxShadowCard subtitle="결과 설정">
        {trueOrFalseTestResultFormItems.map(
          (
            {
              resultContent,
              explanationContent,
              selectedOption,
              resultImageUrl,
            },
            index,
          ) => (
            <React.Fragment key={`t${index}`}>
              <SelectedOptionsTable selectedOption={selectedOption} />
              <TextBoxSection title={`${index + 1}번`} titleLocation="center">
                <SubTextBoxSection>
                  <PrivewImage imgUrl={resultImageUrl} />
                </SubTextBoxSection>
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

      <BoxShadowCard subtitle="테스트 미리보기">
        <RoundButton
          onClick={handleCloseTemporaryTest}
          text={'미리보기'}
          ariaLabel={'테스트 미리보기 버튼'}
        />
        {isTemporaryTestOpen && (
          <TemporaryTestWrapper onClose={handleCloseTemporaryTest}>
            <TrueOrFalseTypeTest
              testDisposition="temporary"
              testItems={{
                title,
                subTitle,
                explain,
                testType: 'true-or-false',
                isPublic: false,
                personalityItems: trueOrFalseTestSelectFormItems,
              }}
              trueOrFalseResultItems={trueOrFalseTestResultFormItems}
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

export default TrueOrFalseTestFinalForm;
