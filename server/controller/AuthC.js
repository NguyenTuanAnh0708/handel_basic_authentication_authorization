import User from "../models/User.js";
import bcrypt from "bcrypt";
const authController = {
  async registerUser(req, res) {
    try {
      const sath = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, sath);
      // create new user
      const newUser = await new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashed,
      });
      // save to database
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async loginUser(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json(`Wrong email!`);
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json(`Password invalid!`);
      }
      if (user && validPassword) {
        return res.status(200).json(user);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
export default authController;
