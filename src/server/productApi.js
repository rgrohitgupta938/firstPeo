let express = require("express");
const { products } = require("./productData");
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
console.log(products[0]);
app.get("/svr/products", function (req, res) {
  let category = req.query.category;
  let maxprice = req.query.maxprice;
  let maxqty = req.query.maxqty;
  let minqty = req.query.minqty;
  let arr1 = products;
  if (category) {
    arr1 = arr1.filter((pr) => pr.category === category);
  }
  if (maxprice) {
    arr1 = arr1.filter((pr) => pr.price < maxprice);
  }
  if(maxqty){
    arr1 = arr1.filter((pr) => pr.quantity < maxqty);
  }
  if(minqty){
    arr1 = arr1.filter((pr) => pr.quantity > minqty);
  }-
  res.send(arr1);
});
app.get("/svr/products/category/:catname", function (req, res) {
  let catname = req.params.catname;
  let arr1 = products.filter((pr) => pr.category === catname);
  console.log(arr1);
  if (catname) {
    res.send(arr1);
  } else {
    res.status(404).send("No Product found");
  }
});
app.get("/svr/products/:prodname", function (req, res) {
  let prodname = req.params.prodname;
  let arr1 = products.find((pr) => pr.prod === prodname);
  if (prodname) {
    res.send(arr1);
  } else {
    res.status(404).send("No Product found");
  }
});
app.get("/svr/products/order/:field", function (req, res) {
  let field = req.params.field;
  let arr1 =
    field !== "value"
      ? products.sort((p1, p2) => p1[field] - p2[field])
      : products.sort(
          (p1, p2) => p1.price * p1.quantity - p2.price * p2.quantity
        );
  if (field) {
    res.send(arr1);
  } else {
    res.status(404).send("No Product found");
  }
});
app.post("/svr/products", function (req, res) {
  let body = req.body;
  console.log(body);
  let updateProd = {...body };
  products.push(updateProd);
  console.log(updateProd);
  res.send(updateProd);
});
app.put("/svr/products/:prodname", function (req, res) {
  let prodname = req.params.prodname;
  let body = req.body;
  let inx = products.findIndex((st) => st.prod === prodname);
  if (inx >= 0) {
    let updateProd = { ...body };
    products[inx] = updateProd;
    res.send(updateProd);
  }
  else{
    res.status(404).send("No Product Found");
  }
});
app.delete("/svr/products/:prodname",function(req,res){
  let prodname = req.params.prodname;
  let inx = products.findIndex((st) => st.prod === prodname);
  if(inx>=0){
    let delproduct = products.splice(inx,1);
    res.send(delproduct);;
  }else res.status(404).send("No Product Found");
  
})
