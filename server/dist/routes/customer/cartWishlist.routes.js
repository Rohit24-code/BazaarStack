"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerCartWishlistRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const cartWishlist_controllers_1 = require("../../controllers/customer/cartWishlist.controllers");
exports.customerCartWishlistRouter = (0, express_1.Router)();
exports.customerCartWishlistRouter.use(auth_1.requireAuth);
// Cart Routes
exports.customerCartWishlistRouter.get("/cart", cartWishlist_controllers_1.getCustomerCartWishlist);
exports.customerCartWishlistRouter.post("/cart", cartWishlist_controllers_1.postCustomerCartWishlist);
exports.customerCartWishlistRouter.put("/cart/:productId/increase", cartWishlist_controllers_1.updateCustomerCartIncrease);
exports.customerCartWishlistRouter.put("/cart/:productId/decrease", cartWishlist_controllers_1.updateCustomerCartDecrease);
exports.customerCartWishlistRouter.delete("/cart/:productId", cartWishlist_controllers_1.deleteCustomerCartWishlist);
exports.customerCartWishlistRouter.post("/cart/sync", cartWishlist_controllers_1.syncCustomerCartWishlist);
// Wishlist Routes
exports.customerCartWishlistRouter.get("/wishlist", cartWishlist_controllers_1.getCustomerWishlist);
exports.customerCartWishlistRouter.post("/wishlist", cartWishlist_controllers_1.postCustomerWishlist);
exports.customerCartWishlistRouter.delete("/wishlist/:productId", cartWishlist_controllers_1.deleteCustomerWishlist);
