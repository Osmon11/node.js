import { model, Schema } from "mongoose";

export const slideschema = new Schema({
  id: String,
  imageName: String,
  imageUrl: String,
  title: String,
  subtitle: String,
});

export const SlidesModel = model("slide", slideschema);
