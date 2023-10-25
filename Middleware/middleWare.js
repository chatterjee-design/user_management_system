const JWT = require("jsonwebtoken");

const jwtAuth = async (req, res, next) => {
  // get cookie token(jwt token generated using json.sign() from userSchema.js) form the request
  const {token} = req.cookies;
  console.log("jwt token", token);
  if (!token) {
    console.log("No token found");
    return res.status(400).json({
      success: false,
      message: "NOT authorized",
    });
  }
  try {
    // verify the token
    const payload = await JWT.verify(token, process.env.SECRET); // verify the token by using secret key from dotenv
    console.log("Decoded Token Payload:", payload);
    req.user = { id: payload.id, email: payload.email };

    next();
  } catch (err) {
    console.error("Token verification error:", err);
      res.status(400).json({
        success: false,
        message: "invalid token",
      });
    
  }
};

module.exports = jwtAuth;
