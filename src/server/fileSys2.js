let fs = require("fs");
let readLine = require("readline-sync");

let fname = readLine.question("Enter name of file : ");
let txt = readLine.question("Enter text to be appended to the file : ");
fs.access(fname, function (err) {
  if (err) {
    fs.writeFile(fname, txt, function (err) {
      if (err) console.log(err);
      else {
        console.log("Write successful");
        fs.readFile(fname, "utf-8", function (err1, data1) {
          if (err1) console.log(err1);
          else console.log(data1);
        });
      }
    });
  } else {
    fs.readFile(fname, "utf-8", function (err, data) {
      if (err) console.log(err);
      else {
        console.log("Before : ", data);
        fs.appendFile(fname, txt, function (err) {
          if (err) console.log(err);
          else {
            console.log("Append Successful");
            fs.readFile(fname, "utf-8", function (err, data) {
              if (err) console.log(err);
              else console.log("After :", data);
            });
          }
        });
      }
    });
  }
});
