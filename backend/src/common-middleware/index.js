//controller to provide to check if user signined in or not. to access some routes user need to signin first

const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  //getting the token after user signin request
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    //verifying token jwt
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } else {
    return res.status(400).json({ meesage: "Authorization required!" });
  }
};

//checking if the user is a user or not to do the actions
exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res
      .status(400)
      .json({ message: "Access denied! Only users can access!" });
  }
  next();
};

//checking if the user is a admin or not to do the actions
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(400)
      .json({ message: "Access denied! Only admins can access!" });
  }
  next();
};
