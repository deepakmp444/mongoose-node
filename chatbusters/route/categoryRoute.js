import { Router } from "express";
const router = Router();
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../controller/categoryController.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

router.route("/category").post(isLoggedIn, addCategory);
router
  .route("/category/:id")
  .delete(isLoggedIn, deleteCategory)
  .put(isLoggedIn, updateCategory);

export { router as categoryRoute };
