import {
  TypeDictionary,
  TypeFormItems,
} from '../features/tests/components/TypeForm/TypeForm.type';
import { SelectFormItems } from '../features/tests/container/SetSelectFormItems/SetSelectFormItems.type';

export interface TestsInitialState {
  title: string;
  subTitle: string;
  explain: string;
  typeFormItems: TypeFormItems[];
  mbtiTypeFormItems: TypeFormItems[];
  typeItemsCount: number;
  typeDictionary: TypeDictionary;
  selectFormItems: SelectFormItems[];
  numberOfItemsCount: number;
  mode: string;
  isPublic: boolean;
  testType: string;
  isSelectedTest: boolean;
  mbtiSelectFormItems: any;
  thumbnailImgUrl: string;
  imageData: string;
  isChangeImage: boolean;
  isOpenCancleButton: boolean;
}
