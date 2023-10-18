let mysql = require("mysql");
let connData = {
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
};
function showPersons() {
  let conn = mysql.createConnection(connData);
  let sql = "SELECT * FROM persons";
  conn.query(sql, function (err, result) {
    if (err) console.log("Error in Database", err.message);
    else console.log(result);
  });
}
function showPersonsByName(name) {
  let conn = mysql.createConnection(connData);
  let sql = "SELECT * FROM persons WHERE name = ?";
  conn.query(sql, name, function (err, result) {
    if (err) console.log(err);
    else console.log(result);
  });
}
function insertPerson(params) {
  let conn = mysql.createConnection(connData);
  let sql = "Insert into persons(name,age) values (?,?)";
  conn.query(sql, params, function (err, result) {
    if (err) console.log(err);
    else {
      console.log("Id of inserted record", result.insertId);
      let sql2 = "SELECT * FROM persons";
      conn.query(sql2, function (err, result) {
        if (err) console.log(err);
        else console.log(result);
      });
    }
  });
}
function insertPersons(params) {
  let conn = mysql.createConnection(connData);
  let sql = "INSERT INTO persons(name,age) VALUES ?";
  conn.query(sql, [params], function (err, result) {
    if (err) console.log(err);
    else console.log(result);
  });
}
function incrAge(id) {
  let conn = mysql.createConnection(connData);
  let sql = "UPDATE persons SET age=age+1 WHERE id=?";
  conn.query(sql, id, function (err, result) {
    if (err) console.log(err);
    else console.log(result);
  });
}

function changeAge(id, newAge) {
  let conn = mysql.createConnection(connData);
  let sql = "UPDATE persons SET age=? WHERE id=?";
  conn.query(sql, [newAge, id], function (err, result) {
    if (err) console.log(err);
    else console.log(result);
  });
}
function resetData() {
  let conn = mysql.createConnection(connData);
  let sql1 = "DELETE FROM persons";
  conn.query(sql1, function (err, result) {
    if (err) console.log(err);
    else {
      console.log(
        "Successfully deleted. Afffected rows : ",
        result.affectedRows
      );
      let { persons } = require("./testData");
      let arr = persons.map((p) => [p.name, p.age]);
      let sql2 = "Insert into persons (name,age) values ?";
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
//changeAge(3,33);
//incrAge(5);
//resetData();
/*insertPersons([
  ["Jim", 30],
  ["Amy", 77],
  ["Steven", 24],
]);*/
//insertPerson(["giisf", 56]);
//showPersonsByName("Bob");
showPersons();
