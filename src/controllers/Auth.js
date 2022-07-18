import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { uuidV4 as uuid } from "uuid";

import { UserModel } from "../models";

export const registrationUser = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const salt = await bcrypt.genSalt(6);
    const passwordHash = await bcrypt.hash(salt);
    const newUser = new UserModel({
      id: uuid(),
      login: req.body.login,
      password: passwordHash,
    });
    newUser.save();
  }
};

export const authUser = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const newAuth = { login: req.body.login, password: req.body.password };
    newAuth.token = jwt.sign(newAuth, "admin_amanat_advisory");
    res.json(newAuth);
  } else {
    res.status(400).json(errors.array());
  }
};
