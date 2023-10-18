let express = require("express");
const { customers } = require("./custData");
console.log(customers);
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
app.get("/customers", function (req, res) {
    let city = req.query.city;
    let gender = req.query.gender;
    let payment = req.query.payment;
    let sortBy = req.query.sortBy;
    let arr1 = customers;
    if(city){
        arr1 = arr1.filter((st) => st.city === city);
    }
    if(gender){
        arr1 = arr1.filter((st) => st.gender === gender);
    }
    if(payment){
        arr1 = arr1.filter((st) => st.payment === payment);
    }
    if(sortBy){
        if(sortBy === "city"){
            arr1 = arr1.sort((p1,p2) => p1.city.localeCompare(p2.city));
        }
        if(sortBy === "age"){
            arr1 = arr1.sort((p1,p2) => p1.age-p2.age);
        }
        if(sortBy === "payment"){
            arr1 = arr1.sort((p1,p2) => p1.payment.localeCompare(p2.payment));
        }
    }
    console.log(arr1);
  res.send(arr1);
});
app.get("/customers/:id", function (req, res) {
    let id = req.params.id;
    let st = customers.find((pt) => pt.id === id);
    if(st){
        res.send(st)
    }else{
        res.status(404).send("not found");
    }
    ;
  });
app.post("/customers", function (req, res) {
  let body = req.body;
  let st = customers.findIndex((inx) => inx.id === body.id);
  if (st < 0) {
    customers.push({ ...body });
  } else {
    customers[st] = { ...body };
  }
  res.send(body);
});
app.put("/customers/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  let st = customers.findIndex((inx) => inx.id === id);
  if (st < 0) {
    res.status(404).send("No customer Found");
  } else {
    updatedCust = { id: id, ...body };
    customers[st] = updatedCust;
    console.log(customers[st]);
    res.send(updatedCust);
  }
  console.log(customers[st]);
});
app.delete("/customers/:id", function (req, res) {
  let id = req.params.id;
  let st = customers.findIndex((inx) => inx.id === id);
  if (st < 0) {
    res.status(404).send("No customer Found");
  } else {
    let delcust = customers.splice(st, 1);
    res.send(delcust);
  }
});
