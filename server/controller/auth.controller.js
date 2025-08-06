const User = require("../model/user.model");
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist)
      return res.status(400).json({ message: "User already exist" });

    const new_user = await User.create({ username, email, password });

    return res.status(200).json({
      message: "User created",
      token: await new_user.generateToken(),
      user: new_user,
    });
  } catch (error) {
    console.log("Error creating user", error);
  }
};

const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const userExist = await User.findOne({ email });
      if (!userExist)
        return res.status(400).json({ message: "User does not exist" });
  
      const user_verify = await bcrypt.compare(password,userExist.password);
      if (!user_verify) return res.status(400).json({ message: "Incorrect password" });

      return res.status(200).json({
        message: "User logged in",
        token: await userExist.generateToken(),
        user: userExist,
      });

    } catch (error) {
      console.log("Error creating user", error);
    }
  };

  const getUser = async (req, res, next) => {
    try {
  
      return res.status(200).json({
        message: "User fetched",
        user: req.user,
      });

    } catch (error) {
      console.log("Error creating user", error);
    }
  };

  module.exports = {register,login,getUser}
