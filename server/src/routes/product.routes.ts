import { Router } from "express";
import { requireAdmin, requireAuth } from "../middleware/auth";
import {
  addProduct,
  getProducts,
  getCategories,
  postCategories,
  updateCategory,
  updateProduct,
  getSingleProduct,
} from "../controllers/product.controllers";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 1024 * 1024 * 5,
    files: 10,
  },
});

export const productRouter = Router();

productRouter.use(requireAuth);

productRouter.get("/categories", getCategories);

productRouter.post("/categories", postCategories);

productRouter.put("/categories/:id", updateCategory);

// product

productRouter.post("/product", upload.array("images", 10), addProduct);

productRouter.put("/product/:id", updateProduct);

productRouter.get("/product", getProducts);

productRouter.get("/product/:id", getSingleProduct);
