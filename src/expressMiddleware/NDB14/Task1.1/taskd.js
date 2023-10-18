let fs = require("fs");
let readLine = require("readline-sync");
let fname = "data.json";
let courseData = {
  course: "Node.js",
  students: [
    { name: "Jack", age: 25 },
    { name: "Steve", age: 26 },
    { name: "Anna", age: 27 },
  ],
};

function writeJson() {
  let data = JSON.stringify(courseData);
  fs.promises
    .writeFile(fname, data)
    .then(() => console.log("Write Succes"))
    .catch((err) => console.log(err));
}

function enrollNewStu() {
  let name = readLine.question("Enter name of student : ");
  let age = readLine.question("Enter age : ");
  let newStu = { name: name, age: +age };
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      let obj = JSON.parse(data);
      obj.students.push(newStu);
      let data1 = JSON.stringify(obj);
      fs.promises
        .writeFile(fname, data1)
        .then(() => console.log("New Student Enrolled"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
function readJson() {
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      console.log("In String format :  ", data);
      let obj = JSON.parse(data);
      console.log(obj);
    })
    .catch((err) => console.log(err));
}

function optDisplay() {
  let option = readLine.question(
    "ENter Option 1:Write 2: Enroll Student 3:Read "
  );
  switch (option) {
    case "1":
      writeJson();
      break;
    case "2":
      enrollNewStu();
      break;
    case "3":
      readJson();
      break;
  }
}
optDisplay();
