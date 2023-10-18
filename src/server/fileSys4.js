let fs = require("fs");
let readLine = require("readline-sync");
let fname = "studentFile.txt";
let courseData = {
  course: "Node.js",
  students: [
    { name: "Jack", age: 25 },
    { name: "Steve", age: 26 },
    { name: "Anna", age: 27 },
  ],
};
function writeJson() {
  let str = JSON.stringify(courseData);
  fs.writeFile(fname, str, function (err) {
    if (err) console.log(err);
  });
}
function addNewStudent() {
  let name = readLine.question("Enter student name : ");
  let age = readLine.question("Enter Student age : ");
  let newStudent = { name: name, age: +age };
  fs.readFile(fname, "utf-8", function (err, data) {
    if (err) console.log(err);
    else {
      let obj = JSON.parse(data);
      obj.students.push(newStudent);
      let data1 = JSON.stringify(obj);
      fs.writeFile(fname, data1, function (err) {
        if (err) console.log(err);
        else console.log("New Student added");
      });
    }
  });
}
function readJson() {
  fs.readFile(fname, "utf-8", function (err, data) {
    if (err) console.log(err);
    else {
      let obj = JSON.parse(data);
      console.log(obj);
    }
  });
}
let options = readLine.question("Enter option 1:Write 2:Enroll 3:Read  ");
switch (options) {
  case "1":
    writeJson();
    break;
  case "2":
    addNewStudent();
    break;
  case "3":
    readJson();
    break;
}
