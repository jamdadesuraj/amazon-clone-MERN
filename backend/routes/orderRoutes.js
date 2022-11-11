const express = require("express");
const {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require("../controller/orderController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// getUser Order
router.route("/myorders").get(protect, getMyOrders);

//craete new order
router.route("/").post(protect, addOrderItem);

// get order by id
router.route("/:id").get(protect, getOrderById);

// update order
router.route("/:id/pay").put(protect, updateOrderToPaid);

module.exports = router;
