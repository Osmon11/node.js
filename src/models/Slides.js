import { model, Schema, Types } from "mongoose";

export const SlideSchema = new Schema({
  id: Types.ObjectId,
  imageName: String,
  imageUrl: String,
  title: String,
  subtitle: String,
});

export const SlidesModel = model("slide", SlideSchema);
