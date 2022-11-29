const express = require("express");
const router = express.Router();
const {
  createUser,
  readUser,
  updateUser,
  removeUser,
  suspendUser,
  reactiveUser,
} = require("../controllers/user");

router.post("/add-user-account", createUser);

router.get("/list-user-accounts", readUser);

router.put("/update-user-account/:userId", updateUser);

router.get("/remove-user-account/:userId", removeUser);

router.get("/suspend-user-account/:userId", suspendUser);

router.get("/reactivate-user-account/:userId", reactiveUser);

module.exports = router;
