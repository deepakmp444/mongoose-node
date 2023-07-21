import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  productName: {
    type: String,
    required: [true, "Product should be selected"],
  },
  catName: {
    type: String,
    required: [true, "Category should be selected"],
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  orderDeleteByUser: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
