import { ImageModel } from "../models";

export const getImage = async (req, res) => {
  let image = await ImageModel.findOne({ id: req.query.imageId });
  res.writeHead(200, {
    "Content-Type": image.type,
    "Content-Length": image.data.length,
  });
  res.end(image.data);
};
