import { SelectFormItems } from '../SetSelectFormItems/SetSelectFormItems.type';
import { RadioButtonItems } from '../TextRadioButtonGroup/TextRadioButtonGroup.type';

export interface MbtiSelectFormItems extends SelectFormItems {
  radioButtonItems: RadioButtonItems[];
  radioButtonIndex: string;
}

export type MbtiSelectFormItemsType = {
  mbtiSelectFormItems: MbtiSelectFormItems[];
};
