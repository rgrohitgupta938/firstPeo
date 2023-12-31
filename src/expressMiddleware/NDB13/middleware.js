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
app.use(sayHello);
app.use(showUrlMethod);
app.use("/orders", showBody);
app.use(insertUser);
app.use(sayBye);
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

function sayHello(req, res, next) {
  console.log("Hello :New Request Received");
  next();
}
function sayBye(req, res, next) {
  console.log("Bye : Middleware over");
  next();
}
function showUrlMethod(req, res, next) {
  console.log(`Url : ${req.url} Method : ${req.method}`);
  next();
}
function showBody(req, res, next) {
  console.log(`Body : ${JSON.stringify(req.body)}`);
  next();
}
function insertUser(req, res, next) {
  req.user = { name: "Temp", role: "Guest" };
  console.log(`Inserted in req.user : ${JSON.stringify(req.user)}`);
  next();
}
app.get("/products", function (req, res) {
  console.log("In the route : GET /products");
  res.send({ route: "/products", user: req.user });
});
app.get("/orders", function (req, res) {
  console.log("In the route : GET /orders");
  res.send({ route: "/orders", user: req.user });
});
app.post("/orders", function (req, res) {
  console.log("In the route : POST /orders");
  res.send({ route: "/orders", data: req.body, user: req.user });
});
