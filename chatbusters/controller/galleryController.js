import Gallery from "../modal/gallery.js";
import fs from "fs";
const uploadImg = async (req, res) => {
  try {
    var fullUrl = req.protocol + "://" + req.get("host");
    const images = req.files;
    const data = req.files;

    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];

    const filteredData = data.every((file) =>
      allowedMimeTypes.includes(file.mimetype)
    );

    if (filteredData) {
      const listImg = [];
      for (let index = 0; index < req.files.length; index++) {
        const element = images[index];
        listImg.push(fullUrl + "/" + element.filename);
        await Gallery.create({ url: fullUrl + "/" + element.filename });
      }

      return res
        .status(200)
        .json({ status: true, images: listImg, message: "Image uploaded" });
    } else {
      const uploadDir = "./uploads";

      const allowedMimetypes = ["image/png", "image/jpeg", "image/jpg"];

      // Delete disallowed files
      const disallowedFiles = data.filter(
        (file) => !allowedMimetypes.includes(file.mimetype)
      );
      disallowedFiles.forEach((file) => {
        fs.unlink(`${uploadDir}/${file.filename}`, (err) => {
          if (err) {
            console.error(`Error deleting file ${file.filename}:`, err);
          } else {
            console.log(`Deleted file ${file.filename}`);
          }
        });
      });

      return res.status(200).json({
        status: false,
        error: "image shoulbe in this formate png|jpeg|jpg",
      });
    }
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
};

const updateImgById = async (req, res) => {
  try {
    const { id } = req.params;
    var fullUrl =
      req.protocol + "://" + req.get("host") + "/" + req.file.filename;

    const data = req.file;
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (allowedMimeTypes.includes(data.mimetype)) {
      const gallery = await Gallery.findByIdAndUpdate(
        id,
        { $set: { url: fullUrl } },
        { new: true }
      );
      return res
        .status(200)
        .json({ status: true, images: gallery.url, message: "Image updated" });
    } else {
      fs.unlink(data.path, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`File ${data.path} has been deleted.`);
        }
      });

      return res.status(200).json({
        status: false,
        error: "image shoulbe in this formate png|jpeg|jpg",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

export { uploadImg, updateImgById };
