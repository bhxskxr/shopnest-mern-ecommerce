const express = require('express');
const { createdOrder, verifypayment } = require("../controllers/paymentController");
const router = express.Router();

router.post("/order", createdOrder);
router.post("/verify", verifypayment);

module.exports = router;
