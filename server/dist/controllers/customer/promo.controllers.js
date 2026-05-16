"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPromoController = void 0;
const Promo_1 = require("../../models/Promo");
const AppError_1 = require("../../utils/AppError");
const asyncHandler_1 = require("../../utils/asyncHandler");
const envelope_1 = require("../../utils/envelope");
const helpers_1 = require("../../utils/helpers");
exports.postPromoController = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const code = String(req.body.code || "")
        .trim()
        .toUpperCase();
    const orderVal = Number(req.body.orderValue || 0);
    (0, helpers_1.requireText)(code, "Promo code is required");
    if (Number.isNaN(orderVal) || orderVal < 0) {
        throw new AppError_1.AppError(400, "Valid order value is required");
    }
    const promo = await Promo_1.Promo.findOne({ code });
    if (!promo) {
        throw new AppError_1.AppError(404, "Promo not found");
    }
    const now = new Date();
    if (now < promo.startsAt) {
        throw new AppError_1.AppError(400, "Promo code is not activated");
    }
    if (now > promo.endsAt) {
        throw new AppError_1.AppError(400, "Promo code is expired");
    }
    if (promo.code < 1) {
        throw new AppError_1.AppError(400, "Promo code limit is out of stock");
    }
    if (orderVal < promo.minimumOrderValue) {
        throw new AppError_1.AppError(400, `Minimum order value is ${promo.minimumOrderValue}`);
    }
    res.json((0, envelope_1.ok)({
        code: promo.code,
        percentage: promo.percentage,
        count: promo.count,
        minimumOrderValue: promo.minimumOrderValue,
    }));
});
