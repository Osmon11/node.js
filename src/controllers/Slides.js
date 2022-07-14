import { Slides } from "../models/Slides";
import { v4 as uuidv4 } from "uuid";

export const getSlides = async (req, res, next) => {
  try {
    let slides = Boolean(req.query.id)
      ? await Slides.find({ id: req.query.id }).exec()
      : await Slides.find();
    return res.send(slides);
  } catch (error) {
    next(error);
  }
};

export const setSlide = (req, res, next) => {
  const newSlide = {
    id: uuidv4(),
    imageName: req.file.originalname,
    imageUrl: `${ip.address()}/${req.file.path}`,
    title: req.body.title,
    subtitle: req.body.subtitle,
  };
  console.log(req.file, req.body);
  res.send("it's ok");
};
