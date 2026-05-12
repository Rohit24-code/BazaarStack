import { Router } from "express";
import { requireAuth } from "../../middleware/auth";

export const customerCartWishlistRouter = Router();

customerCartWishlistRouter.use(requireAuth);

customerCartWishlistRouter.get("/cart");
