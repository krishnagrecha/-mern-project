const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");


// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "no items in checkout" });
  }
try {
  // Create a new checkout session
  const newCheckout = await Checkout.create({
    user: req.user._id,
    checkoutItems: checkoutItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentStatus: "Pending",
    isPaid: false,
  });
  console.log(`Checkout created for user: ${req.user._id}`);
  res.status(201).json(newCheckout);
} catch (error) {}
});