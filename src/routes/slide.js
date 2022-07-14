import express from "express";
import { getSlides, setSlide } from "../controllers/Slides";
import { upload } from "../utils";

const slidesRouter = express.Router();

slidesRouter.get("/", getSlides);
slidesRouter.post("/", upload.single("image"), setSlide);

export { slidesRouter };
