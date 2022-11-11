const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.get(         "/",             userCtrl.getAllUsers);
router.get(         "/profile",      auth, userCtrl.userProfile);
router.get(         "/:id",          auth, userCtrl.getOneUser);
router.post(        "/register",     userCtrl.register);
router.post(        "/login",        userCtrl.login);
router.put(         "/:id",          userCtrl.modifyUser);
router.delete(      "/:id",          userCtrl.deleteUser);

module.exports = router;