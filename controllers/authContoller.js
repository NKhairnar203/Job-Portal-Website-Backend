import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  // validate
  if (!name) {
    next("Name is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!password) {
    next("Password is required and greter than 6 char.");
  }

  const exisitingUser = await userModel.findOne({ email });

  if (exisitingUser) {
    next("email already exists, Please Login");
  }

  const user = await userModel.create({ name, email, password });
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User created successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token: token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    next("Please Provide All Fields");
  }

  // find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid username or password");
  }

  // compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    next("Invalid username or password");
  }

  user.password = undefined;
  const token = user.createJWT();
  res.status(200).send({
    success: true,
    message: "User logged in successfully",
    user,
    token: token,
  });
};
