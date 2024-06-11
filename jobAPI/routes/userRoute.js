const express = require("express");
const {
  createUser,
  loginUser,
  loggedUser,
} = require("../controller/userController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/").get(validateToken,loggedUser);

module.exports = router;
