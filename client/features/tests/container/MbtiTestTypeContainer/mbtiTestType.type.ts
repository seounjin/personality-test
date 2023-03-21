import { ResultFormItem, SelectFormItems } from '../../tests.types';
import { RadioButtonItems } from '../TextRadioButtonGroup/TextRadioButtonGroup.type';

export interface MbtiTestSliceInitialState {
  isPublic: boolean;
  mbtiTestResultFormItems: mbtiTestResultFormItems[];
  mbtiTestSelectFormItems: MbtiTestSelectFormItems[];
}

export type mbtiTestResultFormItems = ResultFormItem;

export interface MbtiTestSelectFormItems extends SelectFormItems {
  radioButtonItems: RadioButtonItems[];
  radioButtonIndex: string;
}

export type MbtiTestSelectFormItemsType = {
  mbtiTestSelectFormItems: MbtiTestSelectFormItems[];
};
