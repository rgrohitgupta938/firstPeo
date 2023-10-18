const express = require("express");
let cookieParser = require("cookie-parser");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
let { empData } = require("./data-task2.2");
const trackerData = [];
app.post("/login", function (req, res) {
  let { empCode, name } = req.body;
  let user = empData.find((u) => u.empCode === +empCode && u.name === name);
  if (!user) {
    let tracker = { user: "Guest", url: req.url, date: Date.now() };
    trackerData.push(tracker);
    res.cookie("tracker", trackerData);
    res.status(401).send("Login Failed");
  } else {
    res.cookie("empCode", empCode);
    let tracker = { user: user.name, url: req.url, date: Date.now() };
    trackerData.push(tracker);
    res.cookie("tracker", trackerData);
    res.send({ empCode: empCode });
  }
});
app.get("/logout", function (req, res) {
  res.clearCookie("empCode");
  res.clearCookie("tracker");
  res.send("Cookies cleared");
});
app.get("/myDetails", function (req, res) {
  let empCode = req.cookies.empCode;
  console.log(empCode);
  let userDetails = empData.find((st) => st.empCode === +empCode);
  let tracker = { user: userDetails.name, url: req.url, date: Date.now() };
  trackerData.push(tracker);
  res.cookie("tracker", trackerData);
  console.log(userDetails);
  res.send(userDetails);
});
app.get("/company", function (req, res) {
  let empCode = req.cookies.empCode;
  console.log(empCode);
  let userDetails = empData.find((st) => st.empCode === +empCode);
  let tracker = { user: userDetails.name, url: req.url, date: Date.now() };
  trackerData.push(tracker);
  res.cookie("tracker", trackerData);
  res.send(" Welcome to the Employee Portal of XYZ Compan");
});
app.get("/myJuniors", function (req, res) {
  let empCode = req.cookies.empCode;
  let user = empData.find((u) => u.empCode === +empCode);
  let tracker = { user: user.name, url: req.url, date: Date.now() };
  trackerData.push(tracker);
  res.cookie("tracker", trackerData);
  console.log(user);
  if (!user) {
    res.status(403).send("Forbidden");
  } else {
    let juniors = [];
    if (user.designation === "VP") {
      let filter = ["Trainee", "Manager"];
      juniors = empData.filter((j) => filter.includes(j.designation));
      console.log(juniors);
    }
    if (user.designation === "Manager") {
      juniors = empData.filter((j) => j.designation === "Trainee");
      console.log(juniors);
    }
    if (user.designation === "Trainee") {
      juniors = [];
      console.log(juniors);
    }
    console.log(juniors);
    res.send(juniors);
  }
});
app.get("/tracker", function (req, res) {
  res.send(trackerData);
});
