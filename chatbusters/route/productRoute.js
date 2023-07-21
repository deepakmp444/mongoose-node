import { Router } from "express";
import {
  productCount,
  productFilterByCategory,
} from "../controller/productController.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
const router = Router();

router.route("/total-product").get(isLoggedIn, productCount);
router.route("/product").get(isLoggedIn, productFilterByCategory);

export { router as productRoute };
