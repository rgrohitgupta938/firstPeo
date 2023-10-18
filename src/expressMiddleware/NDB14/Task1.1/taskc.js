let fs = require("fs");
let readLine = require("readline-sync");

function writeAppend() {
  let fname = readLine.question("Enter name of file : ");
  let txt = readLine.question("Enter the text to be appended to file: ");
  fs.promises
    .access(fname)
    .then(() =>
      fs.promises
        .readFile(fname, "utf8")
        .then((result) => {
          console.log("Before : ", result);
          fs.promises.appendFile(fname, txt).then(() => {
            console.log("Append Success");
            fs.promises
              .readFile(fname, "utf8")
              .then((result) => console.log("After :", result));
          });
        })
        .catch((err) => console.log(err))
    )
    .catch((err) =>
      fs.promises
        .writeFile(fname, txt)
        .then(() => {
          console.log("Write SCueess");
          fs.promises
            .readFile(fname, "utf8")
            .then((result) => console.log(result));
        })
        .catch((err) => console.log(err))
    );
}
writeAppend();
