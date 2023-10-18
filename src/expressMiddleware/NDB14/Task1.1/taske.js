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
let fs = require("fs");
let readLine = require("readline-sync");
let { studentsData } = require("./studentData");
let fname = "studentsRec.json";
app.get("/svr/resetData", function (req, res) {
  console.log(studentsData);
  let data = JSON.stringify(studentsData);
  fs.promises
    .writeFile(fname, data)
    .then(() => {
      console.log("Reset Succesfull");
      res.send("Reset Succesfull");
    })
    .catch((err) => res.status(404).send("Reset Succesfull"));
});
app.get("/svr/students", function (req, res) {
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      let arr = JSON.parse(data);
      if (arr) {
        res.send(arr);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => res.status(404).send("Not Found"));
});
app.get("/svr/students/:id", function (req, res) {
  let id = +req.params.id;
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      let arr = JSON.parse(data);
      arr = arr.find((st) => st.id === id);
      if (arr) {
        console.log(arr);
        res.send(arr);
      } else {
        res.status(404).send("Student not Found");
      }
    })
    .catch((err) => res.status(404).send("Student not FOund"));
});
app.get("/svr/students/course/:name", function (req, res) {
  let name = req.params.name;
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      let arr = JSON.parse(data);
      arr = arr.filter((st) => st.course === name);
      if (arr) {
        res.send(arr);
      } else {
        res.status(404).send("No student Found");
      }
    })
    .catch((err) => res.status(404).send("No student Found"));
});
app.post("/svr/students", function (req, res) {
  let body = req.body;
  fs.promises
    .readFile(fname, "utf-8")
    .then((data) => {
      let studentsArray = JSON.parse(data);
      let maxid = studentsArray.reduce(
        (acc, curr) => (curr.id > acc ? curr.id : acc),
        0
      );
      let newid = maxid + 1;
      let newStudent = { ...body, id: newid };
      studentsArray.push(newStudent);
      let data1 = JSON.stringify(studentsArray);
      fs.promises
        .writeFile(fname, data1)
        .then(() => {
          console.log(newStudent);
          res.send(newStudent);
        })
        .catch((err) => res.status(401).send("Inavlid"));
    })
    .catch((err) => res.status(404).send("Invalid"));
});
app.put("/svr/students/:id", function (req, res) {
  let body = req.body;
  let id = +req.params.id;
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      let arr = JSON.parse(data);
      let stu = arr.findIndex((st) => st.id === id);
      if (stu >= 0) {
        let newStu = { id, ...body };
        arr[stu] = newStu;
        console.log(arr[stu]);
        let data1 = JSON.stringify(arr);
        fs.promises
          .writeFile(fname, data1)
          .then(() => res.send(newStu))
          .catch((err) => res.status(404).send("Invalid"));
      } else {
        res.status(404).send("Student Not Found");
      }
    })
    .catch((err) => res.status(401).send("invalid"));
});
app.delete("/svr/students/:id", function (req, res) {
  let id = +req.params.id;
  fs.promises.readFile(fname, "utf8").then((data) => {
    let arr = JSON.parse(data);
    let st = arr.findIndex((t) => t.id === id);
    if (st >= 0) {
      let updateArr = arr.splice(st, 1);
      console.log(updateArr);
      let data1 = JSON.stringify(arr);
      console.log(data1);
      fs.promises
        .writeFile(fname, data1)
        .then(() => res.send(updateArr))
        .catch((err) => console.log(err));
    } else {
      res.status(404).send("No student Found");
    }
  });
});
