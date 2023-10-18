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
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

let baseURL = "https://repo-8qu2.onrender.com/productServer";
let axios = require("axios");

app.get("/myserver/products", async function (req, res) {
  try {
    console.log("Helo");
    let response = await axios.get(baseURL + "/products");
    console.log(response);
    res.send(response.data);
  } catch (error) {
    if (error.response) {
      console.log(error);
      let { status, statusText } = error.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(error);
  }
});
app.get("/myserver/orders", async function (req, res) {
  let { cust, prod } = req.query;
  let params = {};
  if (cust) params.cust = cust;
  if (prod) params.prod = prod;
  try {
    console.log("Helo");
    let response = await axios.get(baseURL + "/orders", { params: params });
    console.log(response);
    res.send(response.data);
  } catch (error) {
    if (error.response) {
      console.log(error);
      let { status, statusText } = error.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(error);
  }
});
app.get("/myserver/orders/customer/:cust", async function (req, res) {
  try {
    let { cust } = req.params;
    console.log("Helo", cust);
    let response = await axios.get(`${baseURL}/orders/customer/${cust}`);
    console.log(response);
    res.send(response.data);
  } catch (error) {
    if (error.response) {
      console.log(error);
      let { status, statusText } = error.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(error);
  }
});
app.get("/myserver/orders/product/:prod", async function (req, res) {
  console.log("hello");
  try {
    let { prod } = req.params;
    console.log("Helo", prod);
    let response = await axios.get(`${baseURL}/orders/product/${prod}`);
    console.log(response);
    res.send(response.data);
  } catch (error) {
    if (error.response) {
      console.log(error);
      let { status, statusText } = error.response;
      console.log("Error :: ", status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(error);
  }
});
app.get("/myserver/customers", async function (req, res) {
  try {
    console.log("Helo");
    let response = await axios.get(baseURL + "/customers");
    console.log(response);
    res.send(response.data);
  } catch (error) {
    if (error.response) {
      console.log(error);
      let { status, statusText } = error.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(error);
  }
});
app.post("/myserver/orders", async function (req, res) {
  try {
    let body = req.body;
    console.log("Helo", body);
    let response = await axios.post(baseURL + "/orders", body);
    console.log(response);
    res.send(response.data);
  } catch (error) {
    if (error.response) {
      console.log(error);
      let { status, statusText } = error.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(error);
  }
});
