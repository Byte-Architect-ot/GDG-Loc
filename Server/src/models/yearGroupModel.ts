import { Schema, model, Types, Document } from "mongoose";

export interface IYearGroup extends Document {
  year: string; 
  events: Types.ObjectId[];
  members: Types.ObjectId[];
}

const YearGroupSchema = new Schema<IYearGroup>({
  year: { type: String, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

export const yearGroupModel = model<IYearGroup>("YearGroup", YearGroupSchema);
