const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.protected = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "please Provide Token",
      });
    }
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    req.body.id = id;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "error" + error,
    });
  }
};

exports.adminOnly = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "please Provide Token",
      });
    }
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    const result = await User.findById(id);
    if (!result.admin) {
      return res.status(401).json({
        success: false,
        message: "Admin Only Route ",
      });
    }
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "error" + error,
    });
  }
};
