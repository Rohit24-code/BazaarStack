import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import morgan from "morgan";
import { ok } from "./utils/envelope";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorhandler";
import { clerkMiddleware } from "@clerk/express";
import { authRouter } from "./routes/auth/auth.routes";
import { productRouter } from "./routes/admin/product.routes";
import { customerAddressRouter } from "./routes/customer/address.routes";
import { adminPromoRouter } from "./routes/admin/promo.routes";
import { customerProductRouter } from "./routes/customer/product.routes";
import { customerPromoRouter } from "./routes/customer/promo.routes";

const app = express();
const PORT = process.env.PORT || 8080;
const corsOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000")
  ?.split(",")
  ?.map((origin: string) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json(
    ok({
      message: "Server is healthy \n running state",
    }),
  );
});

// auth route
app.use("/auth", authRouter);

// admin route
app.use("/admin", productRouter);
app.use("/admin", adminPromoRouter);

// customer route
app.use("/customer", customerProductRouter);
app.use("/customer", customerAddressRouter);
app.use("/customer", customerPromoRouter);

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server running on port:", PORT);
    });
  } catch (err) {
    console.error("failed to start", err);
    process.exit(1);
  }
}

startServer();
