const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

// Temporary database (array)
let users = [];

// PASSWORD RULE: minimum 8 characters
function isStrongPassword(password) {
  return password.length >= 8;
}

/* ================= SIGN UP ================= */
app.post("/signup", async (req, res) => {
  const { employeeId, email, password, role } = req.body;

  // Empty field check
  if (!employeeId || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Password rule
  if (!isStrongPassword(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters"
    });
  }

  // Email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verifyToken = uuidv4();

  users.push({
    employeeId,
    email,
    password: hashedPassword,
    role,
    verified: false,
    verifyToken
  });

  console.log("Email verification link:");
  console.log(`http://localhost:5000/verify/${verifyToken}`);

  res.json({
    message: "Signup successful. Please verify your email."
  });
});

/* ================= EMAIL VERIFICATION ================= */
app.get("/verify/:token", (req, res) => {
  const user = users.find(u => u.verifyToken === req.params.token);

  if (!user) {
    return res.send("Invalid verification link");
  }

  user.verified = true;
  user.verifyToken = null;
  res.send("Email verified successfully. You can now log in.");
});

/* ================= SIGN IN ================= */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Empty field check
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password are required"
    });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({
      message: "Incorrect email or password"
    });
  }

  if (!user.verified) {
    return res.status(401).json({
      message: "Please verify your email first"
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({
      message: "Incorrect email or password"
    });
  }

  res.json({
    message: "Login successful",
    redirect: "dashboard.html"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
