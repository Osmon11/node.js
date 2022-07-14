import { Schema, model } from "mongoose";

export const ImageSchema = Schema({
  type: String,
  data: Buffer,
});

export const ImageModel = model("image", ImageSchema);
