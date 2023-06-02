const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");

dotenv.config();
const app = express();

// Connect DB
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB: Connected"))
  .catch((err) => console.log(err.message));

// template engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
