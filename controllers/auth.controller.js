const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(401)
        .json({ error: "Invalid credentials. User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid credentials. Password incorrect." });
    }

    res.status(200).json({
      message: "Login successful.",
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        surname: existingUser.surname,
        email: existingUser.email,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(422).json({ errors: validationErrors });
    }

    res.status(500).json({ error: "Internal server error." });
  }
};

const register = async (req, res) => {
  const { name, surname, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const newUser = new User({
      name,
      surname,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(422).json({ errors: validationErrors });
    }

    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  login,
  register,
};
