let fs = require("fs").promises;
let readLine = require("readline-sync");
let fname = "test.txt";
async function opDisplay() {
  let opt = readLine.question(
    "Enter options  1:Create/Reset 2:Read 3:Add a Point"
  );
  switch (opt) {
    case "1":
      await createReset();
      break;
    case "2":
      await read();
      break;
    case "3":
      await addPoint();
      break;
  }
}
async function createReset() {
  try {
    let data = [
      { x: 2, y: 3 },
      { x: -4, y: 10 },
      { x: 0, y: 0 },
      { x: 6, y: -1 },
    ];
    let data1 = JSON.stringify(data);
    await fs.writeFile(fname, data1);
    console.log("Successfully created/reset the file.");
  } catch (err) {
    console.error(err);
  }
}
async function addPoint() {
  try {
    let n1 = readLine.question("Enter point x : ");
    let n2 = readLine.question("Enter point y : ");
    let data = await fs.readFile(fname, "utf8");
    let data1 = JSON.parse(data);
    let newPoint = { x: +n1, y: +n2 };
    data1.push(newPoint);
    await fs.writeFile(fname, JSON.stringify(data1));
    console.log("New point is added");
    let updatedData = await fs.readFile(fname, "utf8");
    let updatedPoints = JSON.parse(updatedData);
    console.log("Updated points Array:", updatedPoints);
  } catch (err) {
    console.error(err);
  }
}
async function read() {
  try {
    let data = await fs.readFile(fname, "utf8");
    let data1 = JSON.parse(data);
    console.log(data1);
  } catch (err) {
    console.error(err);
  }
}

opDisplay();
