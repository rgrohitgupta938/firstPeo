let fs = require("fs");
function getStat(filename) {
  console.log("Stat : ", filename);
  fs.promises
    .stat(filename)
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}
function checkAccess(filename) {
  console.log(filename);
  fs.promises
    .access(filename)
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}
function readFile(filename) {
  console.log("readFile : ", filename);
  fs.promises
    .readFile(filename, "utf8")
    .then((result) => console.log("File Content :", result))
    .catch((err) => console.log(err));
}
function writeFile(filename, data) {
  console.log("writeFile : ", filename);
  fs.promises.writeFile(filename, data).catch((err) => console.log(err));
}
function appendFile(filename, data) {
  console.log("writeFile : ", filename);
  fs.promises.appendFile(filename, data).catch((err) => console.log(err));
}
let fname = "texta.txt";
//getStat(fname);
//checkAccess(fname);
readFile(fname);
//writeFile(fname,"kdcjdscv");
appendFile(fname, "abjhkscjhdc");
readFile(fname);
