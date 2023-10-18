let fs = require("fs");
let readLine = require("readline-sync");
let txt = readLine.question("ENter text to be appended : ");
let fname = "hello.txt";

async function exe(filename, data) {
  try {
    await fs.promises.appendFile(filename, data);
    console.log("Appended success");
    let data1 = await fs.promises.readFile(filename, "utf8");
    console.log(data1);
  } catch (err) {
    console.log(err);
  }
}
exe(fname, txt);
