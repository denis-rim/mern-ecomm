import mongoose from "mongoose";
import shortid from "shortid";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    unique: true,
    default: shortid.generate(),
  },
  description: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
});

// Check if we already declare Product model is existing in connection to prevent its generate again
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
