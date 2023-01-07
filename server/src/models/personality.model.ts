import mongoose, { Types } from "mongoose";
import {
  Personality,
  OptionValuesToSelect,
  ResultItem,
} from "./personality.type";
const { Schema, model } = mongoose;

const PersonalitySchema = new Schema({
  title: { type: String, required: true },
  explain: { type: String, required: true },
  selectItems: { type: Types.ObjectId, ref: "SelectItems" },
  resultItems: { type: Types.ObjectId, ref: "ResultItems" },
});

const ResultItemsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  resultItems: { type: [{ typeContent: String, explanationContent: String }] },
});

const SelectItemsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  selectItems: {
    type: [
      {
        question: String,
        optionItems: [
          {
            option: String,
            weightedScoreItems: [{ typeContent: String, score: Number }],
          },
        ],
      },
    ],
  },
});

export const PersonalityModel = model<Personality & mongoose.Document>(
  "Personality",
  PersonalitySchema
);

export const SelectItemsModel = model<
  OptionValuesToSelect[] & mongoose.Document
>("SelectItems", SelectItemsSchema);

export const ResultItemsModel = model<ResultItem[] & mongoose.Document>(
  "ResultItems",
  ResultItemsSchema
);
