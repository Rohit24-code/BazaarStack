"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDashboard = void 0;
const Category_1 = require("../../models/Category");
const Order_1 = require("../../models/Order");
const Product_1 = require("../../models/Product");
const asyncHandler_1 = require("../../utils/asyncHandler");
const envelope_1 = require("../../utils/envelope");
exports.adminDashboard = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const [totalProducts, totalCategories, totalOrders, totalReturnedOrders, salesRows,] = await Promise.all([
        Product_1.Product.countDocuments(),
        Category_1.Category.countDocuments(),
        Order_1.Order.countDocuments(),
        Order_1.Order.countDocuments({ orderStatus: "returned" }),
        Order_1.Order.aggregate([
            { $match: { paymentStatus: "paid" } },
            { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } },
        ]),
    ]);
    res.json((0, envelope_1.ok)({
        totalProducts,
        totalCategories,
        totalSales: salesRows[0]?.totalSales || 0,
        totalOrders,
        totalReturnedOrders,
    }));
});
