import { ResultFormItem, SelectFormItems } from '../../tests.types';
import { ScoreTestItems } from '../ScoreTestContainer/scoreTest.type';
import { RadioButtonItems } from '../TextRadioButtonGroup/TextRadioButtonGroup.type';

export interface MbtiTestSliceInitialState {
  isPublic: boolean;
  mbtiTestResultFormItems: MbtiTestResultFormItem[];
  mbtiTestSelectFormItems: MbtiTestSelectFormItems[];
  imageBase64DataArray: Array<string>;
}

export interface MbtiTestResultFormItem extends ResultFormItem {
  mbtiType: string;
}

export interface MbtiTestSelectFormItems extends SelectFormItems {
  radioButtonItems: RadioButtonItems[];
  radioButtonIndex: string;
}

export type MbtiTestSelectFormItemsType = {
  mbtiTestSelectFormItems: MbtiTestSelectFormItems[];
};

export type MbtiTestItems = ScoreTestItems;
