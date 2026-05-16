"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.addProduct = exports.getSingleProduct = exports.getProducts = exports.updateCategory = exports.postCategories = exports.getCategories = void 0;
const Product_1 = require("../models/Product");
const asyncHandler_1 = require("../utils/asyncHandler");
const envelope_1 = require("../utils/envelope");
const Category_1 = require("../models/Category");
const helpers_1 = require("../utils/helpers");
const AppError_1 = require("../utils/AppError");
const cloudinary_1 = require("../utils/cloudinary");
const auth_1 = require("../middleware/auth");
exports.getCategories = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const categories = await Category_1.Category.find().sort({ name: 1 });
    res.status(200).json((0, envelope_1.ok)(categories));
});
exports.postCategories = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { body } = req;
    const name = body;
    (0, helpers_1.requireText)(String(name)?.trim(), "Category name is required");
    const category = await Category_1.Category.create(body);
    res.status(201).json((0, envelope_1.ok)(category));
});
exports.updateCategory = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { body } = req;
    const { name } = body;
    (0, helpers_1.requireText)(String(name)?.trim(), "Category name is required");
    const extractCategoryId = req.params.id;
    const existingCategory = await Category_1.Category.findById(extractCategoryId);
    const category = (0, helpers_1.requireFound)(existingCategory, "Category not found");
    category.name = name;
    await category.save();
    res.status(201).json((0, envelope_1.ok)(category));
});
// Product
exports.getProducts = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const search = String(req.query.search || "").trim();
    const query = {};
    if (search) {
        // over here i is for case insensitive
        query.title = { $regex: search, $options: "i" };
    }
    const products = await Product_1.Product.find(query)
        .populate("category", "name")
        .sort({ createdAt: -1 });
    res.status(200).json((0, envelope_1.ok)(products));
});
exports.getSingleProduct = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const extractedProductId = req.params.id;
    const exitingProduct = await Product_1.Product.findById(extractedProductId).populate("category", "name");
    (0, helpers_1.requireText)(exitingProduct, "Product not found");
    res.status(201).json((0, envelope_1.ok)(exitingProduct));
});
exports.addProduct = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { body } = req;
    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const category = String(body.category || "").trim();
    const brand = String(body.brand || "").trim();
    const price = Number(body.price || 0);
    const salePercentage = Number(body.salePercentage || 0);
    const stock = Number(body.stock || 0);
    const status = String(body.status || "active").trim();
    const colors = body.colors || [];
    const sizes = body.sizes || [];
    (0, helpers_1.requireText)(title, "Title is required");
    (0, helpers_1.requireText)(description, "Description is required");
    (0, helpers_1.requireText)(category, "Category is required");
    (0, helpers_1.requireText)(brand, "Brand is required");
    (0, helpers_1.requireText)(status, "Status is required");
    (0, helpers_1.requireNumber)(price, "Price is required");
    (0, helpers_1.requireNumber)(salePercentage, "Sale Percentage is required");
    (0, helpers_1.requireNumber)(stock, "Stock is required");
    const existingCategory = await Category_1.Category.findById(category);
    (0, helpers_1.requireText)(existingCategory, "Category not found", 404);
    const files = req.files || [];
    if (!files.length) {
        throw new AppError_1.AppError(400, "At least Images are required");
    }
    const uploadedImages = await (0, cloudinary_1.uploadManyBuffersToCloudinary)(files.map((file) => file.buffer));
    const images = uploadedImages.map((image, index) => ({
        url: image.url,
        publicId: image.publicId,
        isCover: index === 0,
    }));
    const user = await (0, auth_1.getDbUserFromReq)(req);
    const product = await Product_1.Product.create({
        title,
        description,
        category,
        brand,
        price,
        salePercentage,
        stock,
        status,
        images,
        colors,
        sizes,
        createBy: user._id,
    });
    const createdProduct = await Product_1.Product.findById(product._id).populate("category", "name");
    res.status(201).json((0, envelope_1.ok)(createdProduct));
});
exports.updateProduct = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { body } = req;
    const productId = req.params.id;
    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const category = String(body.category || "").trim();
    const brand = String(body.brand || "").trim();
    const price = Number(body.price || 0);
    const salePercentage = Number(body.salePercentage || 0);
    const stock = Number(body.stock || 0);
    const status = String(body.status || "active").trim();
    const colors = body.colors || [];
    const sizes = body.sizes || [];
    const coverImagePublicId = String(body.coverImagePublicId || "").trim();
    (0, helpers_1.requireText)(title, "Title is required");
    (0, helpers_1.requireText)(description, "Description is required");
    (0, helpers_1.requireText)(category, "Category is required");
    (0, helpers_1.requireText)(brand, "Brand is required");
    (0, helpers_1.requireText)(status, "Status is required");
    (0, helpers_1.requireNumber)(price, "Price is required");
    (0, helpers_1.requireNumber)(salePercentage, "Sale Percentage is required");
    (0, helpers_1.requireNumber)(stock, "Stock is required");
    const existingCategoryDoc = await Category_1.Category.findById(category);
    const existingCategory = (0, helpers_1.requireFound)(existingCategoryDoc, "Category not found", 404);
    const productDoc = await Product_1.Product.findById(productId);
    const product = (0, helpers_1.requireFound)(productDoc, "Product not found", 404);
    const files = req.files || [];
    const uploadedNewImages = await (0, cloudinary_1.uploadManyBuffersToCloudinary)(files.map((file) => file.buffer));
    const newlyAddedImages = uploadedNewImages?.map((image) => ({
        url: image.url,
        publicId: image.publicId,
        isCover: false,
    }));
    let existingImages = product.images.map((image) => ({
        url: image.url,
        publicId: image.publicId,
        isCover: image.isCover,
    }));
    const mergedImages = [
        ...existingImages,
        ...newlyAddedImages,
    ];
    if (!mergedImages.length) {
        throw new AppError_1.AppError(400, "At least one image is required");
    }
    const finalImages = mergedImages.map((image, index) => ({
        url: image.url,
        publicId: image.publicId,
        isCover: coverImagePublicId
            ? coverImagePublicId === image.publicId
            : index === 0,
    }));
    product.title = title;
    product.description = description;
    product.category = existingCategory._id;
    product.brand = brand;
    product.price = price;
    product.salePercentage = salePercentage;
    product.stock = stock;
    product.status = status;
    product.colors = colors;
    product.sizes = sizes;
    product.set("images", finalImages);
    await product.save();
    const updatedProduct = await Product_1.Product.findById(product._id).populate("category", "name");
    res.json((0, envelope_1.ok)(updatedProduct));
});
