import Product from "../modal/product.js";

const productCount = async (req, res) => {
  try {
    const totalProduct = await Product.countDocuments();
    return res.status(200).json({ count: totalProduct, status: true });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const productFilterByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const product = await Product.find({ category });
    return res.status(200).json({ product, status: true });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

export { productCount, productFilterByCategory };
