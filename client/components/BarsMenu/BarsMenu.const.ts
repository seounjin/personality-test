export const LOGOUT_MENU = [
  {
    id: 's1',
    key: 1,
    type: 'button',
    text: '성향테스트',
    asPath: '/',
    subMenu: [],
  },
  {
    id: 's2',
    key: 2,
    type: 'button',
    text: '성향테스트 만들기',
    asPath: '/signup',
    subMenu: [],
  },
  {
    id: 's3',
    key: 3,
    type: 'button',
    text: '로그인',
    asPath: '/login',
    subMenu: [],
  },
];

export const LOGIN_MENU = [
  {
    id: 's1',
    key: 1,
    text: '마이페이지',
    type: 'title',
    asPath: '',
    subMenu: [
      {
        id: 's2',
        key: 2,
        type: 'button',
        text: '내가 만든 테스트',
        asPath: '/mypage?menu=my-personality',
      },
      {
        id: 's3',
        key: 3,
        type: 'button',
        text: '회원탈퇴',
        asPath: '/mypage?menu=signout',
      },
    ],
  },
  {
    id: 's4',
    key: 4,
    type: 'button',
    text: '성향테스트',
    asPath: '/',
    subMenu: [],
  },
  {
    id: 's5',
    key: 5,
    type: 'button',
    text: '성향테스트 만들기',
    asPath: '/tests',
    subMenu: [],
  },
  {
    id: 's6',
    key: 6,
    type: 'button',
    text: '로그아웃',
    asPath: '/logout',
    subMenu: [],
  },
];
