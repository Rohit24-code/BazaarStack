"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerOrder = exports.getCustomerOrder = void 0;
const auth_1 = require("../../middleware/auth");
const Order_1 = require("../../models/Order");
const envelope_1 = require("../../utils/envelope");
const asyncHandler_1 = require("../../utils/asyncHandler");
const helpers_1 = require("../../utils/helpers");
const AppError_1 = require("../../utils/AppError");
const Product_1 = require("../../models/Product");
const User_1 = require("../../models/User");
exports.getCustomerOrder = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const orders = await Order_1.Order.find({ user: dbUser._id })
        .select("totalItems totalAmount paymentStatus orderStatus  paidAt deliveredAt returnedAt createdAt")
        .sort({ createdAt: -1 })
        .lean();
    res.json((0, envelope_1.ok)({
        items: orders.map((orderItem) => ({
            _id: String(orderItem._id),
            code: String(orderItem._id).slice(-8).toUpperCase(),
            totalItems: orderItem.totalItems,
            totalAmount: orderItem.totalAmount,
            paymentStatus: orderItem.paymentStatus,
            orderStatus: orderItem.orderStatus,
            paidAt: orderItem.paidAt,
            deliveredAt: orderItem.deliveredAt,
            returnedAt: orderItem.returnedAt,
            createdAt: orderItem.createdAt,
        })),
    }));
});
exports.updateCustomerOrder = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const orderId = String(req.params.orderId || "").trim();
    (0, helpers_1.requireText)(orderId, "Order Id is required");
    const order = await Order_1.Order.findOne({ _id: orderId, user: dbUser._id });
    const foundOrder = (0, helpers_1.requireFound)(order, "Order not found", 404);
    if (foundOrder.orderStatus !== "delivered" || !foundOrder.deliveredAt) {
        throw new AppError_1.AppError(400, "Only delivered orders can be returned");
    }
    const sevenDaysReturnWindowTime = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - new Date(foundOrder.deliveredAt).getTime() >
        sevenDaysReturnWindowTime) {
        throw new AppError_1.AppError(400, "Return window expired");
    }
    for (const item of foundOrder.items) {
        await Product_1.Product.updateOne({ _id: item.product }, { $inc: { stock: item.quantity } });
    }
    await User_1.User.updateOne({ _id: dbUser._id }, {
        $inc: { points: foundOrder.totalAmount },
    });
    foundOrder.orderStatus = "returned";
    foundOrder.returnedAt = new Date();
    await foundOrder.save();
    res.json((0, envelope_1.ok)({
        _id: String(foundOrder._id),
        orderStatus: foundOrder.orderStatus,
        returnedAt: foundOrder.returnedAt,
    }));
});
