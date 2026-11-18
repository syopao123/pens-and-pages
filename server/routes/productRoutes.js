const express = require("express");
const productController = require("../controllers/productController");
const { verify,verifyAdmin } = require("../auth");

const router = express.Router();

router.get("/all", verify, verifyAdmin, productController.getAll);
router.get("/active", productController.getAllActive);
router.post("/", verify, verifyAdmin, productController.addProduct);
router.get("/:productId", productController.getProduct);
router.patch("/:productId/update", verify, verifyAdmin, productController.updateProduct);
router.patch("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);
router.patch("/:productId/activate", verify, verifyAdmin, productController.activateProduct);
router.post("/search-by-name", productController.searchByProductName);
router.post("/search-by-price", productController.searchByProductPrice);

module.exports = router;