let fs = require("fs");
let readLine = require("readline-sync");
let fname = "test.txt";
function opDisplay() {
  let opt = readLine.question(
    "Enter options 1:Create/Reset 2:Read 3:Add 2  4:Add 3 :-"
  );
  switch (opt) {
    case "1":
      createReset();
      break;
    case "2":
      read();
      break;
    case "3":
      addPoint();
      break;
  }
}
function createReset() {
  let data = [
    { x: 2, y: 3 },
    { x: -4, y: 10 },
    { x: 0, y: 0 },
    { x: 6, y: -1 },
  ];
  let data1 = JSON.stringify(data);
  fs.promises
    .writeFile(fname, data1)
    .then(() => console.log("Successfully created/reset the file."))
    .catch((err) => console.error(err));
}
function addPoint() {
  let n1 = readLine.question("Enter point x : ");
  let n2 = readLine.question("Enter point y : ");
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      let data1 = JSON.parse(data);
      let newPoint = { x: +n1, y: +n2 };
      data1.push(newPoint);
      fs.promises
        .writeFile(fname, JSON.stringify(data1))
        .then(() => {
          console.log("New point is added");
          fs.promises
            .readFile(fname, "utf8")
            .then((data) => {
              let data1 = JSON.parse(data);
              console.log("Updated points Array : ", data1);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
function read() {
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      let data1 = JSON.parse(data);
      console.log(data1);
    })
    .catch((err) => console.log(err));
}

opDisplay();
