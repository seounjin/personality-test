import { useState } from 'react';
import { useScoreTestSteps } from '../container/ScoreTestContainer/scoreTest.hook';
import { useMbtiTestSteps } from '../container/MbtiTestContainer/mbtiTest.hook';
import { useTrueOrFalseTestSteps } from '../container/TrueOrFalseTestContainer/trueOrFalse.hook';
import { useBasicInformationFormStep } from '../container/BasicInformationForm/BasicInformationForm.hook';

export const useSteps = ({ testType = 'score' }: { testType: string }) => {
  const basicInformationFormStep = useBasicInformationFormStep();
  const scoreTestSteps = useScoreTestSteps();
  const mbtiTestSteps = useMbtiTestSteps();
  const trueOrFalseTestSteps = useTrueOrFalseTestSteps();

  const [steps] = useState({
    score: [...basicInformationFormStep, ...scoreTestSteps],

    mbti: [...basicInformationFormStep, ...mbtiTestSteps],

    'true-or-false': [...basicInformationFormStep, ...trueOrFalseTestSteps],
  });

  return { steps: steps[testType] };
};
