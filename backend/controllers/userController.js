const user = require("./../models/User");
exports.getAllUsers = async (req, res) => {
  try {
    const result = await user.find();
    // .select("name email _id");
    res.json({
      success: true,
      message: "User fetched successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};
exports.getUserDetails = async (req, res) => {
  try {
    const result = await user.findById(req.body.id);
    // .select("name email _id");
    res.json({
      success: true,
      message: "User fetched successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};
