



const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,  // Include role in the token payload
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = generateToken;