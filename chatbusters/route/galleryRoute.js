import { Router } from "express";
import { updateImgById, uploadImg } from "../controller/galleryController.js";
const router = Router();
import { upload } from "../middleware/imageUpload.js";

router.route("/upload").post(upload.array("image"),uploadImg);

router.route("/upload/:id").put(upload.single("image"), updateImgById);

export { router as galleryRoute };
