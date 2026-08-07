const jwt = require("jsonwebtoken");

// Authentication
const authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ msg: "Login Token is Required" });
    }

    token = token.split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decodedToken.userId;
    req.role = decodedToken.userRole;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid Or Expired Token" });
  }
};

// Authorization (Admin)
const authorization = async (req, res, next) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ msg: "Access Denied" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { authentication, authorization };
