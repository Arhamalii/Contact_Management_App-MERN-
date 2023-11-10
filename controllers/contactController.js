const { validationResult } = require("express-validator");
const Contacts = require("../model/Contact");

const getAllContacts = async (req, res) => {
  try {
    console.log(req.user);
    const allContacts = await Contacts.find({ user_id: req.user.id });
    res.status(200).send({
      succeess: true,
      message: "Contact Fetched Succesfully",
      allContacts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

const createContactController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        succeess: false,
        message: errors.array(),
      });
    }
    const { name, email, phone, relation } = req.body;

    const alreadyContact = await Contacts.findOne({ name });
    if (alreadyContact) {
      return res.status(400).json({
        succeess: false,
        message: "Contact with this Name already Exists",
      });
    }
    const newContact = new Contacts({
      name,
      email,
      phone,
      relation,
      user_id: req.user.id,
    });
    await newContact.save();
    res.status(200).send({
      success: true,
      message: "Contact Created",
      newContact,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

const updateContactController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      succeess: false,
      message: errors.array(),
    });
  }
  const { name, email, phone, relation } = req.body;
  const { id } = req.params;
  const contact = await Contacts.findById(id);
  if (!contact) {
    return res.status(404).send({
      succeess: false,
      message: "Contact Not Found with this id",
    });
  }

  if (req.user.id.toString() !== contact.user_id.toString()) {
    return res.status(401).send({
      succeess: false,
      message: "Authorization denied",
    });
  }

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (relation) contactFields.relation = relation;

  try {
    const updatedContact = await Contacts.findByIdAndUpdate(id, contactFields, {
      new: true,
    });
    res.status(200).send({
      succeess: true,
      message: "Contact Updated Succesfully",
      updatedContact,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const contact = await Contacts.findById(id);
  if (!contact) {
    return res.status(404).send({
      succeess: false,
      message: "Contact Not Found with this id",
    });
  }
  if (contact && req.user.id.toString() !== contact.user_id.toString()) {
    return res.status(404).send({
      succeess: false,
      message: "Authorization denied",
    });
  }
  try {
    await Contacts.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Contact Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
module.exports = {
  createContactController,
  getAllContacts,
  updateContactController,
  deleteContactController,
};
