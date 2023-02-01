const user = require("./../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/email");
const { addMinutes, isBefore } = require("date-fns");
const { findById } = require("./../models/User");
const { OAuth2Client } = require("google-auth-library");

exports.registerUserController = async (req, res) => {
  try {
    const found = await user.findOne({
      email: req.body.email,
    });
    // if (found) {
    //   // throw "Email alreday exist"
    //   return res.json({
    //     success: false,
    //     message: "Email Already Exit",
    //   });
    // }
    const hashPass = bcrypt.hashSync(req.body.password);
    const result = await user.create({
      ...req.body,
      password: hashPass,
      admin: false,
    });
    // to login user at the same time
    const token = jwt.sign(
      {
        id: result._id,
      },
      process.env.JWT_KEY
    );

    sendEmail({
      sendTo: req.body.email,
      sub: "Thank you for registration",
      msg: "hello i'm here",
    });
    res.json({
      success: true,
      message: "User Register and Loged In Successfully",
      result: {
        id: result._id,
        name: result.name,
        email: result.email,
        active: result.active,
        admin: result.admin,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};

exports.loginUserController = async (req, res) => {
  try {
    const result = await user.findOne({
      email: req.body.email,
    });
    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid email",
      });
    }

    const match = await bcrypt.compare(req.body.password, result.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: result._id }, process.env.JWT_KEY);

    res.json({
      success: true,
      message: "User register and Loged In Successfully",
      result: {
        id: result._id,
        name: result.name,
        email: result.email,
        active: result.active,
        admin: result.admin,
        password: result.password,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};

exports.forgetPasswordController = async (req, res) => {
  try {
    const result = await user.findOne({ email: req.body.email });
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "This email is not register with us",
      });
    }
    await user.findByIdAndUpdate(result._id, {
      passwordResetAt: addMinutes(new Date(), 2),
      allowPasswordReset: true,
    });
    sendEmail({
      sendTo: req.body.email,
      sub: "Instruction for forget Password with Skillhub",
      msg: `http://http://127.0.0.1:5173/reset-password/${result._id}`,
    });
    res.json({
      success: true,
      message: "Instruction sen to Email",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};

exports.resetPasswordController = async (req, res) => {
  try {
    const { password } = req.body;
    const { userId } = req.query;
    const record = await user.findById(userId);
    if (!record) {
      return res.status(400).json({
        message: "Invalid Link",
      });
    }
    if (isBefore(record.passwordResetAt, new Date())) {
      return res.status(400).json({
        success: false,
        message: "Link Expired",
      });
    }
    if (!record.allowPasswordReset) {
      return res.status(400).json({
        success: false,
        message: "You  have used this link previously",
      });
    }

    const hashPass = bcrypt.hashSync(password);
    const result = await user.findByIdAndUpdate(userId, {
      password: hashPass,
      allowPasswordReset: false,
    });
    if (!result) {
      return res.status(401).json({
        success: false,
        message: "something went wrong",
      });
    }
    res.json({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};
// exports.destroyUsers = async (req, res) => {
//   try {
//     await user.deleteMany();
//     res.json({
//       success: true,
//       message: "all users deleted Successfully",
//     });
//   } catch {
//     res.status(400).json({
//       success: false,
//       message: "error" + error,
//     });
//   }
// };

exports.loginWithGoogle = async (req, res) => {
  try {
    const { tokenId } = req.body;
    if (!tokenId) {
      res.status(401).json({
        message: "please provide token",
      });
    }
    const client = new OAuth2Client(
      "709476600777-5vqlf0cc0p5ba776tijh2e9mrn9os369.apps.googleusercontent.com"
    );
    const {
      payload: { name, email, picture },
    } = await client.verifyIdToken({
      idToken: tokenId,
      audience:
        "709476600777-5vqlf0cc0p5ba776tijh2e9mrn9os369.apps.googleusercontent.com",
    });
    const result = await user.findOne({ email });
    if (result) {
      const token = jwt.sign({ id: result._id }, process.env.JWT_KEY);
      //old user
      res.json({
        message: "Login Success",
        result: {
          name,
          email,
          token,
        },
      });
    } else {
      //new user
      const result = await user.create({
        name: name,
        email: email,
      });
      const token = jwt.sign({ id: result._id }, process.env.JWT_KEY);
      res.json({
        message: "user register successfully",

        result: {
          name,
          email,
          token,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      // success: false,
      message: "error" + error,
    });
  }
};
