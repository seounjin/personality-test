export const BASIC_INFORMATION_FORM = 0;
export const FINAL_CONFIRMATION = 3;

export const BASIC_INFORMATION_FORM_ID = 'basicInformationForm';

export const IMAGE_HOLDER_PATH = '/images/imageholder.png';

export const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const TEST_TYPE_DATA = [
  {
    id: 't1',
    imgSrc: '/images/test_type_1.png',
    title: '점수 유형',
    text: '점수 유형은 각각의 선택지에 가중치를 부여하여 선택시 최대점수가 결과로나오는 유형이에요',
    testType: 'score',
  },
  {
    id: 't2',
    imgSrc: '/images/test_type_2.png',
    title: 'MTBI 유형',
    text: '점수 유형은 각각의 선택지에 가중치를 부여하여 선택시 최대점수가 결과로나오는 유형이에요',
    testType: 'mbti',
  },
  {
    id: 't3',
    imgSrc: '/images/test_type_3.png',
    title: 'O X 유형',
    text: '점수 유형은 각각의 선택지에 가중치를 부여하여 선택시 최대점수가 결과로나오는 유형이에요',
    testType: 'true-or-false',
  },
];

export const STEP_INDICATOR_LABEL = {
  score: ['기본정보 입력', '유형 설정', '선택지 설정', '최종 확인'],
  mbti: ['기본정보 입력', '유형 설정', '선택지 설정', '최종 확인'],
  'true-or-false': ['기본정보 입력', '선택지 설정', '결과지 설정', '최종 확인'],
};

export const MANUAL_DATA = [
  {
    title: '기본정보 입력',
    content: `기본정보를 입력하는 단계에요\n만들려는 성향테스트 제목과 설명을 작성해주세요`,
  },
  {
    title: '유형 설정',
    content: `유형을 설정하는 단계에요\n결과지를 작성하는 곳이라고 보면 되요\n다양한 유형과 해당 유형에 대한 설명을 작성해주세요`,
  },
  {
    title: '선택지 설정',
    content: `선택지를 작성하는 단계에요\n여러가지 질문과 해당 질문에 대한 선택지를 작성할 수 있어요\n선택지마다 특정 유형의 가중치를 설정할 수 있어요\n유형들의 가중치 합산이 동점인 경우 랜덤으로 결과가 나오는 것을 유의하시고 작성해주세요`,
  },
  {
    title: '최종 확인',
    content:
      '최종 확인 단계에요\n생성하려는 테스트의 공개와 비공개를 설정할 수 있어요\n충분히 검토하여 제출해주세요',
  },
];

export const PARSE_TAG_TEXT = {
  score: '점수',
  mbti: 'mbti',
  'true-or-false': 'O X',
};
