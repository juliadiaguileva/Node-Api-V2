const express = require("express");
const Product = require("../models/productModel");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

//use router insted of app
const router = express.Router();

//Get products by app.get
router.get("/", getProducts);

//Fetch product by id with app.get
router.get("/:id", getProduct);

//Create products by app.post
router.post("/", createProduct);

//Update product by app.put
router.put("/:id", updateProduct);

//Delete product by app.delete
router.delete("/:id", deleteProduct);

//export all routers out of this file
module.exports = router;
