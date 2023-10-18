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
let { studentsData } = require("./studentData");
app.get("/svr/test", function (req, res) {
  res.send("test Response 567889");
});
app.get("/svr/students", function (req, res) {
  let courseStr = req.query.course;
  let grade = req.query.grade;
  let sort = req.query.sort;
  let arr1 = studentsData;
  if (courseStr) {
    let courseArr = courseStr.split(",");
    arr1 = arr1.filter((st) => courseArr.find((cr) => cr === st.course));
  }
  if (grade) {
    arr1 = arr1.filter((st) => st.grade === grade);
  }
  if (sort === "name") {
    arr1.sort((p1, p2) => p1.name.localeCompare(p2.name));
  }
  if (sort === "course") {
    arr1.sort((p1, p2) => p1.course.localeCompare(p2.course));
  }
  res.send(arr1);
});
app.get("/svr/students/:id", function (req, res) {
  let id = req.params.id;
  let students = studentsData.find((st) => st.id === +id);
  if (students) {
    res.send(students);
  } else {
    res.status(404).send("No student found");
  }
});
app.get("/svr/students/course/:name", function (req, res) {
  let name = req.params.name;
  let students = studentsData.filter((st) => st.course === name);
  res.send(students);
});
app.post("/svr/students", function (req, res) {
  let body = req.body;
  console.log(body);
  let maxid = studentsData.reduce(
    (acc, curr) => (curr.id >= acc ? curr.id : acc),
    0
  );
  let newid = maxid + 1;
  let newStudent = { id: newid, ...body };
  studentsData.push(newStudent);
  res.send(newStudent);
});
app.put("/svr/students/:id", function (req, res) {
  let id = +req.params.id;
  let body = req.body;
  let inx = studentsData.findIndex((st) => st.id === id);
  if (inx >= 0) {
    let updateStu = { id: id, ...body };
    studentsData[inx] = updateStu;
    res.send(updateStu);
  }
  else{
    res.status(404).send("No student Found");
  }
});
app.delete("/svr/students/:id",function(req,res){
  let id = req.params.id;
  let inx = studentsData.findIndex((st) => st.id === +id);
  if(inx>=0){
    let deletedStudent = studentsData.splice(inx,1);
    res.send(deletedStudent);
  }else res.status(404).send("No Student Found");
  
})
