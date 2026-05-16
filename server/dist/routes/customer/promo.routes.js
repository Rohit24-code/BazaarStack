"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerPromoRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const promo_controllers_1 = require("../../controllers/customer/promo.controllers");
exports.customerPromoRouter = (0, express_1.Router)();
exports.customerPromoRouter.use(auth_1.requireAuth);
exports.customerPromoRouter.post("/promos/apply", promo_controllers_1.postPromoController);
