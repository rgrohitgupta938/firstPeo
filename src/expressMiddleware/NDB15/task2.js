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

let baseURL = "https://repo-8qu2.onrender.com/studentServer";
let axios = require("axios");

app.get("/getToken", async function (req, res) {
  try {
    console.log("Helo");
    let response = await axios.get(baseURL + "/getToken");
    console.log(response);
    res.send("" + response.data);
  } catch (error) {
    if (error.response) {
      console.log(error);
      let { status, statusText } = error.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(error);
  }
});
app.get("/students", async function (req, res) {
  let token = req.header("authorization") || "dummyvalue";
  try {
    console.log("Helo");
    let response = await axios.get(baseURL + "/students", {
      headers: { authorization: token },
    });
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
app.get("/students/:id", async function (req, res) {
  let token = req.header("authorization") || "dummyvalue";
  try {
    let { id } = req.params;
    console.log("Helo");
    let response = await axios.get(`${baseURL}/students/${id}`, {
      headers: { authorization: token },
    });
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
app.get("/students/course/:name", async function (req, res) {
  let token = req.header("authorization") || "dummyvalue";
  console.log(token);
  try {
    let { name } = req.params;
    console.log("Helo");
    let response = await axios.get(`${baseURL}/students/course/${name}`, {
      headers: { authorization: token },
    });
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
app.post("/students", async function (req, res) {
  let token = req.header("authorization") || "dummyvalue";
  try {
    let body = req.body;
    console.log("Helo", body);
    let response = await axios.post(baseURL + "/students", body, {
      headers: { authorization: token },
    });
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
app.put("/students/:id", async function (req, res) {
  let token = req.header("authorization") || "dummyValue";
  try {
    let { id } = req.params;
    let body = req.body;
    console.log("Helo", body);
    let newBody = { id, ...body };
    let response = await axios.put(`${baseURL}/students/${id}`, newBody, {
      headers: { authorization: token },
    });
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
app.delete("/students/:id", async function (req, res) {
  let token = req.header("authorization") || "dummyvalue";
  try {
    let { id } = req.params;
    console.log("Helo");
    let response = await axios.delete(`${baseURL}/students/${id}`, {
      headers: { authorization: token },
    });
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
