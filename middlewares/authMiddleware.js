import jwt from "jsonwebtoken";

export const useAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    next("Auth Failed");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
    };
    next();
  } catch (error) {
    next("Auth Failed");
  }
};
