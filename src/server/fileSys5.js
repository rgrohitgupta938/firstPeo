const fs = require("fs");
const readLine = require("readline-sync");
const fname = "data.json";
function createResetJSON() {
  const jsonData = { A: 0, B: 0 };
  fs.writeFile(fname, JSON.stringify(jsonData), "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("JSON data has been created/reset to {A:0, B:0}.");
    }
  });
}
function readJSON() {
  fs.readFile(fname, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
    } else {
      const jsonData = JSON.parse(data);
      console.log("Current JSON data:", jsonData);
    }
  });
}
function incrementA() {
  fs.readFile(fname, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
    } else {
      const jsonData = JSON.parse(data);
      jsonData.A += 1;
      fs.writeFile(fname, JSON.stringify(jsonData), "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("Value of A has been incremented.");
        }
      });
    }
  });
}
function incrementB() {
  fs.readFile(fname, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
    } else {
      const jsonData = JSON.parse(data);
      jsonData.B += 1;
      fs.writeFile(fname, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("Value of B has been incremented.");
        }
      });
    }
  });
}
function main() {
  console.log("Choose an option:");
  console.log("1: Create/Reset JSON data {A:0, B:0}");
  console.log("2: Read JSON data");
  console.log("3: Increment A");
  console.log("4: Increment B");
  const option = readLine.question("Enter the option number: ");
  if (option === "1") {
    createResetJSON();
  } else if (option === "2") {
    readJSON();
  } else if (option === "3") {
    incrementA();
  } else if (option === "4") {
    incrementB();
  } else {
    console.log("Invalid option.");
  }
}
main();
