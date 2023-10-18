const express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  req.header("Access-Control-Allow-Credentials", true);
  next();
});
function authenticateToken(req, res, next) {
  //console.log("In middleware : AuthenticateToken", req.header);
  const token = req.cookies[cookieName];
  //console.log("Token : ", token, "hello");
  if (!token) res.status(401).send("Please login first");
  else {
    jwt.verify(token, jwt_key, function (err, data) {
      if (err) res.status(403).send(err);
      else {
        console.log(data);
        req.user = data.user;
        next();
      }
    });
  }
}
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use("/myOrders", authenticateToken);
const jwt_key = "secretkey10121997";
const jwtExpiryTime = 300;
let cookieName = "jwtToken";
let { users, orders } = require("./data-task3");
app.post("/login", function (req, res) {
  let { username, password } = req.body;
  let user = users.find((u) => u.name === username && u.password === password);
  console.log(user);
  if (user) {
    const token = jwt.sign({ user }, jwt_key, {
      algorithm: "HS256",
      expiresIn: jwtExpiryTime,
    });
    res.cookie(cookieName, token);
    res.send("Login Success");
  } else {
    res.status(401).send("Login Failed");
  }
});
app.get("/myOrders", function (req, res) {
  console.log("In GET request /myOrders");
  let orders1 = orders.filter((or) => or.userId === req.user.id);
  res.send(orders1);
});
app.get("/info", function (req, res) {
  res.send("Hello. Welcome to the tutorial");
});
