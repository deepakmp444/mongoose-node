import { Router } from "express";
const router = Router();
import {
  newOrder,
  orderCount,
  orderDelete,
  totalPriceOrder,
  updateOrder,
} from "../controller/orderController.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

router.route("/order").post(isLoggedIn, newOrder);
router
  .route("/order/:id")
  .put(isLoggedIn, updateOrder)
  .delete(isLoggedIn, orderDelete);
router.route("/total-price-orders").get(isLoggedIn, totalPriceOrder);
router.route("/total-order").get(isLoggedIn, orderCount);

export { router as orderRoute };
