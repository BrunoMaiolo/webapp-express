const express = require("express");
const moviesRouter = require("./routers/moviesRouter");

const app = express();
const port = 3000;

app.use("/movies", moviesRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});