import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      token = req.cookies?.token;
    }

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.user = { id: decoded.userId || decoded.id };
    req.id = decoded.userId || decoded.id; // for older controllers

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    return res.status(403).json({
      message: "Forbidden",
      success: false,
    });
  }
};

export default isAuthenticated;
