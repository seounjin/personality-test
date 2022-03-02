export interface lastScreenProps {
  LastScreenData: lastScreenData;
  handleReStartClick: () => void;
}

export interface windowEngprops {
  expression: expression;
  name: string;
  character: string;
}

export interface windowCharacterProps {
  description: string[];
}

export interface windowFriendProps {
  beFriend: string;
  beEnemy: string;
  chemi: chemi;
}

interface chemi {
  best: string;
  worst: string;
}

interface expression {
  en: string;
  ko: string;
}

interface lastScreenData {
  title: string;
  media: string;
  name: string;
  description: string[];
  expression: expression;
  key: string;
  beEnemy: string;
  beFriend: string;
  chemi: chemi;
}
