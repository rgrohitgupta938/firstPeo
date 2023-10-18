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
      add2();
      break;
    case "4":
      add3();
      break;
  }
}
function createReset() {
  fs.promises
    .writeFile(fname, "0")
    .then(() => console.log("Successfully created/reset the file."))
    .catch((err) => console.error(err));
}
function add2() {
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      let data1 = +data + 2;
      fs.promises
        .writeFile(fname, data1.toString())
        .then(() => {
          console.log("2 is added in the file");
          fs.promises
            .readFile(fname, "utf8")
            .then((data) => console.log("Updated value is : ", data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
function add3() {
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => {
      let data1 = +data + 3;
      fs.promises
        .writeFile(fname, data1.toString())
        .then(() => {
          console.log("3 is added in the file");
          fs.promises
            .readFile(fname, "utf8")
            .then((data) => console.log("Updated value is : ", data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
function read() {
  fs.promises
    .readFile(fname, "utf8")
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

opDisplay();
