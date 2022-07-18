import { model, Schema } from "mongoose";

export const UserSchema = new Schema({
  id: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model("auth", UserSchema);
