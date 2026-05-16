"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerProductDetailsController = exports.customerProductController = exports.customerCategoriesController = void 0;
const Category_1 = require("../../models/Category");
const asyncHandler_1 = require("../../utils/asyncHandler");
const envelope_1 = require("../../utils/envelope");
const Product_1 = require("../../models/Product");
const helpers_1 = require("../../utils/helpers");
exports.customerCategoriesController = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const categories = await Category_1.Category.find().sort({ name: 1 });
    res.status(200).json((0, envelope_1.ok)(categories));
});
exports.customerProductController = (0, asyncHandler_1.asyncHandler)(async (
//By passing ProductFilerListQuery as the 4th argument, TypeScript knows exactly what req.query contains.
// rest 1st 3 are for req , body etc.
req, res, next) => {
    const category = (req.query.category || "").trim();
    const brand = (req.query.brand || "").trim();
    const color = (req.query.color || "").trim();
    const size = (req.query.size || "").trim();
    const sort = (req.query.sort || "recent").trim();
    const query = {
        status: "active",
    };
    if (category) {
        query.category = category;
    }
    if (brand) {
        query.brand = brand;
    }
    if (color) {
        query.colors = color;
    }
    if (size) {
        query.sizes = size;
    }
    let sortOptions = {
        createdAt: -1,
    };
    if (sort === "price-low") {
        sortOptions = { price: 1 };
    }
    if (sort === "price-high") {
        sortOptions = { price: 1 };
    }
    // const allproduct = await Product.find({});
    // console.log(allproduct, "Asdf");
    const products = await Product_1.Product.find(query)
        .populate("category", "name")
        .sort(sortOptions);
    res.json((0, envelope_1.ok)(products));
});
exports.customerProductDetailsController = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const productId = req.params.id;
    let product = await Product_1.Product.findOne({
        _id: productId,
        status: "active",
    }).populate("category", "name");
    const foundProduct = (0, helpers_1.requireFound)(product, "Product not found");
    const relatedProducts = await Product_1.Product.find({
        _id: { $ne: productId },
        category: foundProduct.category,
        status: "active",
    })
        .populate("category", "name")
        .sort({ createdAt: -1 })
        .limit(5);
    res.status(200).json((0, envelope_1.ok)({
        product: foundProduct,
        relatedProducts,
    }));
});
