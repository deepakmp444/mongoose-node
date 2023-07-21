import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  stock: Number,
  price: mongoose.Types.Decimal128,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
