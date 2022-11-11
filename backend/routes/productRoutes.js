const express = require("express");
const { getProducts, getProduct } = require("../controller/productController");
const router = express.Router();

router.route("/products").get(getProducts);

router.route("/products/:id").get(getProduct);

module.exports = router;
