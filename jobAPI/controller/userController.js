const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const createUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ msg: "Check your credentials" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });
    
    res.status(200).json({ accessToken }); 
 
    res.status(201).json({ msg: `${user.username} created successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const loginUser = async (req, res) => { 
  try { 
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found!" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ err: "something went wrong" });
    }
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.SECRET_ACCESS_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: error.message });
  }
};

const loggedUser = (req, res) =>{
  console.log(req.user);
  res.json({msg:"hello"})
}

module.exports = {
  createUser,
  loginUser,
  loggedUser
};
