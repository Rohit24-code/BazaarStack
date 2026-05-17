"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerWishlist = exports.postCustomerWishlist = exports.getCustomerWishlist = exports.syncCustomerCartWishlist = exports.deleteCustomerCartWishlist = exports.updateCustomerCartDecrease = exports.updateCustomerCartIncrease = exports.postCustomerCartWishlist = exports.getCustomerCartWishlist = void 0;
const auth_1 = require("../../middleware/auth");
const Cart_1 = require("../../models/Cart");
const Product_1 = require("../../models/Product");
const WishList_1 = require("../../models/WishList");
const AppError_1 = require("../../utils/AppError");
const asyncHandler_1 = require("../../utils/asyncHandler");
const envelope_1 = require("../../utils/envelope");
const helpers_1 = require("../../utils/helpers");
function formatProduct(product) {
    const image = product.images.find((item) => item.isCover)?.url ||
        product.images[0]?.url ||
        "";
    const finalPrice = product.salePercentage
        ? Math.round(product.price - (product.price * product.salePercentage) / 100)
        : product.price;
    return {
        productId: String(product._id),
        title: product.title,
        brand: product.brand,
        image,
        finalPrice,
    };
}
async function getCartResponse(userId) {
    const cart = await Cart_1.Cart.findOne({ user: userId }).populate(
    //we are using this bcs in Cart we have a array of ref to product
    // having item with every object having product as ref id
    "items.product", "title brand price salePercentage images");
    const cartItems = (cart?.items || []);
    const items = cartItems.flatMap((cartItem) => {
        if (!cartItem.product)
            return [];
        return [
            {
                ...formatProduct(cartItem.product),
                quantity: cartItem.quantity,
                color: cartItem.color,
                size: cartItem.size,
            },
        ];
    });
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    return {
        items,
        totalQuantity,
    };
}
async function getWishlistResponse(userId) {
    const wishlist = await WishList_1.WishList.findOne({ user: userId }).populate("products", "title brand price salePercentage images");
   
    const products = (wishlist?.products || []);
 
    const items = products.flatMap((productItem) => {
        if (!productItem)
            return [];
        return [formatProduct(productItem)];
    });
    return { items };
}
function getSelectedvariant(product, colorValue, sizeValue) {
    let color;
    let size;
    if (product.colors.length > 0) {
        if (!colorValue) {
            throw new AppError_1.AppError(400, "Color is required");
        }
        if (!product.colors.includes(colorValue)) {
            throw new AppError_1.AppError(400, "Selected color is invalid");
        }
        color = colorValue;
    }
    if (product.sizes.length > 0) {
        if (!sizeValue) {
            throw new AppError_1.AppError(400, "Size is required");
        }
        if (!product.sizes.includes(sizeValue)) {
            throw new AppError_1.AppError(400, "Selected size is invalid");
        }
        size = sizeValue;
    }
    return { color, size };
}
function isSameCartItem(item, productId, color, size) {
    return (String(item.product) === productId &&
        (item.color || "") === (color || "") &&
        (item.size || "") === (size || ""));
}
exports.getCustomerCartWishlist = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    res.json((0, envelope_1.ok)(await getCartResponse(String(dbUser._id))));
});
exports.postCustomerCartWishlist = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const productId = String(req.body.productId || "").trim();
    const quantity = Number(req.body.quantity || 1);
    const colorValue = String(req.body.color || "").trim();
    const sizeValue = String(req.body.size || "").trim();
    (0, helpers_1.requireText)(productId, "Product id is required");
    if (Number.isNaN(quantity) || quantity < 1) {
        throw new AppError_1.AppError(400, "Quantity must be at least 1");
    }
    const product = await Product_1.Product.findOne({
        _id: productId,
        status: "active",
    });
    const foundProduct = (0, helpers_1.requireFound)(product, "Product not found", 404);
    const { color, size } = getSelectedvariant(foundProduct, colorValue, sizeValue);
    if (quantity > foundProduct.stock) {
        throw new AppError_1.AppError(400, "Quantity is more than the stock of this product");
    }
    let cart = await Cart_1.Cart.findOne({ user: dbUser._id });
    if (!cart) {
        cart = await Cart_1.Cart.create({
            user: dbUser._id,
            items: [],
        });
    }
    const itemIndex = cart.items.findIndex((item) => isSameCartItem(item, String(foundProduct._id), color, size));
    if (itemIndex > 0) {
        const nextQuantity = cart.items[itemIndex].quantity + quantity;
        if (nextQuantity > foundProduct.stock) {
            throw new AppError_1.AppError(400, "Quantity is more than the stock of this product");
        }
        cart.items[itemIndex].quantity = nextQuantity;
    }
    else {
        cart.items.push({
            product: foundProduct._id,
            quantity,
            color,
            size,
        });
    }
    await cart.save();
    res.json((0, envelope_1.ok)(await getCartResponse(String(dbUser._id))));
});
exports.updateCustomerCartIncrease = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const dbuser = await (0, auth_1.getDbUserFromReq)(req);
    const productId = String(req.params.productId || "").trim();
    const colorValue = String(req.body.color || "").trim();
    const sizeValue = String(req.body.size || "").trim();
    (0, helpers_1.requireText)(productId, "Product is required");
    const cart = await Cart_1.Cart.findOne({ user: dbuser._id });
    const foundCart = (0, helpers_1.requireFound)(cart, "Cart not found", 404);
    const product = await Product_1.Product.findOne({
        _id: productId,
        status: "active",
    });
    const foundProduct = (0, helpers_1.requireFound)(product, "Product not found", 404);
    const { color, size } = getSelectedvariant(foundProduct, colorValue, sizeValue);
    const itemIndex = cart.items.findIndex((item) => isSameCartItem(item, String(foundProduct._id), color, size));
    if (itemIndex < 0) {
        throw new AppError_1.AppError(400, "Cart Item not found");
    }
    if (foundCart.items[itemIndex].quantity + 1 > foundProduct.stock) {
        throw new AppError_1.AppError(400, "Quantiy is more than stock of this product");
    }
    foundCart.items[itemIndex].quantity += 1;
    await foundCart.save();
    res.json((0, envelope_1.ok)(await getCartResponse(String(dbuser._id))));
});
exports.updateCustomerCartDecrease = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const productId = String(req.params.productId || "").trim();
    const colorValue = String(req.query.color || "").trim();
    const sizeValue = String(req.query.size || "").trim();
    (0, helpers_1.requireText)(productId, "Product id is required");
    const cart = await Cart_1.Cart.findOne({ user: dbUser._id });
    const foundCart = (0, helpers_1.requireFound)(cart, "Cart not found", 404);
    const product = await Product_1.Product.findOne({
        _id: productId,
        status: "active",
    });
    const foundProduct = (0, helpers_1.requireFound)(product, "Product not found", 404);
    const { color, size } = getSelectedvariant(foundProduct, colorValue, sizeValue);
    const itemIndex = cart.items.findIndex((item) => isSameCartItem(item, String(foundProduct._id), color, size));
    if (itemIndex < 0) {
        throw new AppError_1.AppError(400, "Cart item not found here");
    }
    foundCart.items[itemIndex].quantity -= 1;
    if (foundCart.items[itemIndex].quantity <= 0) {
        // SAFETY CHECK: If quantity hits 0, we should remove the item entirely
        foundCart.items.splice(itemIndex, 1);
    }
    await foundCart.save();
    res.json((0, envelope_1.ok)(await getCartResponse(String(dbUser._id))));
});
exports.deleteCustomerCartWishlist = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const productId = String(req.params.productId || "").trim();
    const colorValue = String(req.query.color || "").trim();
    const sizeValue = String(req.query.size || "").trim();
    (0, helpers_1.requireText)(productId, "Product id is required");
    const cart = await Cart_1.Cart.findOne({ user: dbUser._id });
    if (!cart) {
        res.json((0, envelope_1.ok)({ items: [], totalQuantity: 0 }));
        return;
    }
    const product = await Product_1.Product.findOne({
        _id: productId,
        status: "active",
    });
    const foundProduct = (0, helpers_1.requireFound)(product, "Product not found", 404);
    const { color, size } = getSelectedvariant(foundProduct, colorValue, sizeValue);
    cart.items = cart.items.filter((item) => !isSameCartItem(item, productId, color, size));
    await cart.save();
    res.json((0, envelope_1.ok)(await getCartResponse(String(dbUser._id))));
});
exports.syncCustomerCartWishlist = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const incomingItems = Array.isArray(req.body.items)
        ? req.body.items
        : [];
    let cart = await Cart_1.Cart.findOne({ user: dbUser._id });
    if (!cart) {
        cart = await cart.create({
            user: dbUser._id,
            items: [],
        });
    }
    for (const rawItem of incomingItems) {
        const productId = String(rawItem.productId || "").trim();
        const colorValue = String(rawItem.color || "").trim();
        const sizeValue = String(rawItem.size || "").trim();
        const quantity = Number(rawItem.quantity || 0);
        if (!productId || Number.isNaN(quantity) || quantity < 1) {
            continue;
        }
        const product = await Product_1.Product.findOne({
            _id: productId,
            status: "active",
        });
        if (!product || product.stock < 1) {
            continue;
        }
        try {
            const { color, size } = getSelectedvariant(product, colorValue, sizeValue);
            const itemIndex = cart.items.findIndex((item) => isSameCartItem(item, String(product._id), color, size));
            if (itemIndex >= 0) {
                const nextQuantity = cart.items[itemIndex].quantity + quantity;
                cart.items[itemIndex].quantity = Math.min(nextQuantity, product.stock);
            }
            else {
                cart.items.push({
                    product: product._id,
                    quantity: Math.min(quantity, product.stock),
                    color,
                    size,
                });
            }
        }
        catch {
            continue;
        }
    }
    await cart.save();
    res.json(await getCartResponse(String(dbUser._id)));
});
exports.getCustomerWishlist = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    res.json((0, envelope_1.ok)(await getWishlistResponse(String(dbUser._id))));
});
exports.postCustomerWishlist = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const productId = String(req.body.productId || "").trim();
    (0, helpers_1.requireText)(productId, "Product id is required");
    const product = await Product_1.Product.findOne({
        _id: productId,
        status: "active",
    });
    const foundProduct = (0, helpers_1.requireFound)(product, "Product not found", 404);
    let wishlist = await WishList_1.WishList.findOne({ user: dbUser._id });
    if (!wishlist) {
        wishlist = await WishList_1.WishList.create({
            user: dbUser._id,
            products: [],
        });
    }
    const exists = wishlist.products.some((item) => String(item) === String(foundProduct._id));
    if (!exists) {
        wishlist.products.push(foundProduct._id);
        await wishlist.save();
    }
    res.json((0, envelope_1.ok)(await getWishlistResponse(String(dbUser._id))));
});
exports.deleteCustomerWishlist = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const productId = String(req.params.productId || "").trim();
    (0, helpers_1.requireText)(productId, "Product id is required");
    let wishlist = await WishList_1.WishList.findOne({ user: dbUser._id });
    if (!wishlist) {
        res.json((0, envelope_1.ok)({ items: [] }));
        return;
    }
    wishlist.products = wishlist.products.filter((item) => String(item) !== productId);
    await wishlist.save();
    res.json((0, envelope_1.ok)(await getWishlistResponse(String(dbUser._id))));
});
