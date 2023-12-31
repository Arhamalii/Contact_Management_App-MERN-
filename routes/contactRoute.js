const express = require("express");
const {
  createContactController,
  getAllContacts,
  updateContactController,
  deleteContactController,
  getContactById,
} = require("../controllers/contactController");
const { contactValidation } = require("../heplers/validationHelper");
const isLogin = require("../middlewares/auth");
const router = express.Router();

router.post("/", contactValidation, isLogin, createContactController);
router.get("/", isLogin, getAllContacts);
router.get("/:id", isLogin, getContactById);
router.put("/:id", isLogin, updateContactController);
router.delete("/:id", isLogin, deleteContactController);

module.exports = router;
