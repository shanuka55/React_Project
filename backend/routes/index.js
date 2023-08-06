const express = require('express');
const router = express.Router();
const CustomerRoutes = require('./CustomerRoutes');
const ItemRoutes = require('./ItemRoutes');
const OrderRoutes = require('./OrderRoutes');

const url_prefix = "/api/v1";

router.use(`${url_prefix}/customer`, new CustomerRoutes().getRouter());
router.use(`${url_prefix}/item`, new ItemRoutes().getRouter());
router.use(`${url_prefix}/order`, new OrderRoutes().getRouter());
module.exports = router;