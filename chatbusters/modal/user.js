import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import validator from "validator";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name in text"],
    maxLength: [50, "Name should be under 50 character"],
  },
  email: {
    type: String,
    required: [true, "Please provide name in text"],
    validate: [validator.isEmail, "Please email in correct format"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [6, "Password should be 6 character"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};


const User = mongoose.model("User", userSchema);
export default User;
