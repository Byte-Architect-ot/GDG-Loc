import { Schema, model, Document } from "mongoose";

export interface IMember extends Document {
  memberName: string;
  memberImageKey: string;
  memberBranch: string;
  mail: string;
  linkedin: string;

  yearGroup: Schema.Types.ObjectId;
}

const memberSchema = new Schema<IMember>({
  memberName: { type: String, required: true },
  memberImageKey: { type: String },
  memberBranch: { type: String, required: true },
  mail: { type: String },
  linkedin: { type: String },

  yearGroup: {
    type: Schema.Types.ObjectId,
    ref: "YearGroup",
    required: true,
  },

});



export const memberModel = model<IMember>("Member", memberSchema);
