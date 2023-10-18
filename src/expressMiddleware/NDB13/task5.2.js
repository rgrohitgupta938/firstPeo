const express = require("express");
let passport = require("passport");
let jwt = require("jsonwebtoken");
let JWTStartegy = require("passport-jwt").Strategy;
let ExtractJWT = require("passport-jwt").ExtractJwt;
let { empData } = require("./data-task5.2");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
app.use(passport.initialize());
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
const params = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jwtsecret10121997",
};
const jwtExpirySeconds = 300;
let strategyAll = new JWTStartegy(params, function (token, done) {
  console.log("In JWTStartegy", token);
  let user1 = empData.find((u) => u.id === token.id);
  console.log("user", user1);
  if (!user1)
    return done(null, false, { message: "Incorrect username or password" });
  else return done(null, user1);
});
passport.use("roleAll", strategyAll);
app.post("/login", function (req, res) {
  let { name, empCode } = req.body;
  console.log(req.body);
  let user = empData.find((u) => u.name === name && +empCode === +u.empCode);
  if (user) {
    let payload = { id: user.id };
    let token = jwt.sign(payload, params.secretOrKey, {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds,
    });
    console.log(token);
    res.send(token);
  } else res.sendStatus(401);
});
app.get(
  "/myDetails",
  passport.authenticate("roleAll", { session: false }),
  function (req, res) {
    console.log("In GET /user", req.user);
    res.send(req.user);
  }
);
app.get("/company", function (req, res) {
  res.send("Welcome to the Employee Portal of XYZ Company");
});
app.get(
  "/myJuniors",
  passport.authenticate("roleAll", { session: false }),
  function (req, res) {
    console.log("In /get myjuniors", req.user);
    let { designation } = req.user;
    let user = req.user;
    if (!user) {
      res.status(403).send("Forbidden");
    } else {
      let emps = [];
      if (designation === "VP") {
        let filter = ["Trainee", "Manager"];
        emps = empData.filter((em) => filter.includes(em.designation));
      }
      if (designation === "Manager") {
        emps = empData.filter((j) => j.designation === "Trainee");
        console.log(emps);
      }
      if (designation === "Trainee") {
        emps = [];
        console.log(emps);
      }
      console.log(emps);
      res.send(emps);
    }
  }
);
