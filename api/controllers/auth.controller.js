import User from "../models/user.model.js";

export const signup = async (req, res) => {
  // take infor, encrypted and save
  const { username, email, password } = req.body; // take infomation from cliend sending to server
  const hashedPassword = bcryptjs.hashSync(password, 10); // hashSync: a way to hash, 10: salt number, will combine with password and make it encrypted
  const newUser = new User({ username, email, password: hashedPassword }); // create new user by User Model
  // await newUser.save(); // save to database, use await because save take time so use await to prevent error, so add async to head of function

  // Debug when have some errors when saving user to db
  try {
    await newUser.save();
  } catch (error) {
    res.status(500).json(error.message);
  }

  //create response
  res.status(201).json("User created successfully !");
};
