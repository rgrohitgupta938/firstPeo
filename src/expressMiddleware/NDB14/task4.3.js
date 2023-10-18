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
let port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
let fs = require("fs").promises;
let { customers } = require("./customerData");
let fname = "customerRec.json";
app.get("/svr/resetData", async function (req, res) {
  try {
    console.log(customers);
    let data = JSON.stringify(customers);
    await fs.writeFile(fname, data);
    console.log("Reset Successful");
    res.send("Reset Successful");
  } catch (err) {
    res.status(404).send("Reset Failed");
  }
});
app.get("/svr/customers", async function (req, res) {
  try {
    let data = await fs.readFile(fname, "utf8");
    let arr = JSON.parse(data);
    if (arr) {
      res.send(arr);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (err) {
    res.status(404).send("Not Found");
  }
});
app.post("/svr/customers", async function (req, res) {
  try {
    let body = req.body;
    let data = await fs.readFile(fname, "utf-8");
    let customerArray = JSON.parse(data);
    let newCust = { ...body };
    customerArray.push(newCust);
    let data1 = JSON.stringify(customerArray);
    await fs.writeFile(fname, data1);
    console.log(newCust);
    res.send(newCust);
  } catch (err) {
    res.status(401).send("Invalid");
  }
});
app.put("/svr/customers/:id", async function (req, res) {
  try {
    let body = req.body;
    let id = req.params.id;
    let data = await fs.readFile(fname, "utf8");
    let arr = JSON.parse(data);
    let stu = arr.findIndex((st) => st.id === id);
    if (stu >= 0) {
      let newCust = { id, ...body };
      arr[stu] = newCust;
      console.log(arr[stu]);
      let data1 = JSON.stringify(arr);
      await fs.writeFile(fname, data1);
      res.send(newCust);
    } else {
      res.status(404).send("Customer Not Found");
    }
  } catch (err) {
    res.status(401).send("Invalid");
  }
});
app.delete("/svr/customers/:id", async function (req, res) {
  try {
    let id = req.params.id;
    let data = await fs.readFile(fname, "utf8");
    let arr = JSON.parse(data);
    let st = arr.findIndex((t) => t.id === id);
    if (st >= 0) {
      let updateArr = arr.splice(st, 1);
      console.log(updateArr);
      let data1 = JSON.stringify(arr);
      console.log(data1);
      await fs.writeFile(fname, data1);
      res.send(updateArr);
    } else {
      res.status(404).send("No Customer Found");
    }
  } catch (err) {
    res.status(500).send("File error");
  }
});
