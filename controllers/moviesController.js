const connection = require("../db/connection");

function index(req, res) {

  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) throw err;

    res.json(results);
  });

}

module.exports = { index };