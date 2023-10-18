let fs = require("fs");
let readLine = require("readline-sync");

let fname = "texta.txt";
let txt = readLine.question("Enter the text to be appended to file : ");

fs.promises
  .appendFile(fname, txt)
  .then(() => fs.promises.readFile(fname, "utf8"))
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
