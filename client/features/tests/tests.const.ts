export const BASIC_INFORMATION_FORM_ID = 'basicInformationForm';

export const IMAGE_HOLDER_PATH = '/images/imageholder.png';

export const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const PARSE_TAG_TEXT = {
  score: '점수',
  mbti: 'mbti',
  'true-or-false': 'O X',
};

export const TEST_TYPE_DATA = [
  {
    id: 't1',
    imgSrc: '/images/test_type_1.png',
    title: '점수 유형',
    text: `

    점수 유형은 각각의 선택지에 가중치를 부여하여 선택시 최대점수가 결과로 나오는 유형이에요.
    
    A가중치가 1인 선택지와 B가중치가 1인 선택지가 있다고 가정해볼께요. 

    첫 번째 선택지를 선택할 경우 최종합산이 A가 1 B 0이므로 결과는 A가 나오게 됩니다.
    `,
    testType: 'score',
  },
  {
    id: 't2',
    imgSrc: '/images/test_type_2.png',
    title: 'MTBI 유형',
    text: `

    MBTI 유형은 16가지의 성향이 있어요. 

    E와 I, S와 N, T와 F, J와 P를 결정하는 3문답식 총 12질문에 대한 답변 기반으로 성향을 결정해요.
    
    각 질문에 대한 답변마다 성향을 결정할 수 있는 가중치를 정할 수 있어요.
    
    예를 들어, E와 I를 판별하는 3문답 중 E에 해당하는 답변을 2개 선택 하였다면 E000 결과가 나와요.
    
    각각의 척도 결과가 E, S, N, F로 나오면, 최종 결과는 ESNF가 됩니다. 
    
    이에 해당하는 결과와 설명은 자유롭게 작성하시면 되요.`,

    testType: 'mbti',
  },
  {
    id: 't3',
    imgSrc: '/images/test_type_3.png',
    title: 'O X 유형',
    text: `

    O X 유형은 여러 질문이 있으며 각 질문에는 2가지의 선택지가 있어요. 

    질문의 수에 따른 결과의 갯수가 결정 되요. 
    
    1개의 질문일 경우 2개, 2개일 경우 4가지 결과가 나오게 되요.
    
    예를 들어, 질문이 2개라면 결과 A(1번 질문에 대한 1번 선택, 2번 질문에 대한 1번 선택)가 나와요. 
    
    각각의 결과는 자유롭게 작성해주세요.
    `,

    testType: 'true-or-false',
  },
];

export const STEP_INDICATOR_LABEL = {
  score: ['기본정보 입력', '유형 설정', '선택지 설정', '최종 확인'],
  mbti: ['기본정보 입력', '유형 설정', '선택지 설정', '최종 확인'],
  'true-or-false': ['기본정보 입력', '선택지 설정', '결과지 설정', '최종 확인'],
};

