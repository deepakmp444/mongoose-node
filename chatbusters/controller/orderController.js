import Order from "../modal/order.js";
import mongoose from "mongoose";
const IdObj = mongoose.Types.ObjectId;

const newOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productName, catName, qty, price } = req.body;
    const order = await Order.create({
      userId: new IdObj(_id),
      productName,
      catName,
      qty,
      price,
    });
    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(
      id,
      { $set: { status: "delivered" } },
      { new: true }
    );

    return res.status(200).json({ status: true, message: "Order updated" });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const totalPriceOrder = async (req, res) => {
  try {
    const order = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$price",
          },
        },
      },
    ]);

    return res.status(200).json({ status: true, totalPrice: order[0].total });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const orderCount = async (req, res) => {
  try {
    const totalOrder = await Order.countDocuments();
    return res.status(200).json({ count: totalOrder, status: true });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const orderDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(
      id,
      { $set: { orderDeleteByUser: true } },
      { new: true }
    );
    return res.status(200).json({ message: "Order deleted", status: true });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

export { newOrder, updateOrder, totalPriceOrder, orderCount, orderDelete };
