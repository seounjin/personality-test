import {
  PersonalityModel,
  SelectItemsModel,
  ResultItemsModel,
} from "../models/personality.model";
import mongoose from "mongoose";
import { ResultItem } from "../types";
import { OptionValuesToSelect } from "../models/personality.type";

interface BasicInformationItem {
  title: string;
  explain: string;
}

interface PersonalityItem {
  basicInformationItem: BasicInformationItem;
  typeItems: ResultItem[];
  selectItems: OptionValuesToSelect[];
}

export const setPersonalityItems = async (
  personalityItems: PersonalityItem
) => {
  const {
    basicInformationItem: { title, explain },
    typeItems,
    selectItems,
  } = personalityItems;

  const selectOptionItems = new SelectItemsModel({
    _id: new mongoose.Types.ObjectId(),
    selectItems: selectItems,
  });

  const resultItems = new ResultItemsModel({
    _id: new mongoose.Types.ObjectId(),
    resultItems: typeItems,
  });

  const personality = new PersonalityModel({
    title: title,
    explain: explain,
    selectItems: selectOptionItems._id,
    resultItems: resultItems._id,
  });

  try {
    await Promise.all([
      resultItems.save(),
      selectOptionItems.save(),
      personality.save(),
    ]);
  } catch (error) {
    return Promise.reject(error);
  }
};
