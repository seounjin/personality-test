import {
  TypeDictionary,
  TypeFormItems,
} from '../features/admin/components/TypeForm/TypeForm.type';
import { SelectFormItems } from '../features/admin/container/SetSelectFormItems/SetSelectFormItems.type';

export interface AdminInitialState {
  title: string;
  explain: string;
  typeFormItems: TypeFormItems[];
  typeDictionary: TypeDictionary;
  selectFormItems: SelectFormItems[];
}
