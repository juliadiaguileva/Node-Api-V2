//And this is model
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

//This is controller
//Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//Get a single product
//create function
const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    //res.status(500).json({ message: error.message });
  }
});

//refect the code to make it more clean,
//create the product
const createProduct = asyncHandler(async (req, res) => {
  //console.log(req.body);
  //res.send(req.body);
  try {
    const products = await Product.create(req.body);
    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404);
      throw new Error("cannot find product with ID ${id}");
    }
    const updatedProduct = await Product.findById;
    res.status(200).json(updatedProduct);
  } catch (error) {
    //console.log(error.message);
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404);
      throw new Error("cannot find product with ID ${id}");
      //return res
      //  .status(404)
      // .json({ message: "cannot find product with ID ${id}" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//export it out
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
