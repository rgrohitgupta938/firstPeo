let fs = require("fs");
let readLine = require("readline-sync");

let fname = "text2.txt";
let txt = readLine.question("Enter text to be appended to file : ");
fs.appendFile(fname, txt, function (err) {
  if (err) console.log(err);
  else {
    fs.readFile(fname, "utf-8", function (err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
  }
});
