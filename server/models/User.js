const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    // Add a custom validation for email format if needed
    validate: {
      validator: (value) => /\S+@\S+\.\S+/.test(value),
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    // You may want to add a custom validation for phone number format
  },
  password: {
    type: String,
    required: true,
    // You may want to add a custom validation for password strength
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
