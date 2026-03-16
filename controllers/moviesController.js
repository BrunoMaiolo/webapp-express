const connection = require("../db/connection");

function index(req, res) {

  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) throw err;

    res.json(results);
  });

}

function show(req, res) {

  const id = req.params.id;
  const sql = "SELECT * FROM movies WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) throw err;

    res.json(results[0]);
  });
}

module.exports = { index, show };