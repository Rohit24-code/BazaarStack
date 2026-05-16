"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePromoController = exports.updatePromoController = exports.postPromoController = exports.getPromoController = void 0;
const constants_1 = require("../../constants");
const Promo_1 = require("../../models/Promo");
const AppError_1 = require("../../utils/AppError");
const asyncHandler_1 = require("../../utils/asyncHandler");
const envelope_1 = require("../../utils/envelope");
const helpers_1 = require("../../utils/helpers");
async function getAllPromos() {
    const promos = await Promo_1.Promo.find().sort({ createdAt: -1 });
    return promos.map((item) => (0, constants_1.mapPromo)(item.toObject()));
}
function parsePromoPayload(req) {
    const body = req.body;
    const code = String(body?.code || "")
        .trim()
        .toUpperCase();
    const percentage = Number(body?.percentage);
    const count = Number(body?.count);
    const minimumOrderValue = Number(body?.minimumOrderValue);
    const startsAt = new Date(body?.startsAt || "");
    const endsAt = new Date(body?.endsAt || "");
    (0, helpers_1.requireText)(code, "promo code is required");
    if (Number.isNaN(percentage) || percentage < 1 || percentage > 100) {
        throw new AppError_1.AppError(400, "Percentage must be between 1 and 10");
    }
    if (!Number.isInteger(count) || count < 1) {
        throw new AppError_1.AppError(400, "Promo count must be atleast 1");
    }
    if (Number.isNaN(minimumOrderValue) || minimumOrderValue < 0) {
        throw new AppError_1.AppError(400, "Promo count must be atleast 0 or more");
    }
    if (Number.isNaN(startsAt.getTime())) {
        throw new AppError_1.AppError(400, "Valid start time is required");
    }
    if (Number.isNaN(endsAt.getTime())) {
        throw new AppError_1.AppError(400, "Valid end time is required");
    }
    if (endsAt <= startsAt) {
        throw new AppError_1.AppError(400, "End time should be after start time");
    }
    return {
        code,
        percentage,
        count,
        minimumOrderValue,
        startsAt,
        endsAt,
    };
}
exports.getPromoController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    res.json((0, envelope_1.ok)({
        items: await getAllPromos(),
    }));
});
exports.postPromoController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const payload = parsePromoPayload(req);
    const existingPromo = await Promo_1.Promo.findOne({ code: payload.code });
    if (existingPromo) {
        throw new AppError_1.AppError(404, "Promo code already exist");
    }
    await Promo_1.Promo.create(payload);
    res.json((0, envelope_1.ok)({
        items: await getAllPromos(),
    }));
});
exports.updatePromoController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const promoId = String(req.params.promoId || "").trim();
    (0, helpers_1.requireText)(promoId, "Promo id is required");
    const payload = parsePromoPayload(req);
    const promo = await Promo_1.Promo.findById(promoId);
    const foundPromo = (0, helpers_1.requireFound)(promo, "Promo not found", 404);
    const existingPromo = await Promo_1.Promo.findOne({
        code: payload.code,
        _id: { $ne: foundPromo._id },
    });
    if (existingPromo) {
        throw new AppError_1.AppError(404, "Promo code already exist");
    }
    foundPromo.code = payload.code;
    foundPromo.percentage = payload.percentage;
    foundPromo.count = payload.count;
    foundPromo.minimumOrderValue = payload.minimumOrderValue;
    foundPromo.startsAt = payload.startsAt;
    foundPromo.endsAt = payload.endsAt;
    await foundPromo.save();
    res.json((0, envelope_1.ok)({
        items: await getAllPromos(),
    }));
});
exports.deletePromoController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const promoId = String(req.params.promoId || "").trim();
    (0, helpers_1.requireText)(promoId, "Promo id is required");
    const promo = await Promo_1.Promo.findById(promoId);
    (0, helpers_1.requireFound)(promo, "Promo not found", 404);
    await promo.deleteOne();
    res.json((0, envelope_1.ok)({
        items: await getAllPromos(),
    }));
});
