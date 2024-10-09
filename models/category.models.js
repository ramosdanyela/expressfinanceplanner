import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const Category = model("Category", categorySchema);

export default Category;
