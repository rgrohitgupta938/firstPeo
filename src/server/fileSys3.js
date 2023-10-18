let fs = require("fs");
let readLine = require("readline-sync");
let filePath = "value.txt";
function readValueFromFile(callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(err, 0);
    } else {
      callback(null, +data || 0);
    }
  });
}
function writeValueToFile(value, callback) {
  fs.writeFile(filePath, "" + value, "utf8", (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}
function handleOptions(option) {
  switch (option) {
    case "1":
      writeValueToFile(0, (err) => {
        if (err) {
          console.error("Error resetting value:", err);
        } else {
          console.log("Value has been reset to 0.");
        }
      });
      break;
    case "2":
      readValueFromFile((err, value) => {
        if (err) {
          console.error("Error reading value:", err);
        } else {
          console.log("Current value:", value);
        }
      });
      break;
    case "3":
      readValueFromFile((err, currentValue) => {
        if (err) {
          console.error("Error reading value:", err);
        } else {
          const incrementedValue = currentValue + 1;
          writeValueToFile(incrementedValue, (err) => {
            if (err) {
              console.error("Error writing incremented value:", err);
            } else {
              console.log("Value has been incremented to:", incrementedValue);
            }
          });
        }
      });
      break;
    case "4":
      readValueFromFile((err, currentValue) => {
        if (err) {
          console.error("Error reading value:", err);
        } else {
          const decrementedValue = currentValue - 1;
          writeValueToFile(decrementedValue, (err) => {
            if (err) {
              console.error("Error writing decremented value:", err);
            } else {
              console.log("Value has been decremented to:", decrementedValue);
            }
          });
        }
      });
      break;
    default:
      console.log("Invalid option.");
  }
}
function main() {
  console.log("Choose an option:");
  console.log("1: Create/Reset");
  console.log("2: Read");
  console.log("3: Increment");
  console.log("4: Decrement");
  const option = readLine.question("Enter the option number: ");
  handleOptions(option);
}
main();
