"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PromoSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
    },
    percentage: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    count: {
        type: Number,
        required: true,
        min: 1,
    },
    minimumOrderValue: {
        type: Number,
        required: true,
        min: 0,
    },
    startsAt: {
        type: Date,
        required: true,
    },
    endsAt: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Promo = mongoose_1.default.models.Promo || mongoose_1.default.model("Promo", PromoSchema);
