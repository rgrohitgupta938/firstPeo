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
  database: "EmployeeDB",
};
const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "RgrohitG@938",
  database: "postgres",
  port: 5432,
  host: "db.ybwkusxubwtotgyapcob.supabase.co",
  ssl: { rejectUnauthorized: false },
});
client.connect(function (res, error) {
  console.log(`Connected!!!`);
});
app.get("/svr/employees", function (req, res) {
  let conn = mysql.createConnection(connData);
  let sql = "select * from employee";
  conn.query(sql, function (err, result) {
    if (err) res.status(404).send(result.message);
    else {
      res.send(result);
    }
  });
});
app.get("/svr/employees/:id", function (req, res) {
  let id = +req.params.id;
  let conn = mysql.createConnection(connData);
  let sql = "select * from employee where empCode=?";
  conn.query(sql, id, function (err, result) {
    if (err) res.status(404).send(result);
    else {
      res.send(result);
    }
  });
});
app.get("/svr/employees/dept/:dept", function (req, res) {
  let dept = req.params.dept;
  let conn = mysql.createConnection(connData);
  let sql = "select * from employee where department = ?";
  conn.query(sql, dept, function (err, result) {
    if (err) res.status(404).send(result.message);
    else {
      res.send(result);
    }
  });
});
app.get("/svr/employees/desig/:desig", function (req, res) {
  let desig = req.params.desig;
  let conn = mysql.createConnection(connData);
  let sql = "select * from employee where designation = ?";
  conn.query(sql, desig, function (err, result) {
    if (err) res.status(404).send(err);
    else {
      res.send(result);
    }
  });
});
app.get("/svr/resetData", function (req, res) {
  let conn = mysql.createConnection(connData);
  let sql1 = "DELETE FROM employee";
  conn.query(sql1, function (err, result) {
    if (err) {
      res.status(404).send(result.message);
    } else {
      let { employees } = require("./empData");
      let arr = employees.map((p) => [
        p.empCode,
        p.name,
        p.department,
        p.designation,
        p.salary,
        p.gender,
      ]);
      let sql2 =
        "INSERT INTO employee (empCode,name,department, designation, salary,gender) VALUES ?";
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
app.post("/svr/employees", function (req, res, next) {
  console.log("Request Body:", req.body);
  let { empCode, name, department, designation, salary, gender } = req.body;
  if (
    !empCode ||
    !name ||
    !department ||
    !designation ||
    salary === undefined ||
    !gender
  ) {
    res.status(400).send("Invalid data. Please provide all required fields.");
    return;
  }
  const insertQuery =
    "INSERT INTO employee (empcode, name, department, designation, salary, gender) VALUES ($1, $2, $3, $4, $5, $6)";
  const values = [empCode, name, department, designation, salary, gender];
  client.query(insertQuery, values, function (err, result) {
    if (err) {
      console.error("Error while inserting data:", err);
      res.status(500).send("An error occurred while inserting data.");
    } else {
      console.log(result);
      res.send(`${result.rowCount} insertion Successful`);
    }
  });
});

app.put("/svr/employees/:id", function (req, res) {
  const id = +req.params.id;
  const body = req.body;
  const name = body.name;
  const designation = body.designation;
  const department = body.department;
  const gender = body.gender;
  const salary = +body.salary;
  const conn = mysql.createConnection(connData);
  if (id) {
    const selectQuery = "SELECT * FROM employee WHERE empCode = ?";
    conn.query(selectQuery, id, function (err, result) {
      if (err) {
        res.status(404).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send("Employee with the given ID not found.");
        } else {
          const updateName = name || result[0].name;
          const updateDepartment = department || result[0].department;
          const updateDesignation = designation || result[0].designation;
          const updateGender = gender || result[0].gender;
          const updateSalary = salary || result[0].gender;
          const updateQuery =
            "UPDATE employee SET name=?, department=?, designation=?,gender=?,salary=? WHERE empCode=?";
          conn.query(
            updateQuery,
            [
              updateName,
              updateDepartment,
              updateDesignation,
              updateGender,
              updateSalary,
              id,
            ],
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
app.delete("/svr/employees/del/:id", function (req, res) {
  const id = +req.params.id;
  if (id) {
    const conn = mysql.createConnection(connData);
    const sql = "DELETE FROM employee WHERE empCode = ?";
    conn.query(sql, id, function (err, result) {
      if (err) {
        res.status(404).send(err.message);
      } else {
        res.send(result.affectedRows);
      }
    });
  }
});
