let mysql = require("mysql");
let connData = {
  host: "localhost",
  user: "root",
  password: "",
  database: "prodDB",
};
let { products } = require("./prodData");
function insertAllData() {
  let conn = mysql.createConnection(connData);
  let params = products.map((pr) => [
    pr.prod,
    pr.price,
    pr.quantity,
    pr.category,
  ]);
  let sql = "Insert into products (name,price,quantity,category) values ?";
  conn.query(sql, [params], function (err, result) {
    if (err) console.log(err);
    else
      console.log("All data inserted. Affected Rows : ", result.affectedRows);
  });
}
function showProducts() {
  let conn = mysql.createConnection(connData);
  let sql = "SELECT * FROM products";
  conn.query(sql, function (err, result) {
    if (err) console.log("Error in Database", err.message);
    else console.log(result);
  });
}
function showProductsByName(name) {
  let conn = mysql.createConnection(connData);
  let sql = "SELECT * FROM products WHERE name = ?";
  conn.query(sql, name, function (err, result) {
    if (err) console.log(err);
    else console.log(result);
  });
}
function showProductsByCategory(cat) {
  let conn = mysql.createConnection(connData);
  let sql = "SELECT * FROM products WHERE category = ?";
  conn.query(sql, cat, function (err, result) {
    if (err) console.log(err);
    else console.log(result);
  });
}
function showProductsByPriceVal(price) {
  let conn = mysql.createConnection(connData);
  let sql = "SELECT * FROM products WHERE price > ?";
  conn.query(sql, price, function (err, result) {
    if (err) console.log(err);
    else console.log(result);
  });
}
function insertProduct(params) {
  let conn = mysql.createConnection(connData);
  let sql =
    "Insert into products(name,price,quantity,category) values (?,?,?,?)";
  conn.query(sql, params, function (err, result) {
    if (err) console.log(err);
    else {
      console.log("Id of inserted record", result.insertId);
      let sql2 = "SELECT * FROM products";
      conn.query(sql2, function (err, result) {
        if (err) console.log(err);
        else console.log(result);
      });
    }
  });
}
function insertProducts(params) {
  let conn = mysql.createConnection(connData);
  let sql = "Insert into products(name,price,quantity,category) values ?";
  conn.query(sql, [params], function (err, result) {
    if (err) console.log(err);
    else {
      console.log("Insertion starts from if no. : ", result.insertId);
      let sql2 = "SELECT * FROM products";
      conn.query(sql2, function (err, result) {
        if (err) console.log(err);
        else console.log(result);
      });
    }
  });
}
function changeQty(id, newQty) {
  let conn = mysql.createConnection(connData);
  let sql = "Update products set quantity = ? where id = ?";
  conn.query(sql, [newQty, id], function (err, result) {
    if (err) console.log(err);
    else
      console.log(
        "Succesfully updated product quantity.Affected Rows : ",
        result.affectedRows
      );
  });
}
function decQty(id) {
  let conn = mysql.createConnection(connData);
  let sql = "Update products set quantity = quantity -1 where id = ? ";
  conn.query(sql, id, function (err, result) {
    if (err) console.log(err);
    else
      console.log(
        "Quantity is decreased for product by 1 . Affected Rows : ",
        result.affectedRows
      );
  });
}
function resetData() {
  let conn = mysql.createConnection(connData);
  let sql1 = "DELETE FROM products";
  conn.query(sql1, function (err, result) {
    if (err) console.log(err);
    else {
      console.log(
        "Successfully deleted. Afffected rows : ",
        result.affectedRows
      );
      let arr = products.map((p) => [p.prod, p.price, p.quantity, p.category]);
      let sql2 = "Insert into products (name,price,quantity,category) values ?";
      conn.query(sql2, [arr], function (err, result) {
        if (err) console.log(err);
        else {
          console.log(
            "Successfully inserted. Affected Rows : ",
            result.affectedRows
          );
        }
      });
    }
  });
}
//resetData();
//decQty(3);
//insertAllData();
showProducts();
//showProductsByName("Pepsi");
//showProductsByCategory("Food");
//showProductsByPriceVal(20);
//insertProduct(["PepsiDiet",30,56,"Beverage"]);
/*insertProducts([
  ["Munch", 10, 10, "Chocloate"],
  ["Dairy Milk", 20, 35, "Chocloate"],
  ["coca cola", 45, 78, "Drink"],
]);*/
//changeQty(1,78);
