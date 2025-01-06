const express = require("express");
const verifyToken = require("../middleware/verifyToken"); // Import the middleware
const router = express.Router();

// Example protected route
router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({
    message: "This is a protected route",
    user: req.user, // This will contain the decoded user details from the JWT
  });
});

module.exports = router;
