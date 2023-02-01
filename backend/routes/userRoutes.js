const {
  getAllUsers,
  getUserDetails,
} = require("../controllers/userController");
const { protected, adminOnly } = require("../middleware/authMiddleware");
const router = require("express").Router();
router.get("/", adminOnly, getAllUsers);
router.get("/details", protected, getUserDetails);
module.exports = router;
