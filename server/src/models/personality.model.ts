import { AutoIncrementID } from "@typegoose/auto-increment";
import { prop, plugin, mongoose, getModelForClass } from "@typegoose/typegoose";

@plugin(AutoIncrementID, { field: "id", startAt: 1 })
class Personality {
  @prop({ unique: true })
  id: number;

  @prop({ required: true })
  title: string;

  @prop({ required: true })
  explain: string;

  @prop({ required: true })
  selectItems: mongoose.Types.ObjectId;

  @prop({ required: true })
  resultItems: mongoose.Types.ObjectId;
}

class SelectItems {
  @prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  selectItems: {
    type: [
      {
        question: String;
        optionItems: [
          {
            option: String;
            weightedScoreItems: [{ typeContent: String; score: Number }];
          }
        ];
      }
    ];
  };
}

class ResultItems {
  @prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  resultItems: { type: [{ typeContent: String; explanationContent: String }] };
}

export const PersonalityModel = getModelForClass(Personality);
export const SelectItemsModel = getModelForClass(SelectItems);
export const ResultItemsModel = getModelForClass(ResultItems);
