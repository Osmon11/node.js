import express from "express";
import {
  getSlides,
  deleteSlide,
  setSlide,
  updateSlide,
} from "../controllers/Slides";
import { upload } from "../utils";
import { setValidation, updateValidation } from "../validator/slide";

const slidesRouter = express.Router();

slidesRouter.get("/", getSlides);
slidesRouter.delete("/", deleteSlide);
slidesRouter.post("/", upload.single("image"), setValidation, setSlide);
slidesRouter.put("/", upload.single("image"), updateValidation, updateSlide);

export { slidesRouter };
