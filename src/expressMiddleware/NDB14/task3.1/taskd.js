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
async function writeJson() {
  try {
    let str = JSON.stringify(courseData);
    await fs.promises.writeFile(fname, str);
    console.log("Written JSOn");
  } catch (err) {
    console.log(err);
  }
}
async function enrollNewStu() {
  try {
    let name = readLine.question("Enter name of Student : ");
    let age = readLine.question("ENter age of Student : ");
    let newStu = { name, age };
    let data1 = await fs.promises.readFile(fname, "utf8");
    let obj = JSON.parse(data1);
    obj.students.push(newStu);
    let data2 = JSON.stringify(obj);
    await fs.promises.writeFile(fname, data2);
    console.log("Student enrolled");
  } catch (err) {
    console.log(err);
  }
}
async function readJson() {
  try {
    let data = await fs.promises.readFile(fname, "utf8");
    console.log("In string format : ", data);
    let obj = JSON.parse(data);
    console.log(obj);
  } catch (err) {
    console.log(err);
  }
}

function optDisplay() {
  let opt = readLine.question("ENter option 1:Write 2:Enroll 3:Read :- ");
  switch (opt) {
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
