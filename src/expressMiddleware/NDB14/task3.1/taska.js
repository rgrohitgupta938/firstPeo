let fs = require("fs");

async function readFile(filename) {
  try {
    let data = await fs.promises.readFile(fname, "utf8");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
async function writeFile(filename, txt) {
  try {
    await fs.promises.writeFile(filename, txt);
    console.log("Write success");
  } catch (err) {
    console(err);
  }
}
async function getstat(filename) {
  try {
    let status = await fs.promises.stat(filename);
    console.log(status);
  } catch (err) {
    console.log(err);
  }
}
async function checkAccess(filename) {
  try {
    await fs.promises.access(filename);
    console.log("File exist");
  } catch (err) {
    console.log("FIle does not exist");
  }
}
async function appendFile(filename, data) {
  try {
    await fs.promises.appendFile(filename, data);
    console.log("Append Success");
  } catch (err) {
    console.log(err);
  }
}

let fname = "hello.txt";
//writeFile(fname, "Hello");
//readFile(fname);
//appendFile(fname, "12345");
//checkAccess(fname);
getstat(fname);
