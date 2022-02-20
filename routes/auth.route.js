const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post(
  "/registration",
  [
    check("email", "некоректрий email").isEmail(),
    check("password", "некоректрий email").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "некоректні дані при реєстрації" });
      }

      const { email, password } = req.body;

      const isUsed = await User.findOne({ email: email });

      if (isUsed) {
        return res.status(300).json({ message: "Даний email вже зайнятий, спробуйте інший" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email: email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "користувач створений" });
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/login",
  [check("email", "некоректрий email").isEmail(), check("password", "некоректрий email").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "некоректні дані при реєстрації" });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!User) {
        return res.status(400).json({ message: "Такого email нема в базі" });
      }
      const isMatch = bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Паролі не співпадають" });
      }
      const jwtSecret = "sdfaksjdfkasdfkl";
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });
      res.json({ token, userId: user._id });
    } catch (error) {
      console.log(error);
    }
  }
);
module.exports = router;
