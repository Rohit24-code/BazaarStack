"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerHome = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const Banner_1 = require("../../models/Banner");
const Category_1 = require("../../models/Category");
const Product_1 = require("../../models/Product");
const Promo_1 = require("../../models/Promo");
const envelope_1 = require("../../utils/envelope");
exports.getCustomerHome = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const now = new Date();
    const [banners, categories, recentProducts, promos] = await Promise.all([
        Banner_1.Banner.find().sort({ createdAt: -1 }).limit(6).lean(),
        Category_1.Category.find().sort({ name: 1 }).lean(),
        Product_1.Product.find({ status: "active" })
            .select("title brand price salePercentage images createdAt")
            .sort({ createdAt: -1 })
            .limit(4)
            .lean(),
        Promo_1.Promo.find({
            startsAt: { $lte: now },
            endsAt: { $gte: now },
            count: { $gt: 0 },
        })
            .sort({ createAt: -1 })
            .limit(4)
            .lean(),
    ]);
    res.json((0, envelope_1.ok)({
        banners: banners.map((bannerItem) => ({
            _id: String(bannerItem._id),
            imageUrl: bannerItem.imageUrl,
            createAt: bannerItem.createdAt.toISOString(),
        })),
        categories: categories.map((categoryItem) => ({
            _id: String(categoryItem._id),
            name: categoryItem.name,
        })),
        recentProducts: recentProducts.map((recentProductItem) => {
            const image = recentProductItem.images.find((item) => item.isCover)?.url ||
                recentProductItem.images[0]?.url ||
                "";
            const finalPrice = recentProductItem.salePercentage
                ? Math.round(recentProductItem.price -
                    (recentProductItem.price * recentProductItem.salePercentage) /
                        100)
                : recentProductItem.price;
            return {
                _id: String(recentProductItem._id),
                title: recentProductItem.title,
                brand: recentProductItem.brand,
                image,
                price: recentProductItem.price,
                finalPrice,
                salePercentage: recentProductItem.salePercentage,
                createAt: recentProductItem.createdAt.toISOString(),
            };
        }),
        coupons: promos.map((promoItem) => ({
            _id: String(promoItem._id),
            code: promoItem.code,
            percentage: promoItem.percentage,
            count: promoItem.count,
            minimumOrderValue: promoItem.minimumOrderValue,
            endsAt: promoItem.endsAt.toISOString(),
        })),
    }));
});
