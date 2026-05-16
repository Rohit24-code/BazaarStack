"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerProductRouter = void 0;
const express_1 = require("express");
const product_controllers_1 = require("../../controllers/customer/product.controllers");
exports.customerProductRouter = (0, express_1.Router)();
exports.customerProductRouter.get("/categories", product_controllers_1.customerCategoriesController);
exports.customerProductRouter.get("/products", product_controllers_1.customerProductController);
exports.customerProductRouter.get("/products/:id", product_controllers_1.customerProductDetailsController);
