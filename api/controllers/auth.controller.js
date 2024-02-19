import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  // take infor, encrypted and save
  const { username, email, password } = req.body; // take infomation from cliend sending to server
  const hashedPassword = bcryptjs.hashSync(password, 10); // hashSync: a way to hash, 10: salt number, will combine with password and make it encrypted
  const newUser = new User({ username, email, password: hashedPassword }); // create new user by User Model
  // await newUser.save(); // save to database, use await because save take time so use await to prevent error, so add async to head of function

  // Debug when have some errors when saving user to db
  try {
    await newUser.save();
    //create response
    res.status(201).json("User created successfully !");
  } catch (error) {
    next(error); // same with res.status(err.statusCode).json(err.message) but shorten and auto, more detail error using middleware
    //next(errorHandler(550, "Error from the function")); //test manual error
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials !"));
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );
    const {password: pass, ...rest} = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
