let fs = require("fs").promises;
let readLine = require("readline-sync");
let fname = "test1.txt";
async function opDisplay() {
  const opt = readLine.question(
    "Enter options 1:Create/Reset 2:Read 3:Add 2  4:Add 3 :-"
  );
  switch (opt) {
    case "1":
      await createReset();
      break;
    case "2":
      await read();
      break;
    case "3":
      await add2();
      break;
    case "4":
      await add3();
      break;
  }
}
async function createReset() {
  try {
    await fs.writeFile(fname, "0");
    console.log("Successfully created/reset the file.");
  } catch (err) {
    console.error(err);
  }
}

async function add2() {
  try {
    const data = await fs.readFile(fname, "utf8");
    const data1 = +data + 2;
    await fs.writeFile(fname, data1.toString());
    console.log("2 is added in the file");
    const updatedData = await fs.readFile(fname, "utf8");
    console.log("Updated value is:", updatedData);
  } catch (err) {
    console.error(err);
  }
}

async function add3() {
  try {
    const data = await fs.readFile(fname, "utf8");
    const data1 = +data + 3;
    await fs.writeFile(fname, data1.toString());
    console.log("3 is added in the file");
    const updatedData = await fs.readFile(fname, "utf8");
    console.log("Updated value is:", updatedData);
  } catch (err) {
    console.error(err);
  }
}

async function read() {
  try {
    const data = await fs.readFile(fname, "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

opDisplay();
