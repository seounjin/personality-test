import React, { useCallback } from 'react';
import { ButtonWrapper, Container } from './ResultCard.style';
import ResultForm from '../../components/ResultForm/ResultForm';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setResultContent } from '../../../../store/modules/admin';
import { RootState } from '../../../../store/modules';
import { Button } from '../../../../components/TwoButton/TwoButton.style';

const MResultForm = React.memo(ResultForm);

interface ResultCardProps {
  onSubmit: () => Promise<void>;
}

const ResultCard = ({ onSubmit }: ResultCardProps): JSX.Element => {
  const dispatch = useDispatch();
  const { resultItems, resultContents } = useSelector(
    (state: RootState) => ({
      resultItems: state.admin.resultItems,
      resultContents: state.admin.resultContents,
    }),
    shallowEqual,
  );

  const handleTextArea = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const {
        value,
        name,
        dataset: { index },
      } = event.target;

      dispatch(setResultContent({ name, value, index }));
    },
    [],
  );

  return (
    <Container>
      {resultItems.map((items, index) => {
        return (
          <MResultForm
            key={`r${index}`}
            items={items}
            index={index}
            content={resultContents[index]}
            onChange={handleTextArea}
          />
        );
      })}

      <ButtonWrapper>
        <Button onClick={onSubmit}>등록</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default ResultCard;
