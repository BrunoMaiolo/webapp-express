const connection = require("../db/connection");

// INDEX
function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
}

// SHOW
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

    if (results.length === 0) {
      return res.status(404).json({ message: "Film non trovato" });
    }

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

// STORE REVIEW
function storeReview(req, res) {
  const movie_id = req.params.id;
  const { name, text, vote } = req.body;

  const sql = `
    INSERT INTO reviews (movie_id, name, text, vote)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(sql, [movie_id, name, text, vote], (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({
      message: "Recensione aggiunta",
      id: result.insertId
    });
  });
}

// EXPORT
module.exports = {
  index,
  show,
  storeReview
};