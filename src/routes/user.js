const express = require("express");
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/userController");
const { validateUser } = require("../middlewares/inputValidator");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", validateUser, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;