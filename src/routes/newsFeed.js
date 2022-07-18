import express from "express";
import {
  deleteNewsFeed,
  getNewsFeed,
  setNewsFeed,
  updateNewsFeed,
} from "../controllers/NewsFeed";
import { upload } from "../utils";
import { setValidation, updateValidation } from "../validator/newsFeed";

const newsFeedRouter = express.Router();

newsFeedRouter.get("/", getNewsFeed);
newsFeedRouter.delete("/", deleteNewsFeed);
newsFeedRouter.post("/", upload.single("image"), setValidation, setNewsFeed);
newsFeedRouter.put(
  "/",
  upload.single("image"),
  updateValidation,
  updateNewsFeed
);

export { newsFeedRouter };
