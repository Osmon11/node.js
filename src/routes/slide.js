import express from "express";
import {
  getSlides,
  deleteSlide,
  setSlide,
  updateSlide,
} from "../controllers/Slides";
import { upload } from "../utils";

const slidesRouter = express.Router();

slidesRouter.get("/", getSlides);
slidesRouter.delete("/", deleteSlide);
slidesRouter.post("/", upload.single("image"), setSlide);
slidesRouter.put("/", upload.single("image"), updateSlide);

export { slidesRouter };
