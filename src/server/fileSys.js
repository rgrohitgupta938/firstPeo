let fs = require("fs");

function getStat(filename) {
  console.log("Stat:", filename);
  fs.stat(filename, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
}
function checkAccess(filename) {
  console.log("access:", filename);
  fs.access(filename, function (err) {
    err ? console.log("Does not Exist") : console.log("Exist");
  });
}
function readFile(filename) {
  console.log("readFile:", filename);
  fs.readFile(filename, "utf-8", function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
}
function writeFile(filename, data) {
  console.log("writeFIle:", filename);0
  fs.writeFile(filename, data, function (err) {
    if (err) console.log(err);
  });
}

let fname = "text.txt";
//getStat(fname);
//checkAccess(fname);
readFile(fname);
//writeFile(fname ,"ABCHGSjk");
