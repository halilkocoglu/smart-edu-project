const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");

const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const authRoute = require("./routes/authRoute");

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

// Global Variable
//  if global var is equal to null mean no one is logged in.

global.userIN = null;

// Middleware

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "a_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URI }),
  })
);

//Routes

app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});

app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/auth", authRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
