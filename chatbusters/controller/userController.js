import User from "../modal/user.js";

const getAllUser = async (req, res) => {
  try {
    const userDetail = await User.find();
    return res.status(200).json({ status: true, userDetail });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDetail = await User.create({
      name,
      email,
      password,
    });

    const token = userDetail.getJwtToken();

    return res.status(200).json({ status: true, userDetail, token });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || !email)
      return res
        .status(400)
        .json({ status: false, error: "Email and Password required!" });

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(400).json({ status: false, error: "Email not found" });

    const isPasswordCorrect = await user.isValidatedPassword(password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ status: false, error: "Your credentials wrong!" });
    }
    const token = user.getJwtToken();
    user.password = undefined;
    return res.status(200).json({ user, status: true, token });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const userCount = async (req, res) => {
  try {
    const totalUser = await User.countDocuments();
    return res.status(200).json({ count: totalUser, status: true });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

export { getAllUser, registerUser, loginUser, userCount };
