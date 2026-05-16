"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const morgan_1 = __importDefault(require("morgan"));
const envelope_1 = require("./utils/envelope");
const notFound_1 = require("./middleware/notFound");
const errorhandler_1 = require("./middleware/errorhandler");
const express_2 = require("@clerk/express");
const auth_routes_1 = require("./routes/auth/auth.routes");
const dashboard_routes_1 = require("./routes/admin/dashboard.routes");
const product_routes_1 = require("./routes/admin/product.routes");
const promo_routes_1 = require("./routes/admin/promo.routes");
const setting_routes_1 = require("./routes/admin/setting.routes");
const orders_routes_1 = require("./routes/admin/orders.routes");
const address_routes_1 = require("./routes/customer/address.routes");
const cartWishlist_routes_1 = require("./routes/customer/cartWishlist.routes");
const checkout_routes_1 = require("./routes/customer/checkout.routes");
const checkoutWithPoints_routes_1 = require("./routes/customer/checkoutWithPoints.routes");
const home_routes_1 = require("./routes/customer/home.routes");
const orders_routes_2 = require("./routes/customer/orders.routes");
const product_routes_2 = require("./routes/customer/product.routes");
const promo_routes_2 = require("./routes/customer/promo.routes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const corsOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000")
    ?.split(",")
    ?.map((origin) => origin.trim())
    .filter(Boolean);
app.use((0, cors_1.default)({
    origin: corsOrigins,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, express_2.clerkMiddleware)());
app.get("/health", (req, res) => {
    res.status(200).json((0, envelope_1.ok)({
        message: "Server is healthy \n running state",
    }));
});
// auth route
app.use("/auth", auth_routes_1.authRouter);
// admin route
app.use("/admin", dashboard_routes_1.adminDashboardRouter);
app.use("/admin", product_routes_1.productRouter);
app.use("/admin", promo_routes_1.adminPromoRouter);
app.use("/admin", setting_routes_1.adminSettingsRouter);
app.use("/admin", orders_routes_1.adminOrderRouter);
// customer route
app.use("/customer", address_routes_1.customerAddressRouter);
app.use("/customer", cartWishlist_routes_1.customerCartWishlistRouter);
app.use("/customer", checkout_routes_1.customerCheckoutRouter);
app.use("/customer", checkoutWithPoints_routes_1.customerCheckoutWithPointsRouter);
app.use("/customer", home_routes_1.customerHomeRouter);
app.use("/customer", orders_routes_2.customerOrderRouter);
app.use("/customer", product_routes_2.customerProductRouter);
app.use("/customer", promo_routes_2.customerPromoRouter);
app.use(notFound_1.notFound);
app.use(errorhandler_1.errorHandler);
async function startServer() {
    try {
        await (0, db_1.connectDB)();
        app.listen(PORT, () => {
            console.log("Server running on port:", PORT);
        });
    }
    catch (err) {
        console.error("failed to start", err);
        process.exit(1);
    }
}
startServer();
