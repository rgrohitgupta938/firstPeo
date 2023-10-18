let express = require("express");
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
var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
let mysql = require("mysql");
let connData = {
  host: "localhost",
  user: "root",
  password: "",
  database: "mobileDB",
};
app.get("/svr/mobiles", function (req, res) {
  let conn = mysql.createConnection(connData);
  let sql = "Select * from mobile";
  conn.query(sql, function (err, result) {
    if (err) res.status(404).send(err);
    else {
      res.send(result);
    }
  });
});
app.get("/svr/mobiles/brand/:brand", function (req, res) {
  let brand = req.params.brand;
  let conn = mysql.createConnection(connData);
  if (brand) {
    let sql = "Select * from mobile where brand = ?";
    conn.query(sql, brand, function (err, result) {
      if (err) res.status(404).send(err);
      else {
        res.send(result);
      }
    });
  }
});
app.get("/svr/mobiles/:id", function (req, res) {
  let id = +req.params.id;
  if (id) {
    let conn = mysql.createConnection(connData);
    let sql1 = "Select * from mobile where id = ?";
    conn.query(sql1, id, function (err, result) {
      if (err) res.status(404).send(err);
      else {
        res.send(result);
      }
    });
  }
});
app.post("/svr/mobiles", function (req, res) {
  let body = req.body;
  let brand = body.brand;
  let model = body.model;
  let price = +body.price;
  let conn = mysql.createConnection(connData);
  let sql = "INSERT INTO mobile (brand, model, price) VALUES (?,?,?)";
  conn.query(sql, [brand, model, price], function (err, result) {
    if (err) res.send(err);
    else {
      res.send(result);
    }
  });
});
app.put("/svr/mobiles/:id", function (req, res) {
  const id = req.params.id;
  const body = req.body;
  const brand = body.brand;
  const model = body.model;
  const price = +body.price;
  const conn = mysql.createConnection(connData);
  if (id) {
    const selectQuery = "SELECT * FROM mobile WHERE id = ?";
    conn.query(selectQuery, id, function (err, result) {
      if (err) {
        res.status(404).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send("Mobile with the given ID not found.");
        } else {
          const updateBrand = brand || result[0].brand;
          const updateModel = model || result[0].model;
          const updatePrice = price || result[0].price;
          const updateQuery =
            "UPDATE mobile SET brand=?, model=?, price=? WHERE id=?";
          conn.query(
            updateQuery,
            [updateBrand, updateModel, updatePrice, id],
            function (err, result) {
              if (err) {
                res.status(500).send(err);
              } else {
                res.send(result);
              }
            }
          );
        }
      }
    });
  }
});
app.delete("/svr/mobiles/:id", function (req, res) {
  const id = +req.params.id;
  if (id) {
    const conn = mysql.createConnection(connData);
    const sql = "DELETE FROM mobile WHERE id = ?";
    conn.query(sql, id, function (err, result) {
      if (err) {
        res.status(404).send(err.message);
      } else {
        res.send(result);
      }
    });
  }
});
app.get("/svr/resetData", function (req, res) {
  let conn = mysql.createConnection(connData);
  let sql1 = "DELETE FROM mobile";
  conn.query(sql1, function (err, result) {
    if (err) {
      res.status(404).send(err);
    } else {
      let { mobiles } = require("./mobilesData");
      let arr = mobiles.map((p) => [p.brand, p.model, p.price]);
      let sql2 = "INSERT INTO mobile (brand, model, price) VALUES ?";
      conn.query(sql2, [arr], function (err, result) {
        if (err) {
          res.status(404).send(err);
        } else {
          res.send(
            "Successfully reset data. Affected rows: " + result.affectedRows
          );
        }
      });
    }
  });
});
