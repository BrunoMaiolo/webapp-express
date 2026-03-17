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
    SELECT 
      movies.*,
      reviews.id AS review_id,
      reviews.name,
      reviews.text
    FROM movies
    LEFT JOIN reviews
      ON reviews.movie_id = movies.id
    WHERE movies.id = ?
  `;

  connection.query(sql, [id], (err, results) => {
    if (err) throw err;

    //  se non trova nulla
    if (results.length === 0) {
      return res.status(404).json({ message: "Film non trovato" });
    }

    // costruisco oggetto film
    const movie = {
      id: results[0].id,
      title: results[0].title,
      director: results[0].director,
      genre: results[0].genre,
      release_year: results[0].release_year,
      abstract: results[0].abstract,
      image: results[0].image,
      reviews: []
    };

    //  aggiungo recensioni
    results.forEach(row => {
      if (row.review_id) {
        movie.reviews.push({
          id: row.review_id,
          name: row.name,
          text: row.text
        });
      }
    });

    res.json(movie);
  });
}

module.exports = { index, show };