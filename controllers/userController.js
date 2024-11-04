import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    next("Please Provide All Fields");
  }
  const user = await userModel.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email, lastName, location }
  );
  await user.save();
  const token = user.createJWT();
  res.status(200).json({ user, token });
};
