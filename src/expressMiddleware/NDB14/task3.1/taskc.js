let fs = require("fs");
let readLine = require("readline-sync");
let txt = readLine.question("ENter text to be appeded : ");
let fname = readLine.question("Enter the file name : ");

async function exe(filename, data) {
  try {
    await fs.promises.access(filename);
    try {
      let data1 = await fs.promises.readFile(filename, "utf8");
      console.log("Before : ", data1);
      await fs.promises.appendFile(filename, data);
      console.log("Append Success");
      let data2 = await fs.promises.readFile(filename, "utf8");
      console.log("After : ", data2);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    await fs.promises.writeFile(filename, data);
    console.log("Write Success");
    let data3 = await fs.promises.readFile(filename, "utf8");
    console.log(data3);
  }
}
exe(fname, txt);
