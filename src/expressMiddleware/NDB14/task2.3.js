let express = require("express");
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
let fs = require("fs");
let { customers } = require("./customerData");
let fname = "customerRec.json";
app.get("/svr/resetData", function (req, res) {
  console.log(customers);
  let data = JSON.stringify(customers);
  fs.promises
    .writeFile(fname, data)
    .then(() => {
      console.log("Reset Succesfull");
      res.send("Reset Succesfull");
    })
    .catch((err) => res.status(404).send("Reset Succesfull"));
});
app.get("/svr/customers", function (req, res) {
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      let arr = JSON.parse(data);
      if (arr) {
        res.send(arr);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => res.status(404).send("Not Found"));
});
app.post("/svr/customers", function (req, res) {
  let body = req.body;
  fs.promises
    .readFile(fname, "utf-8")
    .then((data) => {
      let customerArray = JSON.parse(data);
      let newCust = { ...body };
      customerArray.push(newCust);
      let data1 = JSON.stringify(customerArray);
      fs.promises
        .writeFile(fname, data1)
        .then(() => {
          console.log(newCust);
          res.send(newCust);
        })
        .catch((err) => res.status(401).send("Inavlid"));
    })
    .catch((err) => res.status(404).send("Invalid"));
});
app.put("/svr/customers/:id", function (req, res) {
  let body = req.body;
  let id = req.params.id;
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      let arr = JSON.parse(data);
      let stu = arr.findIndex((st) => st.id === id);
      if (stu >= 0) {
        let newCust = { id, ...body };
        arr[stu] = newCust;
        console.log(arr[stu]);
        let data1 = JSON.stringify(arr);
        fs.promises
          .writeFile(fname, data1)
          .then(() => res.send(newCust))
          .catch((err) => res.status(404).send("Invalid"));
      } else {
        res.status(404).send("Student Not Found");
      }
    })
    .catch((err) => res.status(401).send("invalid"));
});
app.delete("/svr/customers/:id", function (req, res) {
  let id = req.params.id;
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      let arr = JSON.parse(data);
      let st = arr.findIndex((t) => t.id === id);
      if (st >= 0) {
        let updateArr = arr.splice(st, 1);
        console.log(updateArr);
        let data1 = JSON.stringify(arr);
        console.log(data1);
        fs.promises
          .writeFile(fname, data1)
          .then(() => res.send(updateArr))
          .catch((err) => console.log(err));
      } else {
        res.status(404).send("No Customer Found");
      }
    })
    .catch((err) => res.status(500).send("File error"));
});
