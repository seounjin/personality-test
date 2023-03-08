import {
  TypeDictionary,
  TypeFormItems,
} from '../features/admin/components/TypeForm/TypeForm.type';
import { SelectFormItems } from '../features/admin/container/SetSelectFormItems/SetSelectFormItems.type';

export interface AdminInitialState {
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
}
