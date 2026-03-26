import { Schema, model, Document } from "mongoose";

export interface IEvent extends Document {
  eventName: string;
  eventInfo: string;
  eventDate: Date;
  eventThumbnailKey: string;
  eventsubImagesKey: string[];
  yearGroup: Schema.Types.ObjectId;
}

const eventSchema = new Schema<IEvent>({
  eventName: { type: String, required: true },
  eventInfo: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventThumbnailKey: { type: String },
  eventsubImagesKey: [{ type: String }],
  yearGroup: {
    type: Schema.Types.ObjectId,
    ref: "YearGroup",
    required: true,
  },
});

export const eventModel = model<IEvent>("Event", eventSchema);
