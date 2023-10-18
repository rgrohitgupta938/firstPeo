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

app.get("/myserver/customers", function (req, res) {
  axios
    .get(baseURL + "/customers")
    .then(function (response) {
      console.log(response);
      res.send(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log(status, statusText);
        res.status(status).statusText(statusText);
      } else res.status(404).send(error);
    });
});
app.get("/myserver/products", function (req, res) {
  axios
    .get(baseURL + "/products")
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log(status, statusText);
        res.status(status).statusText(statusText);
      } else res.status(404).send(error);
    });
});
app.get("/myserver/orders/customer/:cust", function (req, res) {
  let { cust } = req.params;
  axios
    .get(`${baseURL}/orders/customer/${cust}`)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log(status, statusText);
        res.status(status).statusText(statusText);
      } else res.status(404).send(error);
    });
});
app.get("/myserver/products", function (req, res) {
  axios
    .get(baseURL + "/products")
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log(status, statusText);
        res.status(status).statusText(statusText);
      } else res.status(404).send(error);
    });
});
app.get("/myserver/orders", function (req, res) {
  let { cust, prod } = req.query;
  let params = {};
  if (cust) params.cust = cust;
  if (prod) params.prod = prod;
  axios
    .get(baseURL + "/orders", { params: params })
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log(status, statusText);
        res.status(status).statusText(statusText);
      } else res.status(404).send(error);
    });
});
app.get("/myserver/orders/product/:prod", function (req, res) {
  let { prod } = req.params;
  axios
    .get(`${baseURL}/orders/product/${prod}`)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log(status, statusText);
        res.status(status).statusText(statusText);
      } else res.status(404).send(error);
    });
});
app.post("/myserver/orders", function (req, res) {
  let body = req.body;
  axios
    .post(baseURL + "/orders", body)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log(status, statusText);
        res.status(status).send(statusText);
      } else res.status(404).send(error);
    });
});
