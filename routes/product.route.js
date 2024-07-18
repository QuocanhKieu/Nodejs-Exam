const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller")

router.get("/", productController.listProduct);

// Get form to create a new product (Render the new.ejs)

router.get(
  "/new",
  productController.newProduct
);

// // Create a product
router.post("/new", productController.createProduct);

// router.delete("/:id", productController.deleteProduct);


module.exports = router;