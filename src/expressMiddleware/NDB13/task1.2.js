const express = require("express");
let app = express();
let mysql = require("mysql");
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
app.use(requestLog);
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
let connData = {
  host: "localhost",
  user: "root",
  password: "",
  database: "new",
};
const requests = [];
function requestLog(req, res, next) {
  const data = { url: `${req.url}`, method: `${req.method}` };
  requests.push(data);
  let conn = mysql.createConnection(connData);
  let params = [[data.url, data.method]];
  let sql = "Insert into requests (url,method) values ?";
  conn.query(sql, [params], function (err, result) {
    if (err) console.log(err);
    else
      console.log("All data inserted. Affected Rows : ", result.affectedRows);
  });
  next();
}
app.get("/allRequests", function (req, res) {
  let conn = mysql.createConnection(connData);
  let sql = "select * from requests";
  conn.query(sql, function (err, result) {
    if (err) console.log(err);
    else res.send(result);
  });
});
