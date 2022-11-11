const express = require("express");
const router = express.Router();

const orderCtrl = require("../controllers/order");

router.post(    "/",                orderCtrl.createOrder);
router.post(    "/notification",    orderCtrl.updateOrderNotification);
router.get(     "/byId/:id",        orderCtrl.getOneOrder);
router.get(     "/:userId",         orderCtrl.getOrderByUserId);
router.get(     "/",                orderCtrl.getAllOrders);
router.put(     "/:id",             orderCtrl.updateOrderStatus);
router.delete(  "/:id",             orderCtrl.deleteOrder);


module.exports = router;