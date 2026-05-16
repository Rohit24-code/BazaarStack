"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const mongoose_3 = require("mongoose");
const bannerSchema = new mongoose_1.Schema({
    imageUrl: {
        type: String,
        required: true,
        trim: true,
    },
    imagePublicId: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
exports.Banner = mongoose_2.default.models.Banner || (0, mongoose_3.model)("Banner", bannerSchema);
