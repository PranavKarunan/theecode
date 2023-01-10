import User from "../model/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from "../utils/error.js";

//regiser
export const register = async (req, res, next) => {
    try {
      const {  username, password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = await new User({
        username: username,
        password: hash,
      }).save();
      if (!newUser) return next(createError(400, "something wrong"));
      res.status(200).send("User has been created");
    } catch (err) {
      next(err);
    }
  };

//LOGIN
export const login = async (req, res, next) => {
    try {
      console.log("a callasssssssssssssssss",req.body)
      const {email,pw} = req.body

      const user = await User.findOne({ email: email });
      
      if (!user) return next(createError(400, "user not found!"));
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) return next(createError(400, "Worng password!"));
  
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT,
        {
          expiresIn: "1d",
        }
      );
      const { password, ...otherDetails } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }});
    } catch (err) {
      next(err);
    }
  };