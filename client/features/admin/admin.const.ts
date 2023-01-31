export const BASIC_INFORMATION_FORM = 0;
export const SET_TYPE_ITEMS_STEP = 1;
export const SET_SELECT_ITEMS_STEP = 2;
export const FINAL_CONFIRMATION = 3;

export const STEP_TITLE = [
  '기본정보 입력',
  '유형 설정',
  '선택지 설정',
  '최종 확인',
];

export const MIN_NUMBER_OF_ITEMS_COUNT = 1;
export const MAX_NUMBER_OF_ITEMS_COUNT = 12;

export const MIN_TYPE_ITEMS_COUNT = 2;
export const MAX_TYPE_ITEMS_COUNT = 8;

export const MIN_OPTION_ITEMS_COUNT = 2;
export const MAX_OPTION_ITEMS_COUNT = 4;

export const FINAL_CONFIRMATION_FORM_ID = 'finalConfirmationForm';

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
      '최종 확인 단계에요\n아직 수정 및 삭제가 불가 하니 충분히 검토하여 제출해주세요',
  },
];
