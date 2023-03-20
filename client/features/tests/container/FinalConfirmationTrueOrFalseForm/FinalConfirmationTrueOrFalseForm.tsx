import React, { FormEvent } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import { FINAL_CONFIRMATION_FORM_ID } from '../../tests.const';
import SubHeadlineLabel from '../../../../components/SubHeadlineLabel/SubHeadlineLabel';
import TextBox from '../../../../components/TextBox/TextBox';
import BoxShadowCard from '../../../../layout/BoxShadowCard/BoxShadowCard';
import SubTextBoxSection from '../../../../components/SubTextBoxSection/SubTextBoxSection';
import TextBoxSection from '../TextBoxSection/TextBoxSection';
import Radio from '../../../../components/Radio/Radio';
import RadioGroup from '../../../../components/RadioGroup/RadioGroup';
import { Form } from '../BasicInformationForm/BasicInformationForm.style';
import useFinalConfirmationForm from '../../hooks/useFinalConfirmationForm';
import useStorage from '../../hooks/useStorage';
import PrivewImage from '../../components/PrivewImage/PrivewImage';
import SelectedOptionsTable from '../../components/SelectedOptionsTable/SelectedOptionsTable';

const FinalConfirmationTrueOrFalseForm = () => {
  const {
    mode,
    title,
    subTitle,
    explain,
    trueOrFalseSelectFormItems,
    trueOrFalseResultFormItems,
    isPublic,
    imageData,
    thumbnailImgUrl,
    isChangeImage,
  } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
      title: state.tests.title,
      subTitle: state.tests.subTitle,
      explain: state.tests.explain,
      trueOrFalseSelectFormItems: state.tests.trueOrFalseSelectFormItems,
      trueOrFalseResultFormItems: state.tests.trueOrFalseResultFormItems,
      isPublic: state.tests.isPublic,
      thumbnailImgUrl: state.tests.thumbnailImgUrl,
      imageData: state.tests.imageData,
      isChangeImage: state.tests.isChangeImage,
    }),
    shallowEqual,
  );

  const { requestRegister, requestUpdate } = useFinalConfirmationForm();

  const { removeTestItems } = useStorage();

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
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
      trueOrFalseSelectFormItems: trueOrFalseSelectFormItems,
      trueOrFalseResultFormItems: trueOrFalseResultFormItems,

      isPublic: isPublic,
      testType: 'trueOrFalse',
      isChangeImage: isChangeImage,
      thumbnailImgUrl: thumbnailImgUrl,
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
        {trueOrFalseSelectFormItems.map(({ question, optionItems }, index) => (
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
        ))}
      </BoxShadowCard>

      <BoxShadowCard subtitle="결과 설정">
        {trueOrFalseResultFormItems.map(
          ({ typeContent, explanationContent, selectedOption }, index) => (
            <React.Fragment key={`t${index}`}>
              <SelectedOptionsTable selectedOption={selectedOption} />
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
          ),
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
    </Form>
  );
};

export default FinalConfirmationTrueOrFalseForm;
