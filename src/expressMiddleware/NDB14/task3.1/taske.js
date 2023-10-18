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
const { studentsData } = require("./studentData");
const fname = "studentsRec.json";

app.get("/svr/resetData", async function (req, res) {
  console.log(studentsData);
  try {
    const data = JSON.stringify(studentsData);
    await fs.writeFile(fname, data);
    console.log("Reset Successful");
    res.send("Reset Successful");
  } catch (error) {
    console.error(error);
    res.status(404).send("Reset Failed");
  }
});

app.get("/svr/students", async function (req, res) {
  try {
    const data = await fs.readFile(fname, "utf8");
    const arr = JSON.parse(data);
    if (arr) {
      res.send(arr);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).send("Not Found");
  }
});

app.get("/svr/students/:id", async function (req, res) {
  const id = +req.params.id;
  try {
    const data = await fs.readFile(fname, "utf8");
    const arr = JSON.parse(data);
    const student = arr.find((st) => st.id === id);
    if (student) {
      console.log(student);
      res.send(student);
    } else {
      res.status(404).send("Student not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).send("Student not Found");
  }
});

app.get("/svr/students/course/:name", async function (req, res) {
  const name = req.params.name;
  try {
    const data = await fs.readFile(fname, "utf8");
    const arr = JSON.parse(data);
    const students = arr.filter((st) => st.course === name);
    if (students.length > 0) {
      res.send(students);
    } else {
      res.status(404).send("No student Found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).send("No student Found");
  }
});

app.post("/svr/students", async function (req, res) {
  const body = req.body;
  try {
    const data = await fs.readFile(fname, "utf-8");
    const studentsArray = JSON.parse(data);
    const maxid = studentsArray.reduce(
      (acc, curr) => (curr.id > acc ? curr.id : acc),
      0
    );
    const newid = maxid + 1;
    const newStudent = { ...body, id: newid };
    studentsArray.push(newStudent);
    const data1 = JSON.stringify(studentsArray);
    await fs.writeFile(fname, data1);
    console.log(newStudent);
    res.send(newStudent);
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid");
  }
});

app.put("/svr/students/:id", async function (req, res) {
  const body = req.body;
  const id = +req.params.id;
  try {
    const data = await fs.readFile(fname, "utf8");
    const arr = JSON.parse(data);
    const studentIndex = arr.findIndex((st) => st.id === id);
    if (studentIndex >= 0) {
      const newStudent = { id, ...body };
      arr[studentIndex] = newStudent;
      const data1 = JSON.stringify(arr);
      await fs.writeFile(fname, data1);
      console.log(arr[studentIndex]);
      res.send(newStudent);
    } else {
      res.status(404).send("Student Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid");
  }
});

app.delete("/svr/students/:id", async function (req, res) {
  const id = +req.params.id;
  try {
    const data = await fs.readFile(fname, "utf8");
    const arr = JSON.parse(data);
    const studentIndex = arr.findIndex((t) => t.id === id);
    if (studentIndex >= 0) {
      const deletedStudent = arr.splice(studentIndex, 1);
      const data1 = JSON.stringify(arr);
      await fs.writeFile(fname, data1);
      console.log(deletedStudent);
      console.log(data1);
      res.send(deletedStudent);
    } else {
      res.status(404).send("No student Found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).send("No student Found");
  }
});
