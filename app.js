const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");

const app = express();

// Connect DB
mongoose
  .connect("mongodb://127.0.0.1/smart-edu", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB: Connected"));
// .catch((err) => console.log(err.message));

// template engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));

//Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
