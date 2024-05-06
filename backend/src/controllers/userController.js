const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userSchema");

module.exports = {

  userRegister: async (req, res) => {
    const { name, email, password } = req.body;

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new userSchema({
      name: name,
      email: email,
      password: hashedpassword,
    });

    await user.save();

    res.status(200).json({
      status: "Success",
      message: "registarion successfull",
      data:user,
    });
  },



 userLogin: async (req, res) => {
    const { email, password } = req.body;

  
      // Find the user by email
      const user = await userSchema.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the password is correct
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Generate JWT
      const token = jwt.sign({ email: user.email }, process.env.USER_ACCESS_TOKEN_SECRET, {
        expiresIn: "1h" // Token expiration time
      });

      // Send JWT to client
      res.status(200).json({
        status: "Success",
        message: "Login successful",
        token
      });
   
  }



};
