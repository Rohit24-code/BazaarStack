"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBanners = exports.getBanners = void 0;
const auth_1 = require("../../middleware/auth");
const Banner_1 = require("../../models/Banner");
const asyncHandler_1 = require("../../utils/asyncHandler");
const envelope_1 = require("../../utils/envelope");
const AppError_1 = require("../../utils/AppError");
const cloudinary_1 = require("../../utils/cloudinary");
function mapBanner(item) {
    return {
        _id: String(item._id),
        imageUrl: item.imageUrl,
        imagePublicId: item.imagePublicId,
        createdAt: item.createdAt.toISOString(),
    };
}
const BANNER_FOLDER = "ecommerce-monster-video/banners";
exports.getBanners = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const items = await Banner_1.Banner.find().sort({ createdAt: -1 });
    res.json((0, envelope_1.ok)({
        items: items.map(mapBanner),
    }));
});
exports.addBanners = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const files = (req.files || []);
    if (!files.length) {
        throw new AppError_1.AppError(400, "At least one image is required");
    }
    const uploadedImages = await (0, cloudinary_1.uploadManyBuffersToCloudinary)(files.map((file) => file.buffer), BANNER_FOLDER);
    const createFinalBanners = await Banner_1.Banner.insertMany(uploadedImages.map((item) => ({
        imageUrl: item.url,
        imagePublicId: item.publicId,
        createdBy: dbUser._id,
    })));
    res.json((0, envelope_1.ok)({
        items: createFinalBanners.map(mapBanner),
    }));
});
