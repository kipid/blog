const mysql = require('mysql');
const db = mysql.createConnection({
  host:'localhost',
  user:'nodejs',
  password:'123123',
  database:'opentutorials'
});
db.connect();

module.exports = db;