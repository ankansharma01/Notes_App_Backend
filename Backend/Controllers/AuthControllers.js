const user = require("../Models/UserAuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookies");

const login = async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExists = await user.findOne({ email: email });
  if (!isUserExists) {
    res.status(400).json({ message: "No User" });
  }
  checkPass = bcrypt.compare(password, isUserExists.password);
  if (!checkPass) {
    res.status(200).json({ message: "invalid password" });
  }
  const token = jwt.sign({ userId: isUserExists._id }, "notes", { expiresIn: "1h" });
  try{
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,

    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  })
   }
   catch(e)
   {
    console.log(e);
    
   }
  return res.status(200).json({ success: true, message: "user logged in", token,id:isUserExists._id });
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const isUser_Exists = await user.findOne({ email: email });
  if (isUser_Exists) {
    res.status(400).json({ message: "User Exists" });
  } else {
    const hashPass = await bcrypt.hash(password, 10);
    const userIndi = await user.create({
      name: name,
      email: email,
      password: hashPass,
    });

    return res
      .status(200)
      .json({ name: userIndi.name, message: "User Created" });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "user logged out" });
  } catch (e) {
    res.status(400).json({ success: false, message: "error occured" });
  }
};

module.exports = { login, signup, logout };
