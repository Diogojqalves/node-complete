const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

app.use(bodyParser.urlencoded({ extended: false })); //parse the form body
app.use(express.static(path.join(__dirname, "public"))); //allow to link css files on the html files | serving files statically

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  //add middleware
  console.log("this always runs");
  next(); //if we don´t call next the journey dies; allows the request to continue to the next middleware in line
});

//error page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
