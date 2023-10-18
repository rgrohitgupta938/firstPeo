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
  next();
});
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
const cookieParser = require("cookie-parser");
app.use(cookieParser("abcdef-3456789"));
let { laptops, mobiles, users } = require("./data");
app.get("/mobiles", function (req, res) {
  let userdata = req.signedCookies.userdata;
  console.log(`userdata : ${JSON.stringify(userdata)}`);
  if (!userdata) userdata = { user: "Guest", pages: [] };
  userdata.pages.push({ url: "/mobiles", data: Date.now() });
  res.cookie("userdata", userdata, { maxAge: 30000, signed: true });
  res.send(mobiles);
});
app.get("/laptops", function (req, res) {
  let userdata = req.signedCookies.userdata;
  console.log(`userdata : ${JSON.stringify(userdata)}`);
  if (!userdata) userdata = { user: "Guest", pages: [] };
  userdata.pages.push({ url: "/laptops", data: Date.now() });
  res.cookie("userdata", userdata, { maxAge: 30000, signed: true });
  res.send(laptops);
});

app.post("/login", function (req, res) {
  let { name, password } = req.body;
  let user = users.find((st) => st.name === name && st.password === password);
  if (!user) res.status(401).send("Login Failed");
  else {
    res.cookie(
      "userdata",
      { user: name, pages: [] },
      { maxAge: 30000, signed: true }
    );
    res.send("Login Success");
  }
});
app.get("/logout", function (req, res) {
  res.clearCookie("userdata");
  res.send("Cookies cleared");
});

app.get("/cookieData", function (req, res) {
  let userdata = req.signedCookies.userdata;
  res.send(userdata);
});
app.get("/users", function (req, res) {
  let userdata = req.signedCookies.userdata;
  let { user, pages } = userdata;
  if (!userdata || user === "Guest") {
    res.status(401).send("No access. Please login first");
  } else {
    let u1 = users.find((st) => st.name === user);
    if (u1.role === "admin") {
      let name = users.map((u) => u.name);
      res.send(name);
    } else res.status(403).send("Forbidden");
  }
});
