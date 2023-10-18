const express = require("express");
const app = express();
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
const port = 2450;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
let fs = require("fs").promises;
let fname = "users.txt";

app.get("/myserver/users", async function (req, res) {
  try {
    let response = await fs.readFile(fname, "utf8");
    console.log(response);
    res.send(JSON.parse(response));
  } catch (error) {
    res.status(404).send("Not found");
  }
});
app.post("/myserver/users", async function (req, res) {
  try {
    let body = req.body;
    console.log(body);
    let response = await fs.readFile(fname, "utf8");
    console.log(response);
    let data = JSON.parse(response);
    console.log(data);
    let newUser = { ...body };
    data.push(newUser);
    await fs.writeFile(fname, JSON.stringify(data));
    res.send(newUser);
  } catch (error) {
    console.log("Invalid");
    res.status(404).send("Invalid");
  }
});
