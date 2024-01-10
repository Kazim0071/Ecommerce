import Order from "../models/order.js";
import asyncHandler from "express-async-handler";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51IutRpCcy8OEmYvUq77adzYjJTDLe8TJl5UW6eg99TzYWTfIofFKeY4G30I70p7ajKhlAuw8lXfCjgpRDxAyxZUX004L1dEEEP"
);

// PATH     : /api/orders
// METHOD   : GET
// ACCESS   : Private
// DESC     : Get my orders
export const getMyOrders = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  let orders = await Order.find({ user: _id });
  res.json(orders);
});

// PATH     : /api/orders/:id
// METHOD   : GET
// ACCESS   : Private
// DESC     : Get order by id
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "name email");
  if (order) {
    if (order.user._id === req.user._id) {
      return res.json(order);
    }

    if (req.user.isAdmin) {
      return res.json(order);
    }
    res.status(403);
    throw new Error("You don't have permission to view this order.");
  } else {
    res.status(404);
    throw new Error("order not found.");
  }
});

// PATH     : /api/orders/all
// METHOD   : GET
// ACCESS   : Private
// DESC     : Get all orders
export const getAllOrders = asyncHandler(async (req, res) => {
  let orders = await Order.find({});
  res.json(orders);
});

// PATH     : /api/orders/
// METHOD   : POST
// ACCESS   : Private
// DESC     : Create new order
export const createOrder = asyncHandler(async (req, res) => {
  let {
    orderItems,
    shippingAddress,
    subTotal,
    shippingPrice,
    saleTax,
    totalPrice,
    paymentInfo,
  } = req.body;

  const user = req.user;

  await stripe.paymentIntents.create({
    amount: totalPrice * 100,
    currency: "PKR",
    confirm: true,
    payment_method: paymentInfo.id,
    description: `${user.name}(${user.email}) bought ${orderItems.length} item(s)`,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  });

  let order = new Order({
    orderItems,
    shippingAddress,
    subTotal,
    shippingPrice,
    saleTax,
    totalPrice,
    paymentInfo,
    isPaid: true,
    paidAt: new Date(),
    user: user._id,
  });

  let createdOrder = await order.save();

  res.statusCode = 201;
  res.json({ id: createdOrder._id });
});

const updateProductItems = async (orderItems) => {
  orderItems.forEach(async (orderItem) => {
    const { product, qty } = orderItem;
    //
  });
};
