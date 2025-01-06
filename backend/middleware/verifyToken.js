const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key"; // Use an environment variable for the key

module.exports = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Authorization header is missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message); // Log the error for debugging
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = {
      registration_id: decoded.registration_id, // Use registration_id here
      email: decoded.email,
    };

    next();
  });
};
