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
let fs = require("fs").promises;
let fname = "tracker.txt";
let baseURL = "https://repo-8qu2.onrender.com/studentServer";
let axios = require("axios");
async function tracker(req) {
  try {
    let tracker = {
      method: req.method,
      url: req.url,
      body: req.body.length === 0 ? null : req.body,
    };

    let response1 = await fs.readFile(fname, "utf8");
    let trackerRec = response1 ? JSON.parse(response1) : [];
    trackerRec.push(tracker);

    let data = JSON.stringify(trackerRec);
    await fs.writeFile(fname, data);

    console.log("tracker", trackerRec);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

app.get("/testServer/getToken", async function (req, res) {
  await tracker(req);
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
app.get("/testServer/students", async function (req, res) {
  let token = req.header("authorization") || "dummyvalue";
  await tracker(req);
  try {
    console.log("Helo");
    let response = await axios.get(baseURL + "/students", {
      headers: { authorization: token },
    });
    console.log(response.data);
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
app.get("/testServer/students/:id", async function (req, res) {
  let token = req.header("authorization") || "dummyvalue";
  await tracker(req);
  try {
    let { id } = req.params;
    console.log("Helo");
    let response = await axios.get(`${baseURL}/students/${id}`, {
      headers: { authorization: token },
    });
    console.log(response.data);
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
app.get("/testServer/students/course/:name", async function (req, res) {
  let token = req.header("authorization") || "dummyvalue";
  await tracker(req);
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
app.post("/testServer/students", async function (req, res) {
  await tracker(req);
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
app.put("/testServer/students/:id", async function (req, res) {
  await tracker(req);
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
app.delete("/testServer/students/:id", async function (req, res) {
  await tracker(req);
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
app.get("/testserver/allRequests", async function (req, res) {
  await tracker(req);
  try {
    let response = await fs.readFile(fname, "utf8");
    console.log(response);
    res.send(JSON.parse(response));
  } catch (err) {
    console.log(err);
  }
});
app.get("/testserver/allRequests/:method", async function (req, res) {
  await tracker(req);
  try {
    let { method } = req.params;
    console.log(method);
    let response = await fs.readFile(fname, "utf8");
    console.log(response);
    let data = JSON.parse(response);
    let arr = data.filter((st) => st.method === method);
    res.send(arr);
  } catch (err) {
    console.log(err);
  }
});
