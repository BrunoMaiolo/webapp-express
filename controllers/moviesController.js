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
  const sql = `
   SELECT movies.*, reviews.*
   FROM movies
   LEFT JOIN reviews
   ON reviews.movie_id = movies.id
   WHERE movies.id = ?
   `;

  connection.query(sql, [id], (err, results) => {
    if (err) throw err;

    res.json(results);
  });
}

module.exports = { index, show };