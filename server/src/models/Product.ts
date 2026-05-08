import mongoose, { Schema } from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    public_id: {
      type: String,
      required: true,
      trim: true,
    },
    isCover: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: [ImageSchema],
      default: [],
    },
    color: {
      type: [String],
      required: true,
      default: [],
    },
    size: {
      type: [String],
      required: true,
      default: [],
      enum: ["S", "M", "L", "XL", "XXL"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    salePercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    createBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
