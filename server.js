const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Dummy employee data
let employee = {
  name: "John Doe",
  phone: "1234567890",
  address: "New York",
  designation: "Software Engineer",
  department: "IT",
  salary: "50000"
};

// API to get employee data
app.get("/employee", (req, res) => {
  res.json(employee);
});

// API to update employee data
app.post("/update-profile", (req, res) => {
  employee.phone = req.body.phone;
  employee.address = req.body.address;
  res.redirect("/view-profile.html");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
