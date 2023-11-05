const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // const token = req.header("Authorization");

  // // if (!token) {
  // //   return res.status(401).send({
  // //     success: false,
  // //     message: "Authorization denied token missing",
  // //   });
  // //   console.log();
  // // }

  // // try {
  // //   const decoded = jwt.verify(token, process.env.SECRET_KEY);
  // //   req.user = decoded.user;
  // //   next();
  // // } catch (error) {
  // //   res.status(401).json({
  // //     status: 401,
  // //     msg: "Invalid token",
  // //   });
  // // }

  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
