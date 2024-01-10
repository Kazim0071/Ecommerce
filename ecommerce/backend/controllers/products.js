import Product from "../models/product.js";
import asyncHandler from "express-async-handler";

// PATH     : /api/products
// METHOD   : GET
// ACCESS   : Public
// DESC     : Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  let products = await Product.find({});
  res.json(products);
});

// PATH     : /api/products/:id
// METHOD   : GET
// ACCESS   : Public
// DESC     : Get product by id
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// PATH     : /api/products
// METHOD   : POST
// ACCESS   : Private Admin
// DESC     : Create Product
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Product Name",
    price: 0,
    description: "Add Description",
    category: "Clothes",
    fabric: "Cotton",
    color: "White",
    image: "",
    countInStock: 0,
    user: req.user._id,
  });
  const savedProduct = await product.save();
  res.json({ _id: savedProduct._id });
});

// PATH     : /api/products/:id
// METHOD   : PUT
// ACCESS   : Private Admin
// DESC     : Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }
  product.name = data.name;
  product.price = data.price;
  product.description = data.description;
  product.category = data.category;
  product.color = data.color;
  product.fabric = data.fabric;
  product.image = data.image;
  product.countInStock = data.countInStock;
  product.user = req.user._id;
  const savedProduct = await product.save();
  res.json(savedProduct);
});
