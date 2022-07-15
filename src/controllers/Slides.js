import fs from "fs";
import path from "path";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";
import { SlidesModel, ImageModel } from "../models";

export const getSlides = async (req, res) => {
  try {
    let slides = [];
    if (Boolean(req.query.id)) {
      slides = await SlidesModel.find({ id: req.query.id }).exec();
    } else {
      slides = await SlidesModel.find();
    }
    return res.send(slides);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteSlide = async (req, res) => {
  try {
    await SlidesModel.deleteOne({ id: req.query.id });
    let slides = await SlidesModel.find();
    res.send(slides);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const setSlide = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const file = req.file;
  try {
    let data = await fs.readFileSync(file.path);

    if (data.length) {
      await new ImageModel({
        id: file.filename,
        type: file.mimetype,
        data,
      }).save();
      const newSlide = {
        id: uuidv4(),
        imageName: file.originalname,
        imageUrl: `${url}/image?imageId=${file.filename}`,
        title: req.body.title,
        subtitle: req.body.subtitle,
      };
      await new SlidesModel(newSlide).save();
      let slides = await SlidesModel.find();
      res.send(slides);
    } else {
      res.status(400).json({ error: "Не удалось прочитать файл" });
    }
  } catch (err) {
    res.status(400).send(err);
  } finally {
    const unlinkAsync = promisify(fs.unlink);
    await unlinkAsync(file.path);
  }
};

export const updateSlide = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const file = req.file;

  let data = "",
    updateData = { title: req.body.title, subtitle: req.body.subtitle };
  if (file) {
    data = await fs.readFileSync(file.path);
  }
  if (data.length) {
    await ImageModel.replaceOne(
      { id: req.body.imageUrl.split("?imageId=")[1] },
      {
        type: file.mimetype,
        data,
      }
    );
    updateData.imageName = file.originalname;
  }

  await SlidesModel.updateOne({ id: req.query.id }, updateData);
  let slides = await SlidesModel.find();
  res.send(slides);
};
