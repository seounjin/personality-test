import { InputForm } from '../components/InputForm/InputForm.type';
import { SelectItems } from '../features/admin/container/SelectCard/SelectCard.type';
import {
  TypeItems,
  TypeDictionary,
} from '../features/admin/components/TypeForm/TypeForm.type';

export interface AdminInitialState {
  userItem: InputForm[];
  titleItems: InputForm[];
  selectItems: SelectItems[];
  imgUrl?: string;
  typeItems: TypeItems[];
  typeList: Array<string>;
  typeDictionary: TypeDictionary;
}
