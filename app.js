const express = require("express");

const app = express();

// template engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));

//Routes
app.get("/", (req, res) => {
  res.status(200).render("index", { pageName: "index" });
});

app.get("/about", (req, res) => {
  res.status(200).render("about", { pageName: "about" });
});

const port = 3000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
