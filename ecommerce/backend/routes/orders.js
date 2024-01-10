import express from "express";
import {
  getMyOrders,
  getOrderById,
  getAllOrders,
  createOrder,
} from "../controllers/orders.js";
import { adminHandler, authHandler } from "../middlewares/authHandler.js";
const router = express.Router();

router.get("/", authHandler, getMyOrders);
router.get("/:id", authHandler, getOrderById);
router.get("/all", authHandler, adminHandler, getAllOrders);
router.post("/", authHandler, createOrder);

export default router;
