const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "HelloMohitPrajapati";

// ROUTE 1 create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If validation is fail, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })

    const data = {
      user:{ id: user.id }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ "status": true, "message": "Successfull", "data":authToken });

  } catch (error) {
    res.status(500).send("Internal server error");
  }
})

// ROUTE 2 Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  // If validation is fail, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id:user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ "status": true, "message": "Login successfull", "data":authToken });

  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// ROUTE 3  get loggedin user details POST "/api/auth/userDetails". Login required
router.post('/userDetails', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;