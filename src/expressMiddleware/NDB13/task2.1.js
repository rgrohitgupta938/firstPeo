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
app.get("/viewPage", function (req, res) {
  let name = req.cookies.name;
  let counter = req.cookies.counter;
  console.log(name);
  if (!name) {
    res.cookie("name", "Guest", { maxAge: 150000, signed: true });
    res.cookie("counter", 1, { maxAge: 150000, signed: true });
    res.send("Cookie set");
  } else {
    res.cookie("counter", +counter + 1, { signed: true });
    res.send(`Cookie reacd for name : ${name} counter : ${counter}`);
  }
});
app.post("/viewPage", function (req, res) {
  let { name } = req.body;
  res.cookie("name", name, { maxAge: 150000, signed: true });
  res.cookie("counter", 1, { maxAge: 150000, signed: true });
  res.send(`Cookie Set with name = ${name}`);
});
app.delete("/viewPage", function (req, res) {
  res.clearCookie("name");
  res.clearCookie("counter");
  res.send("Cookie deleted");
});
