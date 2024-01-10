import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/products.js";
import { adminHandler, authHandler } from "../middlewares/authHandler.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authHandler, adminHandler, createProduct);
router.put("/:id", authHandler, adminHandler, updateProduct);

export default router;
