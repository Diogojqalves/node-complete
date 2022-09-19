const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  console.log("another middleware");
  res.sendFile(path.join(rootDir, "..", "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  //same as use but only trigger for POST requests
  console.log(req.body); //it logs thanks to the bodyParser
  res.redirect("/");
});

module.exports = router;
