import multer from "multer";
import { v4 as uuidv4 } from "uuid";

export const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, "public/");
  },
  filename(_req, file, cb) {
    cb(null, `${uuidv4()}.${file.mimetype.split("/")[1]}`); //Appending extension
  },
});

export const upload = multer({ storage });
