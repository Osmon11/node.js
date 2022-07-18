import { model, Schema } from "mongoose";

export const NewsSchema = new Schema({
  id: String,
  title: String,
  subtitle: String,
  imageName: String,
  imageUrl: String,
  content: String,
});

export const NewsModel = model("news-feed", NewsSchema);