export const MODAL_MANUAL_ITEMS = {
  score: {
    firstStep: 0,
    lastStep: 3,
    data: [
      {
        title: '기본정보 입력',
        content: `기본정보를 입력하는 단계에요.\n만들려는 성향테스트 제목과 설명을 작성해주세요.`,
      },
      {
        title: '유형 설정',
        content: `유형을 설정하는 단계에요.\n결과지를 작성하는 곳이라고 보면 되요.\n다양한 유형과 해당 유형에 대한 설명을 작성해주세요.`,
      },
      {
        title: '선택지 설정',
        content: `선택지를 작성하는 단계에요.
        여러가지 질문과 해당 질문에 대한 선택지를 작성할 수 있어요.
        선택지마다 특정 유형의 가중치를 설정할 수 있어요.
        유형들의 가중치 합산이 동점인 경우 랜덤으로 결과가 나오는 것을 유의하시고 작성해주세요.`,
      },
      {
        title: '최종 확인',
        content:
          '최종 확인 단계에요.\n생성하려는 테스트의 공개와 비공개를 설정할 수 있어요.\n충분히 검토하여 제출해주세요.',
      },
    ],
  },

  mbti: {
    firstStep: 0,
    lastStep: 3,
    data: [
      {
        title: '기본정보 입력',
        content: `기본정보를 입력하는 단계에요.\n만들려는 성향테스트 제목과 설명을 작성해주세요.`,
      },
      {
        title: '유형 설정',
        content: `유형을 설정하는 단계에요.\n결과지를 작성하는 곳이라고 보면 되요.\n16가지 mbti 유형과 해당 유형에 대한 설명을 작성해주세요.`,
      },
      {
        title: '선택지 설정',
        content: `선택지를 작성하는 단계에요.
        여러가지 질문과 해당 질문에 대한 선택지를 작성할 수 있어요.
        선택지마다 특정 유형의 가중치를 설정할 수 있어요.
        E와 I, S와 N, T와 F, J와 P를 결정하는 3문답식 총 12질문에 대한 답변 기반으로 성향을 결정해요.
        각 질문에 대한 답변마다 성향을 결정할 수 있는 가중치를 정할 수 있어요.
        예를 들어, E와 I를 판별하는 3문답 중 E에 해당하는 답변을 2개 선택 하였다면 E000 결과가 나와요.
        각각의 척도 결과가 E, S, N, F로 나오면, 최종 결과는 ESNF가 됩니다.
        이에 해당하는 결과의 설명은 자유롭게 작성하시면 되요.`,
      },
      {
        title: '최종 확인',
        content:
          '최종 확인 단계에요.\n생성하려는 테스트의 공개와 비공개를 설정할 수 있어요.\n충분히 검토하여 제출해주세요.',
      },
    ],
  },

  'true-or-false': {
    firstStep: 0,
    lastStep: 3,
    data: [
      {
        title: '기본정보 입력',
        content: `기본정보를 입력하는 단계에요\n만들려는 성향테스트 제목과 설명을 작성해주세요`,
      },
      {
        title: '선택지 설정',
        content: `선택지를 작성하는 단계에요.
        여러가지 질문과 해당 질문에 대한 선택지를 작성할 수 있어요.
        질문의 수에 따른 결과의 갯수가 결정 되요.
        예를 들어, 2개의 질문이 있다면 4가지 경우의 수가 있어요.
          -1. 1번 질문: 1번 선택, 2번 질문: 1번 선택
              - 결과: A
          -2. 1번 질문: 1번 선택, 2번 질문: 2번 선택
              - 결과: B
          -3. 1번 질문: 2번 선택, 2번 질문: 1번 선택
              - 결과: C
          -4. 1번 질문: 2번 선택, 2번 질문: 2번 선택
              - 결과: D
        위와 같이 총 4가지 경우의 수가 있으며, 각각에 대응하는 결과는 A, B, C, D일 수 있어요.
        이점을 고려해서 작성해 주세요.`,
      },
      {
        title: '결과지 설정',
        content: `유형을 설정하는 단계에요.\n결과지를 작성하는 곳이라고 보면 되요.\n다양한 유형과 해당 유형에 대한 설명을 작성해주세요.`,
      },
      {
        title: '최종 확인',
        content:
          '최종 확인 단계에요.\n생성하려는 테스트의 공개와 비공개를 설정할 수 있어요.\n충분히 검토하여 제출해주세요',
      },
    ],
  },
};

export const SCREEN_WIDTH = '475px';

export const MBTI_TEST_TYPE = [
  ['E', 'I'],
  ['N', 'S'],
  ['F', 'T'],
  ['P', 'J'],
];

export const MBTI_TEST_TYPE_CONTENT = [
  { resultContent: 'E' },
  { resultContent: 'I' },
  { resultContent: 'N' },
  { resultContent: 'S' },
  { resultContent: 'F' },
  { resultContent: 'T' },
  { resultContent: 'P' },
  { resultContent: 'J' },
];

export const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png'];

export const IMAGE_DOMAIN =
  'https://personality-test-images.s3.ap-northeast-2.amazonaws.com';
