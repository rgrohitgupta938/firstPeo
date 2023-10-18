const express = require("express");
let passport = require("passport");
let CookieStraregy = require("passport-cookie").Strategy;
let cookieParser = require("cookie-parser");
let { users, orders } = require("./data-task3");
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
  next();
});
app.use(cookieParser());
app.use(passport.initialize());
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

const myCookie = "passportCookie";

let strategyAll = new CookieStraregy({ cookieName: myCookie }, function (
  token,
  done
) {
  console.log("In CookieStraregy", token);
  let user1 = users.find((u) => u.id === token.id);
  console.log("user", user1);
  if (!user1)
    return done(null, false, { message: "Incorrect username or password" });
  else return done(null, user1);
});
let strategyAdmin = new CookieStraregy({ cookieName: myCookie }, function (
  token,
  done
) {
  console.log("In CookieStraregy", token);
  let user1 = users.find((u) => u.id === token.id);
  console.log("user", user1);
  if (!user1)
    return done(null, false, { message: "Incorrect username or password" });
  else if (user1.role !== "admin")
    return done(null, false, { message: "You do not have admin role" });
  else return done(null, user1);
});
passport.use("roleAll", strategyAll);
passport.use("roleAdmin", strategyAdmin);

app.post("/user", function (req, res) {
  let { username, password } = req.body;
  let user = users.find((u) => u.name === username && password === u.password);
  if (user) {
    let payload = { id: user.id };
    res.cookie(myCookie, payload);
    res.send("Login Success");
    console.log("in Post");
  } else res.sendStatus(401);
});
app.get(
  "/user",
  passport.authenticate("roleAll", { session: false }),
  function (req, res) {
    console.log("In GET /user", req.user);
    res.send(req.user);
  }
);
app.get(
  "/myOrders",
  passport.authenticate("roleAll", { session: false }),
  function (req, res) {
    console.log("In GET /myOrders", req.user);
    let orders1 = orders.filter((ord) => ord.userId === req.user.id);
    res.send(orders1);
  }
);
app.get(
  "/allOrder",
  passport.authenticate("roleAdmin", { session: false }),
  function (req, res) {
    console.log("In GET /allOrder", req.user);
    res.send(orders);
  }
);
