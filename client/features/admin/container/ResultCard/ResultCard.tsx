import React, { useCallback } from 'react';
import { Container } from './ResultCard.style';
import ResultForm from '../../components/ResultForm/ResultForm';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setResultContent } from '../../../../store/modules/admin';
import { RootState } from '../../../../store/modules';

const MResultForm = React.memo(ResultForm);

const ResultCard = (): JSX.Element => {
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
    </Container>
  );
};

export default ResultCard;
