const express = require("express");
const pageRoute = require("./routes/pageRoute");
const app = express();

// template engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));

//Routes
app.use("/", pageRoute);

const port = 3000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
