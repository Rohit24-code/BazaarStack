"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerAddressRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const address_controllers_1 = require("../../controllers/customer/address.controllers");
exports.customerAddressRouter = (0, express_1.Router)();
exports.customerAddressRouter.use(auth_1.requireAuth);
// customer
exports.customerAddressRouter.get("/addresses", address_controllers_1.getAddressController);
exports.customerAddressRouter.post("/addresses", address_controllers_1.postAddressController);
exports.customerAddressRouter.put("/addresses/:addressId", address_controllers_1.updateAddressController);
exports.customerAddressRouter.delete("/addresses/:addressId", address_controllers_1.deleteAddressController);
