"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutConfirm = exports.checkoutCreateSession = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_1 = require("../../middleware/auth");
const helpers_1 = require("../../utils/helpers");
const Cart_1 = require("../../models/Cart");
const AppError_1 = require("../../utils/AppError");
const Product_1 = require("../../models/Product");
const razorpay_1 = require("../../utils/razorpay");
const Order_1 = require("../../models/Order");
const User_1 = require("../../models/User");
const Promo_1 = require("../../models/Promo");
const envelope_1 = require("../../utils/envelope");
const crypto_1 = __importDefault(require("crypto"));
exports.checkoutCreateSession = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const addressId = String(req.body.addressId || "").trim();
    const promoCode = String(req.body.promoCode || "")
        .trim()
        .toUpperCase();
    (0, helpers_1.requireText)(addressId, "Address is required");
    //get user and cart info
    const [user, cart] = await Promise.all([
        User_1.User.findById(dbUser._id)
            .select("name email addresses")
            .lean(),
        Cart_1.Cart.findOne({ user: dbUser._id }).select("items").lean(),
    ]);
    const foundUser = (0, helpers_1.requireFound)(user, "user not found", 404);
    const foundCart = (0, helpers_1.requireFound)(cart, "Cart not found", 404);
    if (!foundCart.items.length) {
        throw new AppError_1.AppError(400, "Cart is empty");
    }
    const selectedAddress = foundUser.addresses.find((item) => String(item._id) === addressId);
    if (!selectedAddress) {
        throw new AppError_1.AppError(404, "Address not found!!");
    }
    const products = await Product_1.Product.find({
        _id: { $in: foundCart.items.map((item) => item.product) },
    })
        .select("price salePercentage stock status")
        .lean();
    const productMap = new Map(products.map((item) => [String(item._id), item]));
    let totalItems = 0;
    let subTotal = 0;
    const items = foundCart.items.map((cartItem) => {
        const product = productMap.get(String(cartItem.product));
        if (!product || product.status !== "active") {
            throw new AppError_1.AppError(400, "One or more cart items are not avaibale");
        }
        if (product.stock < cartItem.quantity) {
            throw new AppError_1.AppError(400, "Cart items are out of stock");
        }
        const finalPrice = product.salePercentage
            ? Math.round(product.price - (product.price * product.salePercentage) / 100)
            : product.price;
        totalItems += cartItem.quantity;
        subTotal += finalPrice * cartItem.quantity;
        return {
            product: cartItem.product,
            quantity: cartItem.quantity,
        };
    });
    let appliedPromoCode = "";
    let discountAmount = 0;
    if (promoCode) {
        const promo = await Promo_1.Promo.findOne({ code: promoCode })
            .select("code percentage count minimumOrderValue startsAt endsAt")
            .lean();
        const foundPromo = (0, helpers_1.requireFound)(promo, "Promo not found", 404);
        const now = new Date();
        if (now < foundPromo.startsAt ||
            now > foundPromo.endsAt ||
            foundPromo.count < 1) {
            throw new AppError_1.AppError(400, "promo code is not active");
        }
        if (subTotal < foundPromo.minimumOrderValue) {
            throw new AppError_1.AppError(400, "Minimum order value for this promo is not at the threesold");
        }
        appliedPromoCode = foundPromo.code;
        discountAmount = Math.round((subTotal * foundPromo.percentage) / 100);
    }
    const totalAmount = Math.max(subTotal - discountAmount, 0);
    const razorpayOrder = await razorpay_1.razorpay.orders.create({
        amount: (0, razorpay_1.toSubUnits)(totalAmount),
        currency: "INR",
        receipt: `Order_${Date.now()}`,
    });
    const deliveryAddress = [
        selectedAddress.address,
        selectedAddress.state,
        selectedAddress.postalCode,
    ]
        .filter(Boolean)
        .join(", ");
    const order = await Order_1.Order.create({
        user: dbUser._id,
        customerName: foundUser.name || selectedAddress.fullName,
        customerEmail: foundUser.email || "",
        items,
        totalItems,
        deliveryName: selectedAddress.fullName,
        deliveryAddress,
        promoCode: appliedPromoCode,
        discountAmount,
        totalAmount,
        paymentStatus: "pending",
        orderStatus: "placed",
        razorpayOrderId: razorpayOrder.id,
    });
    res.json((0, envelope_1.ok)({
        razorpay: {
            keyId: process.env.RAZORPAY_KEY_ID,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
        },
        order: {
            _id: String(order._id),
            totalItems,
            discountAmount,
            totalAmount,
        },
    }));
});
exports.checkoutConfirm = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const orderId = String(req.body.orderId || "").trim();
    const razorpayPaymentId = String(req.body.razorpay_payment_id || "").trim();
    const razorpayOrderId = String(req.body.razorpay_order_id || "").trim();
    const razorpaySignature = String(req.body.razorpay_signature || "").trim();
    (0, helpers_1.requireText)(orderId, "Order id is needed");
    (0, helpers_1.requireText)(razorpayPaymentId, "razorpayPaymentId is needed");
    (0, helpers_1.requireText)(razorpayOrderId, "razorpayOrderId is needed");
    (0, helpers_1.requireText)(razorpaySignature, "razorpaySignature is needed");
    const order = await Order_1.Order.findOne({ _id: orderId, user: dbUser._id });
    const foundOrder = (0, helpers_1.requireFound)(order, "Order not found", 404);
    if (foundOrder.paymentStatus === "paid") {
        res.json((0, envelope_1.ok)({ _id: String(foundOrder._id) }));
        return;
    }
    if (foundOrder.razorpayOrderId !== razorpayOrderId) {
        throw new AppError_1.AppError(400, "Order id mismatch");
    }
    const signature = crypto_1.default
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");
    if (signature !== razorpaySignature) {
        throw new AppError_1.AppError(400, "Invalid payment signature");
    }
    for (const item of foundOrder.items) {
        const updated = await Product_1.Product.updateOne({
            _id: item.product,
            stock: { $gte: item.quantity },
        }, {
            $inc: { stock: -item.quantity },
        });
        if (!updated.matchedCount) {
            throw new AppError_1.AppError(400, "One or more cart items are out of stock");
        }
    }
    if (foundOrder.promoCode) {
        await Promo_1.Promo.updateOne({
            code: foundOrder.promoCode,
            count: { $gt: 0 },
        }, {
            $inc: { count: -1 },
        });
    }
    await Cart_1.Cart.updateOne({ user: dbUser._id }, { $set: { items: [] } });
    foundOrder.paymentStatus = "paid";
    foundOrder.paymentId = razorpayPaymentId;
    foundOrder.paidAt = new Date();
    await foundOrder.save();
    res.json((0, envelope_1.ok)({ _id: String(foundOrder._id) }));
});
