const express = require("express");
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,X-Response-Time"
  );
  res.header("Access-Control-Expose-Headers", "X-Response-Time");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
let axios = require("axios");
app.post("/myserver1/url", async function (req, res) {
  try {
    let body = req.body;
    let baseURL = body.url;
    console.log("before request", body);
    if (body.method === "GET") {
      let response = await axios.get(baseURL);
      console.log(response);
      res.send(response.data);
    }
    if (body.method === "POST") {
      let response = await axios.post(baseURL, body.body);
      console.log("post Data", response.data);
      res.send(response.data);
    }
    if (body.method === "PUT") {
      let response = await axios.put(baseURL, body.body);
      console.log("PUT Data", response.data);
      res.send(response.data);
    }
    if (body.method === "DELETE") {
      let response = await axios.delete(baseURL);
      console.log("PUT Data", response.data);
      res.send(response.data);
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      error: error.response.statusText,
      errorCode: error.response.status,
    });
  }
});
