import { Router } from "express";
const router = Router();
import {
  getAllUser,
  loginUser,
  registerUser,
  userCount,
} from "../controller/userController.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

router.route("/user").post(registerUser);
router.route("/all-user").get(isLoggedIn, getAllUser);
router.route("/login").post(loginUser);
router.route("/total-user").get(isLoggedIn, userCount);

export { router as userAuthRoute };
