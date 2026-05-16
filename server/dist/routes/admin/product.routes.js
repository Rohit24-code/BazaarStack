"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const product_controllers_1 = require("../../controllers/product.controllers");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(), // keep file in ram instead of writing to disk
    limits: {
        fieldSize: 1024 * 1024 * 5,
        files: 10,
    },
});
exports.productRouter = (0, express_1.Router)();
exports.productRouter.use(auth_1.requireAuth);
exports.productRouter.get("/categories", product_controllers_1.getCategories);
exports.productRouter.post("/categories", product_controllers_1.postCategories);
exports.productRouter.put("/categories/:id", product_controllers_1.updateCategory);
// product
exports.productRouter.post("/products", upload.array("images", 10), product_controllers_1.addProduct);
exports.productRouter.put("/product/:id", upload.array("images", 10), product_controllers_1.updateProduct);
exports.productRouter.get("/products", product_controllers_1.getProducts);
exports.productRouter.get("/products/:id", product_controllers_1.getSingleProduct);
