import User from "../modal/user.js";
import jwt from "jsonwebtoken";
const { verify } = jwt;

const isLoggedIn = async (req, res, next) => {
  try {
    
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res
        .status(400)
        .json({ status: false, message: "Token not found!" });
    }
    const { id } = verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id);

    next();
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export default isLoggedIn;
