import { ResultFormItem, SelectFormItems } from '../../tests.types';
import { RadioButtonItems } from '../TextRadioButtonGroup/TextRadioButtonGroup.type';

export interface MbtiTestSliceInitialState {
  isPublic: boolean;
  mbtiTestResultFormItems: MbtiTestResultFormItems[];
  mbtiTestSelectFormItems: MbtiTestSelectFormItems[];
}

export interface MbtiTestResultFormItems extends ResultFormItem {
  mbtiType: string;
}

export interface MbtiTestSelectFormItems extends SelectFormItems {
  radioButtonItems: RadioButtonItems[];
  radioButtonIndex: string;
}

export type MbtiTestSelectFormItemsType = {
  mbtiTestSelectFormItems: MbtiTestSelectFormItems[];
};
