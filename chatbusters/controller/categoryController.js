import Category from "../modal/category.js";

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    return res.status(200).json({ status: true, category });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res
        .status(200)
        .json({ status: false, error: "Category not found!" });
    }
    return res.status(200).json({ status: true, message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    await Category.findByIdAndUpdate(id, { name }, { new: true });

    return res
      .status(200)
      .json({ status: true, message: "Updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

export { addCategory, deleteCategory, updateCategory };
