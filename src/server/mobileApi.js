let express = require("express");
const { mobiles } = require("./mobileData");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

app.get("/svr/mobiles", function (req, res) {
  let ram = req.query.ram;
  let rom = req.query.rom;
  let brand = req.query.brand;
  let color = req.query.color;
  let arr1 = mobiles;
  if (ram) {
    arr1 = mobiles.filter((mob) => mob.RAM.includes(ram));
  }
  if (rom) {
    arr1 = mobiles.filter((mob) => mob.ROM.includes(rom));
  }
  if (color) {
    arr1 = mobiles.filter((mob) => mob.colors.includes(color));
  }
  if (brand) {
    arr1 = mobiles.filter((mob) => mob.brand === brand);
  }
  res.send(arr1);
});
app.get("/svr/mobiles/:name", function (req, res) {
  let name = req.params.name;
  let mobile = mobiles.find((mob) => mob.name === name);
  if (name) {
    res.send(mobile);
  } else {
    res.status(404).send("No Mobile Found");
  }
});
app.get("/svr/mobiles/brand/:brandName", function (req, res) {
  let brandName = req.params.brandName;
  let arr1 = mobiles;
  if (brandName) {
    arr1 = mobiles.filter((mob) => mob.brand === brandName);
  }
  res.send(arr1);
});
app.get("/svr/mobiles/color/:color", function (req, res) {
  let color = req.params.color;
  let arr1 = mobiles;
  if (color) {
    arr1 = mobiles.filter((mob) => mob.colors.includes(color));
  }
  res.send(arr1);
});
app.get("/svr/mobiles/RAM/:ramSize", function (req, res) {
  let ramSize = req.params.ramSize;
  let arr1 = mobiles;
  if (ramSize) {
    arr1 = mobiles.filter((mob) => mob.RAM.includes(ramSize));
  }
  res.send(arr1);
});
app.get("/svr/mobiles/ROM/:romSize", function (req, res) {
  let romSize = req.params.romSize;
  let arr1 = mobiles;
  if (romSize) {
    arr1 = mobiles.filter((mob) => mob.ROM.includes(romSize));
  }
  res.send(arr1);
});
