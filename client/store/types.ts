import {
  TypeDictionary,
  TypeFormItems,
} from '../features/tests/components/ResultWriter/ResultWriter.type';
import { MbtiSelectFormItems } from '../features/tests/container/SetMbtiSelectFormItems/SetMbtiSelectFormItems.type';
import { SelectFormItems } from '../features/tests/container/SetSelectFormItems/SetSelectFormItems.type';

export interface TestsInitialState {
  title: string;
  subTitle: string;
  explain: string;
  typeFormItems: TypeFormItems[];
  mbtiTypeFormItems: TypeFormItems[];
  typeItemsCount: number;
  typeDictionary: TypeDictionary;
  numberOfItemsCount: number;
  mode: string;
  isPublic: boolean;
  testType: string;
  isSelectedTest: boolean;
  thumbnailImgUrl: string;
  imageData: string;
  isChangeImage: boolean;
  isOpenCancleButton: boolean;
  selectFormItems: SelectFormItems[];
  mbtiSelectFormItems: MbtiSelectFormItems[];
  trueOrFalseSelectFormItems: any;
  trueOrFalseResultFormItems: any;
}
