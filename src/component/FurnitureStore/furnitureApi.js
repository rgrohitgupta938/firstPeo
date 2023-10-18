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

let { fData, users } = require("./data");
//console.log(fData);
let fs = require("fs").promises;
let cookie = require("cookie-parser");
let fName = "funitureData.json";
app.use(cookie());
app.get("/resetData", async function (req, res) {
  try {
    //console.log(fData);
    let data = JSON.stringify(fData);
    let response = await fs.writeFile(fName, data);
    res.send("Data is reset");
    //console.log(response);
  } catch (error) {
    res.status(404).send("Error occurred in writing file");
  }
});
app.post("/login", async function (req, res) {
  let { email, password } = req.body;
  console.log(email, password);
  try {
    let { email, password } = req.body;
    console.log(email, password);
    let st = users.findIndex(
      (i) => i.email === email && i.password === password
    );
    console.log(st);
    if (st >= 0) {
      console.log("Inside line 45", st);
      let user = { email: email, password: password, role: users[st].role };
      console.log(user);
      res.cookie("user", user);
      res.send(user);
    } else {
      res.status(404).send("Invalid Email / Password");
    }
  } catch (error) {
    res.status(401).send(error);
  }
});
app.get("/products/:category", async function (req, res) {
  let category = req.params.category;
  try {
    let response = await fs.readFile(fName, "utf8");
    //console.log("in 57", response);
    console.log(category);
    let data = JSON.parse(response);
    let filter = data.filter((st) => st.category === category);
    res.send(filter);
  } catch (error) {
    res.status(404).send("Error reading File");
  }
});
app.get("/products", async function (req, res) {
  try {
    let response = await fs.readFile(fName, "utf8");
    //console.log("in 57", response);
    let data = JSON.parse(response);
    res.send(data);
  } catch (error) {
    res.status(404).send("Error reading File");
  }
});
app.get("/products/:category/:code", async function (req, res) {
  let category = req.params.category;
  let code = req.params.code;
  try {
    let response = await fs.readFile(fName, "utf8");
    //console.log("in 57", response);
    console.log(category, code);
    let data = JSON.parse(response);
    let filter = data.filter((st) => st.category === category);
    filter = code ? filter.find((st) => st.prodCode === code) : filter;
    console.log(typeof filter, filter);
    res.send([filter]);
  } catch (error) {
    res.status(404).send("Error reading File");
  }
});
app.get("/category", async function (req, res) {
  try {
    let response = await fs.readFile(fName, "utf8");
    let data = JSON.parse(response);
    let categoryArr = data.reduce((acc, curr) => {
      if (!acc.includes(curr.category)) {
        acc.push(curr.category);
      }
      return acc;
    }, []);

    console.log(categoryArr);
    res.send(categoryArr);
  } catch (error) {
    console.log(error);
    res.status(404).send("Error reading File");
  }
});
app.post("/newproduct", async function (req, res) {
  try {
    let body = req.body;
    let response = await fs.readFile(fName, "utf8");
    let data = JSON.parse(response);
    data.push(body);
    console.log("In line 122", data, body);
    let dataw = JSON.stringify(data);
    let response1 = await fs.writeFile(fName, dataw);
    res.send(body);
  } catch (error) {
    res.status(404).send("Error writing");
  }
});
app.put("/newproduct/:prodCode", async function (req, res) {
  try {
    let prodCode = req.params.prodCode;
    console.log("In line 157", prodCode);
    let body = req.body;
    let response = await fs.readFile(fName, "utf8");
    let data = JSON.parse(response);
    let st = data.findIndex((d) => d.prodCode === prodCode);
    if (st >= 0) {
      let newBody = { prodCode: prodCode, ...body };
      data[st] = newBody;
      let dataw = JSON.stringify(data);
      let response1 = await fs.writeFile(fName, dataw);
      console.log("In line 143", data, newBody);
      res.send(body);
    } else {
      res.status(404).send("Invalid prodCode");
    }
  } catch (error) {
    res.status(404).send("Error writing");
  }
});
app.get("/product/:prodCode", async function (req, res) {
  let prodCode = req.params.prodCode;
  try {
    let response = await fs.readFile(fName, "utf8");
    //console.log("in 57", response);
    console.log("In line 157", prodCode);
    let data = JSON.parse(response);
    let filter = data.filter((st) => st.prodCode === prodCode);
    res.send(filter);
  } catch (error) {
    res.status(404).send("Error reading File");
  }
});
app.delete("/product/:prodCode", async function (req, res) {
  let prodCode = req.params.prodCode;
  try {
    let response = await fs.readFile(fName, "utf8");
    //console.log("in 57", response);
    console.log("In line 170", prodCode);
    let data = JSON.parse(response);
    let st = data.findIndex((st) => st.prodCode === prodCode);
    let delItem = data.splice(st, 1);
    let data1 = JSON.stringify(data);
    let response1 = await fs.writeFile(fName, data1);
    res.send(delItem);
  } catch (error) {
    res.status(404).send("Error reading File");
  }
});
