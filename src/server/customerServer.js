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

let { customers } = require("./customerData");
let fs = require("fs");
let fname = "customers.json";

app.get("/svr/resetData", function (req, res) {
  let data = JSON.stringify(customers);
  fs.writeFile(fname, data, function (err) {
    if (err) res.status(404).send(err);
    else res.send("Data in file is reset");
  });
});
app.get("/svr/customers", function (re, res) {
  fs.readFile(fname, "utf-8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let customersArray = JSON.parse(data);
      res.send(customersArray);
    }
  });
});
app.post("/svr/customers", function (req, res) {
  let body = req.body;
  fs.readFile(fname, "utf-8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let customersArray = JSON.parse(data);
      let newCustomer = { ...body };
      customersArray.push(newCustomer);
      let data1 = JSON.stringify(customersArray);
      fs.writeFile(fname, data1, function (err) {
        if (err) res.status(404).send(err);
        else res.send(newCustomer);
      });
    }
  });
});
app.put("/svr/customers/:id", function (req, res) {
  let body = req.body;
  let id = req.params.id;
  fs.readFile(fname, "utf-8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let customersArray = JSON.parse(data);
      let inx = customersArray.findIndex((st) => st.id === id);
      if (inx >= 0) {
        let updatedCustomer = { ...customersArray[inx], ...body };
        customersArray[inx] = updatedCustomer;
        let data1 = JSON.stringify(customersArray);
        fs.writeFile(fname, data1, function (err) {
          if (err) res.status(404).send(err);
          else res.send(updatedCustomer);
        });
      } else res.status(404).send("No Customer Found");
    }
  });
});
app.delete("/svr/customers/:id", function (req, res) {
    let id = req.params.id;
    fs.readFile(fname, "utf-8", function (err, data) {
      if (err) res.status(404).send(err);
      else {
        let customersArray = JSON.parse(data);
        let inx = customersArray.findIndex((st) => st.id === id);
        if (inx >= 0) {
          let updatedCustomer = customersArray.splice(inx,1);
          let data1 = JSON.stringify(customersArray);
          fs.writeFile(fname, data1, function (err) {
            if (err) res.status(404).send(err);
            else res.send(updatedCustomer);
          });
        } else res.status(404).send("No Customer Found");
      }
    });
  });
